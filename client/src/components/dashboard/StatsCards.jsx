import { motion } from "framer-motion";
import {
    Users,
    Trophy,
    UserPlus,
    Star,
    TrendingUp,
} from "lucide-react";

const stats = [
    {
        title: "Team Matches",
        value: "124",
        change: "+18%",
        color: "from-blue-500 to-indigo-600",
        icon: Users,
    },
    {
        title: "Hackathons",
        value: "18",
        change: "+5%",
        color: "from-purple-500 to-indigo-600",
        icon: Trophy,
    },
    {
        title: "Team Requests",
        value: "32",
        change: "+12%",
        color: "from-cyan-500 to-teal-500",
        icon: UserPlus,
    },
    {
        title: "Profile Score",
        value: "96%",
        change: "+2%",
        color: "from-orange-400 to-pink-500",
        icon: Star,
    },
];

export default function StatsCards() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((card, index) => {
                const Icon = card.icon;

                return (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-200 p-6"
                    >
                        {/* Background Circle */}
                        <div
                            className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${card.color} opacity-10`}
                        />

                        {/* Icon */}
                        <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-md`}
                        >
                            <Icon size={28} />
                        </div>

                        {/* Value */}
                        <h2 className="mt-6 text-4xl font-bold text-[#1E1B4B]">
                            {card.value}
                        </h2>

                        {/* Title */}
                        <p className="text-slate-500 mt-2">
                            {card.title}
                        </p>

                        {/* Growth */}
                        <div className="flex items-center gap-2 mt-5 text-green-600 font-medium">

                            <TrendingUp size={18} />

                            {card.change}

                            <span className="text-slate-400 font-normal">
                                this month
                            </span>

                        </div>
                    </motion.div>
                );
            })}
        </section>
    );
}