import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    HelpCircle,
    MessageCircleQuestion,
} from "lucide-react";

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
        <section
            id="faq"
            className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#14B8A6]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#1E1B4B]/10 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Small Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-[#1E1B4B] flex items-center justify-center shadow-lg"
                    >
                        <MessageCircleQuestion
                            size={28}
                            className="text-white"
                        />
                    </motion.div>

                    <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#14B8A6] font-semibold text-xs sm:text-sm">
                        Frequently Asked Questions
                    </p>

                    <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] leading-tight">
                        Got Questions?
                    </h2>

                    <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600">
                        Everything you need to know before joining CONEXA.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="mt-10 sm:mt-14 lg:mt-16 grid lg:grid-cols-2 gap-4 sm:gap-5">

                    {faqs.map((faq, index) => {
                        const isOpen = open === index;

                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.4,
                                }}
                                className={`
                                    group
                                    bg-white
                                    rounded-2xl
                                    border
                                    overflow-hidden
                                    transition-all
                                    duration-300
                                    ${isOpen
                                        ? "border-[#14B8A6]/40 shadow-lg"
                                        : "border-slate-200 shadow-sm hover:border-[#1E1B4B]/20 hover:shadow-md"
                                    }
                                `}
                            >
                                {/* Question Button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpen(isOpen ? null : index)
                                    }
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center gap-3 sm:gap-4 text-left p-4 sm:p-5 lg:p-6"
                                >
                                    {/* Number */}
                                    <span
                                        className={`
                                            flex-shrink-0
                                            w-9 h-9
                                            sm:w-10 sm:h-10
                                            rounded-xl
                                            flex items-center justify-center
                                            text-xs sm:text-sm
                                            font-bold
                                            transition-all
                                            duration-300
                                            ${isOpen
                                                ? "bg-[#14B8A6] text-white"
                                                : "bg-[#1E1B4B]/10 text-[#1E1B4B] group-hover:bg-[#1E1B4B] group-hover:text-white"
                                            }
                                        `}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Question */}
                                    <span className="flex-1 text-sm sm:text-base lg:text-lg font-semibold text-[#1E1B4B] leading-6">
                                        {faq.question}
                                    </span>

                                    {/* Arrow */}
                                    <motion.span
                                        animate={{
                                            rotate: isOpen ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.25 }}
                                        className={`
                                            flex-shrink-0
                                            w-8 h-8
                                            rounded-full
                                            flex items-center justify-center
                                            transition-colors
                                            ${isOpen
                                                ? "bg-[#14B8A6] text-white"
                                                : "bg-slate-100 text-slate-600"
                                            }
                                        `}
                                    >
                                        <ChevronDown size={18} />
                                    </motion.span>
                                </button>

                                {/* Answer */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 sm:px-5 lg:px-6 pb-5 sm:pb-6">
                                                <div className="ml-12 sm:ml-14 border-l-2 border-[#14B8A6]/30 pl-4 sm:pl-5">
                                                    <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>




            </div>
        </section>
    );
}