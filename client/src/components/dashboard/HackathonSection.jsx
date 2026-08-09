import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Users,
    Trophy,
    ArrowRight,
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
    return (
        <section>

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-[#1E1B4B]">
                        Trending Hackathons
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Join competitions and build your dream team.
                    </p>

                </div>

                <button className="text-[#14B8A6] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    View All
                    <ArrowRight size={18} />
                </button>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {hackathons.map((hackathon, index) => (

                    <motion.div
                        key={hackathon.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200"
                    >

                        <div className={`h-28 bg-gradient-to-r ${hackathon.color} p-6 text-white`}>

                            <div className="flex justify-between">

                                <div>

                                    <h3 className="font-bold text-xl">
                                        {hackathon.title}
                                    </h3>

                                    <p className="text-sm opacity-90 mt-1">
                                        {hackathon.organizer}
                                    </p>

                                </div>

                                <Trophy size={30} />

                            </div>

                        </div>

                        <div className="p-6">

                            <div className="space-y-4">

                                <div className="flex items-center gap-3">

                                    <Calendar size={18} className="text-[#14B8A6]" />

                                    {hackathon.date}

                                </div>

                                <div className="flex items-center gap-3">

                                    <MapPin size={18} className="text-[#14B8A6]" />

                                    {hackathon.mode}

                                </div>

                                <div className="flex items-center gap-3">

                                    <Users size={18} className="text-[#14B8A6]" />

                                    {hackathon.members}

                                </div>

                            </div>

                            <div className="mt-6 flex justify-between items-center">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Prize Pool
                                    </p>

                                    <h2 className="text-2xl font-bold text-[#1E1B4B]">
                                        {hackathon.prize}
                                    </h2>

                                </div>

                                <button className="bg-[#1E1B4B] hover:bg-[#312E81] text-white px-5 py-3 rounded-xl transition">
                                    Join
                                </button>

                            </div>

                        </div>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}