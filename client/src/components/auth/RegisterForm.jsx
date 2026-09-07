import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
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
} from "lucide-react";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        college: "",
        branch: "",
        year: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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

    const score = checks.filter((x) => x.valid).length;

    const strength =
        score <= 1
            ? "Weak"
            : score === 2
                ? "Fair"
                : score === 3
                    ? "Good"
                    : "Strong";

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim())
            newErrors.name = "Full name is required.";

        if (!form.email.trim())
            newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = "Invalid email.";

        if (!form.college.trim())
            newErrors.college = "College name is required.";

        if (!form.branch.trim())
            newErrors.branch = "Branch is required.";

        if (!form.year)
            newErrors.year = "Select your year.";

        if (!form.password)
            newErrors.password = "Password is required.";
        else if (form.password.length < 8)
            newErrors.password = "Minimum 8 characters.";

        if (!form.confirmPassword)
            newErrors.confirmPassword = "Confirm your password.";
        else if (form.confirmPassword !== form.password)
            newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const data = await registerUser({
                name: form.name,
                email: form.email,
                password: form.password,
                college: form.college,
                branch: form.branch,
                year: form.year,
            });

            localStorage.setItem("token", data.token);

            alert("Registration Successful");

            navigate("/dashboard");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-[#F8FAFC]">

            <div className="w-full max-w-2xl">

                {/* TOP */}

                <div className="text-center mb-5">

                    <Link
                        to="/landing"
                        className="inline-flex items-center gap-2 mb-3"
                    >
                        <div className="w-9 h-9 rounded-lg bg-[#1E1B4B] text-[#14B8A6] flex items-center justify-center">
                            <Sparkles size={17} />
                        </div>

                        <span className="font-black tracking-[0.15em] text-[#1E1B4B]">
                            CONEXA
                        </span>
                    </Link>

                    <h1 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
                        Create Account
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Join India's smartest hackathon community.
                    </p>

                </div>

                {/* CARD */}

                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-5 sm:p-7">

                    {/* SOCIAL LOGIN */}

                    <SocialLogin />

                    {/* DIVIDER */}

                    <div className="flex items-center gap-3 my-4">

                        <div className="flex-1 h-px bg-slate-200" />

                        <span className="text-[10px] font-semibold text-slate-400">
                            OR EMAIL
                        </span>

                        <div className="flex-1 h-px bg-slate-200" />

                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* ROW 1 */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <Input
                                label="Full Name"
                                name="name"
                                icon={User}
                                placeholder="Your full name"
                                value={form.name}
                                onChange={handleChange}
                                error={errors.name}
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
                            />

                        </div>

                        {/* ROW 2 */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

                            <Input
                                label="College"
                                name="college"
                                icon={GraduationCap}
                                placeholder="College Name"
                                value={form.college}
                                onChange={handleChange}
                                error={errors.college}
                            />

                            <Input
                                label="Branch"
                                name="branch"
                                icon={BookOpen}
                                placeholder="Computer Science"
                                value={form.branch}
                                onChange={handleChange}
                                error={errors.branch}
                            />

                        </div>

                        {/* ROW 3 */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

                            <div>

                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                    Current Year
                                </label>

                                <div className="relative">

                                    <GraduationCap
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#14B8A6]"
                                    />

                                    <select
                                        name="year"
                                        value={form.year}
                                        onChange={handleChange}
                                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                                    >
                                        <option value="">
                                            Select Year
                                        </option>
                                        <option>1st Year</option>
                                        <option>2nd Year</option>
                                        <option>3rd Year</option>
                                        <option>4th Year</option>
                                    </select>

                                </div>

                                {errors.year && (
                                    <p className="text-[10px] text-red-500 mt-1">
                                        {errors.year}
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
                            />

                        </div>

                        {/* PASSWORD STRENGTH */}

                        {form.password && (
                            <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100">

                                <div className="flex justify-between mb-2">

                                    <span className="text-[10px] font-semibold text-slate-500">
                                        Password Strength
                                    </span>

                                    <span
                                        className={`text-[10px] font-bold ${score <= 1
                                            ? "text-red-500"
                                            : score === 2
                                                ? "text-orange-500"
                                                : score === 3
                                                    ? "text-blue-500"
                                                    : "text-green-500"
                                            }`}
                                    >
                                        {strength}
                                    </span>

                                </div>

                                <div className="grid grid-cols-4 gap-1.5 mb-2">

                                    {[1, 2, 3, 4].map((bar) => (
                                        <div
                                            key={bar}
                                            className={`h-1.5 rounded-full ${bar <= score
                                                ? score <= 1
                                                    ? "bg-red-400"
                                                    : score === 2
                                                        ? "bg-orange-400"
                                                        : score === 3
                                                            ? "bg-blue-400"
                                                            : "bg-green-500"
                                                : "bg-slate-200"
                                                }`}
                                        />
                                    ))}

                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-1">

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

                                            <span
                                                className={`text-[9px] ${item.valid
                                                    ? "text-green-600"
                                                    : "text-slate-400"
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        )}

                        {/* CONFIRM */}

                        <div className="mt-3">

                            <PasswordInput
                                label="Confirm Password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                show={showConfirm}
                                setShow={setShowConfirm}
                                error={errors.confirmPassword}
                            />

                        </div>

                        {/* TERMS */}

                        <label className="flex items-start gap-2 mt-3 cursor-pointer">

                            <input
                                type="checkbox"
                                required
                                className="mt-0.5 accent-[#14B8A6]"
                            />

                            <span className="text-[10px] sm:text-xs text-slate-500 leading-4">
                                I agree to the{" "}
                                <b className="text-[#1E1B4B]">
                                    Terms & Conditions
                                </b>{" "}
                                and{" "}
                                <b className="text-[#1E1B4B]">
                                    Privacy Policy
                                </b>
                            </span>

                        </label>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                h-11
                                mt-4
                                rounded-xl
                                bg-[#1E1B4B]
                                hover:bg-[#312E81]
                                text-white
                                text-sm
                                font-bold
                                flex
                                items-center
                                justify-center
                                gap-2
                                transition
                                shadow-lg
                                shadow-[#1E1B4B]/20
                                disabled:opacity-60
                            "
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}

                            {!loading && (
                                <ArrowRight size={17} />
                            )}
                        </button>

                    </form>

                    {/* LOGIN */}

                    <p className="text-center text-xs sm:text-sm text-slate-500 mt-4">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-bold text-[#14B8A6] hover:text-[#0F9F91]"
                        >
                            Sign In →
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}


/* ================= INPUT ================= */

function Input({
    label,
    name,
    type = "text",
    icon: Icon,
    placeholder,
    value,
    onChange,
    error,
}) {
    return (
        <div>

            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {label}
            </label>

            <div className="relative">

                <Icon
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#14B8A6]"
                />

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full h-11 pl-9 pr-3 rounded-xl border text-sm outline-none ${error
                        ? "border-red-400"
                        : "border-slate-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                        }`}
                />

            </div>

            {error && (
                <p className="text-[10px] text-red-500 mt-1">
                    {error}
                </p>
            )}

        </div>
    );
}


/* ================= PASSWORD ================= */

function PasswordInput({
    label,
    name,
    value,
    onChange,
    show,
    setShow,
    error,
}) {
    return (
        <div>

            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {label}
            </label>

            <div className="relative">

                <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#14B8A6]"
                />

                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={
                        label === "Password"
                            ? "Create password"
                            : "Confirm password"
                    }
                    className={`w-full h-11 pl-9 pr-10 rounded-xl border text-sm outline-none ${error
                        ? "border-red-400"
                        : "border-slate-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                        }`}
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#14B8A6]"
                >
                    {show ? (
                        <EyeOff size={17} />
                    ) : (
                        <Eye size={17} />
                    )}
                </button>

            </div>

            {error && (
                <p className="text-[10px] text-red-500 mt-1">
                    {error}
                </p>
            )}

        </div>
    );
}