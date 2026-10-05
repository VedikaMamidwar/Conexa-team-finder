import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export default function StudentResponses() {
    const { problemId } = useParams();

    const [responses, setResponses] = useState([]);
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchResponses();
    }, [problemId]);

    const fetchResponses = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/problem-interests/problem/${problemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setResponses(data?.responses || []);

            if (data?.responses?.length > 0) {
                setProblem(
                    data.responses[0]?.problemId
                );
            }
        } catch (err) {
            console.error(
                "Fetch responses error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load student responses."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // ACCEPT / REJECT
    // =====================================================

    const updateStatus = async (
        interestId,
        status
    ) => {
        try {
            setActionLoading(interestId);

            const token =
                localStorage.getItem("token");

            const response = await axios.patch(
                `${API_URL}/problem-interests/${interestId}/status`,
                {
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updated =
                response.data?.interest;

            if (updated) {
                setResponses((prev) =>
                    prev.map((item) =>
                        item._id === interestId
                            ? updated
                            : item
                    )
                );
            }
        } catch (err) {
            console.error(
                "Update response error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Failed to update response."
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#14B8A6] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="bg-white border-b border-slate-200">

                <div className="max-w-7xl mx-auto px-6 py-5">

                    <Link
                        to="/stakeholder/problems"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#14B8A6] transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to My Problems
                    </Link>

                </div>

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* TITLE */}

                <div className="mb-8">

                    <div className="flex items-center gap-2 text-[#14B8A6] text-sm font-bold mb-2">
                        <BriefcaseBusiness className="w-4 h-4" />
                        STUDENT RESPONSES
                    </div>

                    <h1 className="text-3xl font-black text-[#1E1B4B]">
                        Interested Students
                    </h1>

                    {problem?.title && (
                        <p className="text-slate-500 mt-2">
                            Responses for{" "}
                            <span className="font-semibold text-[#1E1B4B]">
                                {problem.title}
                            </span>
                        </p>
                    )}

                </div>


                {/* ERROR */}

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5">
                        {error}
                    </div>
                )}


                {/* EMPTY */}

                {!error &&
                    responses.length === 0 && (
                        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">

                            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center">
                                <User className="w-7 h-7 text-[#14B8A6]" />
                            </div>

                            <h2 className="text-xl font-black text-[#1E1B4B] mt-5">
                                No Student Responses Yet
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Students who show interest
                                in this problem will appear
                                here.
                            </p>

                        </div>
                    )}


                {/* RESPONSE LIST */}

                <div className="grid gap-5">

                    {responses.map((response) => {

                        const student =
                            response.studentId || {};

                        const isLoading =
                            actionLoading ===
                            response._id;

                        return (
                            <div
                                key={response._id}
                                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                            >

                                {/* STUDENT HEADER */}

                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">

                                    <div className="flex gap-4">

                                        <div className="w-14 h-14 rounded-2xl bg-[#1E1B4B] flex items-center justify-center overflow-hidden shrink-0">

                                            {student.photo ? (
                                                <img
                                                    src={
                                                        student.photo
                                                    }
                                                    alt={
                                                        student.name
                                                    }
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xl font-black text-white">
                                                    {student.name
                                                        ?.charAt(
                                                            0
                                                        )
                                                        ?.toUpperCase() ||
                                                        "S"}
                                                </span>
                                            )}

                                        </div>

                                        <div>

                                            <h2 className="text-xl font-black text-[#1E1B4B]">
                                                {student.name ||
                                                    "Student"}
                                            </h2>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                                <Mail className="w-4 h-4" />
                                                {student.email ||
                                                    "No email"}
                                            </div>

                                        </div>

                                    </div>


                                    {/* STATUS */}

                                    <StatusBadge
                                        status={
                                            response.status
                                        }
                                    />

                                </div>


                                {/* STUDENT DETAILS */}

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                                    <InfoBox
                                        icon={
                                            GraduationCap
                                        }
                                        label="College"
                                        value={
                                            student.college ||
                                            "Not provided"
                                        }
                                    />

                                    <InfoBox
                                        icon={
                                            GraduationCap
                                        }
                                        label="Branch / Year"
                                        value={`${student.branch || "N/A"} • ${student.year ||
                                            "N/A"
                                            }`}
                                    />

                                    <InfoBox
                                        icon={
                                            BriefcaseBusiness
                                        }
                                        label="Role"
                                        value={
                                            student.role ||
                                            "Not specified"
                                        }
                                    />

                                </div>


                                {/* SKILLS */}

                                {student.skills?.length >
                                    0 && (
                                        <div className="mt-6">

                                            <div className="flex items-center gap-2 text-sm font-bold text-[#1E1B4B] mb-3">
                                                <Code2 className="w-4 h-4 text-[#14B8A6]" />
                                                Skills
                                            </div>

                                            <div className="flex flex-wrap gap-2">

                                                {student.skills.map(
                                                    (
                                                        skill,
                                                        index
                                                    ) => (
                                                        <span
                                                            key={`${skill}-${index}`}
                                                            className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold"
                                                        >
                                                            {
                                                                skill
                                                            }
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </div>
                                    )}


                                {/* STUDENT MESSAGE */}

                                {response.message && (
                                    <div className="mt-6 p-4 rounded-2xl bg-slate-50">

                                        <p className="text-xs font-bold text-[#14B8A6] uppercase mb-2">
                                            Student Message
                                        </p>

                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {
                                                response.message
                                            }
                                        </p>

                                    </div>
                                )}


                                {/* ACTIONS */}

                                <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-slate-100">

                                    {response.status ===
                                        "pending" && (
                                            <>
                                                <button
                                                    type="button"
                                                    disabled={
                                                        isLoading
                                                    }
                                                    onClick={() =>
                                                        updateStatus(
                                                            response._id,
                                                            "accepted"
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14B8A6] text-white font-bold hover:bg-[#0d9488] transition disabled:opacity-50"
                                                >
                                                    <CheckCircle className="w-4 h-4" />

                                                    {isLoading
                                                        ? "Updating..."
                                                        : "Accept"}
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={
                                                        isLoading
                                                    }
                                                    onClick={() =>
                                                        updateStatus(
                                                            response._id,
                                                            "rejected"
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition disabled:opacity-50"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Reject
                                                </button>
                                            </>
                                        )}


                                    {student.email && (
                                        <a
                                            href={`mailto:${student.email}`}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition"
                                        >
                                            <Mail className="w-4 h-4" />
                                            Contact
                                        </a>
                                    )}

                                    {student.linkedin && (
                                        <a
                                            href={
                                                student.linkedin
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition"
                                        >
                                            LinkedIn
                                            <ExternalLink className="w-4 h-4" />
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

function InfoBox({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="p-4 rounded-2xl bg-slate-50">

            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                <Icon className="w-4 h-4 text-[#14B8A6]" />
                {label}
            </div>

            <p className="text-sm font-semibold text-[#1E1B4B] mt-2">
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
            className:
                "bg-amber-50 text-amber-600",
            icon: Clock3,
        },

        accepted: {
            label: "Accepted",
            className:
                "bg-green-50 text-green-600",
            icon: CheckCircle,
        },

        rejected: {
            label: "Rejected",
            className:
                "bg-red-50 text-red-600",
            icon: XCircle,
        },
    };

    const current =
        config[status] ||
        config.pending;

    const Icon = current.icon;

    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${current.className}`}
        >
            <Icon className="w-4 h-4" />
            {current.label}
        </span>
    );
}