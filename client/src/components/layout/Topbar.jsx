
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export default function Topbar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const { user, logoutUser } = useAuth();

    const [profileOpen, setProfileOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const profileRef = useRef(null);

    const getToken = useCallback(() => {
        return (
            localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("jwt")
        );
    }, []);

    const fetchUnreadCount = useCallback(async () => {
        try {
            const token = getToken();

            if (!token) {
                setUnreadCount(0);
                return;
            }

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) return;

            const data = await response.json();
            const notifications = data.notifications || [];

            setUnreadCount(
                notifications.filter(
                    (notification) => !notification.read
                ).length
            );
        } catch (error) {
            console.error("Unread notification error:", error);
        }
    }, [getToken]);

    useEffect(() => {
        fetchUnreadCount();

        const interval = setInterval(fetchUnreadCount, 10000);

        return () => clearInterval(interval);
    }, [fetchUnreadCount]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const openNotifications = () => {
        setProfileOpen(false);
        navigate("/notifications");
    };

    // LOGOUT
    const handleLogout = () => {
        setProfileOpen(false);
        setUnreadCount(0);

        try {
            // Clear AuthContext state and authentication storage.
            logoutUser();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Clear any legacy authentication keys as well.
            const storageKeys = [
                "token",
                "authToken",
                "jwt",
                "user",
            ];

            storageKeys.forEach((key) => {
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
            });

            // Replace dashboard history with the login page.
            navigate("/login", { replace: true });
        }
    };

    const getInitials = () => {
        if (!user?.name) return "ST";

        return user.name
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    return (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
            {/* LEFT */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle sidebar"
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-slate-100 lg:hidden"
                >
                    <Menu size={24} />
                </button>

                <div className="hidden sm:block">
                    <p className="text-xs font-medium text-slate-400">
                        CONEXA
                    </p>
                    <h2 className="text-lg font-bold text-[#1E1B4B]">
                        Dashboard
                    </h2>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 sm:gap-4">
                <button
                    type="button"
                    onClick={() => navigate("/ai-match")}
                    className="hidden items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[#1E1B4B] transition hover:bg-blue-100 md:flex"
                >
                    <Sparkles size={16} />
                    <span>AI Match</span>
                </button>

                {/* NOTIFICATIONS */}
                <button
                    type="button"
                    onClick={openNotifications}
                    title="Notifications"
                    aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""
                        }`}
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-indigo-50 hover:text-[#1E1B4B]"
                >
                    <Bell size={20} />

                    {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </button>

                {/* PROFILE */}
                <div className="relative" ref={profileRef}>
                    <button
                        type="button"
                        onClick={() =>
                            setProfileOpen((open) => !open)
                        }
                        aria-expanded={profileOpen}
                        aria-label="Open profile menu"
                        className="flex items-center gap-2 rounded-2xl bg-slate-100 px-2 py-2 transition hover:bg-slate-200 sm:gap-3 sm:px-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#1E1B4B] to-blue-600 text-sm font-bold text-white sm:h-11 sm:w-11">
                            {getInitials()}
                        </div>

                        <div className="hidden text-left lg:block">
                            <h3 className="text-sm font-semibold text-slate-800">
                                {user?.name || "Student"}
                            </h3>
                            <p className="text-xs text-slate-500">
                                {user?.role || "MERN Developer"}
                            </p>
                        </div>

                        <ChevronDown
                            size={18}
                            className={`hidden transition-transform sm:block ${profileOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

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
                                transition={{ duration: 0.18 }}
                                className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                            >
                                <div className="border-b border-slate-100 p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#1E1B4B] to-blue-600 text-lg font-bold text-white">
                                            {getInitials()}
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate font-bold text-[#1E1B4B]">
                                                {user?.name || "Student"}
                                            </h2>
                                            <p className="truncate text-sm text-slate-500">
                                                {user?.branch ||
                                                    user?.accountType ||
                                                    "Student"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <DropdownItem
                                    icon={<User size={18} />}
                                    text="My Profile"
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate("/profile");
                                    }}
                                />

                                <DropdownItem
                                    icon={<Trophy size={18} />}
                                    text="Achievements"
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate("/achievements");
                                    }}
                                />

                                <DropdownItem
                                    icon={<Settings size={18} />}
                                    text="Settings"
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate("/settings");
                                    }}
                                />

                                <DropdownItem
                                    icon={<LogOut size={18} />}
                                    text="Logout"
                                    danger
                                    onClick={handleLogout}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

function DropdownItem({
    icon,
    text,
    danger = false,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center gap-3 px-5 py-4 text-left transition ${danger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
        >
            {icon}
            <span className="flex-1 font-medium">{text}</span>
        </button>
    );
}

