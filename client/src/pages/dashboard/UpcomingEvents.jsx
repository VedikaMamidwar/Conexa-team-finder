import React from "react";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvents() {
    const navigate = useNavigate();

    const events = [
        {
            id: 1,
            title: "Smart India Hackathon",
            date: "12 September 2026",
            deadline: "8 September 2026",
            type: "Hackathon",
            mode: "Online",
            teamSize: "4–6 Members",
            prize: "₹5,00,000+",
            skills: ["React", "Python", "AI", "MongoDB"],
            icon: "🚀",
            description:
                "Build innovative solutions for real-world problems and compete with students across India.",
        },
        {
            id: 2,
            title: "AI Innovation Challenge",
            date: "18 September 2026",
            deadline: "15 September 2026",
            type: "Competition",
            mode: "Online",
            teamSize: "2–4 Members",
            prize: "₹2,00,000",
            skills: ["AI", "Machine Learning", "Python"],
            icon: "🤖",
            description:
                "Create an innovative AI-powered solution to solve a practical problem.",
        },
        {
            id: 3,
            title: "Web Development Sprint",
            date: "25 September 2026",
            deadline: "22 September 2026",
            type: "Coding Event",
            mode: "Online",
            teamSize: "1–3 Members",
            prize: "₹1,00,000",
            skills: ["React", "JavaScript", "Node.js"],
            icon: "💻",
            description:
                "A fast-paced coding challenge focused on modern web development.",
        },
        {
            id: 4,
            title: "Startup Idea Challenge",
            date: "2 October 2026",
            deadline: "28 September 2026",
            type: "Innovation",
            mode: "Hybrid",
            teamSize: "2–5 Members",
            prize: "₹3,00,000",
            skills: ["Business", "UI/UX", "Technology"],
            icon: "💡",
            description:
                "Present your startup idea and turn your innovative concept into reality.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-100 text-[#1E1B4B]">

            {/* ================= HEADER ================= */}

            <header className="bg-white border-b border-slate-200 px-6 py-5">

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-bold">
                            📅 Upcoming Events
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Discover hackathons, competitions and exciting
                            opportunities.
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

                            <span className="inline-flex px-4 py-2 rounded-full bg-white/15 text-sm backdrop-blur-sm">
                                🚀 Explore Opportunities
                            </span>

                            <h2 className="text-3xl md:text-4xl font-bold mt-5">
                                Build. Compete.
                                <br />
                                Create Something Amazing.
                            </h2>

                            <p className="text-white/80 mt-4 max-w-xl leading-7">
                                Find upcoming hackathons and competitions where
                                you can showcase your skills and build your
                                dream team.
                            </p>

                        </div>

                        <div className="flex justify-center">

                            <div className="w-36 h-36 rounded-3xl bg-white/10 flex items-center justify-center text-7xl backdrop-blur-sm">
                                🏆
                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= STATS ================= */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

                        <p className="text-sm text-slate-500">
                            Upcoming Events
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            {events.length}
                        </p>

                    </div>


                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

                        <p className="text-sm text-slate-500">
                            Hackathons
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            1
                        </p>

                    </div>


                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

                        <p className="text-sm text-slate-500">
                            Competitions
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            2
                        </p>

                    </div>


                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">

                        <p className="text-sm text-slate-500">
                            Total Prize Pool
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            ₹11L+
                        </p>

                    </div>

                </div>


                {/* ================= EVENT LIST ================= */}

                <div className="flex items-center justify-between mt-8 mb-5">

                    <div>
                        <h3 className="text-2xl font-bold">
                            Upcoming Opportunities
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Don't miss your next opportunity.
                        </p>
                    </div>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {events.map((event) => (

                        <div
                            key={event.id}
                            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
                        >

                            {/* EVENT TOP */}

                            <div className="p-6">

                                <div className="flex items-start justify-between gap-4">

                                    <div className="flex gap-4">

                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center text-3xl shrink-0">
                                            {event.icon}
                                        </div>

                                        <div>

                                            <span className="text-xs font-semibold text-[#19A99A]">
                                                {event.type}
                                            </span>

                                            <h3 className="text-xl font-bold mt-1">
                                                {event.title}
                                            </h3>

                                        </div>

                                    </div>

                                    <span className="text-xs px-3 py-1.5 rounded-full bg-green-50 text-green-600 font-semibold whitespace-nowrap">
                                        Open
                                    </span>

                                </div>


                                {/* DESCRIPTION */}

                                <p className="text-sm text-slate-500 leading-6 mt-5">
                                    {event.description}
                                </p>


                                {/* DETAILS */}

                                <div className="grid grid-cols-2 gap-3 mt-5">

                                    <div className="bg-slate-50 rounded-xl p-3">

                                        <p className="text-xs text-slate-400">
                                            Event Date
                                        </p>

                                        <p className="text-sm font-semibold mt-1">
                                            📅 {event.date}
                                        </p>

                                    </div>


                                    <div className="bg-slate-50 rounded-xl p-3">

                                        <p className="text-xs text-slate-400">
                                            Registration Deadline
                                        </p>

                                        <p className="text-sm font-semibold mt-1">
                                            ⏰ {event.deadline}
                                        </p>

                                    </div>


                                    <div className="bg-slate-50 rounded-xl p-3">

                                        <p className="text-xs text-slate-400">
                                            Team Size
                                        </p>

                                        <p className="text-sm font-semibold mt-1">
                                            👥 {event.teamSize}
                                        </p>

                                    </div>


                                    <div className="bg-slate-50 rounded-xl p-3">

                                        <p className="text-xs text-slate-400">
                                            Mode
                                        </p>

                                        <p className="text-sm font-semibold mt-1">
                                            🌐 {event.mode}
                                        </p>

                                    </div>

                                </div>


                                {/* SKILLS */}

                                <div className="mt-5">

                                    <p className="text-xs text-slate-400 mb-2">
                                        Skills
                                    </p>

                                    <div className="flex flex-wrap gap-2">

                                        {event.skills.map((skill) => (

                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium"
                                            >
                                                {skill}
                                            </span>

                                        ))}

                                    </div>

                                </div>

                            </div>


                            {/* FOOTER */}

                            <div className="border-t border-slate-100 p-5 flex items-center justify-between gap-4">

                                <div>

                                    <p className="text-xs text-slate-400">
                                        Prize Pool
                                    </p>

                                    <p className="font-bold text-lg">
                                        {event.prize}
                                    </p>

                                </div>

                                <button
                                    className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:opacity-90 transition"
                                >
                                    View Details →
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* ================= CTA ================= */}

                <section className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                        <div>

                            <h3 className="text-xl font-bold">
                                👥 Need a team for a hackathon?
                            </h3>

                            <p className="text-sm text-slate-500 mt-2">
                                Find students with matching skills and build
                                your perfect team on CONEXA.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/find-teammates")}
                            className="px-6 py-3 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:opacity-90 transition"
                        >
                            Find Teammates →
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}