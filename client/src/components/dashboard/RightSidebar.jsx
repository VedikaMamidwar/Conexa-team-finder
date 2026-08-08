import { motion } from "framer-motion";
import {
    CalendarDays,
    Trophy,
    TrendingUp,
    Code2,
    Medal,
    ChevronRight,
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
    return (
        <div className="space-y-6">

            {/* Upcoming Events */}

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6"
            >

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                        <CalendarDays className="text-blue-700" />

                    </div>

                    <h2 className="font-bold text-lg text-[#1E1B4B]">
                        Upcoming Events
                    </h2>

                </div>

                {events.map((event) => (

                    <div
                        key={event.title}
                        className="flex justify-between items-center py-3 border-b last:border-0"
                    >

                        <div>

                            <h3 className="font-semibold text-[#1E1B4B]">
                                {event.title}
                            </h3>

                            <p className="text-sm text-slate-500">
                                {event.date}
                            </p>

                        </div>

                        <ChevronRight size={18} />

                    </div>

                ))}

            </motion.div>

            {/* Leaderboard */}

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6"
            >

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">

                        <Trophy className="text-yellow-600" />

                    </div>

                    <h2 className="font-bold text-lg text-[#1E1B4B]">
                        Leaderboard
                    </h2>

                </div>

                {leaderboard.map((user, index) => (

                    <div
                        key={user.name}
                        className="flex justify-between items-center py-3"
                    >

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-bold">

                                {index + 1}

                            </div>

                            <div>

                                <h3 className="font-semibold">
                                    {user.name}
                                </h3>

                                <p className="text-xs text-slate-500">
                                    {user.score}% Match
                                </p>

                            </div>

                        </div>

                        <Medal className="text-yellow-500" />

                    </div>

                ))}

            </motion.div>

            {/* Trending Skills */}

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6"
            >

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center">

                        <TrendingUp className="text-cyan-700" />

                    </div>

                    <h2 className="font-bold text-lg text-[#1E1B4B]">
                        Trending Skills
                    </h2>

                </div>

                <div className="flex flex-wrap gap-3">

                    {skills.map((skill) => (

                        <div
                            key={skill}
                            className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full"
                        >

                            <Code2 size={15} />

                            {skill}

                        </div>

                    ))}

                </div>

            </motion.div>

            {/* Daily Challenge */}

            <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] text-white p-6"
            >

                <h2 className="text-xl font-bold">
                    🚀 Daily Challenge
                </h2>

                <p className="mt-3 text-white/80 leading-7">
                    Complete one React problem today and improve your profile score.
                </p>

                <button className="mt-6 w-full bg-white text-[#1E1B4B] py-3 rounded-xl font-semibold hover:scale-105 transition">
                    Start Challenge
                </button>

            </motion.div>

        </div>
    );
}