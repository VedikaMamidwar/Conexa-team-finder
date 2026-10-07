import {
    CheckCircle,
    XCircle,
    ShieldCheck,
} from "lucide-react";

export default function PasswordStrength({
    password = "",
}) {
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
            valid: /[!@#$%^&*(),.?":{}|<>]/.test(
                password
            ),
        },
    ];

    const score = checks.filter(
        (item) => item.valid
    ).length;

    const strength =
        score === 0
            ? "Not Set"
            : score <= 2
                ? "Weak"
                : score <= 4
                    ? "Medium"
                    : "Strong";

    const strengthTextColor =
        score === 0
            ? "text-slate-400"
            : score <= 2
                ? "text-red-500"
                : score <= 4
                    ? "text-amber-500"
                    : "text-emerald-500";

    const progressColor =
        score === 0
            ? "bg-slate-300"
            : score <= 2
                ? "bg-red-500"
                : score <= 4
                    ? "bg-amber-500"
                    : "bg-[#14B8A6]";

    const width =
        score === 0
            ? "0%"
            : `${(score / checks.length) * 100}%`;

    return (
        <div
            className="
                mt-4
                p-4
                rounded-2xl
                border
                border-slate-200
                bg-slate-50/70
            "
        >
            {/* =========================================
                HEADER
            ========================================== */}

            <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            w-8
                            h-8
                            rounded-xl
                            bg-[#14B8A6]/10
                            text-[#14B8A6]
                        "
                    >
                        <ShieldCheck
                            size={17}
                            strokeWidth={2}
                        />
                    </div>

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-[#1E1B4B]
                        "
                    >
                        Password Strength
                    </p>
                </div>

                <span
                    className={`
                        text-xs
                        sm:text-sm
                        font-bold
                        ${strengthTextColor}
                    `}
                >
                    {strength}
                </span>
            </div>

            {/* =========================================
                PROGRESS BAR
            ========================================== */}

            <div
                className="
                    w-full
                    h-2
                    bg-slate-200
                    rounded-full
                    overflow-hidden
                "
            >
                <div
                    className={`
                        h-full
                        rounded-full
                        transition-all
                        duration-500
                        ease-out
                        ${progressColor}
                    `}
                    style={{
                        width,
                    }}
                />
            </div>

            {/* =========================================
                RULES
            ========================================== */}

            <div className="mt-4 space-y-2.5">
                {checks.map((item) => (
                    <div
                        key={item.label}
                        className="
                            flex
                            items-center
                            gap-2.5
                        "
                    >
                        {item.valid ? (
                            <CheckCircle
                                size={17}
                                strokeWidth={2}
                                className="
                                    shrink-0
                                    text-[#14B8A6]
                                "
                            />
                        ) : (
                            <XCircle
                                size={17}
                                strokeWidth={2}
                                className="
                                    shrink-0
                                    text-slate-300
                                "
                            />
                        )}

                        <span
                            className={`
                                text-xs
                                sm:text-sm
                                transition-colors
                                duration-300
                                ${item.valid
                                    ? "font-medium text-[#0F9488]"
                                    : "text-slate-500"
                                }
                            `}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* =========================================
                COMPLETION MESSAGE
            ========================================== */}

            {score === checks.length && (
                <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        px-3
                        py-2.5
                        rounded-xl
                        bg-[#14B8A6]/10
                        border
                        border-[#14B8A6]/20
                    "
                >
                    <CheckCircle
                        size={16}
                        className="shrink-0 text-[#14B8A6]"
                    />

                    <p
                        className="
                            text-xs
                            sm:text-sm
                            font-medium
                            text-[#0F766E]
                        "
                    >
                        Strong password. Your account is better protected.
                    </p>
                </div>
            )}
        </div>
    );
}