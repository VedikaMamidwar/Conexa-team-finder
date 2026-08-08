import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-24 bg-[#F8FAFC]">

            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] p-10 md:p-16 text-white shadow-2xl"
                >

                    {/* Background Glow */}
                    <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

                        {/* Left */}

                        <div>

                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                                <Sparkles size={16} />
                                Join India's Fastest Growing Student Network
                            </div>

                            <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight">
                                Build Your Dream
                                <span className="block text-cyan-300">
                                    Hackathon Team
                                </span>
                            </h2>

                            <p className="mt-6 text-lg text-slate-200 max-w-xl leading-8">
                                Connect with developers, designers, AI engineers,
                                cybersecurity experts and innovators from top colleges.
                                Start collaborating today and win your next hackathon.
                            </p>

                        </div>

                        {/* Right */}

                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">

                            <div className="flex items-center gap-4">

                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center">

                                    <Users className="text-[#1E1B4B]" size={32} />

                                </div>

                                <div>

                                    <h3 className="text-3xl font-black">
                                        10,000+
                                    </h3>

                                    <p className="text-slate-200">
                                        Students already joined
                                    </p>

                                </div>

                            </div>

                            <button
                                className="group mt-8 w-full bg-white text-[#1E1B4B] py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-100 transition"
                            >

                                Register Now

                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition"
                                />

                            </button>

                            <button
                                className="mt-4 w-full border border-white/30 py-4 rounded-2xl hover:bg-white/10 transition"
                            >
                                Explore Platform
                            </button>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}