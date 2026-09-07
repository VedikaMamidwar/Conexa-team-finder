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
        <div className="flex h-full flex-col justify-between rounded-2xl bg-[#1E1B4B] p-6 text-white shadow-2xl shadow-indigo-950/40 sm:p-8">
            <div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                        <Sparkles className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">
                            Conexa
                        </p>
                        <h2 className="text-lg font-semibold">Build better teams</h2>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-indigo-200/80">
                        For student innovators
                    </p>
                    <h1 className="max-w-md text-4xl font-bold leading-tight sm:text-5xl">
                        Join the next wave of hackathon teams.
                    </h1>
                </motion.div>

                <div className="space-y-4">
                    {features.map(({ icon: Icon, title, description }, index) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                            className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-200">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white">{title}</h3>
                                <p className="mt-1 text-sm text-indigo-100/80">{description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 rounded-xl border border-indigo-300/20 bg-white/5 p-4"
            >
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-indigo-200/80">Trusted by students across India</p>
                        <p className="mt-1 text-2xl font-bold">50K+ members</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
                        <ArrowUpRight className="h-5 w-5" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
