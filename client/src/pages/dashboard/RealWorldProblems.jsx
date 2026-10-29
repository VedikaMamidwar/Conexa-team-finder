
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
    AlertCircle,
    ArrowLeft,
    Bookmark,
    Building2,
    CalendarDays,
    CheckCircle2,
    ExternalLink,
    Filter,
    Heart,
    Home,
    Lightbulb,
    LoaderCircle,
    MapPin,
    MessageCircle,
    Search,
    Send,
    Share2,
    Sparkles,
    UserRound,
    X,
} from "lucide-react";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).trim().replace(/\/+$/, "");

const api = axios.create({
    baseURL: API_URL,
    timeout: 20000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const toArray = (value) => Array.isArray(value) ? value : [];

const getId = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return String(value._id || value.id || "");
};

const getUserId = (user) => getId(user?._id || user?.id);

const getProblemId = (problem) => getId(problem?._id || problem?.id);

const getName = (value, fallback = "CONEXA Member") => {
    if (!value || typeof value === "string") return fallback;

    return (
        value.name ||
        value.organizationName ||
        value.fullName ||
        fallback
    );
};

const getStakeholder = (problem) =>
    problem?.stakeholderId ||
    problem?.stakeholder ||
    problem?.organization ||
    {};

const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback;

const formatDate = (value) => {
    if (!value) return "Not specified";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Not specified";

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const isProblemLiked = (problem, userId) => {
    if (typeof problem?.liked === "boolean") return problem.liked;

    return toArray(problem?.likes).some(
        (item) => getId(item?.userId || item) === userId
    );
};

const isProblemSaved = (problem, userId) => {
    if (typeof problem?.saved === "boolean") return problem.saved;
    if (typeof problem?.isSaved === "boolean") return problem.isSaved;

    return toArray(problem?.savedBy || problem?.saves).some(
        (item) => getId(item?.userId || item) === userId
    );
};

export default function RealWorldProblems() {
    const { user, loading: authLoading } = useAuth();

    const accountType = String(user?.accountType || "").toLowerCase();
    const accountStatus = String(
        user?.accountStatus || user?.status || ""
    ).toLowerCase();

    const userId = getUserId(user);

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [notice, setNotice] = useState("");
    const [search, setSearch] = useState("");
    const [skillFilter, setSkillFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [busyAction, setBusyAction] = useState("");
    const [commentDrafts, setCommentDrafts] = useState({});
    const [contactProblem, setContactProblem] = useState(null);
    const [contactMessage, setContactMessage] = useState("");
    const [interestProblem, setInterestProblem] = useState(null);

    const loadProblems = useCallback(async () => {
        setLoading(true);
        setPageError("");

        try {
            const response = await api.get("/problems");

            const list =
                response?.data?.problems ||
                response?.data?.data?.problems ||
                response?.data?.data ||
                [];

            setProblems(Array.isArray(list) ? list : []);
        } catch (error) {
            setPageError(
                getErrorMessage(
                    error,
                    "Unable to load real-world problems. Please try again."
                )
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authLoading && user && accountType === "student") {
            loadProblems();
        }
    }, [authLoading, user, accountType, loadProblems]);

    const allSkills = useMemo(() => {
        const skills = problems.flatMap((problem) => [
            ...toArray(problem.requiredSkills),
            ...toArray(problem.technologies),
        ]);

        return [...new Set(
            skills.map((skill) => String(skill).trim()).filter(Boolean)
        )].sort((a, b) => a.localeCompare(b));
    }, [problems]);

    const filteredProblems = useMemo(() => {
        const term = search.trim().toLowerCase();

        const result = problems.filter((problem) => {
            const stakeholder = getStakeholder(problem);

            const searchableText = [
                problem.title,
                problem.description,
                problem.problemInfo,
                problem.organizationName,
                stakeholder.name,
                stakeholder.organizationName,
                problem.location,
                ...toArray(problem.requiredSkills),
                ...toArray(problem.technologies),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch = !term || searchableText.includes(term);

            const skills = [
                ...toArray(problem.requiredSkills),
                ...toArray(problem.technologies),
            ].map((item) => String(item).toLowerCase());

            const matchesSkill =
                skillFilter === "all" ||
                skills.includes(skillFilter.toLowerCase());

            return matchesSearch && matchesSkill;
        });

        result.sort((a, b) => {
            if (sortBy === "oldest") {
                return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
            }

            if (sortBy === "popular") {
                return toArray(b.likes).length - toArray(a.likes).length;
            }

            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

        return result;
    }, [problems, search, skillFilter, sortBy]);

    const runProblemAction = async (
        problem,
        action,
        body = {},
        successMessage = "Action completed."
    ) => {
        const problemId = getProblemId(problem);

        if (!problemId) {
            setNotice("This problem has an invalid ID.");
            return null;
        }

        const actionKey = `${problemId}:${action}`;

        setBusyAction(actionKey);
        setNotice("");

        try {
            const response = await api.post(
                `/problems/${problemId}/${action}`,
                body
            );

            await loadProblems();

            setNotice(response?.data?.message || successMessage);

            return response?.data;
        } catch (error) {
            setNotice(
                getErrorMessage(error, "The action could not be completed.")
            );
            return null;
        } finally {
            setBusyAction("");
        }
    };

    const handleComment = async (problem) => {
        const problemId = getProblemId(problem);
        const text = String(commentDrafts[problemId] || "").trim();

        if (!text) {
            setNotice("Please write a comment first.");
            return;
        }

        const result = await runProblemAction(
            problem,
            "comment",
            { text },
            "Comment added successfully."
        );

        if (result) {
            setCommentDrafts((previous) => ({
                ...previous,
                [problemId]: "",
            }));
        }
    };

    const handleShare = async (problem) => {
        const result = await runProblemAction(
            problem,
            "share",
            {},
            "Problem share recorded."
        );

        if (!result) return;

        const shareUrl = `${window.location.origin}/real-world-problems`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: problem.title || "CONEXA Problem",
                    text: problem.description ||
                        "Explore this challenge on CONEXA.",
                    url: shareUrl,
                });
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl);
                setNotice("Problem link copied.");
            } else {
                setNotice(`Share this link: ${shareUrl}`);
            }
        } catch (error) {
            if (error?.name !== "AbortError") {
                setNotice("Unable to open the sharing option.");
            }
        }
    };

    const handleContactRequest = async (event) => {
        event.preventDefault();

        if (!contactProblem) return;

        const message = contactMessage.trim();

        if (!message) {
            setNotice("Please enter a short message.");
            return;
        }

        const result = await runProblemAction(
            contactProblem,
            "contact-request",
            { message },
            "Contact request sent successfully."
        );

        if (result) {
            setContactProblem(null);
            setContactMessage("");
        }
    };

    const handleInterest = async () => {
        if (!interestProblem) return;

        const result = await runProblemAction(
            interestProblem,
            "interest",
            {},
            "Your interest has been recorded."
        );

        if (result) setInterestProblem(null);
    };

    if (authLoading) return <LoadingScreen />;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (accountType === "stakeholder") {
        if (accountStatus === "pending") {
            return <Navigate to="/stakeholder-pending" replace />;
        }

        if (accountStatus !== "active") {
            return <Navigate to="/login" replace />;
        }

        return <Navigate to="/stakeholder/problems" replace />;
    }

    if (accountType !== "student") {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* BACK TO STUDENT DASHBOARD */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <Link
                        to="/dashboard"
                        className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#1E1B4B] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 transition group-hover:bg-teal-100">
                            <Home
                                size={19}
                                className="text-[#1E1B4B] transition group-hover:text-teal-700"
                            />
                        </span>

                        <span className="flex flex-col items-start">
                            <span>Back to Home</span>
                            <span className="text-[11px] font-medium text-slate-400">
                                Student Dashboard
                            </span>
                        </span>

                        <ArrowLeft
                            size={16}
                            className="ml-1 transition group-hover:-translate-x-1"
                        />
                    </Link>

                    <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-800">
                        <CheckCircle2 size={15} />
                        Student Workspace
                    </span>
                </div>

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#0F766E] p-6 text-white shadow-xl sm:p-8"
                >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                                <Sparkles size={14} />
                                Stakeholder Challenges
                            </div>

                            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                                Real-World Problems
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                                Discover challenges shared by organizations,
                                collaborate with teams, and build solutions
                                that make a real difference.
                            </p>

                            <Link
                                to="/dashboard"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#1E1B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-50"
                            >
                                <Home size={16} />
                                Explore More Features
                                <ArrowLeft
                                    size={15}
                                    className="rotate-180"
                                />
                            </Link>
                        </div>

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 md:self-center">
                            <Lightbulb size={38} />
                        </div>
                    </div>
                </motion.div>

                {/* SUMMARY */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <SummaryCard
                        icon={<Lightbulb size={20} />}
                        label="Available Challenges"
                        value={problems.length}
                    />
                    <SummaryCard
                        icon={<Filter size={20} />}
                        label="Matching Results"
                        value={filteredProblems.length}
                    />
                    <SummaryCard
                        icon={<UserRound size={20} />}
                        label="Your Account"
                        value="Student"
                    />
                </div>

                {/* SEARCH AND FILTERS */}
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px_180px]">
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search problems, organizations, skills..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/10"
                            />
                        </div>

                        <select
                            value={skillFilter}
                            onChange={(event) => setSkillFilter(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-[#14B8A6]"
                        >
                            <option value="all">All skills</option>
                            {allSkills.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-[#14B8A6]"
                        >
                            <option value="newest">Newest first</option>
                            <option value="oldest">Oldest first</option>
                            <option value="popular">Most liked</option>
                        </select>
                    </div>
                </div>

                {/* NOTICE */}
                {notice && (
                    <div className="mb-5 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                        <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0 text-[#0F766E]"
                        />
                        <p className="flex-1">{notice}</p>
                        <button
                            type="button"
                            onClick={() => setNotice("")}
                            aria-label="Dismiss message"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* ERROR */}
                {pageError && (
                    <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                        <div className="flex-1">
                            <p>{pageError}</p>
                            <button
                                type="button"
                                onClick={loadProblems}
                                className="mt-2 font-bold underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                )}

                {/* FEED */}
                {loading ? (
                    <LoadingScreen compact />
                ) : filteredProblems.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                            <Lightbulb size={30} />
                        </div>

                        <h2 className="text-xl font-bold text-[#1E1B4B]">
                            No problems found
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Try another search or skill filter. New challenges
                            posted by approved stakeholders will appear here.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setSkillFilter("all");
                                setSortBy("newest");
                            }}
                            className="mt-5 rounded-xl bg-[#1E1B4B] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#312E81]"
                        >
                            Clear filters
                        </button>

                        <div>
                            <Link
                                to="/dashboard"
                                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-[#1E1B4B] hover:bg-slate-50"
                            >
                                <Home size={16} />
                                Return to Dashboard
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {filteredProblems.map((problem) => (
                            <ProblemCard
                                key={getProblemId(problem)}
                                problem={problem}
                                userId={userId}
                                busyAction={busyAction}
                                commentDraft={
                                    commentDrafts[getProblemId(problem)] || ""
                                }
                                onCommentDraftChange={(value) => {
                                    const id = getProblemId(problem);
                                    setCommentDrafts((previous) => ({
                                        ...previous,
                                        [id]: value,
                                    }));
                                }}
                                onLike={() =>
                                    runProblemAction(problem, "like", {}, "Like updated.")
                                }
                                onSave={() =>
                                    runProblemAction(problem, "save", {}, "Saved items updated.")
                                }
                                onShare={() => handleShare(problem)}
                                onComment={() => handleComment(problem)}
                                onInterest={() => setInterestProblem(problem)}
                                onContact={() => {
                                    setContactProblem(problem);
                                    setContactMessage("");
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* INTEREST MODAL */}
            {interestProblem && (
                <Modal
                    title="Express your interest"
                    onClose={() => setInterestProblem(null)}
                >
                    <div className="mb-5 rounded-xl bg-slate-50 p-4">
                        <p className="font-bold text-[#1E1B4B]">
                            {interestProblem.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Let the stakeholder know that you want to work
                            on this challenge.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setInterestProblem(null)}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={
                                busyAction === `${getProblemId(interestProblem)}:interest`
                            }
                            onClick={handleInterest}
                            className="rounded-xl bg-[#1E1B4B] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                        >
                            {busyAction === `${getProblemId(interestProblem)}:interest`
                                ? "Sending..."
                                : "Confirm interest"}
                        </button>
                    </div>
                </Modal>
            )}

            {/* CONTACT REQUEST MODAL */}
            {contactProblem && (
                <Modal
                    title="Contact organization"
                    onClose={() => setContactProblem(null)}
                >
                    <p className="mb-4 text-sm leading-6 text-slate-600">
                        Send a short introduction to the stakeholder about
                        their challenge.
                    </p>

                    <div className="mb-4 rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Problem
                        </p>
                        <p className="mt-1 font-bold text-[#1E1B4B]">
                            {contactProblem.title}
                        </p>
                    </div>

                    <form onSubmit={handleContactRequest}>
                        <label
                            htmlFor="contact-message"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Your message
                        </label>

                        <textarea
                            id="contact-message"
                            value={contactMessage}
                            onChange={(event) => setContactMessage(event.target.value)}
                            rows={4}
                            maxLength={1000}
                            required
                            placeholder="Introduce yourself and explain how you can contribute..."
                            className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                        />

                        <p className="mt-1 text-right text-xs text-slate-400">
                            {contactMessage.length}/1000
                        </p>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setContactProblem(null)}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={
                                    busyAction === `${getProblemId(contactProblem)}:contact-request`
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                            >
                                <Send size={15} />
                                {busyAction === `${getProblemId(contactProblem)}:contact-request`
                                    ? "Sending..."
                                    : "Send request"}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

function ProblemCard({
    problem,
    userId,
    busyAction,
    commentDraft,
    onCommentDraftChange,
    onLike,
    onSave,
    onShare,
    onComment,
    onInterest,
    onContact,
}) {
    const id = getProblemId(problem);
    const stakeholder = getStakeholder(problem);

    const stakeholderName = getName(
        stakeholder,
        problem.organizationName || "Verified Organization"
    );

    const organizationName =
        problem.organizationName ||
        stakeholder.organizationName ||
        stakeholderName;

    const liked = isProblemLiked(problem, userId);
    const saved = isProblemSaved(problem, userId);

    const likesCount = problem.likesCount ?? toArray(problem.likes).length;
    const comments = toArray(problem.comments);
    const sharesCount = Number(problem.shareCount ?? problem.shares ?? 0);

    const requiredSkills = toArray(problem.requiredSkills);
    const technologies = toArray(problem.technologies);

    const likeBusy = busyAction === `${id}:like`;
    const saveBusy = busyAction === `${id}:save`;
    const shareBusy = busyAction === `${id}:share`;
    const commentBusy = busyAction === `${id}:comment`;

    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
            <div className="h-1.5 bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6]" />

            <div className="p-5 sm:p-6">
                {/* ORGANIZATION */}
                <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-teal-50 text-[#1E1B4B]">
                        {stakeholder.photo || stakeholder.profilePhoto ? (
                            <img
                                src={stakeholder.photo || stakeholder.profilePhoto}
                                alt={stakeholderName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Building2 size={22} />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate font-bold text-[#1E1B4B]">
                                {organizationName}
                            </p>
                            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700">
                                <CheckCircle2 size={12} />
                                Stakeholder
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                            Posted by {stakeholderName}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                            {problem.location && (
                                <span className="inline-flex items-center gap-1">
                                    <MapPin size={12} />
                                    {problem.location}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                                <CalendarDays size={12} />
                                {formatDate(problem.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* PROBLEM */}
                <h2 className="text-xl font-black leading-snug text-[#1E1B4B]">
                    {problem.title || "Untitled challenge"}
                </h2>

                {problem.description && (
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {problem.description}
                    </p>
                )}

                {problem.problemInfo && (
                    <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                        <p className="mb-1 text-xs font-black uppercase tracking-wider text-indigo-700">
                            Problem details
                        </p>
                        <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                            {problem.problemInfo}
                        </p>
                    </div>
                )}

                {/* SKILLS */}
                {requiredSkills.length > 0 && (
                    <div className="mt-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                            Required skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {requiredSkills.map((skill, index) => (
                                <span
                                    key={`${skill}-${index}`}
                                    className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {technologies.length > 0 && (
                    <div className="mt-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                            Technologies
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((technology, index) => (
                                <span
                                    key={`${technology}-${index}`}
                                    className="rounded-lg bg-teal-50 px-2.5 py-1.5 text-xs font-semibold text-teal-700"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* DEADLINE AND CONTACT */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                            Submission deadline
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-700">
                            {formatDate(problem.deadline)}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                            Organization contact
                        </p>
                        <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                            {problem.contactEmail ||
                                stakeholder.email ||
                                "Use contact request"}
                        </p>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-5 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={onInterest}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#312E81]"
                    >
                        <Sparkles size={15} />
                        I'm Interested
                    </button>

                    <button
                        type="button"
                        onClick={onContact}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-bold text-teal-800 transition hover:bg-teal-100"
                    >
                        <Send size={15} />
                        Contact
                    </button>

                    {stakeholder.website && (
                        <a
                            href={
                                /^https?:\/\//i.test(stakeholder.website)
                                    ? stakeholder.website
                                    : `https://${stakeholder.website}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            <ExternalLink size={15} />
                            Website
                        </a>
                    )}
                </div>

                {/* SOCIAL ACTIONS */}
                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        onClick={onLike}
                        disabled={likeBusy}
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition disabled:opacity-50 ${liked
                                ? "text-rose-600"
                                : "text-slate-500 hover:text-rose-600"
                            }`}
                    >
                        <Heart size={17} fill={liked ? "currentColor" : "none"} />
                        {likesCount}
                        <span>Like</span>
                    </button>

                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                        <MessageCircle size={17} />
                        {problem.commentsCount ?? comments.length}
                        <span>Comments</span>
                    </span>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={saveBusy}
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition disabled:opacity-50 ${saved
                                ? "text-teal-700"
                                : "text-slate-500 hover:text-teal-700"
                            }`}
                    >
                        <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
                        {saved ? "Saved" : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={onShare}
                        disabled={shareBusy}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-[#1E1B4B] disabled:opacity-50"
                    >
                        <Share2 size={17} />
                        Share {sharesCount > 0 ? `(${sharesCount})` : ""}
                    </button>
                </div>

                {/* COMMENTS */}
                <div className="mt-5">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            onComment();
                        }}
                        className="flex items-center gap-2"
                    >
                        <input
                            value={commentDraft}
                            onChange={(event) =>
                                onCommentDraftChange(event.target.value)
                            }
                            placeholder="Write a comment..."
                            maxLength={2000}
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#14B8A6] focus:bg-white"
                        />

                        <button
                            type="submit"
                            disabled={commentBusy || !commentDraft.trim()}
                            aria-label="Post comment"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B] text-white transition hover:bg-[#312E81] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {commentBusy ? (
                                <LoaderCircle size={17} className="animate-spin" />
                            ) : (
                                <Send size={16} />
                            )}
                        </button>
                    </form>

                    {comments.length > 0 && (
                        <div className="mt-4 space-y-3">
                            {comments.slice(-3).reverse().map((comment, index) => {
                                const commenter = comment.userId || comment.user || {};

                                return (
                                    <div
                                        key={
                                            getId(comment._id) ||
                                            `${getId(commenter)}-${index}`
                                        }
                                        className="flex gap-2.5 rounded-xl bg-slate-50 p-3"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-500">
                                            <UserRound size={15} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-slate-700">
                                                {getName(commenter, "CONEXA Member")}
                                            </p>
                                            <p className="mt-1 whitespace-pre-line break-words text-sm text-slate-600">
                                                {comment.text || comment.comment || ""}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

function SummaryCard({ icon, label, value }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-teal-50 text-[#1E1B4B]">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-1 truncate text-xl font-black text-[#1E1B4B]">
                    {value}
                </p>
            </div>
        </div>
    );
}

function Modal({ title, children, onClose }) {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E1B4B]/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
            >
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-black text-[#1E1B4B]">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                    >
                        <X size={18} />
                    </button>
                </div>
                {children}
            </motion.div>
        </div>
    );
}

function LoadingScreen({ compact = false }) {
    return (
        <div
            className={`flex items-center justify-center ${compact ? "min-h-[220px]" : "min-h-[60vh]"
                }`}
        >
            <div className="text-center">
                <LoaderCircle
                    size={34}
                    className="mx-auto animate-spin text-teal-600"
                />
                <p className="mt-3 text-sm font-medium text-slate-500">
                    Loading real-world problems...
                </p>
            </div>
        </div>
    );
}
