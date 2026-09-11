import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Trophy,
    Medal,
    Award,
    Star,
    Users,
    Code2,
    ArrowLeft,
    Plus,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

const achievements = [
    {
        id: 1,
        title: "Hackathon Winner",
        description: "Won 1st position in a college-level hackathon.",
        category: "Hackathon",
        date: "August 2026",
        icon: Trophy,
    },
    {
        id: 2,
        title: "MERN Developer",
        description:
            "Successfully completed multiple full-stack MERN projects.",
        category: "Development",
        date: "July 2026",
        icon: Code2,
    },
    {
        id: 3,
        title: "Team Leader",
        description:
            "Led a student team and successfully completed a project.",
        category: "Leadership",
        date: "June 2026",
        icon: Users,
    },
    {
        id: 4,
        title: "Coding Champion",
        description:
            "Completed multiple coding challenges and improved problem-solving skills.",
        category: "Coding",
        date: "May 2026",
        icon: Medal,
    },
];

export default function Achievements() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [achievementList, setAchievementList] =
        useState(achievements);

    const handleAddAchievement = () => {
        const newAchievement = {
            id: achievementList.length + 1,
            title: "New Achievement",
            description:
                "Your new achievement has been added successfully.",
            category: "Achievement",
            date: "September 2026",
            icon: Award,
        };

        setAchievementList([
            newAchievement,
            ...achievementList,
        ]);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">

            {/* ================= SIDEBAR ================= */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* ================= MAIN ================= */}

            <div
                className={`min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen
                        ? "lg:ml-72"
                        : "lg:ml-24"
                    }`}
            >

                {/* ================= TOPBAR ================= */}

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* ================= CONTENT ================= */}

                <main className="flex-1 p-4 sm:p-6 lg:p-8">

                    {/* HEADER */}

                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div className="flex items-start gap-3">

                            <button
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm transition hover:bg-slate-100"
                            >
                                <ArrowLeft size={19} />
                            </button>

                            <div>

                                <p className="text-sm font-semibold text-[#14B8A6]">
                                    YOUR PROGRESS
                                </p>

                                <h1 className="mt-1 text-3xl font-black text-[#1E1B4B]">
                                    Achievements
                                </h1>

                                <p className="mt-2 text-sm text-slate-500">
                                    Track your milestones, skills and
                                    accomplishments.
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={handleAddAchievement}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d286b]"
                        >
                            <Plus size={18} />
                            Add Achievement
                        </button>

                    </div>

                    {/* ================= STATS ================= */}

                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <StatCard
                            icon={<Trophy size={22} />}
                            title="Total Achievements"
                            value={achievementList.length}
                        />

                        <StatCard
                            icon={<Star size={22} />}
                            title="Points Earned"
                            value="850"
                        />

                        <StatCard
                            icon={<Medal size={22} />}
                            title="Badges"
                            value="12"
                        />

                        <StatCard
                            icon={<Award size={22} />}
                            title="Rank"
                            value="#24"
                        />

                    </div>

                    {/* ================= ACHIEVEMENT LIST ================= */}

                    <div className="mb-5">

                        <h2 className="text-xl font-bold text-[#1E1B4B]">
                            Your Achievements
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your latest accomplishments and milestones
                        </p>

                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                        {achievementList.map((achievement, index) => {

                            const Icon = achievement.icon;

                            return (
                                <motion.div
                                    key={achievement.id}
                                    initial={{
                                        opacity: 0,
                                        y: 15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                    }}
                                    whileHover={{
                                        y: -4,
                                    }}
                                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
                                >

                                    <div className="flex gap-4">

                                        {/* ICON */}

                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-teal-50 text-[#1E1B4B]">
                                            <Icon size={27} />
                                        </div>

                                        {/* CONTENT */}

                                        <div className="min-w-0 flex-1">

                                            <div className="flex flex-wrap items-start justify-between gap-2">

                                                <div>

                                                    <h3 className="text-lg font-bold text-[#1E1B4B]">
                                                        {achievement.title}
                                                    </h3>

                                                    <span className="mt-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700">
                                                        {achievement.category}
                                                    </span>

                                                </div>

                                                <span className="text-xs font-medium text-slate-400">
                                                    {achievement.date}
                                                </span>

                                            </div>

                                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                                {achievement.description}
                                            </p>

                                        </div>

                                    </div>

                                    {/* PROGRESS */}

                                    <div className="mt-5">

                                        <div className="mb-2 flex justify-between text-xs">

                                            <span className="font-medium text-slate-500">
                                                Achievement Progress
                                            </span>

                                            <span className="font-bold text-[#14B8A6]">
                                                100%
                                            </span>

                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: index * 0.1,
                                                }}
                                                className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]"
                                            />

                                        </div>

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>

                    {/* ================= EMPTY STATE ================= */}

                    {achievementList.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-[#1E1B4B]">
                                <Trophy size={30} />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-[#1E1B4B]">
                                No achievements yet
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Start participating in hackathons,
                                projects and coding challenges.
                            </p>

                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}


/* ================= STAT CARD ================= */

function StatCard({ icon, title, value }) {

    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >

            <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#1E1B4B]">
                    {icon}
                </div>

                <div>

                    <p className="text-xs font-medium text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-1 text-xl font-black text-[#1E1B4B]">
                        {value}
                    </h3>

                </div>

            </div>

        </motion.div>
    );
}