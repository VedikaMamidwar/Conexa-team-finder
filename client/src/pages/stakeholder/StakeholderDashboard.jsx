import React, { useEffect, useState } from "react";
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
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function StakeholderDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [problems, setProblems] = useState([]);
    const [interestCounts, setInterestCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // FETCH DASHBOARD DATA
    // =====================================================

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

            // ---------------------------------------------
            // GET ALL PROBLEMS
            // ---------------------------------------------

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

            // ---------------------------------------------
            // CURRENT USER
            // ---------------------------------------------

            const storedUser = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            const currentUserId =
                user?._id ||
                user?.id ||
                storedUser?._id ||
                storedUser?.id;

            // ---------------------------------------------
            // FILTER CURRENT STAKEHOLDER'S PROBLEMS
            // ---------------------------------------------

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

            // ---------------------------------------------
            // GET INTEREST COUNTS
            // ---------------------------------------------

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

    // =====================================================
    // HELPERS
    // =====================================================

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

    // =====================================================
    // STATISTICS
    // =====================================================

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

    const totalResponses = totalInterests;

    const stats = [
        {
            title: "Total Problems",
            value: totalProblems,
            change: "Problems posted",
            icon: Lightbulb,
            iconBg: "bg-teal-50",
            iconColor: "text-[#14B8A6]",
        },
        {
            title: "Student Interests",
            value: totalInterests,
            change: "Students interested",
            icon: Users,
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600",
        },
        {
            title: "Active Problems",
            value: activeProblems,
            change: "Currently active",
            icon: BriefcaseBusiness,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Responses",
            value: totalResponses,
            change: "Student responses",
            icon: MessageCircle,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },
    ];

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto w-10 h-10 border-4 border-slate-200 border-t-[#14B8A6] rounded-full animate-spin" />

                    <p className="mt-4 text-sm font-semibold text-slate-500">
                        Loading stakeholder dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // =====================================================
    // DASHBOARD
    // =====================================================

    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px]">

                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#14B8A6] p-6 text-white shadow-xl sm:p-8">

                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                    <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-teal-300/10" />

                    <div className="absolute left-1/2 top-0 h-32 w-32 rounded-full bg-indigo-300/10 blur-2xl" />

                    <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                        <div>

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur-md">
                                <Sparkles size={14} />
                                STAKEHOLDER SPACE
                            </div>

                            <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                                Welcome back,{" "}
                                <span className="text-teal-200">
                                    {user?.name || "Stakeholder"}
                                </span>{" "}
                                👋
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                                Turn real-world challenges into meaningful
                                opportunities for talented students.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    "/stakeholder/create-problem"
                                )
                            }
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-[#1E1B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl"
                        >
                            <Plus size={19} />
                            Create Problem
                        </button>

                    </div>
                </section>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                        <span>{error}</span>

                        <button
                            onClick={fetchDashboardData}
                            className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold hover:bg-red-200"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >

                                <div className="flex items-start justify-between">

                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}
                                    >
                                        <Icon
                                            size={22}
                                            className={stat.iconColor}
                                        />
                                    </div>

                                    <ArrowUpRight
                                        size={18}
                                        className="text-slate-300 transition group-hover:text-[#14B8A6]"
                                    />

                                </div>

                                <p className="mt-4 text-sm font-medium text-slate-500">
                                    {stat.title}
                                </p>

                                <h2 className="mt-1 text-3xl font-black text-[#1E1B4B]">
                                    {stat.value}
                                </h2>

                                <p className="mt-1 text-xs font-semibold text-[#14B8A6]">
                                    {stat.change}
                                </p>

                            </div>
                        );
                    })}

                </section>

                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

                    {/* =================================================
                        RECENT PROBLEMS
                    ================================================= */}

                    <section className="xl:col-span-8">

                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-5 flex items-center justify-between gap-3">

                                <div className="flex items-center gap-2">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                        <Lightbulb
                                            size={19}
                                            className="text-[#14B8A6]"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-[#1E1B4B]">
                                            My Problems
                                        </h2>

                                        <p className="text-xs text-slate-500">
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
                                    className="hidden items-center gap-1 text-sm font-bold text-[#14B8A6] hover:text-teal-700 sm:flex"
                                >
                                    View All
                                    <ArrowUpRight size={16} />
                                </button>

                            </div>

                            {/* =================================================
                                EMPTY STATE
                            ================================================= */}

                            {problems.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">

                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
                                        <Lightbulb
                                            size={24}
                                            className="text-[#14B8A6]"
                                        />
                                    </div>

                                    <h3 className="mt-4 font-black text-[#1E1B4B]">
                                        No Problems Posted Yet
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Create your first real-world
                                        problem and start connecting
                                        with students.
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/stakeholder/create-problem"
                                            )
                                        }
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
                                    >
                                        <Plus size={17} />
                                        Create Problem
                                    </button>

                                </div>
                            ) : (

                                <div className="space-y-3">

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
                                                <div
                                                    key={problem._id}
                                                    className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition duration-300 hover:border-teal-100 hover:bg-white hover:shadow-md"
                                                >

                                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                                        {/* LEFT */}

                                                        <div className="min-w-0">

                                                            <div className="flex items-start gap-3">

                                                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] text-white">
                                                                    <Lightbulb size={18} />
                                                                </div>

                                                                <div className="min-w-0">

                                                                    <div className="flex flex-wrap items-center gap-2">

                                                                        <h3 className="font-bold text-[#1E1B4B]">
                                                                            {problem.title}
                                                                        </h3>

                                                                        <span
                                                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${active
                                                                                ? "bg-green-50 text-green-600"
                                                                                : "bg-red-50 text-red-600"
                                                                                }`}
                                                                        >
                                                                            {active
                                                                                ? "Active"
                                                                                : "Expired"}
                                                                        </span>

                                                                    </div>

                                                                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                                                        {problem.description}
                                                                    </p>

                                                                    <div className="mt-2 flex flex-wrap gap-1.5">

                                                                        {(problem.requiredSkills || [])
                                                                            .slice(0, 4)
                                                                            .map(
                                                                                (
                                                                                    skill,
                                                                                    index
                                                                                ) => (
                                                                                    <span
                                                                                        key={`${skill}-${index}`}
                                                                                        className="rounded-lg bg-white px-2 py-1 text-[10px] font-semibold text-slate-600"
                                                                                    >
                                                                                        {skill}
                                                                                    </span>
                                                                                )
                                                                            )}

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* RIGHT */}

                                                        <div className="flex shrink-0 items-center gap-4 lg:gap-6">

                                                            {/* INTERESTS */}

                                                            <div className="text-center">

                                                                <div className="flex items-center justify-center gap-1 text-[#1E1B4B]">
                                                                    <Users size={14} />

                                                                    <span className="text-sm font-bold">
                                                                        {interestCount}
                                                                    </span>
                                                                </div>

                                                                <p className="mt-0.5 text-[10px] text-slate-400">
                                                                    Interests
                                                                </p>

                                                            </div>

                                                            {/* VIEWS */}

                                                            <div className="text-center">

                                                                <div className="flex items-center justify-center gap-1 text-[#1E1B4B]">
                                                                    <Eye size={14} />

                                                                    <span className="text-sm font-bold">
                                                                        0
                                                                    </span>
                                                                </div>

                                                                <p className="mt-0.5 text-[10px] text-slate-400">
                                                                    Views
                                                                </p>

                                                            </div>

                                                            {/* DEADLINE */}

                                                            <div className="hidden text-center sm:block">

                                                                <div className="flex items-center justify-center gap-1 text-[#1E1B4B]">

                                                                    <Clock3 size={14} />

                                                                    <span className="text-xs font-bold">
                                                                        {formatDate(
                                                                            problem.deadline
                                                                        )}
                                                                    </span>

                                                                </div>

                                                                <p className="mt-0.5 text-[10px] text-slate-400">
                                                                    Deadline
                                                                </p>

                                                            </div>

                                                            {/* RESPONSES */}

                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/stakeholder/problems/${problem._id}/responses`
                                                                    )
                                                                }
                                                                title="View Responses"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600"
                                                            >
                                                                <Users size={18} />
                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>
                                            );
                                        })}

                                </div>
                            )}

                            {/* MOBILE VIEW ALL */}

                            {problems.length > 0 && (
                                <button
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/problems"
                                        )
                                    }
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-bold text-[#1E1B4B] transition hover:bg-teal-50 hover:text-[#14B8A6] sm:hidden"
                                >
                                    View All Problems
                                    <ArrowUpRight size={16} />
                                </button>
                            )}

                        </div>

                    </section>

                    {/* =================================================
                        RIGHT PANEL
                    ================================================= */}

                    <aside className="space-y-6 xl:col-span-4">

                        {/* =================================================
                            QUICK ACTIONS
                        ================================================= */}

                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-5">

                                <h2 className="text-lg font-black text-[#1E1B4B]">
                                    Quick Actions
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Manage your stakeholder activity
                                </p>

                            </div>

                            <div className="grid grid-cols-2 gap-3">

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

                        {/* =================================================
                            PROFILE CARD
                        ================================================= */}

                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-6 text-white shadow-lg">

                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-400/10" />

                            <div className="relative">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-black backdrop-blur-sm">
                                        {user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "S"}
                                    </div>

                                    <div>

                                        <h3 className="font-black">
                                            {user?.name ||
                                                "Stakeholder"}
                                        </h3>

                                        <p className="text-xs text-white/60">
                                            Stakeholder Account
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">

                                    <div className="flex items-center gap-2">

                                        <CheckCircle2
                                            size={17}
                                            className="text-teal-300"
                                        />

                                        <span className="text-sm font-semibold">
                                            Profile Verified
                                        </span>

                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-white/60">
                                        A complete profile helps
                                        students understand your
                                        organization better.
                                    </p>

                                </div>

                                {/* PROFILE BUTTON */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/stakeholder/profile"
                                        )
                                    }
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#1E1B4B] transition hover:-translate-y-0.5 hover:bg-teal-50 hover:text-[#0F766E]"
                                >
                                    <UserCircle size={18} />
                                    Manage Profile
                                    <ArrowUpRight size={15} />
                                </button>

                            </div>

                        </div>

                        {/* =================================================
                            TIP
                        ================================================= */}

                        <div className="rounded-3xl border border-teal-100 bg-teal-50 p-5">

                            <div className="flex items-start gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <Sparkles
                                        size={18}
                                        className="text-[#14B8A6]"
                                    />
                                </div>

                                <div>

                                    <h3 className="text-sm font-black text-[#1E1B4B]">
                                        Get better responses
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-slate-600">
                                        Add clear requirements,
                                        useful technologies and a
                                        realistic deadline to attract
                                        better student teams.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>
        </div>
    );
}


/* =========================================================
   QUICK ACTION COMPONENT
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
        },

        indigo: {
            bg: "bg-indigo-50",
            icon: "text-indigo-600",
        },

        blue: {
            bg: "bg-blue-50",
            icon: "text-blue-600",
        },

        purple: {
            bg: "bg-purple-50",
            icon: "text-purple-600",
        },
    };

    const selectedStyle =
        styles[color] || styles.teal;

    return (
        <button
            type="button"
            onClick={onClick}
            className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
        >

            <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${selectedStyle.bg}`}
            >
                <Icon
                    size={18}
                    className={selectedStyle.icon}
                />
            </div>

            <h3 className="mt-3 text-sm font-bold text-[#1E1B4B]">
                {title}
            </h3>

            <p className="mt-1 text-[10px] text-slate-500">
                {description}
            </p>

        </button>
    );
}