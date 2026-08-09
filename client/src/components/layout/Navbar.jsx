import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Features", href: "#features" },
        { name: "Demo", href: "#demo" },
        { name: "How it Works", href: "#how" },
        { name: "FAQ", href: "#faq" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#1E1B4B] flex items-center justify-center text-white font-bold text-lg">
                        C
                    </div>

                    <div>
                        <h1 className="text-2xl font-black tracking-[4px] text-[#1E1B4B]">
                            CONEXA
                        </h1>

                        <p className="text-xs text-slate-500">
                            Where Teams Begin
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}

                <nav className="hidden lg:flex items-center gap-8">

                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="relative text-slate-700 font-medium hover:text-[#1E1B4B] transition group"
                        >
                            {item.name}

                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1E1B4B] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                {/* Buttons */}

                <div className="hidden lg:flex gap-3">

                    <Link
                        to="/login"
                        className="px-5 py-2.5 rounded-xl border border-slate-300 font-medium hover:border-[#1E1B4B] hover:text-[#1E1B4B] transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] text-white font-medium hover:scale-105 transition duration-300"
                    >
                        Register
                    </Link>

                </div>

                {/* Mobile */}

                <button
                    className="lg:hidden text-[#1E1B4B]"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}

            <AnimatePresence>

                {mobileOpen && (

                    <motion.div
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -25 }}
                        className="lg:hidden bg-white border-t border-slate-200"
                    >
                        <div className="flex flex-col p-6 gap-5">

                            {navLinks.map((item) => (

                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-slate-700 hover:text-[#1E1B4B]"
                                >
                                    {item.name}
                                </a>

                            ))}

                            <Link
                                to="/login"
                                className="text-center border rounded-xl py-3"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-center bg-[#1E1B4B] text-white rounded-xl py-3"
                            >
                                Register
                            </Link>

                        </div>
                    </motion.div>

                )}

            </AnimatePresence>

        </header>
    );
}