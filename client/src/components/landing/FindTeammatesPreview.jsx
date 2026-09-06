import { motion } from "framer-motion";
import { Search, MapPin, Star, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const skills = [
    "React",
    "Node.js",
    "Java",
    "Python",
    "MongoDB",
    "Express",
    "UI/UX",
    "AI",
    "ML",
    "Flutter",
];

const students = [
    {
        name: "Rahul Sharma",
        role: "MERN Stack Developer",
        college: "IIT Delhi",
        city: "Delhi",
        match: 98,
        online: true,
        experience: "4 Hackathons",
        projects: 18,
        skills: ["React", "Node.js", "MongoDB"],
    },
    {
        name: "Priya Patel",
        role: "UI/UX Designer",
        college: "VNIT Nagpur",
        city: "Nagpur",
        match: 95,
        online: true,
        experience: "3 Hackathons",
        projects: 22,
        skills: ["Figma", "Canva", "Adobe XD"],
    },
    {
        name: "Aditya Singh",
        role: "AI Engineer",
        college: "NIT Trichy",
        city: "Chennai",
        match: 96,
        online: false,
        experience: "5 Hackathons",
        projects: 31,
        skills: ["Python", "TensorFlow", "OpenCV"],
    },
];

export default function FindTeammatesPreview() {
    return (
        <section className="py-24 bg-[#F8FAFC]">

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="text-center">

                    <p className="uppercase tracking-[5px] text-[#14B8A6] font-semibold">
                        FIND TEAMMATES
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-[#1E1B4B]">
                        Meet Your Future Team
                    </h2>

                    <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
                        Search students by skills, college, experience and AI Match Score.
                    </p>

                </div>

                {/* Search */}

                <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-lg p-6">

                    <div className="flex items-center gap-4">

                        <Search className="text-slate-400" />

                        <input
                            className="flex-1 outline-none text-lg"
                            placeholder="Search React Developer, Java Developer..."
                        />

                        <button className="bg-[#1E1B4B] text-white px-6 py-3 rounded-xl hover:bg-indigo-900 transition">
                            Search
                        </button>

                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">

                        {skills.map((skill) => (

                            <button
                                key={skill}
                                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#1E1B4B] hover:text-white transition"
                            >
                                {skill}
                            </button>

                        ))}

                    </div>

                </div>

                {/* Cards */}

                <div className="grid lg:grid-cols-3 gap-8 mt-16">

                    {students.map((student, index) => (

                        <motion.div

                            key={index}

                            whileHover={{
                                y: -10,
                                scale: 1.02
                            }}

                            transition={{
                                duration: .3
                            }}

                            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"

                        >

                            {/* Cover */}

                            <div className="h-24 bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]"></div>

                            <div className="px-8 pb-8">

                                {/* Avatar */}

                                <div className="-mt-10 flex justify-between">

                                    <div className="relative">

                                        <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-[#1E1B4B]">

                                            {student.name.charAt(0)}

                                        </div>

                                        {student.online && (

                                            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"></span>

                                        )}

                                    </div>

                                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                                        {student.match}% Match
                                    </span>

                                </div>

                                <h3 className="mt-5 text-2xl font-bold text-[#1E1B4B]">
                                    {student.name}
                                </h3>

                                <p className="text-slate-600">
                                    {student.role}
                                </p>

                                <div className="mt-3 flex items-center gap-2 text-slate-500">

                                    <MapPin size={16} />

                                    {student.city}

                                </div>

                                <div className="mt-2 text-sm text-slate-500">
                                    {student.college}
                                </div>

                                {/* Match */}

                                <div className="mt-6">

                                    <div className="flex justify-between text-sm">

                                        <span>AI Match</span>

                                        <span>{student.match}%</span>

                                    </div>

                                    <div className="mt-2 bg-slate-200 rounded-full h-2">

                                        <div
                                            style={{ width: `${student.match}%` }}
                                            className="h-2 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#1E1B4B]"
                                        ></div>

                                    </div>

                                </div>

                                {/* Skills */}

                                <div className="flex flex-wrap gap-2 mt-6">

                                    {student.skills.map(skill => (

                                        <span
                                            key={skill}
                                            className="bg-indigo-100 text-[#1E1B4B] px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>

                                    ))}

                                </div>

                                {/* Stats */}

                                <div className="grid grid-cols-2 gap-4 mt-6">

                                    <div className="bg-slate-50 rounded-xl p-4 text-center">

                                        <h4 className="font-bold text-xl">{student.projects}</h4>

                                        <p className="text-xs text-slate-500">
                                            Projects
                                        </p>

                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-4 text-center">

                                        <h4 className="font-bold">
                                            {student.experience}
                                        </h4>

                                        <p className="text-xs text-slate-500">
                                            Experience
                                        </p>

                                    </div>

                                </div>

                                {/* Buttons */}

                                <div className="flex gap-3 mt-8">

                                    <button className="flex-1 bg-[#1E1B4B] text-white rounded-xl py-3 hover:bg-indigo-900 transition">
                                        Connect
                                    </button>

                                    <button className="w-14 rounded-xl border flex justify-center items-center hover:bg-slate-100">

                                        <MessageCircle size={20} />

                                    </button>

                                </div>

                                {/* Social */}

                                <div className="flex justify-center gap-6 mt-7 text-slate-500">

                                    <FaGithub className="text-xl hover:text-black cursor-pointer transition" />

                                    <FaLinkedin className="text-xl hover:text-blue-600 cursor-pointer transition" />

                                    <Star className="hover:text-yellow-500 cursor-pointer" />

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}