import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "team",
            icon: "🤝",
            title: "New Team Request",
            message: "Rahul Sharma wants to join your team.",
            time: "5 min ago",
            unread: true,
        },
        {
            id: 2,
            type: "hackathon",
            icon: "🚀",
            title: "Hackathon Reminder",
            message: "Smart India Hackathon registration closes soon.",
            time: "1 hour ago",
            unread: true,
        },
        {
            id: 3,
            type: "achievement",
            icon: "🏆",
            title: "Achievement Unlocked!",
            message: "You unlocked the Hackathon Explorer badge.",
            time: "3 hours ago",
            unread: true,
        },
        {
            id: 4,
            type: "challenge",
            icon: "🎯",
            title: "Daily Challenge Available",
            message: "Your new React challenge is waiting for you.",
            time: "5 hours ago",
            unread: false,
        },
        {
            id: 5,
            type: "team",
            icon: "👥",
            title: "Team Invitation",
            message: "You have been invited to join Team Innovators.",
            time: "Yesterday",
            unread: false,
        },
        {
            id: 6,
            type: "recommendation",
            icon: "🤖",
            title: "New Teammate Match",
            message: "We found a student with 92% skill compatibility.",
            time: "Yesterday",
            unread: false,
        },
        {
            id: 7,
            type: "event",
            icon: "📅",
            title: "Upcoming Event",
            message: "AI Innovation Challenge starts in 3 days.",
            time: "2 days ago",
            unread: false,
        },
    ]);

    const [activeFilter, setActiveFilter] = useState("All");

    const unreadCount = notifications.filter(
        (notification) => notification.unread
    ).length;

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, unread: false }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                unread: false,
            }))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    };

    const getFilteredNotifications = () => {
        if (activeFilter === "Unread") {
            return notifications.filter(
                (notification) => notification.unread
            );
        }

        if (activeFilter === "Team") {
            return notifications.filter(
                (notification) =>
                    notification.type === "team"
            );
        }

        if (activeFilter === "Hackathons") {
            return notifications.filter(
                (notification) =>
                    notification.type === "hackathon" ||
                    notification.type === "event"
            );
        }

        if (activeFilter === "Achievements") {
            return notifications.filter(
                (notification) =>
                    notification.type === "achievement"
            );
        }

        return notifications;
    };

    const filteredNotifications = getFilteredNotifications();

    return (
        <div className="min-h-screen bg-slate-100 text-[#1E1B4B]">

            {/* ================= HEADER ================= */}

            <header className="bg-white border-b border-slate-200 px-6 py-5">

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <h1 className="text-2xl font-bold">
                                🔔 Notifications
                            </h1>

                            {unreadCount > 0 && (
                                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                                    {unreadCount} New
                                </span>
                            )}

                        </div>

                        <p className="text-sm text-slate-500 mt-1">
                            Stay updated with your CONEXA activities.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition"
                    >
                        ← Dashboard
                    </button>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <main className="max-w-6xl mx-auto p-6">

                {/* ================= SUMMARY ================= */}

                <section className="rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#37358F] to-[#19B5A5] text-white p-7 shadow-lg">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div>

                            <span className="text-sm text-white/70">
                                CONEXA Updates
                            </span>

                            <h2 className="text-3xl font-bold mt-2">
                                You’re all caught up? 👀
                            </h2>

                            <p className="text-white/80 mt-2">
                                {unreadCount > 0
                                    ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`
                                    : "You have no unread notifications."
                                }
                            </p>

                        </div>

                        <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center text-5xl">
                            🔔
                        </div>

                    </div>

                </section>


                {/* ================= FILTERS ================= */}

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 mt-6">

                    <div className="flex flex-wrap items-center justify-between gap-3">

                        <div className="flex flex-wrap gap-2">

                            {[
                                "All",
                                "Unread",
                                "Team",
                                "Hackathons",
                                "Achievements",
                            ].map((filter) => (

                                <button
                                    key={filter}
                                    onClick={() =>
                                        setActiveFilter(filter)
                                    }
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${activeFilter === filter
                                        ? "bg-[#1E1B4B] text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    {filter}
                                </button>

                            ))}

                        </div>

                        <button
                            onClick={markAllAsRead}
                            className="text-sm font-semibold text-[#19A99A] hover:underline"
                        >
                            Mark all as read
                        </button>

                    </div>

                </div>


                {/* ================= NOTIFICATIONS ================= */}

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm mt-6 overflow-hidden">

                    <div className="p-6 border-b border-slate-100">

                        <h3 className="text-xl font-bold">
                            Recent Notifications
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Your latest CONEXA activities and updates.
                        </p>

                    </div>


                    <div>

                        {filteredNotifications.length === 0 ? (

                            <div className="p-14 text-center">

                                <div className="text-5xl">
                                    🎉
                                </div>

                                <h3 className="text-xl font-bold mt-4">
                                    Nothing here!
                                </h3>

                                <p className="text-slate-500 mt-2">
                                    You don't have any notifications in this
                                    category.
                                </p>

                            </div>

                        ) : (

                            filteredNotifications.map((notification) => (

                                <div
                                    key={notification.id}
                                    className={`p-5 border-b border-slate-100 last:border-b-0 transition ${notification.unread
                                        ? "bg-blue-50/40"
                                        : "bg-white"
                                        }`}
                                >

                                    <div className="flex gap-4">

                                        {/* ICON */}

                                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                                            {notification.icon}
                                        </div>


                                        {/* CONTENT */}

                                        <div className="flex-1 min-w-0">

                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                                                <div>

                                                    <div className="flex items-center gap-2">

                                                        <h4 className="font-bold">
                                                            {notification.title}
                                                        </h4>

                                                        {notification.unread && (
                                                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                                                        )}

                                                    </div>

                                                    <p className="text-sm text-slate-600 mt-1">
                                                        {notification.message}
                                                    </p>

                                                </div>

                                                <span className="text-xs text-slate-400 whitespace-nowrap">
                                                    {notification.time}
                                                </span>

                                            </div>


                                            {/* ACTIONS */}

                                            <div className="flex flex-wrap gap-3 mt-4">

                                                {notification.type === "team" && (
                                                    <>
                                                        <button
                                                            className="px-4 py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:opacity-90"
                                                        >
                                                            View Request
                                                        </button>

                                                        <button
                                                            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                                                        >
                                                            Decline
                                                        </button>
                                                    </>
                                                )}

                                                {notification.type === "hackathon" && (
                                                    <button
                                                        onClick={() =>
                                                            navigate("/hackathons")
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:opacity-90"
                                                    >
                                                        View Hackathon
                                                    </button>
                                                )}

                                                {notification.type === "achievement" && (
                                                    <button
                                                        onClick={() =>
                                                            navigate("/achievements")
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:opacity-90"
                                                    >
                                                        View Achievement
                                                    </button>
                                                )}

                                                {notification.type === "challenge" && (
                                                    <button
                                                        onClick={() =>
                                                            navigate("/daily-challenge")
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:opacity-90"
                                                    >
                                                        Start Challenge
                                                    </button>
                                                )}

                                                {notification.type === "event" && (
                                                    <button
                                                        onClick={() =>
                                                            navigate("/events")
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:opacity-90"
                                                    >
                                                        View Event
                                                    </button>
                                                )}

                                                {notification.type === "recommendation" && (
                                                    <button
                                                        onClick={() =>
                                                            navigate("/find-teammates")
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:opacity-90"
                                                    >
                                                        Find Teammate
                                                    </button>
                                                )}

                                                {notification.unread && (
                                                    <button
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification.id
                                                            )
                                                        }
                                                        className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        deleteNotification(
                                                            notification.id
                                                        )
                                                    }
                                                    className="px-4 py-2 rounded-lg text-red-500 text-xs font-semibold hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </section>


                {/* ================= NOTIFICATION INFO ================= */}

                <section className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

                    <div className="flex gap-4">

                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl shrink-0">
                            💡
                        </div>

                        <div>

                            <h3 className="font-bold">
                                Manage your notifications
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                You can control which notifications you
                                receive from your Settings.
                            </p>

                            <button
                                onClick={() => navigate("/settings")}
                                className="mt-3 text-sm font-semibold text-[#19A99A] hover:underline"
                            >
                                Open Notification Settings →
                            </button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}