import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
    label,
    name,
    type = "text",
    icon: Icon,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType =
        isPassword && showPassword ? "text" : type;

    return (
        <div className="w-full">
            {/* Label */}
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-semibold text-[#1E1B4B]"
            >
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            {/* Input Container */}
            <div
                className={`
                    relative flex items-center w-full
                    min-h-[56px]
                    rounded-2xl
                    border
                    bg-white
                    px-4
                    transition-all duration-300
                    shadow-sm
                    ${error
                        ? "border-red-400 bg-red-50/30 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100"
                        : "border-slate-200 hover:border-slate-300 focus-within:border-[#14B8A6] focus-within:ring-4 focus-within:ring-[#14B8A6]/10"
                    }
                    ${disabled
                        ? "cursor-not-allowed bg-slate-100 opacity-60"
                        : ""
                    }
                `}
            >
                {/* Left Icon */}
                {Icon && (
                    <div
                        className={`
                            flex items-center justify-center
                            w-9 h-9
                            rounded-xl
                            mr-3
                            shrink-0
                            transition-all duration-300
                            ${error
                                ? "bg-red-100 text-red-500"
                                : "bg-[#14B8A6]/10 text-[#14B8A6]"
                            }
                        `}
                    >
                        <Icon size={18} strokeWidth={2} />
                    </div>
                )}

                {/* Input */}
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value ?? ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    autoComplete={
                        isPassword
                            ? "current-password"
                            : "off"
                    }
                    className="
                        flex-1
                        min-w-0
                        h-12
                        bg-transparent
                        outline-none
                        border-none
                        text-[15px]
                        font-medium
                        text-slate-700
                        placeholder:text-slate-400
                        disabled:cursor-not-allowed
                    "
                />

                {/* Password Toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                        disabled={disabled}
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                        className="
                            flex
                            items-center
                            justify-center
                            w-9
                            h-9
                            ml-2
                            shrink-0
                            rounded-xl
                            text-slate-400
                            hover:text-[#1E1B4B]
                            hover:bg-[#1E1B4B]/5
                            active:scale-95
                            transition-all duration-200
                            disabled:pointer-events-none
                        "
                    >
                        {showPassword ? (
                            <EyeOff
                                size={19}
                                strokeWidth={2}
                            />
                        ) : (
                            <Eye
                                size={19}
                                strokeWidth={2}
                            />
                        )}
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-1.5 mt-2 px-1">
                    <span className="text-red-500 text-xs mt-[2px]">
                        ●
                    </span>

                    <p className="text-sm font-medium text-red-500 leading-5">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}