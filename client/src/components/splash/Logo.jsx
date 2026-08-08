import { motion } from "framer-motion";

export default function Logo() {
    return (
        <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                duration: 1,
                ease: "easeOut",
            }}
            className="flex flex-col items-center"
        >
            <h1 className="text-7xl md:text-8xl font-black tracking-[12px] text-blue-600">
                CONEXA
            </h1>

            <p className="mt-5 text-gray-700 text-xl font-medium">
                Connect • Collaborate • Create
            </p>
        </motion.div>
    );
}