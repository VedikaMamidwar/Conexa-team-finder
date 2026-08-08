import { motion } from "framer-motion";
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
    },
    {
        title: "Create Team",
        description: "Build your hackathon dream team.",
        icon: Users,
        color: "from-cyan-500 to-teal-500",
    },
    {
        title: "Hackathons",
        description: "Browse ongoing competitions.",
        icon: Trophy,
        color: "from-orange-400 to-pink-500",
    },
    {
        title: "My Profile",
        description: "Improve your profile score.",
        icon: UserCircle,
        color: "from-purple-500 to-indigo-600",
    },
    {
        title: "AI Team Match",
        description: "Get AI-based teammate suggestions.",
        icon: Sparkles,
        color: "from-emerald-500 to-green-600",
    },
    {
        title: "Analytics",
        description: "Track profile growth and activity.",
        icon: BarChart3,
        color: "from-sky-500 to-blue-700",
    },
];

export default function QuickActions() {
    return (
        <section>

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-[#1E1B4B]">
                        Quick Actions
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Everything you need is one click away.
                    </p>

                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {actions.map((action, index) => {

                    const Icon = action.icon;

                    return (

                        <motion.button
                            key={action.title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg p-6 text-left"
                        >

                            <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white shadow-lg`}
                            >
                                <Icon
                                    size={30}
                                    className="group-hover:rotate-12 transition duration-300"
                                />
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-[#1E1B4B]">
                                {action.title}
                            </h3>

                            <p className="mt-2 text-slate-500 leading-7">
                                {action.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 font-semibold text-[#14B8A6]">

                                Explore

                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-2 transition"
                                />

                            </div>

                            <div
                                className={`absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-gradient-to-br ${action.color} opacity-10`}
                            />

                        </motion.button>

                    );
                })}

            </div>

        </section>
    );
}