import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    Check,
    CheckCheck,
    Trash2,
    UserPlus,
    Trophy,
    MessageCircle,
    Sparkles,
    CalendarDays,
    X,
    Filter,
    Clock,
    RefreshCw,
    AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/notifications";

const iconMap = {
    team: UserPlus,
    message: MessageCircle,
    hackathon: Trophy,
    match: Sparkles,
    event: CalendarDays,
    general: Bell,
};

export default function DashboardNotification() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedNotification, setSelectedNotification] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    /* =========================================================
       GET TOKEN
    ========================================================= */

    const getToken = () => {
        return (
            localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("jwt")
        );
    };

    /* =========================================================
       FETCH NOTIFICATIONS
    ========================================================= */

    const fetchNotifications = async (showRefresh = false) => {
        try {
            if (showRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const token = getToken();

            if (!token) {
                setError("Please login again to view notifications.");
                return;
            }

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch notifications"
                );
            }

            setNotifications(data.notifications || []);
        } catch (err) {
            console.error("Notification fetch error:", err);
            setError(
                err.message ||
                "Unable to load notifications."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    /* =========================================================
       INITIAL LOAD
    ========================================================= */

    useEffect(() => {
        fetchNotifications();
    }, []);

    /* =========================================================
       UNREAD COUNT
    ========================================================= */

    const unreadCount = useMemo(() => {
        return notifications.filter(
            (notification) => !notification.read
        ).length;
    }, [notifications]);

    /* =========================================================
       FILTER
    ========================================================= */

    const filteredNotifications = useMemo(() => {
        if (activeFilter === "unread") {
            return notifications.filter(
                (notification) => !notification.read
            );
        }

        return notifications;
    }, [notifications, activeFilter]);

    /* =========================================================
       MARK ONE AS READ
    ========================================================= */

    const markAsRead = async (id) => {
        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/${id}/read`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to mark as read"
                );
            }

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification._id === id
                        ? {
                            ...notification,
                            read: true,
                        }
                        : notification
                )
            );
        } catch (err) {
            console.error("Mark read error:", err);
        }
    };

    /* =========================================================
       MARK ALL AS READ
    ========================================================= */

    const markAllAsRead = async () => {
        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/read-all`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to mark all as read"
                );
            }

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    read: true,
                }))
            );
        } catch (err) {
            console.error("Mark all read error:", err);
        }
    };

    /* =========================================================
       DELETE ONE
    ========================================================= */

    const deleteNotification = async (id) => {
        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete notification"
                );
            }

            setNotifications((prev) =>
                prev.filter(
                    (notification) =>
                        notification._id !== id
                )
            );

            if (
                selectedNotification?._id === id
            ) {
                setSelectedNotification(null);
            }
        } catch (err) {
            console.error(
                "Delete notification error:",
                err
            );
        }
    };

    /* =========================================================
       DELETE ALL
    ========================================================= */

    const clearAll = async () => {
        if (notifications.length === 0) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete all notifications?"
        );

        if (!confirmed) return;

        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/all`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete notifications"
                );
            }

            setNotifications([]);
            setSelectedNotification(null);
        } catch (err) {
            console.error(
                "Delete all notifications error:",
                err
            );
        }
    };

    /* =========================================================
       CLICK NOTIFICATION
    ========================================================= */

    const handleNotificationClick = async (
        notification
    ) => {
        if (!notification.read) {
            await markAsRead(notification._id);
        }

        if (notification.path) {
            navigate(notification.path);
        }
    };

    /* =========================================================
       OPEN DETAILS
    ========================================================= */

    const openDetails = async (notification) => {
        if (!notification.read) {
            await markAsRead(notification._id);
        }

        setSelectedNotification({
            ...notification,
            read: true,
        });
    };

    /* =========================================================
       ICON
    ========================================================= */

    const getIcon = (type) => {
        const Icon = iconMap[type] || Bell;

        return <Icon size={21} />;
    };

    /* =========================================================
       TIME FORMAT
    ========================================================= */

    const formatTime = (date) => {
        if (!date) return "Recently";

        const notificationDate = new Date(date);

        if (Number.isNaN(notificationDate.getTime())) {
            return "Recently";
        }

        const now = new Date();

        const difference =
            now.getTime() -
            notificationDate.getTime();

        const seconds = Math.floor(
            difference / 1000
        );

        if (seconds < 60) {
            return "Just now";
        }

        const minutes = Math.floor(
            seconds / 60
        );

        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        const hours = Math.floor(
            minutes / 60
        );

        if (hours < 24) {
            return `${hours} hour${hours > 1 ? "s" : ""
                } ago`;
        }

        const days = Math.floor(
            hours / 24
        );

        if (days === 1) {
            return "Yesterday";
        }

        if (days < 7) {
            return `${days} days ago`;
        }

        return notificationDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-6xl">

                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />

                        <div>
                            <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />

                            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-200" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-28 animate-pulse rounded-2xl bg-white border border-slate-200"
                            />
                        ))}
                    </div>

                </div>
            </div>
        );
    }

    /* =========================================================
       MAIN UI
    ========================================================= */

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-6xl">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E1B4B] text-white shadow-lg shadow-indigo-200">
                                <Bell size={24} />
                            </div>

                            <div>

                                <h1 className="text-2xl font-black text-[#1E1B4B] sm:text-3xl">
                                    Notifications
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Stay updated with your CONEXA activity
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT HEADER */}

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() =>
                                fetchNotifications(true)
                            }
                            disabled={refreshing}
                            title="Refresh notifications"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
                        >
                            <RefreshCw
                                size={18}
                                className={
                                    refreshing
                                        ? "animate-spin"
                                        : ""
                                }
                            />
                        </button>

                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-[#14B8A6]">
                                <Bell size={18} />
                            </div>

                            <div>

                                <p className="text-xs text-slate-500">
                                    Unread
                                </p>

                                <p className="font-black text-[#1E1B4B]">
                                    {unreadCount}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">

                        <AlertCircle size={20} />

                        <div className="flex-1 text-sm font-medium">
                            {error}
                        </div>

                        <button
                            onClick={() =>
                                fetchNotifications()
                            }
                            className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-red-600 shadow-sm hover:bg-red-100"
                        >
                            Retry
                        </button>

                    </div>
                )}

                {/* =================================================
                    TOP ACTION BAR
                ================================================= */}

                <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    {/* FILTER */}

                    <div className="flex items-center gap-2">

                        <Filter
                            size={17}
                            className="text-slate-400"
                        />

                        <button
                            onClick={() =>
                                setActiveFilter("all")
                            }
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeFilter === "all"
                                    ? "bg-[#1E1B4B] text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            All
                        </button>

                        <button
                            onClick={() =>
                                setActiveFilter("unread")
                            }
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeFilter === "unread"
                                    ? "bg-[#14B8A6] text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            Unread

                            {unreadCount > 0 && (
                                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                                    {unreadCount}
                                </span>
                            )}

                        </button>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-2">

                        <button
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#1E1B4B] transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <CheckCheck size={17} />
                            Mark all read
                        </button>

                        <button
                            onClick={clearAll}
                            disabled={
                                notifications.length === 0
                            }
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <Trash2 size={17} />
                            Clear all
                        </button>

                    </div>

                </div>

                {/* =================================================
                    NOTIFICATIONS
                ================================================= */}

                <div className="space-y-3">

                    {filteredNotifications.length === 0 ? (

                        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

                                <Bell
                                    size={32}
                                    className="text-slate-400"
                                />

                            </div>

                            <h2 className="text-xl font-bold text-[#1E1B4B]">
                                No notifications
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                {activeFilter === "unread"
                                    ? "You have no unread notifications."
                                    : "You're all caught up!"}
                            </p>

                        </div>

                    ) : (

                        filteredNotifications.map(
                            (notification) => {

                                const Icon =
                                    iconMap[
                                    notification.type
                                    ] || Bell;

                                return (
                                    <div
                                        key={
                                            notification._id
                                        }
                                        className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${notification.read
                                                ? "border-slate-200"
                                                : "border-teal-200 bg-gradient-to-r from-white to-teal-50/40"
                                            }`}
                                    >

                                        {/* UNREAD LINE */}

                                        {!notification.read && (
                                            <div className="absolute left-0 top-0 h-full w-1 bg-[#14B8A6]" />
                                        )}

                                        <div className="flex items-start gap-4 p-4 sm:p-5">

                                            {/* ICON */}

                                            <button
                                                onClick={() =>
                                                    openDetails(
                                                        notification
                                                    )
                                                }
                                                title="View notification"
                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${notification.read
                                                        ? "bg-slate-100 text-slate-500"
                                                        : "bg-teal-50 text-[#14B8A6]"
                                                    }`}
                                            >
                                                <Icon size={21} />
                                            </button>

                                            {/* CONTENT */}

                                            <button
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        notification
                                                    )
                                                }
                                                className="min-w-0 flex-1 text-left"
                                            >

                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                                    <h3
                                                        className={`font-bold ${notification.read
                                                                ? "text-slate-700"
                                                                : "text-[#1E1B4B]"
                                                            }`}
                                                    >
                                                        {
                                                            notification.title
                                                        }
                                                    </h3>

                                                    {!notification.read && (
                                                        <span className="w-fit rounded-full bg-teal-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-700">
                                                            New
                                                        </span>
                                                    )}

                                                </div>

                                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                                    {
                                                        notification.message
                                                    }
                                                </p>

                                                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">

                                                    <Clock size={13} />

                                                    {formatTime(
                                                        notification.createdAt
                                                    )}

                                                </div>

                                            </button>

                                            {/* ACTIONS */}

                                            <div className="flex shrink-0 items-center gap-1">

                                                {!notification.read && (
                                                    <button
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification._id
                                                            )
                                                        }
                                                        title="Mark as read"
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-teal-50 hover:text-[#14B8A6]"
                                                    >
                                                        <Check
                                                            size={17}
                                                        />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        deleteNotification(
                                                            notification._id
                                                        )
                                                    }
                                                    title="Delete notification"
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                                >
                                                    <Trash2
                                                        size={17}
                                                    />
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )

                    )}

                </div>

            </div>

            {/* =====================================================
                DETAILS MODAL
            ===================================================== */}

            {selectedNotification && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1B4B]/40 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedNotification(null)
                    }
                >

                    <div
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
                    >

                        <div className="mb-5 flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-[#14B8A6]">
                                    {getIcon(
                                        selectedNotification.type
                                    )}
                                </div>

                                <div>

                                    <h2 className="font-bold text-[#1E1B4B]">
                                        {
                                            selectedNotification.title
                                        }
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        {formatTime(
                                            selectedNotification.createdAt
                                        )}
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedNotification(
                                        null
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                            {
                                selectedNotification.message
                            }
                        </p>

                        <div className="mt-5 flex gap-3">

                            {selectedNotification.path && (
                                <button
                                    onClick={() => {
                                        setSelectedNotification(
                                            null
                                        );

                                        navigate(
                                            selectedNotification.path
                                        );
                                    }}
                                    className="flex-1 rounded-xl bg-[#1E1B4B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2b2769]"
                                >
                                    Open
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    setSelectedNotification(
                                        null
                                    )
                                }
                                className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}