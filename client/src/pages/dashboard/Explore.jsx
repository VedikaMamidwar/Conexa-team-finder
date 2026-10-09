import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Search,
    Users,
    Trophy,
    Code2,
    CalendarDays,
    ArrowRight,
    Sparkles,
    UserPlus,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

const exploreItems = [
    {
        title: "Find Teammates",
        description:
            "Discover students with skills that match your project requirements.",
        icon: Users,
        path: "/find-teammates",
        label: "TEAM",
    },
    {
        title: "Hackathons",
        description:
            "Explore upcoming hackathons and find exciting competitions.",
        icon: Trophy,
        path: "/hackathons",
        label: "COMPETITIONS",
    },
    {
        title: "Upcoming Events",
        description:
            "Join workshops, meetups and developer events.",
        icon: CalendarDays,
        path: "/events",
        label: "EVENTS",
    },
    {
        title: "Build Your Team",
        description:
            "Create your dream team and collaborate with other students.",
        icon: UserPlus,
        path: "/build-team",
        label: "TEAM BUILDER",
    },
];

const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "Java",
    "Python",
    "UI/UX",
    "JavaScript",
    "Express.js",
];

export default function Explore() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [search, setSearch] = useState("");

    const filteredItems = exploreItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">

            {/* SIDEBAR */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* MAIN */}
            <div
                className={`min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "lg:ml-24"
                    }`}
            >

                {/* TOPBAR */}
                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* CONTENT */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">

                    {/* HERO */}
                    <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#312E81] p-6 text-white shadow-lg sm:p-8">

                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#14B8A6]/20" />

                        <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-white/5" />

                        <div className="relative z-10 max-w-3xl">

                            <div className="mb-3 flex items-center gap-2 text-[#5EEAD4]">
                                <Sparkles size={18} />

                                <span className="text-sm font-semibold">
                                    CONEXA EXPLORE
                                </span>
                            </div>

                            <h1 className="text-3xl font-black sm:text-4xl">
                                Explore Opportunities
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
                                Find teammates, discover hackathons,
                                join events and build amazing projects
                                with the CONEXA community.
                            </p>

                            {/* SEARCH */}
                            <div className="mt-6 flex max-w-xl items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg">

                                <Search
                                    size={20}
                                    className="text-slate-400"
                                />

                                <input
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Search opportunities..."
                                    className="w-full bg-transparent text-sm text-slate-700 outline-none"
                                />

                            </div>

                        </div>

                    </section>

                    {/* SKILLS */}
                    <section className="mb-8">

                        <div className="mb-4 flex items-center justify-between">

                            <div>
                                <h2 className="text-xl font-bold text-[#1E1B4B]">
                                    Explore by Skills
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Find people and opportunities based on
                                    your interests.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            {skills.map((skill) => (
                                <button
                                    key={skill}
                                    onClick={() =>
                                        navigate(
                                            `/find-teammates?skill=${encodeURIComponent(
                                                skill
                                            )}`
                                        )
                                    }
                                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-[#14B8A6] hover:bg-teal-50 hover:text-[#0F766E]"
                                >
                                    <span className="flex items-center gap-2">
                                        <Code2 size={15} />
                                        {skill}
                                    </span>
                                </button>
                            ))}

                        </div>

                    </section>

                    {/* EXPLORE CARDS */}
                    <section>

                        <div className="mb-5">

                            <h2 className="text-xl font-bold text-[#1E1B4B]">
                                Explore CONEXA
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Everything you need to build, connect
                                and collaborate.
                            </p>

                        </div>

                        {filteredItems.length > 0 ? (

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {filteredItems.map((item, index) => {

                                    const Icon = item.icon;

                                    return (
                                        <motion.button
                                            key={item.title}
                                            initial={{
                                                opacity: 0,
                                                y: 15,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.05,
                                            }}
                                            whileHover={{ y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() =>
                                                navigate(item.path)
                                            }
                                            className="group text-left rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl"
                                        >

                                            <div className="flex items-start justify-between">

                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-[#1E1B4B] transition group-hover:bg-[#1E1B4B] group-hover:text-white">
                                                    <Icon size={27} />
                                                </div>

                                                <ArrowRight
                                                    size={20}
                                                    className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#14B8A6]"
                                                />

                                            </div>

                                            <span className="mt-5 inline-block rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold tracking-wider text-teal-700">
                                                {item.label}
                                            </span>

                                            <h3 className="mt-3 text-xl font-bold text-[#1E1B4B]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {item.description}
                                            </p>

                                            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#14B8A6]">
                                                Explore now
                                                <ArrowRight size={16} />
                                            </div>

                                        </motion.button>
                                    );
                                })}

                            </div>

                        ) : (

                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                                <Search
                                    size={35}
                                    className="mx-auto text-slate-300"
                                />

                                <h3 className="mt-4 text-lg font-bold text-[#1E1B4B]">
                                    No results found
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Try searching for another opportunity.
                                </p>

                            </div>

                        )}

                    </section>

                    {/* BOTTOM CTA */}
                    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#14B8A6]">
                                    <Users size={24} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#1E1B4B]">
                                        Looking for teammates?
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Find students with matching skills.
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    navigate("/find-teammates")
                                }
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#312E81]"
                            >
                                Find Teammates
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    );
}