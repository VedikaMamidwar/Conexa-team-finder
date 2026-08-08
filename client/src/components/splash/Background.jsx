import { motion } from "framer-motion";

export default function Background() {
    return (
        <div className="absolute inset-0 overflow-hidden">

            <motion.div
                animate={{
                    x: [0, 80, 0],
                    y: [0, -60, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                }}
                className="absolute w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[120px] top-[-120px] left-[-100px]"
            />

            <motion.div
                animate={{
                    x: [0, -70, 0],
                    y: [0, 60, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 14,
                    ease: "easeInOut",
                }}
                className="absolute w-[450px] h-[450px] bg-indigo-300/20 rounded-full blur-[120px] bottom-[-120px] right-[-80px]"
            />

        </div>
    );
}