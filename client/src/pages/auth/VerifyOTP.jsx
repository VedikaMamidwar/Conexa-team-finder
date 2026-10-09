import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";

import {
    verifyOTP,
    resendOTP,
} from "../../services/authService";

export default function VerifyOTP() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [timer, setTimer] =
        useState(60);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const inputs =
        useRef([]);

    const email =
        sessionStorage.getItem(
            "resetEmail"
        );

    useEffect(() => {
        if (!email) {
            navigate(
                "/forgot-password",
                {
                    replace: true,
                }
            );
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timer > 0) {
            const interval =
                setInterval(() => {
                    setTimer(
                        (prev) =>
                            prev - 1
                    );
                }, 1000);

            return () =>
                clearInterval(
                    interval
                );
        }
    }, [timer]);

    const handleChange = (
        value,
        index
    ) => {
        if (!/^\d?$/.test(value))
            return;

        const newOtp = [
            ...otp,
        ];

        newOtp[index] = value;

        setOtp(newOtp);

        setError("");

        if (
            value &&
            index < 5
        ) {
            inputs.current[
                index + 1
            ]?.focus();
        }
    };

    const handleKeyDown = (
        e,
        index
    ) => {
        if (
            e.key ===
                "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputs.current[
                index - 1
            ]?.focus();
        }
    };

    const handleVerify = async (
        e
    ) => {
        e.preventDefault();

        const code =
            otp.join("");

        if (
            code.length !== 6
        ) {
            setError(
                "Please enter the complete OTP."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data =
                await verifyOTP(
                    email,
                    code
                );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Invalid OTP."
                );
            }

            // Save temporary reset token
            sessionStorage.setItem(
                "resetToken",
                data.resetToken
            );

            navigate(
                "/reset-password"
            );
        } catch (err) {
            console.error(
                "OTP verification error:",
                err
            );

            setError(
                err.response?.data
                    ?.message ||
                err.message ||
                "Invalid OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await resendOTP(
                    email
                );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Unable to resend OTP."
                );
            }

            setTimer(60);

            setOtp([
                "",
                "",
                "",
                "",
                "",
                "",
            ]);

            inputs.current[0]?.focus();
        } catch (err) {
            console.error(
                "Resend OTP error:",
                err
            );

            setError(
                err.response?.data
                    ?.message ||
                err.message ||
                "Unable to resend OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            left={<LeftBanner />}
        >

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

                <div className="text-center">

                    <div className="w-20 h-20 mx-auto rounded-full bg-cyan-100 flex items-center justify-center">

                        <ShieldCheck
                            className="text-[#14B8A6]"
                            size={42}
                        />

                    </div>

                    <h2 className="mt-6 text-3xl font-black text-[#1E1B4B]">
                        Verify OTP
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Enter the 6-digit verification code sent to your email.
                    </p>

                    {email && (
                        <p className="mt-2 text-sm font-semibold text-[#1E1B4B]">
                            {email}
                        </p>
                    )}

                </div>

                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 text-center">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleVerify}
                    className="mt-10"
                >

                    <div className="flex justify-between gap-3">

                        {otp.map(
                            (
                                digit,
                                index
                            ) => (
                                <input
                                    key={
                                        index
                                    }
                                    ref={(
                                        el
                                    ) =>
                                        (inputs.current[
                                            index
                                        ] =
                                            el)
                                    }
                                    value={
                                        digit
                                    }
                                    maxLength={
                                        1
                                    }
                                    inputMode="numeric"
                                    onChange={(
                                        e
                                    ) =>
                                        handleChange(
                                            e
                                                .target
                                                .value,
                                            index
                                        )
                                    }
                                    onKeyDown={(
                                        e
                                    ) =>
                                        handleKeyDown(
                                            e,
                                            index
                                        )
                                    }
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl border border-slate-300 text-center text-2xl font-bold outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-cyan-100 transition"
                                />
                            )
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                        className="mt-8 w-full h-14 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:bg-[#312E81] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}
                    </button>

                </form>

                <div className="mt-8 text-center">

                    {timer > 0 ? (
                        <p className="text-slate-500">

                            Resend OTP in

                            <span className="font-bold text-[#14B8A6]">
                                {" "}
                                {timer}s
                            </span>

                        </p>
                    ) : (
                        <button
                            onClick={
                                handleResend
                            }
                            disabled={
                                loading
                            }
                            className="font-semibold text-[#14B8A6] hover:underline disabled:opacity-50"
                        >
                            Resend OTP
                        </button>
                    )}

                </div>

                <Link
                    to="/login"
                    className="mt-8 flex justify-center items-center gap-2 text-slate-600 hover:text-[#1E1B4B]"
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back to Login

                </Link>

            </div>

        </AuthLayout>
    );
}