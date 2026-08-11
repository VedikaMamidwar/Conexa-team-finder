import { useMemo, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import TeammateCard from "../../components/findTeammates/TeammateCard";
import TeammateFilters from "../../components/findTeammates/TeammateFilters";

const teammates = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Full Stack Developer",
        location: "Delhi",
        college: "IIT Delhi",
        match: 98,
        skills: ["React", "Node.js", "MongoDB"],
        experience: "Intermediate",
        hackathons: 4,
        projects: 18,
        availability: "Available",
    },
    {
        id: 2,
        name: "Priya Patel",
        role: "UI/UX Designer",
        location: "Nagpur",
        college: "VNIT Nagpur",
        match: 97,
        skills: ["Figma", "Canva", "Adobe XD"],
        experience: "Advanced",
        hackathons: 3,
        projects: 22,
        availability: "Available",
    },
    {
        id: 3,
        name: "Aarav Sharma",
        role: "AI Engineer",
        location: "Pune",
        college: "COEP Pune",
        match: 95,
        skills: ["Python", "TensorFlow", "ML"],
        experience: "Advanced",
        hackathons: 6,
        projects: 31,
        availability: "Available",
    },
    {
        id: 4,
        name: "Rohan Verma",
        role: "Backend Developer",
        location: "Mumbai",
        college: "VJTI Mumbai",
        match: 93,
        skills: ["Node.js", "Express", "MongoDB"],
        experience: "Intermediate",
        hackathons: 5,
        projects: 20,
        availability: "Available",
    },
    {
        id: 5,
        name: "Ananya Mehta",
        role: "Frontend Developer",
        location: "Bangalore",
        college: "RV College",
        match: 91,
        skills: ["React", "JavaScript", "Tailwind"],
        experience: "Intermediate",
        hackathons: 4,
        projects: 16,
        availability: "Available",
    },
    {
        id: 6,
        name: "Vikram Singh",
        role: "Flutter Developer",
        location: "Hyderabad",
        college: "IIIT Hyderabad",
        match: 89,
        skills: ["Flutter", "Dart", "Firebase"],
        experience: "Beginner",
        hackathons: 2,
        projects: 11,
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
            const matchesSearch =
                !query ||
                person.name.toLowerCase().includes(query) ||
                person.role.toLowerCase().includes(query) ||
                person.location.toLowerCase().includes(query) ||
                person.college.toLowerCase().includes(query) ||
                person.skills.some((skill) =>
                    skill.toLowerCase().includes(query)
                );

            const matchesSkill =
                selectedSkill === "All" ||
                person.skills.some(
                    (skill) =>
                        skill.toLowerCase() === selectedSkill.toLowerCase()
                );

            return matchesSearch && matchesSkill;
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
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        {/* Header */}
                        <section className="mb-8 text-center">

                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                                Find Teammates
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                                Meet Your Future Team
                            </h1>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                                Search students by skills, college, experience
                                and AI Match Score.
                            </p>

                        </section>

                        {/* Search + filters */}
                        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                                    🔍
                                </span>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search React Developer, Java Developer..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />

                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 hover:text-slate-700"
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

                        {/* Result information */}
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Recommended Teammates
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {filteredTeammates.length} potential teammate
                                    {filteredTeammates.length !== 1 ? "s" : ""}{" "}
                                    found
                                </p>
                            </div>

                            <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                                ✨ AI-powered matching
                            </div>

                        </div>

                        {/* Cards */}
                        {filteredTeammates.length > 0 ? (

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                                {filteredTeammates.map((person) => (
                                    <TeammateCard
                                        key={person.id}
                                        teammate={person}
                                        connected={connected.includes(person.id)}
                                        onConnect={() =>
                                            handleConnect(person.id)
                                        }
                                    />
                                ))}

                            </div>

                        ) : (

                            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl">
                                    🔎
                                </div>

                                <h3 className="text-lg font-bold text-slate-900">
                                    No teammates found
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                    Try another skill, name, college or
                                    technology.
                                </p>

                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setSelectedSkill("All");
                                    }}
                                    className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
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