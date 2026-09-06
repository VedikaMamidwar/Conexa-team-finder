import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedText({ text }) {
    return (
        <AnimatePresence mode="wait">
            <motion.h1
                key={text}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold tracking-wide text-[#1E1B4B]"
            >
                {text}
            </motion.h1>
        </AnimatePresence>
    );
}