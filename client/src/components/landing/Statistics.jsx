import { motion } from "framer-motion";
import { Users, Trophy, Building2, Briefcase } from "lucide-react";

const stats = [
    {
        icon: Users,
        value: "5,000+",
        label: "Students Connected",
    },
    {
        icon: Trophy,
        value: "300+",
        label: "Hackathons",
    },
    {
        icon: Building2,
        value: "120+",
        label: "Colleges",
    },
    {
        icon: Briefcase,
        value: "1,500+",
        label: "Teams Created",
    },
];

export default function Statistics() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="uppercase tracking-[4px] text-[#14B8A6] font-semibold">
                        CONEXA in Numbers
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-[#1E1B4B]">
                        Trusted by Students Across India
                    </h2>

                    <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
                        Thousands of students are already building teams, joining
                        hackathons, and collaborating through CONEXA.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="bg-[#F8FAFC] rounded-3xl border border-slate-200 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center mx-auto">
                                    <Icon size={30} />
                                </div>

                                <h3 className="mt-6 text-4xl font-black text-[#1E1B4B]">
                                    {stat.value}
                                </h3>

                                <p className="mt-3 text-slate-600 font-medium">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}