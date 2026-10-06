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
    "ਕੋਨੇਕਸਾ",
];

export default function LanguageSwitcher() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === languages.length - 1) {
                    return 0;
                }

                return prev + 1;
            });
        }, 350);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-12 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.h2
                    key={languages[index]}
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
                        duration: 0.2,
                        ease: "easeOut",
                    }}
                    className="text-xl font-medium text-slate-500"
                >
                    {languages[index]}
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}