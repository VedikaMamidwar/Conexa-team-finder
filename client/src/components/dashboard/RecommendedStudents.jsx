import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
    MapPin,
    Star,
    Sparkles,
    Users,
    ArrowRight,
} from "lucide-react";

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
    },
];

export default function RecommendedStudents() {
    return (
        <section>

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-[#1E1B4B]">
                        AI Recommended Teammates
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Students matched according to your skills.
                    </p>

                </div>

                <button className="text-[#14B8A6] font-semibold hover:underline">
                    View All
                </button>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {teammates.map((student, index) => (

                    <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden"
                    >

                        {/* Header */}

                        <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] h-24 relative">

                            <div className="absolute left-6 top-12">

                                <div className="w-20 h-20 rounded-full border-4 border-white bg-white flex items-center justify-center text-2xl font-bold text-[#1E1B4B] shadow-lg">

                                    {student.name.charAt(0)}

                                </div>

                            </div>

                        </div>

                        <div className="pt-14 px-6 pb-6">

                            <div className="flex justify-between">

                                <div>

                                    <h3 className="text-xl font-bold text-[#1E1B4B]">
                                        {student.name}
                                    </h3>

                                    <p className="text-slate-500">
                                        {student.role}
                                    </p>

                                </div>

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {student.match}% Match
                                </span>

                            </div>

                            <div className="flex items-center gap-2 text-slate-500 mt-4">

                                <MapPin size={16} />

                                {student.location}

                            </div>

                            <div className="flex items-center gap-2 mt-3">

                                <Star
                                    size={18}
                                    className="fill-yellow-400 text-yellow-400"
                                />

                                {student.rating}

                            </div>

                            <div className="flex flex-wrap gap-2 mt-5">

                                {student.skills.map((skill) => (

                                    <span
                                        key={skill}
                                        className="px-3 py-2 bg-indigo-100 text-[#1E1B4B] rounded-full text-xs font-medium"
                                    >
                                        {skill}
                                    </span>

                                ))}

                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">

                                <button className="bg-[#1E1B4B] text-white rounded-xl py-3 hover:bg-[#312E81] transition">

                                    Connect

                                </button>

                                <button className="border rounded-xl py-3 hover:bg-slate-100 transition">

                                    Profile

                                </button>

                            </div>

                            <div className="flex justify-between items-center mt-6">

                                <div className="flex gap-4">

                                    <FaGithub size={20} />
                                    <FaLinkedin size={20} />

                                </div>

                                <button className="flex items-center gap-2 text-[#14B8A6] font-semibold">

                                    View

                                    <ArrowRight size={18} />

                                </button>

                            </div>

                        </div>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}