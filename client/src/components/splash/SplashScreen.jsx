import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const languages = [
    "CONEXA",
    "कोनेक्सा",
    "કોનેક્સા",
    "கோனெக்ஸா",
    "কনেক্সা",
    "కోనెక్సా",
    "ಕೋನೆಕ್ಸಾ",
    "കൊനെക്സാ",
    "ਪੰਜਾਬੀ",
    "કોનેક્સા",
];

export default function SplashScreen() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const languageInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % languages.length);
        }, 400);

        const splashTimer = setTimeout(() => {
            navigate("/landing", { replace: true });
        }, 4000);

        return () => {
            clearInterval(languageInterval);
            clearTimeout(splashTimer);
        };
    }, [navigate]);

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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
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
