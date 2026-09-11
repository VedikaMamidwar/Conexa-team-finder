import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    ShieldCheck,
    Trophy,
    MessageCircle,
    Sparkles,
    BarChart3,
    ArrowRight,
    X,
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Smart Team Matching",
        description:
            "Find teammates based on skills, interests, experience, and preferred roles.",
        details:
            "CONEXA intelligently helps you find students who match your required skills, interests, experience, and preferred team roles. Build balanced teams faster and work with people who complement your strengths.",
    },
    {
        icon: Trophy,
        title: "Hackathon Discovery",
        description:
            "Explore upcoming hackathons and instantly build your dream team.",
        details:
            "Discover upcoming hackathons, explore opportunities, and connect with students who are interested in participating. Find the right teammates before the competition begins.",
    },
    {
        icon: MessageCircle,
        title: "Real-Time Chat",
        description:
            "Communicate with teammates using fast and secure messaging.",
        details:
            "Communicate with potential and confirmed teammates through real-time messaging. Discuss ideas, divide responsibilities, and coordinate your hackathon project efficiently.",
    },
    {
        icon: BarChart3,
        title: "Skill Analytics",
        description:
            "Showcase your skills, projects, achievements and experience.",
        details:
            "Create a strong profile by showcasing your technical skills, projects, achievements, experience, and areas of interest. Help other students understand what you can contribute to a team.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Profiles",
        description:
            "Build trust with verified student accounts and authentic profiles.",
        details:
            "Verified profiles help students connect with genuine teammates and create a more trustworthy team-building environment.",
    },
    {
        icon: Sparkles,
        title: "AI Recommendations",
        description:
            "Receive intelligent teammate suggestions based on your profile.",
        details:
            "Get personalized teammate recommendations based on your skills, interests, experience, preferred roles, and project requirements.",
    },
];

export default function Features() {
    const [selectedFeature, setSelectedFeature] = useState(null);

    return (
        <section
            id="features"
            className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#F8FAFC]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ================= HEADER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#14B8A6] font-semibold text-xs sm:text-sm">
                        Features
                    </p>

                    <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#1E1B4B] leading-tight">
                        Everything You Need
                    </h2>

                    <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-7 max-w-3xl mx-auto">
                        CONEXA helps students connect with the right people,
                        create teams, communicate efficiently and succeed
                        together in hackathons and innovative projects.
                    </p>
                </motion.div>

                {/* ================= FEATURES GRID ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.12,
                                    duration: 0.5,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.01,
                                }}
                                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                {/* Hover Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-50 via-white to-cyan-50" />

                                <div className="relative">

                                    {/* Icon */}
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-indigo-100 flex items-center justify-center">
                                        <Icon
                                            size={26}
                                            className="text-[#1E1B4B] sm:w-7 sm:h-7 md:w-[30px] md:h-[30px]"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mt-5 sm:mt-6 md:mt-8 text-xl sm:text-2xl font-bold text-[#1E1B4B] leading-tight">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
                                        {feature.description}
                                    </p>

                                    {/* Learn More Button */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedFeature(feature)
                                        }
                                        className="mt-6 sm:mt-8 flex items-center gap-2 font-semibold text-[#1E1B4B] text-sm sm:text-base hover:text-[#312E81] transition"
                                    >
                                        Learn More

                                        <ArrowRight
                                            size={18}
                                            className="group-hover:translate-x-2 transition"
                                        />
                                    </button>

                                </div>
                            </motion.div>
                        );
                    })}

                </div>
            </div>

            {/* ================= FEATURE MODAL ================= */}
            <AnimatePresence>
                {selectedFeature && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedFeature(null)}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: 30,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                        >

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedFeature(null)
                                }
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-[#1E1B4B] transition"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* Icon */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                                <selectedFeature.icon
                                    size={30}
                                    className="text-[#1E1B4B]"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-[#1E1B4B] pr-8">
                                {selectedFeature.title}
                            </h3>

                            {/* Details */}
                            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-7">
                                {selectedFeature.details}
                            </p>

                            {/* Close */}
                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedFeature(null)
                                }
                                className="mt-6 w-full bg-[#1E1B4B] hover:bg-[#312E81] text-white py-3 rounded-xl font-semibold transition"
                            >
                                Close
                            </button>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}