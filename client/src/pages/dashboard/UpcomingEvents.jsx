import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Clock,
    Users,
    Globe,
    Trophy,
    X,
    ExternalLink,
} from "lucide-react";

export default function UpcomingEvents() {
    const navigate = useNavigate();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registeredEvents, setRegisteredEvents] = useState([]);

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

    const handleRegister = (event) => {
        setRegisteredEvents((prev) =>
            prev.includes(event.id)
                ? prev.filter((id) => id !== event.id)
                : [...prev, event.id]
        );
    };

    return (
        <div className="min-h-screen bg-slate-100 text-[#1E1B4B]">

            {/* HEADER */}
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="text-xl font-bold sm:text-2xl">
                            📅 Upcoming Events
                        </h1>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Discover hackathons, competitions and exciting opportunities.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex w-fit items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={17} />
                        Dashboard
                    </button>
                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:py-7">

                {/* HERO */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#19B5A5] p-6 text-white shadow-lg sm:p-8 md:p-10">

                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                    <div className="absolute -bottom-16 right-20 h-40 w-40 rounded-full bg-white/5" />

                    <div className="relative flex flex-col items-center justify-between gap-7 md:flex-row">

                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                                🚀 Explore Opportunities
                            </span>

                            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                                Build. Compete.
                                <br />
                                Create Something Amazing.
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                                Find upcoming hackathons and competitions where you
                                can showcase your skills and build your dream team.
                            </p>

                            <button
                                onClick={() =>
                                    document
                                        .getElementById("events-list")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1E1B4B] transition hover:scale-[1.02] hover:bg-slate-100"
                            >
                                Explore Events
                                <ArrowRight size={17} />
                            </button>
                        </div>

                        <div className="hidden shrink-0 sm:block">
                            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 text-6xl backdrop-blur-sm md:h-36 md:w-36 md:text-7xl">
                                🏆
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">

                    <StatCard
                        label="Upcoming Events"
                        value={events.length}
                        icon="📅"
                    />

                    <StatCard
                        label="Hackathons"
                        value="1"
                        icon="🚀"
                    />

                    <StatCard
                        label="Competitions"
                        value="2"
                        icon="🏆"
                    />

                    <StatCard
                        label="Prize Pool"
                        value="₹11L+"
                        icon="💰"
                    />
                </div>

                {/* EVENT LIST */}
                <div id="events-list" className="mb-5 mt-8">

                    <h3 className="text-xl font-bold sm:text-2xl">
                        Upcoming Opportunities
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Don't miss your next opportunity.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                    {events.map((event) => {
                        const isRegistered = registeredEvents.includes(event.id);

                        return (
                            <div
                                key={event.id}
                                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* TOP */}
                                <div className="p-5 sm:p-6">

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="flex min-w-0 gap-3 sm:gap-4">

                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
                                                {event.icon}
                                            </div>

                                            <div className="min-w-0">
                                                <span className="text-xs font-bold text-[#19A99A]">
                                                    {event.type}
                                                </span>

                                                <h3 className="mt-1 text-base font-bold leading-5 sm:text-xl sm:leading-6">
                                                    {event.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <span
                                            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold sm:px-3 sm:text-xs ${isRegistered
                                                    ? "bg-teal-50 text-teal-600"
                                                    : "bg-green-50 text-green-600"
                                                }`}
                                        >
                                            {isRegistered ? "Registered" : "Open"}
                                        </span>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="mt-4 text-sm leading-6 text-slate-500">
                                        {event.description}
                                    </p>

                                    {/* DETAILS */}
                                    <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">

                                        <DetailBox
                                            icon={<Calendar size={15} />}
                                            label="Event Date"
                                            value={event.date}
                                        />

                                        <DetailBox
                                            icon={<Clock size={15} />}
                                            label="Registration Deadline"
                                            value={event.deadline}
                                        />

                                        <DetailBox
                                            icon={<Users size={15} />}
                                            label="Team Size"
                                            value={event.teamSize}
                                        />

                                        <DetailBox
                                            icon={<Globe size={15} />}
                                            label="Mode"
                                            value={event.mode}
                                        />
                                    </div>

                                    {/* SKILLS */}
                                    <div className="mt-5">
                                        <p className="mb-2 text-xs text-slate-400">
                                            Skills
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {event.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 sm:px-3 sm:text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* FOOTER */}
                                <div className="flex flex-col gap-4 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Prize Pool
                                        </p>

                                        <p className="mt-1 text-lg font-bold">
                                            {event.prize}
                                        </p>
                                    </div>

                                    <div className="flex w-full gap-2 sm:w-auto">

                                        <button
                                            onClick={() => setSelectedEvent(event)}
                                            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold transition hover:bg-slate-50 sm:flex-none sm:px-4 sm:text-sm"
                                        >
                                            View Details
                                            <ArrowRight size={15} />
                                        </button>

                                        <button
                                            onClick={() => handleRegister(event)}
                                            className={`flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition sm:flex-none sm:text-sm ${isRegistered
                                                    ? "bg-teal-600 hover:bg-teal-700"
                                                    : "bg-[#1E1B4B] hover:opacity-90"
                                                }`}
                                        >
                                            {isRegistered ? "Registered ✓" : "Join"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>
                            <h3 className="text-lg font-bold sm:text-xl">
                                👥 Need a team for a hackathon?
                            </h3>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Find students with matching skills and build your
                                perfect team on CONEXA.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/find-teammates")}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 md:w-auto"
                        >
                            Find Teammates
                            <ArrowRight size={17} />
                        </button>
                    </div>
                </section>
            </main>

            {/* DETAILS MODAL */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-[#1E1B4B] to-[#19B5A5] p-6 text-white">

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex gap-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
                                        {selectedEvent.icon}
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold text-white/70">
                                            {selectedEvent.type}
                                        </span>

                                        <h3 className="mt-1 text-xl font-bold">
                                            {selectedEvent.title}
                                        </h3>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">

                            <p className="text-sm leading-6 text-slate-500">
                                {selectedEvent.description}
                            </p>

                            <div className="mt-5 space-y-3">

                                <DetailRow
                                    icon={<Calendar size={17} />}
                                    label="Event Date"
                                    value={selectedEvent.date}
                                />

                                <DetailRow
                                    icon={<Clock size={17} />}
                                    label="Registration Deadline"
                                    value={selectedEvent.deadline}
                                />

                                <DetailRow
                                    icon={<Users size={17} />}
                                    label="Team Size"
                                    value={selectedEvent.teamSize}
                                />

                                <DetailRow
                                    icon={<Globe size={17} />}
                                    label="Mode"
                                    value={selectedEvent.mode}
                                />

                                <DetailRow
                                    icon={<Trophy size={17} />}
                                    label="Prize Pool"
                                    value={selectedEvent.prize}
                                />
                            </div>

                            <div className="mt-5">
                                <p className="mb-2 text-xs font-semibold text-slate-400">
                                    Required Skills
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {selectedEvent.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">

                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                                >
                                    Close
                                </button>

                                <button
                                    onClick={() => {
                                        handleRegister(selectedEvent);
                                        setSelectedEvent(null);
                                    }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                                >
                                    {registeredEvents.includes(selectedEvent.id)
                                        ? "Registered ✓"
                                        : "Register Now"}
                                    <ExternalLink size={15} />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


/* ================= COMPONENTS ================= */

function StatCard({ label, value, icon }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-slate-500 sm:text-sm">
                    {label}
                </p>

                <span className="text-lg sm:text-xl">
                    {icon}
                </span>
            </div>

            <p className="mt-2 text-2xl font-bold sm:text-3xl">
                {value}
            </p>
        </div>
    );
}

function DetailBox({ icon, label, value }) {
    return (
        <div className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-1.5 text-slate-400">
                {icon}
                <p className="text-[10px] sm:text-xs">
                    {label}
                </p>
            </div>

            <p className="mt-1 text-xs font-semibold leading-5 sm:text-sm">
                {value}
            </p>
        </div>
    );
}

function DetailRow({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-slate-500">
                {icon}
                <span className="text-xs sm:text-sm">
                    {label}
                </span>
            </div>

            <span className="text-right text-xs font-semibold sm:text-sm">
                {value}
            </span>
        </div>
    );
}