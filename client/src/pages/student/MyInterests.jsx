import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ArrowLeft,
    BriefcaseBusiness,
    CheckCircle,
    Clock3,
    XCircle,
    Building2,
    MapPin,
    CalendarDays,
    MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export default function MyInterests() {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchInterests();
    }, []);

    const fetchInterests = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/problem-interests/my`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setInterests(
                response.data?.interests || []
            );
        } catch (err) {
            console.error(
                "Fetch interests error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load your interests."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#14B8A6] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* HEADER */}

            <header className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-5">

                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#14B8A6]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                </div>
            </header>


            {/* MAIN */}

            <main className="max-w-6xl mx-auto px-6 py-8">

                <div className="mb-8">

                    <div className="flex items-center gap-2 text-[#14B8A6] text-sm font-bold mb-2">
                        <BriefcaseBusiness className="w-4 h-4" />
                        MY INTERESTS
                    </div>

                    <h1 className="text-3xl font-black text-[#1E1B4B]">
                        Problems I'm Interested In
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Track the problems you have
                        shown interest in and their
                        current status.
                    </p>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 mb-6">
                        {error}
                    </div>
                )}


                {/* EMPTY */}

                {!error &&
                    interests.length === 0 && (
                        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">

                            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center">
                                <BriefcaseBusiness className="w-7 h-7 text-[#14B8A6]" />
                            </div>

                            <h2 className="text-xl font-black text-[#1E1B4B] mt-5">
                                No Interests Yet
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Explore real-world problems
                                and click "I'm Interested"
                                to connect with stakeholders.
                            </p>

                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-[#14B8A6] text-white font-bold hover:bg-[#0d9488]"
                            >
                                Explore Problems
                            </Link>

                        </div>
                    )}


                {/* INTEREST CARDS */}

                <div className="grid gap-5">

                    {interests.map((interest) => {

                        const problem =
                            interest.problemId || {};

                        const stakeholder =
                            problem.stakeholderId ||
                            {};

                        return (
                            <div
                                key={interest._id}
                                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                            >

                                {/* TOP */}

                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                                    <div>

                                        <h2 className="text-xl font-black text-[#1E1B4B]">
                                            {problem.title ||
                                                "Problem"}
                                        </h2>

                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">

                                            {stakeholder.organizationName && (
                                                <span className="flex items-center gap-1.5">
                                                    <Building2 className="w-4 h-4" />
                                                    {
                                                        stakeholder.organizationName
                                                    }
                                                </span>
                                            )}

                                            {problem.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" />
                                                    {
                                                        problem.location
                                                    }
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                    <StatusBadge
                                        status={
                                            interest.status
                                        }
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <p className="text-slate-600 leading-relaxed mt-5">
                                    {problem.description ||
                                        "No description available."}
                                </p>


                                {/* SKILLS */}

                                {problem.requiredSkills
                                    ?.length > 0 && (
                                        <div className="mt-5">

                                            <p className="text-xs font-bold uppercase text-slate-400 mb-2">
                                                Required Skills
                                            </p>

                                            <div className="flex flex-wrap gap-2">

                                                {problem.requiredSkills.map(
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

                                {interest.message && (
                                    <div className="mt-5 p-4 rounded-2xl bg-slate-50">

                                        <div className="flex items-center gap-2 text-xs font-bold text-[#14B8A6] uppercase mb-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Your Message
                                        </div>

                                        <p className="text-sm text-slate-600">
                                            {
                                                interest.message
                                            }
                                        </p>

                                    </div>
                                )}


                                {/* FOOTER */}

                                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100">

                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <CalendarDays className="w-4 h-4" />

                                        Applied{" "}
                                        {formatDate(
                                            interest.createdAt
                                        )}
                                    </div>

                                    {interest.status ===
                                        "accepted" && (
                                            <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                Stakeholder accepted your interest
                                            </div>
                                        )}

                                    {interest.status ===
                                        "rejected" && (
                                            <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                                                <XCircle className="w-4 h-4" />
                                                Interest was rejected
                                            </div>
                                        )}

                                    {interest.status ===
                                        "pending" && (
                                            <div className="flex items-center gap-2 text-sm font-bold text-amber-600">
                                                <Clock3 className="w-4 h-4" />
                                                Waiting for response
                                            </div>
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
        config[status] || config.pending;

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


// =====================================================
// DATE
// =====================================================

function formatDate(date) {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}