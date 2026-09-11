import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    User,
    Bell,
    Lock,
    Palette,
    Shield,
    Save,
    Mail,
    Smartphone,
    Eye,
    EyeOff,
    LogOut,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

export default function Settings() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        updates: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        branch: "Computer Science & Engineering",
        year: "4th Year",
    });

    const [password, setPassword] = useState({
        current: "",
        newPassword: "",
        confirm: "",
    });

    const [saved, setSaved] = useState(false);

    const handleProfileChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const toggleNotification = (key) => {
        setNotifications({
            ...notifications,
            [key]: !notifications[key],
        });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">

            {/* ================= SIDEBAR ================= */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* ================= MAIN ================= */}

            <div
                className={`min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen
                        ? "lg:ml-72"
                        : "lg:ml-24"
                    }`}
            >

                {/* ================= TOPBAR ================= */}

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* ================= CONTENT ================= */}

                <main className="flex-1 p-4 sm:p-6 lg:p-8">

                    {/* HEADER */}

                    <div className="mb-8 flex items-center gap-3">

                        <button
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"
                        >
                            <ArrowLeft size={19} />
                        </button>

                        <div>
                            <p className="text-sm font-semibold text-[#14B8A6]">
                                ACCOUNT
                            </p>

                            <h1 className="mt-1 text-3xl font-black text-[#1E1B4B]">
                                Settings
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage your account and preferences.
                            </p>
                        </div>

                    </div>

                    {/* ================= SETTINGS GRID ================= */}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                        {/* ================= LEFT MENU ================= */}

                        <div className="xl:col-span-1">

                            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                                <SettingMenu
                                    icon={<User size={18} />}
                                    title="Profile Settings"
                                    active
                                />

                                <SettingMenu
                                    icon={<Bell size={18} />}
                                    title="Notifications"
                                />

                                <SettingMenu
                                    icon={<Lock size={18} />}
                                    title="Security"
                                />

                                <SettingMenu
                                    icon={<Palette size={18} />}
                                    title="Appearance"
                                />

                                <SettingMenu
                                    icon={<Shield size={18} />}
                                    title="Privacy"
                                />

                            </div>

                            {/* ACCOUNT ACTION */}

                            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
                                        <LogOut size={19} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-red-700">
                                            Account
                                        </h3>

                                        <p className="text-xs text-red-500">
                                            Manage your account
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                    className="mt-4 w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                        {/* ================= RIGHT CONTENT ================= */}

                        <div className="space-y-6 xl:col-span-2">

                            {/* PROFILE */}

                            <SettingsCard
                                icon={<User size={20} />}
                                title="Profile Information"
                                description="Update your basic profile information."
                            >

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your name"
                                    />

                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your email"
                                        icon={<Mail size={17} />}
                                    />

                                    <InputField
                                        label="Branch"
                                        name="branch"
                                        value={profile.branch}
                                        onChange={handleProfileChange}
                                        placeholder="Your branch"
                                    />

                                    <InputField
                                        label="Year"
                                        name="year"
                                        value={profile.year}
                                        onChange={handleProfileChange}
                                        placeholder="Your year"
                                    />

                                </div>

                            </SettingsCard>

                            {/* NOTIFICATIONS */}

                            <SettingsCard
                                icon={<Bell size={20} />}
                                title="Notifications"
                                description="Choose how you want to receive notifications."
                            >

                                <NotificationRow
                                    icon={<Mail size={18} />}
                                    title="Email Notifications"
                                    description="Receive important updates through email."
                                    enabled={notifications.email}
                                    onClick={() =>
                                        toggleNotification("email")
                                    }
                                />

                                <NotificationRow
                                    icon={<Smartphone size={18} />}
                                    title="Push Notifications"
                                    description="Receive notifications on your device."
                                    enabled={notifications.push}
                                    onClick={() =>
                                        toggleNotification("push")
                                    }
                                />

                                <NotificationRow
                                    icon={<Bell size={18} />}
                                    title="Product Updates"
                                    description="Get updates about new CONEXA features."
                                    enabled={notifications.updates}
                                    onClick={() =>
                                        toggleNotification("updates")
                                    }
                                />

                            </SettingsCard>

                            {/* PASSWORD */}

                            <SettingsCard
                                icon={<Lock size={20} />}
                                title="Change Password"
                                description="Keep your account secure with a strong password."
                            >

                                <div className="space-y-5">

                                    <PasswordField
                                        label="Current Password"
                                        name="current"
                                        value={password.current}
                                        onChange={handlePasswordChange}
                                        show={showPassword}
                                        setShow={setShowPassword}
                                    />

                                    <PasswordField
                                        label="New Password"
                                        name="newPassword"
                                        value={password.newPassword}
                                        onChange={handlePasswordChange}
                                        show={showPassword}
                                        setShow={setShowPassword}
                                    />

                                    <PasswordField
                                        label="Confirm New Password"
                                        name="confirm"
                                        value={password.confirm}
                                        onChange={handlePasswordChange}
                                        show={showPassword}
                                        setShow={setShowPassword}
                                    />

                                </div>

                            </SettingsCard>

                            {/* SAVE */}

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">

                                {saved && (
                                    <span className="text-sm font-semibold text-green-600">
                                        ✓ Changes saved successfully
                                    </span>
                                )}

                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleSave}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#312E81]"
                                >
                                    <Save size={17} />
                                    Save Changes
                                </motion.button>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}


/* =====================================================
   SETTINGS CARD
===================================================== */

function SettingsCard({
    icon,
    title,
    description,
    children,
}) {
    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 10,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >

            <div className="mb-6 flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#1E1B4B]">
                    {icon}
                </div>

                <div>
                    <h2 className="font-bold text-[#1E1B4B]">
                        {title}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        {description}
                    </p>
                </div>

            </div>

            {children}

        </motion.section>
    );
}


/* =====================================================
   SETTING MENU
===================================================== */

function SettingMenu({
    icon,
    title,
    active,
}) {
    return (
        <button
            className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${active
                    ? "bg-indigo-50 text-[#1E1B4B]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
        >
            {icon}

            <span>{title}</span>
        </button>
    );
}


/* =====================================================
   INPUT
===================================================== */

function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    icon,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <div className="relative">

                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {icon}
                    </span>
                )}

                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/10 ${icon ? "pl-10" : ""
                        }`}
                />

            </div>

        </div>
    );
}


/* =====================================================
   PASSWORD
===================================================== */

function PasswordField({
    label,
    name,
    value,
    onChange,
    show,
    setShow,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <div className="relative">

                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/10"
                />

                <button
                    type="button"
                    onClick={() =>
                        setShow(!show)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                    {show ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>

            </div>

        </div>
    );
}


/* =====================================================
   NOTIFICATION ROW
===================================================== */

function NotificationRow({
    icon,
    title,
    description,
    enabled,
    onClick,
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0">

            <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    {icon}
                </div>

                <div>

                    <h3 className="text-sm font-semibold text-slate-700">
                        {title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        {description}
                    </p>

                </div>

            </div>

            <button
                onClick={onClick}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled
                        ? "bg-[#14B8A6]"
                        : "bg-slate-300"
                    }`}
            >

                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${enabled
                            ? "left-6"
                            : "left-1"
                        }`}
                />

            </button>

        </div>
    );
}