import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    GraduationCap,
    Building2,
    ArrowRight,
    Check,
    Loader2,
} from "lucide-react";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import AuthInput from "./AuthInput";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
        accountType: "student",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // =====================================================
    // ACCOUNT TYPE
    // =====================================================

    const selectAccountType = (type) => {
        setForm((prev) => ({
            ...prev,
            accountType: type,
        }));

        setErrors((prev) => ({
            ...prev,
            accountType: "",
        }));
    };

    // =====================================================
    // VALIDATION
    // =====================================================

    const validate = () => {
        const newErrors = {};

        if (!form.accountType) {
            newErrors.accountType =
                "Please select an account type.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!form.password) {
            newErrors.password =
                "Password is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!validate()) return;

        try {
            setLoading(true);

            const data = await loginUser({
                email: form.email.trim(),
                password: form.password,
                accountType: form.accountType,
            });

            if (!data?.token || !data?.user) {
                throw new Error(
                    "Invalid login response from server."
                );
            }

            // =================================================
            // VERIFY ACCOUNT TYPE FROM SERVER
            // =================================================

            if (
                data.user.accountType !==
                form.accountType
            ) {
                throw new Error(
                    `This account is registered as ${data.user.accountType ===
                        "stakeholder"
                        ? "Stakeholder"
                        : "Student"
                    }. Please select the correct account type.`
                );
            }

            // =================================================
            // AUTH CONTEXT
            // =================================================

            setUser(data.user);

            // =================================================
            // LOCAL STORAGE
            // =================================================

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Optional remember preference
            localStorage.setItem(
                "rememberMe",
                rememberMe ? "true" : "false"
            );

            // =================================================
            // ROLE BASED NAVIGATION
            // =================================================

            if (
                data.user.accountType ===
                "stakeholder"
            ) {
                navigate(
                    "/stakeholder-dashboard",
                    {
                        replace: true,
                    }
                );
            } else {
                navigate(
                    "/dashboard",
                    {
                        replace: true,
                    }
                );
            }
        } catch (err) {
            console.error(
                "Login Error:",
                err
            );

            const message =
                err.response?.data?.message ||
                err.message ||
                "Login failed. Please try again.";

            setErrors({
                submit: message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                w-full
                bg-white
                rounded-[28px]
                border
                border-slate-200
                shadow-[0_20px_60px_rgba(30,27,75,0.08)]
                p-5
                sm:p-7
                md:p-8
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="text-center">
                <div
                    className="
                        inline-flex
                        items-center
                        justify-center
                        w-12
                        h-12
                        rounded-2xl
                        bg-[#14B8A6]/10
                        text-[#14B8A6]
                        mb-4
                    "
                >
                    <Lock
                        size={22}
                        strokeWidth={2}
                    />
                </div>

                <h2
                    className="
                        text-2xl
                        sm:text-3xl
                        font-black
                        tracking-tight
                        text-[#1E1B4B]
                    "
                >
                    Welcome Back
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        sm:text-base
                        text-slate-500
                    "
                >
                    Sign in to continue your CONEXA journey.
                </p>
            </div>

            {/* =================================================
                SOCIAL LOGIN
            ================================================= */}

            <div className="mt-6">
                <SocialLogin />
            </div>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                    OR CONTINUE WITH EMAIL
                </span>

                <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* =================================================
                ACCOUNT TYPE
            ================================================= */}

            <div>
                <label
                    className="
                        block
                        mb-3
                        text-sm
                        font-semibold
                        text-[#1E1B4B]
                    "
                >
                    Sign in as
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {/* ================= STUDENT ================= */}

                    <button
                        type="button"
                        onClick={() =>
                            selectAccountType("student")
                        }
                        disabled={loading}
                        aria-pressed={
                            form.accountType ===
                            "student"
                        }
                        className={`
                            group
                            relative
                            w-full
                            text-left
                            p-3
                            sm:p-4
                            rounded-2xl
                            border-2
                            transition-all
                            duration-300
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            ${form.accountType ===
                                "student"
                                ? `
                                        border-[#14B8A6]
                                        bg-[#14B8A6]/5
                                        shadow-md
                                        shadow-[#14B8A6]/10
                                      `
                                : `
                                        border-slate-200
                                        bg-white
                                        hover:border-[#14B8A6]/50
                                        hover:bg-slate-50
                                      `
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className={`
                                    relative
                                    flex
                                    items-center
                                    justify-center
                                    shrink-0
                                    w-10
                                    h-10
                                    rounded-xl
                                    transition-all
                                    duration-300
                                    ${form.accountType ===
                                        "student"
                                        ? "bg-[#1E1B4B] text-[#14B8A6]"
                                        : "bg-slate-100 text-slate-500 group-hover:bg-[#14B8A6]/10 group-hover:text-[#14B8A6]"
                                    }
                                `}
                            >
                                <GraduationCap
                                    size={20}
                                />

                                {form.accountType ===
                                    "student" && (
                                        <span
                                            className="
                                            absolute
                                            -top-1
                                            -right-1
                                            flex
                                            items-center
                                            justify-center
                                            w-4
                                            h-4
                                            rounded-full
                                            bg-[#14B8A6]
                                            text-white
                                        "
                                        >
                                            <Check
                                                size={10}
                                                strokeWidth={3}
                                            />
                                        </span>
                                    )}
                            </div>

                            <div className="min-w-0">
                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-[#1E1B4B]
                                    "
                                >
                                    Student
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-[11px]
                                        leading-4
                                        text-slate-500
                                    "
                                >
                                    Find teams & projects
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* =============== STAKEHOLDER =============== */}

                    <button
                        type="button"
                        onClick={() =>
                            selectAccountType(
                                "stakeholder"
                            )
                        }
                        disabled={loading}
                        aria-pressed={
                            form.accountType ===
                            "stakeholder"
                        }
                        className={`
                            group
                            relative
                            w-full
                            text-left
                            p-3
                            sm:p-4
                            rounded-2xl
                            border-2
                            transition-all
                            duration-300
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            ${form.accountType ===
                                "stakeholder"
                                ? `
                                        border-[#14B8A6]
                                        bg-[#14B8A6]/5
                                        shadow-md
                                        shadow-[#14B8A6]/10
                                      `
                                : `
                                        border-slate-200
                                        bg-white
                                        hover:border-[#14B8A6]/50
                                        hover:bg-slate-50
                                      `
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className={`
                                    relative
                                    flex
                                    items-center
                                    justify-center
                                    shrink-0
                                    w-10
                                    h-10
                                    rounded-xl
                                    transition-all
                                    duration-300
                                    ${form.accountType ===
                                        "stakeholder"
                                        ? "bg-[#1E1B4B] text-[#14B8A6]"
                                        : "bg-slate-100 text-slate-500 group-hover:bg-[#14B8A6]/10 group-hover:text-[#14B8A6]"
                                    }
                                `}
                            >
                                <Building2
                                    size={20}
                                />

                                {form.accountType ===
                                    "stakeholder" && (
                                        <span
                                            className="
                                            absolute
                                            -top-1
                                            -right-1
                                            flex
                                            items-center
                                            justify-center
                                            w-4
                                            h-4
                                            rounded-full
                                            bg-[#14B8A6]
                                            text-white
                                        "
                                        >
                                            <Check
                                                size={10}
                                                strokeWidth={3}
                                            />
                                        </span>
                                    )}
                            </div>

                            <div className="min-w-0">
                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-[#1E1B4B]
                                    "
                                >
                                    Stakeholder
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-[11px]
                                        leading-4
                                        text-slate-500
                                    "
                                >
                                    Post real-world problems
                                </p>
                            </div>
                        </div>
                    </button>
                </div>

                {errors.accountType && (
                    <p className="mt-2 px-1 text-xs font-medium text-red-500">
                        {errors.accountType}
                    </p>
                )}
            </div>

            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
            >
                <AuthInput
                    label="Email"
                    name="email"
                    type="email"
                    icon={Mail}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    disabled={loading}
                />

                <AuthInput
                    label="Password"
                    name="password"
                    type="password"
                    icon={Lock}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                    disabled={loading}
                />

                {/* =================================================
                    REMEMBER + FORGOT
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-3
                    "
                >
                    <label
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-600
                            cursor-pointer
                            select-none
                        "
                    >
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) =>
                                setRememberMe(
                                    e.target.checked
                                )
                            }
                            disabled={loading}
                            className="
                                w-4
                                h-4
                                rounded
                                border-slate-300
                                accent-[#14B8A6]
                                cursor-pointer
                            "
                        />

                        Remember Me
                    </label>

                    <Link
                        to="/forgot-password"
                        className="
                            text-sm
                            font-semibold
                            text-[#14B8A6]
                            hover:text-[#0F9488]
                            transition-colors
                        "
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* =================================================
                    SUBMIT ERROR
                ================================================= */}

                {errors.submit && (
                    <div
                        className="
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            font-medium
                            text-red-600
                        "
                    >
                        {errors.submit}
                    </div>
                )}

                {/* =================================================
                    LOGIN BUTTON
                ================================================= */}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        group
                        w-full
                        min-h-[56px]
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[#1E1B4B]
                        px-5
                        text-sm
                        sm:text-base
                        font-bold
                        text-white
                        shadow-lg
                        shadow-[#1E1B4B]/15
                        hover:bg-[#312E81]
                        hover:-translate-y-0.5
                        active:translate-y-0
                        active:scale-[0.99]
                        transition-all
                        duration-300
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        disabled:hover:translate-y-0
                    "
                >
                    {loading ? (
                        <>
                            <Loader2
                                size={20}
                                className="animate-spin"
                            />

                            <span>
                                Signing In...
                            </span>
                        </>
                    ) : (
                        <>
                            <span>
                                {form.accountType ===
                                    "stakeholder"
                                    ? "Sign In as Stakeholder"
                                    : "Sign In as Student"}
                            </span>

                            <ArrowRight
                                size={19}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </>
                    )}
                </button>
            </form>

            {/* =================================================
                REGISTER
            ================================================= */}

            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    mt-7
                    text-sm
                    text-slate-600
                    text-center
                    flex-wrap
                "
            >
                <span>
                    Don't have an account?
                </span>

                <Link
                    to="/register"
                    className="
                        font-bold
                        text-[#14B8A6]
                        hover:text-[#0F9488]
                        transition-colors
                    "
                >
                    Create Account
                </Link>
            </div>

            {/* =================================================
                SECURITY NOTE
            ================================================= */}

            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    mt-6
                    text-[11px]
                    text-slate-400
                "
            >
                <Lock size={12} />

                <span>
                    Your account information is securely protected.
                </span>
            </div>
        </div>
    );
}