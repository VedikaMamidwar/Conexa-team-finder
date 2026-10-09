import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const languages = [
    "CONEXA",
    "कोनेक्सा",
    "કોનેક્સા",
    "கோனெக்ஸா",
    "কনেক্সা",
    "కోనెక్సా",
    "ಕೋನೆಕ್ಸಾ",
    "കൊനെക്സാ",
    "ਕੋਨੇਕਸਾ",
    "કોનેક્સા",
    "CONEXA",
];

export default function SplashScreen({ onComplete }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // 10 languages in 4 seconds
        const languageInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % languages.length);
        }, 400);

        // After 4 seconds → Landing Page
        const splashTimer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => {
            clearInterval(languageInterval);
            clearTimeout(splashTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
            <AnimatePresence mode="wait">
                <motion.h1
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -12,
                    }}
                    transition={{
                        duration: 0.18,
                        ease: "easeOut",
                    }}
                    className="text-5xl font-black tracking-[6px] text-[#1E1B4B] sm:text-6xl md:text-7xl"
                >
                    {languages[index]}
                </motion.h1>
            </AnimatePresence>
        </motion.div>
    );
}