import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

import {
    Menu,
    Search,
    Bell,
    Sparkles,
    User,
    Trophy,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";



export default function Topbar({
    sidebarOpen,
    setSidebarOpen,
}) {
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    const { user } = useAuth();

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-20 px-6 flex items-center justify-between">

            {/* Left */}

            <div className="flex items-center gap-5">

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden w-11 h-11 rounded-xl hover:bg-slate-100 flex items-center justify-center"
                >
                    <Menu size={24} />
                </button>

                {/* Search */}

                <div className="hidden md:flex items-center gap-3 bg-slate-100 rounded-2xl px-5 py-3 w-[360px]">

                    <Search
                        size={18}
                        className="text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search teammates..."
                        className="bg-transparent outline-none w-full text-sm"
                    />

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-4">

                {/* AI Match */}

                <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#1E1B4B] hover:bg-blue-100 transition font-medium text-sm">

                    <Sparkles size={16} />


                </button>

                {/* Notification */}

                <button className="relative w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center">

                    <Bell size={20} />

                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

                </button>

                {/* Profile */}

                <div
                    className="relative"
                    ref={profileRef}
                >

                    <button
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                        className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 rounded-2xl px-3 py-2 transition"
                    >

                        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#1E1B4B] to-blue-600 text-white flex items-center justify-center font-bold">

                            {user?.name
                                ? user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                : "ST"}

                        </div>

                        <div className="hidden lg:block">
                            <h3 className="font-semibold text-sm">
                                {user?.name || "Student"}
                            </h3>

                            <p className="text-xs text-slate-500">
                                MERN Developer
                            </p>

                        </div>

                        <ChevronDown
                            size={18}
                            className={`transition-transform ${profileOpen
                                ? "rotate-180"
                                : ""
                                }`}
                        />

                    </button>

                    <AnimatePresence>

                        {profileOpen && (

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.98,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.98,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                            >

                                {/* Header */}

                                <div className="p-5 border-b">

                                    <div className="flex items-center gap-4">

                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#1E1B4B] to-blue-600 text-white flex items-center justify-center font-bold text-lg">

                                            {user?.name
                                                ? user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()
                                                : "ST"}

                                        </div>

                                        <div>

                                            <h2 className="font-bold">
                                                {user?.name || "Student"}
                                            </h2>

                                            <p className="text-sm text-slate-500">
                                                {user?.branch || "Student"}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* Menu */}

                                <DropdownItem
                                    icon={<User size={18} />}
                                    text="My Profile"
                                />

                                <DropdownItem
                                    icon={<Trophy size={18} />}
                                    text="Achievements"
                                />

                                <DropdownItem
                                    icon={<Settings size={18} />}
                                    text="Settings"
                                />

                                <DropdownItem
                                    icon={<LogOut size={18} />}
                                    text="Logout"
                                    danger
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
    danger,
}) {
    return (
        <button
            className={`w-full flex items-center gap-3 px-5 py-4 text-left transition ${danger
                ? "text-red-500 hover:bg-red-50"
                : "hover:bg-slate-100 text-slate-700"
                }`}
        >
            {icon}

            <span className="font-medium">
                {text}
            </span>

        </button>
    );
}