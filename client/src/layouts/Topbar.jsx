import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [search, setSearch] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);


    // ================= SEARCH =================

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        navigate(
            `/find-teammates?search=${encodeURIComponent(search.trim())}`
        );
    };


    // ================= LOGOUT =================

    const handleLogout = () => {
        localStorage.removeItem("token");
        setShowProfileMenu(false);
        navigate("/login");
    };


    // ================= NAVIGATION =================

    const goTo = (path) => {
        setShowProfileMenu(false);
        navigate(path);
    };


    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

            <div className="flex h-20 items-center justify-between gap-4 px-6">


                {/* ================================================= */}
                {/* LEFT SIDE */}
                {/* ================================================= */}

                <div className="flex items-center gap-4">


                    {/* ================= SIDEBAR TOGGLE ================= */}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-xl p-2 text-xl text-slate-600 transition hover:bg-slate-100"
                    >
                        ☰
                    </button>


                    {/* ================= SEARCH ================= */}

                    <form
                        onSubmit={handleSearch}
                        className="hidden md:block"
                    >

                        <div className="relative w-72 lg:w-96">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                🔍
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search teammates..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#1E1B4B] focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            />

                        </div>

                    </form>

                </div>


                {/* ================================================= */}
                {/* RIGHT SIDE */}
                {/* ================================================= */}

                <div className="flex items-center gap-3">


                    {/* ================= MOBILE SEARCH ================= */}

                    <button
                        onClick={() => navigate("/find-teammates")}
                        className="rounded-xl p-2 text-xl transition hover:bg-slate-100 md:hidden"
                    >
                        🔍
                    </button>


                    {/* ================================================= */}
                    {/* NOTIFICATION */}
                    {/* ================================================= */}

                    <button
                        onClick={() => {
                            setShowProfileMenu(false);
                            navigate("/dashboard-notification");
                        }}
                        className="relative rounded-xl p-3 text-xl transition hover:bg-slate-100"
                        title="Notifications"
                    >

                        🔔

                        {/* Notification Count */}

                        <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            3
                        </span>

                    </button>


                    {/* ================= DIVIDER ================= */}

                    <div className="hidden h-8 w-px bg-slate-200 sm:block" />


                    {/* ================================================= */}
                    {/* PROFILE */}
                    {/* ================================================= */}

                    <div className="relative">


                        <button
                            onClick={() => {
                                setShowProfileMenu(!showProfileMenu);
                            }}
                            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
                        >


                            {/* ================= AVATAR ================= */}

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E1B4B] font-bold text-white">

                                {user?.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : "S"}

                            </div>


                            {/* ================= USER INFORMATION ================= */}

                            <div className="hidden text-left sm:block">

                                <p className="text-sm font-bold text-[#1E1B4B]">
                                    {user?.name || "Student"}
                                </p>

                                <p className="text-xs text-slate-500">
                                    MERN Developer
                                </p>

                            </div>


                            {/* ================= ARROW ================= */}

                            <span className="hidden text-slate-400 sm:block">
                                {showProfileMenu ? "⌃" : "⌄"}
                            </span>

                        </button>


                        {/* ================================================= */}
                        {/* PROFILE DROPDOWN */}
                        {/* ================================================= */}

                        {showProfileMenu && (

                            <div className="absolute right-0 mt-3 w-68 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">


                                {/* ================= USER HEADER ================= */}

                                <div className="flex items-center gap-3 px-5 py-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E1B4B] font-bold text-white">

                                        {user?.name
                                            ? user.name.charAt(0).toUpperCase()
                                            : "S"}

                                    </div>


                                    <div>

                                        <p className="font-bold text-[#1E1B4B]">
                                            {user?.name || "Student"}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {user?.branch || "CSE"}
                                        </p>

                                    </div>

                                </div>


                                <div className="border-t border-slate-200" />


                                {/* ================= MY PROFILE ================= */}

                                <button
                                    onClick={() => goTo("/profile")}
                                    className="flex w-full items-center gap-3 px-5 py-4 text-left text-slate-600 transition hover:bg-indigo-50 hover:text-[#1E1B4B]"
                                >

                                    <span className="text-lg">
                                        👤
                                    </span>

                                    <span className="text-sm font-medium">
                                        My Profile
                                    </span>

                                </button>


                                {/* ================= ACHIEVEMENTS ================= */}

                                <button
                                    onClick={() => goTo("/achievements")}
                                    className="flex w-full items-center gap-3 px-5 py-4 text-left text-slate-600 transition hover:bg-indigo-50 hover:text-[#1E1B4B]"
                                >

                                    <span className="text-lg">
                                        🏆
                                    </span>

                                    <span className="text-sm font-medium">
                                        Achievements
                                    </span>

                                </button>


                                {/* ================= SETTINGS ================= */}

                                <button
                                    onClick={() => goTo("/settings")}
                                    className="flex w-full items-center gap-3 px-5 py-4 text-left text-slate-600 transition hover:bg-indigo-50 hover:text-[#1E1B4B]"
                                >

                                    <span className="text-lg">
                                        ⚙️
                                    </span>

                                    <span className="text-sm font-medium">
                                        Settings
                                    </span>

                                </button>


                                <div className="border-t border-slate-200" />


                                {/* ================= LOGOUT ================= */}

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-5 py-4 text-left text-red-500 transition hover:bg-red-50"
                                >

                                    <span className="text-lg">
                                        🚪
                                    </span>

                                    <span className="text-sm font-medium">
                                        Logout
                                    </span>

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>
    );
}