import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
    Sparkles,
    Users,
    Trophy,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeBanner() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] text-white p-5 sm:p-6 lg:p-10"
        >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-56 h-56 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-20 left-10 sm:left-20 w-44 h-44 sm:w-56 sm:h-56 bg-cyan-300/10 rounded-full blur-3xl"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

                {/* Left Content */}
                <div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/15 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-5">
                        <Sparkles size={15} />
                        AI Team Recommendation
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Welcome Back,
                        <br />
                        <span className="break-words">
                            {user?.name || "Student"} 👋
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-4 sm:mt-5 text-white/80 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-xl">
                        Discover teammates with matching skills, join exciting
                        hackathons, and build amazing projects together.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">

                        {/* Find Teammates */}
                        <button
                            type="button"
                            onClick={() => navigate("/find-teammates")}
                            className="w-full sm:w-auto bg-white text-[#1E1B4B] px-5 sm:px-6 py-3 rounded-xl font-semibold hover:scale-[1.03] active:scale-[0.98] transition flex items-center justify-center gap-2"
                        >
                            <Users size={18} />
                            Find Teammates
                        </button>

                        {/* Create Team */}
                        <button
                            type="button"
                            onClick={() => navigate("/build-team")}
                            className="w-full sm:w-auto border border-white/40 px-5 sm:px-6 py-3 rounded-xl hover:bg-white/10 active:scale-[0.98] transition flex items-center justify-center gap-2"
                        >
                            Create Team
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </div>

                {/* Right Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">

                    {/* AI Match */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/15 transition">
                        <Users className="mb-3 sm:mb-4" size={22} />

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            96%
                        </h2>

                        <p className="text-white/80 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
                            AI Match Score
                        </p>
                    </div>

                    {/* Hackathons */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/15 transition">
                        <Trophy className="mb-3 sm:mb-4" size={22} />

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            18
                        </h2>

                        <p className="text-white/80 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
                            Hackathons Joined
                        </p>
                    </div>

                    {/* Active Teams */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/15 transition">
                        <Users className="mb-3 sm:mb-4" size={22} />

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            8
                        </h2>

                        <p className="text-white/80 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
                            Active Teams
                        </p>
                    </div>

                    {/* Invitations */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/15 transition">
                        <Sparkles className="mb-3 sm:mb-4" size={22} />

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            24
                        </h2>

                        <p className="text-white/80 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
                            Invitations
                        </p>
                    </div>

                </div>

            </div>
        </motion.section>
    );
}