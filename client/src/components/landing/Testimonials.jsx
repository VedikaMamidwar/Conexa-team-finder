import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Quote,
    Star,
    Trophy,
    Sparkles,
    ArrowRight,
    X,
    GraduationCap,
    MapPin,
    Users,
} from "lucide-react";

const testimonials = [
    {
        name: "Rahul Sharma",
        role: "MERN Developer",
        college: "IIT Delhi",
        location: "Delhi",
        rating: 5,
        achievement: "SIH Finalist",
        description:
            "Rahul is a passionate full-stack developer who loves building scalable and user-friendly web applications. During his college journey, he participated in multiple hackathons and collaborated with students from different technical backgrounds. Before discovering CONEXA, finding reliable teammates with complementary skills was one of his biggest challenges. Through CONEXA, Rahul connected with students who were interested in development, UI/UX, and problem solving. Together, they created a healthcare-focused solution for the Smart India Hackathon. Rahul handled the MERN stack architecture, API development, database integration, and deployment. His team successfully reached the final stage of the competition. Rahul believes that having the right teammates helped his team turn a simple idea into a practical solution.",
        shortDescription:
            "CONEXA helped Rahul find the right teammates for Smart India Hackathon and build a healthcare solution that reached the finals.",
        initials: "RS",
        skills: ["React", "Node.js", "MongoDB", "Express"],
        stats: {
            hackathons: "4",
            projects: "18",
        },
    },

    {
        name: "Priya Patel",
        role: "UI/UX Designer",
        college: "VNIT Nagpur",
        location: "Nagpur",
        rating: 5,
        achievement: "UI Champion",
        description:
            "Priya is a creative UI/UX designer who enjoys transforming complex ideas into simple and engaging digital experiences. While working on hackathon projects, she often found it difficult to connect with developers who understood the importance of user experience and design consistency. CONEXA made this process much easier for her. Through the platform, Priya discovered developers and students whose skills matched her project requirements. She joined a multidisciplinary team where she was responsible for user research, wireframes, interface design, prototypes, and design systems. Her team was able to build a polished product with a clear user journey and attractive interface. Priya says that CONEXA helped her understand how powerful collaboration between designers and developers can be. She now uses the platform to discover new project ideas, meet talented students, and participate in more hackathons.",
        shortDescription:
            "CONEXA helped Priya connect with talented developers and build better products through strong design and collaboration.",
        initials: "PP",
        skills: ["UI/UX", "Figma", "Canva", "Prototyping"],
        stats: {
            hackathons: "3",
            projects: "22",
        },
    },

    {
        name: "Aditya Singh",
        role: "AI Engineer",
        college: "NIT Trichy",
        location: "Chennai",
        rating: 5,
        achievement: "Hackathon Winner",
        description:
            "Aditya is an AI enthusiast who specializes in machine learning, computer vision, and intelligent application development. He had strong technical skills but wanted to work with teammates who could contribute to frontend development, design, and business ideas. Finding such a balanced team manually was time-consuming. CONEXA helped him discover students based on their skills and interests. After connecting with the right teammates, Aditya became responsible for developing the machine learning model and integrating AI capabilities into their application. The team created an innovative solution that combined artificial intelligence with a practical real-world use case. Their project received excellent feedback from judges and ultimately won a hackathon. Aditya credits the team's success to the combination of different skills and perspectives. He believes that CONEXA makes it easier for students to find people who complement their abilities instead of simply finding people with the same skills.",
        shortDescription:
            "CONEXA helped Aditya build a multidisciplinary team that combined AI, development, and design to win a hackathon.",
        initials: "AS",
        skills: ["Python", "AI", "ML", "TensorFlow"],
        stats: {
            hackathons: "5",
            projects: "31",
        },
    },
];

export default function Testimonials() {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const closeModal = () => {
        setSelectedStudent(null);
    };

    const joinConexa = () => {
        closeModal();

        setTimeout(() => {
            document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <section className="relative py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#1E1B4B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* ================= HEADER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                        <Sparkles
                            size={15}
                            className="text-[#14B8A6]"
                        />

                        <p className="uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm font-bold text-[#14B8A6]">
                            Success Stories
                        </p>
                    </div>

                    <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1B4B] leading-tight">
                        Loved by Students

                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6]">
                            Across India
                        </span>
                    </h2>

                    <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Thousands of students have already formed successful
                        hackathon teams using CONEXA.
                    </p>
                </motion.div>

                {/* ================= TESTIMONIAL CARDS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 lg:mt-16">

                    {testimonials.map((item, index) => (

                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.6,
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                            }}
                            className="group relative bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl p-5 sm:p-7 lg:p-8 overflow-hidden transition-shadow duration-300"
                        >

                            {/* Top Gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6]" />

                            {/* Hover Glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#14B8A6]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Quote Icon */}
                            <div className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                                <Quote
                                    size={20}
                                    className="text-[#14B8A6]"
                                />
                            </div>

                            {/* Student Profile */}
                            <div className="relative flex items-center gap-3 sm:gap-4">

                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#14B8A6] text-white flex items-center justify-center text-lg sm:text-xl font-black shadow-lg"
                                >
                                    {item.initials}
                                </motion.div>

                                <div className="min-w-0 pr-10">
                                    <h3 className="font-bold text-base sm:text-lg text-[#1E1B4B] truncate">
                                        {item.name}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-500 truncate">
                                        {item.role}
                                    </p>

                                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                                        {item.college}
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-5">

                                {[...Array(item.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{
                                            opacity: 0,
                                            scale: 0,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay:
                                                0.3 +
                                                index * 0.15 +
                                                i * 0.05,
                                        }}
                                    >
                                        <Star
                                            size={17}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    </motion.div>
                                ))}

                                <span className="ml-2 text-xs font-semibold text-slate-400">
                                    5.0
                                </span>
                            </div>

                            {/* Short Story */}
                            <div className="relative mt-5">

                                <span className="absolute -top-4 -left-1 text-4xl font-black text-[#14B8A6]/20">
                                    “
                                </span>

                                <p className="text-sm sm:text-base leading-7 text-slate-600 italic pl-4">
                                    {item.shortDescription}
                                </p>
                            </div>

                            {/* Achievement + Arrow */}
                            <div className="mt-6 flex items-center justify-between gap-3 pt-5 border-t border-slate-200">

                                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold">
                                    <Trophy size={15} />

                                    {item.achievement}
                                </div>

                                {/* FUNCTIONAL ARROW */}
                                <button
                                    onClick={() =>
                                        setSelectedStudent(item)
                                    }
                                    className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#14B8A6] hover:border-[#14B8A6]/40 hover:bg-[#14B8A6]/5 hover:translate-x-1 transition-all duration-300 shadow-sm"
                                    aria-label={`Read ${item.name}'s full story`}
                                >
                                    <ArrowRight size={18} />
                                </button>

                            </div>
                        </motion.div>
                    ))}
                </div>






            </div>

            {/* ================= STUDENT DETAILS MODAL ================= */}
            <AnimatePresence>
                {selectedStudent && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-[100] bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-4"
                    >

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: 30,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
                        >

                            {/* Modal Header Gradient */}
                            <div className="relative bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] px-5 sm:px-8 py-7 sm:py-9 text-white overflow-hidden">

                                <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

                                {/* Close */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                                    aria-label="Close modal"
                                >
                                    <X size={20} />
                                </button>

                                <div className="relative flex items-center gap-4 pr-10">

                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-xl sm:text-2xl font-black shrink-0">
                                        {selectedStudent.initials}
                                    </div>

                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-black">
                                            {selectedStudent.name}
                                        </h2>

                                        <p className="text-white/80 text-sm sm:text-base mt-1">
                                            {selectedStudent.role}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-5 sm:p-8">

                                {/* Basic Information */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

                                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                                        <GraduationCap
                                            size={20}
                                            className="text-[#14B8A6] mb-2"
                                        />

                                        <p className="text-xs text-slate-400">
                                            College
                                        </p>

                                        <p className="font-bold text-[#1E1B4B] text-sm mt-1">
                                            {selectedStudent.college}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                                        <MapPin
                                            size={20}
                                            className="text-[#14B8A6] mb-2"
                                        />

                                        <p className="text-xs text-slate-400">
                                            Location
                                        </p>

                                        <p className="font-bold text-[#1E1B4B] text-sm mt-1">
                                            {selectedStudent.location}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                                        <Trophy
                                            size={20}
                                            className="text-[#14B8A6] mb-2"
                                        />

                                        <p className="text-xs text-slate-400">
                                            Achievement
                                        </p>

                                        <p className="font-bold text-[#1E1B4B] text-sm mt-1">
                                            {selectedStudent.achievement}
                                        </p>
                                    </div>

                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-6">

                                    <div className="flex gap-1">
                                        {[...Array(selectedStudent.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    size={18}
                                                    className="fill-yellow-400 text-yellow-400"
                                                />
                                            )
                                        )}
                                    </div>

                                    <span className="text-sm font-bold text-slate-500">
                                        {selectedStudent.rating}.0 Rating
                                    </span>

                                </div>

                                {/* About */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">

                                        <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                                            <Users
                                                size={18}
                                                className="text-[#14B8A6]"
                                            />
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-[#1E1B4B]">
                                            Student Story
                                        </h3>

                                    </div>

                                    <p className="text-sm sm:text-base text-slate-600 leading-7">
                                        {selectedStudent.description}
                                    </p>
                                </div>

                                {/* Skills */}
                                <div className="mt-7">

                                    <h3 className="font-bold text-[#1E1B4B] mb-3">
                                        Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-2">

                                        {selectedStudent.skills.map(
                                            (skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-2 rounded-xl bg-[#1E1B4B]/5 border border-[#1E1B4B]/10 text-[#1E1B4B] text-xs sm:text-sm font-semibold"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}

                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 mt-7">

                                    <div className="text-center p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                                        <p className="text-2xl font-black text-[#1E1B4B]">
                                            {selectedStudent.stats.hackathons}
                                        </p>

                                        <p className="text-xs text-slate-500 mt-1">
                                            Hackathons
                                        </p>
                                    </div>

                                    <div className="text-center p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                                        <p className="text-2xl font-black text-[#14B8A6]">
                                            {selectedStudent.stats.projects}
                                        </p>

                                        <p className="text-xs text-slate-500 mt-1">
                                            Projects
                                        </p>
                                    </div>

                                </div>

                                {/* Modal Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-7">

                                    <button
                                        onClick={joinConexa}
                                        className="flex-1 px-6 py-3.5 rounded-xl bg-[#1E1B4B] text-white font-bold hover:bg-[#312E81] active:scale-95 transition flex items-center justify-center gap-2"
                                    >
                                        Join CONEXA
                                        <ArrowRight size={18} />
                                    </button>

                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
}