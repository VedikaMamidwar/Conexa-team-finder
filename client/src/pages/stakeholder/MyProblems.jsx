import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
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
    RefreshCw,
} from "lucide-react"

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).trim().replace(/\/+$/, "")

const getToken = () => localStorage.getItem("token")

const getProblemArray = (responseData) => {
    const payload = responseData?.data ?? responseData


    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload?.problems)) return payload.problems
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.items)) return payload.items

    return []


}

const getUpdatedProblem = (responseData) => {
    const payload = responseData?.data ?? responseData
    return payload?.problem ?? payload?.data?.problem ?? payload
}

export default function MyProblems() {
    const navigate = useNavigate()


    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")

    const [editingProblem, setEditingProblem] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    const fetchProblems = useCallback(async () => {
        const token = getToken()

        if (!token) {
            setError("Please log in again to manage your problems.")
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError("")

            const response = await axios.get(
                `${API_URL}/problems`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setProblems(getProblemArray(response.data))
        } catch (err) {
            console.error("Fetch my problems error:", err)

            if (err.response?.status === 401) {
                setError("Your session expired. Please log in again.")
            } else if (err.response?.status === 403) {
                setError(
                    "Only approved stakeholders can manage problems."
                )
            } else {
                setError(
                    err.response?.data?.message ||
                    "Failed to load your problems. Please try again."
                )
            }
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProblems()
    }, [fetchProblems])

    const handleDelete = async (problemId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this problem? This action cannot be undone."
        )

        if (!confirmed) return

        const token = getToken()

        if (!token) {
            setError("Please log in again.")
            return
        }

        try {
            setDeleteLoading(problemId)
            setError("")
            setNotice("")

            await axios.delete(
                `${API_URL}/problems/${problemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setProblems((previous) =>
                previous.filter((item) => item._id !== problemId)
            )

            setNotice("Problem deleted successfully.")
        } catch (err) {
            console.error("Delete problem error:", err)

            setError(
                err.response?.data?.message ||
                "Failed to delete the problem."
            )
        } finally {
            setDeleteLoading(null)
        }
    }

    const handleEdit = (problem) => {
        setError("")
        setNotice("")

        setEditingProblem({
            ...problem,
            organizationName: problem.organizationName || "",
            requiredSkills: Array.isArray(problem.requiredSkills)
                ? [...problem.requiredSkills]
                : [],
            technologies: Array.isArray(problem.technologies)
                ? [...problem.technologies]
                : [],
            location: problem.location || "",
            contactEmail: problem.contactEmail || "",
            deadline: problem.deadline || "",
        })
    }

    const handleEditChange = (event) => {
        const { name, value } = event.target

        setEditingProblem((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleUpdate = async (event) => {
        event.preventDefault()

        if (!editingProblem) return

        if (!editingProblem.title?.trim()) {
            setError("Problem title is required.")
            return
        }

        if (!editingProblem.organizationName?.trim()) {
            setError("Organization name is required.")
            return
        }

        if (!editingProblem.description?.trim()) {
            setError("Description is required.")
            return
        }

        if (!editingProblem.problemInfo?.trim()) {
            setError("Detailed problem information is required.")
            return
        }

        const token = getToken()

        if (!token) {
            setError("Please log in again.")
            return
        }

        const payload = {
            title: editingProblem.title.trim(),
            organizationName: editingProblem.organizationName.trim(),
            description: editingProblem.description.trim(),
            problemInfo: editingProblem.problemInfo.trim(),
            requiredSkills: editingProblem.requiredSkills || [],
            technologies: editingProblem.technologies || [],
            location: editingProblem.location?.trim() || "",
            deadline: editingProblem.deadline || null,
            contactEmail: editingProblem.contactEmail?.trim() || "",
        }

        try {
            setUpdateLoading(true)
            setError("")
            setNotice("")

            const response = await axios.put(
                `${API_URL}/problems/${editingProblem._id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            const updatedProblem = getUpdatedProblem(response.data)

            if (
                updatedProblem &&
                updatedProblem._id === editingProblem._id
            ) {
                setProblems((previous) =>
                    previous.map((item) =>
                        item._id === updatedProblem._id
                            ? updatedProblem
                            : item
                    )
                )
            } else {
                await fetchProblems()
            }

            setEditingProblem(null)
            setNotice("Problem updated successfully.")
        } catch (err) {
            console.error("Update problem error:", err)

            setError(
                err.response?.data?.message ||
                "Failed to update the problem."
            )
        } finally {
            setUpdateLoading(false)
        }
    }

    const formatDate = (date) => {
        if (!date) return "No deadline"

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return "No deadline"
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
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

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
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
                            Manage the real-world problems you have shared with students.
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

                {error && (
                    <div
                        role="alert"
                        className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                    >
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div className="flex-1">{error}</div>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="rounded p-1 hover:bg-red-100"
                            aria-label="Dismiss error"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {notice && (
                    <div
                        role="status"
                        className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4 text-teal-800"
                    >
                        <span>{notice}</span>

                        <button
                            type="button"
                            onClick={() => setNotice("")}
                            className="rounded p-1 hover:bg-teal-100"
                            aria-label="Dismiss message"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#14B8A6]" />
                        <p className="mt-4 text-sm text-slate-500">
                            Loading your problems...
                        </p>
                    </div>
                )}

                {!loading && !error && problems.length === 0 && (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
                            <FileText className="h-9 w-9 text-slate-400" />
                        </div>

                        <h2 className="text-2xl font-black text-[#1E1B4B]">
                            No Problems Posted Yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-slate-500">
                            Create your first real-world problem to start connecting with talented students.
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

                {!loading && problems.length > 0 && (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {problems.map((problem) => (
                            <ProblemCard
                                key={problem._id}
                                problem={problem}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                deleteLoading={deleteLoading}
                                formatDate={formatDate}
                            />
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={fetchProblems}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 font-bold text-white transition hover:bg-[#312E81]"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </button>
                    </div>
                )}
            </main>

            {editingProblem && (
                <EditProblemModal
                    problem={editingProblem}
                    onChange={handleEditChange}
                    setProblem={setEditingProblem}
                    onSubmit={handleUpdate}
                    onClose={() => setEditingProblem(null)}
                    loading={updateLoading}
                />
            )}
        </div>
    )


}

function ProblemCard({
    problem,
    onEdit,
    onDelete,
    deleteLoading,
    formatDate,
}) {
    return (<article className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-lg"> <div className="p-5 sm:p-6"> <div className="flex items-start justify-between gap-4"> <div className="min-w-0 flex-1"> <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700"> <FileText className="h-3.5 w-3.5" />
        Real-World Problem </div>


        < h2 className="break-words text-xl font-black text-[#1E1B4B]" >
            {problem.title || "Untitled Problem"}
        </h2 >

        {
            problem.organizationName && (
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Building2 className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                    <span>{problem.organizationName}</span>
                </div>
            )
        }
    </div >

        <div className="flex shrink-0 gap-2">
            <button
                type="button"
                onClick={() => onEdit(problem)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-teal-50 hover:text-[#14B8A6]"
                title="Edit problem"
                aria-label="Edit problem"
            >
                <Edit3 className="h-4 w-4" />
            </button>

            <button
                type="button"
                onClick={() => onDelete(problem._id)}
                disabled={deleteLoading === problem._id}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                title="Delete problem"
                aria-label="Delete problem"
            >
                {deleteLoading === problem._id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-red-500" />
                ) : (
                    <Trash2 className="h-4 w-4" />
                )}
            </button>
        </div>
    </div >

        <p className="mt-4 line-clamp-3 whitespace-pre-wrap leading-relaxed text-slate-600">
            {problem.description || "No description provided."}
        </p>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                Problem Details
            </p>

            <p className="line-clamp-4 whitespace-pre-wrap text-sm text-slate-600">
                {problem.problemInfo || "No additional details provided."}
            </p>
        </div>

        {
            problem.requiredSkills?.length > 0 && (
                <div className="mt-5">
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#1E1B4B]">
                        <Code2 className="h-4 w-4 text-[#14B8A6]" />
                        Required Skills
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {problem.requiredSkills.map((skill, index) => (
                            <span
                                key={`${skill}-${index}`}
                                className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )
        }

        {
            problem.technologies?.length > 0 && (
                <div className="mt-4">
                    <p className="mb-2 text-sm font-bold text-[#1E1B4B]">
                        Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {problem.technologies.map((technology, index) => (
                            <span
                                key={`${technology}-${index}`}
                                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>
            )
        }

        <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-5">
            {problem.location && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                    {problem.location}
                </div>
            )}

            <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                {formatDate(problem.deadline)}
            </div>
        </div>
    </div >

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Heart className="h-4 w-4" />
                    {Array.isArray(problem.likes)
                        ? problem.likes.length
                        : Number(problem.likes) || 0}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MessageCircle className="h-4 w-4" />
                    {Array.isArray(problem.comments)
                        ? problem.comments.length
                        : Number(problem.comments) || 0}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Share2 className="h-4 w-4" />
                    {Number(problem.shares) || 0}
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
    </article >
    )


}

function EditProblemModal({
    problem,
    onChange,
    setProblem,
    onSubmit,
    onClose,
    loading,
}) {
    const [skillInput, setSkillInput] = useState("")
    const [technologyInput, setTechnologyInput] = useState("")


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !loading) {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [loading, onClose])

    const addTag = (field, input, setInput) => {
        const value = input.trim()

        if (!value) return

        setProblem((previous) => {
            const currentItems = previous[field] || []
            const exists = currentItems.some(
                (item) => item.toLowerCase() === value.toLowerCase()
            )

            if (exists) return previous

            return {
                ...previous,
                [field]: [...currentItems, value],
            }
        })

        setInput("")
    }

    const removeTag = (field, valueToRemove) => {
        setProblem((previous) => ({
            ...previous,
            [field]: (previous[field] || []).filter(
                (item) => item !== valueToRemove
            ),
        }))
    }

    const getDateValue = () => {
        if (!problem.deadline) return ""

        const date = new Date(problem.deadline)

        if (Number.isNaN(date.getTime())) return ""

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")

        return `${year}-${month}-${day}`
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !loading) {
                    onClose()
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-problem-title"
                className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
                    <div>
                        <h2
                            id="edit-problem-title"
                            className="text-xl font-black text-[#1E1B4B]"
                        >
                            Edit Problem
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your problem details
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50"
                        aria-label="Close editor"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6 p-5 sm:p-6">
                    <EditField
                        label="Problem Title"
                        name="title"
                        value={problem.title || ""}
                        onChange={onChange}
                        required
                    />

                    <EditField
                        label="Organization Name"
                        name="organizationName"
                        value={problem.organizationName || ""}
                        onChange={onChange}
                        required
                    />

                    <EditTextarea
                        label="Description"
                        name="description"
                        value={problem.description || ""}
                        onChange={onChange}
                        rows={4}
                        required
                    />

                    <EditTextarea
                        label="Detailed Problem Information"
                        name="problemInfo"
                        value={problem.problemInfo || ""}
                        onChange={onChange}
                        rows={6}
                        required
                    />

                    <TagEditor
                        label="Required Skills"
                        input={skillInput}
                        setInput={setSkillInput}
                        items={problem.requiredSkills || []}
                        addItem={() =>
                            addTag(
                                "requiredSkills",
                                skillInput,
                                setSkillInput
                            )
                        }
                        removeItem={(value) =>
                            removeTag("requiredSkills", value)
                        }
                        placeholder="Add a required skill"
                        tagClass="bg-teal-50 text-teal-700"
                    />

                    <TagEditor
                        label="Technologies"
                        input={technologyInput}
                        setInput={setTechnologyInput}
                        items={problem.technologies || []}
                        addItem={() =>
                            addTag(
                                "technologies",
                                technologyInput,
                                setTechnologyInput
                            )
                        }
                        removeItem={(value) =>
                            removeTag("technologies", value)
                        }
                        placeholder="Add a technology"
                        tagClass="bg-indigo-50 text-indigo-700"
                    />

                    <EditField
                        label="Location"
                        name="location"
                        value={problem.location || ""}
                        onChange={onChange}
                        placeholder="Pune, Maharashtra"
                    />

                    <EditField
                        label="Deadline"
                        name="deadline"
                        type="date"
                        value={getDateValue()}
                        onChange={onChange}
                    />

                    <EditField
                        label="Contact Email"
                        name="contactEmail"
                        type="email"
                        value={problem.contactEmail || ""}
                        onChange={onChange}
                        placeholder="contact@example.com"
                    />

                    <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
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
    )


}

function EditField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
}) {
    return (<div> <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-[#1E1B4B]"
    >
        {label} </label>


        < input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
        />
    </div >
    )


}

function EditTextarea({
    label,
    name,
    value,
    onChange,
    rows,
    required = false,
}) {
    return (<div> <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-[#1E1B4B]"
    >
        {label} </label>

        ```
        < textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            required={required}
            className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 focus:border-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
        />
    </div >
    )


}

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
    return (<div> <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
        {label} </label>


        < div className="flex gap-2" >
            <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        addItem()
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
        </div >

        <div className="mt-3 flex flex-wrap gap-2">
            {items.map((item, index) => (
                <span
                    key={`${item}-${index}`}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${tagClass}`}
                >
                    {item}

                    <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="transition hover:opacity-60"
                        aria-label={`Remove ${item}`}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </span>
            ))}
        </div>
    </div >
    )


}
