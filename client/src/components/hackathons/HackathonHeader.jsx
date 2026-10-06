
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Zap,
    Plus,
    User,
    Menu,
    X,
    Compass,
    Trophy,
    Sparkles,
    ChevronRight,
} from "lucide-react";

const HackathonHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-lg shadow-slate-200/30 backdrop-blur-2xl">

            {/* =====================================================
                MAIN HEADER
            ====================================================== */}
            <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* =================================================
                    LOGO
                ================================================== */}
                <button
                    type="button"
                    onClick={() => navigate("/hackathons")}
                    className="group flex items-center gap-3"
                >
                    {/* Logo Icon */}
                    <div className="relative">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] text-white shadow-lg shadow-slate-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-xl">

                            <Zap
                                size={23}
                                fill="currentColor"
                                className="transition-transform duration-300 group-hover:rotate-12"
                            />

                        </div>

                        {/* Glow */}
                        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] opacity-0 blur-xl transition-all duration-300 group-hover:opacity-40" />

                        {/* Small Status Dot */}
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#14B8A6] shadow-sm" />
                    </div>

                    {/* Logo Text */}
                    <div className="text-left">

                        <h1 className="text-xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-2xl">
                            Hack
                            <span className="bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] bg-clip-text text-transparent">
                                Zone
                            </span>
                        </h1>

                        <p className="hidden text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400 sm:block">
                            Build • Compete • Innovate
                        </p>

                    </div>
                </button>

                {/* =================================================
                    DESKTOP NAVIGATION
                ================================================== */}
                <nav className="hidden items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-1.5 shadow-inner md:flex">

                    {/* Explore */}
                    <Link
                        to="/hackathons"
                        className={`group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                            isActive("/hackathons")
                                ? "bg-white text-[#14B8A6] shadow-md ring-1 ring-slate-100"
                                : "text-slate-600 hover:-translate-y-0.5 hover:bg-white hover:text-[#14B8A6] hover:shadow-md"
                        }`}
                    >
                        <Compass
                            size={17}
                            className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                        />

                        <span>Explore</span>

                        {isActive("/hackathons") && (
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]" />
                        )}
                    </Link>

                    {/* My Hackathons */}
                    <Link
                        to="/my-hackathons"
                        className={`group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                            isActive("/my-hackathons")
                                ? "bg-white text-[#14B8A6] shadow-md ring-1 ring-slate-100"
                                : "text-slate-600 hover:-translate-y-0.5 hover:bg-white hover:text-[#14B8A6] hover:shadow-md"
                        }`}
                    >
                        <Trophy
                            size={17}
                            className="transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110"
                        />

                        <span>My Hackathons</span>

                        {isActive("/my-hackathons") && (
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]" />
                        )}
                    </Link>

                    {/* Create */}
                    <Link
                        to="/create-hackathon"
                        className={`group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                            isActive("/create-hackathon")
                                ? "bg-white text-[#14B8A6] shadow-md ring-1 ring-slate-100"
                                : "text-slate-600 hover:-translate-y-0.5 hover:bg-white hover:text-[#14B8A6] hover:shadow-md"
                        }`}
                    >
                        <Plus
                            size={17}
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />

                        <span>Create</span>

                        {isActive("/create-hackathon") && (
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]" />
                        )}
                    </Link>

                </nav>

                {/* =================================================
                    DESKTOP ACTIONS
                ================================================== */}
                <div className="hidden items-center gap-3 md:flex">

                    {/* Create Hackathon Button */}
                    <button
                        type="button"
                        onClick={() => navigate("/create-hackathon")}
                        className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                    >
                        {/* Shine */}
                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                        <Plus
                            size={18}
                            className="relative transition-transform duration-300 group-hover:rotate-90"
                        />

                        <span className="relative">
                            Create Hackathon
                        </span>
                    </button>

                    {/* Profile */}
                    <button
                        type="button"
                        onClick={() => navigate("/my-hackathons")}
                        aria-label="My Hackathons"
                        className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-lg active:scale-95"
                    >
                        <User
                            size={20}
                            className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                        />
                    </button>

                </div>

                {/* =================================================
                    MOBILE MENU BUTTON
                ================================================== */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-md active:scale-95 md:hidden"
                >
                    {mobileMenuOpen ? (
                        <X
                            size={22}
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />
                    ) : (
                        <Menu
                            size={22}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    )}
                </button>

            </div>

            {/* =====================================================
                MOBILE MENU
            ====================================================== */}
            {mobileMenuOpen && (
                <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-4 shadow-2xl md:hidden">

                    {/* Mobile Welcome Box */}
                    <div className="relative mb-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] p-5 text-white shadow-lg">

                        {/* Decorations */}
                        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-white/10 blur-xl" />

                        <div className="relative flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-inner backdrop-blur-md">
                                <Sparkles size={21} />
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-100">
                                    Welcome to HackZone
                                </p>

                                <p className="mt-1 text-sm font-extrabold">
                                    Discover. Compete. Create.
                                </p>
                            </div>

                        </div>

                        {/* Mobile Stats */}
                        <div className="relative mt-4 grid grid-cols-3 gap-2">

                            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 px-2 py-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                                <Compass size={16} />
                                <span className="mt-1 text-[10px] font-semibold">
                                    Explore
                                </span>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 px-2 py-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                                <Trophy size={16} />
                                <span className="mt-1 text-[10px] font-semibold">
                                    Compete
                                </span>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 px-2 py-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                                <Plus size={16} />
                                <span className="mt-1 text-[10px] font-semibold">
                                    Create
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="space-y-2">

                        {/* Explore */}
                        <Link
                            to="/hackathons"
                            onClick={closeMenu}
                            className={`group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                                isActive("/hackathons")
                                    ? "border-[#99F6E4] bg-[#F0FDFA] text-[#14B8A6] shadow-md"
                                    : "border-slate-100 bg-white text-slate-700 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md"
                            }`}
                        >
                            <div className="flex items-center gap-3">

                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                                    isActive("/hackathons")
                                        ? "bg-[#CCFBF1] text-[#14B8A6]"
                                        : "bg-slate-50 text-slate-500 group-hover:bg-[#CCFBF1] group-hover:text-[#14B8A6]"
                                }`}>
                                    <Compass
                                        size={19}
                                        className="transition-transform duration-300 group-hover:rotate-12"
                                    />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-bold">
                                        Explore Hackathons
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                        Find your next challenge
                                    </p>
                                </div>

                            </div>

                            <ChevronRight
                                size={18}
                                className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#14B8A6]"
                            />
                        </Link>

                        {/* My Hackathons */}
                        <Link
                            to="/my-hackathons"
                            onClick={closeMenu}
                            className={`group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                                isActive("/my-hackathons")
                                    ? "border-[#99F6E4] bg-[#F0FDFA] text-[#14B8A6] shadow-md"
                                    : "border-slate-100 bg-white text-slate-700 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md"
                            }`}
                        >
                            <div className="flex items-center gap-3">

                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                                    isActive("/my-hackathons")
                                        ? "bg-[#CCFBF1] text-[#14B8A6]"
                                        : "bg-slate-50 text-slate-500 group-hover:bg-[#CCFBF1] group-hover:text-[#14B8A6]"
                                }`}>
                                    <Trophy
                                        size={19}
                                        className="transition-transform duration-300 group-hover:-rotate-6"
                                    />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-bold">
                                        My Hackathons
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                        Manage your events
                                    </p>
                                </div>

                            </div>

                            <ChevronRight
                                size={18}
                                className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#14B8A6]"
                            />
                        </Link>

                        {/* Create */}
                        <Link
                            to="/create-hackathon"
                            onClick={closeMenu}
                            className={`group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                                isActive("/create-hackathon")
                                    ? "border-[#99F6E4] bg-[#F0FDFA] text-[#14B8A6] shadow-md"
                                    : "border-slate-100 bg-white text-slate-700 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md"
                            }`}
                        >
                            <div className="flex items-center gap-3">

                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                                    isActive("/create-hackathon")
                                        ? "bg-[#CCFBF1] text-[#14B8A6]"
                                        : "bg-slate-50 text-slate-500 group-hover:bg-[#CCFBF1] group-hover:text-[#14B8A6]"
                                }`}>
                                    <Plus
                                        size={19}
                                        className="transition-transform duration-300 group-hover:rotate-90"
                                    />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-bold">
                                        Create Hackathon
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                        Launch your own event
                                    </p>
                                </div>

                            </div>

                            <ChevronRight
                                size={18}
                                className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#14B8A6]"
                            />
                        </Link>

                    </nav>

                    {/* =================================================
                        MOBILE CREATE BUTTON
                    ================================================== */}
                    <button
                        type="button"
                        onClick={() => {
                            closeMenu();
                            navigate("/create-hackathon");
                        }}
                        className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] px-4 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
                    >
                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                        <Plus
                            size={19}
                            className="relative transition-transform duration-300 group-hover:rotate-90"
                        />

                        <span className="relative">
                            Create Hackathon
                        </span>
                    </button>

                    {/* =================================================
                        MOBILE PROFILE
                    ================================================== */}
                    <button
                        type="button"
                        onClick={() => {
                            closeMenu();
                            navigate("/my-hackathons");
                        }}
                        className="group mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-md"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                            <User size={17} />
                        </div>

                        <span>
                            My Profile / Hackathons
                        </span>
                    </button>

                </div>
            )}

        </header>
    );
};

export default HackathonHeader;
