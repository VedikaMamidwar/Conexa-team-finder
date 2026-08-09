import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Upload,
    Globe,
    User,
    GraduationCap,
    BookOpen,
    FileText,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const allSkills = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Java",
    "Python",
    "C++",
    "JavaScript",
    "TypeScript",
    "UI/UX",
    "Figma",
    "Canva",
    "AI",
    "ML",
    "TensorFlow",
    "DevOps",
    "AWS",
    "Docker",
    "Git",
    "SQL",
];

export default function CompleteProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        photo: null,
        name: "",
        college: "",
        branch: "",
        year: "",
        bio: "",
        github: "",
        linkedin: "",
        portfolio: "",
        availability: "Available",
    });

    const [skills, setSkills] = useState([]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const toggleSkill = (skill) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter((s) => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            ...profile,
            skills,
        });

        // Save profile to backend later

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">

            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

                <h1 className="text-4xl font-black text-[#1E1B4B]">
                    Complete Your Profile
                </h1>

                <p className="text-slate-500 mt-2">
                    Tell us about yourself so we can recommend the best teammates.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-8"
                >

                    {/* Photo Upload */}

                    <div>

                        <label className="block font-semibold mb-3">
                            Profile Photo
                        </label>

                        <label className="w-40 h-40 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#14B8A6]">

                            <Upload size={35} />

                            <span className="text-sm mt-2">
                                Upload
                            </span>

                            <input
                                type="file"
                                hidden
                            />

                        </label>

                    </div>

                    {/* Basic Details */}

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label>Name</label>

                            <div className="relative mt-2">
                                <User className="absolute left-4 top-4 text-slate-400" />
                                <input
                                    name="name"
                                    onChange={handleChange}
                                    className="w-full h-14 rounded-xl border pl-12"
                                />
                            </div>
                        </div>

                        <div>
                            <label>College</label>

                            <div className="relative mt-2">
                                <GraduationCap className="absolute left-4 top-4 text-slate-400" />
                                <input
                                    name="college"
                                    onChange={handleChange}
                                    className="w-full h-14 rounded-xl border pl-12"
                                />
                            </div>
                        </div>

                        <div>
                            <label>Branch</label>

                            <div className="relative mt-2">
                                <BookOpen className="absolute left-4 top-4 text-slate-400" />
                                <input
                                    name="branch"
                                    onChange={handleChange}
                                    className="w-full h-14 rounded-xl border pl-12"
                                />
                            </div>
                        </div>

                        <div>
                            <label>Year</label>

                            <select
                                name="year"
                                onChange={handleChange}
                                className="w-full h-14 rounded-xl border px-4 mt-2"
                            >
                                <option>Select Year</option>
                                <option>1st Year</option>
                                <option>2nd Year</option>
                                <option>3rd Year</option>
                                <option>4th Year</option>
                            </select>
                        </div>

                    </div>

                    {/* Bio */}

                    <div>

                        <label>Bio</label>

                        <textarea
                            rows={4}
                            name="bio"
                            onChange={handleChange}
                            placeholder="Tell everyone about yourself..."
                            className="w-full border rounded-xl mt-2 p-4"
                        />

                    </div>

                    {/* Skills */}

                    <div>

                        <label className="font-semibold">
                            Skills
                        </label>

                        <div className="flex flex-wrap gap-3 mt-4">

                            {allSkills.map((skill) => (

                                <button
                                    type="button"
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    className={`px-5 py-2 rounded-full transition ${skills.includes(skill)
                                        ? "bg-[#1E1B4B] text-white"
                                        : "bg-slate-100"
                                        }`}
                                >
                                    {skill}
                                </button>

                            ))}

                        </div>

                    </div>

                    {/* Social Links */}

                    <div className="grid md:grid-cols-3 gap-5">

                        <div className="relative">
                            <Github className="absolute left-4 top-4 text-slate-400" />
                            <input
                                name="github"
                                placeholder="GitHub URL"
                                onChange={handleChange}
                                className="w-full h-14 border rounded-xl pl-12"
                            />
                        </div>

                        <div className="relative">
                            <Linkedin className="absolute left-4 top-4 text-slate-400" />
                            <input
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                onChange={handleChange}
                                className="w-full h-14 border rounded-xl pl-12"
                            />
                        </div>

                        <div className="relative">
                            <Globe className="absolute left-4 top-4 text-slate-400" />
                            <input
                                name="portfolio"
                                placeholder="Portfolio"
                                onChange={handleChange}
                                className="w-full h-14 border rounded-xl pl-12"
                            />
                        </div>

                    </div>

                    {/* Resume */}

                    <div>

                        <label className="font-semibold">
                            Resume
                        </label>

                        <label className="mt-3 flex items-center gap-3 border rounded-xl p-5 cursor-pointer">

                            <FileText />

                            Upload Resume (PDF)

                            <input
                                type="file"
                                hidden
                            />

                        </label>

                    </div>

                    {/* Availability */}

                    <div>

                        <label className="font-semibold">
                            Availability
                        </label>

                        <select
                            name="availability"
                            onChange={handleChange}
                            className="w-full h-14 rounded-xl border px-4 mt-2"
                        >
                            <option>Available</option>
                            <option>Busy</option>
                            <option>Looking for Team</option>
                        </select>

                    </div>

                    <button
                        className="w-full h-14 rounded-xl bg-[#1E1B4B] text-white text-lg font-semibold hover:bg-[#312E81] transition"
                    >
                        Complete Profile
                    </button>

                </form>

            </div>

        </div>
    );
}