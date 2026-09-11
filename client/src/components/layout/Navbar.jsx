import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Navbar shadow/background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Features", href: "#features" },
        { name: "Demo", href: "#demo" },
        { name: "How it Works", href: "#how" },
        { name: "FAQ", href: "#faq" },
        { name: "Contact", href: "#contact" },
    ];

    // Handle navbar section navigation
    const handleNavClick = (e, href) => {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = 80;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }

        // Close mobile menu
        setMobileOpen(false);
    };

    // Logo click - go to top
    const handleLogoClick = (e) => {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        setMobileOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
                    : "bg-white"
                }`}
        >
            {/* Navbar Container */}
            <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

                {/* ================= LOGO ================= */}
                <Link
                    to="/"
                    onClick={handleLogoClick}
                    className="flex items-center gap-3"
                >
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

                {/* ================= DESKTOP MENU ================= */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) =>
                                handleNavClick(e, item.href)
                            }
                            className="relative text-slate-700 font-medium hover:text-[#1E1B4B] transition group"
                        >
                            {item.name}

                            {/* Underline */}
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1E1B4B] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                {/* ================= DESKTOP BUTTONS ================= */}
                <div className="hidden lg:flex items-center gap-3">

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

                {/* ================= MOBILE MENU BUTTON ================= */}
                <button
                    type="button"
                    className="lg:hidden text-[#1E1B4B]"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {mobileOpen ? (
                        <X size={28} />
                    ) : (
                        <Menu size={28} />
                    )}
                </button>
            </div>

            {/* ================= MOBILE MENU ================= */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden overflow-hidden bg-white border-t border-slate-200 shadow-lg"
                    >
                        <div className="flex flex-col p-6 gap-5">

                            {/* Mobile Navigation Links */}
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) =>
                                        handleNavClick(e, item.href)
                                    }
                                    className="text-slate-700 hover:text-[#1E1B4B] font-medium transition"
                                >
                                    {item.name}
                                </a>
                            ))}

                            {/* Login */}
                            <Link
                                to="/login"
                                onClick={() =>
                                    setMobileOpen(false)
                                }
                                className="text-center border border-slate-300 rounded-xl py-3 font-medium hover:border-[#1E1B4B] hover:text-[#1E1B4B] transition"
                            >
                                Login
                            </Link>

                            {/* Register */}
                            <Link
                                to="/register"
                                onClick={() =>
                                    setMobileOpen(false)
                                }
                                className="text-center bg-[#1E1B4B] text-white rounded-xl py-3 font-medium hover:scale-[1.02] transition"
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