import { motion } from "framer-motion";

export default function AuthLayout({ left, children }) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">

            {/* Left Section */}
            <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#14B8A6]" />

                {/* Glow Effects */}
                <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl" />

                <div className="relative z-10 flex items-center justify-center w-full px-12">
                    {left}
                </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex items-center justify-center px-6 py-10"
            >
                <div className="w-full max-w-md">
                    {children}
                </div>
            </motion.div>

        </div>
    );
}