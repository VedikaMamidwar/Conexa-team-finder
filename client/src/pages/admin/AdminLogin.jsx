import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    AlertCircle,
    LoaderCircle,
} from "lucide-react";
import axios from "axios";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
)
    .trim()
    .replace(/\/+$/, "");

export default function AdminLogin() {
    const navigate = useNavigate();


    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!form.email.trim() || !form.password) {
            setError("Please enter your admin email and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.post(
                `${API_URL}/admin/login`,
                {
                    email: form.email.trim().toLowerCase(),
                    password: form.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response?.data?.data ?? response?.data;
            const token = data?.token || data?.accessToken;
            const admin = data?.admin;

            if (!token || !admin) {
                throw new Error(
                    "The server did not return a valid admin session."
                );
            }

            if (admin.role !== "admin") {
                throw new Error("Admin access is required.");
            }

            // Keep admin credentials separate from regular user session.
            localStorage.setItem("adminToken", token);
            localStorage.setItem("adminUser", JSON.stringify(admin));

            navigate("/admin/dashboard", { replace: true });
        } catch (err) {
            console.error("Admin login error:", err);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Admin login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

            <div className="relative w-full max-w-md">
                <Link
                    to="/landing"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
                >
                    <ArrowLeft size={17} />
                    Back to CONEXA
                </Link>

                <div className="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9">
                    <div className="mb-7 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                            <ShieldCheck
                                size={34}
                                className="text-indigo-700"
                            />
                        </div>

                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                            CONEXA Administration
                        </p>

                        <h1 className="mt-2 text-3xl font-black text-[#1E1B4B]">
                            Admin Login
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Sign in to review stakeholder applications
                            and manage approvals.
                        </p>
                    </div>

                    {error && (
                        <div
                            role="alert"
                            className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                        >
                            <AlertCircle
                                size={20}
                                className="mt-0.5 shrink-0"
                            />
                            <p>{error}</p>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        noValidate
                    >
                        <div>
                            <label
                                htmlFor="admin-email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Admin Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="admin-email"
                                    type="email"
                                    name="email"
                                    autoComplete="username"
                                    placeholder="Enter admin email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    maxLength={254}
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:opacity-60"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="admin-password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="admin-password"
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Enter admin password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    maxLength={128}
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] font-semibold text-white transition hover:bg-[#312E81] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle
                                        size={19}
                                        className="animate-spin"
                                    />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={19} />
                                    Secure Admin Login
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
                        <p className="text-xs leading-5 text-slate-500">
                            Restricted access. Admin accounts are created
                            through backend configuration, not public
                            registration.
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} CONEXA. Admin Portal.
                </p>
            </div>
        </div>
    );


}

