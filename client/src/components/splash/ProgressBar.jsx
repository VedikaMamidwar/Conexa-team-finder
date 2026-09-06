import { motion } from "framer-motion";

export default function ProgressBar() {
    return (
        <div className="w-72 mt-12 bg-gray-200 rounded-full overflow-hidden">

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                    duration: 4,
                }}
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            />

        </div>
    );
}