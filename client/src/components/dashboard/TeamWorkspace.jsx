import { motion } from "framer-motion";
import {
    Clock3,
    CheckCircle2,
    Rocket,
    ArrowRight,
} from "lucide-react";

const board = [
    {
        title: "Pending Requests",
        color: "bg-amber-100 text-amber-700",
        icon: Clock3,
        items: [
            {
                name: "Smart India Hackathon",
                role: "Frontend Developer",
            },
            {
                name: "CodeSprint",
                role: "Backend Developer",
            },
        ],
    },
    {
        title: "Accepted Teams",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle2,
        items: [
            {
                name: "AI Vision",
                role: "React Developer",
            },
            {
                name: "EduConnect",
                role: "Full Stack",
            },
        ],
    },
    {
        title: "Active Projects",
        color: "bg-blue-100 text-blue-700",
        icon: Rocket,
        items: [
            {
                name: "CONEXA",
                role: "MERN Stack",
            },
            {
                name: "HackVerse",
                role: "Team Lead",
            },
        ],
    },
];

export default function TeamWorkspace() {
    return (
        <section>

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-[#1E1B4B]">
                        Team Workspace
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Manage your teams and project progress.
                    </p>

                </div>

                <button className="text-[#14B8A6] font-semibold flex items-center gap-2">
                    Open Workspace
                    <ArrowRight size={18} />
                </button>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {board.map((column, index) => {

                    const Icon = column.icon;

                    return (

                        <motion.div
                            key={column.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-white rounded-3xl border border-slate-200 shadow-lg p-5"
                        >

                            <div className="flex items-center justify-between mb-5">

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${column.color}`}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-[#1E1B4B]">
                                            {column.title}
                                        </h3>

                                        <p className="text-xs text-slate-400">
                                            {column.items.length} Items
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="space-y-4">

                                {column.items.map((item) => (

                                    <motion.div
                                        key={item.name}
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        className="rounded-2xl border border-slate-200 p-4 hover:border-[#14B8A6] transition cursor-pointer"
                                    >

                                        <h4 className="font-semibold text-[#1E1B4B]">
                                            {item.name}
                                        </h4>

                                        <p className="text-sm text-slate-500 mt-1">
                                            {item.role}
                                        </p>

                                    </motion.div>

                                ))}

                            </div>

                        </motion.div>

                    );
                })}

            </div>

        </section>
    );
}