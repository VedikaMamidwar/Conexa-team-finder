import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Trophy,
    Calendar,
    Users,
    Target,
    MapPin,
    ArrowRight,
    Sparkles,
    Clock,
    Zap,
    Award,
    CheckCircle,
} from "lucide-react";

const FeaturedHackathon = ({ hackathon }) => {
    const navigate = useNavigate();

    // Prevent component errors if no hackathon is available
    if (!hackathon) {
        return null;
    }

    // Open complete hackathon details page
    const handleViewDetails = () => {
        if (!hackathon.id) {
            console.error("Hackathon ID is missing:", hackathon);
            return;
        }

        navigate(`/hackathons/${hackathon.id}`, {
            state: {
                hackathon: hackathon,
            },
        });
    };

    return (
        <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-indigo-100/70 transition-all duration-500 hover:shadow-indigo-200">

            {/* Background decorative elements */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-white">

                {/* ================= FEATURED HEADER ================= */}
                <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50/80 px-6 py-5 sm:px-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        {/* Left */}
                        <div className="flex items-center gap-3">

                            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E1B4B] text-white shadow-lg shadow-indigo-100 transition-all duration-500 hover:rotate-6 hover:scale-110">
                                <Sparkles size={22} />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-black tracking-tight text-[#1E1B4B] sm:text-xl">
                                        Featured Hackathon
                                    </h2>

                                    <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#312E81]">
                                        Featured
                                    </span>
                                </div>

                                <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
                                    Explore an exciting opportunity and build something amazing.
                                </p>
                            </div>
                        </div>

                        {/* Top Right Badge */}
                        <div className="flex w-fit items-center gap-2 rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-black text-[#14B8A6] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                            <Zap size={15} />
                            Limited Opportunity
                        </div>
                    </div>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">

                    {/* ================= LEFT CONTENT ================= */}
                    <div className="p-6 sm:p-8 lg:col-span-2">

                        {/* Hackathon Title */}
                        <div className="mb-5">

                            <div className="mb-3 flex flex-wrap items-center gap-2">

                                {hackathon.category && (
                                    <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-black text-[#312E81]">
                                        {hackathon.category}
                                    </span>
                                )}

                                {hackathon.difficulty && (
                                    <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-black text-[#14B8A6]">
                                        {hackathon.difficulty}
                                    </span>
                                )}

                                {hackathon.mode && (
                                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                                        {hackathon.mode}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 transition-colors duration-300 hover:text-[#312E81] sm:text-3xl">
                                {hackathon.title || "Featured Hackathon"}
                            </h1>

                            {hackathon.description && (
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                    {hackathon.description}
                                </p>
                            )}
                        </div>

                        {/* ================= INFORMATION BOXES ================= */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                            {/* Prize */}
                            <div className="group rounded-2xl border border-amber-100 bg-amber-50/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md">

                                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                    <Trophy size={16} />
                                </div>

                                <p className="text-[10px] font-black uppercase tracking-wide text-amber-600">
                                    Prize Pool
                                </p>

                                <p className="mt-1 truncate text-sm font-black text-slate-900">
                                    {hackathon.prize || "Exciting Prizes"}
                                </p>
                            </div>

                            {/* Participants */}
                            <div className="group rounded-2xl border border-cyan-100 bg-cyan-50/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-md">

                                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                    <Users size={16} />
                                </div>

                                <p className="text-[10px] font-black uppercase tracking-wide text-cyan-600">
                                    Participants
                                </p>

                                <p className="mt-1 truncate text-sm font-black text-slate-900">
                                    {hackathon.participants || 0}
                                </p>
                            </div>

                            {/* Team Size */}
                            <div className="group rounded-2xl border border-indigo-100 bg-indigo-50/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">

                                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#312E81] shadow-sm transition-transform duration-300 group-hover:scale-110">
                                    <Target size={16} />
                                </div>

                                <p className="text-[10px] font-black uppercase tracking-wide text-[#312E81]">
                                    Team Size
                                </p>

                                <p className="mt-1 truncate text-sm font-black text-slate-900">
                                    {hackathon.teamSize || "1-4"}
                                </p>
                            </div>

                            {/* Location */}
                            <div className="group rounded-2xl border border-teal-100 bg-teal-50/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-md">

                                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#14B8A6] shadow-sm transition-transform duration-300 group-hover:scale-110">
                                    <MapPin size={16} />
                                </div>

                                <p className="text-[10px] font-black uppercase tracking-wide text-[#14B8A6]">
                                    Location
                                </p>

                                <p className="mt-1 truncate text-sm font-black text-slate-900">
                                    {hackathon.location || hackathon.mode || "Online"}
                                </p>
                            </div>
                        </div>

                        {/* ================= ADDITIONAL DETAILS ================= */}
                        <div className="mt-5 flex flex-wrap gap-2">

                            {hackathon.startDate && (
                                <div className="group flex items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-100 hover:text-cyan-700">

                                    <Calendar
                                        size={14}
                                        className="text-cyan-600 transition-transform duration-300 group-hover:scale-110"
                                    />

                                    <span>
                                        Starts:{" "}
                                        <span className="font-black">
                                            {hackathon.startDate}
                                        </span>
                                    </span>
                                </div>
                            )}

                            {hackathon.deadline && (
                                <div className="group flex items-center gap-2 rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-100 hover:text-teal-700">

                                    <Clock
                                        size={14}
                                        className="text-[#14B8A6] transition-transform duration-300 group-hover:scale-110"
                                    />

                                    <span>
                                        Deadline:{" "}
                                        <span className="font-black">
                                            {hackathon.deadline}
                                        </span>
                                    </span>
                                </div>
                            )}

                            {hackathon.status && (
                                <div className="flex items-center gap-2 rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-black text-[#14B8A6]">
                                    <CheckCircle size={14} />
                                    {hackathon.status}
                                </div>
                            )}
                        </div>

                        {/* ================= BUTTONS ================= */}
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                            {/* View Details */}
                            <button
                                type="button"
                                onClick={handleViewDetails}
                                className="group flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl active:translate-y-0"
                            >
                                View Hackathon Details

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>

                            {/* Explore */}
                            <button
                                type="button"
                                onClick={handleViewDetails}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-black text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-[#312E81] hover:shadow-lg"
                            >
                                <Award size={17} />
                                Explore Now
                            </button>
                        </div>
                    </div>

                    {/* ================= RIGHT VISUAL PANEL ================= */}
                    <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-[#1E1B4B] p-8 lg:min-h-full">

                        {/* Decorative circles */}
                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[20px] border-white/10" />

                        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border-[25px] border-[#14B8A6]/20" />

                        {/* Main Trophy Card */}
                        <div className="relative w-full max-w-xs">

                            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/20">

                                <div className="mb-5 flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#14B8A6] shadow-lg backdrop-blur-sm transition-all duration-300 hover:rotate-12 hover:scale-110">
                                        <Trophy size={25} />
                                    </div>

                                    <span className="rounded-full bg-[#14B8A6]/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#5EEAD4] backdrop-blur-sm">
                                        Featured
                                    </span>
                                </div>

                                <p className="text-xs font-medium text-indigo-200">
                                    Build • Collaborate • Win
                                </p>

                                <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight text-white">
                                    {hackathon.title || "Amazing Hackathon"}
                                </h3>

                                {/* Mini flex boxes */}
                                <div className="mt-5 grid grid-cols-2 gap-2">

                                    <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                                        <p className="text-[9px] font-black uppercase tracking-wide text-indigo-200">
                                            Prize
                                        </p>

                                        <p className="mt-1 truncate text-xs font-black text-white">
                                            {hackathon.prize || "TBA"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                                        <p className="text-[9px] font-black uppercase tracking-wide text-indigo-200">
                                            Participants
                                        </p>

                                        <p className="mt-1 text-xs font-black text-white">
                                            {hackathon.participants || 0}+
                                        </p>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mt-5">

                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-[10px] font-medium text-indigo-200">
                                            Registration Activity
                                        </span>

                                        <span className="text-[10px] font-black text-[#5EEAD4]">
                                            Open
                                        </span>
                                    </div>

                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-3/4 rounded-full bg-[#14B8A6] shadow-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -right-3 -top-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-[#14B8A6]">
                                    <Zap size={14} />
                                </div>

                                <div>
                                    <p className="text-[9px] font-medium text-slate-400">
                                        Opportunity
                                    </p>

                                    <p className="text-xs font-black text-slate-800">
                                        Don't Miss It
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= BOTTOM FOOTER ================= */}
                <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-[#14B8A6]">
                            <Users size={13} />
                        </div>

                        <span>
                            Find teammates and build your dream team on{" "}
                            <span className="font-black text-[#312E81]">
                                Connexa
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-black text-[#14B8A6]">
                        <CheckCircle size={14} />
                        Registration Available
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedHackathon;