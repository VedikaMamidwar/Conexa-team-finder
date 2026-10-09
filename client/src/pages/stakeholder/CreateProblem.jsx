import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
    ArrowLeft,
    Plus,
    X,
    FileText,
    Building2,
    Code2,
    MapPin,
    Calendar,
    Mail,
    Lightbulb,
    Sparkles,
    Send,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function CreateProblem() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        organizationName: "",
        description: "",
        problemInfo: "",
        requiredSkills: [],
        technologies: [],
        location: "",
        deadline: "",
        contactEmail: "",
    });

    const [skillInput, setSkillInput] = useState("");
    const [technologyInput, setTechnologyInput] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // =====================================================
    // ADD SKILL
    // =====================================================

    const addSkill = () => {
        const skill = skillInput.trim();

        if (!skill) return;

        const alreadyExists = form.requiredSkills.some(
            (item) => item.toLowerCase() === skill.toLowerCase()
        );

        if (!alreadyExists) {
            setForm((prev) => ({
                ...prev,
                requiredSkills: [...prev.requiredSkills, skill],
            }));
        }

        setSkillInput("");
    };

    // =====================================================
    // REMOVE SKILL
    // =====================================================

    const removeSkill = (skillToRemove) => {
        setForm((prev) => ({
            ...prev,
            requiredSkills: prev.requiredSkills.filter(
                (skill) => skill !== skillToRemove
            ),
        }));
    };

    // =====================================================
    // ADD TECHNOLOGY
    // =====================================================

    const addTechnology = () => {
        const technology = technologyInput.trim();

        if (!technology) return;

        const alreadyExists = form.technologies.some(
            (item) =>
                item.toLowerCase() === technology.toLowerCase()
        );

        if (!alreadyExists) {
            setForm((prev) => ({
                ...prev,
                technologies: [...prev.technologies, technology],
            }));
        }

        setTechnologyInput("");
    };

    // =====================================================
    // REMOVE TECHNOLOGY
    // =====================================================

    const removeTechnology = (technologyToRemove) => {
        setForm((prev) => ({
            ...prev,
            technologies: prev.technologies.filter(
                (technology) => technology !== technologyToRemove
            ),
        }));
    };

    // =====================================================
    // ENTER KEY
    // =====================================================

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const handleTechnologyKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTechnology();
        }
    };

    // =====================================================
    // VALIDATION
    // =====================================================

    const validateForm = () => {
        if (!form.title.trim()) {
            setError("Problem title is required.");
            return false;
        }

        if (!form.organizationName.trim()) {
            setError("Organization name is required.");
            return false;
        }

        if (!form.description.trim()) {
            setError("Problem description is required.");
            return false;
        }

        if (!form.problemInfo.trim()) {
            setError("Problem information is required.");
            return false;
        }

        if (form.requiredSkills.length === 0) {
            setError("Add at least one required skill.");
            return false;
        }

        if (form.technologies.length === 0) {
            setError("Add at least one technology.");
            return false;
        }

        if (
            form.contactEmail &&
            !/^\S+@\S+\.\S+$/.test(form.contactEmail)
        ) {
            setError("Please enter a valid contact email.");
            return false;
        }

        return true;
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login again.");
                navigate("/login");
                return;
            }

            const payload = {
                title: form.title.trim(),
                organizationName: form.organizationName.trim(),
                description: form.description.trim(),
                problemInfo: form.problemInfo.trim(),
                requiredSkills: form.requiredSkills,
                technologies: form.technologies,
                location: form.location.trim(),
                deadline: form.deadline || null,
                contactEmail: form.contactEmail.trim(),
            };

            console.log("Creating problem:", payload);

            const response = await axios.post(
                `${API_URL}/problems`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Create problem response:", response.data);

            if (
                response.status === 200 ||
                response.status === 201
            ) {
                alert("Problem posted successfully!");

                navigate("/stakeholder/problems");
            }
        } catch (err) {
            console.error("Create problem error:", err);

            if (err.response?.status === 401) {
                setError("Your session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (err.response?.status === 403) {
                setError(
                    "Only stakeholders can create problem posts."
                );
                return;
            }

            setError(
                err.response?.data?.message ||
                "Failed to create problem. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-4">

                    <div className="flex items-center justify-between">

                        <Link
                            to="/stakeholder-dashboard"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E1B4B]">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>

                            <span className="text-2xl font-black text-[#1E1B4B]">
                                CONEXA
                            </span>
                        </Link>

                        <Link
                            to="/stakeholder-dashboard"
                            className="flex items-center gap-2 font-medium text-slate-600 transition hover:text-[#1E1B4B]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Dashboard
                        </Link>

                    </div>

                </div>
            </header>


            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="mx-auto max-w-5xl px-6 py-10">

                {/* PAGE TITLE */}

                <div className="mb-8">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-[#14B8A6]">
                        <Lightbulb className="h-4 w-4" />
                        Stakeholder Problem Portal
                    </div>

                    <h1 className="text-3xl font-black text-[#1E1B4B] md:text-4xl">
                        Create a Real-World Problem
                    </h1>

                    <p className="mt-2 max-w-2xl text-slate-500">
                        Share a genuine problem or challenge with students
                        and invite them to build meaningful solutions.
                    </p>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 font-medium text-red-600">
                        {error}
                    </div>
                )}


                {/* =====================================================
                    FORM
                ===================================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >

                    {/* =================================================
                        BASIC INFORMATION
                    ================================================= */}

                    <div className="border-b border-slate-200 p-6 md:p-8">

                        <SectionTitle
                            icon={FileText}
                            title="Problem Information"
                            description="Describe the challenge clearly."
                        />

                        <div className="space-y-6">

                            <InputField
                                label="Problem Title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Example: Smart Waste Management System"
                                required
                            />

                            <InputField
                                label="Organization Name"
                                name="organizationName"
                                value={form.organizationName}
                                onChange={handleChange}
                                placeholder="Example: ABC Technologies Pvt. Ltd."
                                icon={Building2}
                                required
                            />


                            {/* DESCRIPTION */}

                            <div>

                                <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                                    Short Description
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Give students a clear overview of the problem..."
                                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
                                />

                            </div>


                            {/* PROBLEM INFO */}

                            <div>

                                <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                                    Detailed Problem Information
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    name="problemInfo"
                                    value={form.problemInfo}
                                    onChange={handleChange}
                                    rows={7}
                                    placeholder="Explain the real-world situation, current difficulties, expected outcome and what needs to be solved..."
                                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
                                />

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SKILLS & TECHNOLOGY
                    ================================================= */}

                    <div className="border-b border-slate-200 p-6 md:p-8">

                        <SectionTitle
                            icon={Code2}
                            title="Skills & Technologies"
                            description="Tell students what expertise may be useful."
                        />

                        <div className="grid gap-8 md:grid-cols-2">

                            {/* SKILLS */}

                            <TagInput
                                label="Required Skills"
                                placeholder="React, UI/UX, Python..."
                                input={skillInput}
                                setInput={setSkillInput}
                                items={form.requiredSkills}
                                addItem={addSkill}
                                removeItem={removeSkill}
                                onKeyDown={handleSkillKeyDown}
                                required
                                tagClass="bg-teal-50 text-[#0f766e]"
                            />


                            {/* TECHNOLOGIES */}

                            <TagInput
                                label="Technologies"
                                placeholder="MERN, Java, AI..."
                                input={technologyInput}
                                setInput={setTechnologyInput}
                                items={form.technologies}
                                addItem={addTechnology}
                                removeItem={removeTechnology}
                                onKeyDown={handleTechnologyKeyDown}
                                required
                                tagClass="bg-indigo-50 text-indigo-700"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        ADDITIONAL DETAILS
                    ================================================= */}

                    <div className="border-b border-slate-200 p-6 md:p-8">

                        <SectionTitle
                            icon={Building2}
                            title="Additional Details"
                            description="Help students understand the opportunity."
                        />

                        <div className="grid gap-6 md:grid-cols-2">

                            <InputField
                                label="Location"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Pune, Maharashtra / Remote"
                                icon={MapPin}
                            />

                            <InputField
                                label="Application / Solution Deadline"
                                name="deadline"
                                type="date"
                                value={form.deadline}
                                onChange={handleChange}
                                icon={Calendar}
                            />

                            <div className="md:col-span-2">

                                <InputField
                                    label="Contact Email"
                                    name="contactEmail"
                                    type="email"
                                    value={form.contactEmail}
                                    onChange={handleChange}
                                    placeholder="contact@company.com"
                                    icon={Mail}
                                />

                                <p className="mt-2 text-xs text-slate-400">
                                    Students can use this email to contact
                                    the stakeholder about the problem.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SUBMIT
                    ================================================= */}

                    <div className="bg-slate-50 p-6 md:p-8">

                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                            <div>

                                <h3 className="font-bold text-[#1E1B4B]">
                                    Ready to publish?
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your problem will appear on the student
                                    dashboard.
                                </p>

                            </div>

                            <div className="flex gap-3">

                                <Link
                                    to="/stakeholder-dashboard"
                                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-7 py-3 font-bold text-white transition hover:bg-[#312E81] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {loading ? (
                                        <>
                                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Publish Problem
                                        </>
                                    )}

                                </button>

                            </div>

                        </div>

                    </div>

                </form>

            </main>

        </div>
    );
}


// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({
    icon: Icon,
    title,
    description,
}) {
    return (
        <div className="mb-7 flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B]">
                <Icon className="h-5 w-5 text-white" />
            </div>

            <div>
                <h2 className="text-xl font-black text-[#1E1B4B]">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>
            </div>

        </div>
    );
}


// =====================================================
// INPUT FIELD
// =====================================================

function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
    required = false,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">

                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}

            </label>

            <div className="relative">

                {Icon && (
                    <Icon
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                )}

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full rounded-xl border border-slate-300 py-3 pr-4 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 ${Icon ? "pl-11" : "px-4"
                        }`}
                />

            </div>

        </div>
    );
}


// =====================================================
// TAG INPUT
// =====================================================

function TagInput({
    label,
    placeholder,
    input,
    setInput,
    items,
    addItem,
    removeItem,
    onKeyDown,
    required = false,
    tagClass,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">

                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}

            </label>

            <div className="flex gap-2">

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
                />

                <button
                    type="button"
                    onClick={addItem}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B] text-white transition hover:bg-[#312E81]"
                >
                    <Plus className="h-5 w-5" />
                </button>

            </div>

            <div className="mt-3 flex flex-wrap gap-2">

                {items.map((item) => (
                    <span
                        key={item}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${tagClass}`}
                    >

                        {item}

                        <button
                            type="button"
                            onClick={() => removeItem(item)}
                            className="transition hover:opacity-60"
                        >
                            <X className="h-4 w-4" />
                        </button>

                    </span>
                ))}

            </div>

        </div>
    );
}