import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    Menu,
    Bell,
    Sparkles,
    User,
    Trophy,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/notifications";

export default function Topbar({
    sidebarOpen,
    setSidebarOpen,
}) {
    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const profileRef = useRef(null);

    const { user } = useAuth();

    /* =========================================================
       GET TOKEN
    ========================================================= */

    const getToken = () => {
        return (
            localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("jwt")
        );
    };

    /* =========================================================
       FETCH UNREAD COUNT
    ========================================================= */

    const fetchUnreadCount = async () => {
        try {
            const token = getToken();

            if (!token) return;

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) return;

            const data = await response.json();

            const notifications =
                data.notifications || [];

            const unread = notifications.filter(
                (notification) =>
                    !notification.read
            ).length;

            setUnreadCount(unread);
        } catch (error) {
            console.error(
                "Unread notification error:",
                error
            );
        }
    };

    /* =========================================================
       INITIAL LOAD + AUTO REFRESH
    ========================================================= */

    useEffect(() => {
        fetchUnreadCount();

        const interval = setInterval(() => {
            fetchUnreadCount();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    /* =========================================================
       CLOSE PROFILE WHEN CLICKING OUTSIDE
    ========================================================= */

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /* =========================================================
       OPEN NOTIFICATIONS
    ========================================================= */

    const openNotifications = () => {
        navigate("/notifications");
    };

    /* =========================================================
       LOGOUT
    ========================================================= */

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        localStorage.removeItem("jwt");

        setProfileOpen(false);

        navigate("/login");
    };

    /* =========================================================
       INITIALS
    ========================================================= */

    const getInitials = () => {
        if (!user?.name) return "ST";

        return user.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase();
    };

    return (
        <header
            className="
                sticky
                top-0
                z-40
                h-20
                border-b
                border-slate-200
                bg-white
                px-4
                sm:px-6
                flex
                items-center
                justify-between
            "
        >

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="flex items-center gap-4">

                {/* MOBILE MENU */}

                <button
                    onClick={() =>
                        setSidebarOpen(
                            !sidebarOpen
                        )
                    }
                    className="
                        lg:hidden
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        hover:bg-slate-100
                        transition
                    "
                >
                    <Menu size={24} />
                </button>

                {/* PAGE TITLE */}

                <div className="hidden sm:block">

                    <p className="text-xs font-medium text-slate-400">
                        CONEXA
                    </p>

                    <h2 className="text-lg font-bold text-[#1E1B4B]">
                        Dashboard
                    </h2>

                </div>

            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="flex items-center gap-2 sm:gap-4">

                {/* =================================================
                    AI MATCH
                ================================================= */}

                <button
                    onClick={() =>
                        navigate("/ai-match")
                    }
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-2
                        rounded-full
                        bg-blue-50
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-[#1E1B4B]
                        transition
                        hover:bg-blue-100
                    "
                >
                    <Sparkles size={16} />

                    <span>
                        AI Match
                    </span>
                </button>

                {/* =================================================
                    NOTIFICATION BELL
                ================================================= */}

                <button
                    onClick={openNotifications}
                    title="Notifications"
                    className="
                        relative
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-100
                        text-slate-700
                        transition
                        hover:bg-indigo-50
                        hover:text-[#1E1B4B]
                    "
                >

                    <Bell size={20} />

                    {/* UNREAD BADGE */}

                    {unreadCount > 0 && (
                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                min-h-5
                                min-w-5
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                px-1
                                text-[10px]
                                font-bold
                                text-white
                                ring-2
                                ring-white
                            "
                        >
                            {unreadCount > 99
                                ? "99+"
                                : unreadCount}
                        </span>
                    )}

                </button>

                {/* =================================================
                    PROFILE
                ================================================= */}

                <div
                    className="relative"
                    ref={profileRef}
                >

                    <button
                        onClick={() =>
                            setProfileOpen(
                                !profileOpen
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-slate-100
                            px-2
                            py-2
                            transition
                            hover:bg-slate-200
                            sm:gap-3
                            sm:px-3
                        "
                    >

                        {/* AVATAR */}

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-r
                                from-[#1E1B4B]
                                to-blue-600
                                text-sm
                                font-bold
                                text-white
                                sm:h-11
                                sm:w-11
                            "
                        >
                            {getInitials()}
                        </div>

                        {/* USER INFO */}

                        <div className="hidden lg:block text-left">

                            <h3 className="text-sm font-semibold text-slate-800">
                                {user?.name || "Student"}
                            </h3>

                            <p className="text-xs text-slate-500">
                                MERN Developer
                            </p>

                        </div>

                        <ChevronDown
                            size={18}
                            className={`hidden sm:block transition-transform ${profileOpen
                                    ? "rotate-180"
                                    : ""
                                }`}
                        />

                    </button>

                    {/* =================================================
                        PROFILE DROPDOWN
                    ================================================= */}

                    <AnimatePresence>

                        {profileOpen && (

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.96,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.96,
                                }}
                                transition={{
                                    duration: 0.18,
                                }}
                                className="
                                    absolute
                                    right-0
                                    mt-3
                                    w-72
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-2xl
                                "
                            >

                                {/* PROFILE HEADER */}

                                <div className="border-b border-slate-100 p-5">

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="
                                                flex
                                                h-14
                                                w-14
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-gradient-to-r
                                                from-[#1E1B4B]
                                                to-blue-600
                                                text-lg
                                                font-bold
                                                text-white
                                            "
                                        >
                                            {getInitials()}
                                        </div>

                                        <div className="min-w-0">

                                            <h2 className="truncate font-bold text-[#1E1B4B]">
                                                {user?.name ||
                                                    "Student"}
                                            </h2>

                                            <p className="truncate text-sm text-slate-500">
                                                {user?.branch ||
                                                    "Student"}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* =================================================
                                    MY PROFILE
                                ================================================= */}

                                <DropdownItem
                                    icon={
                                        <User size={18} />
                                    }
                                    text="My Profile"
                                    onClick={() => {
                                        setProfileOpen(false);

                                        navigate(
                                            "/profile"
                                        );
                                    }}
                                />

                                {/* =================================================
                                    ACHIEVEMENTS
                                ================================================= */}

                                <DropdownItem
                                    icon={
                                        <Trophy size={18} />
                                    }
                                    text="Achievements"
                                    onClick={() => {
                                        setProfileOpen(false);

                                        navigate(
                                            "/achievements"
                                        );
                                    }}
                                />

                                {/* =================================================
                                    SETTINGS
                                ================================================= */}

                                <DropdownItem
                                    icon={
                                        <Settings size={18} />
                                    }
                                    text="Settings"
                                    onClick={() => {
                                        setProfileOpen(false);

                                        navigate(
                                            "/settings"
                                        );
                                    }}
                                />

                                {/* =================================================
                                    LOGOUT
                                ================================================= */}

                                <DropdownItem
                                    icon={
                                        <LogOut size={18} />
                                    }
                                    text="Logout"
                                    danger
                                    onClick={
                                        handleLogout
                                    }
                                />

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

            </div>

        </header>
    );
}

/* =========================================================
   DROPDOWN ITEM
========================================================= */

function DropdownItem({
    icon,
    text,
    badge,
    danger = false,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={`
                flex
                w-full
                items-center
                gap-3
                px-5
                py-4
                text-left
                transition
                ${danger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-slate-700 hover:bg-slate-100"
                }
            `}
        >

            {icon}

            <span className="flex-1 font-medium">
                {text}
            </span>

            {badge && (
                <span
                    className="
                        rounded-full
                        bg-red-500
                        px-2
                        py-0.5
                        text-[10px]
                        font-bold
                        text-white
                    "
                >
                    {badge}
                </span>
            )}

        </button>
    );
}