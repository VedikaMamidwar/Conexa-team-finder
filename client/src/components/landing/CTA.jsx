import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
    const scrollToDemo = () => {
        document.getElementById("demo")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <section
            id="contact"
            className="py-14 sm:py-18 md:py-20 lg:py-24 bg-[#F8FAFC] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        sm:rounded-[32px]
                        bg-gradient-to-br
                        from-[#1E1B4B]
                        via-[#312E81]
                        to-[#14B8A6]
                        p-6
                        sm:p-8
                        md:p-12
                        lg:p-16
                        text-white
                        shadow-2xl
                    "
                >

                    {/* Background Glow */}
                    <div className="absolute -top-20 -left-20 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-cyan-300/20 blur-3xl" />

                    <div className="absolute -bottom-20 -right-20 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-indigo-300/20 blur-3xl" />

                    {/* Decorative Circles */}
                    <div className="absolute top-10 right-[35%] w-16 h-16 rounded-full border border-white/10 hidden md:block" />

                    <div className="absolute bottom-10 left-[40%] w-10 h-10 rounded-full border border-white/10 hidden md:block" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

                        {/* LEFT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >

                            {/* Badge */}
                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    bg-white/10
                                    border border-white/10
                                    px-3
                                    sm:px-4
                                    py-2
                                    rounded-full
                                    text-xs
                                    sm:text-sm
                                    font-medium
                                    backdrop-blur-sm
                                "
                            >
                                <Sparkles
                                    size={15}
                                    className="text-cyan-300"
                                />

                                <span>
                                    Join India's Fastest Growing
                                    <span className="hidden sm:inline"> Student Network</span>
                                </span>
                            </div>

                            {/* Heading */}
                            <h2
                                className="
                                    mt-5
                                    sm:mt-6
                                    text-3xl
                                    sm:text-4xl
                                    md:text-5xl
                                    lg:text-5xl
                                    xl:text-6xl
                                    font-black
                                    leading-[1.1]
                                "
                            >
                                Build Your Dream

                                <span className="block text-cyan-300 mt-1">
                                    Hackathon Team
                                </span>
                            </h2>

                            {/* Description */}
                            <p
                                className="
                                    mt-4
                                    sm:mt-6
                                    text-sm
                                    sm:text-base
                                    lg:text-lg
                                    text-slate-200
                                    max-w-xl
                                    leading-6
                                    sm:leading-7
                                    lg:leading-8
                                "
                            >
                                Connect with developers, designers, AI engineers,
                                cybersecurity experts and innovators from top
                                colleges. Start collaborating today and win your
                                next hackathon.
                            </p>

                            {/* Small Benefits */}
                            <div className="mt-6 flex flex-wrap gap-3">

                                <span className="px-3 py-2 rounded-lg bg-white/10 text-xs sm:text-sm">
                                    ✓ Find Teammates
                                </span>

                                <span className="px-3 py-2 rounded-lg bg-white/10 text-xs sm:text-sm">
                                    ✓ Build Teams
                                </span>

                                <span className="px-3 py-2 rounded-lg bg-white/10 text-xs sm:text-sm">
                                    ✓ Join Hackathons
                                </span>

                            </div>

                        </motion.div>

                        {/* RIGHT CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="
                                bg-white/10
                                backdrop-blur-xl
                                rounded-2xl
                                sm:rounded-3xl
                                p-5
                                sm:p-7
                                md:p-8
                                border
                                border-white/20
                                shadow-xl
                            "
                        >

                            {/* Students */}
                            <div className="flex items-center gap-3 sm:gap-4">

                                <div
                                    className="
                                        flex-shrink-0
                                        w-12
                                        h-12
                                        sm:w-16
                                        sm:h-16
                                        rounded-xl
                                        sm:rounded-2xl
                                        bg-white
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <Users
                                        className="text-[#1E1B4B]"
                                        size={26}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-black">
                                        10,000+
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-200">
                                        Students already joined
                                    </p>
                                </div>

                            </div>

                            {/* Divider */}
                            <div className="my-5 sm:my-6 h-px bg-white/10" />

                            {/* CTA Text */}
                            <h3 className="text-lg sm:text-xl font-bold">
                                Ready to build your team?
                            </h3>

                            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-6">
                                Create your profile and discover teammates
                                who match your skills and goals.
                            </p>

                            {/* Register Button */}
                            <Link
                                to="/register"
                                className="
                                    group
                                    mt-6
                                    w-full
                                    bg-white
                                    text-[#1E1B4B]
                                    py-3.5
                                    sm:py-4
                                    rounded-xl
                                    sm:rounded-2xl
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    hover:bg-slate-100
                                    hover:scale-[1.02]
                                    active:scale-[0.98]
                                    transition-all
                                    duration-200
                                "
                            >
                                Register Now

                                <ArrowRight
                                    size={20}
                                    className="
                                        group-hover:translate-x-1
                                        transition-transform
                                    "
                                />
                            </Link>

                            {/* Explore Button */}
                            <button
                                type="button"
                                onClick={scrollToDemo}
                                className="
                                    mt-3
                                    sm:mt-4
                                    w-full
                                    border
                                    border-white/30
                                    py-3.5
                                    sm:py-4
                                    rounded-xl
                                    sm:rounded-2xl
                                    text-sm
                                    sm:text-base
                                    font-medium
                                    hover:bg-white/10
                                    hover:border-white/50
                                    transition-all
                                "
                            >
                                Explore Platform
                            </button>

                        </motion.div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}