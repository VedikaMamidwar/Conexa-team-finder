import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
    Plus,
    BriefcaseBusiness,
    Users,
    MessageCircle,
    Eye,
    ArrowUpRight,
    Lightbulb,
    Clock3,
    CheckCircle2,
    Sparkles,
    UserCircle,
    TrendingUp,
    CalendarDays,
    Target,
    ChevronRight,
    RefreshCw,
    Activity,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function StakeholderDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [problems, setProblems] = useState([]);
    const [interestCounts, setInterestCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                `${API_URL}/problems`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const allProblems =
                response.data?.problems ||
                response.data?.data ||
                (Array.isArray(response.data)
                    ? response.data
                    : []);

            const storedUser = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            const currentUserId =
                user?._id ||
                user?.id ||
                storedUser?._id ||
                storedUser?.id;

            const myProblems = currentUserId
                ? allProblems.filter((problem) => {
                    const stakeholder =
                        problem?.stakeholderId;

                    const stakeholderId =
                        typeof stakeholder === "object"
                            ? stakeholder?._id
                            : stakeholder;

                    return (
                        String(stakeholderId) ===
                        String(currentUserId)
                    );
                })
                : [];

            setProblems(myProblems);

            const counts = {};

            await Promise.all(
                myProblems.map(async (problem) => {
                    try {
                        const interestResponse =
                            await axios.get(
                                `${API_URL}/problem-interests/problem/${problem._id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                        const responses =
                            interestResponse.data?.responses ||
                            interestResponse.data?.data ||
                            [];

                        counts[problem._id] =
                            Array.isArray(responses)
                                ? responses.length
                                : 0;
                    } catch (err) {
                        console.error(
                            `Failed to fetch interests for ${problem._id}`,
                            err
                        );

                        counts[problem._id] = 0;
                    }
                })
            );

            setInterestCounts(counts);
        } catch (err) {
            console.error(
                "Stakeholder dashboard error:",
                err
            );

            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            setError(
                err.response?.data?.message ||
                "Failed to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };

    const isActiveProblem = (deadline) => {
        if (!deadline) return true;

        const deadlineDate = new Date(deadline);

        if (Number.isNaN(deadlineDate.getTime())) {
            return true;
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);
        deadlineDate.setHours(23, 59, 59, 999);

        return deadlineDate >= today;
    };

    const formatDate = (date) => {
        if (!date) return "No deadline";

        const formatted = new Date(date);

        if (Number.isNaN(formatted.getTime())) {
            return "No deadline";
        }

        return formatted.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const totalProblems = problems.length;

    const activeProblems = problems.filter(
        (problem) =>
            isActiveProblem(problem.deadline)
    ).length;

    const totalInterests = Object.values(
        interestCounts
    ).reduce(
        (total, count) => total + count,
        0
    );

    const expiredProblems =
        totalProblems - activeProblems;

    const topProblem = useMemo(() => {
        if (!problems.length) return null;

        return [...problems].sort(
            (a, b) =>
                (interestCounts[b._id] || 0) -
                (interestCounts[a._id] || 0)
        )[0];
    }, [problems, interestCounts]);

    const stats = [
        {
            title: "Total Problems",
            value: totalProblems,
            subtitle: "Problems posted",
            icon: Lightbulb,
            iconBg: "bg-teal-50",
            iconColor: "text-[#14B8A6]",
        },
        {
            title: "Student Interests",
            value: totalInterests,
            subtitle: "Students interested",
            icon: Users,
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600",
        },
        {
            title: "Active Problems",
            value: activeProblems,
            subtitle: "Currently active",
            icon: BriefcaseBusiness,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Responses",
            value: totalInterests,
            subtitle: "Student responses",
            icon: MessageCircle,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="text-center">
                    <div className="relative mx-auto h-12 w-12">
                        <div className="absolute inset-0 rounded-2xl bg-teal-100" />

                        <div className="absolute inset-1 rounded-xl border-4 border-slate-200 border-t-[#14B8A6] animate-spin" />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-500">
                        Loading stakeholder dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px]">

                {/* =========================================
                    TOP HEADER
                ========================================= */}

                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#14B8A6]" />

                            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#14B8A6]">
                                Stakeholder Dashboard
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                            Manage your problems and connect with students
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchDashboardData}
                            className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 shadow-sm transition hover:border-teal-200 hover:text-[#14B8A6]"
                        >
                            <RefreshCw size={14} />
                            Refresh
                        </button>

                        <button
                            onClick={() =>
                                navigate("/stakeholder/profile")
                            }
                            className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 shadow-sm transition hover:border-teal-200 hover:text-[#14B8A6]"
                        >
                            <UserCircle size={14} />
                            Profile
                        </button>
                    </div>
                </div>

                {/* =========================================
                    ERROR
                ========================================= */}

                {error && (
                    <div className="mb-5 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center gap-3">
                            <Activity
                                size={17}
                                className="text-red-500"
                            />

                            <p className="text-sm font-semibold text-red-600">
                                {error}
                            </p>
                        </div>

                        <button
                            onClick={fetchDashboardData}
                            className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-200"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* =========================================
                    HERO
                ========================================= */}

                <section className="relative mb-5 overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#14B8A6] p-6 text-white shadow-xl sm:p-7">

                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10" />

                    <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-teal-300/10 blur-2xl" />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

                    <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">

                        <div className="max-w-2xl">

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                                <Sparkles size={13} />

                                <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                                    Real-world opportunities
                                </span>
                            </div>

                            <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                                Welcome back,{" "}
                                <span className="text-teal-200">
                                    {user?.name || "Stakeholder"}
                                </span>
                                {" "}👋
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                                Turn real-world challenges into meaningful
                                opportunities for talented students.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/create-problem"
                                        )
                                    }
                                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-[#1E1B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
                                >
                                    <Plus size={17} />
                                    Create Problem
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/problems"
                                        )
                                    }
                                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                                >
                                    View Problems
                                    <ArrowUpRight size={15} />
                                </button>

                            </div>
                        </div>

                        {/* HERO SUMMARY */}

                        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-[360px]">

                            <HeroMetric
                                icon={TrendingUp}
                                value={totalInterests}
                                label="Interests"
                            />

                            <HeroMetric
                                icon={Target}
                                value={activeProblems}
                                label="Active"
                            />

                            <HeroMetric
                                icon={CalendarDays}
                                value={expiredProblems}
                                label="Expired"
                            />

                        </div>
                    </div>
                </section>

                {/* =========================================
                    STATISTICS
                ========================================= */}

                <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">

                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                                    >
                                        <Icon
                                            size={20}
                                            className={stat.iconColor}
                                        />
                                    </div>

                                    <ArrowUpRight
                                        size={17}
                                        className="text-slate-300 transition group-hover:text-[#14B8A6]"
                                    />
                                </div>

                                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                                    {stat.title}
                                </p>

                                <h2 className="mt-1 text-3xl font-black text-[#1E1B4B]">
                                    {stat.value}
                                </h2>

                                <div className="mt-2 flex items-center gap-1.5">
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${stat.iconColor.replace(
                                            "text-",
                                            "bg-"
                                        )}`}
                                    />

                                    <p className="text-xs font-semibold text-slate-500">
                                        {stat.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* =========================================
                    MAIN GRID
                ========================================= */}

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">

                    {/* =====================================
                        LEFT
                    ===================================== */}

                    <section className="xl:col-span-8">

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                            {/* Section header */}

                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                        <Lightbulb
                                            size={19}
                                            className="text-[#14B8A6]"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-black text-[#1E1B4B]">
                                            My Problems
                                        </h2>

                                        <p className="text-[11px] text-slate-400">
                                            Manage your posted challenges
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/problems"
                                        )
                                    }
                                    className="flex items-center gap-1 text-xs font-black text-[#14B8A6] hover:text-teal-700"
                                >
                                    View All
                                    <ArrowUpRight size={14} />
                                </button>

                            </div>

                            {/* Problems */}

                            {problems.length === 0 ? (
                                <EmptyProblems
                                    onCreate={() =>
                                        navigate(
                                            "/stakeholder/create-problem"
                                        )
                                    }
                                />
                            ) : (
                                <div>
                                    {problems
                                        .slice(0, 5)
                                        .map((problem) => {

                                            const interestCount =
                                                interestCounts[
                                                problem._id
                                                ] || 0;

                                            const active =
                                                isActiveProblem(
                                                    problem.deadline
                                                );

                                            return (
                                                <ProblemCard
                                                    key={problem._id}
                                                    problem={problem}
                                                    active={active}
                                                    interestCount={
                                                        interestCount
                                                    }
                                                    formatDate={
                                                        formatDate
                                                    }
                                                    navigate={
                                                        navigate
                                                    }
                                                />
                                            );
                                        })}
                                </div>
                            )}

                        </div>
                    </section>

                    {/* =====================================
                        RIGHT SIDEBAR
                    ===================================== */}

                    <aside className="space-y-5 xl:col-span-4">

                        {/* QUICK ACTIONS */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles
                                        size={16}
                                        className="text-[#14B8A6]"
                                    />

                                    <h2 className="text-base font-black text-[#1E1B4B]">
                                        Quick Actions
                                    </h2>
                                </div>

                                <p className="mt-1 text-[11px] text-slate-400">
                                    Manage your stakeholder activity
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">

                                <QuickAction
                                    icon={Plus}
                                    title="Create Problem"
                                    description="Post challenge"
                                    color="teal"
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/create-problem"
                                        )
                                    }
                                />

                                <QuickAction
                                    icon={Users}
                                    title="Students"
                                    description="View interests"
                                    color="indigo"
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/problems"
                                        )
                                    }
                                />

                                <QuickAction
                                    icon={MessageCircle}
                                    title="Messages"
                                    description="Student chats"
                                    color="blue"
                                    onClick={() =>
                                        alert(
                                            "Messaging feature coming next."
                                        )
                                    }
                                />

                                <QuickAction
                                    icon={BriefcaseBusiness}
                                    title="My Problems"
                                    description="Manage posts"
                                    color="purple"
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/problems"
                                        )
                                    }
                                />

                            </div>
                        </div>

                        {/* PROFILE CARD - COMPACT */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            {/* TOP */}

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] text-base font-black text-white shadow-sm">
                                        {user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "S"}
                                    </div>

                                    <div>
                                        <h3 className="max-w-[150px] truncate text-sm font-black text-[#1E1B4B]">
                                            {user?.name ||
                                                "Stakeholder"}
                                        </h3>

                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                            Stakeholder Account
                                        </p>

                                        <div className="mt-1 flex items-center gap-1">
                                            <CheckCircle2
                                                size={11}
                                                className="text-emerald-500"
                                            />

                                            <span className="text-[9px] font-bold text-emerald-600">
                                                Verified
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* MANAGE PROFILE TOP RIGHT */}

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/profile"
                                        )
                                    }
                                    className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-[10px] font-black text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-[#14B8A6]"
                                >
                                    <UserCircle size={13} />
                                    Manage
                                </button>

                            </div>

                            {/* PROFILE INFO */}

                            <div className="mt-4 grid grid-cols-2 gap-2">

                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                        Problems
                                    </p>

                                    <p className="mt-1 text-lg font-black text-[#1E1B4B]">
                                        {totalProblems}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                        Interests
                                    </p>

                                    <p className="mt-1 text-lg font-black text-[#1E1B4B]">
                                        {totalInterests}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* PERFORMANCE */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                                        Overview
                                    </p>

                                    <h2 className="mt-1 text-base font-black text-[#1E1B4B]">
                                        Engagement
                                    </h2>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                                    <TrendingUp
                                        size={17}
                                        className="text-emerald-500"
                                    />
                                </div>

                            </div>

                            <div className="mt-5">

                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-[11px] font-semibold text-slate-500">
                                        Student engagement
                                    </span>

                                    <span className="text-[11px] font-black text-[#14B8A6]">
                                        {totalProblems
                                            ? `${Math.min(
                                                100,
                                                totalInterests * 10
                                            )}%`
                                            : "0%"}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]"
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                totalInterests * 10
                                            )}%`,
                                        }}
                                    />
                                </div>

                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-2">

                                <SmallStat
                                    value={totalProblems}
                                    label="Posted"
                                />

                                <SmallStat
                                    value={activeProblems}
                                    label="Active"
                                />

                                <SmallStat
                                    value={totalInterests}
                                    label="Interest"
                                />

                            </div>
                        </div>

                        {/* SPOTLIGHT */}

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-5 text-white shadow-lg">

                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/10" />

                            <div className="relative">

                                <div className="flex items-center gap-2">
                                    <Sparkles
                                        size={15}
                                        className="text-teal-300"
                                    />

                                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-teal-300">
                                        Spotlight
                                    </span>
                                </div>

                                {topProblem ? (
                                    <>
                                        <h3 className="mt-3 text-sm font-black">
                                            Most engaging problem
                                        </h3>

                                        <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-white/70">
                                            {topProblem.title}
                                        </p>

                                        <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-white/50">
                                            <Users size={12} />

                                            {interestCounts[
                                                topProblem._id
                                            ] || 0}{" "}
                                            student interests
                                        </div>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/stakeholder/problems/${topProblem._id}/responses`
                                                )
                                            }
                                            className="mt-4 flex items-center gap-1 text-[10px] font-black text-teal-300 hover:text-teal-200"
                                        >
                                            View responses
                                            <ArrowUpRight size={12} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="mt-3 text-sm font-black">
                                            Start creating impact
                                        </h3>

                                        <p className="mt-2 text-xs leading-5 text-white/60">
                                            Post your first real-world
                                            challenge and connect with
                                            talented students.
                                        </p>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    "/stakeholder/create-problem"
                                                )
                                            }
                                            className="mt-4 flex items-center gap-1 text-[10px] font-black text-teal-300"
                                        >
                                            Create a problem
                                            <ArrowUpRight size={12} />
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   HERO METRIC
========================================================= */

function HeroMetric({
    icon: Icon,
    value,
    label,
}) {
    return (
        <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
            <Icon
                size={15}
                className="text-teal-200"
            />

            <p className="mt-2 text-xl font-black">
                {value}
            </p>

            <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">
                {label}
            </p>
        </div>
    );
}

/* =========================================================
   PROBLEM CARD
========================================================= */

function ProblemCard({
    problem,
    active,
    interestCount,
    formatDate,
    navigate,
}) {
    return (
        <div className="group border-b border-slate-100 p-5 last:border-0 transition hover:bg-slate-50/70 sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex min-w-0 flex-1 gap-3">

                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] text-white shadow-sm">
                        <Lightbulb size={17} />
                    </div>

                    <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                            <h3 className="max-w-[500px] truncate text-sm font-black text-[#1E1B4B] sm:text-base">
                                {problem.title}
                            </h3>

                            <span
                                className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase ${active
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-red-50 text-red-500"
                                    }`}
                            >
                                {active
                                    ? "Active"
                                    : "Expired"}
                            </span>

                        </div>

                        <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                            {problem.description ||
                                "No description available."}
                        </p>

                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {(problem.requiredSkills || [])
                                .slice(0, 4)
                                .map(
                                    (skill, index) => (
                                        <span
                                            key={`${skill}-${index}`}
                                            className="rounded-lg bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-500"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}
                        </div>

                    </div>
                </div>

                {/* RIGHT */}

                <div className="flex items-center justify-between gap-5 border-t border-slate-100 pt-3 lg:border-0 lg:pt-0">

                    <ProblemMetric
                        icon={Users}
                        value={interestCount}
                        label="Interests"
                    />

                    <ProblemMetric
                        icon={Eye}
                        value={0}
                        label="Views"
                    />

                    <ProblemMetric
                        icon={Clock3}
                        value={formatDate(
                            problem.deadline
                        )}
                        label="Deadline"
                        wide
                    />

                    <button
                        onClick={() =>
                            navigate(
                                `/stakeholder/problems/${problem._id}/responses`
                            )
                        }
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-teal-50 hover:text-[#14B8A6]"
                        title="View Responses"
                    >
                        <ArrowUpRight size={16} />
                    </button>

                </div>

            </div>
        </div>
    );
}

/* =========================================================
   PROBLEM METRIC
========================================================= */

function ProblemMetric({
    icon: Icon,
    value,
    label,
    wide = false,
}) {
    return (
        <div
            className={`text-center ${wide ? "hidden sm:block" : ""
                }`}
        >
            <div className="flex items-center justify-center gap-1 text-[#1E1B4B]">
                <Icon size={13} />

                <span className="text-xs font-black">
                    {value}
                </span>
            </div>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                {label}
            </p>
        </div>
    );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
    icon: Icon,
    title,
    description,
    color,
    onClick,
}) {
    const styles = {
        teal: {
            bg: "bg-teal-50",
            icon: "text-teal-600",
            hover: "hover:border-teal-200",
        },

        indigo: {
            bg: "bg-indigo-50",
            icon: "text-indigo-600",
            hover: "hover:border-indigo-200",
        },

        blue: {
            bg: "bg-blue-50",
            icon: "text-blue-600",
            hover: "hover:border-blue-200",
        },

        purple: {
            bg: "bg-purple-50",
            icon: "text-purple-600",
            hover: "hover:border-purple-200",
        },
    };

    const selected =
        styles[color] || styles.teal;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-left transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm ${selected.hover}`}
        >
            <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${selected.bg}`}
            >
                <Icon
                    size={17}
                    className={selected.icon}
                />
            </div>

            <h3 className="mt-2.5 text-xs font-black text-[#1E1B4B]">
                {title}
            </h3>

            <p className="mt-0.5 text-[9px] text-slate-400">
                {description}
            </p>
        </button>
    );
}

/* =========================================================
   SMALL STAT
========================================================= */

function SmallStat({
    value,
    label,
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-base font-black text-[#1E1B4B]">
                {value}
            </p>

            <p className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-slate-400">
                {label}
            </p>
        </div>
    );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyProblems({ onCreate }) {
    return (
        <div className="p-8 text-center sm:p-12">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
                <Lightbulb
                    size={24}
                    className="text-[#14B8A6]"
                />
            </div>

            <h3 className="mt-4 text-base font-black text-[#1E1B4B]">
                No Problems Posted Yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-400">
                Create your first real-world problem and
                start connecting with talented students.
            </p>

            <button
                onClick={onCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-2.5 text-xs font-black text-white transition hover:bg-teal-700"
            >
                <Plus size={16} />
                Create Problem
                <ArrowUpRight size={14} />
            </button>

        </div>
    );
}