import { ChevronUp, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";

export default function Footer() {

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-[#0F172A] text-white">

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">

                    {/* Brand */}

                    <div className="lg:col-span-2">

                        <h2 className="text-4xl font-black tracking-wider">
                            CONEXA
                        </h2>

                        <p className="mt-6 text-slate-300 leading-8 max-w-md">
                            India's professional teammate finding platform for
                            hackathons, innovation challenges and college projects.
                            Connect with developers, designers and AI enthusiasts
                            from top universities.
                        </p>

                        <div className="flex gap-5 mt-8 text-2xl">

                            <FaGithub className="hover:text-cyan-400 cursor-pointer transition" />

                            <FaLinkedin className="hover:text-cyan-400 cursor-pointer transition" />

                            <FaDiscord className="hover:text-cyan-400 cursor-pointer transition" />

                            <FaInstagram className="hover:text-cyan-400 cursor-pointer transition" />

                        </div>

                    </div>

                    {/* Product */}

                    <div>

                        <h3 className="text-xl font-bold">
                            Product
                        </h3>

                        <ul className="mt-6 space-y-4 text-slate-300">

                            <li className="hover:text-white cursor-pointer">
                                Home
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Features
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Find Teammates
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Dashboard
                            </li>

                        </ul>

                    </div>

                    {/* Resources */}

                    <div>

                        <h3 className="text-xl font-bold">
                            Resources
                        </h3>

                        <ul className="mt-6 space-y-4 text-slate-300">

                            <li className="hover:text-white cursor-pointer">
                                FAQ
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Blog
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Privacy Policy
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Terms & Conditions
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-xl font-bold">
                            Contact
                        </h3>

                        <div className="mt-6 space-y-5">

                            <div className="flex gap-3">

                                <Mail size={18} className="text-cyan-400 mt-1" />

                                <span className="text-slate-300">
                                    vedika@gmail.com
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <Phone size={18} className="text-cyan-400 mt-1" />

                                <span className="text-slate-300">
                                    +91 9209074183
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <MapPin size={18} className="text-cyan-400 mt-1" />

                                <span className="text-slate-300">
                                    Nagpur, Maharashtra, India
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-16 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">

                    <p className="text-slate-400 text-center md:text-left">
                        © 2026 CONEXA. All Rights Reserved.
                    </p>

                    <p className="text-slate-400">
                        Made with ❤️ for Students & Innovators
                    </p>

                    <button
                        onClick={scrollTop}
                        className="w-12 h-12 rounded-full bg-[#1E1B4B] hover:bg-[#14B8A6] transition flex items-center justify-center"
                    >
                        <ChevronUp size={22} />
                    </button>

                </div>

            </div>

        </footer>
    );
}