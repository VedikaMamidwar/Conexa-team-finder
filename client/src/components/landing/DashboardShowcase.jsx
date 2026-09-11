import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Bell,
    Users,
    Trophy,
    MessageCircle,
    Calendar,
    Star,
    UserPlus,
    Check,
} from "lucide-react";

const members = [
    {
        name: "Aarav Sharma",
        role: "React Developer",
        match: "98%",
    },
    {
        name: "Priya Patel",
        role: "UI/UX Designer",
        match: "95%",
    },
    {
        name: "Rohan Verma",
        role: "Backend Developer",
        match: "93%",
    },
];

export default function DashboardShowcase() {
    const [search, setSearch] = useState("");
    const [connected, setConnected] = useState([]);
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [showNotification, setShowNotification] = useState(false);

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.role.toLowerCase().includes(search.toLowerCase())
    );

    const handleConnect = (name) => {
        setConnected((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        );
    };

    const sidebarItems = [
        {
            name: "Dashboard",
            icon: Users,
        },
        {
            name: "Find Teammates",
            icon: Search,
        },
        {
            name: "Hackathons",
            icon: Trophy,
        },
        {
            name: "Chat",
            icon: MessageCircle,
        },
        {
            name: "My Teams",
            icon: Calendar,
        },
    ];

    return (
        <section
            id="demo"
            className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#F8FAFC] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ================= HEADING ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#14B8A6] font-semibold text-xs sm:text-sm">
                        Live Platform Preview
                    </p>

                    <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-[#1E1B4B] leading-tight">
                        Experience CONEXA Before You Join
                    </h2>

                    <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-7">
                        Explore a live preview of the dashboard and see how
                        easy it is to discover teammates, manage projects,
                        and prepare for hackathons.
                    </p>
                </motion.div>

                {/* ================= DASHBOARD ================= */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-2xl"
                >

                    <div className="grid lg:grid-cols-12">

                        {/* ================= SIDEBAR ================= */}
                        <div className="lg:col-span-3 bg-[#1E1B4B] text-white p-5 sm:p-6 lg:p-8">

                            {/* Logo */}
                            <div className="flex items-center gap-3 mb-7 lg:mb-10">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">
                                    C
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-black">
                                    CONEXA
                                </h2>
                            </div>

                            {/* Sidebar */}
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                                {sidebarItems.map((item) => {
                                    const Icon = item.icon;
                                    const active =
                                        activeMenu === item.name;

                                    return (
                                        <button
                                            key={item.name}
                                            type="button"
                                            onClick={() =>
                                                setActiveMenu(item.name)
                                            }
                                            className={`flex gap-2 sm:gap-3 items-center rounded-xl px-3 sm:px-4 py-3 text-left text-xs sm:text-sm lg:text-base transition ${active
                                                    ? "bg-white text-[#1E1B4B]"
                                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            <Icon
                                                size={18}
                                                className="shrink-0"
                                            />

                                            <span className="truncate">
                                                {item.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ================= MAIN CONTENT ================= */}
                        <div className="lg:col-span-9 min-w-0">

                            {/* ================= TOPBAR ================= */}
                            <div className="flex items-center gap-3 border-b border-slate-200 p-4 sm:p-5 lg:p-6">

                                {/* Search */}
                                <div className="bg-slate-100 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                    <Search
                                        size={18}
                                        className="text-slate-500 shrink-0"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search teammates..."
                                        className="bg-transparent outline-none w-full text-sm sm:text-base text-slate-700 placeholder:text-slate-500"
                                    />
                                </div>

                                {/* Notification */}
                                <div className="relative shrink-0">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNotification(
                                                !showNotification
                                            )
                                        }
                                        className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition"
                                    >
                                        <Bell
                                            size={20}
                                            className="text-[#1E1B4B]"
                                        />
                                    </button>

                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />

                                    {showNotification && (
                                        <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-20">
                                            <p className="font-semibold text-[#1E1B4B]">
                                                Notifications
                                            </p>

                                            <p className="text-sm text-slate-500 mt-2">
                                                You have 3 new teammate
                                                recommendations.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ================= CONTENT ================= */}
                            <div className="p-4 sm:p-6 lg:p-8">

                                {/* Active Menu */}
                                {activeMenu !== "Dashboard" && (
                                    <div className="mb-6 bg-indigo-50 rounded-xl p-4">
                                        <p className="text-sm text-slate-500">
                                            Currently viewing
                                        </p>

                                        <h3 className="font-bold text-lg text-[#1E1B4B]">
                                            {activeMenu}
                                        </h3>
                                    </div>
                                )}

                                {/* ================= STAT CARDS ================= */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">

                                    <div className="rounded-2xl bg-indigo-50 p-5 sm:p-6">
                                        <h3 className="text-sm sm:text-base text-slate-500">
                                            Team Match
                                        </h3>

                                        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] mt-2">
                                            96%
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-cyan-50 p-5 sm:p-6">
                                        <h3 className="text-sm sm:text-base text-slate-500">
                                            Connections
                                        </h3>

                                        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] mt-2">
                                            42
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-green-50 p-5 sm:p-6">
                                        <h3 className="text-sm sm:text-base text-slate-500">
                                            Active Teams
                                        </h3>

                                        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] mt-2">
                                            5
                                        </p>
                                    </div>

                                </div>

                                {/* ================= MEMBERS ================= */}
                                <div className="mt-8 sm:mt-10 lg:mt-12">

                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
                                            Recommended Teammates
                                        </h3>

                                        <span className="hidden sm:block text-sm text-slate-500">
                                            {filteredMembers.length} results
                                        </span>
                                    </div>

                                    {/* Members */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-5 sm:mt-6">

                                        {filteredMembers.map((member) => {
                                            const isConnected =
                                                connected.includes(
                                                    member.name
                                                );

                                            return (
                                                <motion.div
                                                    whileHover={{
                                                        y: -6,
                                                    }}
                                                    key={member.name}
                                                    className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition"
                                                >

                                                    {/* Avatar */}
                                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-100 flex items-center justify-center text-lg sm:text-xl font-bold text-[#1E1B4B]">
                                                        {member.name[0]}
                                                    </div>

                                                    {/* Name */}
                                                    <h4 className="mt-4 sm:mt-5 font-bold text-base sm:text-lg">
                                                        {member.name}
                                                    </h4>

                                                    <p className="text-sm sm:text-base text-slate-500 truncate">
                                                        {member.role}
                                                    </p>

                                                    {/* Match */}
                                                    <div className="mt-3 sm:mt-4 flex justify-between items-center">

                                                        <span className="text-green-600 font-semibold text-sm sm:text-base">
                                                            {member.match}
                                                            {" "}
                                                            Match
                                                        </span>

                                                        <Star
                                                            size={19}
                                                            className="text-yellow-500"
                                                        />

                                                    </div>

                                                    {/* Connect */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleConnect(
                                                                member.name
                                                            )
                                                        }
                                                        className={`mt-5 sm:mt-6 w-full rounded-xl py-2.5 sm:py-3 flex justify-center items-center gap-2 transition text-sm sm:text-base font-semibold ${isConnected
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-[#1E1B4B] text-white hover:bg-[#312E81]"
                                                            }`}
                                                    >
                                                        {isConnected ? (
                                                            <>
                                                                <Check
                                                                    size={18}
                                                                />
                                                                Connected
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserPlus
                                                                    size={18}
                                                                />
                                                                Connect
                                                            </>
                                                        )}
                                                    </button>

                                                </motion.div>
                                            );
                                        })}

                                    </div>

                                    {/* No results */}
                                    {filteredMembers.length === 0 && (
                                        <div className="text-center py-10">
                                            <Users
                                                size={40}
                                                className="mx-auto text-slate-300"
                                            />

                                            <p className="mt-3 text-slate-500">
                                                No teammates found.
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}