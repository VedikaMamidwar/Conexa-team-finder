import { useEffect, useMemo, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import TeammateCard from "../../components/findTeammates/TeammateCard";
import TeammateFilters from "../../components/findTeammates/TeammateFilters";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "token";

export default function FindTeammates() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [search, setSearch] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All");

    const [teammates, setTeammates] = useState([]);
    const [recommendedTeammates, setRecommendedTeammates] =
        useState([]);

    const [savedTeammates, setSavedTeammates] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getToken = () => {
        return localStorage.getItem(TOKEN_KEY);
    };

    // --------------------------------------------------
    // Format teammate data from backend
    // --------------------------------------------------

    const formatTeammate = (person) => {
        const name = person?.name || "Unknown User";

        const initials = name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();

        const skills = Array.isArray(person?.skills)
            ? person.skills.filter(Boolean)
            : [];

        const interests = Array.isArray(person?.interests)
            ? person.interests.filter(Boolean)
            : [];

        return {
            id: person?._id || person?.id,

            name,

            initials: initials || "?",

            role:
                person?.role ||
                person?.experienceLevel ||
                "Student Developer",

            college:
                person?.college ||
                "College not provided",

            branch:
                person?.branch ||
                "Branch not provided",

            year:
                person?.year ||
                "Year not provided",

            location:
                person?.location || "",

            match:
                typeof person?.match === "number"
                    ? person.match
                    : 0,

            skills,

            interests,

            projects:
                typeof person?.projects === "number"
                    ? person.projects
                    : 0,

            hackathons:
                typeof person?.hackathons === "number"
                    ? person.hackathons
                    : 0,

            availability:
                person?.availability || "Available",

            experienceLevel:
                person?.experienceLevel || "Beginner",

            github:
                person?.github || "",

            portfolio:
                person?.portfolio || "",

            matchingSkills:
                Array.isArray(person?.matchingSkills)
                    ? person.matchingSkills
                    : [],
        };
    };

    // --------------------------------------------------
    // Fetch all teammates
    // --------------------------------------------------

    const fetchTeammates = async () => {
        const token = getToken();

        if (!token) {
            throw new Error(
                "You are not logged in. Please login again."
            );
        }

        const response = await fetch(
            `${API_URL}/teammates`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data =
            await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(
                data?.message ||
                    "Failed to fetch teammates"
            );
        }

        const users = Array.isArray(
            data?.teammates
        )
            ? data.teammates
            : Array.isArray(data?.data)
              ? data.data
              : [];

        const formattedUsers = users
            .map(formatTeammate)
            .filter((user) => user.id);

        setTeammates(formattedUsers);
    };

    // --------------------------------------------------
    // Fetch recommended teammates
    // --------------------------------------------------

    const fetchRecommendedTeammates = async () => {
        const token = getToken();

        if (!token) return;

        try {
            const response = await fetch(
                `${API_URL}/teammates/recommended`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data =
                await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Failed to fetch recommendations"
                );
            }

            const users = Array.isArray(
                data?.teammates
            )
                ? data.teammates
                : Array.isArray(data?.data)
                  ? data.data
                  : [];

            const formattedUsers = users
                .map(formatTeammate)
                .filter((user) => user.id);

            setRecommendedTeammates(
                formattedUsers
            );
        } catch (err) {
            console.error(
                "Fetch recommended teammates error:",
                err
            );

            setRecommendedTeammates([]);
        }
    };

    // --------------------------------------------------
    // Fetch current user's saved teammates
    // --------------------------------------------------

    const fetchCurrentUser = async () => {
        const token = getToken();

        if (!token) return;

        try {
            const response = await fetch(
                `${API_URL}/auth/profile`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data =
                await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Failed to fetch profile"
                );
            }

            const savedIds = Array.isArray(
                data?.savedTeammates
            )
                ? data.savedTeammates
                : Array.isArray(
                        data?.data?.savedTeammates
                    )
                  ? data.data.savedTeammates
                  : [];

            setSavedTeammates(
                savedIds.map((id) => String(id))
            );
        } catch (err) {
            console.error(
                "Fetch current user error:",
                err
            );
        }
    };

    // --------------------------------------------------
    // Initial page load
    // --------------------------------------------------

    useEffect(() => {
        let isMounted = true;

        const loadPage = async () => {
            setLoading(true);
            setError("");

            try {
                await Promise.all([
                    fetchTeammates(),
                    fetchRecommendedTeammates(),
                    fetchCurrentUser(),
                ]);
            } catch (err) {
                console.error(
                    "Find teammates error:",
                    err
                );

                if (isMounted) {
                    setError(
                        err?.message ||
                            "Unable to load teammates."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadPage();

        return () => {
            isMounted = false;
        };
    }, []);

    // --------------------------------------------------
    // Search + filter
    // --------------------------------------------------

    const filteredTeammates = useMemo(() => {
        const query = search
            .trim()
            .toLowerCase();

        return teammates.filter((person) => {
            const searchableText = [
                person.name,
                person.role,
                person.college,
                person.branch,
                person.year,
                person.location,
                person.experienceLevel,
                person.availability,
                ...person.skills,
                ...person.interests,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const searchMatch =
                query.length === 0 ||
                searchableText.includes(query);

            const skillMatch =
                selectedSkill === "All" ||
                person.skills.some(
                    (skill) =>
                        String(skill).toLowerCase() ===
                        selectedSkill.toLowerCase()
                );

            return searchMatch && skillMatch;
        });
    }, [
        teammates,
        search,
        selectedSkill,
    ]);

    // --------------------------------------------------
    // Filter recommended teammates
    // --------------------------------------------------

    const filteredRecommendedTeammates =
        useMemo(() => {
            const query = search
                .trim()
                .toLowerCase();

            return recommendedTeammates.filter(
                (person) => {
                    const searchableText = [
                        person.name,
                        person.role,
                        person.college,
                        person.branch,
                        person.year,
                        person.location,
                        person.experienceLevel,
                        person.availability,
                        ...person.skills,
                        ...person.interests,
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();

                    const searchMatch =
                        query.length === 0 ||
                        searchableText.includes(query);

                    const skillMatch =
                        selectedSkill === "All" ||
                        person.skills.some(
                            (skill) =>
                                String(
                                    skill
                                ).toLowerCase() ===
                                selectedSkill.toLowerCase()
                        );

                    return (
                        searchMatch &&
                        skillMatch
                    );
                }
            );
        }, [
            recommendedTeammates,
            search,
            selectedSkill,
        ]);

    // --------------------------------------------------
    // Save / unsave teammate
    // --------------------------------------------------

    const handleConnect = async (id) => {
        const token = getToken();

        if (!token) {
            setError(
                "Your session has expired. Please login again."
            );
            return;
        }

        if (!id) {
            setError("Invalid teammate ID.");
            return;
        }

        const teammateId = String(id);

        const isSaved =
            savedTeammates.includes(
                teammateId
            );

        try {
            setError("");

            const response = await fetch(
                `${API_URL}/teammates/${teammateId}/save`,
                {
                    method: isSaved
                        ? "DELETE"
                        : "POST",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data =
                await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Unable to update saved teammate"
                );
            }

            setSavedTeammates((current) => {
                if (isSaved) {
                    return current.filter(
                        (savedId) =>
                            savedId !==
                            teammateId
                    );
                }

                if (
                    current.includes(
                        teammateId
                    )
                ) {
                    return current;
                }

                return [
                    ...current,
                    teammateId,
                ];
            });
        } catch (err) {
            console.error(
                "Save teammate error:",
                err
            );

            setError(
                err?.message ||
                    "Unable to save teammate."
            );
        }
    };

    // --------------------------------------------------
    // Clear filters
    // --------------------------------------------------

    const clearFilters = () => {
        setSearch("");
        setSelectedSkill("All");
    };

    // --------------------------------------------------
    // Loading state
    // --------------------------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    stablePosition
                />

                <div
                    className={`min-h-screen transition-all duration-300 ${
                        sidebarOpen
                            ? "ml-64"
                            : "ml-20"
                    }`}
                >
                    <div className="sticky top-0 z-40">
                        <Topbar
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={
                                setSidebarOpen
                            }
                        />
                    </div>

                    <main className="min-w-0 overflow-x-hidden">
                        <section className="border-b border-slate-200 bg-white">
                            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                                <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />

                                <div className="mt-5 h-12 w-full max-w-2xl animate-pulse rounded-xl bg-slate-200 sm:h-14" />

                                <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-slate-100" />

                                <div className="mt-7 flex gap-3">
                                    <div className="h-16 w-28 animate-pulse rounded-2xl bg-slate-100" />
                                    <div className="h-16 w-28 animate-pulse rounded-2xl bg-slate-100" />
                                    <div className="h-16 w-28 animate-pulse rounded-2xl bg-slate-100" />
                                </div>
                            </div>
                        </section>

                        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
                            <div className="h-24 animate-pulse rounded-3xl bg-white shadow-sm" />

                            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {[1, 2, 3].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className="h-80 animate-pulse rounded-3xl bg-white shadow-sm"
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* SIDEBAR */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                stablePosition
            />

            {/* PAGE CONTENT */}
            <div
                className={`min-h-screen transition-all duration-300 ${
                    sidebarOpen
                        ? "ml-64"
                        : "ml-20"
                }`}
            >
                {/* TOPBAR */}
                <div className="sticky top-0 z-40">
                    <Topbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={
                            setSidebarOpen
                        }
                    />
                </div>

                <main className="min-w-0 overflow-x-hidden">
                    {/* HERO */}
                    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl sm:h-80 sm:w-80" />

                            <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-violet-100/50 blur-3xl sm:h-72 sm:w-72" />

                            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-50/70 blur-3xl" />
                        </div>

                        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
                            <div className="max-w-3xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                                    Conexa Match
                                </div>

                                <h1 className="max-w-3xl text-3xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                                    Meet your{" "}
                                    <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                                        perfect teammates.
                                    </span>
                                </h1>

                                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7 lg:text-lg">
                                    Find students who
                                    share your ambition,
                                    complement your skills,
                                    and are ready to build
                                    something amazing
                                    together.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                    <StatCard
                                        value={`${teammates.length}`}
                                        label="Students"
                                    />

                                    <StatCard
                                        value={`${recommendedTeammates.length}`}
                                        label="Recommended"
                                    />

                                    <StatCard
                                        value="AI"
                                        label="Smart matching"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* MAIN CONTENT */}
                    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
                        {/* ERROR */}
                        {error && (
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                <span>{error}</span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setError("")
                                    }
                                    className="rounded-lg px-2 py-1 font-bold underline transition hover:bg-red-100"
                                >
                                    Dismiss
                                </button>
                            </div>
                        )}

                        {/* SEARCH + FILTERS */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-3.5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] sm:p-4 md:p-5">
                            <div className="relative">
                                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 sm:left-5">
                                    <svg
                                        className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="11"
                                            cy="11"
                                            r="7"
                                        />
                                        <path d="m20 20-4-4" />
                                    </svg>
                                </div>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search by name, skill, college or technology..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-20 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 sm:py-4 sm:pl-12 sm:pr-24"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSearch("")
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:right-4 sm:px-3"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            <div className="mt-4">
                                <TeammateFilters
                                    selectedSkill={
                                        selectedSkill
                                    }
                                    setSelectedSkill={
                                        setSelectedSkill
                                    }
                                />
                            </div>
                        </section>

                        {/* RECOMMENDED */}
                        {filteredRecommendedTeammates.length >
                            0 && (
                            <section className="mt-8">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                                        Recommended for you
                                    </h2>

                                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                                        AI MATCH
                                    </span>
                                </div>

                                <p className="mt-1.5 text-sm text-slate-500">
                                    Teammates matched based
                                    on your skills, college
                                    and branch.
                                </p>

                                <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 md:grid-cols-2 xl:grid-cols-3">
                                    {filteredRecommendedTeammates
                                        .slice(0, 3)
                                        .map(
                                            (
                                                person
                                            ) => (
                                                <TeammateCard
                                                    key={
                                                        person.id
                                                    }
                                                    teammate={
                                                        person
                                                    }
                                                    connected={savedTeammates.includes(
                                                        String(
                                                            person.id
                                                        )
                                                    )}
                                                    onConnect={() =>
                                                        handleConnect(
                                                            person.id
                                                        )
                                                    }
                                                />
                                            )
                                        )}
                                </div>
                            </section>
                        )}

                        {/* ALL TEAMMATES */}
                        <section className="mt-9">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                                    Find teammates
                                </h2>

                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                                    {
                                        filteredTeammates.length
                                    }
                                </span>
                            </div>

                            <p className="mt-1.5 text-sm text-slate-500">
                                {filteredTeammates.length}{" "}
                                {filteredTeammates.length ===
                                1
                                    ? "teammate matches"
                                    : "teammates match"}{" "}
                                your current search.
                            </p>
                        </section>

                        {/* CARDS */}
                        {filteredTeammates.length >
                        0 ? (
                            <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 md:grid-cols-2 xl:grid-cols-3">
                                {filteredTeammates.map(
                                    (person) => (
                                        <TeammateCard
                                            key={
                                                person.id
                                            }
                                            teammate={
                                                person
                                            }
                                            connected={savedTeammates.includes(
                                                String(
                                                    person.id
                                                )
                                            )}
                                            onConnect={() =>
                                                handleConnect(
                                                    person.id
                                                )
                                            }
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="mt-6 rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                                    <svg
                                        className="h-6 w-6 text-slate-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="11"
                                            cy="11"
                                            r="7"
                                        />
                                        <path d="m20 20-4-4" />
                                    </svg>
                                </div>

                                <h3 className="mt-4 text-lg font-black text-slate-900">
                                    No teammates found
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    Try changing your
                                    search or selected
                                    skill to discover more
                                    students.
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        clearFilters
                                    }
                                    className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

// --------------------------------------------------
// Stat Card
// --------------------------------------------------

function StatCard({ value, label }) {
    return (
        <div className="min-w-[100px] rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm sm:min-w-[112px] sm:px-5 sm:py-3">
            <p className="text-base font-black text-slate-900 sm:text-lg">
                {value}
            </p>

            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
                {label}
            </p>
        </div>
    );
}