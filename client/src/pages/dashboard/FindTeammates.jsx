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
        interests: ["Hackathons", "AI"],
        projects: 12,
        hackathons: 7,
        availability: "Available",
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
        skills: ["UI/UX", "Figma", "Canva"],
        interests: ["Design", "Startups"],
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
        skills: ["Python", "AI", "ML"],
        interests: ["AI", "Research"],
        projects: 15,
        hackathons: 9,
        availability: "Available",
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
        skills: ["React", "JavaScript", "Express"],
        interests: ["Web Development"],
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
        skills: ["Java", "Node.js", "MongoDB"],
        interests: ["Backend", "Cloud"],
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
        skills: ["Flutter", "Python", "Firebase"],
        interests: ["Mobile Apps", "Startups"],
        projects: 11,
        hackathons: 3,
        availability: "Available",
    },
];

export default function FindTeammates() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [connected, setConnected] = useState([]);

    const filteredTeammates = useMemo(() => {
        const query = search.toLowerCase().trim();

        return teammates.filter((person) => {
            const text = [
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

            const matchesSearch =
                query === "" || text.includes(query);

            const matchesSkill =
                selectedSkill === "All" ||
                person.skills.some(
                    (skill) =>
                        skill.toLowerCase() ===
                        selectedSkill.toLowerCase()
                );

            return matchesSearch && matchesSkill;
        });
    }, [search, selectedSkill]);

    const handleConnect = (id) => {
        setConnected((previous) =>
            previous.includes(id)
                ? previous.filter((item) => item !== id)
                : [...previous, id]
        );
    };

    return (
        <div className="flex min-h-screen bg-[#f5f7fb]">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="w-full flex-1">

                    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

                        {/* PAGE HEADER */}
                        <section className="mb-6 rounded-[24px] border border-slate-200 bg-white px-5 py-7 shadow-sm sm:px-8">

                            <div className="max-w-3xl">

                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                                    CONNEXA MATCH
                                </div>

                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    Find Your Teammates
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                    Discover students with complementary
                                    skills and build your perfect hackathon
                                    team.
                                </p>

                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                                <Stat
                                    number="2.4K+"
                                    label="Students"
                                />

                                <Stat
                                    number="850+"
                                    label="Teams formed"
                                />

                                <Stat
                                    number="94%"
                                    label="Match satisfaction"
                                />

                            </div>

                        </section>

                        {/* SEARCH */}
                        <section className="mb-7 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="relative">

                                <svg
                                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
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

                                <input
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search by name, skill, college or technology..."
                                    className="box-border h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-20 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />

                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-700"
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

                        {/* SECTION TITLE */}
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-2xl font-extrabold text-slate-900">
                                        Recommended Teammates
                                    </h2>

                                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600">
                                        AI MATCH
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    Based on skills, interests and profile
                                    compatibility.
                                </p>
                            </div>

                            <span className="text-sm font-semibold text-slate-400">
                                {filteredTeammates.length} matches
                            </span>

                        </div>

                        {/* CARDS */}
                        {filteredTeammates.length > 0 ? (

                            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

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

                            <div className="rounded-[24px] border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                                    🔎
                                </div>

                                <h3 className="mt-4 text-lg font-bold text-slate-900">
                                    No teammates found
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Try another skill, name or technology.
                                </p>

                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setSelectedSkill("All");
                                    }}
                                    className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
                                >
                                    Reset Filters
                                </button>

                            </div>

                        )}

                    </div>

                </main>

            </div>
        </div>
    );
}

function Stat({ number, label }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xl font-extrabold text-slate-900">
                {number}
            </p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
                {label}
            </p>
        </div>
    );
}