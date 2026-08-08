import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaUsers,
    FaLaptopCode,
    FaRocket,
    FaArrowRight,
} from "react-icons/fa";

function Home() {
    return (
        <>

            {/* ================= HERO SECTION ================= */}

            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">

                {/* Background Blur */}

                <div className="absolute -top-32 -left-24 w-72 h-72 bg-indigo-300 rounded-full blur-[120px] opacity-30"></div>

                <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300 rounded-full blur-[140px] opacity-30"></div>

                <div className="max-w-7xl mx-auto px-6 py-24 lg:py-36">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT */}

                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
                                🚀 India's Smart Team Finder Platform
                            </span>

                            <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight text-slate-900">

                                Find Your

                                <span className="text-indigo-600">
                                    {" "}Dream Team
                                </span>

                                <br />

                                Build Amazing Projects

                            </h1>

                            <p className="mt-8 text-lg text-gray-600 leading-8">

                                Conexa helps students discover teammates,
                                participate in hackathons,
                                showcase skills,
                                and build startups together.

                            </p>

                            <div className="mt-10 flex flex-wrap gap-5">

                                <Link
                                    to="/register"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
                                >
                                    Get Started

                                    <FaArrowRight />

                                </Link>

                                <Link
                                    to="/explore"
                                    className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition"
                                >
                                    Explore Teams
                                </Link>

                            </div>

                            {/* Small Cards */}

                            <div className="mt-14 flex flex-wrap gap-6">

                                <div className="bg-white shadow-xl rounded-2xl p-5 w-44">

                                    <FaUsers
                                        className="text-indigo-600 text-3xl"
                                    />

                                    <h3 className="font-bold mt-3 text-xl">
                                        20K+
                                    </h3>

                                    <p className="text-gray-500">
                                        Developers
                                    </p>

                                </div>

                                <div className="bg-white shadow-xl rounded-2xl p-5 w-44">

                                    <FaRocket
                                        className="text-cyan-600 text-3xl"
                                    />

                                    <h3 className="font-bold mt-3 text-xl">
                                        1000+
                                    </h3>

                                    <p className="text-gray-500">
                                        Hackathons
                                    </p>

                                </div>

                                <div className="bg-white shadow-xl rounded-2xl p-5 w-44">

                                    <FaLaptopCode
                                        className="text-green-600 text-3xl"
                                    />

                                    <h3 className="font-bold mt-3 text-xl">
                                        3000+
                                    </h3>

                                    <p className="text-gray-500">
                                        Teams Created
                                    </p>

                                </div>

                            </div>

                        </motion.div>

                        {/* RIGHT */}

                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >

                            <img
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
                                alt="Developers"
                                className="rounded-3xl shadow-2xl"
                            />

                            {/* Floating Card */}

                            <motion.div

                                animate={{
                                    y: [0, -12, 0],
                                }}

                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                }}

                                className="absolute -bottom-8 left-10 bg-white rounded-2xl shadow-2xl p-5"

                            >

                                <p className="font-semibold text-gray-600">

                                    🎉 Team Match Success

                                </p>

                                <h2 className="text-3xl font-bold text-indigo-600 mt-2">

                                    98%

                                </h2>

                            </motion.div>

                        </motion.div>



                        {/* ================= SMART SEARCH ================= */}

                        <section className="py-24 bg-white">

                            <div className="max-w-7xl mx-auto px-6">

                                <div className="text-center">

                                    <span className="text-indigo-600 font-semibold uppercase tracking-widest">
                                        Smart Search
                                    </span>

                                    <h2 className="mt-4 text-4xl font-bold text-slate-900">
                                        Find Your Perfect Teammate
                                    </h2>

                                    <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
                                        Search developers based on skills, role,
                                        experience, or location and instantly connect
                                        with people who match your project.
                                    </p>

                                </div>

                                {/* Search Card */}

                                <div className="mt-16 bg-white rounded-3xl shadow-2xl p-8 border">

                                    <div className="grid lg:grid-cols-5 gap-5">

                                        <input
                                            type="text"
                                            placeholder="Skill (React, AI, Java...)"
                                            className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                                        />

                                        <select className="border rounded-xl px-5 py-4 outline-none">

                                            <option>Role</option>
                                            <option>Frontend</option>
                                            <option>Backend</option>
                                            <option>Full Stack</option>
                                            <option>UI/UX</option>
                                            <option>AI/ML</option>

                                        </select>

                                        <select className="border rounded-xl px-5 py-4 outline-none">

                                            <option>Experience</option>
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advanced</option>

                                        </select>

                                        <select className="border rounded-xl px-5 py-4 outline-none">

                                            <option>Location</option>
                                            <option>Remote</option>
                                            <option>India</option>
                                            <option>USA</option>

                                        </select>

                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition">
                                            Search
                                        </button>

                                    </div>

                                </div>

                                {/* Trending Skills */}

                                <div className="mt-16">

                                    <h3 className="text-xl font-bold mb-6 text-slate-800">
                                        🔥 Trending Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-4">

                                        {[
                                            "React",
                                            "Node.js",
                                            "Java",
                                            "Python",
                                            "MongoDB",
                                            "AI",
                                            "Machine Learning",
                                            "Flutter",
                                            "UI/UX",
                                            "DevOps",
                                            "AWS",
                                            "Next.js",
                                        ].map((skill) => (

                                            <button
                                                key={skill}
                                                className="px-5 py-3 rounded-full bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-600 hover:text-white transition"
                                            >
                                                {skill}
                                            </button>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>

                </div>

            </section>

        </>
    );
}

export default Home;