import { motion } from "framer-motion";
import {
    Users,
    ShieldCheck,
    Trophy,
    MessageCircle,
    Sparkles,
    BarChart3,
    ArrowRight,
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Smart Team Matching",
        description:
            "Find teammates based on skills, interests, experience, and preferred roles.",
    },
    {
        icon: Trophy,
        title: "Hackathon Discovery",
        description:
            "Explore upcoming hackathons and instantly build your dream team.",
    },
    {
        icon: MessageCircle,
        title: "Real-Time Chat",
        description:
            "Communicate with teammates using fast and secure messaging.",
    },
    {
        icon: BarChart3,
        title: "Skill Analytics",
        description:
            "Showcase your skills, projects, achievements and experience.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Profiles",
        description:
            "Build trust with verified student accounts and authentic profiles.",
    },
    {
        icon: Sparkles,
        title: "AI Recommendations",
        description:
            "Receive intelligent teammate suggestions based on your profile.",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="py-28 bg-[#F8FAFC]"
        >
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .7 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="uppercase tracking-[4px] text-[#14B8A6] font-semibold">
                        Features
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-[#1E1B4B]">
                        Everything You Need
                    </h2>

                    <p className="mt-6 text-slate-600 max-w-3xl mx-auto">
                        CONEXA helps students connect with the right people,
                        create teams, communicate efficiently and succeed
                        together in hackathons and innovative projects.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

                    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (

                            <motion.div

                                key={feature.title}

                                initial={{ opacity: 0, y: 50 }}

                                whileInView={{ opacity: 1, y: 0 }}

                                transition={{ delay: index * .12 }}

                                viewport={{ once: true }}

                                whileHover={{
                                    y: -10,
                                    scale: 1.02
                                }}

                                className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-500"
                            >

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-50 via-white to-cyan-50" />

                                <div className="relative">

                                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

                                        <Icon
                                            size={30}
                                            className="text-[#1E1B4B]"
                                        />

                                    </div>

                                    <h3 className="mt-8 text-2xl font-bold text-[#1E1B4B]">

                                        {feature.title}

                                    </h3>

                                    <p className="mt-4 text-slate-600 leading-7">

                                        {feature.description}

                                    </p>

                                    <button
                                        className="mt-8 flex items-center gap-2 font-semibold text-[#1E1B4B]"
                                    >
                                        Learn More

                                        <ArrowRight
                                            size={18}
                                            className="group-hover:translate-x-2 transition"
                                        />

                                    </button>

                                </div>

                            </motion.div>

                        )

                    })}

                </div>

            </div>
        </section>
    );
}