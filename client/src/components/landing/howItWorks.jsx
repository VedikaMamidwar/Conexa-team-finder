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
        <section
            id="how"
            className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <p className="uppercase tracking-[3px] sm:tracking-[5px] text-[#14B8A6] font-semibold text-sm sm:text-base">
                        HOW IT WORKS
                    </p>

                    <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] leading-tight">
                        Start Your Journey
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        In Just Four Steps
                    </h2>

                    <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
                        Finding the perfect teammates has never been easier.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative mt-14 sm:mt-16 lg:mt-20">

                    {/* Desktop Timeline Line */}
                    <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-1 bg-slate-200 rounded-full">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] rounded-full"
                        />
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 relative">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.15,
                                        duration: 0.5,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                    }}
                                    className="
                                        group
                                        relative
                                        bg-[#F8FAFC]
                                        rounded-2xl sm:rounded-3xl
                                        border border-slate-200
                                        p-6 sm:p-7 lg:p-6 xl:p-8
                                        text-center
                                        shadow-sm
                                        hover:shadow-xl
                                        hover:border-[#1E1B4B]/20
                                        transition-all
                                        duration-300
                                    "
                                >

                                    {/* Step Number */}
                                    <div
                                        className="
                                            absolute
                                            -top-5
                                            left-1/2
                                            -translate-x-1/2
                                            w-10
                                            h-10
                                            rounded-full
                                            bg-[#1E1B4B]
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-bold
                                            text-sm
                                            shadow-lg
                                            z-10
                                            group-hover:bg-[#14B8A6]
                                            transition-colors
                                        "
                                    >
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className="
                                            mt-6 sm:mt-7
                                            w-16 h-16
                                            sm:w-20 sm:h-20
                                            rounded-full
                                            bg-[#1E1B4B]
                                            mx-auto
                                            flex
                                            items-center
                                            justify-center
                                            shadow-md
                                            group-hover:scale-110
                                            group-hover:bg-[#14B8A6]
                                            transition-all
                                            duration-300
                                        "
                                    >
                                        <Icon
                                            size={30}
                                            className="sm:hidden text-white"
                                        />

                                        <Icon
                                            size={36}
                                            className="hidden sm:block text-white"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="
                                            mt-5 sm:mt-6
                                            text-xl
                                            sm:text-2xl
                                            font-bold
                                            text-[#1E1B4B]
                                        "
                                    >
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="
                                            mt-3 sm:mt-4
                                            text-sm
                                            sm:text-base
                                            text-slate-600
                                            leading-6
                                            sm:leading-7
                                        "
                                    >
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