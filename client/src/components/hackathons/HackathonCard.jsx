import React from "react";
import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Trophy,
    CalendarDays,
    Target,
    Users,
    ArrowRight,
    Sparkles,
    Zap,
    CheckCircle,
    UserPlus,
} from "lucide-react";

const HackathonCard = ({ hackathon, onViewDetails }) => {
    const navigate = useNavigate();

    const seatsLeft = Math.max(
        Number(hackathon.maxParticipants || 0) -
            Number(hackathon.participants || 0),
        0
    );

    const progress =
        Number(hackathon.maxParticipants || 0) > 0
            ? Math.min(
                  (Number(hackathon.participants || 0) /
                      Number(hackathon.maxParticipants)) *
                      100,
                  100
              )
            : 0;

    // ============================================
    // VIEW DETAILS
    // ============================================
    const handleViewDetails = () => {
        if (onViewDetails) {
            onViewDetails(hackathon.id);
        } else {
            navigate(`/hackathons/${hackathon.id}`);
        }
    };

    // ============================================
    // REGISTER
    // ============================================
    const handleRegister = () => {
        if (seatsLeft > 0) {
            navigate(`/hackathons/${hackathon.id}/register`);
        }
    };

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">

            {/* =====================================================
                TOP DASHBOARD ACCENT
            ===================================================== */}
            <div className="h-1 w-full bg-indigo-600 opacity-80 transition-all duration-300 group-hover:h-1.5 group-hover:opacity-100" />

            {/* =====================================================
                IMAGE SECTION
            ===================================================== */}
            <div className="group/image relative h-56 overflow-hidden">

                {hackathon.image ? (
                    <img
                        src={hackathon.image}
                        alt={hackathon.title}
                        className="h-full w-full object-cover transition duration-1000 group-hover/image:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800">
                        <Trophy
                            size={75}
                            className="text-white/20 transition-all duration-700 group-hover/image:scale-125 group-hover/image:rotate-6"
                        />
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

                {/* Decorative Circles */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-400/10 blur-sm transition-transform duration-700 group-hover:scale-125" />

                <div className="pointer-events-none absolute -left-12 bottom-10 h-24 w-24 rounded-full bg-indigo-400/10 blur-2xl" />

                {/* FEATURED */}
                {hackathon.featured && (
                    <div className="absolute left-4 top-4">
                        <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white px-3.5 py-2 text-xs font-extrabold text-indigo-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Sparkles
                                size={14}
                                className="text-indigo-600"
                            />
                            Featured
                        </div>
                    </div>
                )}

                {/* MODE */}
                <span
                    className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                        hackathon.mode === "Online"
                            ? "bg-emerald-500 text-white"
                            : hackathon.mode === "Hybrid"
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-700 text-white"
                    }`}
                >
                    <Zap size={13} />
                    {hackathon.mode}
                </span>

                {/* IMAGE BOTTOM INFO */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-white">

                    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-slate-900/30 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:bg-slate-900/40">
                        <MapPin
                            size={15}
                            className="shrink-0 text-white/80"
                        />

                        <span className="truncate text-xs font-semibold text-white/90">
                            {hackathon.location || "Online"}
                        </span>
                    </div>

                    <span className="rounded-xl border border-white/10 bg-white/15 px-3 py-2 text-xs font-bold backdrop-blur-md transition-all duration-300 hover:bg-white/25">
                        {hackathon.difficulty || "Beginner"}
                    </span>
                </div>
            </div>

            {/* =====================================================
                CONTENT
            ===================================================== */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* CATEGORY */}
                <div className="flex items-center justify-between gap-3">

                    <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-2 text-xs font-extrabold text-indigo-700 ring-1 ring-indigo-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-100 hover:shadow-sm">
                        <Sparkles size={12} />

                        {hackathon.category || "General"}
                    </span>

                    <span className="rounded-xl bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-400 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-500">
                        #{hackathon.id}
                    </span>
                </div>

                {/* TITLE */}
                <h3 className="mt-4 line-clamp-2 min-h-[56px] text-xl font-black leading-7 text-slate-900 transition-colors duration-300 group-hover:text-indigo-700">
                    {hackathon.title}
                </h3>

                {/* ORGANIZER */}
                <p className="mt-2 truncate text-sm text-slate-500">
                    Organized by{" "}
                    <span className="font-extrabold text-slate-700">
                        {hackathon.organizer || "Tech Innovators"}
                    </span>
                </p>

                {/* DESCRIPTION */}
                <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
                    {hackathon.description ||
                        "Join this exciting hackathon and build innovative solutions."}
                </p>

                {/* =================================================
                    INFORMATION BOXES
                ================================================= */}
                <div className="mt-5 grid grid-cols-2 gap-3">

                    <InfoBox
                        icon={<MapPin size={17} />}
                        label="Location"
                        value={hackathon.location || "Online"}
                        iconBg="bg-indigo-100"
                        iconColor="text-indigo-600"
                        hover="hover:border-indigo-200 hover:bg-indigo-50"
                    />

                    <InfoBox
                        icon={<Trophy size={17} />}
                        label="Prize"
                        value={hackathon.prize || "TBA"}
                        iconBg="bg-slate-100"
                        iconColor="text-slate-600"
                        hover="hover:border-indigo-200 hover:bg-indigo-50"
                    />

                    <InfoBox
                        icon={<CalendarDays size={17} />}
                        label="Deadline"
                        value={hackathon.deadline || "TBA"}
                        iconBg="bg-indigo-100"
                        iconColor="text-indigo-600"
                        hover="hover:border-indigo-200 hover:bg-indigo-50"
                    />

                    <InfoBox
                        icon={<Target size={17} />}
                        label="Level"
                        value={hackathon.difficulty || "Beginner"}
                        iconBg="bg-slate-100"
                        iconColor="text-slate-600"
                        hover="hover:border-indigo-200 hover:bg-indigo-50"
                    />
                </div>

                {/* =================================================
                    QUICK FLEX BOXES
                ================================================= */}
                <div className="mt-4 flex flex-wrap gap-2">

                    <div className="flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-sm">
                        <CheckCircle size={13} />
                        Certificate
                    </div>

                    <div className="flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-[10px] font-bold text-indigo-700 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-sm">
                        <Users size={13} />
                        Team Based
                    </div>

                    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm">
                        <Zap size={13} />
                        Challenge
                    </div>
                </div>

                {/* =================================================
                    PARTICIPANTS + PROGRESS
                ================================================= */}
                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-indigo-100 hover:bg-indigo-50/50 hover:shadow-sm">

                    <div className="mb-2.5 flex items-center justify-between gap-2">

                        <div className="flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <Users size={15} />
                            </div>

                            <span className="text-xs font-bold text-slate-600">
                                {hackathon.participants || 0} joined
                            </span>
                        </div>

                        <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                                seatsLeft <= 5
                                    ? "bg-red-50 text-red-500"
                                    : "bg-indigo-50 text-indigo-600"
                            }`}
                        >
                            {seatsLeft} seats left
                        </span>
                    </div>

                    {/* PROGRESS */}
                    <div className="h-2.5 overflow-hidden rounded-full bg-white shadow-inner">
                        <div
                            className="h-full rounded-full bg-indigo-600 transition-all duration-1000"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <div className="mt-2 flex justify-between text-[10px] font-semibold text-slate-400">
                        <span>
                            {Math.round(progress)}% filled
                        </span>

                        <span>
                            {hackathon.maxParticipants || 0} total
                        </span>
                    </div>
                </div>

                {/* =================================================
                    VIEW DETAILS + REGISTER
                ================================================= */}
                <div className="mt-6 grid grid-cols-2 gap-3">

                    {/* VIEW DETAILS */}
                    <button
                        type="button"
                        onClick={handleViewDetails}
                        className="group/details flex items-center justify-center gap-2 rounded-2xl border-2 border-indigo-600 bg-white px-3 py-3.5 text-sm font-extrabold text-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50 hover:shadow-lg active:scale-95"
                    >
                        <span>View Details</span>

                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover/details:translate-x-1"
                        />
                    </button>

                    {/* REGISTER */}
                    <button
                        type="button"
                        onClick={handleRegister}
                        disabled={seatsLeft <= 0}
                        className="group/register flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-3 py-3.5 text-sm font-extrabold text-white shadow-md shadow-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        <UserPlus
                            size={16}
                            className="transition-transform duration-300 group-hover/register:scale-110"
                        />

                        <span>
                            {seatsLeft > 0 ? "Register" : "Full"}
                        </span>
                    </button>
                </div>

                {/* =================================================
                    HURRY MESSAGE
                ================================================= */}
                {seatsLeft > 0 && seatsLeft <= 10 && (
                    <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-orange-100 bg-orange-50 px-3 py-2.5 text-xs font-bold text-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                        <span className="animate-pulse">
                            🔥
                        </span>

                        Only {seatsLeft} seats remaining!
                    </div>
                )}

                {/* FULL MESSAGE */}
                {seatsLeft <= 0 && (
                    <div className="mt-3 flex items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-500">
                        Registration is full
                    </div>
                )}
            </div>
        </article>
    );
};

/* =====================================================
   REUSABLE INFORMATION BOX
===================================================== */

const InfoBox = ({
    icon,
    label,
    value,
    iconBg,
    iconColor,
    hover,
}) => {
    return (
        <div
            className={`group/info rounded-2xl border border-slate-100 bg-slate-50 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${hover}`}
        >
            <div className="flex items-center gap-2.5">

                {/* ICON */}
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-all duration-300 group-hover/info:scale-110 group-hover/info:rotate-3`}
                >
                    {icon}
                </div>

                {/* TEXT */}
                <div className="min-w-0">

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                    </p>

                    <p className="mt-0.5 truncate text-sm font-extrabold text-slate-700">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HackathonCard;