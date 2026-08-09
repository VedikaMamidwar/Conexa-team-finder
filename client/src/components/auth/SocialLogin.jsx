import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    return (
        <div className="w-full">

            {/* Divider */}

            <div className="relative my-8">

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-slate-500 font-medium">
                        OR CONTINUE WITH
                    </span>
                </div>

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 gap-4">

                {/* Google */}

                <button
                    type="button"
                    className="flex items-center justify-center gap-3 h-14 rounded-xl border border-slate-300 bg-white hover:border-[#14B8A6] hover:shadow-md transition-all duration-300"
                >
                    <FcGoogle size={24} />

                    <span className="font-semibold text-slate-700">
                        Google
                    </span>

                </button>

                {/* GitHub */}

                <button
                    type="button"
                    className="flex items-center justify-center gap-3 h-14 rounded-xl border border-slate-300 bg-white hover:border-[#1E1B4B] hover:bg-[#1E1B4B] hover:text-white transition-all duration-300"
                >
                    <FaGithub size={22} />

                    <span className="font-semibold">
                        GitHub
                    </span>

                </button>

            </div>

        </div>
    );
}