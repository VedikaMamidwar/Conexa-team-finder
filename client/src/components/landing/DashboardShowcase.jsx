import { motion } from "framer-motion";
import {
    Search,
    Bell,
    Users,
    Trophy,
    MessageCircle,
    Calendar,
    Star,
    UserPlus,
} from "lucide-react";

const members = [
    { name: "Aarav Sharma", role: "React Developer", match: "98%" },
    { name: "Priya Patel", role: "UI/UX Designer", match: "95%" },
    { name: "Rohan Verma", role: "Backend Developer", match: "93%" },
];

export default function DashboardShowcase() {
    return (
        <section id="demo" className="py-28 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="uppercase tracking-[4px] text-[#14B8A6] font-semibold">
                        Live Platform Preview
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-[#1E1B4B]">
                        Experience CONEXA Before You Join
                    </h2>

                    <p className="mt-5 text-slate-600 max-w-3xl mx-auto">
                        Explore a live preview of the dashboard and see how easy it is
                        to discover teammates, manage projects, and prepare for
                        hackathons.
                    </p>
                </motion.div>

                {/* Dashboard */}
                <motion.div
                    initial={{ opacity: 0, scale: .96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .7 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl"
                >

                    <div className="grid lg:grid-cols-12">

                        {/* Sidebar */}
                        <div className="lg:col-span-3 bg-[#1E1B4B] text-white p-8">

                            <h2 className="text-3xl font-black mb-10">
                                CONEXA
                            </h2>

                            <div className="space-y-6">

                                <div className="flex gap-3 items-center">
                                    <Users size={20} />
                                    Dashboard
                                </div>

                                <div className="flex gap-3 items-center">
                                    <Search size={20} />
                                    Find Teammates
                                </div>

                                <div className="flex gap-3 items-center">
                                    <Trophy size={20} />
                                    Hackathons
                                </div>

                                <div className="flex gap-3 items-center">
                                    <MessageCircle size={20} />
                                    Chat
                                </div>

                                <div className="flex gap-3 items-center">
                                    <Calendar size={20} />
                                    My Teams
                                </div>

                            </div>

                        </div>

                        {/* Main */}
                        <div className="lg:col-span-9">

                            {/* Top */}
                            <div className="flex justify-between items-center border-b p-6">

                                <div className="bg-slate-100 rounded-xl px-4 py-3 flex items-center gap-3 w-72">
                                    <Search size={18} />
                                    <span className="text-slate-500">
                                        Search teammates...
                                    </span>
                                </div>

                                <Bell className="text-[#1E1B4B]" />

                            </div>

                            <div className="p-8">

                                {/* Cards */}
                                <div className="grid md:grid-cols-3 gap-5">

                                    <div className="rounded-2xl bg-indigo-50 p-6">
                                        <h3 className="text-slate-500">
                                            Team Match
                                        </h3>

                                        <p className="text-5xl font-black text-[#1E1B4B] mt-3">
                                            96%
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-cyan-50 p-6">
                                        <h3 className="text-slate-500">
                                            Connections
                                        </h3>

                                        <p className="text-5xl font-black text-[#1E1B4B] mt-3">
                                            42
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-green-50 p-6">
                                        <h3 className="text-slate-500">
                                            Active Teams
                                        </h3>

                                        <p className="text-5xl font-black text-[#1E1B4B] mt-3">
                                            5
                                        </p>
                                    </div>

                                </div>

                                {/* Members */}
                                <h3 className="mt-12 text-2xl font-bold text-[#1E1B4B]">
                                    Recommended Teammates
                                </h3>

                                <div className="grid md:grid-cols-3 gap-5 mt-6">

                                    {members.map((member) => (

                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            key={member.name}
                                            className="bg-white border rounded-2xl p-6 shadow-sm"
                                        >

                                            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-[#1E1B4B]">
                                                {member.name[0]}
                                            </div>

                                            <h4 className="mt-5 font-bold">
                                                {member.name}
                                            </h4>

                                            <p className="text-slate-500">
                                                {member.role}
                                            </p>

                                            <div className="mt-4 flex justify-between">

                                                <span className="text-green-600 font-semibold">
                                                    {member.match}
                                                </span>

                                                <Star className="text-yellow-500" />

                                            </div>

                                            <button className="mt-6 w-full bg-[#1E1B4B] text-white rounded-xl py-3 flex justify-center items-center gap-2 hover:bg-[#312E81] transition">
                                                <UserPlus size={18} />
                                                Connect
                                            </button>

                                        </motion.div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}