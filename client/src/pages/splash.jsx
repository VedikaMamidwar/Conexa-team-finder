import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import languages from "../data/languages";
import AnimatedText from "../components/Splash/AnimatedText";
import Background from "../components/Splash/Background";
import Loader from "../components/Splash/Loader";

export default function Splash() {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [showBrand, setShowBrand] = useState(false);

    useEffect(() => {
        if (index < languages.length - 1) {
            const timer = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, 500);

            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setShowBrand(true);
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [index]);

    useEffect(() => {
        if (showBrand) {
            const timer = setTimeout(() => {
                navigate("/landing");
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [showBrand, navigate]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
            <Background />

            <div className="relative z-10 flex flex-col items-center">
                {!showBrand ? (
                    <AnimatedText text={languages[index]} />
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="text-6xl md:text-8xl font-black tracking-[10px] text-[#1E1B4B]">
                                CONEXA
                            </h1>

                            <p className="mt-5 text-xl text-slate-600">
                                Where Teams Begin
                            </p>

                            <Loader />
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}