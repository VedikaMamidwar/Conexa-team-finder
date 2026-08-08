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
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-[#F8FAFC] pt-28 pb-20"
        >
            {/* Background Effects */}
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-300/20 blur-[120px]" />
            <div className="absolute top-1/2 right-0 w-[420px] h-[420px] rounded-full bg-indigo-300/20 blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-[#1E1B4B] px-4 py-2 rounded-full text-sm font-semibold">
                        <Sparkles size={16} />
                        India's Smart Team Building Platform
                    </div>

                    <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#111827]">
                        Find the
                        <span className="block text-[#1E1B4B]">
                            Perfect Team for Every Hackathon
                        </span>
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-slate-600 leading-8 max-w-xl">
                        Connect with developers, designers, AI engineers, and innovators
                        across India. Build stronger teams, collaborate efficiently, and
                        win hackathons together.
                    </p>

                    {/* Buttons */}
                    <Link
                        to="/register"
                        className="group bg-[#1E1B4B] text-white px-7 py-4 rounded-xl flex items-center gap-3 hover:bg-[#2d2866] transition"
                    >
                        Find Teammates

                        <ArrowRight
                            size={20}
                            className="group-hover:translate-x-1 transition"
                        />
                    </Link>

                    <button className="border border-slate-300 hover:border-[#1E1B4B] bg-white px-7 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all hover:shadow-lg">
                        <PlayCircle size={20} />
                        Watch Demo
                    </button>

                    {/* Features */}
                    <div className="mt-10 flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-500" size={18} />
                            Verified Students
                        </div>

                        <div className="flex items-center gap-2">
                            <Users className="text-cyan-600" size={18} />
                            Smart Matching
                        </div>

                        <div className="flex items-center gap-2">
                            <Trophy className="text-yellow-500" size={18} />
                            Hackathon Ready
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-10">
                        <div>
                            <h2 className="text-3xl font-bold text-[#1E1B4B]">5K+</h2>
                            <p className="text-slate-500 text-sm">Students</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-[#1E1B4B]">300+</h2>
                            <p className="text-slate-500 text-sm">Hackathons</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-[#1E1B4B]">120+</h2>
                            <p className="text-slate-500 text-sm">Colleges</p>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .9 }}
                    className="relative"
                >
                    {/* Floating Badge */}
                    <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-xl px-5 py-3 border border-slate-200">
                        <p className="text-xs text-slate-500">Team Match</p>
                        <h3 className="text-2xl font-bold text-green-600">96%</h3>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-xl text-[#1E1B4B]">
                                Recommended Teammates
                            </h2>

                            <span className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full">
                                Live
                            </span>
                        </div>

                        {[
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
                        ].map((item) => (
                            <div
                                key={item.name}
                                className="flex justify-between items-center bg-slate-50 rounded-xl p-4 mb-4 hover:bg-slate-100 transition"
                            >
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-slate-500">{item.skill}</p>
                                </div>

                                <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                                    {item.match}
                                </span>
                            </div>
                        ))}

                        <button className="mt-6 w-full bg-[#1E1B4B] hover:bg-[#312E81] text-white rounded-xl py-4 font-semibold transition">
                            Explore Dashboard
                        </button>
                    </div>
                </motion.div>
            </div >
        </section >
    );
} 