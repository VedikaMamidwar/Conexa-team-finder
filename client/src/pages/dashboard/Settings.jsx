import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        teamRequests: true,
        hackathonReminders: true,
        dailyChallenges: true,
        profileVisibility: true,
        showSkills: true,
    });

    const handleToggle = (name) => {
        setSettings((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const Toggle = ({ enabled, onClick }) => (
        <button
            onClick={onClick}
            className={`relative w-12 h-6 rounded-full transition ${enabled ? "bg-[#19B5A5]" : "bg-slate-300"
                }`}
        >
            <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${enabled ? "left-7" : "left-1"
                    }`}
            />
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-100 text-[#1E1B4B]">

            {/* ================= HEADER ================= */}

            <header className="bg-white border-b border-slate-200 px-6 py-5">

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-bold">
                            ⚙️ Settings
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Manage your account and CONEXA preferences.
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

                {/* ================= PROFILE SUMMARY ================= */}

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E1B4B] to-[#3559D5] flex items-center justify-center text-white text-xl font-bold">
                                VM
                            </div>

                            <div>
                                <h2 className="text-lg font-bold">
                                    Vedika Mamidwar
                                </h2>

                                <p className="text-sm text-slate-500">
                                    MERN Developer
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                    vedika@example.com
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => navigate("/profile")}
                            className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] text-white hover:opacity-90 transition"
                        >
                            View Profile
                        </button>

                    </div>

                </section>


                {/* ================= ACCOUNT ================= */}

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">

                    <div className="p-6 border-b border-slate-100">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                                👤
                            </div>

                            <div>
                                <h2 className="text-lg font-bold">
                                    Account
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Manage your personal account information.
                                </p>
                            </div>

                        </div>

                    </div>


                    <div className="divide-y divide-slate-100">

                        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            <div>
                                <h3 className="font-semibold">
                                    Personal Information
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Update your name, email and profile details.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/profile")}
                                className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition"
                            >
                                Edit
                            </button>

                        </div>


                        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            <div>
                                <h3 className="font-semibold">
                                    Change Password
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Keep your account secure with a strong
                                    password.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/forgot-password")}
                                className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition"
                            >
                                Change
                            </button>

                        </div>

                    </div>

                </section>


                {/* ================= NOTIFICATIONS ================= */}

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">

                    <div className="p-6 border-b border-slate-100">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                                🔔
                            </div>

                            <div>
                                <h2 className="text-lg font-bold">
                                    Notifications
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Choose what notifications you want to
                                    receive.
                                </p>
                            </div>

                        </div>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {/* Email */}

                        <div className="p-6 flex items-center justify-between gap-5">

                            <div>
                                <h3 className="font-semibold">
                                    Email Notifications
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Receive important updates through email.
                                </p>
                            </div>

                            <Toggle
                                enabled={settings.emailNotifications}
                                onClick={() =>
                                    handleToggle("emailNotifications")
                                }
                            />

                        </div>


                        {/* Team Requests */}

                        <div className="p-6 flex items-center justify-between gap-5">

                            <div>
                                <h3 className="font-semibold">
                                    Team Requests
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Get notified when someone sends a team
                                    request.
                                </p>
                            </div>

                            <Toggle
                                enabled={settings.teamRequests}
                                onClick={() =>
                                    handleToggle("teamRequests")
                                }
                            />

                        </div>


                        {/* Hackathons */}

                        <div className="p-6 flex items-center justify-between gap-5">

                            <div>
                                <h3 className="font-semibold">
                                    Hackathon Reminders
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Get reminders about upcoming hackathons.
                                </p>
                            </div>

                            <Toggle
                                enabled={settings.hackathonReminders}
                                onClick={() =>
                                    handleToggle("hackathonReminders")
                                }
                            />

                        </div>


                        {/* Daily Challenge */}

                        <div className="p-6 flex items-center justify-between gap-5">

                            <div>
                                <h3 className="font-semibold">
                                    Daily Challenges
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Receive reminders for your daily challenge.
                                </p>
                            </div>

                            <Toggle
                                enabled={settings.dailyChallenges}
                                onClick={() =>
                                    handleToggle("dailyChallenges")
                                }
                            />

                        </div>

                    </div>

                </section>


                {/* ================= PRIVACY ================= */}

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">

                    <div className="p-6 border-b border-slate-100">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                                🔐
                            </div>

                            <div>
                                <h2 className="text-lg font-bold">
                                    Privacy
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Control how other students see your
                                    profile.
                                </p>
                            </div>

                        </div>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {/* Profile Visibility */}

                        <div className="p-6 flex items-center justify-between gap-5">

                            <div>
                                <h3 className="font-semibold">
                                    Profile Visibility
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Allow other students to discover your
                                    profile.
                                </p>
                            </div>

                            <Toggle
                                enabled={settings.profileVisibility}
                                onClick={() =>
                                    handleToggle("profileVisibility")
                                }
                            />

                        </div>


                        {/* Skills */}

                        <div className="p-6 flex items-center justify-between gap-5">

                            <div>
                                <h3 className="font-semibold">
                                    Show My Skills
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Allow students to see your technical
                                    skills.
                                </p>
                            </div>

                            <Toggle
                                enabled={settings.showSkills}
                                onClick={() =>
                                    handleToggle("showSkills")
                                }
                            />

                        </div>

                    </div>

                </section>


                {/* ================= SECURITY ================= */}

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">

                    <div className="p-6 border-b border-slate-100">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
                                🛡️
                            </div>

                            <div>
                                <h2 className="text-lg font-bold">
                                    Security
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Protect your CONEXA account.
                                </p>
                            </div>

                        </div>

                    </div>


                    <div className="p-6">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            <div>
                                <h3 className="font-semibold">
                                    Two-Factor Authentication
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Add an extra layer of security to your
                                    account.
                                </p>
                            </div>

                            <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-sm">
                                Coming Soon
                            </span>

                        </div>

                    </div>

                </section>


                {/* ================= DANGER ZONE ================= */}

                <section className="bg-white rounded-3xl border border-red-200 shadow-sm overflow-hidden">

                    <div className="p-6 border-b border-red-100">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                                ⚠️
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-red-600">
                                    Danger Zone
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Actions here can affect your account.
                                </p>
                            </div>

                        </div>

                    </div>


                    <div className="p-6">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                            <div>
                                <h3 className="font-semibold">
                                    Logout
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Sign out from your CONEXA account.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login");
                                }}
                                className="px-6 py-2.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition font-medium"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </section>


                {/* ================= SAVE ================= */}

                <div className="flex justify-end mt-6">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-7 py-3 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:opacity-90 transition"
                    >
                        Save Preferences
                    </button>

                </div>

            </main>

        </div>
    );
}