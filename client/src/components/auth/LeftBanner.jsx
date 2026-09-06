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
        description: "Find teammates based on skills and interests.",
    },
    {
        icon: Trophy,
        title: "Hackathon Ready",
        description: "Build winning teams for national hackathons.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Students",
        description: "Connect only with genuine college students.",
    },
];

export default function LeftBanner() {
    return (
        <div className="relative flex flex-col justify-between h-full w-full text-white">

            {/* Top */}

            <div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl font-black tracking-widest">
                        CONEXA
                    </h1>

                    <p className="mt-4 text-cyan-100 text-lg">
                        Where Great Teams Begin.
                    </p>
                </motion.div>

                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .3 }}
                    className="mt-16"
                >

                    <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md text-sm">

                        <Sparkles size={16} />

                        India's Smart Team Building Platform

                    </span>

                    <h2 className="mt-8 text-5xl font-black leading-tight">

                        Connect.
                        <br />

                        Collaborate.
                        <br />

                        Win Together.

                    </h2>

                    <p className="mt-6 text-cyan-100 leading-8 text-lg max-w-lg">

                        Discover talented developers, designers, AI engineers,
                        cybersecurity experts and innovators from colleges across India.

                    </p>

                </motion.div>

                {/* Features */}

                <div className="mt-12 space-y-5">

                    {features.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * .2 }}
                                className="flex items-start gap-5 bg-white/10 rounded-2xl p-5 backdrop-blur-md border border-white/10"
                            >

                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">

                                    <Icon
                                        className="text-[#1E1B4B]"
                                        size={26}
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold text-lg">
                                        {item.title}
                                    </h3>

                                    <p className="text-cyan-100 text-sm mt-1">
                                        {item.description}
                                    </p>

                                </div>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

            {/* Bottom */}

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .8 }}
                className="mt-12"
            >

                <div className="grid grid-cols-3 gap-4">

                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md text-center">

                        <h3 className="text-3xl font-black">
                            10K+
                        </h3>

                        <p className="text-sm text-cyan-100 mt-2">
                            Students
                        </p>

                    </div>

                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md text-center">

                        <h3 className="text-3xl font-black">
                            180+
                        </h3>

                        <p className="text-sm text-cyan-100 mt-2">
                            Colleges
                        </p>

                    </div>

                    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md text-center">

                        <h3 className="text-3xl font-black">
                            350+
                        </h3>

                        <p className="text-sm text-cyan-100 mt-2">
                            Hackathons
                        </p>

                    </div>

                </div>

                <button className="mt-8 flex items-center gap-2 text-cyan-100 hover:text-white transition">

                    Learn More

                    <ArrowUpRight size={18} />

                </button>

            </motion.div>

        </div>
    );
}