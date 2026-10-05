import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ArrowLeft,
    Building2,
    Mail,
    MapPin,
    Globe,

    Save,
    User,
    Camera,
    CheckCircle2,
    BriefcaseBusiness,
    FileText,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000/api";

export default function StakeholderProfile() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organizationName: "",
        location: "",
        description: "",
        website: "",
        linkedin: "",
        role: "",
    });

    // =====================================================
    // LOAD USER DATA
    // =====================================================

    useEffect(() => {
        const storedUser = JSON.parse(
            localStorage.getItem("user") || "null"
        );

        const currentUser = user || storedUser;

        if (currentUser) {
            setFormData((prev) => ({
                ...prev,
                name: currentUser.name || "",
                email: currentUser.email || "",
                organizationName:
                    currentUser.organizationName || "",
                location:
                    currentUser.location || "",
                description:
                    currentUser.description || "",
                website:
                    currentUser.website || "",
                linkedin:
                    currentUser.linkedin || "",
                role:
                    currentUser.role || "",
            }));
        }
    }, [user]);

    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSaved(false);
        setError("");
    };

    // =====================================================
    // SAVE PROFILE
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSaved(false);

            const token = localStorage.getItem("token");

            /*
             * NOTE:
             * This endpoint will be added to backend next:
             *
             * PUT /api/stakeholder/profile
             */

            const response = await axios.put(
                `${API_URL}/stakeholder/profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUser =
                response.data?.user ||
                response.data?.data;

            if (updatedUser) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );
            }

            setSaved(true);

        } catch (err) {
            console.error(
                "Stakeholder profile update error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // PROFILE INITIAL
    // =====================================================

    const initial =
        formData.name
            ?.charAt(0)
            ?.toUpperCase() || "S";

    return (
        <div className="min-h-screen bg-[#F8FAFC]">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="border-b border-slate-200 bg-white">

                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 sm:px-6">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/stakeholder-dashboard"
                            )
                        }
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#14B8A6]"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </button>

                    <div className="hidden items-center gap-2 sm:flex">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50">
                            <BriefcaseBusiness
                                size={18}
                                className="text-[#14B8A6]"
                            />
                        </div>

                        <span className="text-sm font-black text-[#1E1B4B]">
                            Stakeholder Profile
                        </span>

                    </div>

                </div>

            </header>


            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-6">

                {/* PAGE TITLE */}

                <div className="mb-8">

                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">

                        <Sparkles size={14} />

                        PROFILE MANAGEMENT

                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-[#1E1B4B] sm:text-4xl">
                        Your Stakeholder Profile
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Build a trusted profile so students can
                        understand your organization and the
                        opportunities you provide.
                    </p>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}


                {/* SUCCESS */}

                {saved && (
                    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">

                        <CheckCircle2 size={18} />

                        Profile updated successfully.

                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                        {/* =================================================
                            LEFT PROFILE CARD
                        ================================================= */}

                        <section className="lg:col-span-4">

                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                                {/* COVER */}

                                <div className="relative h-28 bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#14B8A6]">

                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

                                    <div className="absolute -bottom-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-teal-300/10" />

                                </div>


                                {/* PROFILE */}

                                <div className="relative px-6 pb-6">

                                    <div className="-mt-12 flex justify-center">

                                        <div className="relative">

                                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-[#1E1B4B] text-3xl font-black text-white shadow-lg">

                                                {initial}

                                            </div>

                                            <button
                                                type="button"
                                                className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-[#14B8A6] text-white shadow-md transition hover:bg-teal-700"
                                                title="Change profile image"
                                            >
                                                <Camera size={16} />
                                            </button>

                                        </div>

                                    </div>


                                    <div className="mt-4 text-center">

                                        <h2 className="text-xl font-black text-[#1E1B4B]">
                                            {formData.name ||
                                                "Stakeholder"}
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {formData.role ||
                                                "Stakeholder"}
                                        </p>

                                    </div>


                                    {/* VERIFIED */}

                                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700">

                                        <CheckCircle2 size={17} />

                                        Verified Stakeholder

                                    </div>


                                    {/* INFO */}

                                    <div className="mt-5 space-y-3">

                                        <ProfileInfo
                                            icon={Mail}
                                            value={
                                                formData.email ||
                                                "No email"
                                            }
                                        />

                                        <ProfileInfo
                                            icon={MapPin}
                                            value={
                                                formData.location ||
                                                "Location not added"
                                            }
                                        />

                                        <ProfileInfo
                                            icon={Building2}
                                            value={
                                                formData.organizationName ||
                                                "Organization not added"
                                            }
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* PROFILE TIP */}

                            <div className="mt-5 rounded-3xl border border-teal-100 bg-teal-50 p-5">

                                <div className="flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">

                                        <Sparkles
                                            size={18}
                                            className="text-[#14B8A6]"
                                        />

                                    </div>

                                    <div>

                                        <h3 className="text-sm font-black text-[#1E1B4B]">
                                            Build trust
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-600">
                                            A complete organization
                                            profile helps students
                                            decide whether your
                                            opportunities are right
                                            for them.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            RIGHT FORM
                        ================================================= */}

                        <section className="lg:col-span-8">

                            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                                {/* BASIC INFORMATION */}

                                <div className="mb-7">

                                    <SectionHeader
                                        icon={User}
                                        title="Basic Information"
                                        description="Your personal stakeholder details"
                                    />

                                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        <InputField
                                            label="Full Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Your name"
                                            icon={User}
                                        />

                                        <InputField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={
                                                formData.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="you@example.com"
                                            icon={Mail}
                                        />

                                        <InputField
                                            label="Role"
                                            name="role"
                                            value={
                                                formData.role
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Founder / HR / Manager"
                                            icon={
                                                BriefcaseBusiness
                                            }
                                        />

                                        <InputField
                                            label="Location"
                                            name="location"
                                            value={
                                                formData.location
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Pune, Maharashtra"
                                            icon={MapPin}
                                        />

                                    </div>

                                </div>


                                <div className="my-7 h-px bg-slate-100" />


                                {/* ORGANIZATION */}

                                <div className="mb-7">

                                    <SectionHeader
                                        icon={Building2}
                                        title="Organization"
                                        description="Tell students about your organization"
                                    />

                                    <div className="mt-5 space-y-5">

                                        <InputField
                                            label="Organization Name"
                                            name="organizationName"
                                            value={
                                                formData.organizationName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Your organization name"
                                            icon={Building2}
                                        />

                                        <TextAreaField
                                            label="About Organization"
                                            name="description"
                                            value={
                                                formData.description
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Describe your organization, work, mission and the type of opportunities you provide..."
                                            icon={FileText}
                                        />

                                    </div>

                                </div>


                                <div className="my-7 h-px bg-slate-100" />


                                {/* ONLINE PRESENCE */}

                                <div>

                                    <SectionHeader
                                        icon={Globe}
                                        title="Online Presence"
                                        description="Help students learn more about you"
                                    />

                                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        <InputField
                                            label="Website"
                                            name="website"
                                            type="url"
                                            value={
                                                formData.website
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="https://example.com"
                                            icon={Globe}
                                        />

                                        <InputField
                                            label="LinkedIn"
                                            name="linkedin"
                                            type="url"
                                            value={
                                                formData.linkedin
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="https://linkedin.com/company/..."
                                            icon={Linkedin}
                                        />

                                    </div>

                                </div>


                                {/* SAVE */}

                                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                "/stakeholder-dashboard"
                                            )
                                        }
                                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Save size={17} />

                                        {loading
                                            ? "Saving..."
                                            : "Save Profile"}
                                    </button>

                                </div>

                            </div>

                        </section>

                    </div>

                </form>

            </main>

        </div>
    );
}


/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
    icon: Icon,
    title,
    description,
}) {
    return (
        <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50">

                <Icon
                    size={19}
                    className="text-[#14B8A6]"
                />

            </div>

            <div>

                <h2 className="text-lg font-black text-[#1E1B4B]">
                    {title}
                </h2>

                <p className="text-xs text-slate-500">
                    {description}
                </p>

            </div>

        </div>
    );
}


/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
}) {
    return (
        <div>

            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                {label}
            </label>

            <div className="relative">

                {Icon && (
                    <Icon
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                )}

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium text-[#1E1B4B] outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-teal-50"
                />

            </div>

        </div>
    );
}


/* =========================================================
   TEXTAREA
========================================================= */

function TextAreaField({
    label,
    name,
    value,
    onChange,
    placeholder,
    icon: Icon,
}) {
    return (
        <div>

            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                {label}
            </label>

            <div className="relative">

                {Icon && (
                    <Icon
                        size={17}
                        className="absolute left-3.5 top-3.5 text-slate-400"
                    />
                )}

                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium leading-6 text-[#1E1B4B] outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-teal-50"
                />

            </div>

        </div>
    );
}


/* =========================================================
   PROFILE INFO
========================================================= */

function ProfileInfo({
    icon: Icon,
    value,
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">

                <Icon
                    size={15}
                    className="text-[#14B8A6]"
                />

            </div>

            <p className="min-w-0 truncate text-xs font-semibold text-slate-600">
                {value}
            </p>

        </div>
    );
}