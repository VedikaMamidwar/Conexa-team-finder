import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ShieldCheck,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    RefreshCw,
    LogOut,
    Building2,
    Globe,
    FileText,
    Mail,
    CalendarDays,
    AlertCircle,
    X,
    Search,
    LayoutDashboard,
} from "lucide-react";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
)
    .trim()
    .replace(/\/+$/, "");

const getAdminHeaders = () => {
    const token = localStorage.getItem("adminToken");


    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };


};

export default function AdminDashboard() {
    const navigate = useNavigate();


    const [admin, setAdmin] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("adminUser") || "null");
        } catch {
            return null;
        }
    });

    const [applications, setApplications] = useState([]);
    const [reviewed, setReviewed] = useState([]);
    const [activeTab, setActiveTab] = useState("pending");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");

    const logout = useCallback(() => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setAdmin(null);
        navigate("/admin/login", { replace: true });
    }, [navigate]);

    const apiRequest = useCallback(async (url, options = {}) => {
        const response = await axios({
            url: `${API_URL}${url}`,
            ...options,
            headers: {
                ...getAdminHeaders(),
                ...options.headers,
            },
        });

        return response.data?.data ?? response.data;
    }, []);

    const loadApplications = useCallback(async () => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin/login", { replace: true });
            return;
        }

        try {
            setLoading(true);
            setError("");

            const [pendingResponse, reviewedResponse, adminResponse] =
                await Promise.all([
                    apiRequest("/admin/stakeholders/pending"),
                    apiRequest("/admin/stakeholders/reviewed"),
                    apiRequest("/admin/me"),
                ]);

            const pendingList = Array.isArray(pendingResponse)
                ? pendingResponse
                : pendingResponse?.applications ||
                pendingResponse?.stakeholders ||
                pendingResponse?.users ||
                [];

            const reviewedList = Array.isArray(reviewedResponse)
                ? reviewedResponse
                : reviewedResponse?.applications ||
                reviewedResponse?.stakeholders ||
                reviewedResponse?.users ||
                [];

            setApplications(pendingList);
            setReviewed(reviewedList);

            const currentAdmin =
                adminResponse?.admin || adminResponse?.user || adminResponse;

            if (currentAdmin?.role === "admin") {
                setAdmin(currentAdmin);
                localStorage.setItem(
                    "adminUser",
                    JSON.stringify(currentAdmin)
                );
            }
        } catch (err) {
            console.error("Admin dashboard loading error", err);

            if (err.response?.status === 401 || err.response?.status === 403) {
                logout();
                return;
            }

            setError(
                err.response?.data?.message ||
                "Unable to load applications. Check your backend routes and server."
            );
        } finally {
            setLoading(false);
        }
    }, [apiRequest, navigate, logout]);

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);

    const approveApplication = async (application) => {
        const id = application._id || application.id;

        if (!id || actionId) return;

        const confirmed = window.confirm(
            `Approve stakeholder application for ${application.organizationName || application.name || application.email}?`
        );

        if (!confirmed) return;

        try {
            setActionId(id);
            setError("");
            setSuccess("");

            const response = await apiRequest(
                `/admin/stakeholders/${id}/approve`,
                { method: "PATCH" }
            );

            setSuccess(
                response?.message || "Stakeholder application approved successfully."
            );

            await loadApplications();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to approve this application."
            );
        } finally {
            setActionId("");
        }
    };

    const rejectApplication = async () => {
        if (!selectedApplication || actionId) return;

        const id =
            selectedApplication._id || selectedApplication.id;

        if (!id) return;

        const reason = rejectionReason.trim();

        if (!reason) {
            setError("Please enter a reason for rejecting this application.");
            return;
        }

        if (reason.length > 500) {
            setError("Rejection reason must not exceed 500 characters.");
            return;
        }

        try {
            setActionId(id);
            setError("");
            setSuccess("");

            const response = await apiRequest(
                `/admin/stakeholders/${id}/reject`,
                {
                    method: "PATCH",
                    data: { reason },
                }
            );

            setSuccess(
                response?.message || "Stakeholder application rejected."
            );

            setSelectedApplication(null);
            setRejectionReason("");

            await loadApplications();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to reject this application."
            );
        } finally {
            setActionId("");
        }
    };

    const currentList =
        activeTab === "pending" ? applications : reviewed;

    const filteredList = currentList.filter((application) => {
        const query = search.toLowerCase();

        return [
            application.name,
            application.email,
            application.organizationName,
            application.organizationDescription,
            application.accountStatus,
        ].some((value) =>
            String(value || "").toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E1B4B] text-white">
                            <ShieldCheck size={25} />
                        </div>

                        <div>
                            <h1 className="text-lg font-black text-[#1E1B4B]">
                                CONEXA Admin
                            </h1>
                            <p className="text-xs text-slate-500">
                                Stakeholder approval portal
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-bold">
                                {admin?.name || "Administrator"}
                            </p>
                            <p className="text-xs text-slate-500">
                                {admin?.email || ""}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={loadApplications}
                            disabled={loading}
                            aria-label="Refresh applications"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <RefreshCw
                                size={18}
                                className={loading ? "animate-spin" : ""}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={logout}
                            className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
                        >
                            <LogOut size={17} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
                        <LayoutDashboard size={17} />
                        Administration
                    </div>

                    <h2 className="mt-2 text-3xl font-black text-[#1E1B4B]">
                        Stakeholder Applications
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Review organization details before granting posting access.
                    </p>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <AlertCircle size={20} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="ml-auto"
                            aria-label="Dismiss error"
                        >
                            <X size={17} />
                        </button>
                    </div>
                )}

                {success && (
                    <div
                        role="status"
                        className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                    >
                        <CheckCircle size={20} className="shrink-0" />
                        <p>{success}</p>
                        <button
                            type="button"
                            onClick={() => setSuccess("")}
                            className="ml-auto"
                            aria-label="Dismiss message"
                        >
                            <X size={17} />
                        </button>
                    </div>
                )}

                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <StatCard
                        title="Pending Applications"
                        value={applications.length}
                        icon={Clock}
                        color="amber"
                    />
                    <StatCard
                        title="Approved Stakeholders"
                        value={
                            reviewed.filter(
                                (item) => item.accountStatus === "active"
                            ).length
                        }
                        icon={CheckCircle}
                        color="emerald"
                    />
                    <StatCard
                        title="Reviewed Applications"
                        value={reviewed.length}
                        icon={Users}
                        color="indigo"
                    />
                </div>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-2">
                            <TabButton
                                active={activeTab === "pending"}
                                onClick={() => setActiveTab("pending")}
                                icon={Clock}
                                label={`Pending (${applications.length})`}
                            />

                            <TabButton
                                active={activeTab === "reviewed"}
                                onClick={() => setActiveTab("reviewed")}
                                icon={CheckCircle}
                                label={`Reviewed (${reviewed.length})`}
                            />
                        </div>

                        <div className="relative w-full md:max-w-xs">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search applications..."
                                className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                            <RefreshCw
                                size={30}
                                className="animate-spin text-teal-600"
                            />
                            <p className="text-sm text-slate-500">
                                Loading stakeholder applications...
                            </p>
                        </div>
                    ) : filteredList.length === 0 ? (
                        <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                                <Users
                                    size={28}
                                    className="text-slate-400"
                                />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-700">
                                {search
                                    ? "No matching applications"
                                    : activeTab === "pending"
                                        ? "No pending applications"
                                        : "No reviewed applications"}
                            </h3>

                            <p className="mt-2 max-w-md text-sm text-slate-500">
                                {search
                                    ? "Try another name, email, or organization."
                                    : "Applications will appear here when stakeholders register."}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filteredList.map((application) => {
                                const id =
                                    application._id || application.id;

                                const status =
                                    application.accountStatus || "pending";

                                const isPending = status === "pending";

                                return (
                                    <article
                                        key={id}
                                        className="p-5 transition hover:bg-slate-50/70 sm:p-6"
                                    >
                                        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                                                        <Building2 size={23} />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="break-words text-lg font-bold text-[#1E1B4B]">
                                                            {application.organizationName ||
                                                                application.name ||
                                                                "Unnamed organization"}
                                                        </h3>

                                                        <p className="mt-1 break-all text-sm text-slate-500">
                                                            {application.name ||
                                                                "Contact name not provided"}
                                                        </p>
                                                    </div>

                                                    <StatusBadge status={status} />
                                                </div>

                                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                    <InfoItem
                                                        icon={Mail}
                                                        value={
                                                            application.email ||
                                                            "No email provided"
                                                        }
                                                    />

                                                    <InfoItem
                                                        icon={CalendarDays}
                                                        value={
                                                            application.createdAt
                                                                ? new Date(
                                                                    application.createdAt
                                                                ).toLocaleDateString(
                                                                    "en-IN",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    }
                                                                )
                                                                : "Registration date unavailable"
                                                        }
                                                    />

                                                    {application.website && (
                                                        <InfoItem
                                                            icon={Globe}
                                                            value={application.website}
                                                            href={application.website}
                                                        />
                                                    )}
                                                </div>

                                                {application.organizationDescription && (
                                                    <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                                        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                                                            <FileText size={15} />
                                                            Organization Description
                                                        </p>

                                                        <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                                                            {application.organizationDescription}
                                                        </p>
                                                    </div>
                                                )}

                                                {application.rejectionReason && (
                                                    <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                                        <strong>
                                                            Rejection reason:
                                                        </strong>{" "}
                                                        {application.rejectionReason}
                                                    </p>
                                                )}

                                                {application.reviewedAt && (
                                                    <p className="mt-3 text-xs text-slate-400">
                                                        Reviewed on{" "}
                                                        {new Date(
                                                            application.reviewedAt
                                                        ).toLocaleDateString("en-IN")}
                                                    </p>
                                                )}
                                            </div>

                                            {isPending && (
                                                <div className="flex shrink-0 flex-wrap gap-3 xl:justify-end">
                                                    <button
                                                        type="button"
                                                        disabled={Boolean(actionId)}
                                                        onClick={() =>
                                                            approveApplication(
                                                                application
                                                            )
                                                        }
                                                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {actionId === id ? (
                                                            <RefreshCw
                                                                size={17}
                                                                className="animate-spin"
                                                            />
                                                        ) : (
                                                            <CheckCircle size={17} />
                                                        )}
                                                        Approve
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={Boolean(actionId)}
                                                        onClick={() => {
                                                            setSelectedApplication(
                                                                application
                                                            );
                                                            setRejectionReason("");
                                                            setError("");
                                                        }}
                                                        className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        <XCircle size={17} />
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>

                <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                    Admin actions are verified by the backend. Only approved
                    stakeholder accounts should be permitted to publish problems.
                </p>
            </main>

            {selectedApplication && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget && !actionId) {
                            setSelectedApplication(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="reject-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3
                                    id="reject-title"
                                    className="text-xl font-black text-[#1E1B4B]"
                                >
                                    Reject Application
                                </h3>

                                <p className="mt-2 text-sm leading-5 text-slate-500">
                                    Provide a clear reason for rejecting this
                                    stakeholder application.
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={Boolean(actionId)}
                                onClick={() =>
                                    setSelectedApplication(null)
                                }
                                aria-label="Close rejection dialog"
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <label
                            htmlFor="rejection-reason"
                            className="mb-2 mt-5 block text-sm font-semibold text-slate-700"
                        >
                            Rejection reason
                        </label>

                        <textarea
                            id="rejection-reason"
                            rows={4}
                            maxLength={500}
                            value={rejectionReason}
                            onChange={(e) =>
                                setRejectionReason(e.target.value)
                            }
                            placeholder="Explain why this application is being rejected..."
                            className="w-full resize-y rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
                        />

                        <p className="mt-1 text-right text-xs text-slate-400">
                            {rejectionReason.length}/500
                        </p>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={Boolean(actionId)}
                                onClick={() =>
                                    setSelectedApplication(null)
                                }
                                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={
                                    Boolean(actionId) ||
                                    !rejectionReason.trim()
                                }
                                onClick={rejectApplication}
                                className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {actionId ? (
                                    <RefreshCw
                                        size={17}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <XCircle size={17} />
                                )}
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}

function StatCard({ title, value, icon: Icon, color }) {
    const colorClasses = {
        amber: "bg-amber-50 text-amber-600",
        emerald: "bg-emerald-50 text-emerald-600",
        indigo: "bg-indigo-50 text-indigo-600",
    };


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">
                    {title}
                </p>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClasses[color] || colorClasses.indigo
                        }`}
                >
                    <Icon size={22} />
                </div>
            </div>

            <p className="mt-4 text-3xl font-black text-[#1E1B4B]">
                {value}
            </p>
        </div>
    );


}

function TabButton({ active, onClick, icon: Icon, label }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${active
                    ? "bg-[#1E1B4B] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
        > <Icon size={17} />
            {label} </button>
    );
}

function InfoItem({ icon: Icon, value, href }) {
    return (<div className="flex min-w-0 items-start gap-2 text-sm text-slate-600"> <Icon
        size={17}
        className="mt-0.5 shrink-0 text-slate-400"
    />


        {href ? (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-teal-700 hover:underline"
            >
                {value}
            </a>
        ) : (
            <span className="break-all">{value}</span>
        )}
    </div>
    );


}

function StatusBadge({ status }) {
    const styles = {
        pending: "bg-amber-50 text-amber-700",
        active: "bg-emerald-50 text-emerald-700",
        rejected: "bg-red-50 text-red-700",
        suspended: "bg-slate-100 text-slate-600",
    };


    const labels = {
        pending: "Pending",
        active: "Approved",
        rejected: "Rejected",
        suspended: "Suspended",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status] || styles.pending
                }`}
        >
            {labels[status] || status}
        </span>
    );


}
