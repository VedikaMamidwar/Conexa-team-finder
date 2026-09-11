import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
    MapPin,
    Star,
    X,
    Check,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const teammates = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "MERN Stack Developer",
        college: "IIT Delhi",
        location: "Delhi",
        match: 98,
        rating: 4.9,
        skills: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
    },
    {
        id: 2,
        name: "Priya Patel",
        role: "UI/UX Designer",
        college: "VNIT Nagpur",
        location: "Nagpur",
        match: 95,
        rating: 4.8,
        skills: ["Figma", "Adobe XD", "Canva"],
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
    },
    {
        id: 3,
        name: "Aditya Singh",
        role: "AI Engineer",
        college: "NIT Trichy",
        location: "Tamil Nadu",
        match: 97,
        rating: 5.0,
        skills: ["Python", "TensorFlow", "OpenCV"],
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
    },
];

export default function RecommendedStudents() {
    const navigate = useNavigate();

    const [connected, setConnected] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const toggleConnect = (id) => {
        setConnected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <section className="w-full">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
                        AI Recommended Teammates
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm">
                        Students matched according to your skills.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/find-teammates")}
                    className="self-start sm:self-auto text-[#14B8A6] font-semibold text-sm hover:underline flex items-center gap-1"
                >
                    View All
                    <ArrowRight size={15} />
                </button>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {teammates.map((student, index) => {

                    const isConnected = connected.includes(student.id);

                    return (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300"
                        >

                            {/* Gradient Header */}
                            <div className="relative h-16 bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6]">

                                {/* Match Badge */}
                                <span className="absolute right-3 top-3 bg-white/15 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-semibold">
                                    {student.match}% Match
                                </span>

                                {/* Avatar */}
                                <div className="absolute left-5 top-8">
                                    <div className="w-14 h-14 rounded-full border-[3px] border-white bg-white flex items-center justify-center text-lg font-bold text-[#1E1B4B] shadow-md">
                                        {student.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                        }
                                    </div>
                                </div>

                            </div>

                            {/* Content */}
                            <div className="pt-10 px-4 pb-4">

                                {/* Name + Role */}
                                <div className="flex items-start justify-between gap-2">

                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold text-[#1E1B4B] truncate">
                                            {student.name}
                                        </h3>

                                        <p className="text-xs text-slate-500 truncate mt-0.5">
                                            {student.role}
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-2 py-1 rounded-lg">
                                        <Star
                                            size={13}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                        <span className="text-xs font-semibold text-slate-700">
                                            {student.rating}
                                        </span>
                                    </div>

                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-1.5 text-slate-500 mt-3 text-xs">
                                    <MapPin size={14} />
                                    <span>{student.location}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="truncate">
                                        {student.college}
                                    </span>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1.5 mt-3">

                                    {student.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-1 bg-indigo-50 text-[#1E1B4B] rounded-md text-[10px] font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}

                                </div>

                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-2 mt-4">

                                    {/* Connect */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleConnect(student.id)
                                        }
                                        className={`rounded-lg py-2 text-xs font-semibold transition flex items-center justify-center gap-1.5 ${isConnected
                                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                : "bg-[#1E1B4B] text-white hover:bg-[#312E81]"
                                            }`}
                                    >
                                        {isConnected ? (
                                            <>
                                                <Check size={14} />
                                                Connected
                                            </>
                                        ) : (
                                            <>
                                                <span>Connect</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Profile */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedStudent(student)
                                        }
                                        className="border border-slate-200 text-[#1E1B4B] rounded-lg py-2 text-xs font-semibold hover:bg-slate-50 transition"
                                    >
                                        Profile
                                    </button>

                                </div>

                                {/* Social + View */}
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">

                                    <div className="flex items-center gap-3">

                                        <a
                                            href={student.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-slate-500 hover:text-[#1E1B4B] transition"
                                            aria-label={`${student.name} GitHub`}
                                        >
                                            <FaGithub size={17} />
                                        </a>

                                        <a
                                            href={student.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-slate-500 hover:text-blue-600 transition"
                                            aria-label={`${student.name} LinkedIn`}
                                        >
                                            <FaLinkedin size={17} />
                                        </a>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedStudent(student)
                                        }
                                        className="flex items-center gap-1 text-[#14B8A6] text-xs font-semibold hover:gap-2 transition-all"
                                    >
                                        View
                                        <ArrowRight size={14} />
                                    </button>

                                </div>

                            </div>

                        </motion.div>
                    );
                })}

            </div>

            {/* Profile Modal */}
            <AnimatePresence>

                {selectedStudent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedStudent(null)}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                        >

                            {/* Modal Header */}
                            <div className="relative bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] p-6 text-white">

                                <button
                                    type="button"
                                    onClick={() => setSelectedStudent(null)}
                                    className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
                                >
                                    <X size={17} />
                                </button>

                                <div className="w-16 h-16 rounded-full bg-white text-[#1E1B4B] flex items-center justify-center text-xl font-bold">
                                    {selectedStudent.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                    }
                                </div>

                                <h3 className="text-xl font-bold mt-3">
                                    {selectedStudent.name}
                                </h3>

                                <p className="text-white/75 text-sm">
                                    {selectedStudent.role}
                                </p>

                            </div>

                            {/* Modal Content */}
                            <div className="p-5">

                                <div className="grid grid-cols-2 gap-3">

                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-xs text-slate-500">
                                            Match Score
                                        </p>
                                        <p className="text-lg font-bold text-[#14B8A6]">
                                            {selectedStudent.match}%
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-xs text-slate-500">
                                            Rating
                                        </p>
                                        <p className="text-lg font-bold text-[#1E1B4B]">
                                            ⭐ {selectedStudent.rating}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-4 space-y-2 text-sm text-slate-600">

                                    <p>
                                        🎓 <strong>College:</strong>{" "}
                                        {selectedStudent.college}
                                    </p>

                                    <p>
                                        📍 <strong>Location:</strong>{" "}
                                        {selectedStudent.location}
                                    </p>

                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">

                                    {selectedStudent.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 bg-indigo-50 text-[#1E1B4B] rounded-full text-xs font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}

                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleConnect(selectedStudent.id);
                                        setSelectedStudent(null);
                                    }}
                                    className={`w-full mt-5 py-3 rounded-xl font-semibold transition ${connected.includes(selectedStudent.id)
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-[#1E1B4B] text-white hover:bg-[#312E81]"
                                        }`}
                                >
                                    {connected.includes(selectedStudent.id)
                                        ? "✓ Connected"
                                        : "Connect with Student"}
                                </button>

                            </div>

                        </motion.div>

                    </motion.div>
                )}

            </AnimatePresence>

        </section>
    );
}