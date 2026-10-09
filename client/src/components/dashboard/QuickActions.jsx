import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Users,
    Trophy,
    UserCircle,
    Sparkles,
    BarChart3,
    ArrowRight,
} from "lucide-react";

const actions = [
    {
        title: "Find Teammates",
        description: "Discover students matching your skills.",
        icon: Search,
        color: "from-blue-500 to-indigo-600",
        route: "/find-teammates",
    },
    {
        title: "Create Team",
        description: "Build your hackathon dream team.",
        icon: Users,
        color: "from-cyan-500 to-teal-500",
        route: "/build-team",
    },
    {
        title: "Hackathons",
        description: "Browse ongoing competitions.",
        icon: Trophy,
        color: "from-orange-400 to-pink-500",
        route: "/hackathons",
    },
    {
        title: "My Profile",
        description: "Improve your profile score.",
        icon: UserCircle,
        color: "from-purple-500 to-indigo-600",
        route: "/profile",
    },
    {
        title: "AI Team Match",
        description: "Get AI-based teammate suggestions.",
        icon: Sparkles,
        color: "from-emerald-500 to-green-600",
        route: "/ai-team-match",
    },
    {
        title: "Analytics",
        description: "Track profile growth and activity.",
        icon: BarChart3,
        color: "from-sky-500 to-blue-700",
        route: "/analytics",
    },
];

export default function QuickActions() {
    const navigate = useNavigate();

    const handleAction = (route) => {
        navigate(route);
    };

    return (
        <section className="w-full">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
                        Quick Actions
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm sm:text-base">
                        Everything you need is one click away.
                    </p>
                </div>

            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">

                {actions.map((action, index) => {
                    const Icon = action.icon;

                    return (
                        <motion.button
                            key={action.title}
                            type="button"
                            onClick={() => handleAction(action.route)}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{
                                y: -6,
                                scale: 1.01,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl p-4 sm:p-5 lg:p-6 text-left transition-shadow duration-300 w-full"
                        >

                            {/* Icon */}
                            <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white shadow-lg`}
                            >
                                <Icon
                                    size={24}
                                    className="sm:hidden group-hover:rotate-12 transition duration-300"
                                />

                                <Icon
                                    size={28}
                                    className="hidden sm:block group-hover:rotate-12 transition duration-300"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="mt-4 sm:mt-5 lg:mt-6 text-lg sm:text-xl font-bold text-[#1E1B4B]">
                                {action.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-500 leading-6 sm:leading-7">
                                {action.description}
                            </p>

                            {/* Explore */}
                            <div className="mt-4 sm:mt-5 lg:mt-6 flex items-center gap-2 font-semibold text-[#14B8A6] text-sm sm:text-base">

                                <span>
                                    Explore
                                </span>

                                <ArrowRight
                                    size={17}
                                    className="group-hover:translate-x-2 transition-transform duration-300"
                                />

                            </div>

                            {/* Background Decoration */}
                            <div
                                className={`absolute -right-10 -bottom-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${action.color} opacity-10 group-hover:scale-125 transition-transform duration-500`}
                            />

                        </motion.button>
                    );
                })}

            </div>

        </section>
    );
}