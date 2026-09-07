import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    Building2,
    Trophy,
    ShieldCheck,
    ArrowUpRight,
    X,
} from "lucide-react";

const items = [
    {
        icon: GraduationCap,
        title: "120+ Colleges",
        desc: "Students from top engineering colleges.",
        details:
            "CONEXA connects students from 120+ engineering colleges, helping you discover talented teammates from different campuses and backgrounds.",
    },
    {
        icon: Trophy,
        title: "300+ Hackathons",
        desc: "Join national & international hackathons.",
        details:
            "Discover hackathons and find teammates with the right skills to build innovative projects and compete at national and international events.",
    },
    {
        icon: Building2,
        title: "5000+ Students",
        desc: "Growing developer community.",
        details:
            "Join a growing community of 5000+ students, developers and innovators who are looking to collaborate, learn and build amazing projects together.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Profiles",
        desc: "Safe & trusted collaboration.",
        details:
            "Connect with verified student profiles and collaborate with confidence in a safer and more trusted team-building environment.",
    },
];

export default function Trusted() {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <section className="relative py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#1E1B4B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#14B8A6]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* ================= HEADER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                        <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />

                        <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#14B8A6] text-xs sm:text-sm font-bold">
                            Trusted Platform
                        </p>
                    </div>

                    {/* Heading */}
                    <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1B4B] leading-tight">
                        Built For Every
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]">
                            Engineering Student
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Thousands of students use CONEXA to discover teammates,
                        collaborate on projects and participate in hackathons.
                    </p>

                </motion.div>

                {/* ================= CARDS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 mt-10 sm:mt-14 lg:mt-16">

                    {items.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={index}
                                onClick={() => setSelectedItem(item)}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.12,
                                    duration: 0.5,
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                }}
                                className="
                                    group
                                    relative
                                    bg-[#F8FAFC]
                                    border border-slate-200
                                    rounded-3xl
                                    p-6 sm:p-7 lg:p-8
                                    text-center
                                    overflow-hidden
                                    cursor-pointer
                                    transition-all duration-300
                                    hover:border-[#14B8A6]/40
                                    hover:shadow-2xl
                                "
                            >

                                {/* Card Glow */}
                                <div
                                    className="
                                        absolute
                                        -top-16
                                        -right-16
                                        w-32
                                        h-32
                                        rounded-full
                                        bg-[#14B8A6]/10
                                        blur-2xl
                                        opacity-0
                                        group-hover:opacity-100
                                        transition-opacity duration-500
                                    "
                                />

                                {/* Top Accent */}
                                <div
                                    className="
                                        absolute
                                        top-0
                                        left-1/2
                                        -translate-x-1/2
                                        w-0
                                        h-1
                                        bg-gradient-to-r
                                        from-[#1E1B4B]
                                        to-[#14B8A6]
                                        group-hover:w-20
                                        transition-all duration-500
                                        rounded-full
                                    "
                                />

                                {/* Icon */}
                                <motion.div
                                    whileHover={{
                                        rotate: 5,
                                        scale: 1.08,
                                    }}
                                    className="
                                        relative
                                        w-16 h-16
                                        sm:w-[68px] sm:h-[68px]
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-[#1E1B4B]
                                        to-[#312E81]
                                        flex
                                        items-center
                                        justify-center
                                        mx-auto
                                        shadow-lg
                                        shadow-[#1E1B4B]/20
                                    "
                                >
                                    <Icon
                                        size={30}
                                        strokeWidth={2}
                                        className="text-white"
                                    />

                                    {/* Icon Glow */}
                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            rounded-2xl
                                            bg-[#14B8A6]/20
                                            blur-md
                                            opacity-0
                                            group-hover:opacity-100
                                            transition-opacity
                                        "
                                    />
                                </motion.div>

                                {/* Title */}
                                <h3
                                    className="
                                        relative
                                        mt-5 sm:mt-6
                                        text-xl sm:text-2xl
                                        font-bold
                                        text-[#1E1B4B]
                                    "
                                >
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="
                                        relative
                                        mt-2 sm:mt-3
                                        text-sm sm:text-base
                                        text-slate-500
                                        leading-relaxed
                                    "
                                >
                                    {item.desc}
                                </p>

                                {/* Explore */}
                                <div
                                    className="
                                        relative
                                        mt-5
                                        inline-flex
                                        items-center
                                        gap-1
                                        text-sm
                                        font-semibold
                                        text-[#14B8A6]
                                        opacity-0
                                        translate-y-2
                                        group-hover:opacity-100
                                        group-hover:translate-y-0
                                        transition-all duration-300
                                    "
                                >
                                    Explore
                                    <ArrowUpRight size={16} />
                                </div>

                            </motion.div>
                        );
                    })}

                </div>




            </div>

            {/* ================= MODAL ================= */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="
                            fixed
                            inset-0
                            z-50
                            bg-[#1E1B4B]/60
                            backdrop-blur-sm
                            flex
                            items-center
                            justify-center
                            p-4
                        "
                    >

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="
                                relative
                                w-full
                                max-w-md
                                bg-white
                                rounded-3xl
                                p-6
                                sm:p-8
                                shadow-2xl
                            "
                        >

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="
                                    absolute
                                    top-4
                                    right-4
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                    text-slate-600
                                    hover:bg-slate-200
                                    hover:text-[#1E1B4B]
                                    transition
                                "
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Icon */}
                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-[#1E1B4B]
                                    to-[#312E81]
                                    flex
                                    items-center
                                    justify-center
                                    mb-5
                                "
                            >
                                <selectedItem.icon
                                    size={30}
                                    className="text-white"
                                />
                            </div>

                            {/* Modal Title */}
                            <h3
                                className="
                                    text-2xl
                                    sm:text-3xl
                                    font-black
                                    text-[#1E1B4B]
                                "
                            >
                                {selectedItem.title}
                            </h3>

                            {/* Modal Description */}
                            <p
                                className="
                                    mt-4
                                    text-sm
                                    sm:text-base
                                    text-slate-600
                                    leading-relaxed
                                "
                            >
                                {selectedItem.details}
                            </p>

                            {/* Modal Button */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="
                                    mt-6
                                    w-full
                                    py-3
                                    rounded-xl
                                    bg-[#1E1B4B]
                                    text-white
                                    font-semibold
                                    hover:bg-[#312E81]
                                    transition-all
                                    duration-300
                                "
                            >
                                Got it
                            </button>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}