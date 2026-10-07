import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
        <>
            {/* ================= MOBILE OVERLAY ================= */}

            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSidebarOpen(false)}
                        className="
                            fixed
                            inset-0
                            z-40
                            bg-[#1E1B4B]/20
                            backdrop-blur-[2px]
                            lg:hidden
                        "
                    />
                )}
            </AnimatePresence>

            {/* ================= SIDEBAR ================= */}

            <motion.aside
                initial={false}
                animate={{
                    width: sidebarOpen ? 264 : 82,
                    x: 0,
                }}
                transition={{
                    width: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                    },
                }}
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    h-screen
                    bg-white
                    border-r
                    border-slate-200
                    shadow-[6px_0_30px_rgba(30,27,75,0.06)]
                    flex
                    flex-col
                    overflow-hidden

                    max-lg:w-[264px]
                    max-lg:transition-transform
                    ${sidebarOpen
                        ? "max-lg:translate-x-0"
                        : "max-lg:-translate-x-full"
                    }
                `}
            >

                {/* ================= LOGO HEADER ================= */}

                <div
                    className={`
                        relative
                        h-[76px]
                        shrink-0
                        flex
                        items-center
                        border-b
                        border-slate-100
                        ${sidebarOpen
                            ? "px-4"
                            : "justify-center px-2"
                        }
                    `}
                >

                    <Link
                        to="/dashboard"
                        className={`
                            flex
                            items-center
                            min-w-0
                            ${sidebarOpen ? "gap-3" : ""}
                        `}
                    >

                        {/* LOGO */}

                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                rotate: 2,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                            }}
                            className="
                                relative
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
                                shadow-[#1E1B4B]/15
                            "
                        >
                            C

                            <span
                                className="
                                    absolute
                                    -right-1
                                    -top-1
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-[#14B8A6]
                                    border-2
                                    border-white
                                "
                            />
                        </motion.div>

                        {/* BRAND */}

                        <AnimatePresence initial={false}>
                            {sidebarOpen && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        width: 0,
                                        x: -8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        width: "auto",
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        width: 0,
                                        x: -8,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="
                                        min-w-0
                                        overflow-hidden
                                        whitespace-nowrap
                                    "
                                >
                                    <h1
                                        className="
                                            text-[17px]
                                            font-black
                                            tracking-[0.16em]
                                            text-[#1E1B4B]
                                        "
                                    >
                                        CONEXA
                                    </h1>

                                    <p
                                        className="
                                            mt-0.5
                                            text-[9px]
                                            font-medium
                                            text-slate-400
                                            tracking-wide
                                        "
                                    >
                                        TEAM BUILDING PLATFORM
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </Link>

                    {/* COLLAPSE BUTTON */}

                    <AnimatePresence initial={false}>
                        {sidebarOpen && (
                            <motion.button
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className="
                                    hidden
                                    lg:flex
                                    absolute
                                    right-3
                                    w-8
                                    h-8
                                    rounded-xl
                                    items-center
                                    justify-center
                                    text-slate-400
                                    hover:text-[#1E1B4B]
                                    hover:bg-slate-100
                                    transition-all
                                "
                                title="Collapse sidebar"
                            >
                                <ChevronLeft size={18} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* EXPAND BUTTON */}

                    {!sidebarOpen && (
                        <motion.button
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="
                                hidden
                                lg:flex
                                absolute
                                -right-3
                                top-[24px]
                                w-7
                                h-7
                                rounded-full
                                bg-white
                                border
                                border-slate-200
                                shadow-md
                                items-center
                                justify-center
                                text-slate-500
                                hover:text-[#1E1B4B]
                                hover:scale-105
                                transition-all
                            "
                            title="Expand sidebar"
                        >
                            <ChevronRight size={15} />
                        </motion.button>
                    )}

                </div>

                {/* ================= NAVIGATION ================= */}

                <nav
                    className="
                        flex-1
                        overflow-y-auto
                        overflow-x-hidden
                        px-3
                        py-5
                        scrollbar-thin
                        scrollbar-thumb-slate-200
                        scrollbar-track-transparent
                    "
                >

                    {/* MAIN */}

                    <SectionTitle
                        title="Main"
                        sidebarOpen={sidebarOpen}
                    />

                    <div className="space-y-1.5">
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

                    <div
                        className="
                            my-5
                            mx-2
                            h-px
                            bg-slate-100
                        "
                    />

                    {/* WORKSPACE */}

                    <SectionTitle
                        title="Workspace"
                        sidebarOpen={sidebarOpen}
                    />

                    <div className="space-y-1.5">
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

                {/* ================= BOTTOM CARD ================= */}

                <div
                    className={`
                        shrink-0
                        ${sidebarOpen
                            ? "px-3 pb-4"
                            : "px-2 pb-4"
                        }
                    `}
                >

                    <AnimatePresence initial={false} mode="wait">

                        {sidebarOpen ? (
                            <motion.div
                                key="open-card"
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-[#1E1B4B]
                                    via-[#252158]
                                    to-[#14B8A6]
                                    p-4
                                    text-white
                                    shadow-lg
                                "
                            >

                                {/* Decorative circle */}

                                <div
                                    className="
                                        absolute
                                        -right-8
                                        -top-8
                                        w-24
                                        h-24
                                        rounded-full
                                        bg-white/5
                                    "
                                />

                                <div
                                    className="
                                        relative
                                        w-9
                                        h-9
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        flex
                                        items-center
                                        justify-center
                                        mb-3
                                    "
                                >
                                    <Sparkles size={17} />
                                </div>

                                <p className="relative text-sm font-bold">
                                    Find your team
                                </p>

                                <p
                                    className="
                                        relative
                                        mt-1
                                        text-[11px]
                                        leading-relaxed
                                        text-white/60
                                    "
                                >
                                    Connect with students who
                                    match your skills.
                                </p>

                                <Link
                                    to="/find-teammates"
                                    className="
                                        relative
                                        inline-flex
                                        items-center
                                        mt-3
                                        px-3
                                        py-2
                                        rounded-lg
                                        bg-white
                                        text-[#1E1B4B]
                                        text-[11px]
                                        font-bold
                                        hover:bg-slate-100
                                        hover:translate-x-0.5
                                        transition-all
                                    "
                                >
                                    Explore
                                    <span className="ml-1">
                                        →
                                    </span>
                                </Link>

                            </motion.div>
                        ) : (
                            <motion.div
                                key="closed-card"
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                className="
                                    flex
                                    justify-center
                                "
                            >
                                <Link
                                    to="/find-teammates"
                                    title="Find your team"
                                    className="
                                        flex
                                        w-12
                                        h-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-[#1E1B4B]
                                        to-[#14B8A6]
                                        text-white
                                        shadow-md
                                        hover:scale-105
                                        transition-all
                                    "
                                >
                                    <Sparkles size={19} />
                                </Link>
                            </motion.div>
                        )}

                    </AnimatePresence>

                </div>

            </motion.aside>
        </>
    );
}


/* =====================================================
   SECTION TITLE
===================================================== */

function SectionTitle({
    title,
    sidebarOpen,
}) {
    return (
        <AnimatePresence initial={false}>
            {sidebarOpen && (
                <motion.div
                    initial={{
                        opacity: 0,
                        height: 0,
                    }}
                    animate={{
                        opacity: 1,
                        height: "auto",
                    }}
                    exit={{
                        opacity: 0,
                        height: 0,
                    }}
                    className="
                        overflow-hidden
                        px-3
                        mb-2
                    "
                >
                    <p
                        className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.2em]
                            text-slate-400
                        "
                    >
                        {title}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
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
            title={!sidebarOpen ? item.title : undefined}
            className="block"
        >

            <motion.div
                whileHover={{
                    x: sidebarOpen ? 3 : 0,
                }}
                whileTap={{
                    scale: 0.98,
                }}
                transition={{
                    duration: 0.15,
                }}
                className={`
                    group
                    relative
                    h-12
                    rounded-xl
                    flex
                    items-center
                    overflow-hidden
                    transition-all
                    duration-200

                    ${sidebarOpen
                        ? "justify-between px-2.5"
                        : "justify-center"
                    }

                    ${active
                        ? "bg-gradient-to-r from-[#1E1B4B]/[0.07] to-[#14B8A6]/[0.09]"
                        : "hover:bg-slate-50"
                    }
                `}
            >

                {/* ACTIVE LINE */}

                <motion.span
                    initial={false}
                    animate={{
                        scaleY: active ? 1 : 0,
                        opacity: active ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
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
                        origin-center
                    "
                />

                {/* LEFT */}

                <div
                    className={`
                        flex
                        items-center
                        min-w-0
                        ${sidebarOpen
                            ? "gap-3"
                            : "justify-center"
                        }
                    `}
                >

                    {/* ICON BOX */}

                    <motion.div
                        animate={{
                            scale: active ? 1 : 0.96,
                        }}
                        className={`
                            relative
                            w-9
                            h-9
                            shrink-0
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            transition-all
                            duration-200

                            ${active
                                ? "bg-white text-[#1E1B4B] shadow-sm"
                                : "text-slate-500 group-hover:text-[#1E1B4B] group-hover:bg-white"
                            }
                        `}
                    >
                        <Icon size={18} />

                        {/* Active dot */}

                        {active && (
                            <span
                                className="
                                    absolute
                                    -right-0.5
                                    -top-0.5
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-[#14B8A6]
                                    border
                                    border-white
                                "
                            />
                        )}
                    </motion.div>

                    {/* TITLE */}

                    <AnimatePresence initial={false}>
                        {sidebarOpen && (
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    x: -6,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -6,
                                }}
                                transition={{
                                    duration: 0.18,
                                }}
                                className={`
                                    truncate
                                    text-sm
                                    whitespace-nowrap

                                    ${active
                                        ? "font-bold text-[#1E1B4B]"
                                        : "font-medium text-slate-600 group-hover:text-[#1E1B4B]"
                                    }
                                `}
                            >
                                {item.title}
                            </motion.span>
                        )}
                    </AnimatePresence>

                </div>

                {/* BADGE */}

                <AnimatePresence initial={false}>
                    {sidebarOpen && item.badge && (
                        <motion.span
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            className={`
                                shrink-0
                                text-[8px]
                                font-black
                                tracking-wide
                                px-2
                                py-1
                                rounded-full

                                ${item.badge === "LIVE"
                                    ? "bg-[#14B8A6]/10 text-[#14B8A6]"
                                    : item.badge === "NEW"
                                        ? "bg-[#1E1B4B]/10 text-[#1E1B4B]"
                                        : "bg-slate-100 text-slate-500"
                                }
                            `}
                        >
                            {item.badge}
                        </motion.span>
                    )}
                </AnimatePresence>

            </motion.div>

        </Link>
    );
}