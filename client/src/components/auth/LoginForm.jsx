import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    GraduationCap,
    Building2,
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

        setErrors({});
    };

    // =====================================================
    // VALIDATION
    // =====================================================

    const validate = () => {
        const newErrors = {};

        if (!form.accountType) {
            newErrors.accountType =
                "Please select account type.";
        }

        if (!form.email.trim()) {
            newErrors.email =
                "Email is required";
        } else if (
            !/\S+@\S+\.\S+/.test(form.email)
        ) {
            newErrors.email =
                "Invalid email";
        }

        if (!form.password) {
            newErrors.password =
                "Password is required";
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

                // IMPORTANT
                accountType: form.accountType,
            });

            if (!data?.token || !data?.user) {
                throw new Error(
                    "Invalid login response from server"
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
                "user",
                JSON.stringify(data.user)
            );

            localStorage.setItem(
                "token",
                data.token
            );

            alert("Login Successful");

            // =================================================
            // ACCOUNT TYPE BASED NAVIGATION
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

            alert(
                err.response?.data?.message ||
                err.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="text-center">

                <h2 className="text-3xl font-black text-[#1E1B4B]">
                    Welcome Back
                </h2>

                <p className="mt-2 text-slate-500">
                    Sign in to continue your CONEXA journey.
                </p>

            </div>

            <SocialLogin />

            {/* =================================================
                ACCOUNT TYPE
            ================================================= */}

            <div className="mt-6">

                <label className="block text-sm font-semibold text-slate-600 mb-3">
                    Sign in as
                </label>

                <div className="grid grid-cols-2 gap-3">

                    {/* STUDENT */}

                    <button
                        type="button"
                        onClick={() =>
                            selectAccountType(
                                "student"
                            )
                        }
                        className={`
                            p-3
                            rounded-xl
                            border-2
                            transition-all
                            text-left
                            ${form.accountType ===
                                "student"
                                ? "border-[#14B8A6] bg-[#14B8A6]/5"
                                : "border-slate-200 hover:border-[#14B8A6]/50"
                            }
                        `}
                    >

                        <div className="flex items-center gap-2">

                            <div
                                className={`
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    ${form.accountType ===
                                        "student"
                                        ? "bg-[#1E1B4B] text-[#14B8A6]"
                                        : "bg-slate-100 text-slate-500"
                                    }
                                `}
                            >
                                <GraduationCap size={18} />
                            </div>

                            <div>

                                <p className="text-sm font-bold text-[#1E1B4B]">
                                    Student
                                </p>

                                <p className="text-[10px] text-slate-500">
                                    Find teams & projects
                                </p>

                            </div>

                        </div>

                    </button>

                    {/* STAKEHOLDER */}

                    <button
                        type="button"
                        onClick={() =>
                            selectAccountType(
                                "stakeholder"
                            )
                        }
                        className={`
                            p-3
                            rounded-xl
                            border-2
                            transition-all
                            text-left
                            ${form.accountType ===
                                "stakeholder"
                                ? "border-[#14B8A6] bg-[#14B8A6]/5"
                                : "border-slate-200 hover:border-[#14B8A6]/50"
                            }
                        `}
                    >

                        <div className="flex items-center gap-2">

                            <div
                                className={`
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    ${form.accountType ===
                                        "stakeholder"
                                        ? "bg-[#1E1B4B] text-[#14B8A6]"
                                        : "bg-slate-100 text-slate-500"
                                    }
                                `}
                            >
                                <Building2 size={18} />
                            </div>

                            <div>

                                <p className="text-sm font-bold text-[#1E1B4B]">
                                    Stakeholder
                                </p>

                                <p className="text-[10px] text-slate-500">
                                    Post real-world problems
                                </p>

                            </div>

                        </div>

                    </button>

                </div>

                {errors.accountType && (
                    <p className="text-xs text-red-500 mt-2">
                        {errors.accountType}
                    </p>
                )}

            </div>

            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5 mt-6"
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
                />

                <AuthInput
                    label="Password"
                    name="password"
                    type="password"
                    icon={Lock}
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                />

                {/* =================================================
                    REMEMBER + FORGOT
                ================================================= */}

                <div className="flex items-center justify-between">

                    <label className="flex items-center gap-2 text-sm text-slate-600">

                        <input
                            type="checkbox"
                            className="accent-[#14B8A6]"
                        />

                        Remember Me

                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-[#14B8A6] font-medium hover:underline"
                    >
                        Forgot Password?
                    </Link>

                </div>

                {/* =================================================
                    LOGIN BUTTON
                ================================================= */}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full
                        h-14
                        rounded-xl
                        bg-[#1E1B4B]
                        text-white
                        font-semibold
                        hover:bg-[#312E81]
                        transition-all
                        duration-300
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                    "
                >

                    {loading
                        ? "Signing In..."
                        : form.accountType ===
                            "stakeholder"
                            ? "Sign In as Stakeholder"
                            : "Sign In as Student"}

                </button>

            </form>

            {/* =================================================
                REGISTER
            ================================================= */}

            <p className="text-center mt-8 text-slate-600">

                Don't have an account?

                <Link
                    to="/register"
                    className="ml-2 text-[#14B8A6] font-semibold hover:underline"
                >
                    Create Account
                </Link>

            </p>

        </div>
    );
}