import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    MapPin,
    Building2,
    Send,
    ExternalLink,
    Lightbulb,
    X,
    CheckCircle,
    Sparkles,
    ArrowUpRight,
    Code2,
    BriefcaseBusiness,
    Clock3,
    ChevronDown,
    Mail,
    ArrowLeft,
    Home,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function RealWorldProblems() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [interestProblem, setInterestProblem] = useState(null);
    const [interestMessage, setInterestMessage] = useState("");
    const [interestLoading, setInterestLoading] = useState(false);
    const [interestedProblems, setInterestedProblems] = useState([]);

    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {
        fetchProblems();
        fetchMyInterests();
    }, []);

    // =====================================================
    // FETCH PROBLEMS
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

            setProblems(response.data?.problems || []);
        } catch (err) {
            console.error("Fetch problems error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load real-world problems."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // FETCH MY INTERESTS
    // =====================================================

    const fetchMyInterests = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const response = await axios.get(
                `${API_URL}/problem-interests/my`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const interests =
                response.data?.interests ||
                response.data?.data ||
                [];

            const ids = interests
                .map((item) => {
                    if (typeof item.problemId === "object") {
                        return item.problemId?._id;
                    }

                    return item.problemId;
                })
                .filter(Boolean);

            setInterestedProblems(ids);
        } catch (err) {
            console.error("Fetch interests error:", err);
        }
    };

    // =====================================================
    // VIEW PROBLEM
    // =====================================================

    const handleView = async (problemId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            await axios.post(
                `${API_URL}/problems/${problemId}/view`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (err) {
            console.error("View problem error:", err);
        }
    };

    // =====================================================
    // INTEREST
    // =====================================================

    const handleInterestSubmit = async () => {
        if (!interestProblem) return;

        try {
            setInterestLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login again.");
                return;
            }

            await axios.post(
                `${API_URL}/problem-interests`,
                {
                    problemId: interestProblem._id,
                    message: interestMessage.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setInterestedProblems((prev) =>
                prev.includes(interestProblem._id)
                    ? prev
                    : [...prev, interestProblem._id]
            );

            setInterestProblem(null);
            setInterestMessage("");

            alert(
                "Your interest has been submitted successfully!"
            );
        } catch (err) {
            console.error(
                "Interest submission error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Failed to submit interest."
            );
        } finally {
            setInterestLoading(false);
        }
    };

    // =====================================================
    // LIKE
    // =====================================================

    const handleLike = async (problemId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/problems/${problemId}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchProblems();
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    // =====================================================
    // SAVE
    // =====================================================

    const handleSave = async (problemId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/problems/${problemId}/save`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchProblems();
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    // =====================================================
    // SHARE
    // =====================================================

    const handleShare = async (problemId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/problems/${problemId}/share`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const shareUrl =
                `${window.location.origin}/problems/${problemId}`;

            if (navigator.share) {
                await navigator.share({
                    title: "CONEXA Real-World Problem",
                    text:
                        "Check out this real-world problem on CONEXA.",
                    url: shareUrl,
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareUrl);

                alert("Problem link copied!");
            } else {
                alert("Problem shared successfully!");
            }

            await fetchProblems();
        } catch (err) {
            if (err?.name !== "AbortError") {
                console.error("Share error:", err);
            }
        }
    };

    // =====================================================
    // COMMENT
    // =====================================================

    const handleComment = async (
        problemId,
        text
    ) => {
        if (!text?.trim()) return;

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/problems/${problemId}/comment`,
                {
                    text: text.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchProblems();
        } catch (err) {
            console.error("Comment error:", err);

            alert(
                err.response?.data?.message ||
                "Failed to add comment."
            );
        }
    };

    // =====================================================
    // BACK TO HOME
    // =====================================================

    const handleBackHome = () => {
        window.location.href = "/";
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="flex min-h-[320px] items-center justify-center bg-[#F8FAFC]">
                <div className="relative">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#14B8A6]" />

                    <Sparkles className="absolute inset-0 m-auto h-4 w-4 text-[#14B8A6]" />
                </div>
            </div>
        );
    }

    // =====================================================
    // ERROR
    // =====================================================

    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-600">
                {error}
            </div>
        );
    }

    // =====================================================
    // ENGAGEMENT TOTAL
    // =====================================================

    const totalEngagement = problems.reduce(
        (total, problem) =>
            total +
            (problem.likes?.length || 0) +
            (problem.saves?.length || 0) +
            (problem.shares || 0) +
            (problem.comments?.length || 0),
        0
    );

    return (
        <>
            <section className="space-y-5">

                {/* =================================================
                    TOP NAVIGATION
                ================================================= */}

                <div className="flex items-center justify-between gap-3">

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "/student-dashboard";
                        }}
                        className="
        group
        inline-flex
        items-center
        gap-2
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-4
        py-2.5
        text-sm
        font-bold
        text-[#1E1B4B]
        shadow-sm
        transition-all
        duration-300
        hover:-translate-x-1
        hover:border-teal-200
        hover:bg-teal-50
        hover:text-[#0F766E]
        hover:shadow-md
        active:scale-95
    "
                    >
                        <span
                            className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-xl
            bg-slate-50
            transition-all
            duration-300
            group-hover:bg-white
            group-hover:shadow-sm
        "
                        >
                            <ArrowLeft
                                size={16}
                                className="transition-transform duration-300 group-hover:-translate-x-0.5"
                            />
                        </span>

                        <span>
                            Back to Student Dashboard
                        </span>
                    </button>

                    <div
                        className="
                            hidden
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-teal-100
                            bg-teal-50
                            px-3
                            py-2
                            text-[11px]
                            font-black
                            text-[#0F766E]
                            sm:flex
                        "
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14B8A6] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14B8A6]" />
                        </span>

                        Live Opportunities
                    </div>
                </div>

                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        shadow-sm
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:border-teal-200
                        hover:shadow-xl
                        md:p-6
                    "
                >

                    <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#14B8A6]/10 transition-transform duration-700 group-hover:scale-125" />

                    <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-indigo-100/40 transition-transform duration-700 group-hover:scale-125" />

                    <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">

                        <div className="min-w-0">

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-bold text-[#0F766E] transition-all duration-300 group-hover:scale-105">
                                <Sparkles size={14} />
                                REAL-WORLD OPPORTUNITIES
                            </div>

                            <h2 className="text-2xl font-black tracking-tight text-[#1E1B4B] md:text-3xl">
                                Solve Real Problems.
                                <span className="text-[#14B8A6]">
                                    {" "}Create Impact.
                                </span>
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Explore challenges posted by
                                stakeholders and organizations.
                                Find the right opportunity,
                                showcase your skills and build
                                something meaningful.
                            </p>

                        </div>

                        {/* Mini stats */}

                        <div className="grid shrink-0 grid-cols-2 gap-3">

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-5
                                    py-4
                                    text-center
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-white
                                    hover:shadow-md
                                "
                            >
                                <p className="text-2xl font-black text-[#1E1B4B]">
                                    {problems.length}
                                </p>

                                <p className="text-[11px] font-semibold text-slate-500">
                                    Problems
                                </p>
                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-teal-100
                                    bg-teal-50
                                    px-5
                                    py-4
                                    text-center
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-md
                                "
                            >
                                <p className="text-2xl font-black text-[#0F766E]">
                                    {totalEngagement}
                                </p>

                                <p className="text-[11px] font-semibold text-teal-700">
                                    Engagement
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {problems.length === 0 ? (
                    <EmptyProblems />
                ) : (
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        {problems.map((problem) => (
                            <ProblemCard
                                key={problem._id}
                                problem={problem}
                                onView={handleView}
                                onLike={handleLike}
                                onSave={handleSave}
                                onShare={handleShare}
                                onComment={handleComment}
                                onInterest={() =>
                                    setInterestProblem(problem)
                                }
                                isInterested={interestedProblems.includes(
                                    problem._id
                                )}
                            />
                        ))}

                    </div>
                )}

            </section>

            {/* =====================================================
                INTEREST MODAL
            ===================================================== */}

            {interestProblem && (
                <InterestModal
                    problem={interestProblem}
                    message={interestMessage}
                    setMessage={setInterestMessage}
                    loading={interestLoading}
                    onClose={() => {
                        if (!interestLoading) {
                            setInterestProblem(null);
                            setInterestMessage("");
                        }
                    }}
                    onSubmit={handleInterestSubmit}
                />
            )}
        </>
    );
}

// =========================================================
// EMPTY PROBLEMS
// =========================================================

function EmptyProblems() {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                px-6
                py-14
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#1E1B4B] via-[#14B8A6] to-[#1E1B4B]" />

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-50 to-indigo-50 transition-transform duration-500 hover:rotate-6 hover:scale-110">
                <Lightbulb className="h-9 w-9 text-[#14B8A6]" />
            </div>

            <h3 className="mt-5 text-xl font-black text-[#1E1B4B]">
                No Problems Yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Stakeholders haven't posted any
                real-world problems yet. New
                opportunities will appear here.
            </p>

        </div>
    );
}

// =========================================================
// PROBLEM CARD
// =========================================================

function ProblemCard({
    problem,
    onView,
    onLike,
    onSave,
    onShare,
    onComment,
    onInterest,
    isInterested,
}) {
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);

    const stakeholder =
        problem.stakeholderId || {};

    // =====================================================
    // RECORD VIEW WHEN CARD ENTERS VIEWPORT
    // =====================================================

    useEffect(() => {
        const cardId = `problem-card-${problem._id}`;
        const cardElement = document.getElementById(cardId);

        if (!cardElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    onView(problem._id);

                    observer.disconnect();
                }
            },
            {
                threshold: 0.35,
            }
        );

        observer.observe(cardElement);

        return () => {
            observer.disconnect();
        };
    }, [problem._id, onView]);

    // =====================================================
    // COMMENT
    // =====================================================

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!comment.trim()) return;

        await onComment(
            problem._id,
            comment
        );

        setComment("");
    };

    // =====================================================
    // DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) {
            return "No deadline";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =====================================================
    // GMAIL
    // =====================================================

    const gmailLink = problem.contactEmail
        ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            problem.contactEmail
        )}&su=${encodeURIComponent(
            `Regarding: ${problem.title}`
        )}`
        : "#";

    return (
        <article
            id={`problem-card-${problem._id}`}
            className="
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-[26px]
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-2
                hover:scale-[1.01]
                hover:border-teal-200
                hover:shadow-2xl
                active:scale-[0.995]
            "
        >

            {/* Animated glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -inset-px
                    rounded-[26px]
                    bg-gradient-to-r
                    from-[#14B8A6]/0
                    via-[#14B8A6]/10
                    to-indigo-500/0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            />

            {/* TOP COLOR STRIP */}

            <div className="relative h-1 bg-gradient-to-r from-[#1E1B4B] via-[#14B8A6] to-[#6366F1] transition-all duration-500 group-hover:h-1.5" />

            {/* CARD BODY */}

            <div className="relative flex flex-1 flex-col p-5">

                {/* HEADER */}

                <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="relative shrink-0">

                            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] p-[2px] transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">

                                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#1E1B4B]">

                                    {stakeholder.photo ? (
                                        <img
                                            src={stakeholder.photo}
                                            alt="Stakeholder"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Building2
                                            size={19}
                                            className="text-white"
                                        />
                                    )}

                                </div>

                            </div>

                            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#14B8A6]">
                                <CheckCircle
                                    size={9}
                                    className="text-white"
                                />
                            </div>

                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-sm font-black text-[#1E1B4B]">
                                {stakeholder.organizationName ||
                                    stakeholder.name ||
                                    problem.organizationName ||
                                    "Organization"}
                            </p>

                            <div className="mt-0.5 flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-[#14B8A6]">
                                    Stakeholder
                                </span>

                                <span className="h-1 w-1 rounded-full bg-slate-300" />

                                <span className="text-[10px] text-slate-400">
                                    Real-world
                                </span>
                            </div>

                        </div>

                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-[10px] font-black text-indigo-600 transition-all duration-300 group-hover:scale-105">
                        <Lightbulb size={12} />
                        PROBLEM
                    </div>

                </div>

                {/* TITLE */}

                <div className="mt-5">

                    <div className="flex items-start gap-2">

                        <h2 className="line-clamp-2 flex-1 text-xl font-black leading-tight text-[#1E1B4B]">
                            {problem.title}
                        </h2>

                        <ArrowUpRight
                            size={19}
                            className="
                                mt-0.5
                                shrink-0
                                text-slate-300
                                transition-all
                                duration-300
                                group-hover:-translate-y-1
                                group-hover:translate-x-1
                                group-hover:text-[#14B8A6]
                            "
                        />

                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
                        {problem.description}
                    </p>

                </div>

                {/* INFO BOXES */}

                <div className="mt-5 grid grid-cols-2 gap-2.5">

                    <InfoBox
                        icon={Lightbulb}
                        title="Problem"
                        value={
                            problem.problemInfo ||
                            "Problem details available"
                        }
                        type="purple"
                    />

                    <InfoBox
                        icon={MapPin}
                        title="Location"
                        value={
                            problem.location ||
                            "Remote / Flexible"
                        }
                        type="teal"
                    />

                    <InfoBox
                        icon={Clock3}
                        title="Deadline"
                        value={formatDate(problem.deadline)}
                        type="orange"
                    />

                    <InfoBox
                        icon={BriefcaseBusiness}
                        title="Organization"
                        value={
                            problem.organizationName ||
                            stakeholder.organizationName ||
                            "Stakeholder"
                        }
                        type="blue"
                    />

                </div>

                {/* SKILLS + TECHNOLOGIES */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                    <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">

                        <div className="mb-2 flex items-center gap-1.5">
                            <Code2
                                size={14}
                                className="text-[#14B8A6]"
                            />

                            <p className="text-[11px] font-black text-[#1E1B4B]">
                                Skills
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5">

                            {problem.requiredSkills
                                ?.slice(0, 3)
                                .map(
                                    (skill, index) => (
                                        <span
                                            key={`${skill}-${index}`}
                                            className="rounded-lg border border-teal-100 bg-white px-2 py-1 text-[10px] font-bold text-teal-700 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}

                            {!problem.requiredSkills?.length && (
                                <span className="text-[10px] text-slate-400">
                                    Not specified
                                </span>
                            )}

                            {problem.requiredSkills?.length > 3 && (
                                <span className="rounded-lg bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700">
                                    +{problem.requiredSkills.length - 3}
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">

                        <div className="mb-2 flex items-center gap-1.5">
                            <BriefcaseBusiness
                                size={14}
                                className="text-indigo-500"
                            />

                            <p className="text-[11px] font-black text-[#1E1B4B]">
                                Tech
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5">

                            {problem.technologies
                                ?.slice(0, 3)
                                .map(
                                    (
                                        technology,
                                        index
                                    ) => (
                                        <span
                                            key={`${technology}-${index}`}
                                            className="rounded-lg border border-indigo-100 bg-white px-2 py-1 text-[10px] font-bold text-indigo-700 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                                        >
                                            {technology}
                                        </span>
                                    )
                                )}

                            {!problem.technologies?.length && (
                                <span className="text-[10px] text-slate-400">
                                    Not specified
                                </span>
                            )}

                            {problem.technologies?.length > 3 && (
                                <span className="rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700">
                                    +{problem.technologies.length - 3}
                                </span>
                            )}

                        </div>

                    </div>

                </div>

                {/* INTEREST BUTTON */}

                <button
                    type="button"
                    onClick={onInterest}
                    disabled={isInterested}
                    className={`
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        font-black
                        transition-all
                        duration-300
                        active:scale-[0.97]
                        ${isInterested
                            ? "cursor-not-allowed border border-green-100 bg-green-50 text-green-600"
                            : "bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/20"
                        }
                    `}
                >

                    <CheckCircle size={17} />

                    {isInterested
                        ? "Interest Submitted"
                        : "I'm Interested"}

                    {!isInterested && (
                        <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    )}

                </button>

            </div>

            {/* ACTION BAR */}

            <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3">

                <div className="flex items-center justify-between gap-1">

                    {/* LIKE */}

                    <button
                        type="button"
                        onClick={() =>
                            onLike(problem._id)
                        }
                        className={`
                            flex
                            items-center
                            gap-1.5
                            rounded-xl
                            px-3
                            py-2
                            text-xs
                            font-bold
                            transition-all
                            duration-200
                            active:scale-90
                            ${problem.liked
                                ? "bg-red-50 text-red-500"
                                : "text-slate-500 hover:bg-red-50 hover:text-red-500 hover:-translate-y-0.5"
                            }
                        `}
                    >

                        <Heart
                            size={16}
                            fill={
                                problem.liked
                                    ? "currentColor"
                                    : "none"
                            }
                        />

                        {problem.likes?.length || 0}

                    </button>

                    {/* COMMENTS */}

                    <button
                        type="button"
                        onClick={() =>
                            setShowComments(
                                (prev) => !prev
                            )
                        }
                        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-600 active:scale-90"
                    >

                        <MessageCircle size={16} />

                        {problem.comments?.length || 0}

                        <ChevronDown
                            size={13}
                            className={`transition-transform ${showComments
                                ? "rotate-180"
                                : ""
                                }`}
                        />

                    </button>

                    {/* SAVE */}

                    <button
                        type="button"
                        onClick={() =>
                            onSave(problem._id)
                        }
                        className={`
                            flex
                            items-center
                            gap-1.5
                            rounded-xl
                            px-3
                            py-2
                            text-xs
                            font-bold
                            transition-all
                            duration-200
                            active:scale-90
                            ${problem.saved
                                ? "bg-amber-50 text-amber-600"
                                : "text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:-translate-y-0.5"
                            }
                        `}
                    >

                        <Bookmark
                            size={16}
                            fill={
                                problem.saved
                                    ? "currentColor"
                                    : "none"
                            }
                        />

                        <span className="hidden sm:inline">
                            {problem.saved
                                ? "Saved"
                                : "Save"}
                        </span>

                    </button>

                    {/* SHARE */}

                    <button
                        type="button"
                        onClick={() =>
                            onShare(problem._id)
                        }
                        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-50 hover:text-[#14B8A6] active:scale-90"
                    >

                        <Share2 size={16} />

                        <span className="hidden sm:inline">
                            Share
                        </span>

                    </button>

                    {/* CONTACT */}

                    {problem.contactEmail && (
                        <a
                            href={gmailLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto flex items-center gap-1.5 rounded-xl bg-[#1E1B4B] px-3 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#312E81] hover:shadow-md active:scale-90"
                        >

                            <Mail size={15} />

                            <span className="hidden sm:inline">
                                Contact
                            </span>

                            <ExternalLink size={12} />

                        </a>
                    )}

                </div>

            </div>

            {/* COMMENTS */}

            {showComments && (
                <div className="border-t border-slate-100 bg-white px-4 py-4">

                    {problem.comments?.length > 0 ? (
                        <div className="mb-4 space-y-2.5">

                            {problem.comments
                                .slice(-2)
                                .map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                item._id ||
                                                index
                                            }
                                            className="flex gap-2.5"
                                        >

                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-teal-100">

                                                {item.userId?.photo ? (
                                                    <img
                                                        src={
                                                            item
                                                                .userId
                                                                .photo
                                                        }
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-600">
                                                        {item
                                                            .userId
                                                            ?.name
                                                            ?.charAt(
                                                                0
                                                            )
                                                            ?.toUpperCase() ||
                                                            "U"}
                                                    </span>
                                                )}

                                            </div>

                                            <div className="flex-1 rounded-2xl bg-slate-50 px-3 py-2">

                                                <p className="text-xs font-black text-[#1E1B4B]">
                                                    {item
                                                        .userId
                                                        ?.name ||
                                                        "User"}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {item.text}
                                                </p>

                                            </div>

                                        </div>
                                    )
                                )}

                            {problem.comments.length > 2 && (
                                <p className="text-center text-[10px] font-semibold text-slate-400">
                                    Showing latest 2 comments
                                </p>
                            )}

                        </div>
                    ) : (
                        <p className="mb-3 text-center text-xs text-slate-400">
                            No comments yet. Start the conversation.
                        </p>
                    )}

                    <form
                        onSubmit={
                            handleSubmitComment
                        }
                        className="flex gap-2"
                    >

                        <input
                            id={`comment-${problem._id}`}
                            type="text"
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
                            }
                            placeholder="Ask something..."
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/10"
                        />

                        <button
                            type="submit"
                            disabled={!comment.trim()}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#14B8A6] text-white transition-all hover:bg-[#0F766E] hover:scale-105 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <Send size={15} />
                        </button>

                    </form>

                </div>
            )}

        </article>
    );
}

// =========================================================
// INFO BOX
// =========================================================

function InfoBox({
    icon: Icon,
    title,
    value,
    type,
}) {
    const styles = {
        purple: {
            box: "border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-white",
            icon: "bg-white text-indigo-600 border-indigo-100",
            title: "text-indigo-700",
        },

        teal: {
            box: "border-teal-100 bg-gradient-to-br from-teal-50/70 to-white",
            icon: "bg-white text-[#14B8A6] border-teal-100",
            title: "text-[#0F766E]",
        },

        orange: {
            box: "border-orange-100 bg-gradient-to-br from-orange-50/70 to-white",
            icon: "bg-white text-orange-500 border-orange-100",
            title: "text-orange-700",
        },

        blue: {
            box: "border-blue-100 bg-gradient-to-br from-blue-50/70 to-white",
            icon: "bg-white text-blue-600 border-blue-100",
            title: "text-blue-700",
        },
    };

    const style = styles[type];

    return (
        <div
            className={`
                group/info
                min-w-0
                rounded-2xl
                border
                p-3
                ${style.box}
                transition-all
                duration-300
                hover:-translate-y-1
                hover:scale-[1.02]
                hover:shadow-md
                active:scale-[0.98]
            `}
        >

            <div className="flex items-center gap-2">

                <div
                    className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover/info:rotate-6
                        group-hover/info:scale-110
                        ${style.icon}
                    `}
                >
                    <Icon size={15} />
                </div>

                <p
                    className={`
                        truncate
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wide
                        ${style.title}
                    `}
                >
                    {title}
                </p>

            </div>

            <p className="mt-2 line-clamp-2 text-xs font-semibold leading-4 text-slate-600">
                {value}
            </p>

        </div>
    );
}

// =========================================================
// INTEREST MODAL
// =========================================================

function InterestModal({
    problem,
    message,
    setMessage,
    loading,
    onClose,
    onSubmit,
}) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className="
                    relative
                    max-h-[90vh]
                    w-full
                    max-w-lg
                    overflow-y-auto
                    rounded-[28px]
                    bg-white
                    shadow-2xl
                    animate-[fadeIn_.25s_ease-out]
                "
            >

                <div className="relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#14B8A6] px-6 py-6 text-white">

                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

                    <div className="relative flex items-start justify-between">

                        <div>

                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                                <Sparkles size={19} />
                            </div>

                            <h3 className="text-xl font-black">
                                Show Your Interest
                            </h3>

                            <p className="mt-1 text-xs text-white/70">
                                Tell the stakeholder why
                                you are interested.
                            </p>

                        </div>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90"
                        >
                            <X size={18} />
                        </button>

                    </div>

                </div>

                <div className="p-6">

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

                        <div className="flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50">
                                <Lightbulb
                                    size={15}
                                    className="text-[#14B8A6]"
                                />
                            </div>

                            <span className="text-[10px] font-black uppercase tracking-wider text-[#14B8A6]">
                                Problem
                            </span>

                        </div>

                        <h4 className="mt-3 font-black text-[#1E1B4B]">
                            {problem.title}
                        </h4>

                        <p className="mt-1 line-clamp-3 text-xs leading-5 text-slate-500">
                            {problem.description}
                        </p>

                    </div>

                    <div className="mt-5">

                        <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                            Your Message
                            <span className="ml-1 font-normal text-slate-400">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            value={message}
                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                            rows={4}
                            maxLength={500}
                            placeholder="Tell the stakeholder about your skills, experience or idea..."
                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/10"
                        />

                        <p className="mt-1 text-right text-[10px] text-slate-400">
                            {message.length}/500
                        </p>

                    </div>

                    <div className="mt-4 flex gap-3 rounded-2xl border border-teal-100 bg-teal-50 p-4">

                        <CheckCircle
                            size={18}
                            className="mt-0.5 shrink-0 text-[#14B8A6]"
                        />

                        <p className="text-xs leading-5 text-slate-600">
                            Your profile and message will
                            be shared with the stakeholder
                            who posted this problem.
                        </p>

                    </div>

                    <div className="mt-5 flex gap-3">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={onSubmit}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:opacity-50"
                        >

                            {loading ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={17} />
                                    Confirm Interest
                                </>
                            )}

                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}