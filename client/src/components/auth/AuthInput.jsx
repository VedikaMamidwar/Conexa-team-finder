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
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="w-full">

            <label className="block mb-2 text-sm font-semibold text-slate-700">
                {label}
                {required && (
                    <span className="text-red-500 ml-1">*</span>
                )}
            </label>

            <div
                className={`flex items-center rounded-xl border bg-white px-4 h-14 transition-all duration-300 ${error
                        ? "border-red-500"
                        : "border-slate-300 focus-within:border-[#14B8A6] focus-within:ring-4 focus-within:ring-cyan-100"
                    }`}
            >
                {Icon && (
                    <Icon
                        size={20}
                        className="text-slate-400 mr-3"
                    />
                )}

                <input
                    name={name}
                    type={isPassword && showPassword ? "text" : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="text-slate-400 hover:text-[#1E1B4B]"
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {error}
                </p>
            )}
        </div>
    );
}