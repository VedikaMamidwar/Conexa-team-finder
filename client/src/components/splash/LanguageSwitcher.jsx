import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const languages = [
    "CONEXA",
    "कोनेक्सा",
    "કોનેક્સા",
    "கோனெக்ஸா",
    "কনেক্সা",
];

export default function LanguageSwitcher() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % languages.length);
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">

            <motion.h2
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl text-gray-500 mt-8"
            >
                {languages[index]}
            </motion.h2>

        </AnimatePresence>
    );
}