
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    GraduationCap,
    Building2,
    Check,
    Clock,
    ShieldCheck,
} from "lucide-react";

import { loginUser as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import AuthInput from "./AuthInput";
import SocialLogin from "./SocialLogin";

const VALID_ACCOUNT_TYPES = ["student", "stakeholder"];

export default function LoginForm() {
    const navigate = useNavigate();
    const { loginUser: saveLogin } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
        accountType: "student",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            general: "",
        }));
    };

    const handleAccountTypeChange = (accountType) => {
        if (loading || !VALID_ACCOUNT_TYPES.includes(accountType)) {
            return;
        }

        setForm((prev) => ({ ...prev, accountType }));
        setErrors({});
    };

    const validate = () => {
        const nextErrors = {};

        if (!VALID_ACCOUNT_TYPES.includes(form.accountType)) {
            nextErrors.accountType =
                "Please select Student or Stakeholder.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (!form.password) {
            nextErrors.password = "Password is required.";
        } else if (form.password.length > 128) {
            nextErrors.password = "Password is too long.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading || !validate()) return;

        setLoading(true);
        setErrors({});

        try {
            const response = await loginApi({
                email: form.email.trim().toLowerCase(),
                password: form.password,
                accountType: form.accountType,
            });

            const result =
                response?.data?.data ??
                response?.data ??
                response;

            const user = result?.user;
            const token = result?.token ?? result?.accessToken;

            const status = String(
                user?.accountStatus ??
                user?.status ??
                result?.accountStatus ??
                result?.status ??
                ""
            ).toLowerCase();

            if (
                form.accountType === "stakeholder" &&
                (result?.requiresApproval || status === "pending")
            ) {
                navigate("/stakeholder-pending", {
                    replace: true,
                    state: {
                        message:
                            result?.message ||
                            "Your stakeholder application is awaiting admin approval.",
                    },
                });
                return;
            }

            if (!user || !token) {
                throw new Error(
                    result?.message ||
                    "The server did not return a valid login session."
                );
            }

            const accountType = String(
                user.accountType || ""
            ).toLowerCase();

            const accountStatus = String(
                user.accountStatus ?? user.status ?? ""
            ).toLowerCase();

            if (!VALID_ACCOUNT_TYPES.includes(accountType)) {
                throw new Error(
                    "Invalid account type returned by the server."
                );
            }

            if (accountType !== form.accountType) {
                throw new Error(
                    `This email belongs to a ${accountType} account. Please select the correct account type.`
                );
            }

            if (
                accountType === "stakeholder" &&
                accountStatus === "pending"
            ) {
                navigate("/stakeholder-pending", {
                    replace: true,
                    state: {
                        message:
                            "Your stakeholder application is awaiting admin approval.",
                    },
                });
                return;
            }

            if (
                accountType === "stakeholder" &&
                accountStatus !== "active"
            ) {
                throw new Error(
                    accountStatus === "rejected"
                        ? "Your stakeholder application was rejected. Please contact the CONEXA team."
                        : accountStatus === "suspended"
                            ? "Your stakeholder account is suspended. Please contact support."
                            : "Your stakeholder account is not approved yet."
                );
            }

            if (
                accountType === "student" &&
                accountStatus &&
                accountStatus !== "active"
            ) {
                throw new Error("Your student account is not active.");
            }

            const normalizedUser = {
                ...user,
                accountType,
                accountStatus:
                    accountStatus ||
                    (accountType === "student" ? "active" : ""),
            };

            localStorage.setItem("token", token);
            localStorage.setItem(
                "user",
                JSON.stringify(normalizedUser)
            );

            if (typeof saveLogin === "function") {
                const saved = await saveLogin(normalizedUser, token);

                if (saved === false) {
                    throw new Error(
                        "AuthContext could not establish your login session."
                    );
                }
            }

            if (!localStorage.getItem("token")) {
                throw new Error(
                    "The login token was not saved. Please try again."
                );
            }

            navigate(
                accountType === "stakeholder"
                    ? "/stakeholder-dashboard"
                    : "/dashboard",
                { replace: true }
            );
        } catch (err) {
            console.error(
                "Login error:",
                err?.response?.data || err
            );

            const errorBody =
                err?.response?.data?.data ??
                err?.response?.data;

            if (
                form.accountType === "stakeholder" &&
                (
                    errorBody?.requiresApproval ||
                    errorBody?.accountStatus === "pending" ||
                    errorBody?.status === "pending"
                )
            ) {
                navigate("/stakeholder-pending", {
                    replace: true,
                    state: {
                        message:
                            errorBody?.message ||
                            "Your stakeholder application is awaiting admin approval.",
                    },
                });
                return;
            }

            setErrors({
                general:
                    errorBody?.message ||
                    errorBody?.error ||
                    err?.message ||
                    "Login failed. Please check your credentials and try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const isStakeholder = form.accountType === "stakeholder";

    return (
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
                    {isStakeholder ? (
                        <Building2
                            size={28}
                            className="text-[#14B8A6]"
                        />
                    ) : (
                        <GraduationCap
                            size={28}
                            className="text-[#14B8A6]"
                        />
                    )}
                </div>

                <h2 className="text-3xl font-black text-[#1E1B4B]">
                    Welcome Back
                </h2>

                <p className="mt-2 text-slate-500">
                    Sign in to continue your CONEXA journey.
                </p>
            </div>

            {errors.general && (
                <div
                    role="alert"
                    className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
                >
                    {errors.general}
                </div>
            )}

            <div className="mt-7">
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Sign in as
                </label>

                {/* Equal-width and equal-height account type cards */}
                <div className="grid grid-cols-2 items-stretch gap-3">
                    <AccountTypeButton
                        title="Student"
                        description="Find teammates"
                        icon={GraduationCap}
                        selected={form.accountType === "student"}
                        disabled={loading}
                        onClick={() =>
                            handleAccountTypeChange("student")
                        }
                    />

                    <AccountTypeButton
                        title="Stakeholder"
                        description="Post real-world problems"
                        icon={Building2}
                        selected={isStakeholder}
                        disabled={loading}
                        onClick={() =>
                            handleAccountTypeChange("stakeholder")
                        }
                    />
                </div>

                {errors.accountType && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors.accountType}
                    </p>
                )}
            </div>

            {isStakeholder && (
                <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <Clock
                        size={21}
                        className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <div>
                        <p className="text-sm font-bold text-amber-900">
                            Admin approval required
                        </p>

                        <p className="mt-1 text-xs leading-5 text-amber-800">
                            Stakeholder accounts can access their
                            dashboard only after admin approval.
                        </p>
                    </div>
                </div>
            )}

            {!isStakeholder && <SocialLogin />}

            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-5 space-y-5"
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

                <div className="flex items-center justify-end">
                    <Link
                        to="/forgot-password"
                        className="font-medium text-[#14B8A6] hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] font-semibold text-white transition-all duration-300 hover:bg-[#312E81] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Signing In...
                        </>
                    ) : (
                        <>
                            {isStakeholder && (
                                <ShieldCheck size={19} />
                            )}
                            Sign In
                        </>
                    )}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-[#14B8A6] hover:underline"
                >
                    Create an Account
                </Link>
            </p>
        </div>
    );
}

function AccountTypeButton({
    title,
    description,
    icon: Icon,
    selected,
    disabled,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-pressed={selected}
            className={`relative flex h-[120px] min-w-0 w-full flex-col items-center justify-center rounded-2xl border-2 px-2 py-4 text-center transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[130px] sm:px-3 ${selected
                    ? "border-[#14B8A6] bg-teal-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
        >
            {selected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#14B8A6] text-white">
                    <Check size={13} strokeWidth={3} />
                </span>
            )}

            <Icon
                size={25}
                className={
                    selected
                        ? "shrink-0 text-[#14B8A6]"
                        : "shrink-0 text-slate-500"
                }
            />

            <span
                className={`mt-2 text-sm font-bold ${selected
                        ? "text-[#1E1B4B]"
                        : "text-slate-600"
                    }`}
            >
                {title}
            </span>

            <span className="mt-1 max-w-full text-center text-xs leading-4 text-slate-400">
                {description}
            </span>
        </button>
    );
}
