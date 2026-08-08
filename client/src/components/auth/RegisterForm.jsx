import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import {
    User,
    Mail,
    Lock,
    GraduationCap,
    BookOpen,
} from "lucide-react";

import AuthInput from "./AuthInput";
import PasswordStrength from "./PasswordStrength";
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: "",
            });
        }
    };

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

        if (form.confirmPassword !== form.password)
            newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const data = await registerUser({
                name: form.name,
                email: form.email,
                password: form.password,
                college: form.college,
                branch: form.branch,
                year: form.year,
            });

            // Save JWT Token
            localStorage.setItem("token", data.token);

            alert("Registration Successful");

            // Redirect directly to Dashboard
            navigate("/dashboard");

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );
        }
    };


    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

            <div className="text-center">
                <h2 className="text-3xl font-black text-[#1E1B4B]">
                    Create Account
                </h2>

                <p className="mt-2 text-slate-500">
                    Join India's smartest hackathon community.
                </p>
            </div>

            <SocialLogin />

            <form onSubmit={handleSubmit} className="space-y-5">

                <AuthInput
                    label="Full Name"
                    name="name"
                    icon={User}
                    placeholder="Vedika Mamidwar"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <AuthInput
                    label="Email"
                    name="email"
                    type="email"
                    icon={Mail}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <AuthInput
                    label="College"
                    name="college"
                    icon={GraduationCap}
                    placeholder="College Name"
                    value={form.college}
                    onChange={handleChange}
                    error={errors.college}
                />

                <AuthInput
                    label="Branch"
                    name="branch"
                    icon={BookOpen}
                    placeholder="Computer Science"
                    value={form.branch}
                    onChange={handleChange}
                    error={errors.branch}
                />

                <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                        Year
                    </label>

                    <select
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        className="w-full h-14 rounded-xl border border-slate-300 px-4 outline-none focus:border-[#14B8A6]"
                    >
                        <option value="">Select Year</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                    </select>

                    {errors.year && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.year}
                        </p>
                    )}
                </div>

                <AuthInput
                    label="Password"
                    name="password"
                    type="password"
                    icon={Lock}
                    placeholder="Create password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <PasswordStrength password={form.password} />

                <AuthInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    icon={Lock}
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />

                <div className="flex items-start gap-3">
                    <input type="checkbox" required className="mt-1 accent-[#14B8A6]" />

                    <p className="text-sm text-slate-600">
                        I agree to the <span className="font-semibold">Terms & Conditions</span> and <span className="font-semibold">Privacy Policy</span>
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full h-14 rounded-xl bg-[#1E1B4B] text-white font-semibold"
                >
                    Create Account
                </button>

            </form>

            <p className="text-center mt-8">
                Already have an account?
                <Link to="/login" className="ml-2 text-[#14B8A6] font-semibold">
                    Sign In
                </Link>
            </p>

        </div>
    );
}