import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is CONEXA?",
        answer:
            "CONEXA is a smart platform that helps students find teammates based on skills, interests, and experience for hackathons, college projects, and startup ideas.",
    },
    {
        question: "Is CONEXA free for students?",
        answer:
            "Yes. CONEXA is completely free for students to create profiles, discover teammates, and build teams.",
    },
    {
        question: "How does teammate matching work?",
        answer:
            "CONEXA recommends teammates using your skills, preferred roles, technologies, experience level, and interests.",
    },
    {
        question: "Can I create my own team?",
        answer:
            "Yes. You can create a team, invite members, manage requests, and collaborate in one place.",
    },
    {
        question: "Can I participate in hackathons through CONEXA?",
        answer:
            "Yes. Browse hackathons, build teams, and prepare together before participating.",
    },
    {
        question: "Is my profile secure?",
        answer:
            "Absolutely. Your account is protected with secure authentication and your data is kept private.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState(null);

    return (
        <section className="py-28 bg-[#F8FAFC]">
            <div className="max-w-5xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="uppercase tracking-[4px] text-[#14B8A6] font-semibold">
                        Frequently Asked Questions
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-[#1E1B4B]">
                        Got Questions?
                    </h2>

                    <p className="mt-5 text-slate-600">
                        Everything you need to know before joining CONEXA.
                    </p>
                </motion.div>

                <div className="mt-16 space-y-5">

                    {faqs.map((faq, index) => (

                        <motion.div
                            key={index}
                            layout
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                        >

                            <button
                                onClick={() =>
                                    setOpen(open === index ? null : index)
                                }
                                className="w-full flex justify-between items-center p-6"
                            >

                                <span className="text-lg font-semibold text-left text-[#1E1B4B]">
                                    {faq.question}
                                </span>

                                <motion.div
                                    animate={{
                                        rotate: open === index ? 180 : 0,
                                    }}
                                >
                                    <ChevronDown />
                                </motion.div>

                            </button>

                            <AnimatePresence>

                                {open === index && (

                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        className="overflow-hidden"
                                    >

                                        <p className="px-6 pb-6 text-slate-600 leading-8">
                                            {faq.answer}
                                        </p>

                                    </motion.div>

                                )}

                            </AnimatePresence>

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
}