import { useMemo, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import TeammateCard from "../../components/findTeammates/TeammateCard";
import TeammateFilters from "../../components/findTeammates/TeammateFilters";

const teammates = [
    {
        id: 1,
        name: "Rahul Sharma",
        initials: "RS",
        role: "Full Stack Developer",
        college: "VJTI Mumbai",
        branch: "Computer Engineering",
        year: "3rd Year",
        location: "Mumbai",
        match: 98,
        skills: ["React", "Node.js", "MongoDB"],
        interests: ["Hackathons", "AI", "Startups"],
        projects: 12,
        hackathons: 7,
        availability: "Looking for teammates",
    },
    {
        id: 2,
        name: "Priya Patel",
        initials: "PP",
        role: "UI/UX Designer",
        college: "VNIT Nagpur",
        branch: "Information Technology",
        year: "3rd Year",
        location: "Nagpur",
        match: 96,
        skills: ["Figma", "UI/UX", "Canva"],
        interests: ["Design", "Product", "Startups"],
        projects: 18,
        hackathons: 5,
        availability: "Available",
    },
    {
        id: 3,
        name: "Aarav Kulkarni",
        initials: "AK",
        role: "AI / ML Developer",
        college: "COEP Pune",
        branch: "Artificial Intelligence",
        year: "4th Year",
        location: "Pune",
        match: 94,
        skills: ["Python", "Machine Learning", "TensorFlow"],
        interests: ["AI", "Research", "Hackathons"],
        projects: 15,
        hackathons: 9,
        availability: "Looking for teammates",
    },
    {
        id: 4,
        name: "Ananya Mehta",
        initials: "AM",
        role: "Frontend Developer",
        college: "MIT-WPU",
        branch: "Computer Science",
        year: "2nd Year",
        location: "Pune",
        match: 92,
        skills: ["React", "JavaScript", "Tailwind"],
        interests: ["Web Development", "Startups"],
        projects: 9,
        hackathons: 4,
        availability: "Available",
    },
    {
        id: 5,
        name: "Rohan Verma",
        initials: "RV",
        role: "Backend Developer",
        college: "VIT Pune",
        branch: "Computer Engineering",
        year: "3rd Year",
        location: "Pune",
        match: 90,
        skills: ["Java", "Spring Boot", "MySQL"],
        interests: ["Backend", "Cloud", "Open Source"],
        projects: 14,
        hackathons: 6,
        availability: "Available",
    },
    {
        id: 6,
        name: "Sneha Joshi",
        initials: "SJ",
        role: "Mobile Developer",
        college: "PCCOE Pune",
        branch: "Information Technology",
        year: "3rd Year",
        location: "Pune",
        match: 88,
        skills: ["Flutter", "Dart", "Firebase"],
        interests: ["Mobile Apps", "Startups"],
        projects: 11,
        hackathons: 3,
        availability: "Looking for teammates",
    },
];

export default function FindTeammates() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [connected, setConnected] = useState([]);

    const filteredTeammates = useMemo(() => {
        const query = search.trim().toLowerCase();

        return teammates.filter((person) => {
            const searchableText = [
                person.name,
                person.role,
                person.college,
                person.branch,
                person.year,
                person.location,
                ...person.skills,
                ...person.interests,
            ]
                .join(" ")
                .toLowerCase();

            const searchMatch =
                query.length === 0 || searchableText.includes(query);

            const skillMatch =
                selectedSkill === "All" ||
                person.skills.some(
                    (skill) =>
                        skill.toLowerCase() === selectedSkill.toLowerCase()
                );

            return searchMatch && skillMatch;
        });
    }, [search, selectedSkill]);

    const handleConnect = (id) => {
        setConnected((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    return (
        <div className="min-h-screen bg-[#f6f7fb]">

            <div className="flex min-h-screen">

                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="flex min-w-0 flex-1 flex-col">

                    <Topbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="flex-1">

                        {/* HERO */}
                        <section className="relative overflow-hidden border-b border-slate-200 bg-white">

                            {/* Decorative background */}
                            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />

                                <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />

                                <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-50/70 blur-3xl" />

                            </div>

                            <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">

                                <div className="max-w-3xl">

                                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-700">

                                        <span className="h-2 w-2 rounded-full bg-indigo-500" />

                                        Connexa Match

                                    </div>

                                    <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl lg:text-6xl">

                                        Meet your{" "}

                                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                                            perfect teammates.
                                        </span>

                                    </h1>

                                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">

                                        Find students who share your ambition,
                                        complement your skills, and are ready
                                        to build something amazing together.

                                    </p>

                                    {/* Stats */}
                                    <div className="mt-8 flex flex-wrap gap-3">

                                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                                            <p className="text-lg font-black text-slate-900">
                                                2.4K+
                                            </p>

                                            <p className="text-xs font-medium text-slate-500">
                                                Students
                                            </p>

                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                                            <p className="text-lg font-black text-slate-900">
                                                850+
                                            </p>

                                            <p className="text-xs font-medium text-slate-500">
                                                Teams formed
                                            </p>

                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                                            <p className="text-lg font-black text-slate-900">
                                                94%
                                            </p>

                                            <p className="text-xs font-medium text-slate-500">
                                                Match satisfaction
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* MAIN CONTENT */}
                        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

                            {/* SEARCH PANEL */}
                            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-5">

                                <div className="relative">

                                    <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2">

                                        <svg
                                            className="h-5 w-5 text-slate-400"
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
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search by name, skill, college or technology..."
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-13 pr-24 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />

                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        >
                                            Clear
                                        </button>
                                    )}

                                </div>

                                <TeammateFilters
                                    selectedSkill={selectedSkill}
                                    setSelectedSkill={setSelectedSkill}
                                />

                            </section>

                            {/* RESULTS HEADER */}
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h2 className="text-2xl font-black tracking-tight text-slate-950">
                                            Recommended for you
                                        </h2>

                                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                                            AI
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Based on your skills, interests and
                                        profile.
                                    </p>

                                </div>

                                <p className="text-sm font-semibold text-slate-400">
                                    {filteredTeammates.length} matches
                                </p>

                            </div>

                            {/* CARDS */}
                            {filteredTeammates.length > 0 ? (

                                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                                    {filteredTeammates.map((person) => (
                                        <TeammateCard
                                            key={person.id}
                                            teammate={person}
                                            connected={connected.includes(
                                                person.id
                                            )}
                                            onConnect={() =>
                                                handleConnect(person.id)
                                            }
                                        />
                                    ))}

                                </div>

                            ) : (

                                <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                                        🔎
                                    </div>

                                    <h3 className="mt-5 text-xl font-black text-slate-900">
                                        No teammates found
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                        Try another name, technology or skill.
                                    </p>

                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setSelectedSkill("All");
                                        }}
                                        className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                                    >
                                        Reset search
                                    </button>

                                </div>

                            )}

                        </div>

                    </main>

                </div>

            </div>

        </div>
    );
}