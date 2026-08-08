import { motion } from "framer-motion";
import {
    UserPlus,
    BadgeCheck,
    Users,
    Trophy,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: UserPlus,
        title: "Create Account",
        description:
            "Register using your email and create your CONEXA profile in less than a minute.",
    },
    {
        number: "02",
        icon: BadgeCheck,
        title: "Complete Profile",
        description:
            "Add your skills, technologies, projects, GitHub, LinkedIn and interests.",
    },
    {
        number: "03",
        icon: Users,
        title: "Find Your Team",
        description:
            "Use smart filters or AI recommendations to connect with the best teammates.",
    },
    {
        number: "04",
        icon: Trophy,
        title: "Build & Win",
        description:
            "Collaborate with your team, join hackathons and build amazing projects together.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <p className="uppercase tracking-[5px] text-[#14B8A6] font-semibold">
                        HOW IT WORKS
                    </p>

                    <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#1E1B4B]">
                        Start Your Journey
                        <br />
                        In Just Four Steps
                    </h2>

                    <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                        Finding the perfect teammates has never been easier.
                    </p>

                </motion.div>

                <div className="relative mt-20">

                    {/* Timeline Line */}
                    <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-slate-200 rounded-full">
                        <div className="w-3/4 h-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.03,
                                    }}
                                    className="bg-[#F8FAFC] rounded-3xl border border-slate-200 p-8 text-center shadow-sm hover:shadow-xl transition-all relative"
                                >
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-bold shadow-lg">
                                        {step.number}
                                    </div>

                                    <div className="mt-8 w-20 h-20 rounded-full bg-[#1E1B4B] mx-auto flex items-center justify-center">
                                        <Icon size={36} className="text-white" />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-bold text-[#1E1B4B]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-4 text-slate-600 leading-7">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </section>
    );
}