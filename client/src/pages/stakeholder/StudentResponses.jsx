
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
    ArrowLeft,
    User,
    Mail,
    GraduationCap,
    Code2,
    CheckCircle,
    XCircle,
    Clock3,
    ExternalLink,
    BriefcaseBusiness,
    RefreshCw,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).trim().replace(/\/+$/, "");

const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Your session has expired. Please log in again.");
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export default function StudentResponses() {
    const { problemId } = useParams();

    const [responses, setResponses] = useState([]);
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const fetchResponses = useCallback(async () => {
        if (!problemId) {
            setError("Problem ID is missing from the URL.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");
            setNotice("");

            const response = await axios.get(
                `${API_URL}/problems/${problemId}/engagement`,
                getAuthConfig()
            );

            const data = response.data || {};

            // Support the common response shapes returned by the backend.
            const problemData =
                data.problem ||
                data.data?.problem ||
                (data._id ? data : null);

            const contactRequests =
                data.responses ||
                data.contactRequests ||
                data.data?.responses ||
                data.data?.contactRequests ||
                problemData?.contactRequests ||
                [];

            setProblem(problemData);
            setResponses(
                Array.isArray(contactRequests) ? contactRequests : []
            );
        } catch (err) {
            console.error(
                "Fetch student responses error:",
                err.response?.data || err.message
            );

            if (err.response?.status === 401) {
                setError("Your session has expired. Please log in again.");
            } else if (err.response?.status === 403) {
                setError(
                    "You are not authorized to view responses for this problem."
                );
            } else if (err.response?.status === 404) {
                setError(
                    "Problem or response endpoint not found. Please check the backend routes."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load student responses."
                );
            }
        } finally {
            setLoading(false);
        }
    }, [problemId]);

    useEffect(() => {
        fetchResponses();
    }, [fetchResponses]);

    // =====================================================
    // ACCEPT / REJECT
    // =====================================================

    const updateStatus = async (requestId, status) => {
        if (!requestId || actionLoading) return;

        try {
            setActionLoading(requestId);
            setError("");
            setNotice("");

            await axios.patch(
                `${API_URL}/problems/${problemId}/contact-requests/${requestId}`,
                { status },
                getAuthConfig()
            );

            setResponses((previous) =>
                previous.map((item) =>
                    String(item._id) === String(requestId)
                        ? { ...item, status }
                        : item
                )
            );

            setNotice(
                status === "accepted"
                    ? "Student response accepted successfully."
                    : "Student response rejected successfully."
            );
        } catch (err) {
            console.error(
                "Update student response error:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.message ||
                "Failed to update the response. Please try again."
            );
        } finally {
            setActionLoading(null);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#14B8A6]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* HEADER */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-5">
                    <Link
                        to="/stakeholder/problems"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#14B8A6]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to My Problems
                    </Link>
                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#14B8A6]">
                            <BriefcaseBusiness className="h-4 w-4" />
                            STUDENT RESPONSES
                        </div>

                        <h1 className="text-3xl font-black text-[#1E1B4B]">
                            Interested Students
                        </h1>

                        {problem?.title && (
                            <p className="mt-2 text-slate-500">
                                Responses for{" "}
                                <span className="font-semibold text-[#1E1B4B]">
                                    {problem.title}
                                </span>
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={fetchResponses}
                        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 sm:self-auto"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </button>
                </div>

                {/* ERROR */}
                {error && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600"
                    >
                        <p>{error}</p>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="shrink-0 font-bold"
                            aria-label="Dismiss error"
                        >
                            <XCircle className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {/* SUCCESS */}
                {notice && (
                    <div
                        role="status"
                        className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm font-semibold text-teal-800"
                    >
                        {notice}
                    </div>
                )}

                {/* EMPTY */}
                {!error && responses.length === 0 && (
                    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
                            <User className="h-7 w-7 text-[#14B8A6]" />
                        </div>

                        <h2 className="mt-5 text-xl font-black text-[#1E1B4B]">
                            No Student Responses Yet
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Students who contact you about this problem will
                            appear here.
                        </p>
                    </div>
                )}

                {/* RESPONSE LIST */}
                <div className="grid gap-5">
                    {responses.map((response) => {
                        // The backend stores the student in studentId.
                        const student =
                            response.studentId &&
                                typeof response.studentId === "object"
                                ? response.studentId
                                : response.student &&
                                    typeof response.student === "object"
                                    ? response.student
                                    : {};

                        const isLoading = actionLoading === response._id;

                        return (
                            <div
                                key={response._id}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                {/* STUDENT HEADER */}
                                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                                    <div className="flex gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#1E1B4B]">
                                            {student.photo ? (
                                                <img
                                                    src={student.photo}
                                                    alt={student.name || "Student"}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xl font-black text-white">
                                                    {student.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "S"}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-black text-[#1E1B4B]">
                                                {student.name || "Student"}
                                            </h2>

                                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                                <Mail className="h-4 w-4" />
                                                {student.email || "No email"}
                                            </div>

                                            {response.createdAt && (
                                                <p className="mt-2 text-xs text-slate-400">
                                                    Responded{" "}
                                                    {new Date(
                                                        response.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <StatusBadge status={response.status} />
                                </div>

                                {/* STUDENT DETAILS */}
                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <InfoBox
                                        icon={GraduationCap}
                                        label="College"
                                        value={student.college || "Not provided"}
                                    />

                                    <InfoBox
                                        icon={GraduationCap}
                                        label="Branch / Year"
                                        value={`${student.branch || "N/A"} • ${student.year || "N/A"}`}
                                    />

                                    <InfoBox
                                        icon={BriefcaseBusiness}
                                        label="Role"
                                        value={student.role || "Not specified"}
                                    />
                                </div>

                                {/* SKILLS */}
                                {Array.isArray(student.skills) &&
                                    student.skills.length > 0 && (
                                        <div className="mt-6">
                                            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1E1B4B]">
                                                <Code2 className="h-4 w-4 text-[#14B8A6]" />
                                                Skills
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {student.skills.map(
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

                                {/* STUDENT MESSAGE */}
                                {response.message && (
                                    <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                                        <p className="mb-2 text-xs font-bold uppercase text-[#14B8A6]">
                                            Student Message
                                        </p>

                                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                                            {response.message}
                                        </p>
                                    </div>
                                )}

                                {/* ACTIONS */}
                                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                                    {response.status === "pending" && (
                                        <>
                                            <button
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() =>
                                                    updateStatus(
                                                        response._id,
                                                        "accepted"
                                                    )
                                                }
                                                className="flex items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-2.5 font-bold text-white transition hover:bg-[#0d9488] disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                {isLoading
                                                    ? "Updating..."
                                                    : "Accept"}
                                            </button>

                                            <button
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() =>
                                                    updateStatus(
                                                        response._id,
                                                        "rejected"
                                                    )
                                                }
                                                className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                {isLoading
                                                    ? "Updating..."
                                                    : "Reject"}
                                            </button>
                                        </>
                                    )}

                                    {student.email && (
                                        <a
                                            href={`mailto:${student.email}`}
                                            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 transition hover:bg-slate-50"
                                        >
                                            <Mail className="h-4 w-4" />
                                            Contact
                                        </a>
                                    )}

                                    {student.linkedin && (
                                        <a
                                            href={student.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 transition hover:bg-slate-50"
                                        >
                                            LinkedIn
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

// =====================================================
// INFO BOX
// =====================================================

function InfoBox({ icon: Icon, label, value }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                <Icon className="h-4 w-4 text-[#14B8A6]" />
                {label}
            </div>

            <p className="mt-2 break-words text-sm font-semibold text-[#1E1B4B]">
                {value}
            </p>
        </div>
    );
}

// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({ status }) {
    const config = {
        pending: {
            label: "Pending",
            className: "bg-amber-50 text-amber-600",
            icon: Clock3,
        },
        accepted: {
            label: "Accepted",
            className: "bg-green-50 text-green-600",
            icon: CheckCircle,
        },
        rejected: {
            label: "Rejected",
            className: "bg-red-50 text-red-600",
            icon: XCircle,
        },
    };

    const current = config[status] || config.pending;
    const Icon = current.icon;

    return (
        <span
            className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-bold ${current.className}`}
        >
            <Icon className="h-4 w-4" />
            {current.label}
        </span>
    );
}
