import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    ArrowRight,
    Check,
    GraduationCap,
    MapPin,
    Save,
    Upload,
    User,
    X,
    FileText,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const PROFILE_STORAGE_KEY = "conexaProfile";

const API_URL = "http://localhost:5000/api/profile";

const defaultProfile = {
    name: "",
    role: "MERN Developer",
    email: "",
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
};

export default function CompleteProfile() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [formData, setFormData] = useState(defaultProfile);

    const [errors, setErrors] = useState({});

    const [saving, setSaving] = useState(false);

    // =====================================================
    // LOAD EXISTING PROFILE
    // =====================================================

    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem(
                PROFILE_STORAGE_KEY
            );

            if (savedProfile) {
                const parsedProfile =
                    JSON.parse(savedProfile);

                setFormData({
                    ...defaultProfile,
                    ...parsedProfile,
                });
            } else {
                setFormData((prev) => ({
                    ...prev,
                    name: user?.name || "",
                    email: user?.email || "",
                }));
            }
        } catch (error) {
            console.error(
                "Complete profile loading error:",
                error
            );

            setFormData((prev) => ({
                ...prev,
                name: user?.name || "",
                email: user?.email || "",
            }));
        }
    }, [user]);

    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    // =====================================================
    // PHOTO UPLOAD
    // =====================================================

    const handlePhotoUpload = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload JPG, PNG or WEBP image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Photo must be less than 5 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            handleChange("photo", reader.result);
        };

        reader.readAsDataURL(file);
    };

    // =====================================================
    // RESUME UPLOAD
    // =====================================================

    const handleResumeUpload = (event) => {
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
            handleChange("resume", {
                name: file.name,
                size: file.size,
                type: file.type,
                data: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    // =====================================================
    // REMOVE PHOTO
    // =====================================================

    const removePhoto = () => {
        handleChange("photo", null);
    };

    // =====================================================
    // REMOVE RESUME
    // =====================================================

    const removeResume = () => {
        handleChange("resume", null);
    };

    // =====================================================
    // VALIDATION
    // =====================================================

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name?.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email?.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.college?.trim()) {
            newErrors.college =
                "College name is required";
        }

        if (!formData.branch?.trim()) {
            newErrors.branch = "Branch is required";
        }

        if (!formData.year?.trim()) {
            newErrors.year = "Year is required";
        }

        if (!formData.location?.trim()) {
            newErrors.location =
                "Location is required";
        }

        if (!formData.bio?.trim()) {
            newErrors.bio =
                "Please add a short introduction";
        }

        if (
            !formData.skills ||
            formData.skills.length === 0
        ) {
            newErrors.skills =
                "Add at least one skill";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =====================================================
    // SAVE PROFILE - BACKEND + MONGODB
    // =====================================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        try {
            setSaving(true);

            // Get logged-in user ID
            const userId =
                user?._id || user?.id;

            if (!userId) {
                alert(
                    "User ID not found. Please login again."
                );

                return;
            }

            const updatedProfile = {
                ...formData,

                userId,

                name:
                    formData.name?.trim() || "",

                role:
                    formData.role?.trim() ||
                    "MERN Developer",

                email:
                    formData.email?.trim() || "",

                college:
                    formData.college?.trim() || "",

                location:
                    formData.location?.trim() || "",

                branch:
                    formData.branch?.trim() || "",

                year:
                    formData.year?.trim() || "",

                bio:
                    formData.bio?.trim() || "",

                github:
                    formData.github?.trim() || "",

                linkedin:
                    formData.linkedin?.trim() || "",

                portfolio:
                    formData.portfolio?.trim() || "",

                skills: Array.isArray(
                    formData.skills
                )
                    ? formData.skills
                    : [],

                profileCompleted: true,
            };

            console.log(
                "Sending profile to backend:",
                updatedProfile
            );

            // =================================================
            // SEND DATA TO BACKEND
            // =================================================

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        updatedProfile
                    ),
                }
            );

            const data =
                await response.json();

            console.log(
                "Backend response:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to save profile"
                );
            }

            // =================================================
            // SAVE LOCAL COPY
            // =================================================

            localStorage.setItem(
                PROFILE_STORAGE_KEY,
                JSON.stringify(
                    data.profile ||
                    updatedProfile
                )
            );

            alert(
                "Profile completed successfully!"
            );

            // =================================================
            // GO TO PROFILE
            // =================================================

            navigate("/profile");

        } catch (error) {
            console.error(
                "Profile save error:",
                error
            );

            alert(
                error.message ||
                "Something went wrong while saving profile."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // SKILLS INPUT
    // =====================================================

    const skillsText = Array.isArray(
        formData.skills
    )
        ? formData.skills.join(", ")
        : "";

    const handleSkillsChange = (value) => {
        const skills = value
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);

        handleChange("skills", skills);
    };

    // =====================================================
    // PROGRESS
    // =====================================================

    const calculateProgress = () => {
        const fields = [
            formData.name,
            formData.role,
            formData.email,
            formData.college,
            formData.location,
            formData.branch,
            formData.year,
            formData.bio,
            formData.photo,
            formData.resume,
            formData.github,
            formData.linkedin,
            formData.portfolio,
            formData.skills?.length > 0,
        ];

        const completed =
            fields.filter(Boolean).length;

        return Math.round(
            (completed / fields.length) * 100
        );
    };

    const progress = calculateProgress();

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1E1B4B]">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">

                <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/profile")
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <div>
                            <h1 className="text-lg font-bold sm:text-2xl">
                                Complete Profile
                            </h1>

                            <p className="hidden text-sm text-slate-500 sm:block">
                                Build your CONEXA profile
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-[#1E1B4B]/5 px-3 py-2">

                        <span className="text-xs font-semibold text-slate-500">
                            Profile
                        </span>

                        <span className="text-sm font-black">
                            {progress}%
                        </span>

                    </div>

                </div>

            </header>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

                {/* =====================================================
                    PROGRESS
                ===================================================== */}

                <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="flex items-center justify-between gap-4">

                        <div>

                            <h2 className="font-bold">
                                Profile Progress
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Complete your profile to improve teammate recommendations.
                            </p>

                        </div>

                        <span className="text-xl font-black">
                            {progress}%
                        </span>

                    </div>

                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#19B5A5] transition-all duration-500"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </section>

                <form onSubmit={handleSubmit}>

                    {/* =====================================================
                        BASIC INFORMATION
                    ===================================================== */}

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <SectionHeader
                            icon={<User size={20} />}
                            title="Basic Information"
                            description="Tell us about yourself."
                        />

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">

                            <FormInput
                                label="Full Name"
                                required
                                value={formData.name}
                                onChange={(value) =>
                                    handleChange(
                                        "name",
                                        value
                                    )
                                }
                                placeholder="Enter your full name"
                                error={errors.name}
                            />

                            <FormInput
                                label="Professional Role"
                                value={formData.role}
                                onChange={(value) =>
                                    handleChange(
                                        "role",
                                        value
                                    )
                                }
                                placeholder="MERN Developer"
                            />

                            <FormInput
                                label="Email"
                                required
                                type="email"
                                value={formData.email}
                                onChange={(value) =>
                                    handleChange(
                                        "email",
                                        value
                                    )
                                }
                                placeholder="your@email.com"
                                error={errors.email}
                            />

                            <FormInput
                                label="Location"
                                required
                                value={formData.location}
                                onChange={(value) =>
                                    handleChange(
                                        "location",
                                        value
                                    )
                                }
                                placeholder="Nagpur, Maharashtra"
                                error={errors.location}
                                icon={
                                    <MapPin size={15} />
                                }
                            />

                        </div>

                    </section>

                    {/* =====================================================
                        EDUCATION
                    ===================================================== */}

                    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <SectionHeader
                            icon={
                                <GraduationCap
                                    size={20}
                                />
                            }
                            title="Education"
                            description="Add your academic details."
                        />

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">

                            <FormInput
                                label="College / University"
                                required
                                value={formData.college}
                                onChange={(value) =>
                                    handleChange(
                                        "college",
                                        value
                                    )
                                }
                                placeholder="G.H. Raisoni University"
                                error={errors.college}
                            />

                            <FormInput
                                label="Branch"
                                required
                                value={formData.branch}
                                onChange={(value) =>
                                    handleChange(
                                        "branch",
                                        value
                                    )
                                }
                                placeholder="Computer Science"
                                error={errors.branch}
                            />

                            <div>

                                <label className="text-sm font-semibold">

                                    Year

                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>

                                </label>

                                <select
                                    value={
                                        formData.year
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "year",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10 ${errors.year
                                            ? "border-red-400"
                                            : "border-slate-200"
                                        }`}
                                >

                                    <option value="">
                                        Select Year
                                    </option>

                                    <option value="1st Year">
                                        1st Year
                                    </option>

                                    <option value="2nd Year">
                                        2nd Year
                                    </option>

                                    <option value="3rd Year">
                                        3rd Year
                                    </option>

                                    <option value="4th Year">
                                        4th Year
                                    </option>

                                </select>

                                {errors.year && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.year}
                                    </p>
                                )}

                            </div>

                            <div>

                                <label className="text-sm font-semibold">
                                    Availability
                                </label>

                                <select
                                    value={
                                        formData.availability
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "availability",
                                            e.target.value
                                        )
                                    }
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
                                >

                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Looking for Team">
                                        Looking for Team
                                    </option>

                                    <option value="Busy">
                                        Busy
                                    </option>

                                </select>

                            </div>

                        </div>

                    </section>

                    {/* =====================================================
                        ABOUT
                    ===================================================== */}

                    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <SectionHeader
                            icon={<User size={20} />}
                            title="About Me"
                            description="Write a short introduction."
                        />

                        <div className="mt-6">

                            <label className="text-sm font-semibold">

                                Bio

                                <span className="ml-1 text-red-500">
                                    *
                                </span>

                            </label>

                            <textarea
                                rows={5}
                                value={
                                    formData.bio || ""
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "bio",
                                        e.target.value
                                    )
                                }
                                placeholder="Tell other students about yourself, your interests, experience and what type of projects you enjoy..."
                                className={`mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10 ${errors.bio
                                        ? "border-red-400"
                                        : "border-slate-200"
                                    }`}
                            />

                            {errors.bio && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.bio}
                                </p>
                            )}

                        </div>

                    </section>

                    {/* =====================================================
                        SKILLS
                    ===================================================== */}

                    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <SectionHeader
                            icon={<Check size={20} />}
                            title="Skills"
                            description="Add technologies you know."
                        />

                        <div className="mt-6">

                            <label className="text-sm font-semibold">

                                Your Skills

                                <span className="ml-1 text-red-500">
                                    *
                                </span>

                            </label>

                            <input
                                value={skillsText}
                                onChange={(e) =>
                                    handleSkillsChange(
                                        e.target.value
                                    )
                                }
                                placeholder="React, Node.js, MongoDB, Java, Git..."
                                className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10 ${errors.skills
                                        ? "border-red-400"
                                        : "border-slate-200"
                                    }`}
                            />

                            {errors.skills ? (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.skills}
                                </p>
                            ) : (
                                <p className="mt-1 text-xs text-slate-400">
                                    Separate skills using commas.
                                </p>
                            )}

                            {formData.skills?.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">

                                    {formData.skills.map(
                                        (skill, index) => (
                                            <span
                                                key={`${skill}-${index}`}
                                                className="rounded-full bg-[#1E1B4B]/5 px-3 py-1.5 text-xs font-semibold text-[#1E1B4B]"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}

                                </div>
                            )}

                        </div>

                    </section>

                    {/* =====================================================
                        SOCIAL LINKS
                    ===================================================== */}

                    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <SectionHeader
                            icon={
                                <FaGithub size={20} />
                            }
                            title="Social & Portfolio"
                            description="Help teammates know more about your work."
                        />

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">

                            <FormInput
                                label="GitHub URL"
                                value={
                                    formData.github
                                }
                                onChange={(value) =>
                                    handleChange(
                                        "github",
                                        value
                                    )
                                }
                                placeholder="https://github.com/username"
                                icon={
                                    <FaGithub size={15} />
                                }
                            />

                            <FormInput
                                label="LinkedIn URL"
                                value={
                                    formData.linkedin
                                }
                                onChange={(value) =>
                                    handleChange(
                                        "linkedin",
                                        value
                                    )
                                }
                                placeholder="https://linkedin.com/in/username"
                                icon={
                                    <FaLinkedin
                                        size={15}
                                    />
                                }
                            />

                            <div className="sm:col-span-2">

                                <FormInput
                                    label="Portfolio URL"
                                    value={
                                        formData.portfolio
                                    }
                                    onChange={(value) =>
                                        handleChange(
                                            "portfolio",
                                            value
                                        )
                                    }
                                    placeholder="https://yourportfolio.com"
                                />

                            </div>

                        </div>

                    </section>

                    {/* =====================================================
                        PHOTO + RESUME
                    ===================================================== */}

                    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <SectionHeader
                            icon={
                                <Upload size={20} />
                            }
                            title="Profile Photo & Resume"
                            description="Upload files to complete your profile."
                        />

                        <div className="mt-6 grid gap-6 sm:grid-cols-2">

                            {/* PHOTO */}

                            <div>

                                <label className="text-sm font-semibold">
                                    Profile Photo
                                </label>

                                {formData.photo ? (

                                    <div className="mt-3 flex items-center gap-4">

                                        <div className="relative">

                                            <img
                                                src={
                                                    formData.photo
                                                }
                                                alt="Profile preview"
                                                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                                            />

                                            <button
                                                type="button"
                                                onClick={
                                                    removePhoto
                                                }
                                                className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                            >
                                                <X
                                                    size={14}
                                                />
                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <label className="mt-3 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-[#14B8A6] hover:bg-white">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">

                                            <Upload
                                                size={22}
                                                className="text-[#1E1B4B]"
                                            />

                                        </div>

                                        <p className="mt-3 text-sm font-semibold">
                                            Upload Profile Photo
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            JPG, PNG, WEBP • Max 5 MB
                                        </p>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={
                                                handlePhotoUpload
                                            }
                                        />

                                    </label>

                                )}

                            </div>

                            {/* RESUME */}

                            <div>

                                <label className="text-sm font-semibold">
                                    Resume
                                </label>

                                {formData.resume ? (

                                    <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">

                                        <div className="flex items-center justify-between gap-3">

                                            <div className="flex min-w-0 items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">

                                                    <FileText
                                                        size={21}
                                                        className="text-[#1E1B4B]"
                                                    />

                                                </div>

                                                <div className="min-w-0">

                                                    <p className="truncate text-sm font-semibold">
                                                        {
                                                            formData
                                                                .resume
                                                                .name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        PDF Resume
                                                    </p>

                                                </div>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={
                                                    removeResume
                                                }
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-500 hover:bg-red-100"
                                            >
                                                <X
                                                    size={16}
                                                />
                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <label className="mt-3 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-[#14B8A6] hover:bg-white">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">

                                            <FileText
                                                size={22}
                                                className="text-[#1E1B4B]"
                                            />

                                        </div>

                                        <p className="mt-3 text-sm font-semibold">
                                            Upload Resume
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            PDF only • Max 5 MB
                                        </p>

                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            hidden
                                            onChange={
                                                handleResumeUpload
                                            }
                                        />

                                    </label>

                                )}

                            </div>

                        </div>

                    </section>

                    {/* =====================================================
                        SAVE SECTION
                    ===================================================== */}

                    <section className="mt-6 rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] p-6 text-white shadow-lg sm:p-7">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <h3 className="text-xl font-bold">
                                    Almost Done! 🚀
                                </h3>

                                <p className="mt-1 text-sm text-white/70">
                                    Save your profile and start finding teammates.
                                </p>

                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/profile"
                                        )
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1E1B4B] transition hover:-translate-y-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    <Save size={17} />

                                    {saving
                                        ? "Saving..."
                                        : "Save Profile"}

                                    {!saving && (
                                        <ArrowRight
                                            size={16}
                                        />
                                    )}

                                </button>

                            </div>

                        </div>

                    </section>

                </form>

            </main>

        </div>
    );
}

/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
    icon,
    title,
    description,
}) {
    return (
        <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B]/5 text-[#1E1B4B]">

                {icon}

            </div>

            <div>

                <h2 className="text-lg font-bold">
                    {title}
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                    {description}
                </p>

            </div>

        </div>
    );
}

/* =====================================================
   FORM INPUT
===================================================== */

function FormInput({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    error,
    icon,
}) {
    return (
        <div>

            <label className="flex items-center gap-1 text-sm font-semibold">

                {icon && (
                    <span className="text-slate-400">
                        {icon}
                    </span>
                )}

                {label}

                {required && (
                    <span className="text-red-500">
                        *
                    </span>
                )}

            </label>

            <input
                type={type}
                value={value || ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10 ${error
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
            />

            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}