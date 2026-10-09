import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Users,
    UserPlus,
    Trophy,
    CalendarDays,
    ArrowRight,
    Sparkles,
    MessageCircle,
} from "lucide-react";

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">

            {/* ================= HEADER ================= */}

            <div className="mb-6">
                <p className="text-sm font-semibold text-[#14B8A6]">
                    Welcome back 👋
                </p>

                <h1 className="mt-1 text-2xl sm:text-3xl font-black text-[#1E1B4B]">
                    Hello, {user?.name || "Student"}!
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Ready to find your perfect team and build something amazing?
                </p>
            </div>

            {/* ================= HERO ================= */}

            <div className="
                relative
                overflow-hidden
                rounded-3xl
                p-6
                sm:p-8
                bg-gradient-to-r
                from-[#1E1B4B]
                via-[#312E81]
                to-[#14B8A6]
                text-white
                shadow-lg
                mb-6
            ">

                <div className="relative z-10 max-w-2xl">

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-white/15
                        backdrop-blur-sm
                        text-sm
                        font-medium
                        mb-5
                    ">
                        <Sparkles size={17} />
                        AI Team Recommendation
                    </div>

                    <h2 className="
                        text-3xl
                        sm:text-4xl
                        lg:text-5xl
                        font-black
                        leading-tight
                    ">
                        Find the right
                        <br />
                        teammates 🚀
                    </h2>

                    <p className="
                        mt-4
                        text-sm
                        sm:text-base
                        text-white/80
                        max-w-xl
                        leading-6
                    ">
                        Discover students with matching skills, join exciting
                        hackathons, and build amazing projects together.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-6">

                        <button
                            onClick={() => navigate("/find-teammates")}
                            className="
                                flex
                                items-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                bg-white
                                text-[#1E1B4B]
                                font-bold
                                hover:bg-slate-100
                                transition
                            "
                        >
                            <Users size={18} />
                            Find Teammates
                        </button>

                        <button
                            onClick={() => navigate("/team-builder")}
                            className="
                                flex
                                items-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                border
                                border-white/40
                                text-white
                                font-semibold
                                hover:bg-white/10
                                transition
                            "
                        >
                            Create Team
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </div>

                {/* Decorative circles */}

                <div className="
                    absolute
                    -right-20
                    -top-20
                    w-64
                    h-64
                    rounded-full
                    bg-white/10
                />

                <div className="
                    absolute

                    w-72
                    h-72
                    rounded-full

                />

            </div>

            {/* ================= QUICK ACTIONS ================= */}

            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
                mb-6
            ">

                <ActionCard
                    icon={<Users size={22} />}
                    title="Find Teammates"
                    text="Discover students"
                    onClick={() => navigate("/find-teammates")}
                />

                <ActionCard
                    icon={<UserPlus size={22} />}
                    title="Team Builder"
                    text="Create your team"
                    onClick={() => navigate("/team-builder")}
                />

                <ActionCard
                    icon={<Trophy size={22} />}
                    title="Hackathons"
                    text="Explore competitions"
                    onClick={() => navigate("/hackathons")}
                />

                <ActionCard
                    icon={<MessageCircle size={22} />}
                    title="Chat"
                    text="Talk with teammates"
                    onClick={() => navigate("/chat")}
                />

            </div>

            {/* ================= MAIN GRID ================= */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-5
            ">

                {/* UPCOMING EVENTS */}

                <div className="
                    lg:col-span-2
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                    shadow-sm
                ">

                    <div className="flex items-center justify-between mb-5">

                        <div className="flex items-center gap-3">

                            <div className="
                                w-11
                                h-11
                                rounded-xl
                                bg-blue-50
                                text-blue-600
                                flex
                                items-center
                                justify-center
                            ">
                                <CalendarDays size={22} />
                            </div>

                            <div>
                                <h2 className="font-bold text-[#1E1B4B]">
                                    Upcoming Events
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Don't miss these opportunities
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => navigate("/events")}
                            className="
                                text-sm
                                font-semibold
                                text-[#14B8A6]
                                hover:text-[#0f9488]
                            "
                        >
                            View all
                        </button>

                    </div>

                    <EventItem
                        title="Smart India Hackathon"
                        date="12 September"
                        onClick={() => navigate("/events")}
                    />

                    <EventItem
                        title="HackNova Registration"
                        date="18 September"
                        onClick={() => navigate("/events")}
                    />

                    <EventItem
                        title="Tech Innovation Meetup"
                        date="24 September"
                        onClick={() => navigate("/events")}
                    />

                </div>

                {/* QUICK STATS */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                    shadow-sm
                ">

                    <h2 className="font-bold text-[#1E1B4B] mb-4">
                        Your Activity
                    </h2>

                    <StatItem
                        icon={<Users size={20} />}
                        value="8"
                        label="Active Teams"
                    />

                    <StatItem
                        icon={<Trophy size={20} />}
                        value="18"
                        label="Hackathons Joined"
                    />

                    <StatItem
                        icon={<UserPlus size={20} />}
                        value="24"
                        label="Invitations"
                    />

                    <button
                        onClick={() => navigate("/find-teammates")}
                        className="
                            w-full
                            mt-3
                            py-3
                            rounded-xl
                            bg-indigo-50
                            text-[#1E1B4B]
                            font-semibold
                            text-sm
                            hover:bg-indigo-100
                            transition
                        "
                    >
                        Explore More
                    </button>

                </div>

            </div>

        </div>
    );
}


/* =========================================================
   ACTION CARD
========================================================= */

function ActionCard({
    icon,
    title,
    text,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className="
                group
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-4
                text-left
                shadow-sm
                hover:shadow-md
                hover:-translate-y-1
                transition-all
            "
        >

            <div className="
                w-11
                h-11
                rounded-xl
                bg-indigo-50
                text-[#1E1B4B]
                flex
                items-center
                justify-center
                group-hover:bg-[#1E1B4B]
                group-hover:text-white
                transition
            ">
                {icon}
            </div>

            <h3 className="
                mt-3
                font-bold
                text-[#1E1B4B]
            ">
                {title}
            </h3>

            <p className="
                mt-1
                text-xs
                text-slate-500
            ">
                {text}
            </p>

        </button>
    );
}


/* =========================================================
   EVENT ITEM
========================================================= */

function EventItem({
    title,
    date,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className="
                w-full
                flex
                items-center
                justify-between
                py-4
                border-b
                border-slate-100
                last:border-0
                text-left
                hover:bg-slate-50
                transition
                rounded-lg
                px-2
            "
        >

            <div>

                <h3 className="
                    font-semibold
                    text-sm
                    text-[#1E1B4B]
                ">
                    {title}
                </h3>

                <p className="
                    text-xs
                    text-slate-500
                    mt-1
                ">
                    {date}
                </p>

            </div>

            <ArrowRight
                size={18}
                className="text-slate-400"
            />

        </button>
    );
}


/* =========================================================
   STAT ITEM
========================================================= */

function StatItem({
    icon,
    value,
    label,
}) {
    return (
        <div className="
            flex
            items-center
            gap-3
            py-4
            border-b
            border-slate-100
            last:border-0
        ">

            <div className="
                w-10
                h-10
                rounded-xl
                bg-teal-50
                text-teal-600
                flex
                items-center
                justify-center
            ">
                {icon}
            </div>

            <div>

                <p className="
                    text-xl
                    font-black
                    text-[#1E1B4B]
                ">
                    {value}
                </p>

                <p className="
                    text-xs
                    text-slate-500
                ">
                    {label}
                </p>

            </div>

        </div>
    );
}