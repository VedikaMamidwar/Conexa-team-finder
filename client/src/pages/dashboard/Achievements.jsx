import React from "react";
import { useNavigate } from "react-router-dom";

export default function Achievements() {
    const navigate = useNavigate();

    const achievements = [
        {
            icon: "🚀",
            title: "Hackathon Explorer",
            description: "Participated in 10+ hackathons.",
            progress: 100,
            status: "Unlocked",
            color: "bg-purple-100",
        },
        {
            icon: "🤝",
            title: "Team Builder",
            description: "Successfully created 5 teams.",
            progress: 100,
            status: "Unlocked",
            color: "bg-blue-100",
        },
        {
            icon: "🏆",
            title: "Top Performer",
            description: "Achieve a match score above 90%.",
            progress: 100,
            status: "Unlocked",
            color: "bg-yellow-100",
        },
        {
            icon: "🔥",
            title: "7 Day Streak",
            description: "Complete daily challenges for 7 days.",
            progress: 100,
            status: "Unlocked",
            color: "bg-orange-100",
        },
        {
            icon: "⭐",
            title: "Skill Master",
            description: "Master 10 different technical skills.",
            progress: 70,
            status: "In Progress",
            color: "bg-teal-100",
        },
        {
            icon: "💡",
            title: "Innovation Expert",
            description: "Complete 20 project challenges.",
            progress: 55,
            status: "In Progress",
            color: "bg-pink-100",
        },
        {
            icon: "🎯",
            title: "Challenge Champion",
            description: "Complete 30 daily challenges.",
            progress: 40,
            status: "In Progress",
            color: "bg-green-100",
        },
        {
            icon: "👑",
            title: "CONEXA Legend",
            description: "Reach the highest level on CONEXA.",
            progress: 25,
            status: "Locked",
            color: "bg-slate-100",
        },
    ];

    const unlocked = achievements.filter(
        (item) => item.status === "Unlocked"
    ).length;

    return (
        <div className="min-h-screen bg-slate-100 text-[#1E1B4B]">

            {/* ================= HEADER ================= */}

            <header className="bg-white border-b border-slate-200 px-6 py-5">

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-bold">
                            🏆 Achievements
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Track your progress and celebrate your CONEXA
                            journey.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition"
                    >
                        ← Dashboard
                    </button>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <main className="max-w-7xl mx-auto p-6">

                {/* ================= HERO ================= */}

                <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#19B5A5] text-white p-8 md:p-10 shadow-lg">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                        <div>

                            <span className="inline-flex px-4 py-2 rounded-full bg-white/15 text-sm font-medium backdrop-blur-sm">
                                ✨ Your CONEXA Journey
                            </span>

                            <h2 className="text-3xl md:text-4xl font-bold mt-5">
                                Keep Building,
                                <br />
                                Keep Achieving! 🚀
                            </h2>

                            <p className="text-white/80 mt-4 max-w-xl leading-7">
                                Every challenge, hackathon and successful team
                                brings you one step closer to becoming a
                                CONEXA expert.
                            </p>

                        </div>


                        {/* Achievement Circle */}

                        <div className="flex justify-center">

                            <div className="w-40 h-40 rounded-full border-8 border-white/20 flex items-center justify-center bg-white/10">

                                <div className="text-center">

                                    <p className="text-4xl font-bold">
                                        {unlocked}
                                    </p>

                                    <p className="text-sm text-white/80">
                                        of {achievements.length}
                                    </p>

                                    <p className="text-xs mt-1">
                                        Unlocked
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= STATS ================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Total Achievements
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    {achievements.length}
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                                🏆
                            </div>

                        </div>

                    </div>


                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Unlocked
                                </p>

                                <p className="text-3xl font-bold mt-2 text-green-600">
                                    {unlocked}
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                                ✅
                            </div>

                        </div>

                    </div>


                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    XP Earned
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    2,450
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                                ⭐
                            </div>

                        </div>

                    </div>


                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Current Level
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    Level 8
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                                🚀
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= PROGRESS ================= */}

                <section className="bg-white rounded-3xl p-7 mt-6 border border-slate-200 shadow-sm">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">

                        <div>
                            <h3 className="text-xl font-bold">
                                Overall Progress
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                You are making great progress!
                            </p>
                        </div>

                        <p className="text-2xl font-bold">
                            62%
                        </p>

                    </div>

                    <div className="w-full h-4 bg-slate-100 rounded-full mt-5 overflow-hidden">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#19B5A5]"
                            style={{ width: "62%" }}
                        />

                    </div>

                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Expert</span>
                        <span>Legend</span>
                    </div>

                </section>


                {/* ================= ACHIEVEMENT GRID ================= */}

                <div className="flex items-center justify-between mt-8 mb-5">

                    <div>
                        <h3 className="text-2xl font-bold">
                            Your Achievements
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Unlock badges by completing challenges and
                            reaching milestones.
                        </p>
                    </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                    {achievements.map((achievement, index) => (

                        <div
                            key={index}
                            className={`bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 ${achievement.status === "Locked"
                                    ? "opacity-75"
                                    : ""
                                }`}
                        >

                            {/* Icon */}

                            <div className="flex items-start justify-between">

                                <div
                                    className={`w-16 h-16 rounded-2xl ${achievement.color} flex items-center justify-center text-3xl`}
                                >
                                    {achievement.icon}
                                </div>

                                {achievement.status === "Unlocked" && (
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                                        ✓ Unlocked
                                    </span>
                                )}

                                {achievement.status === "In Progress" && (
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                                        In Progress
                                    </span>
                                )}

                                {achievement.status === "Locked" && (
                                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                                        🔒 Locked
                                    </span>
                                )}

                            </div>


                            {/* Content */}

                            <h4 className="text-lg font-bold mt-5">
                                {achievement.title}
                            </h4>

                            <p className="text-sm text-slate-500 mt-2 leading-6">
                                {achievement.description}
                            </p>


                            {/* Progress */}

                            <div className="mt-5">

                                <div className="flex justify-between text-xs mb-2">

                                    <span className="text-slate-500">
                                        Progress
                                    </span>

                                    <span className="font-semibold">
                                        {achievement.progress}%
                                    </span>

                                </div>

                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#19B5A5]"
                                        style={{
                                            width: `${achievement.progress}%`,
                                        }}
                                    />

                                </div>

                            </div>


                            {/* Bottom */}

                            <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100">

                                <span className="text-xs text-slate-400">
                                    CONEXA Badge
                                </span>

                                {achievement.status === "Unlocked" ? (
                                    <span className="text-xl">
                                        🏅
                                    </span>
                                ) : (
                                    <span className="text-xl">
                                        🔒
                                    </span>
                                )}

                            </div>

                        </div>

                    ))}

                </div>


                {/* ================= MOTIVATION ================= */}

                <section className="mt-8 rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#19B5A5] p-7 text-white">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                        <div>

                            <h3 className="text-xl font-bold">
                                🎯 Your next achievement is waiting!
                            </h3>

                            <p className="text-white/80 mt-2">
                                Complete today's Daily Challenge to move
                                closer to your next badge.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/daily-challenge")}
                            className="px-6 py-3 rounded-xl bg-white text-[#1E1B4B] font-semibold hover:bg-slate-100 transition"
                        >
                            Start Challenge →
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}