import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Trophy,
    FolderKanban,
    UserCheck,
    Sparkles,
    BarChart3,
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const mainMenu = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        title: "Find Teammates",
        icon: Users,
        path: "/find-teammates",
    },
    {
        title: "Team Builder",
        icon: UserPlus,
        path: "/team-builder",
    },
    {
        title: "Hackathons",
        icon: Trophy,
        path: "/hackathons",
        badge: "LIVE",
    },
];

const workspaceMenu = [
    {
        title: "My Projects",
        icon: FolderKanban,
        path: "/projects",
    },
    {
        title: "My Teams",
        icon: UserCheck,
        path: "/teams",
        badge: "3",
    },
    {
        title: "AI Match",
        icon: Sparkles,
        path: "/ai-match",
        badge: "NEW",
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: "/analytics",
    },
];

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}) {
    const location = useLocation();

    return (
        <aside
            className={`sticky top-0 h-screen bg-white border-r border-slate-200 shadow-sm transition-all duration-300 flex flex-col ${sidebarOpen ? "w-72" : "w-24"
                }`}
        >
            {/* Logo */}

            <div className="h-20 shrink-0 flex items-center justify-between px-6 border-b border-slate-100">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#1E1B4B] to-[#4F46E5] text-white flex items-center justify-center font-bold text-xl shadow-md">
                        C
                    </div>

                    {sidebarOpen && (
                        <div>
                            <h1 className="font-black text-xl tracking-wider text-[#1E1B4B]">
                                CONEXA
                            </h1>

                            <p className="text-xs text-slate-500">
                                Team Building Platform
                            </p>
                        </div>
                    )}

                </div>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="hidden lg:flex w-9 h-9 rounded-xl hover:bg-slate-100 items-center justify-center"
                >
                    {sidebarOpen ? (
                        <ChevronLeft size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>

            </div>

            {/* Scrollable Area */}

            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">

                {/* Search */}

                {sidebarOpen && (
                    <div className="px-5 pt-5">

                        <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3">

                            <Search size={18} className="text-slate-400" />

                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm w-full"
                            />

                        </div>

                    </div>
                )}

                {/* MAIN */}

                <div className="mt-8 px-4">

                    {sidebarOpen && (
                        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 px-3">
                            Main
                        </p>
                    )}

                    <div className="space-y-2">

                        {mainMenu.map((item) => {

                            const Icon = item.icon;
                            const active = location.pathname === item.path;

                            return (
                                <Link key={item.title} to={item.path}>

                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${active
                                                ? "bg-indigo-50 text-[#1E1B4B] font-semibold"
                                                : "hover:bg-slate-100 text-slate-700"
                                            }`}
                                    >

                                        <div className="flex items-center gap-4">

                                            <Icon size={21} />

                                            {sidebarOpen && (
                                                <span>{item.title}</span>
                                            )}

                                        </div>

                                        {sidebarOpen && item.badge && (
                                            <span
                                                className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.badge === "LIVE"
                                                        ? "bg-orange-100 text-orange-600"
                                                        : "bg-blue-100 text-blue-600"
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}

                                    </motion.div>

                                </Link>
                            );
                        })}

                    </div>

                </div>

                {/* WORKSPACE */}

                <div className="mt-8 px-4 pb-8">

                    {sidebarOpen && (
                        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 px-3">
                            Workspace
                        </p>
                    )}

                    <div className="space-y-2">

                        {workspaceMenu.map((item) => {

                            const Icon = item.icon;
                            const active = location.pathname === item.path;

                            return (
                                <Link key={item.title} to={item.path}>

                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${active
                                                ? "bg-indigo-50 text-[#1E1B4B] font-semibold"
                                                : "hover:bg-slate-100 text-slate-700"
                                            }`}
                                    >

                                        <div className="flex items-center gap-4">

                                            <Icon size={21} />

                                            {sidebarOpen && (
                                                <span>{item.title}</span>
                                            )}

                                        </div>

                                        {sidebarOpen && item.badge && (
                                            <span
                                                className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.badge === "NEW"
                                                        ? "bg-cyan-100 text-cyan-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}

                                    </motion.div>

                                </Link>
                            );
                        })}

                    </div>

                </div>

            </div>

        </aside>
    );
}