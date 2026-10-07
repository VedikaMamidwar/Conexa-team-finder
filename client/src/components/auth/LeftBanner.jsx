import { motion } from "framer-motion";
import {
    Users,
    Trophy,
    Sparkles,
    ShieldCheck,
    ArrowUpRight,
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "AI Team Matching",
        description:
            "Find teammates based on skills, interests and collaboration goals.",
    },
    {
        icon: Trophy,
        title: "Hackathon Ready",
        description:
            "Build powerful teams and prepare for hackathons across India.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Students",
        description:
            "Connect with genuine students and discover trusted teammates.",
    },
];

const stats = [
    {
        value: "10K+",
        label: "Students",
    },
    {
        value: "180+",
        label: "Colleges",
    },
    {
        value: "350+",
        label: "Hackathons",
    },
];

export default function LeftBanner() {
    return (
        <div className="relative flex flex-col w-full min-h-full text-white">

            {/* =========================
                TOP BRAND
            ========================== */}
            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            w-12
                            h-12
                            rounded-2xl
                            bg-white/10
                            border
                            border-white/15
                            backdrop-blur-md
                            shadow-lg
                        "
                    >
                        <span className="text-xl font-black">
                            C
                        </span>
                    </div>

                    <div>
                        <h1
                            className="
                                text-3xl
                                sm:text-4xl
                                xl:text-5xl
                                font-black
                                tracking-[0.18em]
                            "
                        >
                            CONEXA
                        </h1>

                        <p className="mt-1 text-sm sm:text-base text-cyan-100">
                            Where Great Teams Begin.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* =========================
                MAIN CONTENT
            ========================== */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.2,
                    duration: 0.7,
                    ease: "easeOut",
                }}
                className="
                    mt-10
                    sm:mt-14
                    xl:mt-16
                "
            >
                {/* Badge */}
                <div
                    className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-white/10
                        border
                        border-white/10
                        backdrop-blur-md
                        text-xs
                        sm:text-sm
                        font-medium
                        text-cyan-50
                    "
                >
                    <Sparkles
                        size={15}
                        className="text-cyan-200"
                    />

                    <span>
                        India's Smart Team Building Platform
                    </span>
                </div>

                {/* Heading */}
                <h2
                    className="
                        mt-7
                        sm:mt-8
                        text-4xl
                        sm:text-5xl
                        xl:text-[54px]
                        font-black
                        leading-[1.05]
                        tracking-tight
                    "
                >
                    Connect.
                    <br />

                    <span className="text-cyan-100">
                        Collaborate.
                    </span>

                    <br />

                    Win Together.
                </h2>

                {/* Description */}
                <p
                    className="
                        mt-5
                        sm:mt-6
                        max-w-xl
                        text-sm
                        sm:text-base
                        lg:text-lg
                        leading-7
                        sm:leading-8
                        text-cyan-100
                    "
                >
                    Discover talented developers, designers, AI engineers,
                    cybersecurity experts and innovators from colleges
                    across India.
                </p>
            </motion.div>

            {/* =========================
                FEATURES
            ========================== */}
            <div
                className="
                    mt-8
                    sm:mt-10
                    xl:mt-12
                    space-y-3
                    sm:space-y-4
                "
            >
                {features.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.title}
                            initial={{
                                opacity: 0,
                                x: -35,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.3 + index * 0.15,
                                duration: 0.5,
                                ease: "easeOut",
                            }}
                            whileHover={{
                                x: 5,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                            className="
                                group
                                flex
                                items-center
                                gap-4
                                sm:gap-5
                                p-4
                                sm:p-5
                                rounded-2xl
                                bg-white/10
                                border
                                border-white/10
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:bg-white/[0.14]
                                hover:border-white/20
                                hover:shadow-xl
                                hover:shadow-black/10
                            "
                        >
                            {/* Feature Icon */}
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    shrink-0
                                    w-11
                                    h-11
                                    sm:w-12
                                    sm:h-12
                                    lg:w-14
                                    lg:h-14
                                    rounded-xl
                                    bg-white
                                    shadow-md
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                            >
                                <Icon
                                    size={23}
                                    className="text-[#1E1B4B]"
                                    strokeWidth={2}
                                />
                            </div>

                            {/* Feature Text */}
                            <div className="min-w-0">
                                <h3
                                    className="
                                        text-sm
                                        sm:text-base
                                        lg:text-lg
                                        font-bold
                                        text-white
                                    "
                                >
                                    {item.title}
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        sm:text-sm
                                        leading-5
                                        sm:leading-6
                                        text-cyan-100
                                    "
                                >
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* =========================
                STATS
            ========================== */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.8,
                    duration: 0.6,
                }}
                className="mt-8 sm:mt-10 xl:mt-12"
            >
                <div
                    className="
                        grid
                        grid-cols-3
                        gap-2
                        sm:gap-3
                        lg:gap-4
                    "
                >
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="
                                group
                                text-center
                                p-3
                                sm:p-4
                                lg:p-5
                                rounded-2xl
                                bg-white/10
                                border
                                border-white/10
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:bg-white/[0.15]
                                hover:-translate-y-1
                            "
                        >
                            <h3
                                className="
                                    text-xl
                                    sm:text-2xl
                                    lg:text-3xl
                                    font-black
                                    text-white
                                "
                            >
                                {stat.value}
                            </h3>

                            <p
                                className="
                                    mt-1
                                    sm:mt-2
                                    text-[10px]
                                    sm:text-xs
                                    lg:text-sm
                                    text-cyan-100
                                "
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* =========================
                    LEARN MORE BUTTON
                ========================== */}
                <motion.button
                    type="button"
                    whileHover={{
                        x: 4,
                    }}
                    whileTap={{
                        scale: 0.96,
                    }}
                    className="
                        group
                        mt-6
                        sm:mt-7
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-5
                        py-2.5
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                        backdrop-blur-md
                        text-sm
                        font-semibold
                        text-cyan-50
                        hover:bg-white
                        hover:text-[#1E1B4B]
                        hover:border-white
                        transition-all
                        duration-300
                        shadow-lg
                        shadow-black/5
                    "
                >
                    <span>Learn More</span>

                    <ArrowUpRight
                        size={17}
                        className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                        "
                    />
                </motion.button>
            </motion.div>
        </div>
    );
}