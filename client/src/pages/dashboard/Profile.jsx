import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-100 text-[#1E1B4B]">

            {/* ================= HEADER ================= */}
            <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6">

                <div>
                    <h1 className="text-2xl font-bold">
                        My Profile
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Manage and showcase your CONEXA profile
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition"
                    >
                        ← Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/settings")}
                        className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] text-white hover:opacity-90 transition"
                    >
                        ⚙️ Settings
                    </button>

                </div>

            </header>


            {/* ================= MAIN ================= */}
            <main className="p-6 max-w-7xl mx-auto">

                {/* ================= PROFILE CARD ================= */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Cover */}
                    <div className="h-44 bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#19B5A5] relative">

                        <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,_white,_transparent_50%)]" />
                        </div>

                    </div>


                    {/* Profile Information */}
                    <div className="px-8 pb-8">

                        <div className="flex flex-col md:flex-row md:items-end justify-between -mt-14 relative">

                            {/* Avatar */}
                            <div className="flex items-end gap-5">

                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1E1B4B] to-[#3559D5] border-8 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    VM
                                </div>

                                <div className="pb-2">

                                    <h2 className="text-3xl font-bold">
                                        Vedika Mamidwar
                                    </h2>

                                    <p className="text-slate-500">
                                        MERN Developer
                                    </p>

                                </div>

                            </div>


                            {/* Edit Button */}
                            <button
                                className="mt-5 md:mt-0 px-6 py-3 rounded-xl bg-[#1E1B4B] text-white font-medium hover:opacity-90 transition"
                            >
                                ✏️ Edit Profile
                            </button>

                        </div>


                        {/* Profile Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                            <div className="bg-slate-50 rounded-2xl p-5 text-center">
                                <p className="text-2xl font-bold">96%</p>
                                <p className="text-sm text-slate-500">
                                    Profile Score
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 text-center">
                                <p className="text-2xl font-bold">18</p>
                                <p className="text-sm text-slate-500">
                                    Hackathons
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 text-center">
                                <p className="text-2xl font-bold">8</p>
                                <p className="text-sm text-slate-500">
                                    Active Teams
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 text-center">
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-sm text-slate-500">
                                    Achievements
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= CONTENT ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* About */}
                        <section className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200">

                            <div className="flex justify-between items-center mb-5">

                                <h3 className="text-xl font-bold">
                                    About Me
                                </h3>

                                <span className="text-sm text-green-600 font-medium">
                                    ● Available for team
                                </span>

                            </div>

                            <p className="text-slate-600 leading-7">
                                Passionate Computer Science student and MERN
                                Developer interested in building innovative
                                products, participating in hackathons and
                                collaborating with talented developers.
                            </p>

                        </section>


                        {/* Skills */}
                        <section className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200">

                            <h3 className="text-xl font-bold mb-5">
                                Skills
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {[
                                    "React",
                                    "Node.js",
                                    "Express.js",
                                    "MongoDB",
                                    "JavaScript",
                                    "Python",
                                    "SQL",
                                    "Git",
                                    "GitHub",
                                    "UI/UX",
                                    "AI"
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded-full bg-slate-100 text-[#1E1B4B] text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </section>


                        {/* Projects */}
                        <section className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200">

                            <h3 className="text-xl font-bold mb-5">
                                🚀 Projects
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">

                                <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

                                    <h4 className="font-bold text-lg">
                                        CONEXA
                                    </h4>

                                    <p className="text-sm text-slate-500 mt-2">
                                        Hackathon teammate finding and team
                                        building platform.
                                    </p>

                                    <div className="flex gap-2 mt-4 flex-wrap">

                                        <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                                            React
                                        </span>

                                        <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                                            Node.js
                                        </span>

                                        <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                                            MongoDB
                                        </span>

                                    </div>

                                </div>


                                <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">

                                    <h4 className="font-bold text-lg">
                                        Team Project
                                    </h4>

                                    <p className="text-sm text-slate-500 mt-2">
                                        Collaborative project developed with
                                        a student team.
                                    </p>

                                    <div className="flex gap-2 mt-4">

                                        <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                                            Full Stack
                                        </span>

                                        <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                                            Git
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* Profile Completion */}
                        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                            <div className="flex justify-between">

                                <h3 className="font-bold">
                                    Profile Completion
                                </h3>

                                <span className="font-bold">
                                    96%
                                </span>

                            </div>

                            <div className="w-full h-3 bg-slate-100 rounded-full mt-4 overflow-hidden">

                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#19B5A5]"
                                    style={{ width: "96%" }}
                                />

                            </div>

                            <p className="text-sm text-slate-500 mt-3">
                                Complete your profile to get better AI team
                                recommendations.
                            </p>

                        </section>


                        {/* Education */}
                        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                            <h3 className="font-bold text-lg mb-4">
                                🎓 Education
                            </h3>

                            <h4 className="font-semibold">
                                B.Tech – Computer Science
                            </h4>

                            <p className="text-sm text-slate-500 mt-1">
                                G.H. Raisoni University
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                2023 – 2027
                            </p>

                        </section>


                        {/* Achievements */}
                        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                            <div className="flex justify-between items-center mb-4">

                                <h3 className="font-bold text-lg">
                                    🏆 Achievements
                                </h3>

                                <button
                                    onClick={() => navigate("/achievements")}
                                    className="text-sm text-[#19A99A] font-semibold"
                                >
                                    View All →
                                </button>

                            </div>

                            <div className="flex gap-3">

                                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                                    🥇
                                </div>

                                <div>
                                    <p className="font-semibold">
                                        Hackathon Explorer
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Participated in 10+ hackathons
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-3 mt-5">

                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                                    🚀
                                </div>

                                <div>
                                    <p className="font-semibold">
                                        Team Builder
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Built 5 successful teams
                                    </p>
                                </div>

                            </div>

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}