
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyHackathons } from "../../services/hackathonService";

const MyHackathons = () => {
    const navigate = useNavigate();

    const organizerName = "Tech Innovators";

    const [activeTab, setActiveTab] = useState("registered");
    const [searchTerm, setSearchTerm] = useState("");

    /* ============================================================
       CREATED HACKATHONS
    ============================================================ */

    const getStoredArray = (key) => {
        try {
            const data = JSON.parse(
                localStorage.getItem(key) || "[]"
            );

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error(`Error loading ${key}:`, error);
            return [];
        }
    };

    const getCreatedHackathons = () => {
        try {
            const storedHackathons = JSON.parse(
                localStorage.getItem("myHackathons") || "[]"
            );

            if (Array.isArray(storedHackathons)) {
                return storedHackathons;
            }
        } catch (error) {
            console.error("Error loading saved hackathons:", error);
        }

        return getMyHackathons(organizerName) || [];
    };

    const [myHackathons, setMyHackathons] = useState(
        getCreatedHackathons
    );

    /* ============================================================
       PERSONAL HACKATHONS
    ============================================================ */

    const [registeredHackathons, setRegisteredHackathons] =
        useState(() =>
            getStoredArray("registeredHackathons")
        );

    const [participatingHackathons] = useState(() =>
        getStoredArray("participatingHackathons")
    );

    const [completedHackathons] = useState(() =>
        getStoredArray("completedHackathons")
    );

    const [savedHackathons, setSavedHackathons] = useState(() =>
        getStoredArray("savedHackathons")
    );

    /* ============================================================
       REFRESH ALL DATA
    ============================================================ */

    const refreshData = () => {
        setRegisteredHackathons(
            getStoredArray("registeredHackathons")
        );

        setSavedHackathons(
            getStoredArray("savedHackathons")
        );

        setMyHackathons(
            getCreatedHackathons()
        );
    };

    /* ============================================================
       LOAD DATA WHEN PAGE OPENS / USER RETURNS
    ============================================================ */

    useEffect(() => {
        refreshData();

        const handleStorageChange = (event) => {
            if (
                event.key === "registeredHackathons" ||
                event.key === "savedHackathons" ||
                event.key === "myHackathons" ||
                event.key === null
            ) {
                refreshData();
            }
        };

        const handleFocus = () => {
            refreshData();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                refreshData();
            }
        };

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        window.addEventListener(
            "focus",
            handleFocus
        );

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {
            window.removeEventListener(
                "storage",
                handleStorageChange
            );

            window.removeEventListener(
                "focus",
                handleFocus
            );

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    /* ============================================================
       STATISTICS
    ============================================================ */

    const totalParticipants = myHackathons.reduce(
        (total, hackathon) =>
            total + Number(hackathon.participants || 0),
        0
    );

    const onlineCount = myHackathons.filter(
        (hackathon) =>
            hackathon.mode?.toLowerCase() === "online"
    ).length;

    const offlineCount = myHackathons.filter(
        (hackathon) =>
            hackathon.mode?.toLowerCase() === "offline"
    ).length;

    /* ============================================================
       PERSONAL TAB DATA
    ============================================================ */

    const personalTabs = [
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
            description: "Hackathons currently active",
            data: participatingHackathons,
            color: "teal",
        },
        {
            id: "completed",
            label: "Completed",
            icon: "🏆",
            description: "Hackathons you completed",
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
    ];

    const activeTabData =
        personalTabs.find(
            (tab) => tab.id === activeTab
        ) || personalTabs[0];

    /* ============================================================
       SEARCH
    ============================================================ */

    const filteredPersonalHackathons = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) {
            return activeTabData.data;
        }

        return activeTabData.data.filter((hackathon) => {
            const title = String(
                hackathon.title ||
                hackathon.name ||
                ""
            ).toLowerCase();

            const category = String(
                hackathon.category || ""
            ).toLowerCase();

            const organization = String(
                hackathon.organizer ||
                hackathon.organization ||
                ""
            ).toLowerCase();

            return (
                title.includes(search) ||
                category.includes(search) ||
                organization.includes(search)
            );
        });
    }, [activeTabData, searchTerm]);

    /* ============================================================
       REMOVE SAVED HACKATHON
    ============================================================ */

    const removeSavedHackathon = (id) => {
        const updated = savedHackathons.filter(
            (hackathon) => hackathon.id !== id
        );

        setSavedHackathons(updated);

        localStorage.setItem(
            "savedHackathons",
            JSON.stringify(updated)
        );
    };

    /* ============================================================
       HELPER FUNCTIONS
    ============================================================ */

    const getStatus = (hackathon, tab) => {
        if (tab === "completed") {
            return {
                text: "Completed",
                className:
                    "bg-slate-100 text-slate-600",
            };
        }

        if (tab === "participating") {
            return {
                text: "Live Now",
                className:
                    "bg-emerald-100 text-emerald-700",
            };
        }

        if (tab === "saved") {
            return {
                text: "Saved",
                className:
                    "bg-rose-100 text-rose-600",
            };
        }

        return {
            text: "Registered",
            className:
                "bg-indigo-100 text-[#312E81]",
        };
    };

    /* ============================================================
       PERSONAL HACKATHON CARD
    ============================================================ */

    const PersonalHackathonCard = ({
        hackathon,
        tab,
    }) => {
        const status = getStatus(hackathon, tab);

        const participants = Number(
            hackathon.participants || 0
        );

        const maxParticipants = Number(
            hackathon.maxParticipants || 0
        );

        const progress =
            maxParticipants > 0
                ? Math.min(
                    Math.max(
                        (participants /
                            maxParticipants) *
                        100,
                        0
                    ),
                    100
                )
                : 0;

        const isOnline =
            hackathon.mode?.toLowerCase() ===
            "online";

        return (
            <article className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/70">

                {/* IMAGE */}

                <div className="relative h-48 overflow-hidden">
                    <img
                        src={
                            hackathon.image ||
                            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
                        }
                        alt={
                            hackathon.title ||
                            hackathon.name ||
                            "Hackathon"
                        }
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* STATUS */}

                    <span
                        className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-black shadow-lg backdrop-blur-md ${status.className}`}
                    >
                        {status.text}
                    </span>

                    {/* MODE */}

                    <span
                        className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black text-white shadow-xl backdrop-blur-md ${
                            isOnline
                                ? "bg-[#14B8A6]/90"
                                : "bg-slate-700/90"
                        }`}
                    >
                        <span>
                            {isOnline ? "●" : "◆"}
                        </span>

                        {isOnline
                            ? "Online"
                            : "Offline"}
                    </span>

                    {/* CATEGORY */}

                    <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-black text-[#312E81] shadow-xl">
                        ✦{" "}
                        {hackathon.category ||
                            "Technology"}
                    </span>

                    {/* SAVED */}

                    {tab === "saved" && (
                        <button
                            type="button"
                            onClick={() =>
                                removeSavedHackathon(
                                    hackathon.id
                                )
                            }
                            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-sm shadow-lg transition-all duration-300 hover:scale-110 hover:bg-rose-50"
                            title="Remove from saved"
                        >
                            🔖
                        </button>
                    )}
                </div>

                {/* CONTENT */}

                <div className="p-5">

                    <h3 className="line-clamp-1 text-lg font-black text-slate-900 transition-colors duration-300 group-hover:text-[#312E81]">
                        {hackathon.title ||
                            hackathon.name ||
                            "Hackathon"}
                    </h3>

                    <p className="mt-1 text-[10px] font-bold text-[#14B8A6]">
                        {hackathon.organizer ||
                            hackathon.organization ||
                            "Tech Innovators"}
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                        {hackathon.description ||
                            "Join this exciting hackathon and collaborate with talented developers."}
                    </p>

                    {/* INFO BOXES */}

                    <div className="mt-5 grid grid-cols-2 gap-2">

                        <div className="rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2.5">
                            <p className="text-[8px] font-black uppercase tracking-wide text-amber-600">
                                Prize
                            </p>

                            <p className="mt-1 truncate text-[10px] font-black text-slate-800">
                                {hackathon.prize ||
                                    "₹50,000"}
                            </p>
                        </div>

                        <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-3 py-2.5">
                            <p className="text-[8px] font-black uppercase tracking-wide text-cyan-600">
                                Date
                            </p>

                            <p className="mt-1 truncate text-[10px] font-black text-slate-800">
                                {hackathon.deadline ||
                                    hackathon.date ||
                                    "Coming Soon"}
                            </p>
                        </div>

                    </div>

                    {/* PARTICIPANTS */}

                    <div className="mt-2 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2.5">

                        <div className="flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                                👥
                            </div>

                            <div>
                                <p className="text-[8px] font-black uppercase tracking-wide text-[#312E81]">
                                    Participants
                                </p>

                                <p className="text-[10px] font-black text-slate-800">
                                    {participants}

                                    {maxParticipants >
                                        0 &&
                                        ` / ${maxParticipants}`}
                                </p>
                            </div>

                        </div>

                        {maxParticipants > 0 && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-black text-[#312E81] shadow-sm">
                                {Math.round(progress)}
                                %
                            </span>
                        )}

                    </div>

                    {/* PROGRESS */}

                    {maxParticipants > 0 && (
                        <div className="mt-3">

                            <div className="mb-1.5 flex items-center justify-between text-[9px] font-black">

                                <span className="text-slate-400">
                                    Registration Progress
                                </span>

                                <span className="text-[#14B8A6]">
                                    {Math.round(progress)}
                                    %
                                </span>

                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                                <div
                                    className="h-full rounded-full bg-[#14B8A6] transition-all duration-1000"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />

                            </div>

                        </div>
                    )}

                    {/* BUTTONS */}

                    <div className="mt-5 flex gap-2">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/hackathons/${hackathon.id}`
                                )
                            }
                            className="group/view flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] font-black text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-[#312E81] hover:shadow-lg"
                        >
                            <span className="transition-transform duration-300 group-hover/view:scale-125">
                                👁
                            </span>

                            View Details
                        </button>

                        {tab === "registered" && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/hackathons/${hackathon.id}/register`
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-2.5 text-[11px] font-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
                            >
                                🚀 Continue
                            </button>
                        )}

                        {tab === "participating" && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/build-team?hackathon=${hackathon.id}`
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-2.5 text-[11px] font-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
                            >
                                👥 Team
                            </button>
                        )}

                        {tab === "completed" && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/hackathons/${hackathon.id}`
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-2.5 text-[11px] font-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
                            >
                                🏆 Results
                            </button>
                        )}

                        {tab === "saved" && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/hackathons/${hackathon.id}`
                                    )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-2.5 text-[11px] font-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
                            >
                                🚀 Explore
                            </button>
                        )}

                    </div>

                </div>
            </article>
        );
    };

    /* ============================================================
       RENDER
    ============================================================ */

    return (
        <div className="min-h-screen overflow-hidden bg-[#F8FAFC]">

            {/* HEADER */}

            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-2xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

                    <div
                        onClick={() =>
                            navigate("/hackathons")
                        }
                        className="group flex cursor-pointer items-center gap-3"
                    >

                        <div className="relative">

                            <div className="absolute inset-0 rounded-2xl bg-indigo-500 opacity-20 blur-lg transition duration-500 group-hover:opacity-50" />

                            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E1B4B] text-xl shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                                🚀
                            </div>

                        </div>

                        <div>

                            <h1 className="text-lg font-black tracking-tight text-[#1E1B4B]">
                                Connexa
                            </h1>

                            <p className="hidden text-[9px] font-bold tracking-[0.2em] text-[#14B8A6] sm:block">
                                HACKATHON PLATFORM
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/hackathons")
                            }
                            className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50 hover:text-[#312E81] hover:shadow-lg sm:px-4 sm:text-sm"
                        >
                            <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                                ←
                            </span>

                            <span className="hidden sm:inline">
                                Explore
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/create-hackathon"
                                )
                            }
                            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-[#1E1B4B] px-3 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#312E81] hover:shadow-2xl sm:px-4 sm:text-sm"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                            <span className="relative text-base transition-transform duration-300 group-hover:rotate-90">
                                +
                            </span>

                            <span className="relative hidden sm:inline">
                                Create
                            </span>
                        </button>

                    </div>

                </div>

            </header>

            <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">

                {/* HERO */}

                <section className="group relative mb-8 overflow-hidden rounded-[2rem] bg-[#1E1B4B] p-6 shadow-2xl shadow-indigo-100/70 transition-all duration-500 hover:shadow-indigo-200 sm:p-9">

                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#312E81]/70 blur-2xl transition-transform duration-1000 group-hover:scale-125" />

                    <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#14B8A6]/20 blur-2xl transition-transform duration-1000 group-hover:scale-110" />

                    <div className="absolute right-1/4 top-1/2 h-28 w-28 animate-pulse rounded-full bg-white/10 blur-2xl" />

                    <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-inner backdrop-blur-md">

                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#14B8A6]" />

                                My Hackathons

                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                                Your Hackathon Journey
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                                Track your registrations,
                                active competitions,
                                completed events and
                                saved hackathons from one
                                beautiful dashboard.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">

                                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                                    <span>📝</span>
                                    <span className="text-[10px] font-black text-white">
                                        Register
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                                    <span>🚀</span>
                                    <span className="text-[10px] font-black text-white">
                                        Participate
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                                    <span>🏆</span>
                                    <span className="text-[10px] font-black text-white">
                                        Complete
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                                    <span>🔖</span>
                                    <span className="text-[10px] font-black text-white">
                                        Save
                                    </span>
                                </div>

                            </div>

                        </div>

                        <div className="group/stat flex w-fit items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/20">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl transition-all duration-500 group-hover/stat:rotate-12 group-hover/stat:scale-110">
                                🏆
                            </div>

                            <div>

                                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-100">
                                    My Journey
                                </p>

                                <p className="text-3xl font-black text-white">
                                    {registeredHackathons.length +
                                        participatingHackathons.length +
                                        completedHackathons.length}
                                </p>

                                <p className="text-[9px] font-medium text-indigo-200">
                                    Activities
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* PERSONAL STATISTICS */}

                <div className="mb-9 grid grid-cols-2 gap-3 lg:grid-cols-4">

                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab("registered")
                        }
                        className="group flex items-center justify-between rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
                    >
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-wider text-[#312E81]">
                                Registered
                            </p>

                            <p className="mt-1 text-2xl font-black text-slate-900">
                                {registeredHackathons.length}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                            📝
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab("participating")
                        }
                        className="group flex items-center justify-between rounded-2xl border border-teal-100 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
                    >
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-wider text-[#14B8A6]">
                                Participating
                            </p>

                            <p className="mt-1 text-2xl font-black text-slate-900">
                                {participatingHackathons.length}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                            🚀
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab("completed")
                        }
                        className="group flex items-center justify-between rounded-2xl border border-amber-100 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                    >
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-wider text-amber-600">
                                Completed
                            </p>

                            <p className="mt-1 text-2xl font-black text-slate-900">
                                {completedHackathons.length}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                            🏆
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab("saved")
                        }
                        className="group flex items-center justify-between rounded-2xl border border-rose-100 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg"
                    >
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-wider text-rose-500">
                                Saved
                            </p>

                            <p className="mt-1 text-2xl font-black text-slate-900">
                                {savedHackathons.length}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                            🔖
                        </div>
                    </button>

                </div>

                {/* PERSONAL HACKATHONS */}

                <section className="mb-14">

                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                        <div className="flex items-center gap-3">

                            <div className="h-9 w-1.5 rounded-full bg-[#14B8A6]" />

                            <div>

                                <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                                    My Hackathon Activity
                                </h2>

                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    Manage your registrations,
                                    participation and saved events
                                </p>

                            </div>

                        </div>

                        <div className="relative w-full lg:max-w-xs">

                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                                🔍
                            </span>

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                                placeholder="Search my hackathons..."
                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-xs font-semibold text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
                            />

                        </div>

                    </div>

                    {/* TABS */}

                    <div className="mb-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">

                        <div className="flex min-w-max gap-1">

                            {personalTabs.map((tab) => {

                                const isActive =
                                    activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => {
                                            setActiveTab(
                                                tab.id
                                            );
                                            setSearchTerm("");
                                        }}
                                        className={`group relative flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-black transition-all duration-300 sm:px-5 ${
                                            isActive
                                                ? "bg-[#1E1B4B] text-white shadow-lg"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-[#312E81]"
                                        }`}
                                    >

                                        <span
                                            className={`text-base transition-transform duration-300 ${
                                                isActive
                                                    ? "scale-110"
                                                    : "group-hover:scale-110"
                                            }`}
                                        >
                                            {tab.icon}
                                        </span>

                                        <span>
                                            {tab.label}
                                        </span>

                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[9px] font-black ${
                                                isActive
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

                    {/* ACTIVE TAB DESCRIPTION */}

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h3 className="text-lg font-black text-slate-900">
                                {activeTabData.icon}{" "}
                                {activeTabData.label}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                {activeTabData.description}
                            </p>

                        </div>

                        <span className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-wide text-slate-500 shadow-sm sm:block">
                            {filteredPersonalHackathons.length}{" "}
                            Events
                        </span>

                    </div>

                    {/* EMPTY PERSONAL STATE */}

                    {filteredPersonalHackathons.length === 0 ? (

                        <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-20 text-center shadow-xl">

                            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-100/50 blur-2xl transition-transform duration-700 group-hover:scale-125" />

                            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-teal-100/50 blur-2xl transition-transform duration-700 group-hover:scale-125" />

                            <div className="relative">

                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-indigo-50 text-5xl shadow-inner transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                                    {activeTabData.icon}
                                </div>

                                <h2 className="mt-7 text-2xl font-black text-slate-900 sm:text-3xl">
                                    No {activeTabData.label} Hackathons
                                </h2>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">

                                    {activeTab ===
                                        "registered" &&
                                        "You haven't registered for any hackathons yet. Discover exciting events and start your journey!"}

                                    {activeTab ===
                                        "participating" &&
                                        "You are not participating in an active hackathon right now."}

                                    {activeTab ===
                                        "completed" &&
                                        "Your completed hackathons will appear here after you finish participating."}

                                    {activeTab ===
                                        "saved" &&
                                        "Save interesting hackathons to quickly find them later."}

                                </p>

                                {(activeTab ===
                                    "registered" ||
                                    activeTab ===
                                    "saved") && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                "/hackathons"
                                            )
                                        }
                                        className="group/button relative mt-7 overflow-hidden rounded-2xl bg-[#1E1B4B] px-7 py-3.5 text-sm font-black text-white shadow-xl shadow-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#312E81] hover:shadow-2xl"
                                    >
                                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover/button:translate-x-full" />

                                        <span className="relative">
                                            🚀 Explore Hackathons
                                        </span>
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
                                            hackathon.id ||
                                            `${activeTab}-${index}`
                                        }
                                        hackathon={
                                            hackathon
                                        }
                                        tab={
                                            activeTab
                                        }
                                    />
                                )
                            )}

                        </div>

                    )}

                </section>

                {/* CREATED HACKATHONS */}

                <section>

                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div className="flex items-center gap-3">

                            <div className="h-9 w-1.5 rounded-full bg-[#14B8A6]" />

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
                            <div className="flex items-center gap-2 self-start rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-[#14B8A6] sm:self-auto">

                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#14B8A6]" />

                                {myHackathons.length} Created Events

                            </div>
                        )}

                    </div>

                    {/* CREATED EMPTY STATE */}

                    {myHackathons.length === 0 ? (

                        <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-20 text-center shadow-xl">

                            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-100/50 blur-2xl" />

                            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-teal-100/50 blur-2xl" />

                            <div className="relative">

                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-indigo-50 text-5xl shadow-inner">
                                    🚀
                                </div>

                                <h2 className="mt-7 text-3xl font-black text-slate-900">
                                    No Hackathons Created Yet
                                </h2>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                    You haven't created a hackathon yet. Start your first event and bring talented developers together!
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/create-hackathon"
                                        )
                                    }
                                    className="mt-7 rounded-2xl bg-[#1E1B4B] px-7 py-3.5 text-sm font-black text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#312E81] hover:shadow-2xl"
                                >
                                    🚀 Create Your First Hackathon
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {myHackathons.map(
                                (hackathon) => {

                                    const participants =
                                        Number(
                                            hackathon.participants ||
                                            0
                                        );

                                    const maxParticipants =
                                        Number(
                                            hackathon.maxParticipants ||
                                            0
                                        );

                                    const seatsLeft =
                                        maxParticipants -
                                        participants;

                                    const progress =
                                        maxParticipants >
                                            0
                                            ? (participants /
                                                maxParticipants) *
                                            100
                                            : 0;

                                    const safeProgress =
                                        Math.min(
                                            Math.max(
                                                progress,
                                                0
                                            ),
                                            100
                                        );

                                    const isOnline =
                                        hackathon.mode?.toLowerCase() ===
                                        "online";

                                    return (
                                        <article
                                            key={
                                                hackathon.id
                                            }
                                            className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/70"
                                        >

                                            <div className="relative h-48 overflow-hidden">

                                                <img
                                                    src={
                                                        hackathon.image ||
                                                        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
                                                    }
                                                    alt={
                                                        hackathon.title ||
                                                        hackathon.name ||
                                                        "Hackathon"
                                                    }
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                                                <span
                                                    className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black text-white shadow-xl backdrop-blur-md ${
                                                        isOnline
                                                            ? "bg-[#14B8A6]/90"
                                                            : "bg-slate-700/90"
                                                    }`}
                                                >
                                                    <span>
                                                        {isOnline
                                                            ? "●"
                                                            : "◆"}
                                                    </span>

                                                    {isOnline
                                                        ? "Online"
                                                        : "Offline"}
                                                </span>

                                                <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-black text-[#312E81] shadow-xl">
                                                    ✦{" "}
                                                    {hackathon.category ||
                                                        "Technology"}
                                                </span>

                                            </div>

                                            <div className="p-5">

                                                <h3 className="line-clamp-1 text-lg font-black text-slate-900 group-hover:text-[#312E81]">
                                                    {hackathon.title ||
                                                        hackathon.name ||
                                                        "Untitled Hackathon"}
                                                </h3>

                                                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                                                    {hackathon.description ||
                                                        "Join this exciting hackathon and collaborate with talented developers."}
                                                </p>

                                                <div className="mt-5 grid grid-cols-2 gap-2">

                                                    <div className="rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2.5">

                                                        <p className="text-[8px] font-black uppercase tracking-wide text-amber-600">
                                                            Prize
                                                        </p>

                                                        <p className="mt-1 truncate text-[10px] font-black text-slate-800">
                                                            {hackathon.prize ||
                                                                "₹50,000"}
                                                        </p>

                                                    </div>

                                                    <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-3 py-2.5">

                                                        <p className="text-[8px] font-black uppercase tracking-wide text-cyan-600">
                                                            Deadline
                                                        </p>

                                                        <p className="mt-1 truncate text-[10px] font-black text-slate-800">
                                                            {hackathon.deadline ||
                                                                hackathon.date ||
                                                                "Coming Soon"}
                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="mt-2 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2.5">

                                                    <div className="flex items-center gap-2">

                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                                                            👥
                                                        </div>

                                                        <div>

                                                            <p className="text-[8px] font-black uppercase tracking-wide text-[#312E81]">
                                                                Participants
                                                            </p>

                                                            <p className="text-[10px] font-black text-slate-800">
                                                                {
                                                                    participants
                                                                }

                                                                {maxParticipants >
                                                                    0 &&
                                                                    ` / ${maxParticipants}`}
                                                            </p>

                                                        </div>

                                                    </div>

                                                    {maxParticipants >
                                                        0 && (
                                                            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-black text-[#312E81] shadow-sm">
                                                                {Math.round(
                                                                    safeProgress
                                                                )}
                                                                %
                                                            </span>
                                                        )}

                                                </div>

                                                {maxParticipants >
                                                    0 && (
                                                        <div className="mt-3">

                                                            <div className="mb-1.5 flex items-center justify-between text-[9px] font-black">

                                                                <span className="text-slate-400">
                                                                    Registration Progress
                                                                </span>

                                                                <span
                                                                    className={
                                                                        seatsLeft >
                                                                            0
                                                                            ? "text-emerald-600"
                                                                            : "text-red-500"
                                                                    }
                                                                >
                                                                    {seatsLeft >
                                                                        0
                                                                        ? `${seatsLeft} seats left`
                                                                        : "Full"}
                                                                </span>

                                                            </div>

                                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                                                                <div
                                                                    className="h-full rounded-full bg-[#14B8A6] transition-all duration-1000"
                                                                    style={{
                                                                        width: `${safeProgress}%`,
                                                                    }}
                                                                />

                                                            </div>

                                                        </div>
                                                    )}

                                                <div className="mt-4 flex gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/hackathons/${hackathon.id}`
                                                            )
                                                        }
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] font-black text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-[#312E81] hover:shadow-lg"
                                                    >
                                                        👁 View
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                "/create-hackathon"
                                                            )
                                                        }
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-2.5 text-[11px] font-black text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                </div>

                                            </div>

                                        </article>
                                    );
                                }
                            )}

                        </div>

                    )}

                </section>

            </main>

            {/* FOOTER */}

            <footer className="relative mt-16 overflow-hidden bg-[#1E1B4B] px-6 py-10 text-center text-white">

                <div className="absolute -left-10 -top-20 h-48 w-48 rounded-full bg-[#312E81] blur-2xl" />

                <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-[#14B8A6]/10 blur-2xl" />

                <div className="relative mx-auto max-w-7xl">

                    <div className="flex items-center justify-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl shadow-inner">
                            🚀
                        </div>

                        <span className="text-xl font-black">
                            Connexa
                        </span>

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

