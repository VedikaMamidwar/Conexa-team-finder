import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";
import AuthInput from "../../components/auth/AuthInput";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Enter a valid email.");
            return;
        }

        setError("");

        // Backend API Later
        console.log(email);

        setSent(true);
    };

    return (
        <AuthLayout left={<LeftBanner />}>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

                {!sent ? (
                    <>
                        <div className="text-center">

                            <h2 className="text-3xl font-black text-[#1E1B4B]">
                                Forgot Password
                            </h2>

                            <p className="mt-3 text-slate-500">
                                Enter your registered email address and we'll
                                send you an OTP to reset your password.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >

                            <AuthInput
                                label="Email Address"
                                type="email"
                                icon={Mail}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error}
                                required
                            />

                            <button
                                type="submit"
                                className="w-full h-14 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:bg-[#312E81] transition"
                            >
                                Send OTP
                            </button>

                        </form>
                    </>
                ) : (
                    <div className="text-center">

                        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                            <Mail
                                size={40}
                                className="text-green-600"
                            />

                        </div>

                        <h2 className="mt-6 text-3xl font-black text-[#1E1B4B]">
                            Check Your Email
                        </h2>

                        <p className="mt-4 text-slate-600 leading-7">

                            We've sent a verification OTP to

                            <br />

                            <span className="font-semibold text-[#1E1B4B]">
                                {email}
                            </span>

                        </p>

                        <Link
                            to="/verify-otp"
                            className="mt-8 inline-flex justify-center items-center w-full h-14 rounded-xl bg-[#14B8A6] text-white font-semibold hover:bg-[#0F9E8F] transition"
                        >
                            Verify OTP
                        </Link>

                    </div>
                )}

                <Link
                    to="/login"
                    className="mt-8 flex items-center justify-center gap-2 text-slate-600 hover:text-[#1E1B4B]"
                >

                    <ArrowLeft size={18} />

                    Back to Login

                </Link>

            </div>

        </AuthLayout>
    );
}