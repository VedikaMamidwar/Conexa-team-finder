import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    MapPin,
    Users,
    Trophy,
    ArrowRight,
    X,
    ExternalLink,
} from "lucide-react";

const hackathons = [
    {
        id: 1,
        title: "Smart India Hackathon 2026",
        organizer: "Government of India",
        date: "12 Sept 2026",
        mode: "Online",
        prize: "₹1,00,000",
        members: "2-6 Members",
        color: "from-blue-600 to-indigo-700",
    },
    {
        id: 2,
        title: "HackNova",
        organizer: "Google Developer Groups",
        date: "20 Sept 2026",
        mode: "Hybrid",
        prize: "₹50,000",
        members: "3-5 Members",
        color: "from-cyan-500 to-teal-600",
    },
    {
        id: 3,
        title: "CodeFest 2026",
        organizer: "Microsoft Learn",
        date: "30 Sept 2026",
        mode: "Offline",
        prize: "₹75,000",
        members: "2-4 Members",
        color: "from-purple-600 to-indigo-700",
    },
];

export default function HackathonSection() {
    const navigate = useNavigate();
    const [selectedHackathon, setSelectedHackathon] = useState(null);

    return (
        <section className="w-full">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
                        Trending Hackathons
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm sm:text-base">
                        Join competitions and build your dream team.
                    </p>
                </div>

                {/* View All */}
                <button
                    type="button"
                    onClick={() => navigate("/hackathons")}
                    className="self-start sm:self-auto text-[#14B8A6] font-semibold flex items-center gap-1.5 text-sm hover:gap-2.5 transition-all"
                >
                    View All
                    <ArrowRight size={16} />
                </button>

            </div>

            {/* Hackathon Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

                {hackathons.map((hackathon, index) => (

                    <motion.div
                        key={hackathon.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl overflow-hidden border border-slate-200 transition-shadow duration-300"
                    >

                        {/* Card Header */}
                        <div
                            className={`relative min-h-[105px] sm:min-h-[115px] bg-gradient-to-r ${hackathon.color} p-4 sm:p-5 text-white`}
                        >

                            <div className="pr-10">

                                <h3 className="font-bold text-base sm:text-lg leading-6">
                                    {hackathon.title}
                                </h3>

                                <p className="text-xs sm:text-sm opacity-90 mt-1.5">
                                    {hackathon.organizer}
                                </p>

                            </div>

                            {/* Trophy */}
                            <div className="absolute right-4 top-4 w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                                <Trophy size={19} />
                            </div>

                        </div>

                        {/* Card Content */}
                        <div className="p-4 sm:p-5">

                            {/* Details */}
                            <div className="space-y-2.5">

                                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                                    <Calendar
                                        size={16}
                                        className="text-[#14B8A6] shrink-0"
                                    />
                                    <span>{hackathon.date}</span>
                                </div>

                                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                                    <MapPin
                                        size={16}
                                        className="text-[#14B8A6] shrink-0"
                                    />
                                    <span>{hackathon.mode}</span>
                                </div>

                                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                                    <Users
                                        size={16}
                                        className="text-[#14B8A6] shrink-0"
                                    />
                                    <span>{hackathon.members}</span>
                                </div>

                            </div>

                            {/* Bottom */}
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">

                                <div>
                                    <p className="text-[11px] sm:text-xs text-slate-500">
                                        Prize Pool
                                    </p>

                                    <h2 className="text-lg sm:text-xl font-bold text-[#1E1B4B]">
                                        {hackathon.prize}
                                    </h2>
                                </div>

                                {/* Join */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedHackathon(hackathon)
                                    }
                                    className="bg-[#1E1B4B] hover:bg-[#312E81] active:scale-95 text-white px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                                >
                                    Join
                                </button>

                            </div>

                        </div>

                    </motion.div>

                ))}

            </div>

            {/* Hackathon Details Modal */}
            <AnimatePresence>

                {selectedHackathon && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedHackathon(null)}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
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
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                        >

                            {/* Modal Header */}
                            <div
                                className={`relative bg-gradient-to-r ${selectedHackathon.color} p-5 sm:p-6 text-white`}
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedHackathon(null)
                                    }
                                    className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
                                >
                                    <X size={17} />
                                </button>

                                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                                    <Trophy size={22} />
                                </div>

                                <h3 className="text-xl font-bold pr-8">
                                    {selectedHackathon.title}
                                </h3>

                                <p className="text-white/80 text-sm mt-1">
                                    {selectedHackathon.organizer}
                                </p>

                            </div>

                            {/* Modal Content */}
                            <div className="p-5 sm:p-6">

                                <div className="grid grid-cols-2 gap-3">

                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <Calendar
                                            size={17}
                                            className="text-[#14B8A6]"
                                        />

                                        <p className="text-xs text-slate-500 mt-2">
                                            Date
                                        </p>

                                        <p className="text-sm font-semibold text-[#1E1B4B] mt-0.5">
                                            {selectedHackathon.date}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <MapPin
                                            size={17}
                                            className="text-[#14B8A6]"
                                        />

                                        <p className="text-xs text-slate-500 mt-2">
                                            Mode
                                        </p>

                                        <p className="text-sm font-semibold text-[#1E1B4B] mt-0.5">
                                            {selectedHackathon.mode}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <Users
                                            size={17}
                                            className="text-[#14B8A6]"
                                        />

                                        <p className="text-xs text-slate-500 mt-2">
                                            Team Size
                                        </p>

                                        <p className="text-sm font-semibold text-[#1E1B4B] mt-0.5">
                                            {selectedHackathon.members}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <Trophy
                                            size={17}
                                            className="text-[#14B8A6]"
                                        />

                                        <p className="text-xs text-slate-500 mt-2">
                                            Prize
                                        </p>

                                        <p className="text-sm font-semibold text-[#1E1B4B] mt-0.5">
                                            {selectedHackathon.prize}
                                        </p>
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3 mt-5">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedHackathon(null)
                                        }
                                        className="py-2.5 rounded-xl border border-slate-200 text-[#1E1B4B] text-sm font-semibold hover:bg-slate-50 transition"
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedHackathon(null);
                                            navigate("/hackathons");
                                        }}
                                        className="py-2.5 rounded-xl bg-[#1E1B4B] text-white text-sm font-semibold hover:bg-[#312E81] transition flex items-center justify-center gap-2"
                                    >
                                        Explore
                                        <ExternalLink size={15} />
                                    </button>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </section>
    );
}