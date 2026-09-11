import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Trophy,
    TrendingUp,
    Code2,
    Medal,
    ChevronRight,
    ArrowRight,
} from "lucide-react";

const events = [
    {
        title: "Smart India Hackathon",
        date: "12 Sept",
    },
    {
        title: "HackNova Registration",
        date: "18 Sept",
    },
];

const leaderboard = [
    {
        name: "Rahul",
        score: 98,
    },
    {
        name: "Vedika",
        score: 96,
    },
    {
        name: "Priya",
        score: 95,
    },
];

const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "UI/UX",
    "Python",
    "AI",
];

export default function RightSidebar() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            {/* =====================================================
                UPCOMING EVENTS
            ===================================================== */}

            <motion.div
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
            >
                {/* HEADER */}

                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                        <CalendarDays
                            size={22}
                            className="text-blue-700"
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#1E1B4B]">
                            Upcoming Events
                        </h2>

                        <p className="text-xs text-slate-500">
                            Don't miss out
                        </p>
                    </div>

                </div>

                {/* EVENTS */}

                <div>
                    {events.map((event) => (
                        <button
                            key={event.title}
                            onClick={() =>
                                navigate("/events")
                            }
                            className="flex w-full items-center justify-between border-b border-slate-100 py-3 text-left transition last:border-0 hover:bg-slate-50"
                        >
                            <div className="min-w-0 pr-3">

                                <h3 className="truncate font-semibold text-[#1E1B4B]">
                                    {event.title}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    {event.date}
                                </p>

                            </div>

                            <ChevronRight
                                size={18}
                                className="shrink-0 text-slate-400"
                            />
                        </button>
                    ))}
                </div>

                {/* VIEW ALL */}

                <button
                    onClick={() =>
                        navigate("/events")
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-sm font-semibold text-[#1E1B4B] transition hover:bg-indigo-50"
                >
                    View all events
                    <ArrowRight size={16} />
                </button>
            </motion.div>


            {/* =====================================================
                LEADERBOARD
            ===================================================== */}

            <motion.div
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
            >
                {/* HEADER */}

                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">
                        <Trophy
                            size={22}
                            className="text-yellow-600"
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#1E1B4B]">
                            Leaderboard
                        </h2>

                        <p className="text-xs text-slate-500">
                            Top performers
                        </p>
                    </div>

                </div>

                {/* LEADERBOARD */}

                <div className="space-y-2">

                    {leaderboard.map((user, index) => (
                        <div
                            key={user.name}
                            className="flex items-center justify-between rounded-2xl p-2.5 transition hover:bg-slate-50"
                        >
                            <div className="flex items-center gap-3">

                                {/* RANK */}

                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-white ${index === 0
                                            ? "bg-yellow-500"
                                            : index === 1
                                                ? "bg-slate-400"
                                                : "bg-orange-400"
                                        }`}
                                >
                                    {index + 1}
                                </div>

                                {/* USER */}

                                <div>
                                    <h3 className="font-semibold text-[#1E1B4B]">
                                        {user.name}
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        {user.score}% Match
                                    </p>
                                </div>

                            </div>

                            <Medal
                                size={19}
                                className={
                                    index === 0
                                        ? "text-yellow-500"
                                        : "text-slate-400"
                                }
                            />
                        </div>
                    ))}

                </div>

                <div className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-center">
                    <p className="text-xs font-semibold text-indigo-700">
                        Complete challenges to improve your ranking 🚀
                    </p>
                </div>
            </motion.div>


            {/* =====================================================
                TRENDING SKILLS
            ===================================================== */}

            <motion.div
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
            >
                {/* HEADER */}

                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100">
                        <TrendingUp
                            size={22}
                            className="text-cyan-700"
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#1E1B4B]">
                            Trending Skills
                        </h2>

                        <p className="text-xs text-slate-500">
                            Popular right now
                        </p>
                    </div>

                </div>

                {/* SKILLS */}

                <div className="flex flex-wrap gap-2.5">

                    {skills.map((skill) => (
                        <div
                            key={skill}
                            className="flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-[#0F766E]"
                        >
                            <Code2 size={14} />
                            {skill}
                        </div>
                    ))}

                </div>
            </motion.div>


            {/* =====================================================
                DAILY CHALLENGE
            ===================================================== */}

            <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] p-6 text-white shadow-lg"
            >
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">
                        🚀 Daily Challenge
                    </h2>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <Code2 size={20} />
                    </div>

                </div>

                <p className="mt-3 leading-7 text-white/80">
                    Complete one coding problem every day
                    and improve your profile score.
                </p>

                {/* CHALLENGE INFO */}

                <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                    <Trophy size={16} />
                    <span>
                        Earn points & build your streak
                    </span>
                </div>

                {/* START BUTTON */}

                <button
                    onClick={() =>
                        navigate("/daily-challenge")
                    }
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-[#1E1B4B] transition hover:scale-[1.02] hover:shadow-lg"
                >
                    Start Challenge
                    <ArrowRight size={17} />
                </button>

            </motion.div>

        </div>
    );
}