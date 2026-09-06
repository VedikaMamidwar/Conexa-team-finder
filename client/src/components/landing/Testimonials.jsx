import { motion } from "framer-motion";
import { Quote, Star, Trophy } from "lucide-react";

const testimonials = [
    {
        name: "Rahul Sharma",
        role: "MERN Developer",
        college: "IIT Delhi",
        rating: 5,
        text: "CONEXA helped me find an amazing team for Smart India Hackathon. We built a healthcare solution and reached the finals.",
        achievement: "SIH Finalist",
    },
    {
        name: "Priya Patel",
        role: "UI/UX Designer",
        college: "VNIT Nagpur",
        rating: 5,
        text: "Finding designers and developers was difficult before CONEXA. Now I can connect with talented students in minutes.",
        achievement: "UI Champion",
    },
    {
        name: "Aditya Singh",
        role: "AI Engineer",
        college: "NIT Trichy",
        rating: 5,
        text: "The AI matching feature saved us time and helped us build a perfect multidisciplinary team.",
        achievement: "Hackathon Winner",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="uppercase tracking-[5px] text-[#14B8A6] font-semibold">
                        SUCCESS STORIES
                    </p>

                    <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#1E1B4B]">
                        Loved by Students Across India
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-slate-600">
                        Thousands of students have already formed successful hackathon teams using CONEXA.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 mt-20">

                    {testimonials.map((item, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                            }}
                            className="bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-lg p-8 relative"
                        >

                            <Quote
                                className="absolute top-6 right-6 text-[#14B8A6]"
                                size={32}
                            />

                            <div className="flex items-center gap-4">

                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] text-white flex items-center justify-center text-xl font-bold">
                                    {item.name.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-[#1E1B4B]">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        {item.role}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        {item.college}
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-1 mt-6">

                                {[...Array(item.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="fill-yellow-400 text-yellow-400"
                                        size={18}
                                    />
                                ))}

                            </div>

                            <p className="mt-6 leading-7 text-slate-600 italic">
                                "{item.text}"
                            </p>

                            <div className="mt-8 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                                <Trophy size={16} />

                                {item.achievement}

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
}