import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

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

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const data = await loginUser({
                email: form.email,
                password: form.password,
            });

            localStorage.setItem("token", data.token);

            setUser(data.user);

            navigate("/dashboard");

        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

            <div className="text-center">
                <h2 className="text-3xl font-black text-[#1E1B4B]">
                    Welcome Back
                </h2>

                <p className="mt-2 text-slate-500">
                    Sign in to continue your CONEXA journey.
                </p>
            </div>

            <SocialLogin />

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
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

                <button
                    type="submit"
                    className="w-full h-14 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:bg-[#312E81] transition-all duration-300"
                >
                    Sign In
                </button>

            </form>

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