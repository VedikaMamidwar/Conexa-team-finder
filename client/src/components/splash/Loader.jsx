import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="w-72 mt-10">

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-1 rounded-full bg-[#14B8A6]"
            />

            <p className="text-center mt-4 text-slate-500">
                Loading...
            </p>

        </div>
    );
}