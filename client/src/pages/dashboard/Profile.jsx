import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Award,
    Check,
    ChevronRight,
    Edit3,
    FileText,
    GraduationCap,
    Mail,
    MapPin,
    Save,
    Settings,
    Sparkles,
    Upload,
    Users,
    X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const PROFILE_STORAGE_KEY = "conexaProfile";

const getDefaultProfile = (user) => ({
    name: user?.name || "",
    role: "MERN Developer",
    email: user?.email || "",
    college: "",
    location: "",
    branch: "",
    year: "",

    photo: null,

    resume: null,

    github: "",
    linkedin: "",
    portfolio: "",

    availability: "Available",

    bio: "",

    skills: [],

    profileCompleted: false,
});

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // =====================================================
    // DEFAULT PROFILE
    // =====================================================

    const defaultProfile = useMemo(
        () => getDefaultProfile(user),
        [user]
    );

    // =====================================================
    // LOAD PROFILE
    // =====================================================

    const [profile, setProfile] = useState(() => {
        try {
            const savedProfile = localStorage.getItem(
                PROFILE_STORAGE_KEY
            );

            if (savedProfile) {
                return {
                    ...getDefaultProfile(user),
                    ...JSON.parse(savedProfile),
                };
            }
        } catch (error) {
            console.error("Profile loading error:", error);
        }

        return getDefaultProfile(user);
    });

    const [editForm, setEditForm] = useState(profile);

    // =====================================================
    // SYNC AUTH USER
    // =====================================================

    useEffect(() => {
        const savedProfile = localStorage.getItem(
            PROFILE_STORAGE_KEY
        );

        if (!savedProfile) {
            setProfile((prev) => ({
                ...prev,
                name: user?.name || prev.name,
                email: user?.email || prev.email,
            }));
        }
    }, [user]);

    useEffect(() => {
        setEditForm(profile);
    }, [profile]);

    // =====================================================
    // PROJECTS
    // Later backend se projects fetch kar sakte hain
    // =====================================================

    const projects = [
        {
            title: "CONEXA",
            description:
                "Hackathon teammate finding and team building platform.",
            details:
                "A MERN stack platform that helps students discover teammates, build teams and participate in hackathons.",
            skills: ["React", "Node.js", "MongoDB"],
            icon: "🚀",
        },
        {
            title: "Team Project",
            description:
                "Collaborative project developed with a student team.",
            details:
                "A collaborative full-stack project focused on teamwork, Git workflow and building a practical web application.",
            skills: ["Full Stack", "Git"],
            icon: "🤝",
        },
    ];

    // =====================================================
    // PROFILE COMPLETION
    // =====================================================

    const calculateCompletion = () => {
        const fields = [
            profile.name,
            profile.role,
            profile.email,
            profile.college,
            profile.location,
            profile.branch,
            profile.year,
            profile.bio,
            profile.photo,
            profile.resume,
            profile.github,
            profile.linkedin,
            profile.portfolio,
            profile.skills?.length > 0,
        ];

        const completed = fields.filter(Boolean).length;

        return Math.round(
            (completed / fields.length) * 100
        );
    };

    const completion = calculateCompletion();

    // =====================================================
    // EDIT CHANGE
    // =====================================================

    const handleEditChange = (field, value) => {
        setEditForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // =====================================================
    // PHOTO UPLOAD
    // =====================================================

    const handleEditPhotoUpload = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Photo must be less than 5 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            handleEditChange("photo", reader.result);
        };

        reader.readAsDataURL(file);
    };

    // =====================================================
    // RESUME UPLOAD
    // =====================================================

    const handleEditResumeUpload = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Please upload PDF only.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Resume must be less than 5 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            handleEditChange("resume", {
                name: file.name,
                size: file.size,
                type: file.type,
                data: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    // =====================================================
    // SAVE PROFILE
    // =====================================================

    const handleSaveProfile = () => {
        const skills =
            typeof editForm.skills === "string"
                ? editForm.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean)
                : editForm.skills || [];

        const updatedProfile = {
            ...editForm,
            skills,
            profileCompleted: true,
        };

        setProfile(updatedProfile);

        localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify(updatedProfile)
        );

        setShowEditModal(false);

        alert("Profile updated successfully!");
    };

    // =====================================================
    // INITIALS
    // =====================================================

    const initials = useMemo(() => {
        const name = profile.name || "User";

        return name
            .split(" ")
            .filter(Boolean)
            .map((item) => item[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }, [profile.name]);

    // =====================================================
    // AVAILABILITY
    // =====================================================

    const availability =
        profile.availability || "Available";

    const availabilityClass =
        availability === "Busy"
            ? "bg-red-50 text-red-600"
            : availability === "Looking for Team"
                ? "bg-blue-50 text-blue-600"
                : "bg-green-50 text-green-600";

    // =====================================================
    // OPEN EDIT
    // =====================================================

    const openEditModal = () => {
        setEditForm({
            ...profile,
            skills: profile.skills || [],
        });

        setShowEditModal(true);
    };

    // =====================================================
    // DOWNLOAD RESUME
    // =====================================================

    const handleResumeView = () => {
        if (!profile.resume?.data) {
            alert("Resume file is not available.");
            return;
        }

        const newWindow = window.open();

        if (newWindow) {
            newWindow.document.write(`
                <html>
                    <head>
                        <title>${profile.resume.name}</title>
                    </head>
                    <body style="margin:0">
                        <iframe
                            src="${profile.resume.data}"
                            style="width:100%;height:100vh;border:none;"
                        ></iframe>
                    </body>
                </html>
            `);

            newWindow.document.close();
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1E1B4B]">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">

                <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

                    <div className="min-w-0">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B] text-lg shadow-sm">
                                👤
                            </div>

                            <div className="min-w-0">
                                <h1 className="truncate text-lg font-bold sm:text-2xl">
                                    My Profile
                                </h1>

                                <p className="hidden text-sm text-slate-500 sm:block">
                                    Manage and showcase your CONEXA profile
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="flex shrink-0 gap-2 sm:gap-3">

                        <button
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold shadow-sm transition hover:border-[#1E1B4B] hover:bg-slate-50 sm:px-5"
                        >
                            <ArrowLeft
                                size={16}
                                className="transition group-hover:-translate-x-1"
                            />

                            <span className="hidden sm:inline">
                                Dashboard
                            </span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/settings")
                            }
                            className="flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#312E81] sm:px-5"
                        >
                            <Settings size={16} />

                            <span className="hidden sm:inline">
                                Settings
                            </span>
                        </button>

                    </div>

                </div>
            </header>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

                {/* =====================================================
                    PROFILE HERO
                ===================================================== */}

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    {/* COVER */}

                    <div className="relative h-36 overflow-hidden bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#19B5A5] sm:h-48">

                        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />

                        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/5" />

                        <div className="absolute left-4 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:left-6 sm:top-6">
                            <Sparkles size={13} />
                            CONEXA Profile
                        </div>

                    </div>

                    {/* PROFILE INFO */}

                    <div className="px-5 pb-6 sm:px-8 sm:pb-8">

                        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 lg:flex-row lg:items-end lg:justify-between">

                            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">

                                {/* AVATAR */}

                                <div className="relative shrink-0">

                                    {profile.photo ? (
                                        <img
                                            src={profile.photo}
                                            alt="Profile"
                                            className="h-24 w-24 rounded-full border-[6px] border-white object-cover shadow-xl sm:h-28 sm:w-28"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-white bg-gradient-to-br from-[#1E1B4B] to-[#3559D5] text-2xl font-black text-white shadow-xl sm:h-28 sm:w-28 sm:text-3xl">
                                            {initials}
                                        </div>
                                    )}

                                    <div
                                        className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white ${availability === "Busy"
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                            }`}
                                    />

                                </div>

                                {/* NAME */}

                                <div className="min-w-0 sm:pb-2">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h2 className="break-words text-2xl font-black sm:text-3xl">
                                            {profile.name || "Your Name"}
                                        </h2>

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${availabilityClass}`}
                                        >
                                            {availability.toUpperCase()}
                                        </span>

                                    </div>

                                    <p className="mt-1 font-medium text-slate-500">
                                        {profile.role || "Add your role"}
                                    </p>

                                    <div className="mt-2 flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:flex-wrap sm:gap-x-4">

                                        <span className="flex min-w-0 items-center gap-1">
                                            <MapPin size={13} />
                                            <span className="truncate">
                                                {profile.location || "Location not added"}
                                            </span>
                                        </span>

                                        <span className="flex min-w-0 items-center gap-1">
                                            <Mail size={13} />
                                            <span className="truncate">
                                                {profile.email || "Email not added"}
                                            </span>
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* EDIT BUTTON */}

                            <button
                                onClick={openEditModal}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#312E81] sm:w-fit"
                            >
                                <Edit3 size={16} />
                                Edit Profile
                            </button>

                        </div>

                        {/* STATS */}

                        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

                            <ProfileStat
                                value={`${completion}%`}
                                label="Profile Score"
                                icon="📊"
                            />

                            <ProfileStat
                                value="18"
                                label="Hackathons"
                                icon="💻"
                            />

                            <ProfileStat
                                value="8"
                                label="Active Teams"
                                icon="🤝"
                            />

                            <ProfileStat
                                value="12"
                                label="Achievements"
                                icon="🏆"
                            />

                        </div>

                    </div>
                </section>

                {/* =====================================================
                    CONTENT
                ===================================================== */}

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* LEFT */}

                    <div className="space-y-6 lg:col-span-2">

                        {/* ABOUT */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h3 className="text-xl font-bold">
                                        About Me
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        A little about your journey
                                    </p>
                                </div>

                                <span
                                    className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${availabilityClass}`}
                                >
                                    <span className="h-2 w-2 rounded-full bg-current" />
                                    {availability}
                                </span>

                            </div>

                            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                                {profile.bio ||
                                    "Add your introduction from Edit Profile."}
                            </p>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">

                                <InfoItem
                                    icon={<GraduationCap size={17} />}
                                    label="Education"
                                    value={
                                        profile.branch &&
                                            profile.year
                                            ? `${profile.branch} • ${profile.year}`
                                            : "Not added"
                                    }
                                />

                                <InfoItem
                                    icon={<MapPin size={17} />}
                                    label="Location"
                                    value={
                                        profile.location ||
                                        "Not added"
                                    }
                                />

                            </div>
                        </section>

                        {/* SKILLS */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                            <div className="flex items-center justify-between gap-3">

                                <div>
                                    <h3 className="text-xl font-bold">
                                        Skills
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Technologies you're comfortable with
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-xl bg-[#1E1B4B]/5 px-3 py-2 text-xs font-bold">
                                    {profile.skills?.length || 0} Skills
                                </span>

                            </div>

                            {profile.skills?.length > 0 ? (
                                <div className="mt-5 flex flex-wrap gap-2.5">

                                    {profile.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-[#1E1B4B] transition hover:border-[#312E81] hover:bg-[#1E1B4B] hover:text-white sm:text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}

                                </div>
                            ) : (
                                <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center text-sm text-slate-400">
                                    No skills added yet.
                                </div>
                            )}

                        </section>

                        {/* PROJECTS */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                            <div className="flex items-center justify-between gap-3">

                                <div>
                                    <h3 className="text-xl font-bold">
                                        🚀 Projects
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Things you've built
                                    </p>
                                </div>

                                <span className="shrink-0 text-xs font-semibold text-slate-400">
                                    {projects.length} Projects
                                </span>

                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">

                                {projects.map((project) => (
                                    <button
                                        key={project.title}
                                        onClick={() =>
                                            setSelectedProject(project)
                                        }
                                        className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#312E81]/20 hover:bg-white hover:shadow-lg"
                                    >

                                        <div className="flex items-start justify-between">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                                                {project.icon}
                                            </div>

                                            <ChevronRight
                                                size={18}
                                                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1E1B4B]"
                                            />

                                        </div>

                                        <h4 className="mt-4 text-lg font-bold">
                                            {project.title}
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {project.description}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">

                                            {project.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-500"
                                                >
                                                    {skill}
                                                </span>
                                            ))}

                                        </div>

                                    </button>
                                ))}

                            </div>

                        </section>

                    </div>

                    {/* RIGHT */}

                    <div className="space-y-6">

                        {/* PROFILE COMPLETION */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <h3 className="font-bold">
                                        Profile Completion
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Improve your visibility
                                    </p>
                                </div>

                                <span className="text-xl font-black">
                                    {completion}%
                                </span>

                            </div>

                            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">

                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#19B5A5] transition-all duration-700"
                                    style={{
                                        width: `${completion}%`,
                                    }}
                                />

                            </div>

                            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#1E1B4B]/5 p-4">

                                <span className="text-xl">
                                    💡
                                </span>

                                <p className="text-xs leading-5 text-slate-500">
                                    Complete your profile to get better AI
                                    team recommendations.
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    navigate("/complete-profile")
                                }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
                            >
                                <Edit3 size={15} />
                                Complete Profile
                            </button>

                        </section>

                        {/* EDUCATION */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                    <GraduationCap size={21} />
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Education
                                    </h3>

                                    <p className="text-xs text-slate-400">
                                        Academic background
                                    </p>
                                </div>

                            </div>

                            <div className="mt-5">

                                <h4 className="font-semibold">
                                    B.Tech – Computer Science
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    {profile.college ||
                                        "College not added"}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    2023 – 2027
                                </p>

                            </div>

                        </section>

                        {/* ACHIEVEMENTS */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between gap-3">

                                <div className="flex items-center gap-2">
                                    <Award size={19} />

                                    <h3 className="font-bold">
                                        Achievements
                                    </h3>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate("/achievements")
                                    }
                                    className="flex items-center gap-1 text-xs font-bold text-[#19A99A] transition hover:text-[#1E1B4B]"
                                >
                                    View All
                                    <ArrowRight size={13} />
                                </button>

                            </div>

                            <AchievementItem
                                icon="🥇"
                                bg="bg-yellow-100"
                                title="Hackathon Explorer"
                                description="Participated in 10+ hackathons"
                            />

                            <AchievementItem
                                icon="🚀"
                                bg="bg-purple-100"
                                title="Team Builder"
                                description="Built 5 successful teams"
                            />

                            <AchievementItem
                                icon="🔥"
                                bg="bg-orange-100"
                                title="7 Day Streak"
                                description="Completed daily challenges"
                            />

                        </section>

                        {/* SOCIAL */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h3 className="font-bold">
                                Connect
                            </h3>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <a
                                    href={
                                        profile.github ||
                                        "https://github.com/"
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold transition hover:bg-slate-50"
                                >
                                    <FaGithub />
                                    GitHub
                                </a>

                                <a
                                    href={
                                        profile.linkedin ||
                                        "https://linkedin.com/"
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold transition hover:bg-slate-50"
                                >
                                    <FaLinkedin />
                                    LinkedIn
                                </a>

                            </div>

                            {profile.portfolio && (
                                <a
                                    href={profile.portfolio}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold transition hover:bg-slate-50"
                                >
                                    🌐
                                    Portfolio
                                </a>
                            )}

                        </section>

                        {/* RESUME */}

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                    <FileText
                                        size={21}
                                        className="text-[#1E1B4B]"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Resume
                                    </h3>

                                    <p className="text-xs text-slate-400">
                                        Your uploaded resume
                                    </p>
                                </div>

                            </div>

                            {profile.resume ? (
                                <div className="mt-4 rounded-2xl bg-slate-50 p-4">

                                    <div className="flex items-center justify-between gap-3">

                                        <div className="flex min-w-0 items-center gap-3">

                                            <FileText
                                                size={20}
                                                className="shrink-0 text-[#1E1B4B]"
                                            />

                                            <p className="truncate text-sm font-semibold">
                                                {profile.resume.name}
                                            </p>

                                        </div>

                                        {profile.resume.data && (
                                            <button
                                                onClick={handleResumeView}
                                                className="shrink-0 rounded-lg bg-[#1E1B4B] px-3 py-2 text-xs font-semibold text-white hover:bg-[#312E81]"
                                            >
                                                View
                                            </button>
                                        )}

                                    </div>

                                </div>
                            ) : (
                                <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                                    No resume uploaded yet.
                                </p>
                            )}

                        </section>

                    </div>
                </div>

                {/* =====================================================
                    BOTTOM CTA
                ===================================================== */}

                <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] p-6 text-white shadow-lg sm:p-7">

                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <div className="flex items-center gap-2">
                                <Users size={18} />

                                <h3 className="text-lg font-bold">
                                    Ready to build your next team?
                                </h3>
                            </div>

                            <p className="mt-1 text-sm text-white/70">
                                Find talented teammates who match your skills.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/find-teammates")
                            }
                            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1E1B4B] transition hover:-translate-y-0.5 hover:bg-slate-100"
                        >
                            Find Teammates
                            <ArrowRight size={16} />
                        </button>

                    </div>
                </section>

            </main>

            {/* =====================================================
                EDIT PROFILE MODAL
            ===================================================== */}

            {showEditModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setShowEditModal(false)
                    }
                >

                    <div
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {/* HEADER */}

                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">

                            <div className="min-w-0">

                                <h3 className="text-xl font-bold">
                                    Edit Profile
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Update your CONEXA profile information
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setShowEditModal(false)
                                }
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* PHOTO + RESUME */}

                        <div className="border-b border-slate-200 p-5 sm:p-7">

                            <div className="grid gap-6 sm:grid-cols-2">

                                {/* PHOTO */}

                                <div>

                                    <label className="text-sm font-semibold">
                                        Profile Photo
                                    </label>

                                    <div className="mt-3 flex items-center gap-4">

                                        {editForm.photo ? (
                                            <div className="relative">

                                                <img
                                                    src={editForm.photo}
                                                    alt="Profile"
                                                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleEditChange(
                                                            "photo",
                                                            null
                                                        )
                                                    }
                                                    className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    <X size={14} />
                                                </button>

                                            </div>
                                        ) : (
                                            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-slate-300 hover:border-[#14B8A6]">

                                                <Upload
                                                    size={24}
                                                    className="text-slate-400"
                                                />

                                                <span className="mt-1 text-[10px] text-slate-400">
                                                    Upload
                                                </span>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={
                                                        handleEditPhotoUpload
                                                    }
                                                />

                                            </label>
                                        )}

                                    </div>

                                    <p className="mt-2 text-xs text-slate-400">
                                        JPG, PNG or WEBP • Max 5 MB
                                    </p>

                                </div>

                                {/* RESUME */}

                                <div>

                                    <label className="text-sm font-semibold">
                                        Resume
                                    </label>

                                    {editForm.resume ? (
                                        <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">

                                            <div className="flex min-w-0 items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">

                                                    <FileText
                                                        size={20}
                                                        className="text-[#1E1B4B]"
                                                    />

                                                </div>

                                                <div className="min-w-0">

                                                    <p className="truncate text-sm font-semibold">
                                                        {editForm.resume.name}
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        PDF Resume
                                                    </p>

                                                </div>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEditChange(
                                                        "resume",
                                                        null
                                                    )
                                                }
                                                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-500 hover:bg-red-100"
                                            >
                                                <X size={16} />
                                            </button>

                                        </div>
                                    ) : (
                                        <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 p-4 hover:border-[#14B8A6]">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">

                                                <Upload
                                                    size={20}
                                                    className="text-[#1E1B4B]"
                                                />

                                            </div>

                                            <div>

                                                <p className="text-sm font-semibold">
                                                    Upload Resume
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    PDF only • Max 5 MB
                                                </p>

                                            </div>

                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                hidden
                                                onChange={
                                                    handleEditResumeUpload
                                                }
                                            />

                                        </label>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* FORM */}

                        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">

                            <InputField
                                label="Full Name"
                                value={editForm.name}
                                onChange={(value) =>
                                    handleEditChange(
                                        "name",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="Role"
                                value={editForm.role}
                                onChange={(value) =>
                                    handleEditChange(
                                        "role",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="Email"
                                type="email"
                                value={editForm.email}
                                onChange={(value) =>
                                    handleEditChange(
                                        "email",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="College"
                                value={editForm.college}
                                onChange={(value) =>
                                    handleEditChange(
                                        "college",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="Branch"
                                value={editForm.branch}
                                onChange={(value) =>
                                    handleEditChange(
                                        "branch",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="Year"
                                value={editForm.year}
                                onChange={(value) =>
                                    handleEditChange(
                                        "year",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="Location"
                                value={editForm.location}
                                onChange={(value) =>
                                    handleEditChange(
                                        "location",
                                        value
                                    )
                                }
                            />

                            <div>

                                <label className="text-sm font-semibold">
                                    Availability
                                </label>

                                <select
                                    value={
                                        editForm.availability ||
                                        "Available"
                                    }
                                    onChange={(e) =>
                                        handleEditChange(
                                            "availability",
                                            e.target.value
                                        )
                                    }
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
                                >
                                    <option>
                                        Available
                                    </option>

                                    <option>
                                        Looking for Team
                                    </option>

                                    <option>
                                        Busy
                                    </option>
                                </select>

                            </div>

                            <InputField
                                label="GitHub URL"
                                value={editForm.github}
                                onChange={(value) =>
                                    handleEditChange(
                                        "github",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="LinkedIn URL"
                                value={editForm.linkedin}
                                onChange={(value) =>
                                    handleEditChange(
                                        "linkedin",
                                        value
                                    )
                                }
                            />

                            <InputField
                                label="Portfolio URL"
                                value={editForm.portfolio}
                                onChange={(value) =>
                                    handleEditChange(
                                        "portfolio",
                                        value
                                    )
                                }
                            />

                            {/* SKILLS */}

                            <div className="sm:col-span-2">

                                <label className="text-sm font-semibold">
                                    Skills
                                </label>

                                <input
                                    value={
                                        Array.isArray(
                                            editForm.skills
                                        )
                                            ? editForm.skills.join(
                                                ", "
                                            )
                                            : editForm.skills || ""
                                    }
                                    onChange={(e) =>
                                        handleEditChange(
                                            "skills",
                                            e.target.value
                                        )
                                    }
                                    placeholder="React, Node.js, MongoDB..."
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Separate skills with commas.
                                </p>

                            </div>

                            {/* BIO */}

                            <div className="sm:col-span-2">

                                <label className="text-sm font-semibold">
                                    About Me
                                </label>

                                <textarea
                                    value={
                                        editForm.bio || ""
                                    }
                                    onChange={(e) =>
                                        handleEditChange(
                                            "bio",
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    placeholder="Tell something about yourself..."
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
                                />

                            </div>

                        </div>

                        {/* FOOTER */}

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:justify-end sm:p-6">

                            <button
                                onClick={() =>
                                    setShowEditModal(false)
                                }
                                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSaveProfile}
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#312E81]"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* =====================================================
                PROJECT MODAL
            ===================================================== */}

            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedProject(null)
                    }
                >

                    <div
                        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] p-7 text-white">

                            <div className="flex items-center justify-between">

                                <span className="text-4xl">
                                    {selectedProject.icon}
                                </span>

                                <button
                                    onClick={() =>
                                        setSelectedProject(null)
                                    }
                                    className="rounded-xl bg-white/10 p-2 transition hover:bg-white/20"
                                >
                                    <X size={18} />
                                </button>

                            </div>

                            <h3 className="mt-5 text-2xl font-bold">
                                {selectedProject.title}
                            </h3>

                        </div>

                        <div className="p-6">

                            <p className="text-sm leading-7 text-slate-500">
                                {selectedProject.details}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">

                                {selectedProject.skills.map(
                                    (skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedProject(null)
                                }
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] py-3 text-sm font-semibold text-white transition hover:bg-[#312E81]"
                            >
                                Close
                                <Check size={16} />
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

/* =====================================================
   PROFILE STAT
===================================================== */

function ProfileStat({ value, label, icon }) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-md sm:p-5">

            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg shadow-sm transition group-hover:scale-110">
                {icon}
            </div>

            <p className="mt-2 text-xl font-black sm:text-2xl">
                {value}
            </p>

            <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                {label}
            </p>

        </div>
    );
}

/* =====================================================
   INFO ITEM
===================================================== */

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-slate-50 p-4">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#312E81] shadow-sm">
                {icon}
            </div>

            <div className="min-w-0">

                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                    {value}
                </p>

            </div>

        </div>
    );
}

/* =====================================================
   ACHIEVEMENT ITEM
===================================================== */

function AchievementItem({
    icon,
    bg,
    title,
    description,
}) {
    return (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition hover:bg-slate-50">

            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} text-xl`}
            >
                {icon}
            </div>

            <div className="min-w-0">

                <p className="truncate text-sm font-semibold">
                    {title}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                    {description}
                </p>

            </div>

        </div>
    );
}

/* =====================================================
   INPUT FIELD
===================================================== */

function InputField({
    label,
    value,
    onChange,
    type = "text",
}) {
    return (
        <div>

            <label className="text-sm font-semibold">
                {label}
            </label>

            <input
                type={type}
                value={value || ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
            />

        </div>
    );
}