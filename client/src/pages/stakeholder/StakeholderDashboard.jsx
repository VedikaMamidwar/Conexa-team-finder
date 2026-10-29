
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Building2,
    LogOut,
    RefreshCw,
    FileText,
    PlusCircle,
    UserRound,
    Globe,
    Mail,
    Pencil,
    X,
    Save,
    AlertCircle,
    CheckCircle,
    LayoutDashboard,
    ExternalLink,
} from "lucide-react";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
)
    .trim()
    .replace(/\s+/g, "")
    .replace(/\/+$/, "");

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
        return null;
    }
};

const getToken = () => localStorage.getItem("token");

export default function StakeholderDashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(getStoredUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [profileOpen, setProfileOpen] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);

    const [profileForm, setProfileForm] = useState({
        name: "",
        organizationName: "",
        organizationDescription: "",
        email: "",
        website: "",
    });

    const clearSession = useCallback(() => {
        [
            "token",
            "authToken",
            "jwt",
            "user",
            "refreshToken",
        ].forEach((key) => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });
    }, []);

    const handleLogout = useCallback(() => {
        clearSession();
        navigate("/login", { replace: true });
    }, [clearSession, navigate]);

    const loadAccount = useCallback(async () => {
        const token = getToken();

        if (!token) {
            clearSession();
            navigate("/login", { replace: true });
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`${API_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response?.data?.data ?? response?.data;
            const currentUser = data?.user ?? data;

            if (!currentUser || !(currentUser.id || currentUser._id)) {
                throw new Error("Unable to load your account details.");
            }

            if (currentUser.accountType !== "stakeholder") {
                navigate("/dashboard", { replace: true });
                return;
            }

            setUser(currentUser);
            localStorage.setItem("user", JSON.stringify(currentUser));

            setProfileForm({
                name: currentUser.name || "",
                organizationName: currentUser.organizationName || "",
                organizationDescription:
                    currentUser.organizationDescription || "",
                email: currentUser.email || "",
                website: currentUser.website || "",
            });
        } catch (err) {
            const status = err?.response?.status;

            if (status === 401) {
                clearSession();
                navigate("/login", { replace: true });
                return;
            }

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load your stakeholder dashboard."
            );
        } finally {
            setLoading(false);
        }
    }, [clearSession, navigate]);

    useEffect(() => {
        loadAccount();
    }, [loadAccount]);

    const openManageProfile = () => {
        setError("");
        setSuccess("");

        setProfileForm({
            name: user?.name || "",
            organizationName: user?.organizationName || "",
            organizationDescription: user?.organizationDescription || "",
            email: user?.email || "",
            website: user?.website || "",
        });

        setProfileOpen(true);
    };

    const handleProfileChange = (event) => {
        const { name, value } = event.target;

        setProfileForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSaveProfile = async (event) => {
        event.preventDefault();

        const token = getToken();

        if (!token) {
            handleLogout();
            return;
        }

        setSavingProfile(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                name: profileForm.name.trim(),
                organizationName: profileForm.organizationName.trim(),
                organizationDescription:
                    profileForm.organizationDescription.trim(),
                website: profileForm.website.trim(),
            };

            // Requires PUT /api/auth/profile on your backend.
            const response = await axios.put(
                `${API_URL}/auth/profile`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const responseData =
                response?.data?.data ?? response?.data;

            const updatedUser =
                responseData?.user ?? responseData?.profile ?? responseData;

            const mergedUser = {
                ...user,
                ...payload,
                ...(updatedUser && typeof updatedUser === "object"
                    ? updatedUser
                    : {}),
                accountType: "stakeholder",
            };

            setUser(mergedUser);
            localStorage.setItem("user", JSON.stringify(mergedUser));
            setProfileOpen(false);
            setSuccess("Profile updated successfully.");
        } catch (err) {
            if (err?.response?.status === 401) {
                handleLogout();
                return;
            }

            setError(
                err?.response?.data?.message ||
                "Could not update your profile. Please check that PUT /api/auth/profile is implemented in your backend."
            );
        } finally {
            setSavingProfile(false);
        }
    };

    const handleManageProblems = () => {
        navigate("/my-problems");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="text-center">
                    <RefreshCw
                        size={34}
                        className="mx-auto animate-spin text-teal-600"
                    />
                    <p className="mt-4 text-sm text-slate-600">
                        Loading your stakeholder dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* HEADER */}
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B] text-white">
                            <Building2 size={25} />
                        </div>

                        <div>
                            <h1 className="text-lg font-black text-[#1E1B4B]">
                                CONEXA
                            </h1>
                            <p className="text-xs text-slate-500">
                                Stakeholder Dashboard
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={openManageProfile}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2.5 text-sm font-bold text-[#1E1B4B] transition hover:bg-indigo-100 sm:px-4"
                        >
                            <Pencil size={16} />
                            <span className="hidden sm:inline">
                                Manage Profile
                            </span>
                            <span className="sm:hidden">Profile</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:px-4"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                {/* ERROR MESSAGE */}
                {error && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <AlertCircle
                            size={20}
                            className="mt-0.5 shrink-0"
                        />
                        <p className="min-w-0 flex-1 break-words">
                            {error}
                        </p>
                        <button
                            type="button"
                            onClick={() => setError("")}
                            aria-label="Dismiss error"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* SUCCESS MESSAGE */}
                {success && (
                    <div
                        role="status"
                        className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
                    >
                        <CheckCircle size={20} />
                        <p className="flex-1">{success}</p>
                        <button
                            type="button"
                            onClick={() => setSuccess("")}
                            aria-label="Dismiss message"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* WELCOME BANNER */}
                <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-teal-600 p-7 text-white shadow-xl sm:p-10">
                    <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-teal-100">
                                <LayoutDashboard size={15} />
                                STAKEHOLDER WORKSPACE
                            </div>

                            <h2 className="mt-5 break-words text-3xl font-black sm:text-4xl">
                                Welcome, {user?.name || "Stakeholder"}!
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
                                Manage your organization profile, publish
                                real-world challenges, and connect with
                                students who can build meaningful solutions.
                            </p>

                            <button
                                type="button"
                                onClick={handleManageProblems}
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#1E1B4B] transition hover:bg-teal-50"
                            >
                                <PlusCircle size={19} />
                                Manage Problems
                            </button>
                        </div>

                        <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 sm:h-28 sm:w-28 sm:self-center">
                            <Building2 size={52} />
                        </div>
                    </div>
                </section>

                {/* DASHBOARD OVERVIEW */}
                <section className="mt-8">
                    <div className="mb-5">
                        <h2 className="text-2xl font-black text-[#1E1B4B]">
                            Your Workspace
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage your organization and real-world problem
                            posts from one place.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* PROFILE CARD */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#312E81]">
                                <UserRound size={25} />
                            </div>

                            <h3 className="mt-5 text-xl font-black text-[#1E1B4B]">
                                Manage Profile
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Update your contact details, organization
                                information, description, and website.
                            </p>

                            <button
                                type="button"
                                onClick={openManageProfile}
                                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-indigo-200 px-4 py-3 text-sm font-bold text-[#312E81] transition hover:bg-indigo-50"
                            >
                                <Pencil size={17} />
                                Edit Profile
                            </button>
                        </div>

                        {/* PROBLEMS CARD */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                                <FileText size={25} />
                            </div>

                            <h3 className="mt-5 text-xl font-black text-[#1E1B4B]">
                                Real-World Problems
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Create new challenges, manage your existing
                                problem posts, and share real-world issues
                                with students.
                            </p>

                            <button
                                type="button"
                                onClick={handleManageProblems}
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                            >
                                <PlusCircle size={18} />
                                Create / Manage Problems
                            </button>
                        </div>
                    </div>
                </section>

                {/* ORGANIZATION DETAILS */}
                <section className="mt-10">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-black text-[#1E1B4B]">
                                Organization Details
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Your current stakeholder profile information.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openManageProfile}
                            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800"
                        >
                            <Pencil size={16} />
                            Edit details
                        </button>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <InfoCard
                            icon={Building2}
                            title="Organization"
                            value={user?.organizationName || "Not provided"}
                        />

                        <InfoCard
                            icon={UserRound}
                            title="Contact Person"
                            value={user?.name || "Not provided"}
                        />

                        <InfoCard
                            icon={Mail}
                            title="Email Address"
                            value={user?.email || "Not provided"}
                        />

                        <InfoCard
                            icon={Globe}
                            title="Website"
                            value={user?.website || "Not provided"}
                            href={user?.website}
                        />
                    </div>

                    {user?.organizationDescription && (
                        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="font-bold text-[#1E1B4B]">
                                About the Organization
                            </h3>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                                {user.organizationDescription}
                            </p>
                        </div>
                    )}
                </section>
            </main>

            {/* MANAGE PROFILE MODAL */}
            {profileOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setProfileOpen(false);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="manage-profile-title"
                        className="my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                    >
                        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
                            <div>
                                <h2
                                    id="manage-profile-title"
                                    className="text-xl font-black text-[#1E1B4B] sm:text-2xl"
                                >
                                    Manage Profile
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Update your stakeholder information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setProfileOpen(false)}
                                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                aria-label="Close profile editor"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSaveProfile}
                            className="space-y-5 p-6 sm:p-8"
                        >
                            <FormField
                                label="Contact Person Name"
                                name="name"
                                value={profileForm.name}
                                onChange={handleProfileChange}
                                placeholder="Enter your full name"
                                required
                            />

                            <FormField
                                label="Organization Name"
                                name="organizationName"
                                value={profileForm.organizationName}
                                onChange={handleProfileChange}
                                placeholder="Enter organization name"
                                required
                            />

                            <FormField
                                label="Email Address"
                                name="email"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                                placeholder="Enter email address"
                                type="email"
                                disabled
                            />

                            <FormField
                                label="Organization Website"
                                name="website"
                                value={profileForm.website}
                                onChange={handleProfileChange}
                                placeholder="https://example.com"
                                type="url"
                            />

                            <div>
                                <label
                                    htmlFor="organizationDescription"
                                    className="mb-2 block text-sm font-bold text-slate-700"
                                >
                                    Organization Description
                                </label>

                                <textarea
                                    id="organizationDescription"
                                    name="organizationDescription"
                                    value={profileForm.organizationDescription}
                                    onChange={handleProfileChange}
                                    rows={4}
                                    placeholder="Tell students about your organization..."
                                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                />
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={savingProfile}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#312E81] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {savingProfile ? (
                                        <RefreshCw
                                            size={17}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Save size={17} />
                                    )}
                                    {savingProfile
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function FormField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    disabled = false,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-bold text-slate-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            />
        </div>
    );
}

function InfoCard({ icon: Icon, title, value, href }) {
    const validHref =
        typeof href === "string" && /^https?:\/\//i.test(href);

    return (
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon size={21} />
                </div>
                <p className="text-sm font-semibold text-slate-500">
                    {title}
                </p>
            </div>

            {validHref ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex max-w-full items-center gap-2 break-all font-bold text-teal-700 hover:underline"
                >
                    <span>{value}</span>
                    <ExternalLink size={14} className="shrink-0" />
                </a>
            ) : (
                <p className="mt-4 break-words font-bold text-[#1E1B4B]">
                    {value}
                </p>
            )}
        </div>
    );
}
