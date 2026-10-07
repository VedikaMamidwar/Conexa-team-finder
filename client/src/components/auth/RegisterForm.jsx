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
    BriefcaseBusiness,
    Globe,
    FileText,
    Loader2,
} from "lucide-react";

import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",

        // Student
        college: "",
        branch: "",
        year: "",

        // Stakeholder
        organizationName: "",
        organizationType: "",
        organizationDescription: "",
        website: "",
        stakeholderRole: "",

        password: "",
        confirmPassword: "",

        accountType: "student",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

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

        if (errors.submit) {
            setErrors((prev) => ({
                ...prev,
                submit: "",
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
    // PASSWORD CHECKS
    // =====================================================

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
            label: "Special",
            valid: /[^A-Za-z0-9]/.test(form.password),
        },
    ];

    const score = checks.filter(
        (item) => item.valid
    ).length;

    const strength =
        score === 0
            ? "Not Set"
            : score <= 1
                ? "Weak"
                : score === 2
                    ? "Fair"
                    : score === 3
                        ? "Good"
                        : "Strong";

    // =====================================================
    // VALIDATION
    // =====================================================

    const validate = () => {
        const newErrors = {};

        // Common
        if (!form.accountType) {
            newErrors.accountType =
                "Please select account type.";
        }

        if (!form.name.trim()) {
            newErrors.name =
                "Full name is required.";
        }

        if (!form.email.trim()) {
            newErrors.email =
                "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            newErrors.email =
                "Please enter a valid email.";
        }

        // =================================================
        // STUDENT
        // =================================================

        if (form.accountType === "student") {
            if (!form.college.trim()) {
                newErrors.college =
                    "College name is required.";
            }

            if (!form.branch.trim()) {
                newErrors.branch =
                    "Branch is required.";
            }

            if (!form.year) {
                newErrors.year =
                    "Please select your year.";
            }
        }

        // =================================================
        // STAKEHOLDER
        // =================================================

        if (form.accountType === "stakeholder") {
            if (!form.organizationName.trim()) {
                newErrors.organizationName =
                    "Organization name is required.";
            }

            if (!form.organizationType.trim()) {
                newErrors.organizationType =
                    "Organization type is required.";
            }

            if (!form.stakeholderRole.trim()) {
                newErrors.stakeholderRole =
                    "Stakeholder role is required.";
            }

            if (!form.organizationDescription.trim()) {
                newErrors.organizationDescription =
                    "Organization description is required.";
            }
        }

        // =================================================
        // PASSWORD
        // =================================================

        if (!form.password) {
            newErrors.password =
                "Password is required.";
        } else if (form.password.length < 8) {
            newErrors.password =
                "Password must contain at least 8 characters.";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";
        } else if (
            form.confirmPassword !== form.password
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";
        }

        // =================================================
        // TERMS
        // =================================================

        if (!acceptedTerms) {
            newErrors.terms =
                "Please accept the Terms & Conditions.";
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

            const data = await registerUser({
                name: form.name.trim(),
                email: form.email.trim(),

                password: form.password,
                confirmPassword: form.confirmPassword,

                accountType: form.accountType,

                // Student
                college:
                    form.accountType === "student"
                        ? form.college.trim()
                        : "",

                branch:
                    form.accountType === "student"
                        ? form.branch.trim()
                        : "",

                year:
                    form.accountType === "student"
                        ? form.year
                        : "",

                // Stakeholder
                organizationName:
                    form.accountType === "stakeholder"
                        ? form.organizationName.trim()
                        : "",

                organizationType:
                    form.accountType === "stakeholder"
                        ? form.organizationType.trim()
                        : "",

                organizationDescription:
                    form.accountType === "stakeholder"
                        ? form.organizationDescription.trim()
                        : "",

                website:
                    form.accountType === "stakeholder"
                        ? form.website.trim()
                        : "",

                stakeholderRole:
                    form.accountType === "stakeholder"
                        ? form.stakeholderRole.trim()
                        : "",
            });

            if (!data?.token || !data?.user) {
                throw new Error(
                    "Invalid registration response from server."
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
                "Registration Error:",
                err
            );

            setErrors({
                submit:
                    err.response?.data?.message ||
                    err.message ||
                    "Registration failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                min-h-screen
                w-full
                flex
                items-center
                justify-center
                px-4
                py-6
                sm:px-6
                sm:py-8
                bg-[#F8FAFC]
            "
        >
            <div className="w-full max-w-3xl">

                {/* =================================================
                    BRAND + HEADER
                ================================================= */}

                <div className="text-center mb-6">

                    <Link
                        to="/landing"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mb-4
                            group
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-2xl
                                bg-[#1E1B4B]
                                text-[#14B8A6]
                                shadow-md
                                shadow-[#1E1B4B]/15
                                group-hover:scale-105
                                transition-transform
                            "
                        >
                            <Sparkles size={18} />
                        </div>

                        <span
                            className="
                                font-black
                                tracking-[0.16em]
                                text-[#1E1B4B]
                            "
                        >
                            CONEXA
                        </span>
                    </Link>

                    <h1
                        className="
                            text-2xl
                            sm:text-3xl
                            font-black
                            tracking-tight
                            text-[#1E1B4B]
                        "
                    >
                        Create Account
                    </h1>

                    <p
                        className="
                            mt-2
                            text-xs
                            sm:text-sm
                            text-slate-500
                        "
                    >
                        Join India's smartest hackathon community.
                    </p>
                </div>

                {/* =================================================
                    MAIN CARD
                ================================================= */}

                <div
                    className="
                        w-full
                        bg-white
                        border
                        border-slate-200
                        rounded-[28px]
                        shadow-[0_20px_60px_rgba(30,27,75,0.08)]
                        p-5
                        sm:p-7
                        md:p-8
                    "
                >

                    {/* SOCIAL LOGIN */}

                    <SocialLogin />

                    {/* DIVIDER */}

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200" />

                        <span
                            className="
                                text-[10px]
                                sm:text-xs
                                font-semibold
                                text-slate-400
                                whitespace-nowrap
                            "
                        >
                            OR CONTINUE WITH EMAIL
                        </span>

                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* =================================================
                        ACCOUNT TYPE
                    ================================================= */}

                    <div className="mb-6">

                        <label
                            className="
                                block
                                text-sm
                                font-semibold
                                text-[#1E1B4B]
                                mb-3
                            "
                        >
                            Choose Account Type
                        </label>

                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-3
                            "
                        >

                            {/* STUDENT */}

                            <AccountTypeCard
                                selected={
                                    form.accountType ===
                                    "student"
                                }
                                onClick={() =>
                                    selectAccountType(
                                        "student"
                                    )
                                }
                                icon={GraduationCap}
                                title="Student"
                                description="Find teams & projects"
                            />

                            {/* STAKEHOLDER */}

                            <AccountTypeCard
                                selected={
                                    form.accountType ===
                                    "stakeholder"
                                }
                                onClick={() =>
                                    selectAccountType(
                                        "stakeholder"
                                    )
                                }
                                icon={Building2}
                                title="Stakeholder"
                                description="Post real-world problems"
                            />

                        </div>

                        {errors.accountType && (
                            <p className="mt-2 text-xs font-medium text-red-500">
                                {errors.accountType}
                            </p>
                        )}
                    </div>

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >

                        {/* COMMON */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-4
                            "
                        >
                            <Input
                                label="Full Name"
                                name="name"
                                icon={User}
                                placeholder="Your full name"
                                value={form.name}
                                onChange={handleChange}
                                error={errors.name}
                                disabled={loading}
                                required
                            />

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                error={errors.email}
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* =================================================
                            STUDENT
                        ================================================= */}

                        {form.accountType === "student" && (
                            <div className="mt-4 space-y-4">

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-4
                                    "
                                >
                                    <Input
                                        label="College"
                                        name="college"
                                        icon={GraduationCap}
                                        placeholder="College name"
                                        value={form.college}
                                        onChange={handleChange}
                                        error={errors.college}
                                        disabled={loading}
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
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-4
                                    "
                                >
                                    <SelectInput
                                        label="Current Year"
                                        name="year"
                                        icon={GraduationCap}
                                        value={form.year}
                                        onChange={handleChange}
                                        error={errors.year}
                                        disabled={loading}
                                    />

                                    <PasswordInput
                                        label="Password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        show={showPassword}
                                        setShow={setShowPassword}
                                        error={errors.password}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        )}

                        {/* =================================================
                            STAKEHOLDER
                        ================================================= */}

                        {form.accountType === "stakeholder" && (
                            <div className="mt-4 space-y-4">

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-4
                                    "
                                >
                                    <Input
                                        label="Organization Name"
                                        name="organizationName"
                                        icon={Building2}
                                        placeholder="Company / NGO / Startup"
                                        value={
                                            form.organizationName
                                        }
                                        onChange={handleChange}
                                        error={
                                            errors.organizationName
                                        }
                                        disabled={loading}
                                        required
                                    />

                                    <Input
                                        label="Organization Type"
                                        name="organizationType"
                                        icon={BriefcaseBusiness}
                                        placeholder="Company / NGO / College"
                                        value={
                                            form.organizationType
                                        }
                                        onChange={handleChange}
                                        error={
                                            errors.organizationType
                                        }
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-4
                                    "
                                >
                                    <Input
                                        label="Stakeholder Role"
                                        name="stakeholderRole"
                                        icon={User}
                                        placeholder="Founder / HR / Manager"
                                        value={
                                            form.stakeholderRole
                                        }
                                        onChange={handleChange}
                                        error={
                                            errors.stakeholderRole
                                        }
                                        disabled={loading}
                                        required
                                    />

                                    <Input
                                        label="Website"
                                        name="website"
                                        icon={Globe}
                                        placeholder="https://example.com"
                                        value={form.website}
                                        onChange={handleChange}
                                        error={errors.website}
                                        disabled={loading}
                                    />
                                </div>

                                {/* Description */}

                                <div>
                                    <label
                                        className="
                                            block
                                            text-sm
                                            font-semibold
                                            text-[#1E1B4B]
                                            mb-2
                                        "
                                    >
                                        Organization Description
                                    </label>

                                    <div className="relative">
                                        <FileText
                                            size={18}
                                            className="
                                                absolute
                                                left-3
                                                top-3.5
                                                text-[#14B8A6]
                                            "
                                        />

                                        <textarea
                                            name="organizationDescription"
                                            value={
                                                form.organizationDescription
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Tell students about your organization and the problems you want to solve..."
                                            rows={4}
                                            disabled={loading}
                                            className={`
                                                w-full
                                                pl-10
                                                pr-4
                                                py-3
                                                rounded-2xl
                                                border
                                                bg-white
                                                text-sm
                                                text-slate-700
                                                placeholder:text-slate-400
                                                outline-none
                                                resize-none
                                                transition-all
                                                ${errors.organizationDescription
                                                    ? "border-red-400 focus:ring-4 focus:ring-red-100"
                                                    : "border-slate-200 focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/10"
                                                }
                                                disabled:bg-slate-50
                                                disabled:cursor-not-allowed
                                            `}
                                        />
                                    </div>

                                    {errors.organizationDescription && (
                                        <p className="mt-1.5 text-xs font-medium text-red-500">
                                            {
                                                errors.organizationDescription
                                            }
                                        </p>
                                    )}
                                </div>

                                <PasswordInput
                                    label="Password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    show={showPassword}
                                    setShow={setShowPassword}
                                    error={errors.password}
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {/* =================================================
                            PASSWORD STRENGTH
                        ================================================= */}

                        {form.password && (
                            <div
                                className="
                                    mt-4
                                    p-4
                                    rounded-2xl
                                    bg-slate-50
                                    border
                                    border-slate-200
                                "
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span
                                        className="
                                            text-xs
                                            sm:text-sm
                                            font-semibold
                                            text-[#1E1B4B]
                                        "
                                    >
                                        Password Strength
                                    </span>

                                    <span
                                        className={`
                                            text-xs
                                            sm:text-sm
                                            font-bold
                                            ${score <= 1
                                                ? "text-red-500"
                                                : score === 2
                                                    ? "text-amber-500"
                                                    : score === 3
                                                        ? "text-blue-500"
                                                        : "text-[#14B8A6]"
                                            }
                                        `}
                                    >
                                        {strength}
                                    </span>
                                </div>

                                {/* Strength Bars */}

                                <div className="grid grid-cols-4 gap-1.5 mb-3">
                                    {[1, 2, 3, 4].map(
                                        (bar) => (
                                            <div
                                                key={bar}
                                                className={`
                                                    h-1.5
                                                    rounded-full
                                                    transition-all
                                                    duration-300
                                                    ${bar <= score
                                                        ? score <= 1
                                                            ? "bg-red-400"
                                                            : score === 2
                                                                ? "bg-amber-400"
                                                                : score === 3
                                                                    ? "bg-blue-400"
                                                                    : "bg-[#14B8A6]"
                                                        : "bg-slate-200"
                                                    }
                                                `}
                                            />
                                        )
                                    )}
                                </div>

                                {/* Rules */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-2
                                    "
                                >
                                    {checks.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center gap-2"
                                        >
                                            {item.valid ? (
                                                <Check
                                                    size={14}
                                                    className="shrink-0 text-[#14B8A6]"
                                                    strokeWidth={3}
                                                />
                                            ) : (
                                                <X
                                                    size={14}
                                                    className="shrink-0 text-slate-300"
                                                />
                                            )}

                                            <span
                                                className={`
                                                    text-xs
                                                    ${item.valid
                                                        ? "text-[#0F9488] font-medium"
                                                        : "text-slate-400"
                                                    }
                                                `}
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* =================================================
                            CONFIRM PASSWORD
                        ================================================= */}

                        <div className="mt-4">
                            <PasswordInput
                                label="Confirm Password"
                                name="confirmPassword"
                                value={
                                    form.confirmPassword
                                }
                                onChange={handleChange}
                                show={showConfirm}
                                setShow={setShowConfirm}
                                error={
                                    errors.confirmPassword
                                }
                                disabled={loading}
                            />
                        </div>

                        {/* =================================================
                            TERMS
                        ================================================= */}

                        <div className="mt-5">

                            <label
                                className="
                                    flex
                                    items-start
                                    gap-3
                                    cursor-pointer
                                "
                            >
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => {
                                        setAcceptedTerms(
                                            e.target.checked
                                        );

                                        if (
                                            errors.terms
                                        ) {
                                            setErrors(
                                                (prev) => ({
                                                    ...prev,
                                                    terms: "",
                                                })
                                            );
                                        }
                                    }}
                                    disabled={loading}
                                    className="
                                        mt-0.5
                                        w-4
                                        h-4
                                        shrink-0
                                        rounded
                                        border-slate-300
                                        accent-[#14B8A6]
                                        cursor-pointer
                                    "
                                />

                                <span
                                    className="
                                        text-xs
                                        sm:text-sm
                                        leading-5
                                        text-slate-500
                                    "
                                >
                                    I agree to the{" "}
                                    <button
                                        type="button"
                                        className="
                                            font-semibold
                                            text-[#1E1B4B]
                                            hover:text-[#14B8A6]
                                        "
                                    >
                                        Terms & Conditions
                                    </button>{" "}
                                    and{" "}
                                    <button
                                        type="button"
                                        className="
                                            font-semibold
                                            text-[#1E1B4B]
                                            hover:text-[#14B8A6]
                                        "
                                    >
                                        Privacy Policy
                                    </button>
                                </span>
                            </label>

                            {errors.terms && (
                                <p className="mt-2 text-xs font-medium text-red-500">
                                    {errors.terms}
                                </p>
                            )}
                        </div>

                        {/* =================================================
                            SUBMIT ERROR
                        ================================================= */}

                        {errors.submit && (
                            <div
                                className="
                                    mt-5
                                    px-4
                                    py-3
                                    rounded-2xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    text-sm
                                    font-medium
                                    text-red-600
                                "
                            >
                                {errors.submit}
                            </div>
                        )}

                        {/* =================================================
                            CREATE ACCOUNT BUTTON
                        ================================================= */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                group
                                w-full
                                min-h-[56px]
                                mt-5
                                rounded-2xl
                                bg-[#1E1B4B]
                                hover:bg-[#312E81]
                                text-white
                                text-sm
                                sm:text-base
                                font-bold
                                flex
                                items-center
                                justify-center
                                gap-2
                                transition-all
                                duration-300
                                shadow-lg
                                shadow-[#1E1B4B]/15
                                hover:-translate-y-0.5
                                active:translate-y-0
                                active:scale-[0.99]
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
                                        Creating Account...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span>
                                        {form.accountType ===
                                            "stakeholder"
                                            ? "Create Stakeholder Account"
                                            : "Create Student Account"}
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
                        LOGIN
                    ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            flex-wrap
                            gap-1.5
                            mt-7
                            text-sm
                            text-slate-500
                            text-center
                        "
                    >
                        <span>
                            Already have an account?
                        </span>

                        <Link
                            to="/login"
                            className="
                                font-bold
                                text-[#14B8A6]
                                hover:text-[#0F9488]
                                transition-colors
                            "
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Security */}

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            mt-5
                            text-[11px]
                            text-slate-400
                            text-center
                        "
                    >
                        <Lock size={12} />

                        <span>
                            Your account information is securely protected.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =====================================================
   ACCOUNT TYPE CARD
===================================================== */

function AccountTypeCard({
    selected,
    onClick,
    icon: Icon,
    title,
    description,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`
                group
                relative
                w-full
                text-left
                p-4
                rounded-2xl
                border-2
                transition-all
                duration-300
                active:scale-[0.98]
                ${selected
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
                        w-11
                        h-11
                        rounded-xl
                        transition-all
                        duration-300
                        ${selected
                            ? "bg-[#1E1B4B] text-[#14B8A6]"
                            : "bg-slate-100 text-slate-500 group-hover:bg-[#14B8A6]/10 group-hover:text-[#14B8A6]"
                        }
                    `}
                >
                    <Icon
                        size={21}
                        strokeWidth={2}
                    />

                    {selected && (
                        <span
                            className="
                                absolute
                                -top-1.5
                                -right-1.5
                                flex
                                items-center
                                justify-center
                                w-5
                                h-5
                                rounded-full
                                bg-[#14B8A6]
                                text-white
                                border-2
                                border-white
                            "
                        >
                            <Check
                                size={11}
                                strokeWidth={3}
                            />
                        </span>
                    )}
                </div>

                <div className="min-w-0">
                    <p
                        className="
                            text-sm
                            sm:text-base
                            font-bold
                            text-[#1E1B4B]
                        "
                    >
                        {title}
                    </p>

                    <p
                        className="
                            mt-0.5
                            text-xs
                            text-slate-500
                        "
                    >
                        {description}
                    </p>
                </div>
            </div>
        </button>
    );
}

/* =====================================================
   TEXT INPUT
===================================================== */

function Input({
    label,
    name,
    type = "text",
    icon: Icon,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    required = false,
}) {
    return (
        <div className="w-full">

            <label
                htmlFor={name}
                className="
                    block
                    text-sm
                    font-semibold
                    text-[#1E1B4B]
                    mb-2
                "
            >
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <div
                className={`
                    relative
                    flex
                    items-center
                    w-full
                    min-h-[52px]
                    rounded-2xl
                    border
                    bg-white
                    transition-all
                    duration-300
                    ${error
                        ? "border-red-400 focus-within:ring-4 focus-within:ring-red-100"
                        : "border-slate-200 focus-within:border-[#14B8A6] focus-within:ring-4 focus-within:ring-[#14B8A6]/10"
                    }
                    ${disabled
                        ? "bg-slate-50 opacity-60"
                        : ""
                    }
                `}
            >
                <Icon
                    size={18}
                    className="
                        absolute
                        left-4
                        text-[#14B8A6]
                    "
                />

                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value ?? ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    autoComplete="off"
                    className="
                        w-full
                        h-[50px]
                        pl-11
                        pr-4
                        rounded-2xl
                        bg-transparent
                        text-sm
                        text-slate-700
                        placeholder:text-slate-400
                        outline-none
                        disabled:cursor-not-allowed
                    "
                />
            </div>

            {error && (
                <p className="mt-1.5 px-1 text-xs font-medium text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

/* =====================================================
   SELECT INPUT
===================================================== */

function SelectInput({
    label,
    name,
    icon: Icon,
    value,
    onChange,
    error,
    disabled = false,
}) {
    return (
        <div className="w-full">

            <label
                htmlFor={name}
                className="
                    block
                    text-sm
                    font-semibold
                    text-[#1E1B4B]
                    mb-2
                "
            >
                {label}
                <span className="ml-1 text-red-500">
                    *
                </span>
            </label>

            <div
                className={`
                    relative
                    flex
                    items-center
                    min-h-[52px]
                    rounded-2xl
                    border
                    bg-white
                    transition-all
                    ${error
                        ? "border-red-400"
                        : "border-slate-200 focus-within:border-[#14B8A6] focus-within:ring-4 focus-within:ring-[#14B8A6]/10"
                    }
                `}
            >
                <Icon
                    size={18}
                    className="
                        absolute
                        left-4
                        text-[#14B8A6]
                        pointer-events-none
                    "
                />

                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="
                        w-full
                        h-[50px]
                        pl-11
                        pr-4
                        rounded-2xl
                        bg-transparent
                        text-sm
                        text-slate-700
                        outline-none
                        appearance-none
                        cursor-pointer
                        disabled:cursor-not-allowed
                    "
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

            {error && (
                <p className="mt-1.5 px-1 text-xs font-medium text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

/* =====================================================
   PASSWORD INPUT
===================================================== */

function PasswordInput({
    label,
    name,
    value,
    onChange,
    show,
    setShow,
    error,
    disabled = false,
}) {
    return (
        <div className="w-full">

            <label
                htmlFor={name}
                className="
                    block
                    text-sm
                    font-semibold
                    text-[#1E1B4B]
                    mb-2
                "
            >
                {label}
                <span className="ml-1 text-red-500">
                    *
                </span>
            </label>

            <div
                className={`
                    relative
                    flex
                    items-center
                    min-h-[52px]
                    rounded-2xl
                    border
                    bg-white
                    transition-all
                    duration-300
                    ${error
                        ? "border-red-400 focus-within:ring-4 focus-within:ring-red-100"
                        : "border-slate-200 focus-within:border-[#14B8A6] focus-within:ring-4 focus-within:ring-[#14B8A6]/10"
                    }
                `}
            >
                <Lock
                    size={18}
                    className="
                        absolute
                        left-4
                        text-[#14B8A6]
                    "
                />

                <input
                    id={name}
                    type={
                        show
                            ? "text"
                            : "password"
                    }
                    name={name}
                    value={value ?? ""}
                    onChange={onChange}
                    placeholder={
                        label === "Password"
                            ? "Create password"
                            : "Confirm password"
                    }
                    disabled={disabled}
                    autoComplete={
                        label === "Password"
                            ? "new-password"
                            : "new-password"
                    }
                    className="
                        w-full
                        h-[50px]
                        pl-11
                        pr-12
                        rounded-2xl
                        bg-transparent
                        text-sm
                        text-slate-700
                        placeholder:text-slate-400
                        outline-none
                        disabled:cursor-not-allowed
                    "
                />

                <button
                    type="button"
                    onClick={() =>
                        setShow((prev) => !prev)
                    }
                    disabled={disabled}
                    aria-label={
                        show
                            ? "Hide password"
                            : "Show password"
                    }
                    className="
                        absolute
                        right-3
                        flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-xl
                        text-slate-400
                        hover:text-[#14B8A6]
                        hover:bg-[#14B8A6]/5
                        active:scale-95
                        transition-all
                        disabled:pointer-events-none
                    "
                >
                    {show ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            </div>

            {error && (
                <p className="mt-1.5 px-1 text-xs font-medium text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}