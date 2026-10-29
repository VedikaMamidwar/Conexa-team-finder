
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import {
    Sparkles,
    User,
    Mail,
    Lock,
    GraduationCap,
    BookOpen,
    Eye,
    EyeOff,
    Check,
    X,
    ArrowRight,
    Building2,
    Globe,
    FileText,
    ShieldCheck,
    Clock,
} from "lucide-react";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [accountType, setAccountType] = useState("student");

    const [form, setForm] = useState({
        name: "",
        email: "",
        college: "",
        branch: "",
        year: "",
        organizationName: "",
        organizationDescription: "",
        website: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [serverError, setServerError] = useState("");
    const [pendingMessage, setPendingMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setServerError("");
        setPendingMessage("");
    };

    const handleAccountTypeChange = (type) => {
        setAccountType(type);
        setErrors({});
        setServerError("");
        setPendingMessage("");
    };

    const checks = [
        {
            label: "8+ characters",
            valid: form.password.length >= 8,
        },
        {
            label: "Uppercase",
            valid: /[A-Z]/.test(form.password),
        },
        {
            label: "Number",
            valid: /[0-9]/.test(form.password),
        },
        {
            label: "Special character",
            valid: /[^A-Za-z0-9]/.test(form.password),
        },
    ];

    const score = checks.filter((item) => item.valid).length;

    const strength =
        score <= 1
            ? "Weak"
            : score === 2
                ? "Fair"
                : score === 3
                    ? "Good"
                    : "Strong";

    const validate = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Full name is required.";
        } else if (form.name.trim().length > 100) {
            nextErrors.name = "Name must be 100 characters or fewer.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (accountType === "student") {
            if (!form.college.trim()) {
                nextErrors.college = "College name is required.";
            }

            if (!form.branch.trim()) {
                nextErrors.branch = "Branch is required.";
            }

            if (!form.year) {
                nextErrors.year = "Select your current year.";
            }
        }

        if (accountType === "stakeholder") {
            if (!form.organizationName.trim()) {
                nextErrors.organizationName =
                    "Organization name is required.";
            } else if (form.organizationName.trim().length > 150) {
                nextErrors.organizationName =
                    "Organization name must be 150 characters or fewer.";
            }

            if (form.organizationDescription.length > 2000) {
                nextErrors.organizationDescription =
                    "Description cannot exceed 2000 characters.";
            }

            if (form.website.trim()) {
                try {
                    const parsed = new URL(form.website.trim());

                    if (!["http:", "https:"].includes(parsed.protocol)) {
                        throw new Error("Invalid protocol");
                    }
                } catch {
                    nextErrors.website =
                        "Enter a valid website URL starting with https:// or http://.";
                }
            }
        }

        if (!form.password) {
            nextErrors.password = "Password is required.";
        } else if (form.password.length < 8) {
            nextErrors.password =
                "Password must contain at least 8 characters.";
        } else if (form.password.length > 128) {
            nextErrors.password =
                "Password cannot exceed 128 characters.";
        } else if (
            !/[A-Z]/.test(form.password) ||
            !/[0-9]/.test(form.password) ||
            !/[^A-Za-z0-9]/.test(form.password)
        ) {
            nextErrors.password =
                "Include an uppercase letter, a number, and a special character.";
        }

        if (!form.confirmPassword) {
            nextErrors.confirmPassword =
                "Please confirm your password.";
        } else if (form.confirmPassword !== form.password) {
            nextErrors.confirmPassword = "Passwords do not match.";
        }

        if (!termsAccepted) {
            nextErrors.terms =
                "Please accept the Terms & Conditions and Privacy Policy.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading || !validate()) return;

        try {
            setLoading(true);
            setServerError("");
            setPendingMessage("");

            const isStakeholder = accountType === "stakeholder";

            const endpoint = isStakeholder
                ? "registerStakeholderUser"
                : "registerUser";

            const registrationData = {
                name: form.name.trim(),
                email: form.email.trim().toLowerCase(),
                password: form.password,
            };

            if (isStakeholder) {
                registrationData.organizationName =
                    form.organizationName.trim();

                registrationData.organizationDescription =
                    form.organizationDescription.trim();

                registrationData.website = form.website.trim();
            } else {
                registrationData.college = form.college.trim();
                registrationData.branch = form.branch.trim();
                registrationData.year = form.year;
            }

            // Student and stakeholder use separate backend endpoints.
            const { registerStakeholderUser } = await import(
                "../../services/authService"
            );

            const response = isStakeholder
                ? await registerStakeholderUser(registrationData)
                : await registerUser(registrationData);

            const data = response?.data ?? response;

            if (!data?.success) {
                throw new Error(
                    data?.message || "Registration failed."
                );
            }

            if (isStakeholder) {
                // Stakeholders must not receive a session before approval.
                setPendingMessage(
                    data.message ||
                    "Your application has been submitted. You can log in after an administrator approves your account."
                );
                setForm((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                }));
                return;
            }

            const user = data?.user;
            const token = data?.token || data?.accessToken;

            if (!user || !token) {
                throw new Error(
                    data?.message ||
                    "The server did not return a valid registration session."
                );
            }

            if (
                user.accountType !== "student" ||
                (user.accountStatus &&
                    user.accountStatus !== "active")
            ) {
                throw new Error(
                    "Unable to establish a student session. Please sign in."
                );
            }

            const saved = loginUser(user, token);

            if (saved === false) {
                throw new Error(
                    "Unable to establish your login session. Please sign in again."
                );
            }

            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error("Registration error:", err);

            setServerError(
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-6">
            <div className="w-full max-w-2xl">
                <div className="mb-5 text-center">
                    <Link
                        to="/landing"
                        className="mb-3 inline-flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E1B4B] text-[#14B8A6]">
                            <Sparkles size={17} />
                        </div>

                        <span className="font-black tracking-[0.15em] text-[#1E1B4B]">
                            CONEXA
                        </span>
                    </Link>

                    <h1 className="text-2xl font-black text-[#1E1B4B] sm:text-3xl">
                        Create Your Account
                    </h1>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Join India's hackathon and collaboration community.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
                    <div className="mb-5 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleAccountTypeChange("student")}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${accountType === "student"
                                ? "border-[#14B8A6] bg-[#14B8A6]/10 ring-1 ring-[#14B8A6]"
                                : "border-slate-200 hover:border-slate-300"
                                }`}
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E1B4B] text-[#14B8A6]">
                                <GraduationCap size={21} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#1E1B4B]">
                                    Student
                                </p>
                                <p className="text-[10px] text-slate-500">
                                    Find teams and hackathons
                                </p>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAccountTypeChange("stakeholder")}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${accountType === "stakeholder"
                                ? "border-[#14B8A6] bg-[#14B8A6]/10 ring-1 ring-[#14B8A6]"
                                : "border-slate-200 hover:border-slate-300"
                                }`}
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E1B4B] text-[#14B8A6]">
                                <Building2 size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#1E1B4B]">
                                    Stakeholder
                                </p>
                                <p className="text-[10px] text-slate-500">
                                    Share real-world problems
                                </p>
                            </div>
                        </button>
                    </div>

                    {accountType === "student" && (
                        <>
                            <SocialLogin />

                            <div className="my-5 flex items-center gap-3">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-[10px] font-semibold text-slate-400">
                                    OR REGISTER WITH EMAIL
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>
                        </>
                    )}

                    {accountType === "stakeholder" && (
                        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <div className="flex items-start gap-3">
                                <ShieldCheck
                                    size={21}
                                    className="mt-0.5 shrink-0 text-amber-700"
                                />
                                <div>
                                    <p className="text-sm font-bold text-amber-900">
                                        Admin Approval Required
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-amber-800">
                                        Your organization will be reviewed by the
                                        CONEXA admin. You can sign in and publish
                                        problems only after approval.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {serverError && (
                        <div
                            role="alert"
                            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                            {serverError}
                        </div>
                    )}

                    {pendingMessage ? (
                        <div
                            role="status"
                            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"
                        >
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <Clock size={28} />
                            </div>

                            <h2 className="text-lg font-black text-[#1E1B4B]">
                                Application Submitted!
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {pendingMessage}
                            </p>

                            <Link
                                to="/login"
                                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 text-sm font-bold text-white transition hover:bg-[#312E81]"
                            >
                                Go to Sign In
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    icon={User}
                                    placeholder="Your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    autoComplete="name"
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    icon={Mail}
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            {accountType === "student" ? (
                                <>
                                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <Input
                                            label="College"
                                            name="college"
                                            icon={GraduationCap}
                                            placeholder="College name"
                                            value={form.college}
                                            onChange={handleChange}
                                            error={errors.college}
                                            required
                                        />

                                        <Input
                                            label="Branch"
                                            name="branch"
                                            icon={BookOpen}
                                            placeholder="Computer Science"
                                            value={form.branch}
                                            onChange={handleChange}
                                            error={errors.branch}
                                            required
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <label
                                            htmlFor="year"
                                            className="mb-1.5 block text-xs font-semibold text-slate-600"
                                        >
                                            Current Year
                                        </label>

                                        <div className="relative">
                                            <GraduationCap
                                                size={17}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#14B8A6]"
                                            />

                                            <select
                                                id="year"
                                                name="year"
                                                value={form.year}
                                                onChange={handleChange}
                                                required
                                                className={`h-11 w-full rounded-xl border bg-white pl-9 pr-3 text-sm outline-none ${errors.year
                                                    ? "border-red-400"
                                                    : "border-slate-200 focus:border-[#14B8A6]"
                                                    }`}
                                            >
                                                <option value="">
                                                    Select Year
                                                </option>
                                                <option value="1st Year">
                                                    1st Year
                                                </option>
                                                <option value="2nd Year">
                                                    2nd Year
                                                </option>
                                                <option value="3rd Year">
                                                    3rd Year
                                                </option>
                                                <option value="4th Year">
                                                    4th Year
                                                </option>
                                            </select>
                                        </div>

                                        {errors.year && (
                                            <p className="mt-1 text-[10px] text-red-500">
                                                {errors.year}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="mt-3 space-y-3">
                                    <Input
                                        label="Organization Name"
                                        name="organizationName"
                                        icon={Building2}
                                        placeholder="Company or organization name"
                                        value={form.organizationName}
                                        onChange={handleChange}
                                        error={errors.organizationName}
                                        required
                                    />

                                    <div>
                                        <label
                                            htmlFor="organizationDescription"
                                            className="mb-1.5 block text-xs font-semibold text-slate-600"
                                        >
                                            Organization Description
                                        </label>

                                        <div className="relative">
                                            <FileText
                                                size={17}
                                                className="absolute left-3 top-3 text-[#14B8A6]"
                                            />

                                            <textarea
                                                id="organizationDescription"
                                                name="organizationDescription"
                                                value={form.organizationDescription}
                                                onChange={handleChange}
                                                maxLength={2000}
                                                rows={3}
                                                placeholder="Tell us about your organization and the problems you want to solve..."
                                                className={`w-full resize-y rounded-xl border py-2.5 pl-9 pr-3 text-sm outline-none ${errors.organizationDescription
                                                    ? "border-red-400"
                                                    : "border-slate-200 focus:border-[#14B8A6]"
                                                    }`}
                                            />
                                        </div>

                                        {errors.organizationDescription && (
                                            <p className="mt-1 text-[10px] text-red-500">
                                                {errors.organizationDescription}
                                            </p>
                                        )}
                                    </div>

                                    <Input
                                        label="Organization Website (Optional)"
                                        name="website"
                                        type="url"
                                        icon={Globe}
                                        placeholder="https://example.com"
                                        value={form.website}
                                        onChange={handleChange}
                                        error={errors.website}
                                    />
                                </div>
                            )}

                            <div className="mt-4">
                                <PasswordInput
                                    label="Password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    show={showPassword}
                                    setShow={setShowPassword}
                                    error={errors.password}
                                    autoComplete="new-password"
                                />
                            </div>

                            {form.password && (
                                <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
                                    <div className="mb-2 flex justify-between">
                                        <span className="text-[10px] font-semibold text-slate-500">
                                            Password Strength
                                        </span>
                                        <span className="text-[10px] font-bold text-[#1E1B4B]">
                                            {strength}
                                        </span>
                                    </div>

                                    <div className="mb-2 grid grid-cols-4 gap-1.5">
                                        {[1, 2, 3, 4].map((bar) => (
                                            <div
                                                key={bar}
                                                className={`h-1.5 rounded-full ${bar <= score
                                                    ? "bg-[#14B8A6]"
                                                    : "bg-slate-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-1 sm:grid-cols-4">
                                        {checks.map((item) => (
                                            <div
                                                key={item.label}
                                                className="flex items-center gap-1"
                                            >
                                                {item.valid ? (
                                                    <Check
                                                        size={11}
                                                        className="text-green-500"
                                                    />
                                                ) : (
                                                    <X
                                                        size={11}
                                                        className="text-slate-300"
                                                    />
                                                )}

                                                <span className="text-[9px] text-slate-500">
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-3">
                                <PasswordInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    show={showConfirm}
                                    setShow={setShowConfirm}
                                    error={errors.confirmPassword}
                                    autoComplete="new-password"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="flex cursor-pointer items-start gap-2">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) =>
                                            setTermsAccepted(e.target.checked)
                                        }
                                        className="mt-0.5 accent-[#14B8A6]"
                                    />

                                    <span className="text-[10px] leading-4 text-slate-500 sm:text-xs">
                                        I agree to the{" "}
                                        <Link
                                            to="/terms"
                                            className="font-bold text-[#1E1B4B] underline"
                                        >
                                            Terms & Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            to="/privacy"
                                            className="font-bold text-[#1E1B4B] underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                        .
                                    </span>
                                </label>

                                {errors.terms && (
                                    <p className="mt-1 text-[10px] text-red-500">
                                        {errors.terms}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] text-sm font-bold text-white shadow-lg transition hover:bg-[#312E81] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Submitting..."
                                    : accountType === "student"
                                        ? "Create Student Account"
                                        : "Submit for Approval"}

                                {!loading && <ArrowRight size={17} />}
                            </button>
                        </form>
                    )}

                    {!pendingMessage && (
                        <p className="mt-4 text-center text-xs text-slate-500 sm:text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-[#14B8A6] hover:underline"
                            >
                                Sign In →
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Input({
    label,
    name,
    type = "text",
    icon: Icon,
    placeholder,
    value,
    onChange,
    error,
    autoComplete,
    required = false,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-1.5 block text-xs font-semibold text-slate-600"
            >
                {label}
            </label>

            <div className="relative">
                <Icon
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#14B8A6]"
                />

                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    maxLength={name === "email" ? 254 : 2000}
                    className={`h-11 w-full rounded-xl border pl-9 pr-3 text-sm outline-none ${error
                        ? "border-red-400"
                        : "border-slate-200 focus:border-[#14B8A6]"
                        }`}
                />
            </div>

            {error && (
                <p className="mt-1 text-[10px] text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

function PasswordInput({
    label,
    name,
    value,
    onChange,
    show,
    setShow,
    error,
    autoComplete,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-1.5 block text-xs font-semibold text-slate-600"
            >
                {label}
            </label>

            <div className="relative">
                <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#14B8A6]"
                />

                <input
                    id={name}
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    minLength={8}
                    maxLength={128}
                    required
                    placeholder={
                        name === "password"
                            ? "Create a strong password"
                            : "Confirm your password"
                    }
                    className={`h-11 w-full rounded-xl border pl-9 pr-10 text-sm outline-none ${error
                        ? "border-red-400"
                        : "border-slate-200 focus:border-[#14B8A6]"
                        }`}
                />

                <button
                    type="button"
                    onClick={() => setShow((previous) => !previous)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#14B8A6]"
                >
                    {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
            </div>

            {error && (
                <p className="mt-1 text-[10px] text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
