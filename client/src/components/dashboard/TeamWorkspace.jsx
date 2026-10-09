import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    Clock3,
    CheckCircle2,
    Rocket,
    ArrowRight,
    X,
    Users,
    ExternalLink,
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
    const [selectedItem, setSelectedItem] = useState(null);
    const [workspaceOpen, setWorkspaceOpen] = useState(false);

    return (
        <section className="w-full">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
                        Team Workspace
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm sm:text-base">
                        Manage your teams and project progress.
                    </p>
                </div>

                {/* Open Workspace */}
                <button
                    type="button"
                    onClick={() => setWorkspaceOpen(true)}
                    className="self-start sm:self-auto text-[#14B8A6] font-semibold flex items-center gap-1.5 text-sm hover:gap-2.5 transition-all"
                >
                    Open Workspace
                    <ArrowRight size={17} />
                </button>

            </div>

            {/* Workspace Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

                {board.map((column, index) => {

                    const Icon = column.icon;

                    return (
                        <motion.div
                            key={column.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            whileHover={{ y: -3 }}
                            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md hover:shadow-xl p-4 sm:p-5 transition-shadow duration-300"
                        >

                            {/* Column Header */}
                            <div className="flex items-center justify-between mb-4">

                                <div className="flex items-center gap-2.5 min-w-0">

                                    <div
                                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${column.color}`}
                                    >
                                        <Icon size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-[#1E1B4B] text-sm sm:text-base truncate">
                                            {column.title}
                                        </h3>

                                        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                                            {column.items.length} Items
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Items */}
                            <div className="space-y-2.5">

                                {column.items.map((item) => (

                                    <motion.button
                                        key={item.name}
                                        type="button"
                                        whileHover={{ scale: 1.015 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedItem({
                                            ...item,
                                            category: column.title,
                                            color: column.color,
                                        })}
                                        className="w-full text-left rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-3.5 hover:border-[#14B8A6] hover:bg-slate-50 transition-all duration-200"
                                    >

                                        <div className="flex items-center justify-between gap-3">

                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-[#1E1B4B] text-sm truncate">
                                                    {item.name}
                                                </h4>

                                                <p className="text-xs sm:text-sm text-slate-500 mt-1 truncate">
                                                    {item.role}
                                                </p>
                                            </div>

                                            <ArrowRight
                                                size={16}
                                                className="text-slate-300 group-hover:text-[#14B8A6] shrink-0"
                                            />

                                        </div>

                                    </motion.button>

                                ))}

                            </div>

                        </motion.div>
                    );
                })}

            </div>

            {/* Open Workspace Modal */}
            <AnimatePresence>
                {workspaceOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setWorkspaceOpen(false)}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                        >

                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] p-5 sm:p-6 text-white relative">

                                <button
                                    type="button"
                                    onClick={() => setWorkspaceOpen(false)}
                                    className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center"
                                >
                                    <X size={17} />
                                </button>

                                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                                    <Users size={22} />
                                </div>

                                <h3 className="text-xl font-bold">
                                    Team Workspace
                                </h3>

                                <p className="text-white/75 text-sm mt-1">
                                    Manage your teams, requests and projects.
                                </p>

                            </div>

                            {/* Modal Content */}
                            <div className="p-5 space-y-3">

                                {board.map((column) => {
                                    const Icon = column.icon;

                                    return (
                                        <button
                                            key={column.title}
                                            type="button"
                                            onClick={() => {
                                                setWorkspaceOpen(false);
                                                setSelectedItem({
                                                    name: column.title,
                                                    role: `${column.items.length} active items`,
                                                    category: column.title,
                                                    color: column.color,
                                                });
                                            }}
                                            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#14B8A6] hover:bg-slate-50 transition"
                                        >

                                            <div className="flex items-center gap-3">

                                                <div
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${column.color}`}
                                                >
                                                    <Icon size={18} />
                                                </div>

                                                <div className="text-left">
                                                    <p className="font-semibold text-[#1E1B4B] text-sm">
                                                        {column.title}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {column.items.length} items
                                                    </p>
                                                </div>

                                            </div>

                                            <ArrowRight
                                                size={17}
                                                className="text-slate-400"
                                            />

                                        </button>
                                    );
                                })}

                            </div>

                            <div className="px-5 pb-5">
                                <button
                                    type="button"
                                    onClick={() => setWorkspaceOpen(false)}
                                    className="w-full py-2.5 rounded-xl bg-[#1E1B4B] text-white text-sm font-semibold hover:bg-[#312E81] transition"
                                >
                                    Close
                                </button>
                            </div>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Item Details Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5 sm:p-6"
                        >

                            <div className="flex items-start justify-between">

                                <div>
                                    <span
                                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${selectedItem.color}`}
                                    >
                                        {selectedItem.category}
                                    </span>

                                    <h3 className="text-xl font-bold text-[#1E1B4B] mt-3">
                                        {selectedItem.name}
                                    </h3>

                                    <p className="text-slate-500 text-sm mt-1">
                                        {selectedItem.role}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedItem(null)}
                                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                                >
                                    <X size={17} />
                                </button>

                            </div>

                            <div className="mt-5 bg-slate-50 rounded-xl p-4">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-[#1E1B4B] flex items-center justify-center">
                                        <Rocket size={19} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#1E1B4B]">
                                            Workspace Activity
                                        </p>

                                        <p className="text-xs text-slate-500 mt-0.5">
                                            This item is part of your CONEXA workspace.
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-5">

                                <button
                                    type="button"
                                    onClick={() => setSelectedItem(null)}
                                    className="py-2.5 rounded-xl border border-slate-200 text-[#1E1B4B] text-sm font-semibold hover:bg-slate-50 transition"
                                >
                                    Close
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedItem(null)}
                                    className="py-2.5 rounded-xl bg-[#1E1B4B] text-white text-sm font-semibold hover:bg-[#312E81] transition flex items-center justify-center gap-2"
                                >
                                    Open
                                    <ExternalLink size={15} />
                                </button>

                            </div>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}