import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Users,
    Trophy,
    ArrowRight,
    Sparkles,
    Zap,
    Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { hackathons } from "../../data/hackathonData";

export default function HackathonSection() {
    const navigate = useNavigate();

    const handleViewAll = () => {
        navigate("/hackathons");
    };

    const handleViewDetails = (id) => {
        navigate(`/hackathons/${id}`);
    };

    return (
        <section className="relative overflow-hidden bg-slate-100 py-16">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
                <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                            <Sparkles className="h-4 w-4" />
                            Discover Opportunities
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl">
                            Upcoming Hackathons
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                            Find exciting hackathons, build innovative projects,
                            and connect with talented teammates.
                        </p>
                    </div>

                    <motion.button
                        type="button"
                        onClick={handleViewAll}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 self-start rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-bold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:shadow-md sm:self-auto"
                    >
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>
                </div>

                {/* Hackathon Cards */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {hackathons.slice(0, 3).map((hackathon) => (
                        <motion.div
                            key={hackathon.id}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:border-indigo-200 hover:shadow-xl"
                        >
                            {/* Card Top */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-indigo-600 p-6">
                                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
                                <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-teal-400/10" />

                                <div className="relative">
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                            {hackathon.category}
                                        </span>

                                        {hackathon.featured && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-teal-400/20 px-3 py-1 text-xs font-bold text-teal-200">
                                                <Zap className="h-3.5 w-3.5" />
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="line-clamp-2 min-h-[56px] text-xl font-extrabold leading-7 text-white">
                                        {hackathon.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-indigo-100">
                                        {hackathon.description}
                                    </p>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5">

                                {/* Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                                            <Calendar className="h-4 w-4 text-indigo-600" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Start Date
                                            </p>

                                            <p className="font-semibold text-slate-700">
                                                {hackathon.startDate}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50">
                                            <MapPin className="h-4 w-4 text-teal-600" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Mode
                                            </p>

                                            <p className="font-semibold text-slate-700">
                                                {hackathon.mode}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                                            <Users className="h-4 w-4 text-indigo-600" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Team Size
                                            </p>

                                            <p className="font-semibold text-slate-700">
                                                {hackathon.teamSize ||
                                                    "1 - 4 members"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
                                            <Trophy className="h-4 w-4 text-amber-500" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Prize Pool
                                            </p>

                                            <p className="font-semibold text-slate-700">
                                                {hackathon.prize}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <motion.button
                                        type="button"
                                        onClick={() =>
                                            handleViewDetails(hackathon.id)
                                        }
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100"
                                    >
                                        <Eye className="h-4 w-4" />
                                        Details
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={() =>
                                            handleViewDetails(hackathon.id)
                                        }
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                                    >
                                        View Hackathon
                                        <ArrowRight className="h-4 w-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}