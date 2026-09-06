import { motion } from "framer-motion";

const nodes = [
    { top: "20%", left: "30%" },
    { top: "30%", left: "60%" },
    { top: "45%", left: "40%" },
    { top: "65%", left: "55%" },
    { top: "70%", left: "28%" },
    { top: "55%", left: "72%" },
];

export default function NetworkAnimation() {
    return (
        <div className="absolute inset-0 overflow-hidden">

            {nodes.map((node, index) => (
                <motion.div
                    key={index}
                    className="absolute w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-300"
                    style={{
                        top: node.top,
                        left: node.left,
                    }}
                    animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: index * 0.2,
                    }}
                />
            ))}

            <svg className="absolute inset-0 w-full h-full">

                <line
                    x1="30%"
                    y1="20%"
                    x2="60%"
                    y2="30%"
                    stroke="#60A5FA"
                    strokeWidth="2"
                />

                <line
                    x1="60%"
                    y1="30%"
                    x2="40%"
                    y2="45%"
                    stroke="#60A5FA"
                    strokeWidth="2"
                />

                <line
                    x1="40%"
                    y1="45%"
                    x2="28%"
                    y2="70%"
                    stroke="#60A5FA"
                    strokeWidth="2"
                />

                <line
                    x1="40%"
                    y1="45%"
                    x2="72%"
                    y2="55%"
                    stroke="#60A5FA"
                    strokeWidth="2"
                />

            </svg>

        </div>
    );
}