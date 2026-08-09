import { motion } from "framer-motion";
import {
    GraduationCap,
    Building2,
    Trophy,
    ShieldCheck,
} from "lucide-react";

const items = [
    {
        icon: GraduationCap,
        title: "120+ Colleges",
        desc: "Students from top engineering colleges."
    },
    {
        icon: Trophy,
        title: "300+ Hackathons",
        desc: "Join national & international hackathons."
    },
    {
        icon: Building2,
        title: "5000+ Students",
        desc: "Growing developer community."
    },
    {
        icon: ShieldCheck,
        title: "Verified Profiles",
        desc: "Safe & trusted collaboration."
    }
];

export default function Trusted() {
    return (
        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <p className="uppercase tracking-[5px] text-[#14B8A6] font-semibold">
                        Trusted Platform
                    </p>

                    <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#1E1B4B]">
                        Built For Every Engineering Student
                    </h2>

                    <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
                        Thousands of students use CONEXA to discover teammates,
                        collaborate on projects and participate in hackathons.
                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                    {items.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 text-center hover:shadow-xl transition-all"
                            >

                                <div className="w-16 h-16 rounded-2xl bg-[#1E1B4B] flex items-center justify-center mx-auto">

                                    <Icon
                                        size={30}
                                        className="text-white"
                                    />

                                </div>

                                <h3 className="mt-6 text-2xl font-bold text-[#1E1B4B]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-slate-500">
                                    {item.desc}
                                </p>

                            </motion.div>

                        )

                    })}

                </div>

            </div>

        </section>
    );
}