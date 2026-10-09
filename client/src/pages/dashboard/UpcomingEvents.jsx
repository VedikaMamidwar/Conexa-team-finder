import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CalendarDays,
    Clock,
    MapPin,
    ArrowRight,
    Users,
    Trophy,
    Video,
    Plus,
    X,
    CheckCircle2,
    ExternalLink,
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
        organizer: "Smart India Hackathon Team",
        duration: "10:00 AM - 6:00 PM",
        mode: "Online",
        eligibility: "College Students",
        registration: "Open",
        details:
            "Participate in an exciting hackathon where students collaborate, develop innovative solutions and solve real-world problems.",
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
        organizer: "Tech Learning Community",
        duration: "2:00 PM - 5:00 PM",
        mode: "Online",
        eligibility: "Students & Developers",
        registration: "Open",
        details:
            "Learn AI and Machine Learning concepts through practical examples, demonstrations and interactive sessions.",
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
        organizer: "MERN Developers Community",
        duration: "5:00 PM - 8:00 PM",
        mode: "Offline",
        eligibility: "Developers & Students",
        registration: "Open",
        details:
            "Meet developers, discuss MERN projects, exchange ideas and learn modern full-stack development practices.",
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
        organizer: "Web Developers Club",
        duration: "11:00 AM - 4:00 PM",
        mode: "Online",
        eligibility: "Students & Developers",
        registration: "Open",
        details:
            "Test your frontend and backend skills by solving practical web development problems within the given time.",
    },
];

export default function UpcomingEvents() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleRegister = () => {
        if (!selectedEvent) return;

        alert(`Registration opened for ${selectedEvent.title}`);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">

            {/* ================= SIDEBAR ================= */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* ================= MAIN CONTENT ================= */}

            <div
                className={`min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"
                    }`}
            >

                {/* ================= TOPBAR ================= */}

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* ================= CONTENT ================= */}

                <main className="flex-1 p-4 sm:p-6 lg:p-8">

                    {/* ================= HEADER ================= */}

                    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="h-2 w-2 rounded-full bg-[#14B8A6]" />

                                <p className="text-xs font-bold tracking-[0.2em] text-[#14B8A6]">
                                    DISCOVER & PARTICIPATE
                                </p>

                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-[#1E1B4B] sm:text-4xl">
                                Upcoming Events
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Discover hackathons, workshops, meetups and
                                exciting opportunities to grow your skills.
                            </p>

                        </div>

                        {/* CREATE EVENT */}

                        <button
                            type="button"
                            onClick={() => navigate("/create-hackathon")}
                            className="
                                group
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-[#1E1B4B]
                                bg-white
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-[#1E1B4B]
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-[#1E1B4B]
                                hover:text-white
                                hover:shadow-lg
                            "
                        >

                            <Plus
                                size={18}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:rotate-90
                                "
                            />

                            Create Event

                        </button>

                    </div>

                    {/* ================= STATS ================= */}

                    <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <StatCard
                            icon={<CalendarDays size={21} />}
                            title="Upcoming Events"
                            value="12"
                        />

                        <StatCard
                            icon={<Trophy size={21} />}
                            title="Hackathons"
                            value="6"
                        />

                        <StatCard
                            icon={<Users size={21} />}
                            title="Participants"
                            value="1.2K+"
                        />

                        <StatCard
                            icon={<Video size={21} />}
                            title="Online Events"
                            value="8"
                        />

                    </div>

                    {/* ================= SECTION TITLE ================= */}

                    <div className="mb-5 flex items-end justify-between">

                        <div>

                            <h2 className="text-xl font-black text-[#1E1B4B]">
                                Featured Events
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Find your next opportunity
                            </p>

                        </div>

                        <span
                            className="
                                hidden
                                rounded-full
                                border
                                border-slate-200
                                bg-white
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                text-slate-500
                                shadow-sm
                                sm:block
                            "
                        >
                            {events.length} Events
                        </span>

                    </div>

                    {/* ================= EVENT GRID ================= */}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        {events.map((event, index) => {

                            const Icon = event.icon;

                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.08,
                                    }}
                                    whileHover={{
                                        y: -5,
                                    }}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-3xl
                                        border
                                        border-slate-200
                                        bg-white
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:border-[#14B8A6]/30
                                        hover:shadow-xl
                                    "
                                >

                                    {/* ================= CARD TOP ================= */}

                                    <div
                                        className="
                                            relative
                                            h-24
                                            overflow-hidden
                                            bg-gradient-to-r
                                            from-indigo-50
                                            via-white
                                            to-teal-50
                                        "
                                    >

                                        {/* DECORATIVE CIRCLE */}

                                        <div
                                            className="
                                                absolute
                                                -right-8
                                                -top-12
                                                h-36
                                                w-36
                                                rounded-full
                                                border-[22px]
                                                border-[#14B8A6]/10
                                            "
                                        />

                                        <div
                                            className="
                                                absolute
                                                -bottom-16
                                                right-24
                                                h-32
                                                w-32
                                                rounded-full
                                                border-[18px]
                                                border-[#1E1B4B]/5
                                            "
                                        />

                                        {/* ICON */}

                                        <div
                                            className="
                                                absolute
                                                left-6
                                                top-6
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-white
                                                text-[#1E1B4B]
                                                shadow-md
                                                transition-all
                                                duration-300
                                                group-hover:scale-105
                                                group-hover:text-[#14B8A6]
                                            "
                                        >
                                            <Icon size={24} />
                                        </div>

                                        {/* EVENT TYPE */}

                                        <div className="absolute right-5 top-5">

                                            <span
                                                className="
                                                    rounded-full
                                                    border
                                                    border-[#14B8A6]/20
                                                    bg-white/90
                                                    px-3
                                                    py-1.5
                                                    text-[11px]
                                                    font-bold
                                                    text-[#1E1B4B]
                                                    shadow-sm
                                                "
                                            >
                                                {event.type}
                                            </span>

                                        </div>

                                    </div>

                                    {/* ================= CARD CONTENT ================= */}

                                    <div className="p-6">

                                        <h3
                                            className="
                                                text-xl
                                                font-black
                                                leading-tight
                                                text-[#1E1B4B]
                                                transition-colors
                                                duration-300
                                                group-hover:text-[#14B8A6]
                                            "
                                        >
                                            {event.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {event.description}
                                        </p>

                                        {/* DETAILS */}

                                        <div className="mt-5 grid grid-cols-2 gap-3">

                                            <EventDetail
                                                icon={<CalendarDays size={15} />}
                                                text={event.date}
                                            />

                                            <EventDetail
                                                icon={<Clock size={15} />}
                                                text={event.time}
                                            />

                                            <EventDetail
                                                icon={<MapPin size={15} />}
                                                text={event.location}
                                            />

                                            <EventDetail
                                                icon={<Users size={15} />}
                                                text={event.participants}
                                            />

                                        </div>

                                        {/* BUTTON AREA */}

                                        <div className="mt-6 flex items-center gap-3">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedEvent(event)
                                                }
                                                className="
                                                    group/button
                                                    flex
                                                    flex-1
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    rounded-xl
                                                    bg-[#1E1B4B]
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    font-bold
                                                    text-white
                                                    shadow-sm
                                                    transition-all
                                                    duration-300
                                                    hover:bg-[#14B8A6]
                                                    hover:shadow-md
                                                "
                                            >
                                                View Details

                                                <ArrowRight
                                                    size={17}
                                                    className="
                                                        transition-transform
                                                        duration-300
                                                        group-hover/button:translate-x-1
                                                    "
                                                />

                                            </button>

                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    border
                                                    border-[#14B8A6]/20
                                                    bg-[#14B8A6]/5
                                                    text-[#14B8A6]
                                                "
                                            >
                                                <CheckCircle2 size={19} />
                                            </div>

                                        </div>

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>

                </main>

            </div>

            {/* ================================================= */}
            {/* EVENT DETAILS MODAL */}
            {/* ================================================= */}

            <AnimatePresence>

                {selectedEvent && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)}
                        className="
                            fixed
                            inset-0
                            z-[100]
                            flex
                            items-center
                            justify-center
                            bg-[#1E1B4B]/30
                            p-4
                            backdrop-blur-sm
                        "
                    >

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="
                                max-h-[90vh]
                                w-full
                                max-w-2xl
                                overflow-y-auto
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                shadow-2xl
                            "
                        >

                            {/* ================= MODAL HEADER ================= */}

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    border-b
                                    border-slate-200
                                    bg-gradient-to-r
                                    from-indigo-50
                                    via-white
                                    to-teal-50
                                    p-6
                                    sm:p-8
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        -right-10
                                        -top-10
                                        h-36
                                        w-36
                                        rounded-full
                                        border-[22px]
                                        border-[#14B8A6]/10
                                    "
                                />

                                <div className="relative flex items-start justify-between gap-4">

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="
                                                flex
                                                h-14
                                                w-14
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-white
                                                text-[#1E1B4B]
                                                shadow-md
                                            "
                                        >
                                            <selectedEvent.icon size={27} />
                                        </div>

                                        <div>

                                            <span
                                                className="
                                                    inline-flex
                                                    rounded-full
                                                    bg-[#14B8A6]/10
                                                    px-3
                                                    py-1
                                                    text-[10px]
                                                    font-black
                                                    uppercase
                                                    tracking-wide
                                                    text-[#0F766E]
                                                "
                                            >
                                                {selectedEvent.type}
                                            </span>

                                            <h2 className="mt-2 text-2xl font-black text-[#1E1B4B]">
                                                {selectedEvent.title}
                                            </h2>

                                        </div>

                                    </div>

                                    {/* CLOSE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedEvent(null)
                                        }
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-white
                                            text-slate-500
                                            shadow-sm
                                            transition
                                            hover:bg-[#14B8A6]
                                            hover:text-white
                                        "
                                    >
                                        <X size={20} />
                                    </button>

                                </div>

                            </div>

                            {/* ================= MODAL BODY ================= */}

                            <div className="p-6 sm:p-8">

                                <p className="text-sm leading-7 text-slate-500">
                                    {selectedEvent.details}
                                </p>

                                {/* EVENT INFORMATION */}

                                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    <ModalDetail
                                        icon={<CalendarDays size={18} />}
                                        label="Date"
                                        value={selectedEvent.date}
                                    />

                                    <ModalDetail
                                        icon={<Clock size={18} />}
                                        label="Duration"
                                        value={selectedEvent.duration}
                                    />

                                    <ModalDetail
                                        icon={<MapPin size={18} />}
                                        label="Location"
                                        value={selectedEvent.location}
                                    />

                                    <ModalDetail
                                        icon={<Users size={18} />}
                                        label="Participants"
                                        value={selectedEvent.participants}
                                    />

                                    <ModalDetail
                                        icon={<Video size={18} />}
                                        label="Mode"
                                        value={selectedEvent.mode}
                                    />

                                    <ModalDetail
                                        icon={<CheckCircle2 size={18} />}
                                        label="Registration"
                                        value={selectedEvent.registration}
                                    />

                                </div>

                                {/* ELIGIBILITY */}

                                <div
                                    className="
                                        mt-6
                                        rounded-2xl
                                        border
                                        border-[#14B8A6]/15
                                        bg-[#14B8A6]/5
                                        p-4
                                    "
                                >

                                    <p className="text-xs font-bold uppercase tracking-wide text-[#14B8A6]">
                                        Eligibility
                                    </p>

                                    <p className="mt-1 font-bold text-[#1E1B4B]">
                                        {selectedEvent.eligibility}
                                    </p>

                                </div>

                                {/* ORGANIZER */}

                                <div
                                    className="
                                        mt-3
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        p-4
                                    "
                                >

                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                        Organized By
                                    </p>

                                    <p className="mt-1 font-bold text-[#1E1B4B]">
                                        {selectedEvent.organizer}
                                    </p>

                                </div>

                                {/* BUTTONS */}

                                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                                    {/* CLOSE BUTTON */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedEvent(null)
                                        }
                                        className="
                                            flex
                                            flex-1
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-white
                                            px-5
                                            py-3
                                            text-sm
                                            font-bold
                                            text-[#1E1B4B]
                                            transition
                                            hover:bg-slate-50
                                        "
                                    >
                                        <X size={17} />
                                        Close
                                    </button>

                                    {/* REGISTER */}

                                    <button
                                        type="button"
                                        onClick={handleRegister}
                                        className="
                                            flex
                                            flex-1
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-[#1E1B4B]
                                            px-5
                                            py-3
                                            text-sm
                                            font-bold
                                            text-white
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:bg-[#14B8A6]
                                            hover:shadow-lg
                                        "
                                    >
                                        Register Now

                                        <ExternalLink size={17} />

                                    </button>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>
                )}

            </AnimatePresence>

        </div>
    );
}


/* ================================================= */
/* STAT CARD */
/* ================================================= */

function StatCard({ icon, title, value }) {

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:border-[#14B8A6]/20
                hover:shadow-lg
            "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#14B8A6]/10
                        text-[#1E1B4B]
                        transition-all
                        duration-300
                        group-hover:bg-[#1E1B4B]
                        group-hover:text-white
                    "
                >
                    {icon}
                </div>

                <div>

                    <p className="text-xs font-semibold text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-1 text-2xl font-black text-[#1E1B4B]">
                        {value}
                    </h3>

                </div>

            </div>

        </motion.div>
    );
}


/* ================================================= */
/* EVENT DETAIL */
/* ================================================= */

function EventDetail({ icon, text }) {

    return (
        <div
            className="
                flex
                min-w-0
                items-center
                gap-2
                rounded-xl
                border
                border-slate-100
                bg-slate-50
                px-3
                py-2.5
                transition
                hover:border-[#14B8A6]/20
                hover:bg-[#14B8A6]/5
            "
        >

            <span className="shrink-0 text-[#14B8A6]">
                {icon}
            </span>

            <span className="truncate text-xs font-medium text-slate-600">
                {text}
            </span>

        </div>
    );
}


/* ================================================= */
/* MODAL DETAIL */
/* ================================================= */

function ModalDetail({ icon, label, value }) {

    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                transition
                hover:border-[#14B8A6]/30
                hover:shadow-sm
            "
        >

            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#14B8A6]/10
                        text-[#1E1B4B]
                    "
                >
                    {icon}
                </div>

                <div className="min-w-0">

                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-[#1E1B4B]">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
}