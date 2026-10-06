
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Trophy,
    CalendarDays,
    Clock,
    Users,
    MapPin,
    ArrowRight,
    Sparkles,
    Code2,
    ShieldCheck,
    Blocks,
    Cpu,
    Cloud,
    Globe,
    Bookmark,
    BookmarkCheck,
    X,
    SlidersHorizontal,
    ChevronDown,
    Flame,
    Star,
    Zap,
    Target,
    UserPlus,
    Plus,
    CheckCircle,
    Timer,
    Laptop,
    RotateCcw,
} from "lucide-react";

const ExploreHackathons = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [difficulty, setDifficulty] = useState("All");
    const [mode, setMode] = useState("All");
    const [sortBy, setSortBy] = useState("Recommended");
    const [activeTab, setActiveTab] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [bookmarked, setBookmarked] = useState([]);

    const hackathons = [
        {
            id: 1,
            title: "AI Innovation Hackathon 2026",
            organizer: "Tech Innovators",
            category: "Artificial Intelligence",
            difficulty: "Intermediate",
            mode: "Online",
            location: "Online",
            prize: 200000,
            prizeText: "₹2,00,000",
            participants: 250,
            maxParticipants: 500,
            deadline: "15 Sept 2026",
            duration: "48 Hours",
            daysLeft: 11,
            skills: ["AI", "ML", "React", "Python"],
            description:
                "Build innovative AI-powered solutions that solve real-world problems.",
            featured: true,
            trending: true,
            recommended: true,
            isNew: false,
            icon: Cpu,
        },
        {
            id: 2,
            title: "Future Web Challenge",
            organizer: "WebTech Community",
            category: "Web Development",
            difficulty: "Beginner",
            mode: "Online",
            location: "Online",
            prize: 150000,
            prizeText: "₹1,50,000",
            participants: 180,
            maxParticipants: 400,
            deadline: "20 Sept 2026",
            duration: "36 Hours",
            daysLeft: 16,
            skills: ["HTML", "CSS", "JavaScript", "React"],
            description:
                "Create the next generation of websites and web applications.",
            featured: false,
            trending: true,
            recommended: true,
            isNew: true,
            icon: Globe,
        },
        {
            id: 3,
            title: "Cyber Shield Hackathon",
            organizer: "Cyber Security Club",
            category: "Cybersecurity",
            difficulty: "Advanced",
            mode: "Offline",
            location: "Pune",
            prize: 175000,
            prizeText: "₹1,75,000",
            participants: 120,
            maxParticipants: 300,
            deadline: "25 Sept 2026",
            duration: "48 Hours",
            daysLeft: 21,
            skills: ["Cybersecurity", "Linux", "Networking"],
            description:
                "Defend digital systems and build innovative cybersecurity solutions.",
            featured: false,
            trending: false,
            recommended: true,
            isNew: false,
            icon: ShieldCheck,
        },
        {
            id: 4,
            title: "Blockchain Builders 2026",
            organizer: "BlockTech India",
            category: "Blockchain",
            difficulty: "Advanced",
            mode: "Hybrid",
            location: "Mumbai + Online",
            prize: 250000,
            prizeText: "₹2,50,000",
            participants: 200,
            maxParticipants: 450,
            deadline: "30 Sept 2026",
            duration: "48 Hours",
            daysLeft: 26,
            skills: ["Blockchain", "Web3", "Solidity"],
            description:
                "Build decentralized applications and explore the future of Web3.",
            featured: true,
            trending: true,
            recommended: false,
            isNew: true,
            icon: Blocks,
        },
        {
            id: 5,
            title: "IoT Smart City Challenge",
            organizer: "Smart India Labs",
            category: "IoT",
            difficulty: "Intermediate",
            mode: "Offline",
            location: "Nagpur",
            prize: 125000,
            prizeText: "₹1,25,000",
            participants: 100,
            maxParticipants: 250,
            deadline: "5 Oct 2026",
            duration: "36 Hours",
            daysLeft: 31,
            skills: ["IoT", "Arduino", "Sensors"],
            description:
                "Create smart technology solutions for future-ready cities.",
            featured: false,
            trending: false,
            recommended: false,
            isNew: true,
            icon: Code2,
        },
        {
            id: 6,
            title: "Cloud Next Hackathon",
            organizer: "Cloud Community",
            category: "Cloud Computing",
            difficulty: "Intermediate",
            mode: "Online",
            location: "Online",
            prize: 180000,
            prizeText: "₹1,80,000",
            participants: 160,
            maxParticipants: 350,
            deadline: "10 Oct 2026",
            duration: "48 Hours",
            daysLeft: 36,
            skills: ["AWS", "Azure", "Docker", "Cloud"],
            description:
                "Build scalable cloud solutions and solve modern infrastructure challenges.",
            featured: false,
            trending: true,
            recommended: true,
            isNew: false,
            icon: Cloud,
        },
    ];

    const categories = [
        "All",
        "Artificial Intelligence",
        "Web Development",
        "Cybersecurity",
        "Blockchain",
        "IoT",
        "Cloud Computing",
    ];

    const technologies = [
        {
            name: "AI / ML",
            icon: Cpu,
            category: "Artificial Intelligence",
        },
        {
            name: "Web Development",
            icon: Globe,
            category: "Web Development",
        },
        {
            name: "Cybersecurity",
            icon: ShieldCheck,
            category: "Cybersecurity",
        },
        {
            name: "Blockchain",
            icon: Blocks,
            category: "Blockchain",
        },
        {
            name: "Cloud",
            icon: Cloud,
            category: "Cloud Computing",
        },
        {
            name: "IoT",
            icon: Code2,
            category: "IoT",
        },
    ];

    const toggleBookmark = (id) => {
        setBookmarked((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setDifficulty("All");
        setMode("All");
        setSortBy("Recommended");
        setActiveTab("All");
    };

    const filteredHackathons = useMemo(() => {
        let result = hackathons.filter((hackathon) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                hackathon.title.toLowerCase().includes(searchText) ||
                hackathon.organizer.toLowerCase().includes(searchText) ||
                hackathon.category.toLowerCase().includes(searchText) ||
                hackathon.skills.some((skill) =>
                    skill.toLowerCase().includes(searchText)
                );

            const matchesCategory =
                category === "All" ||
                hackathon.category === category;

            const matchesDifficulty =
                difficulty === "All" ||
                hackathon.difficulty === difficulty;

            const matchesMode =
                mode === "All" ||
                hackathon.mode === mode;

            let matchesTab = true;

            if (activeTab === "Trending") {
                matchesTab = hackathon.trending;
            }

            if (activeTab === "Recommended") {
                matchesTab = hackathon.recommended;
            }

            if (activeTab === "New") {
                matchesTab = hackathon.isNew;
            }

            if (activeTab === "Ending Soon") {
                matchesTab = hackathon.daysLeft <= 21;
            }

            if (activeTab === "Highest Prize") {
                matchesTab = hackathon.prize >= 180000;
            }

            return (
                matchesSearch &&
                matchesCategory &&
                matchesDifficulty &&
                matchesMode &&
                matchesTab
            );
        });

        if (sortBy === "Highest Prize") {
            result.sort((a, b) => b.prize - a.prize);
        }

        if (sortBy === "Ending Soon") {
            result.sort((a, b) => a.daysLeft - b.daysLeft);
        }

        if (sortBy === "Newest") {
            result.sort(
                (a, b) => Number(b.isNew) - Number(a.isNew)
            );
        }

        if (sortBy === "Most Participants") {
            result.sort(
                (a, b) => b.participants - a.participants
            );
        }

        return result;
    }, [
        search,
        category,
        difficulty,
        mode,
        sortBy,
        activeTab,
    ]);

    const hasFilters =
        search !== "" ||
        category !== "All" ||
        difficulty !== "All" ||
        mode !== "All";

    const featuredHackathons = hackathons.filter(
        (hackathon) => hackathon.featured
    );

    const recommendedHackathons = hackathons.filter(
        (hackathon) => hackathon.recommended
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">

            {/* =====================================================
                MY HACKATHONS STYLE NAVBAR
            ====================================================== */}

            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200">

                <div className="max-w-7xl mx-auto px-6 py-4">

                    <div className="flex items-center justify-between gap-6">

                        {/* LOGO */}

                        <div
                            onClick={() => navigate("/hackathons")}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="w-11 h-11 rounded-2xl bg-[#1E1B4B] flex items-center justify-center shadow-lg">
                                <Trophy
                                    size={23}
                                    className="text-white"
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-[#1E1B4B]">
                                    CONEXA
                                </h1>

                                <p className="text-[10px] font-bold tracking-widest text-teal-600">
                                    HACKATHON PLATFORM
                                </p>
                            </div>
                        </div>

                        {/* NAVIGATION */}

                        <nav className="hidden lg:flex items-center gap-7">

                            <button
                                onClick={() =>
                                    navigate("/hackathons")
                                }
                                className="text-slate-600 hover:text-[#1E1B4B] font-medium transition"
                            >
                                Home
                            </button>

                            <button
                                className="text-[#1E1B4B] font-semibold"
                            >
                                Explore
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/my-hackathons")
                                }
                                className="text-slate-600 hover:text-[#1E1B4B] font-medium transition"
                            >
                                My Hackathons
                            </button>

                        </nav>

                        {/* RIGHT SIDE */}

                        <div className="hidden md:flex items-center gap-3">

                            <button
                                onClick={() =>
                                    navigate("/my-hackathons")
                                }
                                className="px-4 py-2.5 rounded-xl border border-[#1E1B4B]/10 bg-indigo-50 text-[#1E1B4B] font-semibold hover:bg-indigo-100 transition"
                            >
                                My Hackathons
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/create-hackathon")
                                }
                                className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:bg-[#312E81] transition flex items-center gap-2"
                            >
                                <Plus size={17} />
                                Create Hackathon
                            </button>

                        </div>

                    </div>

                </div>

            </header>

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative overflow-hidden bg-[#1E1B4B] text-white">

                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 py-16">

                    <div className="max-w-3xl">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">

                            <Sparkles
                                size={16}
                                className="text-teal-300"
                            />

                            <span className="text-sm font-medium text-slate-200">
                                Discover • Build • Compete • Connect
                            </span>

                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            Find Your Next
                            <span className="text-teal-400">
                                {" "}Hackathon
                            </span>
                        </h2>

                        <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
                            Discover exciting challenges, build innovative
                            projects, meet talented developers and compete
                            for amazing prizes.
                        </p>

                    </div>

                    {/* SEARCH */}

                    <div className="mt-9 max-w-4xl">

                        <div className="relative">

                            <Search
                                size={22}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search hackathons, skills, technologies or organizers..."
                                className="w-full pl-14 pr-14 py-5 rounded-2xl bg-white text-slate-800 shadow-2xl outline-none placeholder:text-slate-400"
                            />

                            {search && (
                                <button
                                    onClick={() =>
                                        setSearch("")
                                    }
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                >
                                    <X size={20} />
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                QUICK TABS
            ====================================================== */}

            <section className="bg-white border-b border-slate-200">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex items-center gap-2 overflow-x-auto py-4">

                        {[
                            {
                                name: "All",
                                icon: Sparkles,
                            },
                            {
                                name: "Trending",
                                icon: Flame,
                            },
                            {
                                name: "Recommended",
                                icon: Star,
                            },
                            {
                                name: "New",
                                icon: Zap,
                            },
                            {
                                name: "Ending Soon",
                                icon: Timer,
                            },
                            {
                                name: "Highest Prize",
                                icon: Trophy,
                            },
                        ].map((tab) => {

                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.name}
                                    onClick={() =>
                                        setActiveTab(tab.name)
                                    }
                                    className={`flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                                        activeTab === tab.name
                                            ? "bg-[#1E1B4B] text-white shadow-lg"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    <Icon size={16} />
                                    {tab.name}
                                </button>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* =====================================================
                FEATURED
            ====================================================== */}

            <section className="max-w-7xl mx-auto px-6 pt-10">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <div className="flex items-center gap-2">

                            <Star
                                size={20}
                                className="text-teal-500"
                            />

                            <h2 className="text-2xl font-bold text-[#1E1B4B]">
                                Featured Hackathons
                            </h2>

                        </div>

                        <p className="text-slate-500 mt-1">
                            Handpicked opportunities you shouldn't miss.
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {featuredHackathons.map((hackathon) => {

                        const Icon = hackathon.icon;

                        return (
                            <div
                                key={hackathon.id}
                                className="relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] to-[#312E81] rounded-3xl p-7 text-white shadow-xl"
                            >

                                <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-teal-400/10 blur-2xl" />

                                <div className="relative">

                                    <div className="flex items-start justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                                <Icon size={24} />
                                            </div>

                                            <div>

                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold">
                                                    <Sparkles size={12} />
                                                    FEATURED
                                                </span>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() =>
                                                toggleBookmark(
                                                    hackathon.id
                                                )
                                            }
                                            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                                        >
                                            {bookmarked.includes(
                                                hackathon.id
                                            ) ? (
                                                <BookmarkCheck
                                                    size={19}
                                                    className="text-teal-300"
                                                />
                                            ) : (
                                                <Bookmark
                                                    size={19}
                                                />
                                            )}
                                        </button>

                                    </div>

                                    <h3 className="text-2xl font-bold mt-6">
                                        {hackathon.title}
                                    </h3>

                                    <p className="text-slate-300 mt-2">
                                        by {hackathon.organizer}
                                    </p>

                                    <p className="text-slate-300 mt-4 leading-relaxed">
                                        {hackathon.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-5">

                                        {hackathon.skills.map(
                                            (skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-slate-200"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}

                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Prize
                                            </p>

                                            <p className="font-bold mt-1">
                                                {hackathon.prizeText}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Participants
                                            </p>

                                            <p className="font-bold mt-1">
                                                {hackathon.participants}/
                                                {hackathon.maxParticipants}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Mode
                                            </p>

                                            <p className="font-bold mt-1">
                                                {hackathon.mode}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Deadline
                                            </p>

                                            <p className="font-bold mt-1">
                                                {hackathon.deadline}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex flex-wrap gap-3 mt-7">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/hackathons/${hackathon.id}`
                                                )
                                            }
                                            className="flex-1 min-w-[150px] px-5 py-3 rounded-xl bg-white text-[#1E1B4B] font-bold hover:bg-slate-100 transition flex items-center justify-center gap-2"
                                        >
                                            View Details
                                            <ArrowRight size={17} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/hackathons/${hackathon.id}/register`
                                                )
                                            }
                                            className="flex-1 min-w-[150px] px-5 py-3 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition"
                                        >
                                            Register Now
                                        </button>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </section>

            {/* =====================================================
                MAIN EXPLORE
            ====================================================== */}

            <main className="max-w-7xl mx-auto px-6 py-12">

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* FILTER SIDEBAR */}

                    <aside
                        className={`lg:w-64 flex-shrink-0 ${
                            showFilters
                                ? "block"
                                : "hidden lg:block"
                        }`}
                    >

                        <div className="bg-white rounded-3xl border border-slate-200 p-5 sticky top-24">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <SlidersHorizontal
                                        size={19}
                                        className="text-[#1E1B4B]"
                                    />

                                    <h3 className="font-bold text-[#1E1B4B]">
                                        Filters
                                    </h3>

                                </div>

                                {hasFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs font-semibold text-teal-600"
                                    >
                                        Clear
                                    </button>
                                )}

                            </div>

                            {/* TECHNOLOGY */}

                            <div className="mt-7">

                                <h4 className="text-sm font-bold text-slate-800 mb-3">
                                    Technology
                                </h4>

                                <div className="space-y-2">

                                    {categories.slice(1).map(
                                        (item) => (
                                            <button
                                                key={item}
                                                onClick={() =>
                                                    setCategory(
                                                        category === item
                                                            ? "All"
                                                            : item
                                                    )
                                                }
                                                className="w-full flex items-center gap-3 text-left"
                                            >

                                                <span
                                                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                                                        category === item
                                                            ? "bg-teal-500 border-teal-500"
                                                            : "border-slate-300"
                                                    }`}
                                                >
                                                    {category === item && (
                                                        <CheckCircle
                                                            size={13}
                                                            className="text-white"
                                                        />
                                                    )}
                                                </span>

                                                <span className="text-sm text-slate-600">
                                                    {item}
                                                </span>

                                            </button>
                                        )
                                    )}

                                </div>

                            </div>

                            {/* DIFFICULTY */}

                            <div className="mt-7 pt-6 border-t border-slate-100">

                                <h4 className="text-sm font-bold text-slate-800 mb-3">
                                    Difficulty
                                </h4>

                                <div className="space-y-2">

                                    {[
                                        "Beginner",
                                        "Intermediate",
                                        "Advanced",
                                    ].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() =>
                                                setDifficulty(
                                                    difficulty === item
                                                        ? "All"
                                                        : item
                                                )
                                            }
                                            className="w-full flex items-center gap-3 text-left"
                                        >

                                            <span
                                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                                    difficulty === item
                                                        ? "border-teal-500"
                                                        : "border-slate-300"
                                                }`}
                                            >
                                                {difficulty === item && (
                                                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                                                )}
                                            </span>

                                            <span className="text-sm text-slate-600">
                                                {item}
                                            </span>

                                        </button>
                                    ))}

                                </div>

                            </div>

                            {/* MODE */}

                            <div className="mt-7 pt-6 border-t border-slate-100">

                                <h4 className="text-sm font-bold text-slate-800 mb-3">
                                    Mode
                                </h4>

                                <div className="space-y-2">

                                    {[
                                        "Online",
                                        "Offline",
                                        "Hybrid",
                                    ].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() =>
                                                setMode(
                                                    mode === item
                                                        ? "All"
                                                        : item
                                                )
                                            }
                                            className="w-full flex items-center gap-3 text-left"
                                        >

                                            <span
                                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                                    mode === item
                                                        ? "border-teal-500"
                                                        : "border-slate-300"
                                                }`}
                                            >
                                                {mode === item && (
                                                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                                                )}
                                            </span>

                                            <span className="text-sm text-slate-600">
                                                {item}
                                            </span>

                                        </button>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </aside>

                    {/* RESULTS */}

                    <section className="flex-1">

                        {/* RESULT HEADER */}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

                            <div>

                                <h2 className="text-2xl font-bold text-[#1E1B4B]">
                                    Explore Hackathons
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    {filteredHackathons.length} hackathons
                                    found
                                </p>

                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() =>
                                        setShowFilters(
                                            !showFilters
                                        )
                                    }
                                    className="lg:hidden px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-[#1E1B4B] font-semibold flex items-center gap-2"
                                >
                                    <SlidersHorizontal
                                        size={17}
                                    />
                                    Filters
                                </button>

                                <div className="relative">

                                    <select
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(
                                                e.target.value
                                            )
                                        }
                                        className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 outline-none"
                                    >
                                        <option>
                                            Recommended
                                        </option>
                                        <option>
                                            Newest
                                        </option>
                                        <option>
                                            Ending Soon
                                        </option>
                                        <option>
                                            Highest Prize
                                        </option>
                                        <option>
                                            Most Participants
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* CARDS */}

                        {filteredHackathons.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {filteredHackathons.map(
                                    (hackathon) => {

                                        const Icon =
                                            hackathon.icon;

                                        const isBookmarked =
                                            bookmarked.includes(
                                                hackathon.id
                                            );

                                        return (
                                            <div
                                                key={
                                                    hackathon.id
                                                }
                                                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            >

                                                <div className="p-6">

                                                    {/* TOP */}

                                                    <div className="flex items-start justify-between">

                                                        <div className="flex gap-3">

                                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                                                <Icon
                                                                    size={
                                                                        23
                                                                    }
                                                                    className="text-[#1E1B4B]"
                                                                />
                                                            </div>

                                                            <div>

                                                                {hackathon.trending && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-50 text-orange-600 text-[10px] font-bold">
                                                                        <Flame
                                                                            size={
                                                                                11
                                                                            }
                                                                        />
                                                                        TRENDING
                                                                    </span>
                                                                )}

                                                                {hackathon.isNew &&
                                                                    !hackathon.trending && (
                                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-teal-50 text-teal-700 text-[10px] font-bold">
                                                                            <Zap
                                                                                size={
                                                                                    11
                                                                                }
                                                                            />
                                                                            NEW
                                                                        </span>
                                                                    )}

                                                            </div>

                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                toggleBookmark(
                                                                    hackathon.id
                                                                )
                                                            }
                                                            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-teal-50 transition"
                                                        >
                                                            {isBookmarked ? (
                                                                <BookmarkCheck
                                                                    size={
                                                                        19
                                                                    }
                                                                    className="text-teal-600"
                                                                />
                                                            ) : (
                                                                <Bookmark
                                                                    size={
                                                                        19
                                                                    }
                                                                    className="text-slate-500"
                                                                />
                                                            )}
                                                        </button>

                                                    </div>

                                                    {/* TITLE */}

                                                    <h3 className="text-xl font-bold text-[#1E1B4B] mt-5 group-hover:text-teal-600 transition">

                                                        {
                                                            hackathon.title
                                                        }

                                                    </h3>

                                                    <p className="text-sm text-slate-500 mt-1">
                                                        by{" "}
                                                        {
                                                            hackathon.organizer
                                                        }
                                                    </p>

                                                    <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                                                        {
                                                            hackathon.description
                                                        }
                                                    </p>

                                                    {/* SKILLS */}

                                                    <div className="flex flex-wrap gap-2 mt-4">

                                                        {hackathon.skills
                                                            .slice(
                                                                0,
                                                                3
                                                            )
                                                            .map(
                                                                (
                                                                    skill
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            skill
                                                                        }
                                                                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                                                                    >
                                                                        {
                                                                            skill
                                                                        }
                                                                    </span>
                                                                )
                                                            )}

                                                    </div>

                                                    {/* INFO */}

                                                    <div className="grid grid-cols-2 gap-4 mt-5">

                                                        <div className="flex items-center gap-2">

                                                            <Trophy
                                                                size={
                                                                    17
                                                                }
                                                                className="text-teal-600"
                                                            />

                                                            <div>

                                                                <p className="text-[10px] text-slate-400">
                                                                    PRIZE
                                                                </p>

                                                                <p className="text-sm font-bold text-slate-800">
                                                                    {
                                                                        hackathon.prizeText
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>

                                                        <div className="flex items-center gap-2">

                                                            <Users
                                                                size={
                                                                    17
                                                                }
                                                                className="text-teal-600"
                                                            />

                                                            <div>

                                                                <p className="text-[10px] text-slate-400">
                                                                    PARTICIPANTS
                                                                </p>

                                                                <p className="text-sm font-bold text-slate-800">
                                                                    {
                                                                        hackathon.participants
                                                                    }
                                                                    /
                                                                    {
                                                                        hackathon.maxParticipants
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>

                                                        <div className="flex items-center gap-2">

                                                            <CalendarDays
                                                                size={
                                                                    17
                                                                }
                                                                className="text-teal-600"
                                                            />

                                                            <div>

                                                                <p className="text-[10px] text-slate-400">
                                                                    DEADLINE
                                                                </p>

                                                                <p className="text-sm font-bold text-slate-800">
                                                                    {
                                                                        hackathon.deadline
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>

                                                        <div className="flex items-center gap-2">

                                                            <MapPin
                                                                size={
                                                                    17
                                                                }
                                                                className="text-teal-600"
                                                            />

                                                            <div>

                                                                <p className="text-[10px] text-slate-400">
                                                                    LOCATION
                                                                </p>

                                                                <p className="text-sm font-bold text-slate-800">
                                                                    {
                                                                        hackathon.location
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    {/* COUNTDOWN */}

                                                    <div
                                                        className={`mt-5 p-3 rounded-xl flex items-center justify-between ${
                                                            hackathon.daysLeft <=
                                                            21
                                                                ? "bg-orange-50"
                                                                : "bg-slate-50"
                                                        }`}
                                                    >

                                                        <div className="flex items-center gap-2">

                                                            <Timer
                                                                size={
                                                                    17
                                                                }
                                                                className={
                                                                    hackathon.daysLeft <=
                                                                    21
                                                                        ? "text-orange-500"
                                                                        : "text-slate-500"
                                                                }
                                                            />

                                                            <span className="text-sm font-semibold text-slate-700">
                                                                Registration
                                                                closes
                                                            </span>

                                                        </div>

                                                        <span
                                                            className={`text-sm font-bold ${
                                                                hackathon.daysLeft <=
                                                                21
                                                                    ? "text-orange-600"
                                                                    : "text-slate-700"
                                                            }`}
                                                        >
                                                            {
                                                                hackathon.daysLeft
                                                            }{" "}
                                                            days left
                                                        </span>

                                                    </div>

                                                </div>

                                                {/* ACTIONS */}

                                                <div className="border-t border-slate-100 p-5 flex gap-3">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/hackathons/${hackathon.id}`
                                                            )
                                                        }
                                                        className="flex-1 px-4 py-3 rounded-xl border border-[#1E1B4B] text-[#1E1B4B] font-semibold hover:bg-[#1E1B4B] hover:text-white transition flex items-center justify-center gap-2"
                                                    >
                                                        View Details
                                                        <ArrowRight
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/hackathons/${hackathon.id}/register`
                                                            )
                                                        }
                                                        className="flex-1 px-4 py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition"
                                                    >
                                                        Register
                                                    </button>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-slate-200 p-14 text-center">

                                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

                                    <Search
                                        size={28}
                                        className="text-slate-400"
                                    />

                                </div>

                                <h3 className="text-xl font-bold text-[#1E1B4B] mt-5">
                                    No hackathons found
                                </h3>

                                <p className="text-slate-500 mt-2">
                                    Try changing your search or
                                    filters.
                                </p>

                                <button
                                    onClick={clearFilters}
                                    className="mt-5 px-5 py-3 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:bg-[#312E81] flex items-center gap-2 mx-auto"
                                >
                                    <RotateCcw size={16} />
                                    Clear Filters
                                </button>

                            </div>
                        )}

                    </section>

                </div>

            </main>

            {/* =====================================================
                RECOMMENDED
            ====================================================== */}

            <section className="bg-white border-y border-slate-200">

                <div className="max-w-7xl mx-auto px-6 py-12">

                    <div className="flex items-center gap-3 mb-7">

                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <Target
                                size={22}
                                className="text-[#1E1B4B]"
                            />
                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-[#1E1B4B]">
                                Recommended For You
                            </h2>

                            <p className="text-slate-500 text-sm">
                                Hackathons that match popular developer
                                skills.
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {recommendedHackathons
                            .slice(0, 3)
                            .map((hackathon) => {

                                const Icon = hackathon.icon;

                                return (
                                    <div
                                        key={hackathon.id}
                                        className="p-5 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-lg transition"
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                                                <Icon
                                                    size={21}
                                                    className="text-[#1E1B4B]"
                                                />
                                            </div>

                                            <div className="min-w-0">

                                                <h3 className="font-bold text-[#1E1B4B] truncate">
                                                    {
                                                        hackathon.title
                                                    }
                                                </h3>

                                                <p className="text-xs text-slate-500">
                                                    {
                                                        hackathon.category
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex items-center justify-between mt-5">

                                            <span className="text-sm font-bold text-teal-600">
                                                {
                                                    hackathon.prizeText
                                                }
                                            </span>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/hackathons/${hackathon.id}`
                                                    )
                                                }
                                                className="text-sm font-semibold text-[#1E1B4B] flex items-center gap-1 hover:text-teal-600"
                                            >
                                                Explore
                                                <ArrowRight
                                                    size={15}
                                                />
                                            </button>

                                        </div>

                                    </div>
                                );
                            })}

                    </div>

                </div>

            </section>

            {/* =====================================================
                BROWSE BY TECHNOLOGY
            ====================================================== */}

            <section className="max-w-7xl mx-auto px-6 py-12">

                <div className="text-center max-w-2xl mx-auto">

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
                        <Code2 size={13} />
                        EXPLORE BY TECHNOLOGY
                    </span>

                    <h2 className="text-3xl font-bold text-[#1E1B4B] mt-4">
                        Find Hackathons By Technology
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Choose your favorite technology and discover
                        relevant challenges.
                    </p>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">

                    {technologies.map((technology) => {

                        const Icon = technology.icon;

                        return (
                            <button
                                key={technology.name}
                                onClick={() => {
                                    setCategory(
                                        technology.category
                                    );
                                    setActiveTab("All");

                                    window.scrollTo({
                                        top: 700,
                                        behavior: "smooth",
                                    });
                                }}
                                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 transition group"
                            >

                                <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-teal-50 transition">

                                    <Icon
                                        size={23}
                                        className="text-[#1E1B4B] group-hover:text-teal-600"
                                    />

                                </div>

                                <p className="text-sm font-bold text-[#1E1B4B] mt-4">
                                    {technology.name}
                                </p>

                            </button>
                        );
                    })}

                </div>

            </section>

            {/* =====================================================
                UPCOMING
            ====================================================== */}

            <section className="bg-white border-y border-slate-200">

                <div className="max-w-7xl mx-auto px-6 py-12">

                    <div className="flex items-center justify-between mb-7">

                        <div>

                            <div className="flex items-center gap-2">

                                <CalendarDays
                                    size={21}
                                    className="text-teal-500"
                                />

                                <h2 className="text-2xl font-bold text-[#1E1B4B]">
                                    Upcoming Hackathons
                                </h2>

                            </div>

                            <p className="text-slate-500 mt-1">
                                Plan ahead and register before spots fill up.
                            </p>

                        </div>

                    </div>

                    <div className="space-y-3">

                        {hackathons.slice(0, 4).map(
                            (hackathon) => (
                                <div
                                    key={hackathon.id}
                                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="w-14 h-14 rounded-xl bg-indigo-50 flex flex-col items-center justify-center">

                                            <span className="text-[10px] font-bold text-teal-600">
                                                SEPT
                                            </span>

                                            <span className="text-lg font-bold text-[#1E1B4B]">
                                                {15 +
                                                    hackathon.id}
                                            </span>

                                        </div>

                                        <div>

                                            <h3 className="font-bold text-[#1E1B4B]">
                                                {
                                                    hackathon.title
                                                }
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                {
                                                    hackathon.organizer
                                                }
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex flex-wrap items-center gap-4">

                                        <span className="flex items-center gap-2 text-sm text-slate-600">
                                            <Clock
                                                size={16}
                                                className="text-teal-600"
                                            />
                                            {
                                                hackathon.duration
                                            }
                                        </span>

                                        <span className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin
                                                size={16}
                                                className="text-teal-600"
                                            />
                                            {
                                                hackathon.location
                                            }
                                        </span>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/hackathons/${hackathon.id}`
                                                )
                                            }
                                            className="px-4 py-2 rounded-xl bg-[#1E1B4B] text-white text-sm font-semibold hover:bg-[#312E81]"
                                        >
                                            View
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </section>

            {/* =====================================================
                TEAM CTA
            ====================================================== */}

            <section className="max-w-7xl mx-auto px-6 py-12">

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#312E81] p-8 md:p-10 text-white">

                    <div className="absolute right-0 top-0 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />

                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-7">

                        <div className="max-w-2xl">

                            <div className="flex items-center gap-2">

                                <UserPlus
                                    size={21}
                                    className="text-teal-300"
                                />

                                <span className="text-teal-300 font-bold text-sm">
                                    NEED A TEAM?
                                </span>

                            </div>

                            <h2 className="text-3xl font-bold mt-3">
                                Find teammates for your next hackathon
                            </h2>

                            <p className="text-slate-300 mt-3">
                                Connect with developers, designers and
                                innovators who have the skills you need.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/build-team")
                            }
                            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition flex items-center justify-center gap-2"
                        >
                            Find Teammates
                            <ArrowRight size={17} />
                        </button>

                    </div>

                </div>

            </section>

            {/* =====================================================
                CREATE HACKATHON CTA
            ====================================================== */}

            <section className="pb-14 px-6">

                <div className="max-w-4xl mx-auto text-center">

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center">

                        <Laptop
                            size={25}
                            className="text-[#1E1B4B]"
                        />

                    </div>

                    <h2 className="text-3xl font-bold text-[#1E1B4B] mt-5">
                        Have an idea for a hackathon?
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Create your own hackathon and bring developers
                        together on CONEXA.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/create-hackathon")
                        }
                        className="mt-6 px-7 py-3.5 rounded-xl bg-[#1E1B4B] text-white font-bold hover:bg-[#312E81] transition inline-flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Create Hackathon
                    </button>

                </div>

            </section>

        </div>
    );
};

export default ExploreHackathons;

