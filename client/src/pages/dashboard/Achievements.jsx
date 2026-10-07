import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    Medal,
    Award,
    Star,
    Users,
    Code2,
    ArrowLeft,
    Plus,
    X,
    Trash2,
    Pencil,
    CalendarDays,
    Tag,
    CheckCircle2,
    Search,
    ChevronRight,
    Sparkles,
    Target,
    TrendingUp,
    Save,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

// =====================================================
// DEFAULT ACHIEVEMENTS
// =====================================================

const defaultAchievements = [
    {
        id: 1,
        title: "Hackathon Winner",
        description:
            "Won 1st position in a college-level hackathon.",
        category: "Hackathon",
        date: "August 2026",
        icon: Trophy,
    },
    {
        id: 2,
        title: "MERN Developer",
        description:
            "Successfully completed multiple full-stack MERN projects.",
        category: "Development",
        date: "July 2026",
        icon: Code2,
    },
    {
        id: 3,
        title: "Team Leader",
        description:
            "Led a student team and successfully completed a project.",
        category: "Leadership",
        date: "June 2026",
        icon: Users,
    },
    {
        id: 4,
        title: "Coding Champion",
        description:
            "Completed multiple coding challenges and improved problem-solving skills.",
        category: "Coding",
        date: "May 2026",
        icon: Medal,
    },
];

// =====================================================
// CATEGORIES
// =====================================================

const categories = [
    "All",
    "Hackathon",
    "Development",
    "Leadership",
    "Coding",
    "Achievement",
];

// =====================================================
// PAGE
// =====================================================

export default function Achievements() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [achievementList, setAchievementList] =
        useState(defaultAchievements);

    const [selectedAchievement, setSelectedAchievement] =
        useState(null);

    const [editingAchievement, setEditingAchievement] =
        useState(null);

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [search, setSearch] = useState("");

    const [activeCategory, setActiveCategory] =
        useState("All");

    // =====================================================
    // FILTER
    // =====================================================

    const filteredAchievements = useMemo(() => {
        return achievementList.filter((achievement) => {
            const matchesSearch =
                achievement.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                achievement.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                activeCategory === "All" ||
                achievement.category ===
                activeCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        achievementList,
        search,
        activeCategory,
    ]);

    // =====================================================
    // CREATE
    // =====================================================

    const handleCreateAchievement = (
        newAchievement
    ) => {
        const achievement = {
            ...newAchievement,
            id: Date.now(),
        };

        setAchievementList((prev) => [
            achievement,
            ...prev,
        ]);

        setShowCreateModal(false);

        setSelectedAchievement(
            achievement
        );
    };

    // =====================================================
    // EDIT
    // =====================================================

    const handleEditAchievement = (
        updatedAchievement
    ) => {
        setAchievementList((prev) =>
            prev.map((item) =>
                item.id ===
                    updatedAchievement.id
                    ? updatedAchievement
                    : item
            )
        );

        setSelectedAchievement(
            updatedAchievement
        );

        setEditingAchievement(null);
    };

    // =====================================================
    // DELETE
    // =====================================================

    const confirmDelete = () => {
        if (!selectedAchievement) return;

        setAchievementList((prev) =>
            prev.filter(
                (item) =>
                    item.id !==
                    selectedAchievement.id
            )
        );

        setSelectedAchievement(null);
        setShowDeleteModal(false);
    };

    // =====================================================
    // OPEN EDIT
    // =====================================================

    const openEdit = (achievement) => {
        setEditingAchievement(
            achievement
        );

        setSelectedAchievement(null);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#1E1B4B]">

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* =====================================================
                MAIN
            ===================================================== */}

            <div
                className={`min-h-screen transition-all duration-300 ${sidebarOpen
                        ? "lg:ml-72"
                        : "lg:ml-24"
                    }`}
            >

                {/* =================================================
                    TOPBAR
                ================================================= */}

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <main className="p-4 sm:p-6 lg:p-8">

                    {/* =================================================
                        HERO HEADER
                    ================================================= */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="relative mb-7 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] p-6 text-white shadow-xl sm:p-8"
                    >

                        {/* DECORATION */}

                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

                        <div className="absolute -bottom-28 left-1/2 h-64 w-64 rounded-full bg-white/5" />

                        <div className="relative">

                            {/* BACK */}

                            <button
                                onClick={() =>
                                    navigate(
                                        "/dashboard"
                                    )
                                }
                                className="mb-6 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur-sm transition hover:bg-white/20"
                            >
                                <ArrowLeft
                                    size={15}
                                />
                                Dashboard
                            </button>

                            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

                                <div className="max-w-2xl">

                                    <div className="flex items-center gap-2">

                                        <Sparkles
                                            size={
                                                16
                                            }
                                        />

                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                                            Your Progress
                                        </span>

                                    </div>

                                    <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                                        Achievements
                                    </h1>

                                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                                        Celebrate your milestones,
                                        showcase your skills and
                                        keep building your
                                        CONEXA journey.
                                    </p>

                                </div>

                                {/* CREATE */}

                                <button
                                    onClick={() =>
                                        setShowCreateModal(
                                            true
                                        )
                                    }
                                    className="group flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-[#1E1B4B] shadow-lg transition hover:-translate-y-0.5"
                                >
                                    <Plus
                                        size={18}
                                        className="transition-transform group-hover:rotate-90"
                                    />
                                    Create Achievement
                                </button>

                            </div>

                        </div>

                    </motion.section>

                    {/* =================================================
                        STATS
                    ================================================= */}

                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <AchievementStat
                            icon={
                                <Trophy
                                    size={21}
                                />
                            }
                            title="Achievements"
                            value={
                                achievementList.length
                            }
                            subtitle="Total milestones"
                        />

                        <AchievementStat
                            icon={
                                <Target
                                    size={21}
                                />
                            }
                            title="Completion"
                            value="100%"
                            subtitle="Achievement progress"
                        />

                        <AchievementStat
                            icon={
                                <TrendingUp
                                    size={21}
                                />
                            }
                            title="Points"
                            value="850"
                            subtitle="Points earned"
                        />

                        <AchievementStat
                            icon={
                                <Star
                                    size={21}
                                />
                            }
                            title="Rank"
                            value="#24"
                            subtitle="Current position"
                        />

                    </div>

                    {/* =================================================
                        TOOLBAR
                    ================================================= */}

                    <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            {/* SEARCH */}

                            <div className="relative w-full lg:max-w-sm">

                                <Search
                                    size={17}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder="Search achievements..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#1E1B4B] focus:bg-white focus:ring-2 focus:ring-[#1E1B4B]/10"
                                />

                            </div>

                            {/* CATEGORIES */}

                            <div className="flex gap-2 overflow-x-auto pb-1">

                                {categories.map(
                                    (category) => (
                                        <button
                                            key={
                                                category
                                            }
                                            onClick={() =>
                                                setActiveCategory(
                                                    category
                                                )
                                            }
                                            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${activeCategory ===
                                                    category
                                                    ? "bg-[#1E1B4B] text-white shadow-sm"
                                                    : "bg-slate-50 text-slate-500 hover:bg-[#1E1B4B]/5 hover:text-[#1E1B4B]"
                                                }`}
                                        >
                                            {
                                                category
                                            }
                                        </button>
                                    )
                                )}

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        SECTION HEADING
                    ================================================= */}

                    <div className="mb-5 flex items-end justify-between">

                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#14B8A6]">
                                Milestones
                            </p>

                            <h2 className="mt-1 text-2xl font-black">
                                Your Journey
                            </h2>

                        </div>

                        <span className="rounded-full bg-[#1E1B4B]/5 px-3 py-1.5 text-xs font-bold">
                            {
                                filteredAchievements.length
                            }{" "}
                            Results
                        </span>

                    </div>

                    {/* =================================================
                        ACHIEVEMENTS
                    ================================================= */}

                    {filteredAchievements.length >
                        0 ? (
                        <div className="relative">

                            {/* TIMELINE LINE */}

                            <div className="absolute bottom-0 left-[30px] top-0 hidden w-px bg-slate-200 md:block" />

                            <div className="space-y-5">

                                {filteredAchievements.map(
                                    (
                                        achievement,
                                        index
                                    ) => (
                                        <AchievementJourneyCard
                                            key={
                                                achievement.id
                                            }
                                            achievement={
                                                achievement
                                            }
                                            index={
                                                index
                                            }
                                            onClick={() =>
                                                setSelectedAchievement(
                                                    achievement
                                                )
                                            }
                                        />
                                    )
                                )}

                            </div>

                        </div>
                    ) : (
                        <NoResults
                            onCreate={() =>
                                setShowCreateModal(
                                    true
                                )
                            }
                        />
                    )}

                </main>

            </div>

            {/* =====================================================
                DETAILS MODAL
            ===================================================== */}

            <AnimatePresence>

                {selectedAchievement && (
                    <AchievementDetailsModal
                        achievement={
                            selectedAchievement
                        }
                        onClose={() =>
                            setSelectedAchievement(
                                null
                            )
                        }
                        onEdit={() =>
                            openEdit(
                                selectedAchievement
                            )
                        }
                        onDelete={() =>
                            setShowDeleteModal(
                                true
                            )
                        }
                    />
                )}

            </AnimatePresence>

            {/* =====================================================
                CREATE MODAL
            ===================================================== */}

            <AnimatePresence>

                {showCreateModal && (
                    <AchievementFormModal
                        mode="create"
                        onClose={() =>
                            setShowCreateModal(
                                false
                            )
                        }
                        onSave={
                            handleCreateAchievement
                        }
                    />
                )}

            </AnimatePresence>

            {/* =====================================================
                EDIT MODAL
            ===================================================== */}

            <AnimatePresence>

                {editingAchievement && (
                    <AchievementFormModal
                        mode="edit"
                        achievement={
                            editingAchievement
                        }
                        onClose={() =>
                            setEditingAchievement(
                                null
                            )
                        }
                        onSave={
                            handleEditAchievement
                        }
                    />
                )}

            </AnimatePresence>

            {/* =====================================================
                DELETE MODAL
            ===================================================== */}

            <AnimatePresence>

                {showDeleteModal &&
                    selectedAchievement && (
                        <DeleteModal
                            achievement={
                                selectedAchievement
                            }
                            onCancel={() =>
                                setShowDeleteModal(
                                    false
                                )
                            }
                            onConfirm={
                                confirmDelete
                            }
                        />
                    )}

            </AnimatePresence>

        </div>
    );
}

// =====================================================
// ACHIEVEMENT JOURNEY CARD
// =====================================================

function AchievementJourneyCard({
    achievement,
    index,
    onClick,
}) {
    const Icon = achievement.icon;

    return (
        <motion.button
            type="button"
            initial={{
                opacity: 0,
                x: -15,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                duration: 0.35,
                delay: index * 0.06,
            }}
            whileHover={{
                y: -3,
            }}
            onClick={onClick}
            className="group relative flex w-full gap-4 text-left md:gap-6"
        >

            {/* TIMELINE ICON */}

            <div className="relative z-10 hidden shrink-0 md:block">

                <div className="flex h-[62px] w-[62px] items-center justify-center rounded-2xl border-4 border-[#F8FAFC] bg-[#1E1B4B] text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#14B8A6]">
                    <Icon size={25} />
                </div>

            </div>

            {/* CARD */}

            <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 group-hover:border-[#1E1B4B]/20 group-hover:shadow-xl sm:p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex gap-4">

                        {/* MOBILE ICON */}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B]/5 text-[#1E1B4B] md:hidden">
                            <Icon size={22} />
                        </div>

                        <div>

                            <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-lg font-black text-[#1E1B4B] sm:text-xl">
                                    {
                                        achievement.title
                                    }
                                </h3>

                                <CheckCircle2
                                    size={17}
                                    className="text-[#14B8A6]"
                                />

                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">

                                <span className="inline-flex items-center gap-1 rounded-full bg-[#14B8A6]/10 px-3 py-1 text-[10px] font-bold text-[#14B8A6]">
                                    <Tag
                                        size={10}
                                    />
                                    {
                                        achievement.category
                                    }
                                </span>

                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                    <CalendarDays
                                        size={12}
                                    />
                                    {
                                        achievement.date
                                    }
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all group-hover:bg-[#1E1B4B] group-hover:text-white">
                        <ChevronRight
                            size={17}
                        />
                    </div>

                </div>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
                    {
                        achievement.description
                    }
                </p>

                {/* FOOTER */}

                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">

                            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]" />

                        </div>

                        <span className="text-[11px] font-bold text-[#14B8A6]">
                            Completed
                        </span>

                    </div>

                    <span className="text-[11px] font-semibold text-slate-400">
                        View details →
                    </span>

                </div>

            </div>

        </motion.button>
    );
}

// =====================================================
// STAT
// =====================================================

function AchievementStat({
    icon,
    title,
    value,
    subtitle,
}) {
    return (
        <motion.div
            whileHover={{
                y: -4,
            }}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg"
        >

            <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E1B4B]/5 text-[#1E1B4B] transition group-hover:bg-[#1E1B4B] group-hover:text-white">
                    {icon}
                </div>

                <TrendingUp
                    size={15}
                    className="text-[#14B8A6]"
                />

            </div>

            <p className="mt-5 text-xs font-semibold text-slate-500">
                {title}
            </p>

            <h3 className="mt-1 text-2xl font-black text-[#1E1B4B]">
                {value}
            </h3>

            <p className="mt-1 text-[11px] text-slate-400">
                {subtitle}
            </p>

        </motion.div>
    );
}

// =====================================================
// DETAILS MODAL
// =====================================================

function AchievementDetailsModal({
    achievement,
    onClose,
    onEdit,
    onDelete,
}) {
    const Icon = achievement.icon;

    return (
        <ModalWrapper onClose={onClose}>

            <div className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-2xl">

                {/* HEADER */}

                <div className="relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] p-6 text-white sm:p-8">

                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                    >
                        <X size={18} />
                    </button>

                    <div className="relative">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                            <Icon size={31} />
                        </div>

                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                            Achievement
                        </p>

                        <h2 className="mt-2 pr-10 text-2xl font-black sm:text-3xl">
                            {achievement.title}
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">
                                {achievement.category}
                            </span>

                            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">
                                {achievement.date}
                            </span>

                        </div>

                    </div>

                </div>

                {/* BODY */}

                <div className="p-6 sm:p-8">

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Description
                        </p>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            {
                                achievement.description
                            }
                        </p>

                    </div>

                    {/* STATUS */}

                    <div className="mt-5 rounded-2xl border border-slate-200 p-5">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    size={18}
                                    className="text-[#14B8A6]"
                                />

                                <span className="text-sm font-bold">
                                    Completed
                                </span>

                            </div>

                            <span className="text-sm font-black text-[#14B8A6]">
                                100%
                            </span>

                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]" />

                        </div>

                    </div>

                    {/* BUTTONS */}

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                        <button
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#1E1B4B] transition hover:bg-slate-50"
                        >
                            <X size={16} />
                            Close
                        </button>

                        <button
                            onClick={onEdit}
                            className="flex items-center justify-center gap-2 rounded-xl border border-[#1E1B4B]/10 bg-[#1E1B4B]/5 px-4 py-3 text-sm font-bold text-[#1E1B4B] transition hover:bg-[#1E1B4B] hover:text-white"
                        >
                            <Pencil
                                size={16}
                            />
                            Edit
                        </button>

                        <button
                            onClick={onDelete}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                        >
                            <Trash2
                                size={16}
                            />
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </ModalWrapper>
    );
}

// =====================================================
// CREATE / EDIT FORM MODAL
// =====================================================

function AchievementFormModal({
    mode,
    achievement,
    onClose,
    onSave,
}) {
    const isEdit = mode === "edit";

    const [form, setForm] = useState({
        id: achievement?.id || null,
        title:
            achievement?.title || "",
        description:
            achievement?.description || "",
        category:
            achievement?.category ||
            "Achievement",
        date:
            achievement?.date ||
            "September 2026",
        icon:
            achievement?.icon || Award,
    });

    const [error, setError] =
        useState("");

    const updateField = (
        field,
        value
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            setError(
                "Please enter an achievement title."
            );
            return;
        }

        if (!form.description.trim()) {
            setError(
                "Please enter an achievement description."
            );
            return;
        }

        setError("");

        onSave({
            ...form,
            title: form.title.trim(),
            description:
                form.description.trim(),
        });
    };

    return (
        <ModalWrapper onClose={onClose}>

            <motion.form
                onSubmit={handleSubmit}
                initial={{
                    opacity: 0,
                    scale: 0.96,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
            >

                {/* HEADER */}

                <div className="relative overflow-hidden bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] px-6 py-6 text-white sm:px-8">

                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                    >
                        <X size={18} />
                    </button>

                    <div className="relative">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                            {isEdit ? (
                                <Pencil
                                    size={23}
                                />
                            ) : (
                                <Plus
                                    size={23}
                                />
                            )}
                        </div>

                        <h2 className="mt-4 text-2xl font-black">
                            {isEdit
                                ? "Edit Achievement"
                                : "Create Achievement"}
                        </h2>

                        <p className="mt-1 text-sm text-white/70">
                            {isEdit
                                ? "Update your achievement details."
                                : "Add a new milestone to your journey."}
                        </p>

                    </div>

                </div>

                {/* FORM */}

                <div className="space-y-5 p-6 sm:p-8">

                    {error && (
                        <div className="rounded-xl border border-[#1E1B4B]/10 bg-[#1E1B4B]/5 p-3 text-xs font-semibold text-[#1E1B4B]">
                            {error}
                        </div>
                    )}

                    {/* TITLE */}

                    <FormInput
                        label="Achievement Title"
                        value={form.title}
                        placeholder="Example: Hackathon Winner"
                        onChange={(value) =>
                            updateField(
                                "title",
                                value
                            )
                        }
                    />

                    {/* CATEGORY + DATE */}

                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>

                            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                Category
                            </label>

                            <select
                                value={
                                    form.category
                                }
                                onChange={(e) =>
                                    updateField(
                                        "category",
                                        e.target
                                            .value
                                    )
                                }
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1E1B4B] focus:ring-2 focus:ring-[#1E1B4B]/10"
                            >

                                {categories
                                    .filter(
                                        (
                                            item
                                        ) =>
                                            item !==
                                            "All"
                                    )
                                    .map(
                                        (
                                            category
                                        ) => (
                                            <option
                                                key={
                                                    category
                                                }
                                            >
                                                {
                                                    category
                                                }
                                            </option>
                                        )
                                    )}

                            </select>

                        </div>

                        <FormInput
                            label="Date"
                            value={form.date}
                            placeholder="September 2026"
                            onChange={(value) =>
                                updateField(
                                    "date",
                                    value
                                )
                            }
                        />

                    </div>

                    {/* DESCRIPTION */}

                    <div>

                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Description
                        </label>

                        <textarea
                            value={
                                form.description
                            }
                            onChange={(e) =>
                                updateField(
                                    "description",
                                    e.target
                                        .value
                                )
                            }
                            rows={5}
                            placeholder="Describe your achievement..."
                            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#1E1B4B] focus:ring-2 focus:ring-[#1E1B4B]/10"
                        />

                    </div>

                    {/* ICON */}

                    <div>

                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Achievement Icon
                        </label>

                        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">

                            <IconOption
                                icon={Trophy}
                                selected={
                                    form.icon ===
                                    Trophy
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Trophy
                                    )
                                }
                            />

                            <IconOption
                                icon={Medal}
                                selected={
                                    form.icon ===
                                    Medal
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Medal
                                    )
                                }
                            />

                            <IconOption
                                icon={Award}
                                selected={
                                    form.icon ===
                                    Award
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Award
                                    )
                                }
                            />

                            <IconOption
                                icon={Star}
                                selected={
                                    form.icon ===
                                    Star
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Star
                                    )
                                }
                            />

                            <IconOption
                                icon={Users}
                                selected={
                                    form.icon ===
                                    Users
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Users
                                    )
                                }
                            />

                            <IconOption
                                icon={Code2}
                                selected={
                                    form.icon ===
                                    Code2
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Code2
                                    )
                                }
                            />

                            <IconOption
                                icon={Target}
                                selected={
                                    form.icon ===
                                    Target
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Target
                                    )
                                }
                            />

                            <IconOption
                                icon={Sparkles}
                                selected={
                                    form.icon ===
                                    Sparkles
                                }
                                onClick={() =>
                                    updateField(
                                        "icon",
                                        Sparkles
                                    )
                                }
                            />

                        </div>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:justify-end sm:p-6">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#1E1B4B] transition hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#312E81]"
                    >
                        {isEdit ? (
                            <Save size={16} />
                        ) : (
                            <Plus size={16} />
                        )}

                        {isEdit
                            ? "Save Changes"
                            : "Create Achievement"}
                    </button>

                </div>

            </motion.form>

        </ModalWrapper>
    );
}

// =====================================================
// FORM INPUT
// =====================================================

function FormInput({
    label,
    value,
    placeholder,
    onChange,
}) {
    return (
        <div>

            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {label}
            </label>

            <input
                value={value}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                placeholder={placeholder}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E1B4B] focus:ring-2 focus:ring-[#1E1B4B]/10"
            />

        </div>
    );
}

// =====================================================
// ICON OPTION
// =====================================================

function IconOption({
    icon: Icon,
    selected,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex h-11 items-center justify-center rounded-xl border transition ${selected
                    ? "border-[#1E1B4B] bg-[#1E1B4B] text-white shadow-md"
                    : "border-slate-200 bg-slate-50 text-[#1E1B4B] hover:border-[#1E1B4B]/30 hover:bg-[#1E1B4B]/5"
                }`}
        >
            <Icon size={19} />
        </button>
    );
}

// =====================================================
// DELETE MODAL
// =====================================================

function DeleteModal({
    achievement,
    onCancel,
    onConfirm,
}) {
    return (
        <ModalWrapper onClose={onCancel}>

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl sm:p-8"
            >

                <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E1B4B] text-white">
                        <Trash2 size={25} />
                    </div>

                    <button
                        onClick={onCancel}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
                    >
                        <X size={17} />
                    </button>

                </div>

                <h2 className="mt-6 text-2xl font-black text-[#1E1B4B]">
                    Delete Achievement?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Are you sure you want to delete{" "}
                    <span className="font-bold text-[#1E1B4B]">
                        "{achievement.title}"
                    </span>
                    ? This action cannot be undone.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                    <button
                        onClick={onCancel}
                        className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-[#1E1B4B] transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>

                </div>

            </motion.div>

        </ModalWrapper>
    );
}

// =====================================================
// MODAL WRAPPER
// =====================================================

function ModalWrapper({
    children,
    onClose,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#1E1B4B]/70 p-4 backdrop-blur-sm"
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="flex w-full items-center justify-center py-6"
            >
                {children}
            </div>
        </motion.div>
    );
}

// =====================================================
// NO RESULTS
// =====================================================

function NoResults({
    onCreate,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm"
        >

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1E1B4B]/5 text-[#1E1B4B]">
                <Trophy size={34} />
            </div>

            <h3 className="mt-5 text-xl font-black">
                No achievements found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try another search or category,
                or create a new achievement.
            </p>

            <button
                onClick={onCreate}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
            >
                <Plus size={17} />
                Create Achievement
            </button>

        </motion.div>
    );
}