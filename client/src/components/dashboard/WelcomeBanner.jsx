import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
    Sparkles,
    Users,
    Trophy,
    ArrowRight,
} from "lucide-react";

export default function WelcomeBanner() {

    const { user } = useAuth();
    return (
        <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] text-white p-8 lg:p-10"
        >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 left-20 w-56 h-56 bg-cyan-300/10 rounded-full blur-3xl"></div>

            <div className="relative grid lg:grid-cols-2 gap-10 items-center">

                {/* Left */}
                <div>

                    <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm mb-5">
                        <Sparkles size={16} />
                        AI Team Recommendation
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                        Welcome Back,
                        <br />
                        {user?.name || "Student"} 👋
                    </h1>

                    <p className="mt-5 text-white/80 text-lg leading-8 max-w-xl">
                        Discover teammates with matching skills, join exciting hackathons,
                        and build amazing projects together.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">

                        <button className="bg-white text-[#1E1B4B] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                            Find Teammates
                        </button>

                        <button className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition flex items-center gap-2">
                            Create Team
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </div>

                {/* Right */}

                <div className="grid grid-cols-2 gap-5">

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">

                        <Users className="mb-4" />

                        <h2 className="text-4xl font-bold">
                            96%
                        </h2>

                        <p className="text-white/80 mt-2">
                            AI Match Score
                        </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">

                        <Trophy className="mb-4" />

                        <h2 className="text-4xl font-bold">
                            18
                        </h2>

                        <p className="text-white/80 mt-2">
                            Hackathons Joined
                        </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">

                        <Users className="mb-4" />

                        <h2 className="text-4xl font-bold">
                            8
                        </h2>

                        <p className="text-white/80 mt-2">
                            Active Teams
                        </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">

                        <Sparkles className="mb-4" />

                        <h2 className="text-4xl font-bold">
                            24
                        </h2>

                        <p className="text-white/80 mt-2">
                            Invitations
                        </p>

                    </div>

                </div>

            </div>
        </motion.section>
    );
}