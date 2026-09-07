import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    PlayCircle,
    Users,
    Trophy,
    Sparkles,
    ShieldCheck,
} from "lucide-react";

export default function Hero() {
    const teammates = [
        {
            name: "React Developer",
            skill: "Frontend • React • Next.js",
            match: "95%",
        },
        {
            name: "UI/UX Designer",
            skill: "Figma • Adobe XD",
            match: "92%",
        },
        {
            name: "Backend Developer",
            skill: "Node.js • Express • MongoDB",
            match: "94%",
        },
        {
            name: "AI Engineer",
            skill: "Python • TensorFlow",
            match: "97%",
        },
    ];

    return (
        <section
            id="home"
            className="relative overflow-hidden bg-[#F8FAFC] pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 lg:pb-24"
        >
            {/* ================= BACKGROUND EFFECTS ================= */}
            <div className="pointer-events-none absolute -top-32 -left-32 sm:-top-40 sm:-left-40 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-cyan-300/20 blur-[100px] sm:blur-[120px]" />

            <div className="pointer-events-none absolute top-1/3 -right-32 sm:right-0 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-indigo-300/20 blur-[100px] sm:blur-[120px]" />

            {/* ================= MAIN CONTAINER ================= */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">

                    {/* ================================================= */}
                    {/* LEFT CONTENT */}
                    {/* ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-indigo-100 text-[#1E1B4B] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                            <Sparkles size={15} />
                            <span>
                                India's Smart Team Building Platform
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-[#111827]">
                            Find the

                            <span className="block text-[#1E1B4B] mt-1">
                                Perfect Team for Every Hackathon
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-7 sm:leading-8 max-w-xl">
                            Connect with developers, designers, AI engineers,
                            and innovators across India. Build stronger teams,
                            collaborate efficiently, and win hackathons
                            together.
                        </p>

                        {/* ================= BUTTONS ================= */}
                        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">

                            {/* Find Teammates */}
                            <Link
                                to="/register"
                                className="group w-full sm:w-auto justify-center bg-[#1E1B4B] text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl flex items-center gap-3 hover:bg-[#2d2866] transition text-sm sm:text-base font-semibold"
                            >
                                Find Teammates

                                <ArrowRight
                                    size={19}
                                    className="group-hover:translate-x-1 transition"
                                />
                            </Link>

                            {/* Watch Demo */}
                            <button
                                type="button"
                                className="w-full sm:w-auto justify-center border border-slate-300 hover:border-[#1E1B4B] bg-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold flex items-center gap-3 transition-all hover:shadow-lg text-sm sm:text-base"
                            >
                                <PlayCircle size={19} />
                                Watch Demo
                            </button>

                        </div>

                        {/* ================= FEATURES ================= */}
                        <div className="mt-8 sm:mt-10 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">

                            <div className="flex items-center gap-2">
                                <ShieldCheck
                                    className="text-green-500 shrink-0"
                                    size={18}
                                />
                                <span>Verified Students</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users
                                    className="text-cyan-600 shrink-0"
                                    size={18}
                                />
                                <span>Smart Matching</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Trophy
                                    className="text-yellow-500 shrink-0"
                                    size={18}
                                />
                                <span>Hackathon Ready</span>
                            </div>

                        </div>

                        {/* ================= STATS ================= */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-10">

                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1B4B]">
                                    5K+
                                </h2>

                                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                                    Students
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1B4B]">
                                    300+
                                </h2>

                                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                                    Hackathons
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1B4B]">
                                    120+
                                </h2>

                                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                                    Colleges
                                </p>
                            </div>

                        </div>

                    </motion.div>

                    {/* ================================================= */}
                    {/* RIGHT CONTENT */}
                    {/* ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        className="relative w-full max-w-xl mx-auto lg:max-w-none"
                    >

                        {/* ================= FLOATING BADGE ================= */}
                        <div className="absolute -top-4 left-2 sm:-top-6 sm:-left-6 z-10 bg-white shadow-xl rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 border border-slate-200">
                            <p className="text-[10px] sm:text-xs text-slate-500">
                                Team Match
                            </p>

                            <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                                96%
                            </h3>
                        </div>

                        {/* ================= DASHBOARD CARD ================= */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-6 md:p-8">

                            {/* Card Header */}
                            <div className="flex justify-between items-center gap-3 mb-5 sm:mb-6">

                                <h2 className="font-bold text-base sm:text-xl text-[#1E1B4B]">
                                    Recommended Teammates
                                </h2>

                                <span className="shrink-0 bg-cyan-100 text-cyan-700 text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full">
                                    Live
                                </span>

                            </div>

                            {/* Teammates */}
                            {teammates.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between gap-3 bg-slate-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 hover:bg-slate-100 transition"
                                >

                                    {/* Information */}
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base truncate">
                                            {item.name}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-500 truncate">
                                            {item.skill}
                                        </p>
                                    </div>

                                    {/* Match */}
                                    <span className="shrink-0 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 rounded-full">
                                        {item.match}
                                    </span>

                                </div>
                            ))}

                            {/* Dashboard Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("demo")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        })
                                }
                                className="mt-2 sm:mt-4 w-full bg-[#1E1B4B] hover:bg-[#312E81] text-white rounded-xl py-3 sm:py-4 font-semibold transition text-sm sm:text-base active:scale-[0.98]"
                            >
                                Explore Dashboard
                            </button>

                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}