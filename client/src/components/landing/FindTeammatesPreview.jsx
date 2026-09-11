import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    MapPin,
    Star,
    MessageCircle,
    X,
    Check,
    Send,
    Users,
    Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const skills = [
    "React",
    "Node.js",
    "Java",
    "Python",
    "MongoDB",
    "Express",
    "UI/UX",
    "AI",
    "ML",
    "Flutter",
];

const students = [
    {
        name: "Rahul Sharma",
        role: "MERN Stack Developer",
        college: "IIT Delhi",
        city: "Delhi",
        match: 98,
        online: true,
        experience: "4 Hackathons",
        projects: 18,
        skills: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
    },
    {
        name: "Priya Patel",
        role: "UI/UX Designer",
        college: "VNIT Nagpur",
        city: "Nagpur",
        match: 95,
        online: true,
        experience: "3 Hackathons",
        projects: 22,
        skills: ["UI/UX", "Canva"],
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
    },
    {
        name: "Aditya Singh",
        role: "AI Engineer",
        college: "NIT Trichy",
        city: "Chennai",
        match: 96,
        online: false,
        experience: "5 Hackathons",
        projects: 31,
        skills: ["Python", "AI", "ML"],
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
    },
];

export default function FindTeammatesPreview() {
    const [search, setSearch] = useState("");
    const [activeSkill, setActiveSkill] = useState("All");
    const [connected, setConnected] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState("");

    // Search + skill filter
    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                student.name.toLowerCase().includes(searchText) ||
                student.role.toLowerCase().includes(searchText) ||
                student.college.toLowerCase().includes(searchText) ||
                student.city.toLowerCase().includes(searchText) ||
                student.skills.some((skill) =>
                    skill.toLowerCase().includes(searchText)
                );

            const matchesSkill =
                activeSkill === "All" ||
                student.skills.some(
                    (skill) =>
                        skill.toLowerCase() === activeSkill.toLowerCase()
                );

            return matchesSearch && matchesSkill;
        });
    }, [search, activeSkill]);

    // Connect
    const handleConnect = (name) => {
        setConnected((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        );
    };

    // Favorite
    const handleFavorite = (name) => {
        setFavorites((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        );
    };

    // Search button
    const handleSearch = () => {
        const input = document.getElementById("student-results");

        input?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <section
            id="find-teammates"
            className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] overflow-hidden"
        >
            {/* ================= BACKGROUND ================= */}

            <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#1E1B4B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* ================= HEADER ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Badge */}

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                        <Sparkles
                            size={15}
                            className="text-[#14B8A6]"
                        />

                        <span className="uppercase tracking-[3px] text-xs sm:text-sm font-bold text-[#14B8A6]">
                            Find Teammates
                        </span>
                    </div>

                    {/* Heading */}

                    <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1B4B] leading-tight">
                        Meet Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]">
                            Future Team
                        </span>
                    </h2>

                    <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                        Search students by skills, college, experience and
                        AI Match Score. Find people who complement your skills.
                    </p>
                </motion.div>

                {/* ================= SEARCH BOX ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="
                        mt-10 sm:mt-12
                        bg-white
                        rounded-3xl
                        border border-slate-200
                        shadow-xl
                        p-4 sm:p-6
                    "
                >
                    {/* Search */}

                    <div className="flex flex-col sm:flex-row gap-3">

                        <div className="
                            flex items-center gap-3
                            flex-1
                            px-4
                            py-3
                            rounded-xl
                            bg-slate-50
                            border border-slate-200
                            focus-within:border-[#14B8A6]
                            focus-within:ring-2
                            focus-within:ring-[#14B8A6]/10
                            transition
                        ">
                            <Search
                                size={20}
                                className="text-slate-400 shrink-0"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                className="
                                    w-full
                                    bg-transparent
                                    outline-none
                                    text-sm sm:text-base
                                    text-slate-700
                                "
                                placeholder="Search React Developer, Java Developer..."
                            />

                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="text-slate-400 hover:text-slate-700"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        <button
                            onClick={handleSearch}
                            className="
                                px-6
                                py-3
                                rounded-xl
                                bg-[#1E1B4B]
                                text-white
                                font-semibold
                                hover:bg-[#312E81]
                                active:scale-95
                                transition
                            "
                        >
                            Search
                        </button>
                    </div>

                    {/* Skills */}

                    <div className="mt-5">
                        <p className="text-xs font-semibold text-slate-500 mb-3">
                            Popular Skills
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveSkill("All")}
                                className={`
                                    px-3 sm:px-4 py-2
                                    rounded-full
                                    text-xs sm:text-sm
                                    font-medium
                                    transition
                                    ${activeSkill === "All"
                                        ? "bg-[#1E1B4B] text-white shadow-md"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }
                                `}
                            >
                                All
                            </button>

                            {skills.map((skill) => (
                                <button
                                    key={skill}
                                    onClick={() =>
                                        setActiveSkill(skill)
                                    }
                                    className={`
                                        px-3 sm:px-4 py-2
                                        rounded-full
                                        text-xs sm:text-sm
                                        font-medium
                                        transition
                                        ${activeSkill === skill
                                            ? "bg-[#14B8A6] text-white shadow-md"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }
                                    `}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ================= RESULTS HEADER ================= */}

                <div
                    id="student-results"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-10 sm:mt-14"
                >
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
                            Recommended Teammates
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            {filteredStudents.length} students found
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Users size={17} />
                        AI-powered matching
                    </div>
                </div>

                {/* ================= STUDENT CARDS ================= */}

                {filteredStudents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mt-6 sm:mt-8">

                        {filteredStudents.map((student, index) => {
                            const isConnected = connected.includes(
                                student.name
                            );

                            const isFavorite = favorites.includes(
                                student.name
                            );

                            return (
                                <motion.div
                                    key={student.name}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{
                                        y: -8,
                                    }}
                                    className="
                                        group
                                        bg-white
                                        rounded-3xl
                                        border border-slate-200
                                        shadow-lg
                                        hover:shadow-2xl
                                        overflow-hidden
                                        transition-shadow
                                    "
                                >
                                    {/* Cover */}

                                    <div className="
                                        relative
                                        h-24 sm:h-28
                                        bg-gradient-to-r
                                        from-[#1E1B4B]
                                        via-[#312E81]
                                        to-[#14B8A6]
                                    ">
                                        <div className="
                                            absolute
                                            inset-0
                                            bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_40%)]
                                        " />

                                        {/* Match Badge */}

                                        <div className="
                                            absolute
                                            top-4
                                            right-4
                                            flex items-center gap-1
                                            bg-white/95
                                            backdrop-blur
                                            text-green-700
                                            px-3
                                            py-1.5
                                            rounded-full
                                            text-xs
                                            sm:text-sm
                                            font-bold
                                            shadow
                                        ">
                                            <Sparkles size={13} />
                                            {student.match}% Match
                                        </div>
                                    </div>

                                    <div className="px-5 sm:px-7 pb-6 sm:pb-7">

                                        {/* Avatar */}

                                        <div className="-mt-10 flex justify-between items-end">

                                            <div className="relative">

                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.05,
                                                    }}
                                                    className="
                                                        w-20
                                                        h-20
                                                        sm:w-[84px]
                                                        sm:h-[84px]
                                                        rounded-full
                                                        bg-white
                                                        border-4
                                                        border-white
                                                        shadow-xl
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-2xl
                                                        sm:text-3xl
                                                        font-black
                                                        text-[#1E1B4B]
                                                    "
                                                >
                                                    {student.name.charAt(0)}
                                                </motion.div>

                                                {student.online && (
                                                    <span className="
                                                        absolute
                                                        bottom-1
                                                        right-1
                                                        w-5
                                                        h-5
                                                        rounded-full
                                                        bg-green-500
                                                        border-4
                                                        border-white
                                                    " />
                                                )}
                                            </div>

                                            {/* Favorite */}

                                            <button
                                                onClick={() =>
                                                    handleFavorite(
                                                        student.name
                                                    )
                                                }
                                                className="
                                                    w-10
                                                    h-10
                                                    rounded-xl
                                                    bg-slate-50
                                                    flex
                                                    items-center
                                                    justify-center
                                                    hover:bg-yellow-50
                                                    transition
                                                "
                                            >
                                                <Star
                                                    size={19}
                                                    className={
                                                        isFavorite
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-slate-400"
                                                    }
                                                />
                                            </button>
                                        </div>

                                        {/* Name */}

                                        <h3 className="
                                            mt-5
                                            text-xl sm:text-2xl
                                            font-bold
                                            text-[#1E1B4B]
                                        ">
                                            {student.name}
                                        </h3>

                                        <p className="text-sm sm:text-base text-slate-600">
                                            {student.role}
                                        </p>

                                        {/* Location */}

                                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                            <MapPin size={16} />
                                            <span>
                                                {student.city}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {student.college}
                                            </span>
                                        </div>

                                        {/* AI MATCH */}

                                        <div className="mt-6">

                                            <div className="flex justify-between items-center text-xs sm:text-sm">
                                                <span className="font-semibold text-slate-600">
                                                    AI Match Score
                                                </span>

                                                <span className="font-bold text-[#14B8A6]">
                                                    {student.match}%
                                                </span>
                                            </div>

                                            <div className="
                                                mt-2
                                                h-2
                                                bg-slate-100
                                                rounded-full
                                                overflow-hidden
                                            ">
                                                <motion.div
                                                    initial={{
                                                        width: 0,
                                                    }}
                                                    whileInView={{
                                                        width: `${student.match}%`,
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        delay:
                                                            0.3 +
                                                            index * 0.1,
                                                    }}
                                                    className="
                                                        h-full
                                                        rounded-full
                                                        bg-gradient-to-r
                                                        from-[#14B8A6]
                                                        to-[#1E1B4B]
                                                    "
                                                />
                                            </div>
                                        </div>

                                        {/* Skills */}

                                        <div className="flex flex-wrap gap-2 mt-6">

                                            {student.skills.map(
                                                (skill) => (
                                                    <span
                                                        key={skill}
                                                        className="
                                                            px-3
                                                            py-1.5
                                                            rounded-full
                                                            bg-indigo-50
                                                            border border-indigo-100
                                                            text-[#1E1B4B]
                                                            text-xs
                                                            sm:text-sm
                                                            font-medium
                                                        "
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                        {/* Stats */}

                                        <div className="grid grid-cols-2 gap-3 mt-6">

                                            <div className="
                                                bg-slate-50
                                                rounded-2xl
                                                p-3 sm:p-4
                                                text-center
                                                border border-slate-100
                                            ">
                                                <h4 className="
                                                    text-lg sm:text-xl
                                                    font-black
                                                    text-[#1E1B4B]
                                                ">
                                                    {student.projects}
                                                </h4>

                                                <p className="text-[11px] sm:text-xs text-slate-500">
                                                    Projects
                                                </p>
                                            </div>

                                            <div className="
                                                bg-slate-50
                                                rounded-2xl
                                                p-3 sm:p-4
                                                text-center
                                                border border-slate-100
                                            ">
                                                <h4 className="
                                                    text-sm sm:text-base
                                                    font-bold
                                                    text-[#1E1B4B]
                                                ">
                                                    {student.experience}
                                                </h4>

                                                <p className="text-[11px] sm:text-xs text-slate-500">
                                                    Experience
                                                </p>
                                            </div>

                                        </div>

                                        {/* Buttons */}

                                        <div className="flex gap-2 sm:gap-3 mt-6">

                                            <button
                                                onClick={() =>
                                                    handleConnect(
                                                        student.name
                                                    )
                                                }
                                                className={`
                                                    flex-1
                                                    rounded-xl
                                                    py-3
                                                    font-semibold
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    transition
                                                    active:scale-95
                                                    ${isConnected
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-[#1E1B4B] text-white hover:bg-[#312E81]"
                                                    }
                                                `}
                                            >
                                                {isConnected ? (
                                                    <>
                                                        <Check size={18} />
                                                        Connected
                                                    </>
                                                ) : (
                                                    <>
                                                        Connect
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setSelectedStudent(
                                                        student
                                                    )
                                                }
                                                className="
                                                    w-12 sm:w-14
                                                    rounded-xl
                                                    border border-slate-200
                                                    flex
                                                    justify-center
                                                    items-center
                                                    text-slate-600
                                                    hover:bg-[#14B8A6]
                                                    hover:text-white
                                                    hover:border-[#14B8A6]
                                                    transition
                                                    active:scale-95
                                                "
                                            >
                                                <MessageCircle size={20} />
                                            </button>

                                        </div>

                                        {/* Social */}

                                        <div className="
                                            flex
                                            justify-center
                                            items-center
                                            gap-6
                                            mt-6
                                            pt-5
                                            border-t
                                            border-slate-100
                                        ">

                                            <a
                                                href={student.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="
                                                    text-slate-400
                                                    hover:text-black
                                                    transition
                                                "
                                            >
                                                <FaGithub className="text-xl" />
                                            </a>

                                            <a
                                                href={student.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="
                                                    text-slate-400
                                                    hover:text-blue-600
                                                    transition
                                                "
                                            >
                                                <FaLinkedin className="text-xl" />
                                            </a>

                                            <button
                                                onClick={() =>
                                                    handleFavorite(
                                                        student.name
                                                    )
                                                }
                                                className={`
                                                    transition
                                                    ${isFavorite
                                                        ? "text-yellow-400"
                                                        : "text-slate-400 hover:text-yellow-400"
                                                    }
                                                `}
                                            >
                                                <Star
                                                    size={20}
                                                    className={
                                                        isFavorite
                                                            ? "fill-yellow-400"
                                                            : ""
                                                    }
                                                />
                                            </button>

                                        </div>

                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    /* ================= NO RESULTS ================= */

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
                            mt-8
                            bg-white
                            rounded-3xl
                            border border-slate-200
                            p-10
                            text-center
                        "
                    >
                        <div className="
                            w-16 h-16
                            mx-auto
                            rounded-2xl
                            bg-slate-100
                            flex
                            items-center
                            justify-center
                        ">
                            <Search
                                size={28}
                                className="text-slate-400"
                            />
                        </div>

                        <h3 className="
                            mt-5
                            text-xl
                            font-bold
                            text-[#1E1B4B]
                        ">
                            No teammates found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Try another skill or search term.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setActiveSkill("All");
                            }}
                            className="
                                mt-5
                                px-5
                                py-2.5
                                rounded-xl
                                bg-[#1E1B4B]
                                text-white
                                font-semibold
                                hover:bg-[#312E81]
                                transition
                            "
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}

                {/* ================= BOTTOM CTA ================= */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="
                        mt-10 sm:mt-14
                        p-5 sm:p-7
                        rounded-3xl
                        bg-gradient-to-r
                        from-[#1E1B4B]
                        to-[#312E81]
                        text-white
                        flex flex-col
                        md:flex-row
                        items-center
                        justify-between
                        gap-5
                        shadow-xl
                    "
                >
                    <div className="flex items-center gap-4">

                        <div className="
                            w-12 h-12
                            rounded-2xl
                            bg-white/10
                            flex
                            items-center
                            justify-center
                            shrink-0
                        ">
                            <Users size={24} />
                        </div>

                        <div>
                            <h3 className="font-bold text-lg sm:text-xl">
                                Can't find the right teammate?
                            </h3>

                            <p className="text-white/70 text-sm mt-1">
                                Build your profile and let CONEXA find matches
                                for you.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            document
                                .getElementById("contact")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                        className="
                            w-full
                            md:w-auto
                            px-6
                            py-3
                            rounded-xl
                            bg-white
                            text-[#1E1B4B]
                            font-bold
                            hover:bg-slate-100
                            transition
                            whitespace-nowrap
                        "
                    >
                        Join CONEXA
                    </button>
                </motion.div>
            </div>

            {/* ================= MESSAGE MODAL ================= */}

            <AnimatePresence>
                {selectedStudent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setSelectedStudent(null);
                            setMessage("");
                        }}
                        className="
                            fixed
                            inset-0
                            z-50
                            bg-[#1E1B4B]/60
                            backdrop-blur-sm
                            flex
                            items-center
                            justify-center
                            p-4
                        "
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20,
                            }}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            className="
                                w-full
                                max-w-md
                                bg-white
                                rounded-3xl
                                p-6
                                sm:p-8
                                shadow-2xl
                            "
                        >

                            {/* Modal Header */}

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs font-semibold text-[#14B8A6] uppercase tracking-wider">
                                        Send Message
                                    </p>

                                    <h3 className="
                                        mt-1
                                        text-2xl
                                        font-black
                                        text-[#1E1B4B]
                                    ">
                                        {selectedStudent.name}
                                    </h3>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedStudent(null);
                                        setMessage("");
                                    }}
                                    className="
                                        w-9 h-9
                                        rounded-full
                                        bg-slate-100
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-slate-200
                                    "
                                >
                                    <X size={19} />
                                </button>

                            </div>

                            {/* Message */}

                            <textarea
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                rows="5"
                                placeholder={`Hi ${selectedStudent.name.split(" ")[0]}, I'd like to connect with you for an upcoming hackathon...`}
                                className="
                                    mt-6
                                    w-full
                                    resize-none
                                    rounded-2xl
                                    border border-slate-200
                                    bg-slate-50
                                    p-4
                                    outline-none
                                    text-sm
                                    focus:border-[#14B8A6]
                                    focus:ring-2
                                    focus:ring-[#14B8A6]/10
                                "
                            />

                            <button
                                onClick={() => {
                                    if (!message.trim()) return;

                                    setSelectedStudent(null);
                                    setMessage("");
                                }}
                                className="
                                    mt-4
                                    w-full
                                    py-3
                                    rounded-xl
                                    bg-[#1E1B4B]
                                    text-white
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    hover:bg-[#312E81]
                                    transition
                                "
                            >
                                <Send size={18} />
                                Send Message
                            </button>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}