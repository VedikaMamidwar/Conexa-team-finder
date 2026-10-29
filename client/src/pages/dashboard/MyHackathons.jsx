
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80";

const getStoredArray = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch (error) {
        console.error(`Error loading ${key}:`, error);
        return [];
    }
};

const getCreatedHackathons = () => getStoredArray("myHackathons");

const getHackathonId = (hackathon) =>
    hackathon.id ?? hackathon._id ?? hackathon.hackathonId;

const MyHackathons = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("registered");
    const [searchTerm, setSearchTerm] = useState("");

    const [myHackathons, setMyHackathons] = useState(getCreatedHackathons);
    const [registeredHackathons, setRegisteredHackathons] = useState(
        () => getStoredArray("registeredHackathons")
    );
    const [participatingHackathons, setParticipatingHackathons] = useState(
        () => getStoredArray("participatingHackathons")
    );
    const [completedHackathons, setCompletedHackathons] = useState(
        () => getStoredArray("completedHackathons")
    );
    const [savedHackathons, setSavedHackathons] = useState(
        () => getStoredArray("savedHackathons")
    );

    const refreshData = useCallback(() => {
        setRegisteredHackathons(getStoredArray("registeredHackathons"));
        setParticipatingHackathons(getStoredArray("participatingHackathons"));
        setCompletedHackathons(getStoredArray("completedHackathons"));
        setSavedHackathons(getStoredArray("savedHackathons"));
        setMyHackathons(getCreatedHackathons());
    }, []);

    useEffect(() => {
        refreshData();

        const handleStorage = (event) => {
            const relevantKeys = [
                "registeredHackathons",
                "participatingHackathons",
                "completedHackathons",
                "savedHackathons",
                "myHackathons",
            ];

            if (event.key === null || relevantKeys.includes(event.key)) {
                refreshData();
            }
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("focus", refreshData);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("focus", refreshData);
        };
    }, [refreshData]);

    const personalTabs = useMemo(
        () => [
            {
                id: "registered",
                label: "Registered",
                icon: "📝",
                description: "Hackathons you registered for",
                data: registeredHackathons,
                color: "indigo",
            },
            {
                id: "participating",
                label: "Participating",
                icon: "🚀",
                description: "Hackathons you are currently participating in",
                data: participatingHackathons,
                color: "teal",
            },
            {
                id: "completed",
                label: "Completed",
                icon: "🏆",
                description: "Hackathons you have completed",
                data: completedHackathons,
                color: "amber",
            },
            {
                id: "saved",
                label: "Saved",
                icon: "🔖",
                description: "Your bookmarked hackathons",
                data: savedHackathons,
                color: "rose",
            },
        ],
        [
            registeredHackathons,
            participatingHackathons,
            completedHackathons,
            savedHackathons,
        ]
    );

    const activeTabData =
        personalTabs.find((tab) => tab.id === activeTab) || personalTabs[0];

    const filteredPersonalHackathons = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) return activeTabData.data;

        return activeTabData.data.filter((hackathon) => {
            const searchable = [
                hackathon.title,
                hackathon.name,
                hackathon.category,
                hackathon.organizer,
                hackathon.organization,
                hackathon.description,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchable.includes(search);
        });
    }, [activeTabData, searchTerm]);

    const removeSavedHackathon = (id) => {
        const updated = savedHackathons.filter(
            (hackathon) => getHackathonId(hackathon) !== id
        );

        localStorage.setItem("savedHackathons", JSON.stringify(updated));
        setSavedHackathons(updated);
    };

    const getStatus = (tab) => {
        const statuses = {
            registered: "bg-indigo-100 text-indigo-800",
            participating: "bg-emerald-100 text-emerald-800",
            completed: "bg-amber-100 text-amber-800",
            saved: "bg-rose-100 text-rose-700",
        };

        return statuses[tab] || statuses.registered;
    };

    const getHackathonTitle = (hackathon) =>
        hackathon.title || hackathon.name || "Untitled Hackathon";

    const getHackathonDate = (hackathon) =>
        hackathon.deadline || hackathon.date || "Coming Soon";

    const getHackathonRoute = (hackathon) => {
        const id = getHackathonId(hackathon);
        return id ? `/hackathons/${id}` : "/hackathons";
    };

    const openHackathon = (hackathon) => {
        navigate(getHackathonRoute(hackathon));
    };

    const getProgress = (hackathon) => {
        const participants = Math.max(0, Number(hackathon.participants) || 0);
        const maximum = Math.max(0, Number(hackathon.maxParticipants) || 0);

        return {
            participants,
            maximum,
            progress:
                maximum > 0
                    ? Math.min((participants / maximum) * 100, 100)
                    : 0,
            seatsLeft: maximum > 0 ? Math.max(0, maximum - participants) : null,
        };
    };

    const PersonalHackathonCard = ({ hackathon, tab }) => {
        const { participants, maximum, progress } = getProgress(hackathon);
        const isOnline = (hackathon.mode || "").toLowerCase() === "online";
        const id = getHackathonId(hackathon);

        return (
            <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={hackathon.image || DEFAULT_IMAGE}
                        alt={getHackathonTitle(hackathon)}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = DEFAULT_IMAGE;
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                    <span
                        className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-black ${getStatus(tab)}`}
                    >
                        {tab === "participating"
                            ? "Live Now"
                            : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>

                    <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-black text-white ${isOnline ? "bg-teal-600/90" : "bg-slate-700/90"
                            }`}
                    >
                        {isOnline ? "● Online" : "◆ Offline"}
                    </span>

                    <span className="absolute bottom-3 left-3 rounded-full border border-white/40 bg-white/95 px-3 py-1.5 text-[10px] font-black text-indigo-900">
                        ✦ {hackathon.category || "Technology"}
                    </span>

                    {tab === "saved" && (
                        <button
                            type="button"
                            onClick={() => removeSavedHackathon(id)}
                            aria-label="Remove saved hackathon"
                            title="Remove from saved"
                            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg shadow-lg transition hover:bg-rose-50"
                        >
                            🔖
                        </button>
                    )}
                </div>

                <div className="p-5">
                    <h3 className="truncate text-lg font-black text-slate-900 transition-colors group-hover:text-indigo-900">
                        {getHackathonTitle(hackathon)}
                    </h3>

                    <p className="mt-1 text-[10px] font-bold text-teal-600">
                        {hackathon.organizer ||
                            hackathon.organization ||
                            "Tech Innovators"}
                    </p>

                    <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                        {hackathon.description ||
                            "Join this exciting hackathon and collaborate with talented developers."}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-3">
                            <p className="text-[9px] font-black uppercase tracking-wide text-amber-600">
                                Prize
                            </p>
                            <p className="mt-1 truncate text-xs font-black text-slate-800">
                                {hackathon.prize || "Not specified"}
                            </p>
                        </div>

                        <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-3 py-3">
                            <p className="text-[9px] font-black uppercase tracking-wide text-cyan-700">
                                Date
                            </p>
                            <p className="mt-1 truncate text-xs font-black text-slate-800">
                                {getHackathonDate(hackathon)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-3">
                        <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                                👥
                            </span>
                            <div>
                                <p className="text-[9px] font-black uppercase text-indigo-900">
                                    Participants
                                </p>
                                <p className="text-xs font-black text-slate-800">
                                    {participants}
                                    {maximum > 0 ? ` / ${maximum}` : ""}
                                </p>
                            </div>
                        </div>

                        {maximum > 0 && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-indigo-900 shadow-sm">
                                {Math.round(progress)}%
                            </span>
                        )}
                    </div>

                    {maximum > 0 && (
                        <div className="mt-3">
                            <div className="mb-1.5 flex justify-between text-[9px] font-bold">
                                <span className="text-slate-400">
                                    Registration Progress
                                </span>
                                <span className="text-teal-600">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-teal-500 transition-all duration-700"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-5 flex gap-2">
                        <button
                            type="button"
                            onClick={() => openHackathon(hackathon)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-[11px] font-black text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-900"
                        >
                            👁 View Details
                        </button>

                        {tab === "registered" && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        id
                                            ? `/hackathons/${id}/register`
                                            : "/hackathons"
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-3 text-[11px] font-black text-white transition hover:bg-indigo-800"
                            >
                                🚀 Continue
                            </button>
                        )}

                        {tab === "participating" && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/build-team?hackathon=${encodeURIComponent(id || "")}`
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-3 text-[11px] font-black text-white transition hover:bg-indigo-800"
                            >
                                👥 Team
                            </button>
                        )}

                        {tab === "completed" && (
                            <button
                                type="button"
                                onClick={() => openHackathon(hackathon)}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-3 text-[11px] font-black text-white transition hover:bg-indigo-800"
                            >
                                🏆 Results
                            </button>
                        )}

                        {tab === "saved" && (
                            <button
                                type="button"
                                onClick={() => openHackathon(hackathon)}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-3 text-[11px] font-black text-white transition hover:bg-indigo-800"
                            >
                                🚀 Explore
                            </button>
                        )}
                    </div>
                </div>
            </article>
        );
    };

    const CreatedHackathonCard = ({ hackathon }) => {
        const { participants, maximum, progress, seatsLeft } =
            getProgress(hackathon);

        const isOnline = (hackathon.mode || "").toLowerCase() === "online";

        return (
            <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={hackathon.image || DEFAULT_IMAGE}
                        alt={getHackathonTitle(hackathon)}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = DEFAULT_IMAGE;
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                    <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-black text-white ${isOnline ? "bg-teal-600/90" : "bg-slate-700/90"
                            }`}
                    >
                        {isOnline ? "● Online" : "◆ Offline"}
                    </span>

                    <span className="absolute bottom-3 left-3 rounded-full border border-white/40 bg-white/95 px-3 py-1.5 text-[10px] font-black text-indigo-900">
                        ✦ {hackathon.category || "Technology"}
                    </span>
                </div>

                <div className="p-5">
                    <h3 className="truncate text-lg font-black text-slate-900 transition-colors group-hover:text-indigo-900">
                        {getHackathonTitle(hackathon)}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                        {hackathon.description ||
                            "Bring talented developers together and create something amazing."}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-3">
                            <p className="text-[9px] font-black uppercase text-amber-600">
                                Prize
                            </p>
                            <p className="mt-1 truncate text-xs font-black text-slate-800">
                                {hackathon.prize || "Not specified"}
                            </p>
                        </div>

                        <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-3 py-3">
                            <p className="text-[9px] font-black uppercase text-cyan-700">
                                Deadline
                            </p>
                            <p className="mt-1 truncate text-xs font-black text-slate-800">
                                {getHackathonDate(hackathon)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-3">
                        <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                                👥
                            </span>
                            <div>
                                <p className="text-[9px] font-black uppercase text-indigo-900">
                                    Participants
                                </p>
                                <p className="text-xs font-black text-slate-800">
                                    {participants}
                                    {maximum > 0 ? ` / ${maximum}` : ""}
                                </p>
                            </div>
                        </div>

                        {maximum > 0 && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-indigo-900 shadow-sm">
                                {Math.round(progress)}%
                            </span>
                        )}
                    </div>

                    {maximum > 0 && (
                        <div className="mt-3">
                            <div className="mb-1.5 flex justify-between text-[9px] font-bold">
                                <span className="text-slate-400">
                                    Registration Progress
                                </span>
                                <span
                                    className={
                                        seatsLeft > 0
                                            ? "text-emerald-600"
                                            : "text-red-500"
                                    }
                                >
                                    {seatsLeft > 0
                                        ? `${seatsLeft} seats left`
                                        : "Full"}
                                </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-teal-500 transition-all duration-700"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-5 flex gap-2">
                        <button
                            type="button"
                            onClick={() => openHackathon(hackathon)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-[11px] font-black text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-900"
                        >
                            👁 View
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/create-hackathon")}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-3 text-[11px] font-black text-white transition hover:bg-indigo-800"
                        >
                            ✏️ Edit
                        </button>
                    </div>
                </div>
            </article>
        );
    };

    const journeyCount =
        registeredHackathons.length +
        participatingHackathons.length +
        completedHackathons.length;

    const stats = [
        {
            id: "registered",
            label: "Registered",
            count: registeredHackathons.length,
            icon: "📝",
            style: "border-indigo-100 text-indigo-900 bg-indigo-50",
        },
        {
            id: "participating",
            label: "Participating",
            count: participatingHackathons.length,
            icon: "🚀",
            style: "border-teal-100 text-teal-700 bg-teal-50",
        },
        {
            id: "completed",
            label: "Completed",
            count: completedHackathons.length,
            icon: "🏆",
            style: "border-amber-100 text-amber-700 bg-amber-50",
        },
        {
            id: "saved",
            label: "Saved",
            count: savedHackathons.length,
            icon: "🔖",
            style: "border-rose-100 text-rose-600 bg-rose-50",
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-[#F8FAFC]">
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        onClick={() => navigate("/hackathons")}
                        className="group flex items-center gap-3 text-left"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E1B4B] text-xl shadow-lg transition group-hover:rotate-6 group-hover:scale-105">
                            🚀
                        </span>
                        <span>
                            <span className="block text-lg font-black tracking-tight text-[#1E1B4B]">
                                Connexa
                            </span>
                            <span className="hidden text-[9px] font-bold tracking-[0.2em] text-teal-600 sm:block">
                                HACKATHON PLATFORM
                            </span>
                        </span>
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => navigate("/hackathons")}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900 sm:px-4 sm:text-sm"
                        >
                            <span>←</span>
                            <span>Explore</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/create-hackathon")}
                            className="flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-2 text-xs font-bold text-white shadow-md transition hover:bg-indigo-800 sm:px-4 sm:text-sm"
                        >
                            <span>+</span>
                            <span>Create</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
                <section className="group relative mb-8 overflow-hidden rounded-[2rem] bg-[#1E1B4B] p-6 shadow-xl sm:p-9">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-700/70 blur-3xl transition-transform duration-700 group-hover:scale-125" />
                    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />

                    <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                                My Hackathons
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                                Your Hackathon Journey
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                                Track registrations, active competitions,
                                completed events and saved hackathons from
                                one dashboard.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {[
                                    ["📝", "Register"],
                                    ["🚀", "Participate"],
                                    ["🏆", "Complete"],
                                    ["🔖", "Save"],
                                ].map(([icon, label]) => (
                                    <span
                                        key={label}
                                        className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black text-white"
                                    >
                                        {icon} {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-xl transition hover:bg-white/15">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                                🏆
                            </span>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-200">
                                    My Journey
                                </p>
                                <p className="text-3xl font-black text-white">
                                    {journeyCount}
                                </p>
                                <p className="text-[10px] text-indigo-200">
                                    Activities
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <button
                            key={stat.id}
                            type="button"
                            onClick={() => {
                                setActiveTab(stat.id);
                                setSearchTerm("");
                            }}
                            className={`group flex items-center justify-between rounded-2xl border bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${stat.style}`}
                        >
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-wider">
                                    {stat.label}
                                </p>
                                <p className="mt-1 text-2xl font-black text-slate-900">
                                    {stat.count}
                                </p>
                            </div>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm transition group-hover:rotate-6 group-hover:scale-110">
                                {stat.icon}
                            </span>
                        </button>
                    ))}
                </section>

                <section className="mb-14">
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-1.5 rounded-full bg-teal-500" />
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                                    My Hackathon Activity
                                </h2>
                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    Manage your registrations, participation
                                    and saved events
                                </p>
                            </div>
                        </div>

                        <div className="relative w-full lg:max-w-xs">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                🔍
                            </span>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder="Search my hackathons..."
                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-xs font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>
                    </div>

                    <div className="mb-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
                        <div className="flex min-w-max gap-1">
                            {personalTabs.map((tab) => {
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setSearchTerm("");
                                        }}
                                        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-black transition sm:px-5 ${isActive
                                            ? "bg-[#1E1B4B] text-white shadow-md"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-indigo-900"
                                            }`}
                                    >
                                        <span className="text-base">
                                            {tab.icon}
                                        </span>
                                        {tab.label}
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[9px] ${isActive
                                                ? "bg-white/15 text-white"
                                                : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {tab.data.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-black text-slate-900">
                                {activeTabData.icon} {activeTabData.label}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                {activeTabData.description}
                            </p>
                        </div>

                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-wide text-slate-500 shadow-sm">
                            {filteredPersonalHackathons.length} Events
                        </span>
                    </div>

                    {filteredPersonalHackathons.length === 0 ? (
                        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
                            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-teal-100/60 blur-3xl" />

                            <div className="relative">
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-indigo-50 text-5xl shadow-inner">
                                    {activeTabData.icon}
                                </div>

                                <h3 className="mt-7 text-2xl font-black text-slate-900 sm:text-3xl">
                                    {searchTerm
                                        ? "No Matching Hackathons"
                                        : `No ${activeTabData.label} Hackathons`}
                                </h3>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                    {searchTerm
                                        ? "Try another search term to find your hackathon."
                                        : activeTab === "registered"
                                            ? "You haven't registered for any hackathons yet. Discover events and start your journey!"
                                            : activeTab === "participating"
                                                ? "Your active hackathons will appear here when you start participating."
                                                : activeTab === "completed"
                                                    ? "Your completed hackathons will appear here after you finish participating."
                                                    : "Save interesting hackathons to quickly find them later."}
                                </p>

                                {(activeTab === "registered" ||
                                    activeTab === "saved") && (
                                        <button
                                            type="button"
                                            onClick={() => navigate("/hackathons")}
                                            className="mt-7 rounded-2xl bg-[#1E1B4B] px-7 py-3.5 text-sm font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-indigo-800"
                                        >
                                            🚀 Explore Hackathons
                                        </button>
                                    )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredPersonalHackathons.map(
                                (hackathon, index) => (
                                    <PersonalHackathonCard
                                        key={
                                            getHackathonId(hackathon) ??
                                            `${activeTab}-${index}`
                                        }
                                        hackathon={hackathon}
                                        tab={activeTab}
                                    />
                                )
                            )}
                        </div>
                    )}
                </section>

                <section>
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-1.5 rounded-full bg-teal-500" />
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                                    Your Created Hackathons
                                </h2>
                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    Manage and monitor your created events
                                </p>
                            </div>
                        </div>

                        {myHackathons.length > 0 && (
                            <span className="flex items-center gap-2 self-start rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-teal-700 sm:self-auto">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
                                {myHackathons.length} Created Events
                            </span>
                        )}
                    </div>

                    {myHackathons.length === 0 ? (
                        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-indigo-50 text-5xl shadow-inner">
                                🚀
                            </div>

                            <h3 className="mt-7 text-2xl font-black text-slate-900 sm:text-3xl">
                                No Hackathons Created Yet
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                Start your first event and bring talented
                                developers together.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/create-hackathon")}
                                className="mt-7 rounded-2xl bg-[#1E1B4B] px-7 py-3.5 text-sm font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-indigo-800"
                            >
                                🚀 Create Your First Hackathon
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {myHackathons.map((hackathon, index) => (
                                <CreatedHackathonCard
                                    key={
                                        getHackathonId(hackathon) ??
                                        `created-${index}`
                                    }
                                    hackathon={hackathon}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className="relative mt-16 overflow-hidden bg-[#1E1B4B] px-6 py-10 text-center text-white">
                <div className="pointer-events-none absolute -left-10 -top-20 h-48 w-48 rounded-full bg-indigo-800/70 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="flex items-center justify-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
                            🚀
                        </span>
                        <span className="text-xl font-black">Connexa</span>
                    </div>

                    <p className="mt-3 text-xs font-bold tracking-wide text-indigo-200">
                        Connect • Create • Collaborate • Compete
                    </p>

                    <p className="mt-3 text-[10px] text-slate-400">
                        Build amazing hackathons and connect talented people.
                    </p>

                    <div className="mx-auto mt-5 h-px max-w-xs bg-white/10" />

                    <p className="mt-4 text-[9px] font-medium text-slate-400">
                        © 2026 Connexa • Hackathon Platform
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MyHackathons;