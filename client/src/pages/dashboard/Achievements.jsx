import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Award,
    Check,
    ChevronRight,
    Flame,
    Lock,
    Sparkles,
    Star,
    Target,
    Trophy,
    Zap,
} from "lucide-react";

export default function Achievements() {
    const navigate = useNavigate();

    const [filter, setFilter] = useState("All");
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    const achievements = [
        {
            icon: "🚀",
            title: "Hackathon Explorer",
            description: "Participated in 10+ hackathons.",
            progress: 100,
            status: "Unlocked",
            color: "bg-purple-100",
            textColor: "text-purple-700",
            requirement: "Participate in 10 hackathons",
            reward: "300 XP",
        },
        {
            icon: "🤝",
            title: "Team Builder",
            description: "Successfully created 5 teams.",
            progress: 100,
            status: "Unlocked",
            color: "bg-blue-100",
            textColor: "text-blue-700",
            requirement: "Create 5 successful teams",
            reward: "250 XP",
        },
        {
            icon: "🏆",
            title: "Top Performer",
            description: "Achieve a match score above 90%.",
            progress: 100,
            status: "Unlocked",
            color: "bg-yellow-100",
            textColor: "text-yellow-700",
            requirement: "Achieve 90%+ match score",
            reward: "350 XP",
        },
        {
            icon: "🔥",
            title: "7 Day Streak",
            description: "Complete daily challenges for 7 days.",
            progress: 100,
            status: "Unlocked",
            color: "bg-orange-100",
            textColor: "text-orange-700",
            requirement: "Maintain a 7 day challenge streak",
            reward: "200 XP",
        },
        {
            icon: "⭐",
            title: "Skill Master",
            description: "Master 10 different technical skills.",
            progress: 70,
            status: "In Progress",
            color: "bg-teal-100",
            textColor: "text-teal-700",
            requirement: "Master 10 technical skills",
            reward: "500 XP",
        },
        {
            icon: "💡",
            title: "Innovation Expert",
            description: "Complete 20 project challenges.",
            progress: 55,
            status: "In Progress",
            color: "bg-pink-100",
            textColor: "text-pink-700",
            requirement: "Complete 20 project challenges",
            reward: "450 XP",
        },
        {
            icon: "🎯",
            title: "Challenge Champion",
            description: "Complete 30 daily challenges.",
            progress: 40,
            status: "In Progress",
            color: "bg-green-100",
            textColor: "text-green-700",
            requirement: "Complete 30 daily challenges",
            reward: "600 XP",
        },
        {
            icon: "👑",
            title: "CONEXA Legend",
            description: "Reach the highest level on CONEXA.",
            progress: 25,
            status: "Locked",
            color: "bg-slate-100",
            textColor: "text-slate-600",
            requirement: "Reach the highest CONEXA level",
            reward: "1000 XP",
        },
    ];

    const unlocked = achievements.filter(
        (item) => item.status === "Unlocked"
    ).length;

    const inProgress = achievements.filter(
        (item) => item.status === "In Progress"
    ).length;

    const filteredAchievements = useMemo(() => {
        if (filter === "All") return achievements;

        return achievements.filter(
            (achievement) => achievement.status === filter
        );
    }, [filter]);

    const handleAchievementClick = (achievement) => {
        setSelectedAchievement(achievement);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1E1B4B]">

            {/* ================= HEADER ================= */}

            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] text-xl shadow-md">
                            🏆
                        </div>

                        <div>
                            <h1 className="text-lg font-bold sm:text-2xl">
                                Achievements
                            </h1>

                            <p className="hidden text-xs text-slate-500 sm:block">
                                Your CONEXA journey
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm transition hover:border-[#1E1B4B] hover:bg-slate-50 sm:px-5"
                    >
                        <ArrowLeft
                            size={16}
                            className="transition group-hover:-translate-x-1"
                        />
                        <span>Dashboard</span>
                    </button>

                </div>
            </header>


            {/* ================= MAIN ================= */}

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* ================= HERO ================= */}

                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#14B8A6] p-6 text-white shadow-xl sm:p-8 lg:p-10">

                    {/* Decorative circles */}

                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
                    <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/5" />

                    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                        <div className="max-w-2xl">

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm sm:text-sm">
                                <Sparkles size={15} />
                                Your CONEXA Journey
                            </div>

                            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                                Keep Building,
                                <br />
                                Keep Achieving! 🚀
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                                Every challenge, hackathon and successful team
                                brings you one step closer to becoming a
                                CONEXA expert.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">

                                <button
                                    onClick={() => navigate("/daily-challenge")}
                                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1E1B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
                                >
                                    <Zap size={17} />
                                    Daily Challenge
                                    <ArrowRight size={16} />
                                </button>

                                <button
                                    onClick={() => navigate("/find-teammates")}
                                    className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/20"
                                >
                                    Find Teammates
                                </button>

                            </div>

                        </div>


                        {/* Achievement Circle */}

                        <div className="flex justify-center lg:pr-8">

                            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-white/15 bg-white/10 shadow-2xl backdrop-blur-md sm:h-52 sm:w-52">

                                <div className="absolute inset-2 rounded-full border border-white/10" />

                                <div className="text-center">
                                    <Trophy className="mx-auto mb-2 text-yellow-300" size={27} />

                                    <p className="text-4xl font-black">
                                        {unlocked}
                                    </p>

                                    <p className="text-sm text-white/70">
                                        of {achievements.length}
                                    </p>

                                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                                        Unlocked
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= STATS ================= */}

                <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                    <StatCard
                        icon={<Award size={22} />}
                        iconBg="bg-purple-100"
                        label="Total Achievements"
                        value={achievements.length}
                    />

                    <StatCard
                        icon={<Check size={22} />}
                        iconBg="bg-green-100"
                        label="Unlocked"
                        value={unlocked}
                        valueClass="text-green-600"
                    />

                    <StatCard
                        icon={<Star size={22} />}
                        iconBg="bg-yellow-100"
                        label="XP Earned"
                        value="2,450"
                    />

                    <StatCard
                        icon={<Flame size={22} />}
                        iconBg="bg-orange-100"
                        label="Current Level"
                        value="Level 8"
                    />

                </div>


                {/* ================= PROGRESS + QUICK INFO ================= */}

                <div className="mt-6 grid gap-6 lg:grid-cols-3">

                    {/* Progress */}

                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <div className="flex items-center gap-2">
                                    <Target size={19} />
                                    <h3 className="text-lg font-bold">
                                        Overall Progress
                                    </h3>
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    You're getting closer to becoming a CONEXA Legend.
                                </p>
                            </div>

                            <span className="rounded-xl bg-[#1E1B4B]/5 px-3 py-2 text-lg font-black text-[#1E1B4B]">
                                62%
                            </span>

                        </div>

                        <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">

                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#14B8A6] transition-all duration-700"
                                style={{ width: "62%" }}
                            />

                        </div>

                        <div className="mt-3 flex justify-between text-[11px] font-medium text-slate-400 sm:text-xs">
                            <span>Beginner</span>
                            <span>Intermediate</span>
                            <span>Expert</span>
                            <span>Legend</span>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">

                            <div className="rounded-2xl bg-slate-50 p-4 text-center">
                                <p className="text-xl font-bold">4</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Unlocked
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 text-center">
                                <p className="text-xl font-bold">{inProgress}</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    In Progress
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 text-center">
                                <p className="text-xl font-bold">
                                    {achievements.length - unlocked - inProgress}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Locked
                                </p>
                            </div>

                        </div>

                    </section>


                    {/* Next Goal */}

                    <section className="relative overflow-hidden rounded-3xl bg-[#1E1B4B] p-6 text-white shadow-lg">

                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#14B8A6]/20" />

                        <div className="relative">

                            <div className="flex items-center justify-between">
                                <span className="rounded-xl bg-white/10 p-3">
                                    🎯
                                </span>

                                <span className="text-xs font-semibold text-white/60">
                                    NEXT GOAL
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                Skill Master
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-white/65">
                                Master 3 more technical skills to unlock
                                your next achievement.
                            </p>

                            <div className="mt-6">

                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="text-white/60">
                                        Progress
                                    </span>
                                    <span className="font-bold">
                                        70%
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-[#14B8A6]"
                                        style={{ width: "70%" }}
                                    />
                                </div>

                            </div>

                            <button
                                onClick={() => navigate("/profile")}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#1E1B4B] transition hover:bg-slate-100"
                            >
                                Improve Skills
                                <ChevronRight size={16} />
                            </button>

                        </div>

                    </section>

                </div>


                {/* ================= ACHIEVEMENTS HEADER ================= */}

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="flex items-center gap-2">
                            <Trophy size={21} />
                            <h3 className="text-2xl font-bold">
                                Your Achievements
                            </h3>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            Unlock badges by completing challenges and reaching milestones.
                        </p>
                    </div>


                    {/* Filters */}

                    <div className="flex w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:w-auto">

                        {["All", "Unlocked", "In Progress", "Locked"].map(
                            (item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 ${filter === item
                                            ? "bg-[#1E1B4B] text-white shadow"
                                            : "text-slate-500 hover:bg-slate-50"
                                        }`}
                                >
                                    {item}
                                </button>
                            )
                        )}

                    </div>

                </div>


                {/* ================= ACHIEVEMENT GRID ================= */}

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    {filteredAchievements.map((achievement, index) => (

                        <button
                            key={index}
                            onClick={() => handleAchievementClick(achievement)}
                            className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#312E81]/20 hover:shadow-xl ${achievement.status === "Locked"
                                    ? "opacity-80"
                                    : ""
                                }`}
                        >

                            {/* Top glow */}

                            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-slate-50 transition group-hover:scale-150" />

                            <div className="relative">

                                <div className="flex items-start justify-between gap-3">

                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${achievement.color} text-2xl shadow-sm transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                    >
                                        {achievement.icon}
                                    </div>

                                    {achievement.status === "Unlocked" && (
                                        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
                                            <Check size={11} />
                                            UNLOCKED
                                        </span>
                                    )}

                                    {achievement.status === "In Progress" && (
                                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                                            IN PROGRESS
                                        </span>
                                    )}

                                    {achievement.status === "Locked" && (
                                        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                                            <Lock size={10} />
                                            LOCKED
                                        </span>
                                    )}

                                </div>


                                <h4 className="mt-5 text-lg font-bold transition group-hover:text-[#312E81]">
                                    {achievement.title}
                                </h4>

                                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                                    {achievement.description}
                                </p>


                                {/* Progress */}

                                <div className="mt-5">

                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-400">
                                            Progress
                                        </span>

                                        <span className={`text-xs font-bold ${achievement.textColor}`}>
                                            {achievement.progress}%
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] transition-all duration-700"
                                            style={{
                                                width: `${achievement.progress}%`,
                                            }}
                                        />

                                    </div>

                                </div>


                                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                                    <span className="text-xs text-slate-400">
                                        {achievement.reward}
                                    </span>

                                    <span className="flex items-center gap-1 text-xs font-semibold text-[#312E81]">
                                        View Details
                                        <ChevronRight
                                            size={14}
                                            className="transition group-hover:translate-x-1"
                                        />
                                    </span>

                                </div>

                            </div>

                        </button>

                    ))}

                </div>


                {/* ================= MOTIVATION ================= */}

                <section className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] p-6 text-white shadow-lg sm:p-7">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-start gap-4">

                            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:flex">
                                🔥
                            </div>

                            <div>
                                <h3 className="text-lg font-bold sm:text-xl">
                                    Your next achievement is waiting!
                                </h3>

                                <p className="mt-1 text-sm text-white/70">
                                    Complete today's Daily Challenge and keep your streak alive.
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => navigate("/daily-challenge")}
                            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1E1B4B] shadow-md transition hover:-translate-y-0.5 hover:bg-slate-100"
                        >
                            Start Challenge
                            <ArrowRight size={16} />
                        </button>

                    </div>

                </section>

            </main>


            {/* ================= ACHIEVEMENT MODAL ================= */}

            {selectedAchievement && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedAchievement(null)}
                >

                    <div
                        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] p-7 text-center text-white">

                            <div
                                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${selectedAchievement.color} text-4xl shadow-lg`}
                            >
                                {selectedAchievement.icon}
                            </div>

                            <h3 className="mt-4 text-2xl font-bold">
                                {selectedAchievement.title}
                            </h3>

                            <p className="mt-1 text-sm text-white/70">
                                {selectedAchievement.status}
                            </p>

                        </div>

                        <div className="p-6">

                            <p className="text-sm leading-6 text-slate-500">
                                {selectedAchievement.description}
                            </p>

                            <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">
                                        Progress
                                    </span>

                                    <span className="font-bold">
                                        {selectedAchievement.progress}%
                                    </span>
                                </div>

                                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]"
                                        style={{
                                            width: `${selectedAchievement.progress}%`,
                                        }}
                                    />
                                </div>

                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <div className="rounded-2xl border border-slate-100 p-4">
                                    <p className="text-xs text-slate-400">
                                        Requirement
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {selectedAchievement.requirement}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-100 p-4">
                                    <p className="text-xs text-slate-400">
                                        Reward
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        ⭐ {selectedAchievement.reward}
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="mt-5 w-full rounded-xl bg-[#1E1B4B] py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


/* ================= STAT CARD ================= */

function StatCard({
    icon,
    iconBg,
    label,
    value,
    valueClass = "",
}) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

            <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                    <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
                        {label}
                    </p>

                    <p
                        className={`mt-2 text-xl font-black sm:text-2xl ${valueClass}`}
                    >
                        {value}
                    </p>

                </div>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} transition duration-300 group-hover:scale-110`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}