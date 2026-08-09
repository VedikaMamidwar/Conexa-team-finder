import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";

export default function VerifyOTP() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);

    const inputs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();

        const code = otp.join("");

        if (code.length !== 6) {
            alert("Please enter the complete OTP.");
            return;
        }

        console.log(code);

        // Backend verification later

        navigate("/reset-password");
    };

    const resendOTP = () => {
        setTimer(60);
        setOtp(["", "", "", "", "", ""]);

        console.log("OTP Resent");
    };

    return (
        <AuthLayout left={<LeftBanner />}>

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

                </div>

                <form
                    onSubmit={handleVerify}
                    className="mt-10"
                >

                    <div className="flex justify-between gap-3">

                        {otp.map((digit, index) => (

                            <input
                                key={index}
                                ref={(el) => (inputs.current[index] = el)}
                                value={digit}
                                maxLength={1}
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        index
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                className="w-14 h-14 md:w-16 md:h-16 rounded-xl border border-slate-300 text-center text-2xl font-bold outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-cyan-100 transition"
                            />

                        ))}

                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full h-14 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:bg-[#312E81] transition"
                    >
                        Verify OTP
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
                            onClick={resendOTP}
                            className="font-semibold text-[#14B8A6] hover:underline"
                        >
                            Resend OTP
                        </button>

                    )}

                </div>

                <Link
                    to="/login"
                    className="mt-8 flex justify-center items-center gap-2 text-slate-600 hover:text-[#1E1B4B]"
                >

                    <ArrowLeft size={18} />

                    Back to Login

                </Link>

            </div>

        </AuthLayout>
    );
}