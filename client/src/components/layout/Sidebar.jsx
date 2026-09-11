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
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    CalendarDays,
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
        path: "/build-team",
    },
    {
        title: "Hackathons",
        icon: Trophy,
        path: "/hackathons",
        badge: "LIVE",
    },
    {
        title: "Events",
        icon: CalendarDays,
        path: "/events",
    },
    {
        title: "Chat",
        icon: MessageCircle,
        path: "/chat",
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

    const isActive = (path) => {
        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        }

        return location.pathname.startsWith(path);
    };

    return (
        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                h-screen
                bg-white
                border-r
                border-slate-200
                shadow-[4px_0_20px_rgba(15,23,42,0.04)]
                transition-all
                duration-300
                flex
                flex-col

                ${sidebarOpen
                    ? "w-64"
                    : "w-20"
                }
            `}
        >

            {/* ================= LOGO ================= */}

            <div
                className={`
                    h-20
                    shrink-0
                    flex
                    items-center
                    border-b
                    border-slate-100

                    ${sidebarOpen
                        ? "justify-between px-5"
                        : "justify-center px-3"
                    }
                `}
            >

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3"
                >

                    {/* Logo */}

                    <div
                        className="
                            w-11
                            h-11
                            shrink-0
                            rounded-2xl
                            bg-gradient-to-br
                            from-[#1E1B4B]
                            via-[#312E81]
                            to-[#14B8A6]
                            text-white
                            flex
                            items-center
                            justify-center
                            font-black
                            text-xl
                            shadow-lg
                        "
                    >
                        C
                    </div>

                    {/* Brand */}

                    {sidebarOpen && (
                        <div className="leading-tight">

                            <h1
                                className="
                                    font-black
                                    text-lg
                                    tracking-wider
                                    text-[#1E1B4B]
                                "
                            >
                                CONEXA
                            </h1>

                            <p className="text-[10px] text-slate-400 mt-0.5">
                                Team Building Platform
                            </p>

                        </div>
                    )}

                </Link>

                {/* Desktop Toggle */}

                {sidebarOpen && (
                    <button
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="
                            hidden
                            lg:flex
                            w-8
                            h-8
                            rounded-xl
                            items-center
                            justify-center
                            text-slate-500
                            hover:text-[#1E1B4B]
                            hover:bg-slate-100
                            transition
                        "
                        title="Collapse sidebar"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}

                {!sidebarOpen && (
                    <button
                        onClick={() =>
                            setSidebarOpen(true)
                        }
                        className="
                            hidden
                            lg:flex
                            absolute
                            -right-3
                            top-6
                            w-7
                            h-7
                            rounded-full
                            bg-white
                            border
                            border-slate-200
                            shadow-md
                            items-center
                            justify-center
                            text-slate-600
                            hover:text-[#1E1B4B]
                            hover:bg-slate-50
                            transition
                        "
                        title="Expand sidebar"
                    >
                        <ChevronRight size={16} />
                    </button>
                )}

            </div>

            {/* ================= MENU ================= */}

            <nav className="flex-1 px-3 py-5 overflow-hidden">

                {/* MAIN TITLE */}

                {sidebarOpen && (
                    <p
                        className="
                            px-3
                            mb-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-400
                        "
                    >
                        Main
                    </p>
                )}

                {/* MAIN MENU */}

                <div className="space-y-1">

                    {mainMenu.map((item) => (
                        <SidebarItem
                            key={item.title}
                            item={item}
                            active={isActive(item.path)}
                            sidebarOpen={sidebarOpen}
                        />
                    ))}

                </div>

                {/* DIVIDER */}

                <div className="my-4 mx-2 border-t border-slate-100" />

                {/* WORKSPACE TITLE */}

                {sidebarOpen && (
                    <p
                        className="
                            px-3
                            mb-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-400
                        "
                    >
                        Workspace
                    </p>
                )}

                {/* WORKSPACE MENU */}

                <div className="space-y-1">

                    {workspaceMenu.map((item) => (
                        <SidebarItem
                            key={item.title}
                            item={item}
                            active={isActive(item.path)}
                            sidebarOpen={sidebarOpen}
                        />
                    ))}

                </div>

            </nav>

            {/* ================= BOTTOM ================= */}

            <div
                className="
                    shrink-0
                    px-3
                    pb-4
                "
            >

                {sidebarOpen && (
                    <div
                        className="
                            rounded-2xl
                            bg-gradient-to-br
                            from-[#1E1B4B]
                            to-[#312E81]
                            p-4
                            text-white
                            shadow-lg
                        "
                    >

                        <div
                            className="
                                w-9
                                h-9
                                rounded-xl
                                bg-white/10
                                flex
                                items-center
                                justify-center
                                mb-3
                            "
                        >
                            <Sparkles size={18} />
                        </div>

                        <p className="text-sm font-bold">
                            Find your team
                        </p>

                        <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                            Connect with students who match your skills.
                        </p>

                        <Link
                            to="/find-teammates"
                            className="
                                inline-flex
                                mt-3
                                text-[11px]
                                font-bold
                                bg-white
                                text-[#1E1B4B]
                                px-3
                                py-2
                                rounded-lg
                                hover:bg-slate-100
                                transition
                            "
                        >
                            Explore →
                        </Link>

                    </div>
                )}

            </div>

        </aside>
    );
}


/* =====================================================
   SIDEBAR ITEM
===================================================== */

function SidebarItem({
    item,
    active,
    sidebarOpen,
}) {
    const Icon = item.icon;

    return (
        <Link
            to={item.path}
            className="block"
        >

            <motion.div
                whileHover={{
                    x: sidebarOpen ? 3 : 0,
                }}
                whileTap={{
                    scale: 0.98,
                }}
                className={`
                    group
                    relative
                    flex
                    items-center
                    ${sidebarOpen
                        ? "justify-between px-3"
                        : "justify-center"
                    }
                    h-11
                    rounded-xl
                    transition-all
                    duration-200

                    ${active
                        ? "bg-gradient-to-r from-indigo-50 to-teal-50 text-[#1E1B4B]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#1E1B4B]"
                    }
                `}
            >

                {/* Active indicator */}

                {active && (
                    <span
                        className="
                            absolute
                            left-0
                            top-2
                            bottom-2
                            w-1
                            rounded-r-full
                            bg-gradient-to-b
                            from-[#1E1B4B]
                            to-[#14B8A6]
                        "
                    />
                )}

                {/* LEFT */}

                <div
                    className={`
                        flex
                        items-center
                        ${sidebarOpen
                            ? "gap-3"
                            : "justify-center"
                        }
                    `}
                >

                    <div
                        className={`
                            w-9
                            h-9
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            shrink-0
                            transition-all

                            ${active
                                ? "bg-white shadow-sm text-[#1E1B4B]"
                                : "group-hover:bg-white text-slate-500 group-hover:text-[#1E1B4B]"
                            }
                        `}
                    >
                        <Icon size={18} />
                    </div>

                    {sidebarOpen && (
                        <span
                            className={`
                                text-sm
                                ${active
                                    ? "font-bold"
                                    : "font-medium"
                                }
                            `}
                        >
                            {item.title}
                        </span>
                    )}

                </div>

                {/* BADGE */}

                {sidebarOpen && item.badge && (
                    <span
                        className={`
                            text-[9px]
                            font-black
                            px-2
                            py-1
                            rounded-full

                            ${item.badge === "LIVE"
                                ? "bg-orange-100 text-orange-600"
                                : item.badge === "NEW"
                                    ? "bg-cyan-100 text-cyan-700"
                                    : "bg-emerald-100 text-emerald-700"
                            }
                        `}
                    >
                        {item.badge}
                    </span>
                )}

            </motion.div>

        </Link>
    );
}