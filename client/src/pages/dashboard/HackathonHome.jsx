import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Plus,
    Trophy,
    CalendarDays,
    Clock,
    Users,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Blocks,
    Cpu,
    Cloud,
    Globe,
    ChevronRight,
    Zap,
    MapPin,
    X,
    Bookmark,
    Target,
    CheckCircle,
} from "lucide-react";

const HackathonHome = () => {
    const navigate = useNavigate();

    // ============================================================
    // STATES
    // ============================================================

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTechnology, setActiveTechnology] = useState("All");
    const [activeDifficulty, setActiveDifficulty] = useState("All");
    const [activeMode, setActiveMode] = useState("All");
    const [activeScope, setActiveScope] = useState("All");
    const [activeFee, setActiveFee] = useState("All");

    // ============================================================
    // HACKATHON DATA
    // ============================================================

    const hackathons = [
        {
            id: 1,
            name: "AI Innovation Hackathon 2026",
            organization: "Tech Innovators",
            category: "AI/ML",
            difficulty: "Intermediate",
            mode: "Online",
            location: "Online",
            date: "20 - 22 Sept 2026",
            registrationDeadline: "15 Sept 2026",
            prize: "₹2,00,000",
            participants: 250,
            maxParticipants: 500,
            technologies: ["Python", "AI/ML", "React"],
            featured: true,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 2,
            name: "Future Web Challenge",
            organization: "WebTech Community",
            category: "Web Development",
            difficulty: "Beginner",
            mode: "Online",
            location: "Online",
            date: "28 - 30 Sept 2026",
            registrationDeadline: "22 Sept 2026",
            prize: "₹1,50,000",
            participants: 180,
            maxParticipants: 400,
            technologies: ["React", "JavaScript", "MongoDB"],
            featured: true,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 3,
            name: "Cyber Shield Hackathon",
            organization: "Cyber Security Club",
            category: "Cybersecurity",
            difficulty: "Advanced",
            mode: "Offline",
            location: "Pune, Maharashtra",
            date: "5 - 7 Oct 2026",
            registrationDeadline: "30 Sept 2026",
            prize: "₹2,50,000",
            participants: 120,
            maxParticipants: 300,
            technologies: ["Cybersecurity", "Python", "Linux"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 4,
            name: "Blockchain Builders 2026",
            organization: "BlockTech India",
            category: "Blockchain",
            difficulty: "Advanced",
            mode: "Hybrid",
            location: "Mumbai + Online",
            date: "10 - 12 Oct 2026",
            registrationDeadline: "3 Oct 2026",
            prize: "₹3,00,000",
            participants: 210,
            maxParticipants: 500,
            technologies: ["Blockchain", "Solidity", "Web3"],
            featured: true,
            recentlyAdded: false,
            image:
                "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 5,
            name: "IoT Smart City Challenge",
            organization: "Smart India Labs",
            category: "IoT",
            difficulty: "Intermediate",
            mode: "Offline",
            location: "Nagpur, Maharashtra",
            date: "18 - 20 Oct 2026",
            registrationDeadline: "10 Oct 2026",
            prize: "₹1,25,000",
            participants: 95,
            maxParticipants: 250,
            technologies: ["IoT", "Arduino", "Cloud"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 6,
            name: "Cloud Next Hackathon",
            organization: "Cloud Community",
            category: "Cloud",
            difficulty: "Intermediate",
            mode: "Online",
            location: "Online",
            date: "25 - 27 Oct 2026",
            registrationDeadline: "18 Oct 2026",
            prize: "₹1,75,000",
            participants: 160,
            maxParticipants: 350,
            technologies: ["AWS", "Docker", "Cloud"],
            featured: false,
            recentlyAdded: false,
            image:
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 7,
            name: "GreenTech Innovation Challenge",
            organization: "Green Future Foundation",
            category: "IoT",
            difficulty: "Beginner",
            mode: "Hybrid",
            location: "Delhi + Online",
            date: "2 - 4 Nov 2026",
            registrationDeadline: "25 Oct 2026",
            prize: "₹1,00,000",
            participants: 85,
            maxParticipants: 300,
            technologies: ["IoT", "Arduino", "Cloud"],
            featured: true,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 8,
            name: "CodeStorm India 2026",
            organization: "CodeStorm Community",
            category: "Web Development",
            difficulty: "Intermediate",
            mode: "Online",
            location: "Online",
            date: "8 - 10 Nov 2026",
            registrationDeadline: "1 Nov 2026",
            prize: "₹2,25,000",
            participants: 310,
            maxParticipants: 600,
            technologies: ["React", "JavaScript", "Node.js"],
            featured: true,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 9,
            name: "Data Science Masters Hackathon",
            organization: "Data Science India",
            category: "AI/ML",
            difficulty: "Advanced",
            mode: "Online",
            location: "Online",
            date: "12 - 14 Nov 2026",
            registrationDeadline: "5 Nov 2026",
            prize: "₹2,75,000",
            participants: 275,
            maxParticipants: 500,
            technologies: ["Python", "Machine Learning", "Data Science"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 10,
            name: "FinTech Future Hackathon",
            organization: "FinTech Innovators",
            category: "Web Development",
            difficulty: "Intermediate",
            mode: "Hybrid",
            location: "Bengaluru + Online",
            date: "18 - 20 Nov 2026",
            registrationDeadline: "10 Nov 2026",
            prize: "₹3,50,000",
            participants: 220,
            maxParticipants: 500,
            technologies: ["React", "JavaScript", "MongoDB"],
            featured: true,
            recentlyAdded: false,
            image:
                "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 11,
            name: "Women in Tech Hackathon",
            organization: "Women Tech Network",
            category: "Web Development",
            difficulty: "Beginner",
            mode: "Online",
            location: "Online",
            date: "22 - 24 Nov 2026",
            registrationDeadline: "15 Nov 2026",
            prize: "₹1,50,000",
            participants: 190,
            maxParticipants: 400,
            technologies: ["HTML", "CSS", "JavaScript"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1573496799515-eebbb63814f2?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 12,
            name: "DevOps & Cloud Challenge",
            organization: "DevOps India Community",
            category: "Cloud",
            difficulty: "Advanced",
            mode: "Online",
            location: "Online",
            date: "28 - 30 Nov 2026",
            registrationDeadline: "20 Nov 2026",
            prize: "₹2,00,000",
            participants: 145,
            maxParticipants: 350,
            technologies: ["AWS", "Docker", "Kubernetes"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 13,
            name: "Smart Healthcare Hackathon",
            organization: "HealthTech Innovators",
            category: "AI/ML",
            difficulty: "Intermediate",
            mode: "Offline",
            location: "Hyderabad, Telangana",
            date: "2 - 4 Dec 2026",
            registrationDeadline: "25 Nov 2026",
            prize: "₹2,50,000",
            participants: 130,
            maxParticipants: 300,
            technologies: ["Python", "AI/ML", "Cloud"],
            featured: true,
            recentlyAdded: false,
            image:
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 14,
            name: "Open Source Revolution",
            organization: "Open Source India",
            category: "Web Development",
            difficulty: "Intermediate",
            mode: "Online",
            location: "Online",
            date: "8 - 10 Dec 2026",
            registrationDeadline: "1 Dec 2026",
            prize: "₹1,80,000",
            participants: 240,
            maxParticipants: 500,
            technologies: ["Git", "GitHub", "JavaScript"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 15,
            name: "Cyber Defense Challenge 2026",
            organization: "CyberSec India",
            category: "Cybersecurity",
            difficulty: "Advanced",
            mode: "Offline",
            location: "Bengaluru, Karnataka",
            date: "12 - 14 Dec 2026",
            registrationDeadline: "5 Dec 2026",
            prize: "₹3,00,000",
            participants: 175,
            maxParticipants: 350,
            technologies: ["Cybersecurity", "Linux", "Python"],
            featured: true,
            recentlyAdded: false,
            image:
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 16,
            name: "NextGen Robotics Hackathon",
            organization: "Robotics India",
            category: "IoT",
            difficulty: "Advanced",
            mode: "Hybrid",
            location: "Chennai + Online",
            date: "18 - 20 Dec 2026",
            registrationDeadline: "10 Dec 2026",
            prize: "₹2,20,000",
            participants: 110,
            maxParticipants: 250,
            technologies: ["IoT", "Arduino", "Python"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 17,
            name: "Blockchain & Web3 India",
            organization: "Web3 Builders",
            category: "Blockchain",
            difficulty: "Intermediate",
            mode: "Online",
            location: "Online",
            date: "22 - 24 Dec 2026",
            registrationDeadline: "15 Dec 2026",
            prize: "₹3,25,000",
            participants: 260,
            maxParticipants: 600,
            technologies: ["Blockchain", "Solidity", "Web3"],
            featured: true,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 18,
            name: "AI for Social Good",
            organization: "Digital India Foundation",
            category: "AI/ML",
            difficulty: "Beginner",
            mode: "Hybrid",
            location: "Mumbai + Online",
            date: "5 - 7 Jan 2027",
            registrationDeadline: "28 Dec 2026",
            prize: "₹1,75,000",
            participants: 150,
            maxParticipants: 400,
            technologies: ["Python", "AI/ML", "React"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 19,
            name: "Mobile App Innovation Hackathon",
            organization: "App Developers India",
            category: "Web Development",
            difficulty: "Beginner",
            mode: "Online",
            location: "Online",
            date: "10 - 12 Jan 2027",
            registrationDeadline: "3 Jan 2027",
            prize: "₹1,40,000",
            participants: 205,
            maxParticipants: 450,
            technologies: ["JavaScript", "React", "Firebase"],
            featured: false,
            recentlyAdded: false,
            image:
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
        },
        {
            id: 20,
            name: "Cloud Computing Innovation Challenge",
            organization: "CloudTech India",
            category: "Cloud",
            difficulty: "Advanced",
            mode: "Online",
            location: "Online",
            date: "15 - 17 Jan 2027",
            registrationDeadline: "8 Jan 2027",
            prize: "₹2,80,000",
            participants: 185,
            maxParticipants: 400,
            technologies: ["AWS", "Docker", "Kubernetes"],
            featured: false,
            recentlyAdded: true,
            image:
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
    ];

    // ============================================================
    // COLLEGE / NATIONAL / INTERNATIONAL + FREE / PAID
    // ============================================================

    const hackathonMeta = {
        1: { scope: "National", fee: "Free" },
        2: { scope: "College", fee: "Free" },
        3: { scope: "National", fee: "Paid" },
        4: { scope: "International", fee: "Paid" },
        5: { scope: "College", fee: "Free" },
        6: { scope: "National", fee: "Paid" },
        7: { scope: "National", fee: "Free" },
        8: { scope: "International", fee: "Paid" },
        9: { scope: "National", fee: "Paid" },
        10: { scope: "International", fee: "Paid" },
        11: { scope: "College", fee: "Free" },
        12: { scope: "National", fee: "Paid" },
        13: { scope: "National", fee: "Free" },
        14: { scope: "International", fee: "Free" },
        15: { scope: "National", fee: "Paid" },
        16: { scope: "College", fee: "Paid" },
        17: { scope: "International", fee: "Paid" },
        18: { scope: "National", fee: "Free" },
        19: { scope: "College", fee: "Free" },
        20: { scope: "International", fee: "Paid" },
    };

    // ============================================================
    // FILTER DATA
    // ============================================================

    const technologyItems = [
        {
            name: "AI/ML",
            icon: Sparkles,
            description: "Artificial Intelligence & Machine Learning",
        },
        {
            name: "Web Development",
            icon: Globe,
            description: "Frontend, Backend & Full Stack",
        },
        {
            name: "Cybersecurity",
            icon: ShieldCheck,
            description: "Security, Privacy & Ethical Hacking",
        },
        {
            name: "Blockchain",
            icon: Blocks,
            description: "Web3, Smart Contracts & Crypto",
        },
        {
            name: "IoT",
            icon: Cpu,
            description: "Connected Devices & Smart Systems",
        },
        {
            name: "Cloud",
            icon: Cloud,
            description: "Cloud Computing & DevOps",
        },
    ];

    const difficultyItems = [
        {
            name: "Beginner",
            description: "Perfect for students getting started",
        },
        {
            name: "Intermediate",
            description: "For developers with some experience",
        },
        {
            name: "Advanced",
            description: "For experienced developers",
        },
    ];

    const modeItems = [
        {
            name: "Online",
            icon: Globe,
        },
        {
            name: "Offline",
            icon: MapPin,
        },
        {
            name: "Hybrid",
            icon: Users,
        },
    ];

    // ============================================================
    // FILTERING
    // ============================================================

    const filteredHackathons = useMemo(() => {
        return hackathons.filter((hackathon) => {
            const search = searchTerm.toLowerCase().trim();

            const meta = hackathonMeta[hackathon.id] || {
                scope: "National",
                fee: "Free",
            };

            const matchesSearch =
                search === "" ||
                hackathon.name.toLowerCase().includes(search) ||
                hackathon.organization.toLowerCase().includes(search) ||
                hackathon.category.toLowerCase().includes(search) ||
                hackathon.mode.toLowerCase().includes(search) ||
                hackathon.location.toLowerCase().includes(search) ||
                meta.scope.toLowerCase().includes(search) ||
                meta.fee.toLowerCase().includes(search) ||
                hackathon.technologies.some((technology) =>
                    technology.toLowerCase().includes(search)
                );

            const matchesTechnology =
                activeTechnology === "All" ||
                hackathon.category === activeTechnology ||
                hackathon.technologies.includes(activeTechnology);

            const matchesDifficulty =
                activeDifficulty === "All" ||
                hackathon.difficulty === activeDifficulty;

            const matchesMode =
                activeMode === "All" || hackathon.mode === activeMode;

            const matchesScope =
                activeScope === "All" || meta.scope === activeScope;

            const matchesFee =
                activeFee === "All" || meta.fee === activeFee;

            return (
                matchesSearch &&
                matchesTechnology &&
                matchesDifficulty &&
                matchesMode &&
                matchesScope &&
                matchesFee
            );
        });
    }, [
        searchTerm,
        activeTechnology,
        activeDifficulty,
        activeMode,
        activeScope,
        activeFee,
    ]);

    // ============================================================
    // SPECIAL SECTIONS
    // ============================================================

    const featuredHackathons = filteredHackathons.filter(
        (hackathon) => hackathon.featured
    );

    const upcomingHackathons = filteredHackathons.slice(0, 4);

    const closingSoonHackathons = filteredHackathons.filter(
        (hackathon) =>
            hackathon.registrationDeadline === "15 Sept 2026" ||
            hackathon.registrationDeadline === "22 Sept 2026" ||
            hackathon.registrationDeadline === "30 Sept 2026"
    );

    const recentlyAddedHackathons = filteredHackathons.filter(
        (hackathon) => hackathon.recentlyAdded
    );

    const featuredVisual =
        featuredHackathons[0] ||
        hackathons.find((hackathon) => hackathon.featured) ||
        hackathons[0];

    // ============================================================
    // CLEAR FILTERS
    // ============================================================

    const clearFilters = () => {
        setSearchTerm("");
        setActiveTechnology("All");
        setActiveDifficulty("All");
        setActiveMode("All");
        setActiveScope("All");
        setActiveFee("All");
    };

    // ============================================================
    // MOTION PRESETS
    // ============================================================

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    // ============================================================
    // HACKATHON CARD
    // ============================================================

    const HackathonCard = ({ hackathon }) => {
        const meta = hackathonMeta[hackathon.id] || {
            scope: "National",
            fee: "Free",
        };

        const participantPercentage = Math.min(
            (hackathon.participants / hackathon.maxParticipants) * 100,
            100
        );

        return (
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-teal-300 hover:shadow-[0_18px_45px_rgba(20,184,166,0.12)]"
            >
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={hackathon.image}
                        alt={hackathon.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#1e1b4b]/20 to-transparent" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {hackathon.featured && (
                            <span className="flex items-center gap-1 rounded-full bg-[#14B8A6] px-3 py-1 text-xs font-bold text-white shadow-lg shadow-teal-950/20">
                                <Sparkles size={13} />
                                Featured
                            </span>
                        )}

                        <span className="rounded-full border border-white/20 bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                            {hackathon.mode}
                        </span>
                    </div>

                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/90 text-slate-700 shadow transition hover:bg-white hover:text-[#14B8A6]"
                        title="Save Hackathon"
                    >
                        <Bookmark size={17} />
                    </motion.button>

                    <div className="absolute bottom-4 left-4 right-4">
                        <p className="mb-1 text-xs font-medium text-teal-300">
                            {hackathon.organization}
                        </p>

                        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-white">
                            {hackathon.name}
                        </h3>
                    </div>
                </div>

                <div className="p-5">
                    <div className="mb-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                            <div className="mb-1 flex items-center gap-2 text-slate-400">
                                <CalendarDays size={15} />
                                <span className="text-xs">Date</span>
                            </div>

                            <p className="text-sm font-semibold text-slate-700">
                                {hackathon.date}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                            <div className="mb-1 flex items-center gap-2 text-slate-400">
                                <Trophy size={15} />
                                <span className="text-xs">Prize Pool</span>
                            </div>

                            <p className="text-sm font-semibold text-slate-700">
                                {hackathon.prize}
                            </p>
                        </div>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                        {hackathon.technologies.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-[#312E81]"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#1E1B4B]/5 px-3 py-1 text-xs font-semibold text-[#1E1B4B]">
                            {meta.scope}
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                meta.fee === "Free"
                                    ? "bg-teal-50 text-teal-700"
                                    : "bg-slate-100 text-slate-600"
                            }`}
                        >
                            {meta.fee}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {hackathon.difficulty}
                        </span>
                    </div>

                    <div className="mb-5 flex items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Users size={16} />
                            <span>
                                {hackathon.participants}/
                                {hackathon.maxParticipants}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-right font-medium text-slate-500">
                            <Clock size={15} />
                            <span>Closing {hackathon.registrationDeadline}</span>
                        </div>
                    </div>

                    <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${participantPercentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-[#312E81] to-[#14B8A6]"
                        />
                    </div>

                    <div className="flex gap-3">
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                                navigate(`/hackathons/${hackathon.id}`)
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#14B8A6]/40 hover:bg-teal-50/60 hover:text-[#1E1B4B]"
                        >
                            View Details
                            <ArrowRight size={16} />
                        </motion.button>

                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                                navigate(
                                    `/hackathons/${hackathon.id}/register`
                                )
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#312E81] hover:shadow-lg hover:shadow-indigo-950/15"
                        >
                            Register
                            <Zap size={16} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        );
    };

    // ============================================================
    // SECTION HEADER
    // ============================================================

    const SectionHeader = ({
        icon: Icon,
        title,
        description,
        onViewAll,
    }) => (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
            <div>
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#312E81]">
                        <Icon size={19} />
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-[#1E1B4B]">
                        {title}
                    </h2>
                </div>

                <p className="text-sm text-slate-500">{description}</p>
            </div>

            {onViewAll && (
                <button
                    type="button"
                    onClick={onViewAll}
                    className="flex items-center gap-1 text-sm font-semibold text-[#14B8A6] transition hover:text-teal-700"
                >
                    View All
                    <ChevronRight size={17} />
                </button>
            )}
        </motion.div>
    );

    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* =====================================================
                HEADER
            ====================================================== */}

            <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex min-h-[72px] items-center justify-between gap-6">
                        {/* LOGO */}
                        <button
                            type="button"
                            onClick={() => navigate("/hackathons")}
                            className="flex items-center gap-3 text-left"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E1B4B] shadow-lg shadow-indigo-950/10">
                                <Trophy size={23} className="text-white" />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-[#1E1B4B]">
                                    CONEXA
                                </h1>
                                <p className="text-[10px] font-bold tracking-[0.18em] text-[#14B8A6]">
                                    HACKATHON PLATFORM
                                </p>
                            </div>
                        </button>

                        {/* NAVIGATION */}
                        <nav className="hidden items-center gap-8 lg:flex">
                            <button
                                type="button"
                                onClick={() => navigate("/hackathons")}
                                className="relative font-semibold text-[#1E1B4B]"
                            >
                                Home
                                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#14B8A6]" />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/hackathons/explore")
                                }
                                className="font-medium text-slate-600 transition hover:text-[#1E1B4B]"
                            >
                                Explore
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/my-hackathons")}
                                className="font-medium text-slate-600 transition hover:text-[#1E1B4B]"
                            >
                                My Hackathons
                            </button>
                        </nav>

                        {/* RIGHT SIDE BUTTONS */}
                        <div className="hidden items-center gap-3 md:flex">
                            <button
                                type="button"
                                onClick={() => navigate("/my-hackathons")}
                                className="rounded-xl border border-[#1E1B4B]/10 bg-indigo-50/70 px-4 py-2.5 text-sm font-semibold text-[#1E1B4B] transition hover:border-indigo-200 hover:bg-indigo-50"
                            >
                                My Hackathons
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/create-hackathon")
                                }
                                className="flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#312E81] hover:shadow-lg hover:shadow-indigo-950/15"
                            >
                                <Plus size={17} />
                                Create Hackathon
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="relative overflow-hidden bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="relative overflow-hidden rounded-[2rem] border border-indigo-900/30 bg-gradient-to-br from-[#1E1B4B] via-[#24205E] to-[#312E81] shadow-[0_30px_90px_-30px_rgba(30,27,75,0.65)]"
                        >
                            {/* Premium grid */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.09]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)",
                                    backgroundSize: "36px 36px",
                                }}
                            />

                            {/* Glow fields */}
                            <motion.div
                                animate={{
                                    x: [0, 25, 0],
                                    y: [0, -15, 0],
                                    opacity: [0.25, 0.38, 0.25],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#14B8A6]/20 blur-[90px]"
                            />

                            <motion.div
                                animate={{
                                    x: [0, -20, 0],
                                    y: [0, 20, 0],
                                    opacity: [0.16, 0.28, 0.16],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="pointer-events-none absolute -bottom-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-500/25 blur-[100px]"
                            />

                            {/* Decorative rings */}
                            <div className="pointer-events-none absolute right-[18%] top-[16%] hidden h-44 w-44 rounded-full border border-white/10 lg:block" />
                            <div className="pointer-events-none absolute right-[20%] top-[20%] hidden h-32 w-32 rounded-full border border-teal-300/10 lg:block" />

                            <div className="relative grid items-center gap-12 p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
                                {/* HERO COPY */}
                                <motion.div variants={fadeUp}>
                                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#14B8A6] text-[#1E1B4B]">
                                            <Sparkles size={13} />
                                        </span>

                                        <span className="text-xs font-bold tracking-wide text-slate-200 sm:text-sm">
                                            CONEXA HACKATHON HUB
                                        </span>
                                    </div>

                                    <h2 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                                        Turn your{" "}
                                        <span className="text-[#14B8A6]">
                                            ideas
                                        </span>{" "}
                                        into{" "}
                                        <span className="text-white">
                                            impact.
                                        </span>
                                    </h2>

                                    <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                                        Discover ambitious challenges, connect
                                        with talented builders, and create
                                        solutions that matter — all through a
                                        focused CONEXA experience.
                                    </p>

                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                        <motion.button
                                            type="button"
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() =>
                                                navigate(
                                                    "/hackathons/explore"
                                                )
                                            }
                                            className="group flex items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-6 py-3.5 text-sm font-bold text-[#1E1B4B] shadow-lg shadow-black/20 transition hover:bg-teal-300 hover:shadow-xl"
                                        >
                                            <Search size={18} />
                                            Explore Hackathons
                                            <ArrowRight
                                                size={17}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </motion.button>

                                        <motion.button
                                            type="button"
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() =>
                                                navigate(
                                                    "/create-hackathon"
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/25 hover:bg-white/15"
                                        >
                                            <Plus size={18} />
                                            Create Hackathon
                                        </motion.button>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck
                                                size={15}
                                                className="text-[#14B8A6]"
                                            />
                                            Curated opportunities
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Users
                                                size={15}
                                                className="text-[#14B8A6]"
                                            />
                                            Build with skilled teams
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Target
                                                size={15}
                                                className="text-[#14B8A6]"
                                            />
                                            Find your next challenge
                                        </div>
                                    </div>
                                </motion.div>

                                {/* FEATURED VISUAL */}
                                <motion.div
                                    variants={fadeUp}
                                    className="relative mx-auto w-full max-w-md"
                                >
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="relative"
                                    >
                                        {/* Floating prize card */}
                                        <div className="absolute -left-4 top-4 z-20 hidden w-48 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:block lg:-left-8">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6] text-[#1E1B4B]">
                                                    <Trophy size={18} />
                                                </div>

                                                <div>
                                                    <p className="text-[11px] font-medium text-slate-300">
                                                        Prize pools
                                                    </p>
                                                    <p className="text-lg font-black text-white">
                                                        ₹3.5L+
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Main featured card */}
                                        <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
                                            <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-xl">
                                                <div className="relative h-40 overflow-hidden">
                                                    <img
                                                        src={
                                                            featuredVisual.image
                                                        }
                                                        alt={
                                                            featuredVisual.name
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />

                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/80 to-transparent" />

                                                    <div className="absolute bottom-4 left-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-300">
                                                            Featured opportunity
                                                        </p>

                                                        <h3 className="mt-1 text-lg font-black text-white">
                                                            {featuredVisual.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="p-5 sm:p-6">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-xs font-medium text-slate-400">
                                                                Build • Learn •
                                                                Compete
                                                            </p>
                                                            <p className="mt-1 text-sm font-semibold text-[#1E1B4B]">
                                                                {
                                                                    featuredVisual.organization
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-[#312E81]">
                                                            <Sparkles
                                                                size={20}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                                        <div className="rounded-xl bg-slate-50 p-3">
                                                            <p className="text-[10px] font-medium text-slate-400">
                                                                Prize Pool
                                                            </p>

                                                            <p className="mt-1 text-sm font-black text-[#1E1B4B]">
                                                                {
                                                                    featuredVisual.prize
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="rounded-xl bg-slate-50 p-3">
                                                            <p className="text-[10px] font-medium text-slate-400">
                                                                Participants
                                                            </p>

                                                            <p className="mt-1 text-sm font-black text-[#1E1B4B]">
                                                                {
                                                                    featuredVisual.participants
                                                                }{" "}
                                                                /{" "}
                                                                {
                                                                    featuredVisual.maxParticipants
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {featuredVisual.technologies.map(
                                                            (item) => (
                                                                <span
                                                                    key={item}
                                                                    className="rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold text-[#312E81]"
                                                                >
                                                                    {item}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>

                                                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]"
                                                            style={{
                                                                width: `${Math.min(
                                                                    (featuredVisual.participants /
                                                                        featuredVisual.maxParticipants) *
                                                                        100,
                                                                    100
                                                                )}%`,
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between">
                                                        <span className="text-[10px] font-medium text-slate-400">
                                                            Registration open
                                                        </span>

                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-[#14B8A6]">
                                                            <CheckCircle
                                                                size={12}
                                                            />
                                                            Active
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating team card */}
                                        <div className="absolute -bottom-5 -right-3 z-20 hidden w-52 rounded-2xl border border-white/15 bg-[#1E1B4B]/95 p-4 shadow-2xl backdrop-blur-xl sm:block lg:-right-8">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/15 text-teal-300">
                                                    <Users size={18} />
                                                </div>

                                                <div>
                                                    <p className="text-[11px] text-slate-400">
                                                        Team building
                                                    </p>

                                                    <p className="text-sm font-bold text-white">
                                                        Find your people
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Journey strip */}
                            <div className="relative border-t border-white/10 bg-black/10 px-7 py-5 sm:px-10 lg:px-14">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {[
                                        {
                                            number: "01",
                                            title: "Discover",
                                            text: "Explore opportunities matched to your interests.",
                                            icon: Search,
                                        },
                                        {
                                            number: "02",
                                            title: "Build",
                                            text: "Connect with developers and form stronger teams.",
                                            icon: Blocks,
                                        },
                                        {
                                            number: "03",
                                            title: "Compete",
                                            text: "Turn ideas into real-world solutions and grow.",
                                            icon: Trophy,
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <motion.div
                                                key={item.number}
                                                whileHover={{ x: 3 }}
                                                className="group flex gap-3 rounded-2xl p-3 transition hover:bg-white/5"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[#14B8A6]">
                                                    <Icon size={17} />
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-[#14B8A6]">
                                                            {item.number}
                                                        </span>

                                                        <p className="text-sm font-bold text-white">
                                                            {item.title}
                                                        </p>
                                                    </div>

                                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                        {/* Hero statistics */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="relative -mt-1 grid gap-3 pt-5 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {[
                                {
                                    value: hackathons.length,
                                    label: "Hackathons",
                                    icon: Trophy,
                                },
                                {
                                    value: upcomingHackathons.length,
                                    label: "Upcoming",
                                    icon: CalendarDays,
                                },
                                {
                                    value: featuredHackathons.length,
                                    label: "Featured",
                                    icon: Sparkles,
                                },
                                {
                                    value: closingSoonHackathons.length,
                                    label: "Closing Soon",
                                    icon: Clock,
                                },
                            ].map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <motion.div
                                        key={stat.label}
                                        variants={fadeUp}
                                        whileHover={{ y: -4 }}
                                        className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-teal-200 hover:shadow-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#1E1B4B] transition group-hover:bg-teal-50 group-hover:text-[#14B8A6]">
                                                <Icon size={18} />
                                            </div>

                                            <div>
                                                <p className="text-xl font-black text-[#1E1B4B]">
                                                    {stat.value}
                                                </p>

                                                <p className="text-xs font-medium text-slate-500">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* ========================================================
                    SEARCH & FILTERS
                ======================================================== */}

                <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-lg sm:p-6"
                    >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                            <div className="group relative flex min-w-0 flex-1 items-center">
                                <Search
                                    size={20}
                                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition group-focus-within:text-[#14B8A6]"
                                />

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search hackathons, organizations, technologies..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-teal-300 hover:bg-white focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-50"
                                />

                                <AnimatePresence>
                                    {searchTerm && (
                                        <motion.button
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            type="button"
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                                        >
                                            <X size={17} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <div className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-indigo-200 hover:bg-indigo-50">
                                    <Search
                                        size={16}
                                        className="text-[#312E81]"
                                    />

                                    <span className="text-xs font-semibold text-slate-600">
                                        Smart Search
                                    </span>
                                </div>

                                <div className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-teal-200 hover:bg-teal-50">
                                    <Target
                                        size={16}
                                        className="text-[#14B8A6]"
                                    />

                                    <span className="text-xs font-semibold text-slate-600">
                                        Skill Match
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="font-bold text-[#1E1B4B]">
                                    Find the right hackathon
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Filter by mode, difficulty, participation
                                    level, fee and technology.
                                </p>
                            </div>

                            <p className="text-sm font-semibold text-[#14B8A6]">
                                {filteredHackathons.length} hackathons found
                            </p>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                            <div>
                                <select
                                    value={activeMode}
                                    onChange={(e) =>
                                        setActiveMode(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition hover:border-teal-300 hover:bg-teal-50/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-50"
                                >
                                    <option value="All">All Modes</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    value={activeDifficulty}
                                    onChange={(e) =>
                                        setActiveDifficulty(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition hover:border-teal-300 hover:bg-teal-50/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-50"
                                >
                                    <option value="All">All Levels</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">
                                        Intermediate
                                    </option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    value={activeScope}
                                    onChange={(e) =>
                                        setActiveScope(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition hover:border-teal-300 hover:bg-teal-50/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-50"
                                >
                                    <option value="All">
                                        All Participation
                                    </option>
                                    <option value="College">College</option>
                                    <option value="National">National</option>
                                    <option value="International">
                                        International
                                    </option>
                                </select>
                            </div>

                            <div>
                                <select
                                    value={activeFee}
                                    onChange={(e) =>
                                        setActiveFee(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition hover:border-teal-300 hover:bg-teal-50/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-50"
                                >
                                    <option value="All">All Fees</option>
                                    <option value="Free">Free</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    value={activeTechnology}
                                    onChange={(e) =>
                                        setActiveTechnology(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition hover:border-teal-300 hover:bg-teal-50/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-50"
                                >
                                    <option value="All">
                                        All Technologies
                                    </option>

                                    {technologyItems.map((technology) => (
                                        <option
                                            key={technology.name}
                                            value={technology.name}
                                        >
                                            {technology.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {(searchTerm ||
                            activeMode !== "All" ||
                            activeDifficulty !== "All" ||
                            activeScope !== "All" ||
                            activeFee !== "All" ||
                            activeTechnology !== "All") && (
                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                <p className="text-xs text-slate-500">
                                    Filters are currently active
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-red-600"
                                >
                                    <X size={15} />
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* ========================================================
                    QUICK STATISTICS
                ======================================================== */}

                <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {[
                            {
                                title: "Total Hackathons",
                                value: hackathons.length,
                                icon: Trophy,
                                description: "Available to explore",
                            },
                            {
                                title: "Upcoming",
                                value: upcomingHackathons.length,
                                icon: CalendarDays,
                                description: "Events coming soon",
                            },
                            {
                                title: "Closing Soon",
                                value: closingSoonHackathons.length,
                                icon: Clock,
                                description: "Register before deadline",
                            },
                            {
                                title: "My Registrations",
                                value: 3,
                                icon: Target,
                                description: "Hackathons you've joined",
                            },
                        ].map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div
                                    key={stat.title}
                                    variants={fadeUp}
                                    whileHover={{ y: -4 }}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-lg"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">
                                                {stat.title}
                                            </p>

                                            <p className="mt-2 text-3xl font-black text-[#1E1B4B]">
                                                {stat.value}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {stat.description}
                                            </p>
                                        </div>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#312E81]">
                                            <Icon size={21} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ACTIVE FILTERS */}

                <AnimatePresence>
                    {(searchTerm ||
                        activeTechnology !== "All" ||
                        activeDifficulty !== "All" ||
                        activeMode !== "All" ||
                        activeScope !== "All" ||
                        activeFee !== "All") && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -8 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -8 }}
                            className="mx-auto max-w-7xl overflow-hidden px-4 pt-8 sm:px-6 lg:px-8"
                        >
                            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
                                <span className="text-sm font-semibold text-slate-700">
                                    Active filters:
                                </span>

                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="flex items-center gap-1 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm"
                                    >
                                        Search: {searchTerm}
                                        <X size={13} />
                                    </button>
                                )}

                                {activeTechnology !== "All" && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveTechnology("All")
                                        }
                                        className="flex items-center gap-1 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm"
                                    >
                                        {activeTechnology}
                                        <X size={13} />
                                    </button>
                                )}

                                {activeDifficulty !== "All" && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveDifficulty("All")
                                        }
                                        className="flex items-center gap-1 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm"
                                    >
                                        {activeDifficulty}
                                        <X size={13} />
                                    </button>
                                )}

                                {activeMode !== "All" && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveMode("All")}
                                        className="flex items-center gap-1 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm"
                                    >
                                        {activeMode}
                                        <X size={13} />
                                    </button>
                                )}

                                {activeScope !== "All" && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveScope("All")}
                                        className="flex items-center gap-1 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm"
                                    >
                                        {activeScope}
                                        <X size={13} />
                                    </button>
                                )}

                                {activeFee !== "All" && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveFee("All")}
                                        className="flex items-center gap-1 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm"
                                    >
                                        {activeFee}
                                        <X size={13} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ========================================================
                    HACKATHON SECTIONS
                ======================================================== */}

                <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Featured */}
                    {featuredHackathons.length > 0 && (
                        <div className="mb-16">
                            <SectionHeader
                                icon={Sparkles}
                                title="Featured Hackathons"
                                description="Handpicked opportunities worth exploring."
                                onViewAll={() =>
                                    navigate("/hackathons/explore")
                                }
                            />

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.08 }}
                                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                            >
                                {featuredHackathons
                                    .slice(0, 6)
                                    .map((hackathon) => (
                                        <HackathonCard
                                            key={hackathon.id}
                                            hackathon={hackathon}
                                        />
                                    ))}
                            </motion.div>
                        </div>
                    )}

                    {/* Upcoming */}
                    {upcomingHackathons.length > 0 && (
                        <div className="mb-16">
                            <SectionHeader
                                icon={CalendarDays}
                                title="Upcoming Hackathons"
                                description="Plan ahead and register before the deadline."
                                onViewAll={() =>
                                    navigate("/hackathons/explore")
                                }
                            />

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.08 }}
                                className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
                            >
                                {upcomingHackathons.map((hackathon) => (
                                    <HackathonCard
                                        key={hackathon.id}
                                        hackathon={hackathon}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    )}

                    {/* Recently Added */}
                    {recentlyAddedHackathons.length > 0 && (
                        <div className="mb-16">
                            <SectionHeader
                                icon={Zap}
                                title="Recently Added"
                                description="Fresh opportunities recently added to CONEXA."
                                onViewAll={() =>
                                    navigate("/hackathons/explore")
                                }
                            />

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.08 }}
                                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                            >
                                {recentlyAddedHackathons
                                    .slice(0, 6)
                                    .map((hackathon) => (
                                        <HackathonCard
                                            key={hackathon.id}
                                            hackathon={hackathon}
                                        />
                                    ))}
                            </motion.div>
                        </div>
                    )}

                    {/* No results */}
                    {filteredHackathons.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm"
                        >
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#1E1B4B]">
                                <Search size={28} />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-[#1E1B4B]">
                                No hackathons found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Try changing your search or removing some
                                filters to discover more opportunities.
                            </p>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-6 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                            >
                                Clear Filters
                            </button>
                        </motion.div>
                    )}
                </section>

                {/* ========================================================
                    PROFESSIONAL CTA
                ======================================================== */}

                <section className="border-t border-slate-200 bg-slate-50">
                    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="relative overflow-hidden rounded-[2rem] bg-[#1E1B4B] px-7 py-10 shadow-[0_25px_70px_-30px_rgba(30,27,75,0.65)] sm:px-10 lg:px-14"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                                <div
                                    className="h-full w-full"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                                        backgroundSize: "32px 32px",
                                    }}
                                />
                            </div>

                            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#14B8A6]/15 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

                            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-2xl">
                                    <div className="mb-3 flex items-center gap-2 text-teal-300">
                                        <Sparkles size={17} />

                                        <span className="text-xs font-bold uppercase tracking-[0.18em]">
                                            Build something meaningful
                                        </span>
                                    </div>

                                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                                        Your next big idea starts with a
                                        challenge.
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-slate-300">
                                        Explore opportunities, meet talented
                                        people, and turn your skills into
                                        something real with CONEXA.
                                    </p>
                                </div>

                                <motion.button
                                    type="button"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        navigate("/hackathons/explore")
                                    }
                                    className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-6 py-3.5 text-sm font-bold text-[#1E1B4B] shadow-lg transition hover:bg-teal-300 hover:shadow-xl"
                                >
                                    Start Exploring
                                    <ArrowRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* ============================================================
                FOOTER
            ============================================================= */}

            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>
                        <p className="text-sm font-black tracking-wide text-[#1E1B4B]">
                            CONEXA
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Discover. Build. Compete. Connect.
                        </p>
                    </div>

                    <p className="text-xs text-slate-400">
                        Hackathon opportunities for the next generation of
                        builders.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HackathonHome;