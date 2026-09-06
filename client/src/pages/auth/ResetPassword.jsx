import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";
import AuthInput from "../../components/auth/AuthInput";
import PasswordStrength from "../../components/auth/PasswordStrength";

export default function ResetPassword() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!password)
            newErrors.password = "Password is required.";

        if (password.length < 8)
            newErrors.password = "Minimum 8 characters required.";

        if (confirmPassword !== password)
            newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        console.log("Password Changed");

        // Backend API Later

        navigate("/login");
    };

    return (
        <AuthLayout left={<LeftBanner />}>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

                <div className="text-center">

                    <h2 className="text-3xl font-black text-[#1E1B4B]">
                        Reset Password
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Create a strong new password for your account.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >

                    <AuthInput
                        label="New Password"
                        type="password"
                        icon={Lock}
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        error={errors.password}
                        required
                    />

                    <PasswordStrength
                        password={password}
                    />

                    <AuthInput
                        label="Confirm Password"
                        type="password"
                        icon={Lock}
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        error={errors.confirmPassword}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full h-14 rounded-xl bg-[#1E1B4B] text-white font-semibold hover:bg-[#312E81] transition"
                    >
                        Update Password
                    </button>

                </form>

            </div>

        </AuthLayout>
    );
}