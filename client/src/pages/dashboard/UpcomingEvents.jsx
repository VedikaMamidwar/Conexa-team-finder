import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CalendarDays,
    Clock,
    MapPin,
    ArrowRight,
    Users,
    Trophy,
    Video,
    Plus,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

const events = [
    {
        id: 1,
        title: "Smart India Hackathon",
        description:
            "Build innovative solutions for real-world problems and compete with talented developers.",
        date: "20 Sep 2026",
        time: "10:00 AM",
        location: "Online",
        participants: "500+ Participants",
        type: "Hackathon",
        icon: Trophy,
    },
    {
        id: 2,
        title: "AI & Machine Learning Workshop",
        description:
            "Learn the fundamentals of AI and Machine Learning with practical examples.",
        date: "24 Sep 2026",
        time: "2:00 PM",
        location: "Online",
        participants: "200+ Participants",
        type: "Workshop",
        icon: Video,
    },
    {
        id: 3,
        title: "MERN Stack Meetup",
        description:
            "Connect with MERN developers, share projects and learn modern full-stack development.",
        date: "28 Sep 2026",
        time: "5:00 PM",
        location: "Nagpur",
        participants: "150+ Participants",
        type: "Meetup",
        icon: Users,
    },
    {
        id: 4,
        title: "Web Development Challenge",
        description:
            "Test your frontend and backend development skills in this exciting coding challenge.",
        date: "02 Oct 2026",
        time: "11:00 AM",
        location: "Online",
        participants: "300+ Participants",
        type: "Challenge",
        icon: Trophy,
    },
];

export default function UpcomingEvents() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">

            {/* SIDEBAR */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* MAIN CONTENT */}
            <div
                className={`min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "lg:ml-24"
                    }`}
            >

                {/* TOPBAR */}
                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* CONTENT */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">

                    {/* HEADER */}
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div>
                            <p className="text-sm font-semibold text-[#14B8A6]">
                                EVENTS
                            </p>

                            <h1 className="mt-1 text-3xl font-black text-[#1E1B4B]">
                                Upcoming Events
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Discover workshops, meetups, hackathons and
                                exciting opportunities.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/create-hackathon")}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d286b]"
                        >
                            <Plus size={18} />
                            Create Event
                        </button>

                    </div>

                    {/* EVENT STATS */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <StatCard
                            icon={<CalendarDays size={22} />}
                            title="Upcoming Events"
                            value="12"
                        />

                        <StatCard
                            icon={<Trophy size={22} />}
                            title="Hackathons"
                            value="6"
                        />

                        <StatCard
                            icon={<Users size={22} />}
                            title="Participants"
                            value="1.2K+"
                        />

                        <StatCard
                            icon={<Video size={22} />}
                            title="Online Events"
                            value="8"
                        />

                    </div>

                    {/* EVENTS */}
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        {events.map((event) => {

                            const Icon = event.icon;

                            return (
                                <motion.div
                                    key={event.id}
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
                                    }}
                                    whileHover={{
                                        y: -4,
                                    }}
                                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
                                >

                                    {/* TOP */}
                                    <div className="flex items-start justify-between gap-4">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#1E1B4B]">
                                                <Icon size={23} />
                                            </div>

                                            <div>
                                                <span className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-[#0F766E]">
                                                    {event.type}
                                                </span>

                                                <h2 className="mt-2 text-lg font-bold text-[#1E1B4B]">
                                                    {event.title}
                                                </h2>
                                            </div>

                                        </div>

                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="mt-4 text-sm leading-6 text-slate-500">
                                        {event.description}
                                    </p>

                                    {/* DETAILS */}
                                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                        <EventDetail
                                            icon={<CalendarDays size={16} />}
                                            text={event.date}
                                        />

                                        <EventDetail
                                            icon={<Clock size={16} />}
                                            text={event.time}
                                        />

                                        <EventDetail
                                            icon={<MapPin size={16} />}
                                            text={event.location}
                                        />

                                        <EventDetail
                                            icon={<Users size={16} />}
                                            text={event.participants}
                                        />

                                    </div>

                                    {/* BUTTON */}
                                    <button
                                        onClick={() =>
                                            navigate(`/events/${event.id}`)
                                        }
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-[#1E1B4B] transition group-hover:bg-[#1E1B4B] group-hover:text-white"
                                    >
                                        View Event

                                        <ArrowRight
                                            size={17}
                                            className="transition group-hover:translate-x-1"
                                        />
                                    </button>

                                </motion.div>
                            );
                        })}

                    </div>

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


/* ================= EVENT DETAIL ================= */

function EventDetail({ icon, text }) {
    return (
        <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="text-[#14B8A6]">
                {icon}
            </span>

            <span>{text}</span>
        </div>
    );
}