import { CheckCircle, XCircle } from "lucide-react";

export default function PasswordStrength({ password }) {
    const checks = [
        {
            label: "At least 8 characters",
            valid: password.length >= 8,
        },
        {
            label: "One uppercase letter",
            valid: /[A-Z]/.test(password),
        },
        {
            label: "One lowercase letter",
            valid: /[a-z]/.test(password),
        },
        {
            label: "One number",
            valid: /[0-9]/.test(password),
        },
        {
            label: "One special character",
            valid: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
        },
    ];

    const score = checks.filter((item) => item.valid).length;

    const strength =
        score <= 2
            ? "Weak"
            : score === 3 || score === 4
                ? "Medium"
                : "Strong";

    const color =
        score <= 2
            ? "bg-red-500"
            : score <= 4
                ? "bg-yellow-500"
                : "bg-green-500";

    const width =
        score === 0
            ? "0%"
            : `${(score / 5) * 100}%`;

    return (
        <div className="mt-4">

            {/* Strength Text */}

            <div className="flex justify-between items-center mb-2">

                <p className="text-sm font-semibold text-slate-600">
                    Password Strength
                </p>

                <span
                    className={`text-sm font-bold ${strength === "Weak"
                            ? "text-red-500"
                            : strength === "Medium"
                                ? "text-yellow-500"
                                : "text-green-600"
                        }`}
                >
                    {strength}
                </span>

            </div>

            {/* Progress Bar */}

            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                <div
                    className={`${color} h-full transition-all duration-500`}
                    style={{ width }}
                />

            </div>

            {/* Rules */}

            <div className="mt-5 space-y-2">

                {checks.map((item) => (

                    <div
                        key={item.label}
                        className="flex items-center gap-2"
                    >

                        {item.valid ? (
                            <CheckCircle
                                size={18}
                                className="text-green-500"
                            />
                        ) : (
                            <XCircle
                                size={18}
                                className="text-red-400"
                            />
                        )}

                        <span
                            className={`text-sm ${item.valid
                                    ? "text-green-600"
                                    : "text-slate-500"
                                }`}
                        >
                            {item.label}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}