import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    ArrowLeft,
    Plus,
    Edit3,
    Trash2,
    FileText,
    Heart,
    MessageCircle,
    Share2,
    MapPin,
    Calendar,
    Code2,
    X,
    Save,
    Building2,
    Sparkles,
    AlertCircle,
    Users,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function MyProblems() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingProblem, setEditingProblem] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    // =====================================================
    // FETCH MY PROBLEMS
    // =====================================================

    const fetchProblems = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login again.");
                return;
            }

            const response = await axios.get(
                `${API_URL}/problems`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            /*
             * Backend may return:
             * { problems: [...] }
             * OR
             * { data: [...] }
             */

            const fetchedProblems =
                data?.problems ||
                data?.data ||
                [];

            setProblems(
                Array.isArray(fetchedProblems)
                    ? fetchedProblems
                    : []
            );
        } catch (err) {
            console.error(
                "Fetch my problems error:",
                err
            );

            if (err.response?.status === 401) {
                setError(
                    "Your session expired. Please login again."
                );
            } else if (
                err.response?.status === 403
            ) {
                setError(
                    "Only stakeholders can access this page."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Failed to load your problems."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (problemId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this problem?"
        );

        if (!confirmed) return;

        try {
            setDeleteLoading(problemId);

            const token =
                localStorage.getItem("token");

            if (!token) {
                alert("Please login again.");
                return;
            }

            await axios.delete(
                `${API_URL}/problems/${problemId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setProblems((prev) =>
                prev.filter(
                    (item) =>
                        item._id !== problemId
                )
            );

        } catch (err) {
            console.error(
                "Delete problem error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Failed to delete problem."
            );
        } finally {
            setDeleteLoading(null);
        }
    };

    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (problem) => {
        setEditingProblem({
            ...problem,

            organizationName:
                problem.organizationName || "",

            requiredSkills:
                Array.isArray(
                    problem.requiredSkills
                )
                    ? [...problem.requiredSkills]
                    : [],

            technologies:
                Array.isArray(
                    problem.technologies
                )
                    ? [...problem.technologies]
                    : [],
        });
    };

    // =====================================================
    // UPDATE
    // =====================================================

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!editingProblem) return;

        if (!editingProblem.title?.trim()) {
            alert("Problem title is required.");
            return;
        }

        if (
            !editingProblem.organizationName?.trim()
        ) {
            alert("Organization name is required.");
            return;
        }

        if (
            !editingProblem.description?.trim()
        ) {
            alert("Description is required.");
            return;
        }

        if (
            !editingProblem.problemInfo?.trim()
        ) {
            alert(
                "Problem information is required."
            );
            return;
        }

        try {
            setUpdateLoading(true);

            const token =
                localStorage.getItem("token");

            if (!token) {
                alert("Please login again.");
                return;
            }

            const payload = {
                title:
                    editingProblem.title.trim(),

                organizationName:
                    editingProblem.organizationName.trim(),

                description:
                    editingProblem.description.trim(),

                problemInfo:
                    editingProblem.problemInfo.trim(),

                requiredSkills:
                    editingProblem.requiredSkills || [],

                technologies:
                    editingProblem.technologies || [],

                location:
                    editingProblem.location?.trim() ||
                    "",

                deadline:
                    editingProblem.deadline || null,

                contactEmail:
                    editingProblem.contactEmail?.trim() ||
                    "",
            };

            const response = await axios.put(
                `${API_URL}/problems/${editingProblem._id}`,
                payload,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const updatedProblem =
                response.data?.problem;

            if (updatedProblem) {
                setProblems((prev) =>
                    prev.map((item) =>
                        item._id ===
                            updatedProblem._id
                            ? updatedProblem
                            : item
                    )
                );
            } else {
                await fetchProblems();
            }

            setEditingProblem(null);

            alert(
                "Problem updated successfully!"
            );

        } catch (err) {
            console.error(
                "Update problem error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Failed to update problem."
            );
        } finally {
            setUpdateLoading(false);
        }
    };

    // =====================================================
    // EDIT INPUT
    // =====================================================

    const handleEditChange = (e) => {
        const { name, value } = e.target;

        setEditingProblem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================================
    // DATE FORMAT
    // =====================================================

    const formatDate = (date) => {
        if (!date) {
            return "No deadline";
        }

        const parsedDate = new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "No deadline";
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =====================================================
    // MAIN UI
    // =====================================================

    return (
        <div className="min-h-screen bg-slate-50">

            {/* HEADER */}

            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

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
                        className="flex items-center gap-2 font-semibold text-slate-600 transition hover:text-[#1E1B4B]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Dashboard
                    </Link>

                </div>

            </header>


            {/* MAIN */}

            <main className="mx-auto max-w-7xl px-6 py-10">

                {/* TITLE */}

                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div>

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-[#14B8A6]">

                            <Building2 className="h-4 w-4" />

                            Stakeholder Workspace

                        </div>

                        <h1 className="text-3xl font-black text-[#1E1B4B] md:text-4xl">
                            My Problems
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Manage the real-world problems you have
                            shared with students.
                        </p>

                    </div>


                    <Link
                        to="/stakeholder/create-problem"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-6 py-3 font-bold text-white transition hover:bg-[#312E81]"
                    >
                        <Plus className="h-5 w-5" />
                        Create Problem
                    </Link>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">

                        <AlertCircle className="h-5 w-5 shrink-0" />

                        <span>{error}</span>

                    </div>
                )}


                {/* LOADING */}

                {loading && (
                    <div className="flex justify-center py-20">

                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#14B8A6]" />

                    </div>
                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    problems.length === 0 && (

                        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">

                                <FileText className="h-9 w-9 text-slate-400" />

                            </div>

                            <h2 className="text-2xl font-black text-[#1E1B4B]">
                                No Problems Posted Yet
                            </h2>

                            <p className="mx-auto mt-2 max-w-lg text-slate-500">
                                You haven't created any real-world
                                problems yet. Create your first one
                                and start connecting with talented
                                students.
                            </p>

                            <Link
                                to="/stakeholder/create-problem"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-6 py-3 font-bold text-white transition hover:bg-teal-600"
                            >
                                <Plus className="h-5 w-5" />
                                Create Your First Problem
                            </Link>

                        </div>
                    )}


                {/* PROBLEMS */}

                {!loading &&
                    problems.length > 0 && (

                        <div className="grid gap-6 lg:grid-cols-2">

                            {problems.map((item) => (

                                <ProblemCard
                                    key={item._id}
                                    problem={item}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    deleteLoading={
                                        deleteLoading
                                    }
                                    formatDate={
                                        formatDate
                                    }
                                />

                            ))}

                        </div>
                    )}

            </main>


            {/* EDIT MODAL */}

            {editingProblem && (

                <EditProblemModal
                    problem={editingProblem}
                    onChange={handleEditChange}
                    setProblem={
                        setEditingProblem
                    }
                    onSubmit={handleUpdate}
                    onClose={() =>
                        setEditingProblem(null)
                    }
                    loading={updateLoading}
                />

            )}

        </div>
    );
}


// =====================================================
// PROBLEM CARD
// =====================================================

function ProblemCard({
    problem,
    onEdit,
    onDelete,
    deleteLoading,
    formatDate,
}) {
    return (

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-lg">

            <div className="p-6">

                {/* TITLE */}

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">

                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">

                            <FileText className="h-3.5 w-3.5" />

                            Real-World Problem

                        </div>

                        <h2 className="text-xl font-black text-[#1E1B4B]">
                            {problem.title}
                        </h2>

                        {problem.organizationName && (
                            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">

                                <Building2 className="h-4 w-4 text-[#14B8A6]" />

                                {problem.organizationName}

                            </div>
                        )}

                    </div>


                    {/* ACTIONS */}

                    <div className="flex shrink-0 gap-2">

                        <button
                            type="button"
                            onClick={() =>
                                onEdit(problem)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-teal-50 hover:text-[#14B8A6]"
                            title="Edit"
                        >
                            <Edit3 className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                onDelete(
                                    problem._id
                                )
                            }
                            disabled={
                                deleteLoading ===
                                problem._id
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                            title="Delete"
                        >

                            {deleteLoading ===
                                problem._id ? (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-red-500" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}

                        </button>

                    </div>

                </div>


                {/* DESCRIPTION */}

                <p className="mt-4 line-clamp-3 leading-relaxed text-slate-600">
                    {problem.description}
                </p>


                {/* PROBLEM INFO */}

                <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Problem Details
                    </p>

                    <p className="line-clamp-4 text-sm text-slate-600">
                        {problem.problemInfo}
                    </p>

                </div>


                {/* SKILLS */}

                {problem.requiredSkills?.length > 0 && (

                    <div className="mt-5">

                        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#1E1B4B]">

                            <Code2 className="h-4 w-4 text-[#14B8A6]" />

                            Required Skills

                        </div>

                        <div className="flex flex-wrap gap-2">

                            {problem.requiredSkills.map(
                                (skill, index) => (

                                    <span
                                        key={`${skill}-${index}`}
                                        className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700"
                                    >
                                        {skill}
                                    </span>

                                )
                            )}

                        </div>

                    </div>
                )}


                {/* TECHNOLOGIES */}

                {problem.technologies?.length > 0 && (

                    <div className="mt-4">

                        <div className="flex flex-wrap gap-2">

                            {problem.technologies.map(
                                (
                                    technology,
                                    index
                                ) => (

                                    <span
                                        key={`${technology}-${index}`}
                                        className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
                                    >
                                        {technology}
                                    </span>

                                )
                            )}

                        </div>

                    </div>
                )}


                {/* META */}

                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-5">

                    {problem.location && (

                        <div className="flex items-center gap-2 text-sm text-slate-500">

                            <MapPin className="h-4 w-4 text-[#14B8A6]" />

                            {problem.location}

                        </div>

                    )}

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                        <Calendar className="h-4 w-4 text-[#14B8A6]" />

                        {formatDate(
                            problem.deadline
                        )}

                    </div>

                </div>

            </div>


            {/* ENGAGEMENT */}

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">

                <div className="flex items-center gap-6">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                        <Heart className="h-4 w-4" />

                        {problem.likes?.length || 0}

                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                        <MessageCircle className="h-4 w-4" />

                        {problem.comments?.length || 0}

                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                        <Share2 className="h-4 w-4" />

                        {problem.shares || 0}

                    </div>

                </div>


                <Link
                    to={`/stakeholder/problems/${problem._id}/responses`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-3 font-bold text-white transition hover:bg-[#312E81]"
                >

                    <Users className="h-5 w-5" />

                    View Responses

                </Link>

            </div>

        </article>
    );
}


// =====================================================
// EDIT PROBLEM MODAL
// =====================================================

function EditProblemModal({
    problem,
    onChange,
    setProblem,
    onSubmit,
    onClose,
    loading,
}) {
    const [skillInput, setSkillInput] =
        useState("");

    const [technologyInput, setTechnologyInput] =
        useState("");


    // =====================================================
    // ADD SKILL
    // =====================================================

    const addSkill = () => {

        const value =
            skillInput.trim();

        if (!value) return;

        const existingSkills =
            problem.requiredSkills || [];

        const alreadyExists =
            existingSkills.some(
                (skill) =>
                    skill.toLowerCase() ===
                    value.toLowerCase()
            );

        if (!alreadyExists) {

            setProblem((prev) => ({
                ...prev,

                requiredSkills: [
                    ...(prev.requiredSkills ||
                        []),
                    value,
                ],
            }));

        }

        setSkillInput("");
    };


    // =====================================================
    // REMOVE SKILL
    // =====================================================

    const removeSkill = (
        skillToRemove
    ) => {

        setProblem((prev) => ({
            ...prev,

            requiredSkills: (
                prev.requiredSkills || []
            ).filter(
                (skill) =>
                    skill !==
                    skillToRemove
            ),
        }));

    };


    // =====================================================
    // ADD TECHNOLOGY
    // =====================================================

    const addTechnology = () => {

        const value =
            technologyInput.trim();

        if (!value) return;

        const existingTechnologies =
            problem.technologies || [];

        const alreadyExists =
            existingTechnologies.some(
                (technology) =>
                    technology.toLowerCase() ===
                    value.toLowerCase()
            );

        if (!alreadyExists) {

            setProblem((prev) => ({
                ...prev,

                technologies: [
                    ...(prev.technologies ||
                        []),
                    value,
                ],
            }));

        }

        setTechnologyInput("");
    };


    // =====================================================
    // REMOVE TECHNOLOGY
    // =====================================================

    const removeTechnology = (
        technologyToRemove
    ) => {

        setProblem((prev) => ({
            ...prev,

            technologies: (
                prev.technologies || []
            ).filter(
                (technology) =>
                    technology !==
                    technologyToRemove
            ),
        }));

    };


    // =====================================================
    // DATE VALUE
    // =====================================================

    const getDateValue = () => {

        if (!problem.deadline) {
            return "";
        }

        const date =
            new Date(problem.deadline);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "";
        }

        return date
            .toISOString()
            .split("T")[0];
    };


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

                {/* HEADER */}

                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

                    <div>

                        <h2 className="text-xl font-black text-[#1E1B4B]">
                            Edit Problem
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your problem details.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>


                {/* FORM */}

                <form
                    onSubmit={onSubmit}
                    className="space-y-6 p-6"
                >

                    {/* TITLE */}

                    <EditField
                        label="Problem Title"
                        name="title"
                        value={
                            problem.title || ""
                        }
                        onChange={onChange}
                    />


                    {/* ORGANIZATION */}

                    <EditField
                        label="Organization Name"
                        name="organizationName"
                        value={
                            problem.organizationName ||
                            ""
                        }
                        onChange={onChange}
                    />


                    {/* DESCRIPTION */}

                    <div>

                        <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                problem.description ||
                                ""
                            }
                            onChange={onChange}
                            rows={4}
                            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
                        />

                    </div>


                    {/* PROBLEM INFO */}

                    <div>

                        <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                            Detailed Problem Information
                        </label>

                        <textarea
                            name="problemInfo"
                            value={
                                problem.problemInfo ||
                                ""
                            }
                            onChange={onChange}
                            rows={6}
                            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
                        />

                    </div>


                    {/* SKILLS */}

                    <TagEditor
                        label="Required Skills"
                        input={skillInput}
                        setInput={setSkillInput}
                        items={
                            problem.requiredSkills ||
                            []
                        }
                        addItem={addSkill}
                        removeItem={removeSkill}
                        placeholder="Add skill"
                        tagClass="bg-teal-50 text-teal-700"
                    />


                    {/* TECHNOLOGIES */}

                    <TagEditor
                        label="Technologies"
                        input={
                            technologyInput
                        }
                        setInput={
                            setTechnologyInput
                        }
                        items={
                            problem.technologies ||
                            []
                        }
                        addItem={
                            addTechnology
                        }
                        removeItem={
                            removeTechnology
                        }
                        placeholder="Add technology"
                        tagClass="bg-indigo-50 text-indigo-700"
                    />


                    {/* LOCATION */}

                    <EditField
                        label="Location"
                        name="location"
                        value={
                            problem.location ||
                            ""
                        }
                        onChange={onChange}
                        placeholder="Example: Pune, Maharashtra"
                    />


                    {/* DEADLINE */}

                    <div>

                        <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                            Deadline
                        </label>

                        <input
                            type="date"
                            name="deadline"
                            value={
                                getDateValue()
                            }
                            onChange={onChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
                        />

                    </div>


                    {/* EMAIL */}

                    <EditField
                        label="Contact Email"
                        name="contactEmail"
                        type="email"
                        value={
                            problem.contactEmail ||
                            ""
                        }
                        onChange={onChange}
                        placeholder="contact@example.com"
                    />


                    {/* BUTTONS */}

                    <div className="flex flex-col gap-3 pt-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 font-bold text-white transition hover:bg-teal-600 disabled:opacity-60"
                        >

                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Save Changes
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


// =====================================================
// EDIT FIELD
// =====================================================

function EditField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
            />

        </div>
    );
}


// =====================================================
// TAG EDITOR
// =====================================================

function TagEditor({
    label,
    input,
    setInput,
    items,
    addItem,
    removeItem,
    placeholder,
    tagClass,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                {label}
            </label>

            <div className="flex gap-2">

                <input
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (
                            e.key ===
                            "Enter"
                        ) {
                            e.preventDefault();
                            addItem();
                        }
                    }}
                    placeholder={placeholder}
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
                />

                <button
                    type="button"
                    onClick={addItem}
                    className="rounded-xl bg-[#1E1B4B] px-5 font-bold text-white transition hover:bg-[#312E81]"
                >
                    Add
                </button>

            </div>

            <div className="mt-3 flex flex-wrap gap-2">

                {items.map((item, index) => (

                    <span
                        key={`${item}-${index}`}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${tagClass}`}
                    >

                        {item}

                        <button
                            type="button"
                            onClick={() =>
                                removeItem(item)
                            }
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