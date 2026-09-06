import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            icon: "🏠",
            path: "/dashboard",
        },
        {
            name: "Find Teammates",
            icon: "👥",
            path: "/find-teammates",
        },
        {
            name: "Team Builder",
            icon: "🛠️",
            path: "/build-team",
        },
        {
            name: "Hackathons",
            icon: "🏆",
            path: "/hackathons",
        },
        {
            name: "My Profile",
            icon: "👤",
            path: "/profile",
        },
    ];

    const extraItems = [
        {
            name: "Achievements",
            icon: "🏅",
            path: "/achievements",
        },
        {
            name: "Upcoming Events",
            icon: "📅",
            path: "/events",
        },
        {
            name: "Daily Challenge",
            icon: "🎯",
            path: "/daily-challenge",
        },
        {
            name: "Notifications",
            icon: "🔔",
            path: "/notifications",
        },
        {
            name: "Settings",
            icon: "⚙️",
            path: "/settings",
        },
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <aside
            className={`${sidebarOpen ? "w-64" : "w-20"
                } min-h-screen border-r border-slate-200 bg-white transition-all duration-300`}
        >
            {/* Logo */}
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
                {sidebarOpen && (
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-2xl font-extrabold tracking-wide text-[#1E1B4B]"
                    >
                        CONEXA
                    </button>
                )}

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-lg p-2 text-xl text-slate-600 transition hover:bg-slate-100"
                >
                    {sidebarOpen ? "←" : "→"}
                </button>
            </div>

            {/* Main Navigation */}
            <nav className="px-3 py-5">

                {sidebarOpen && (
                    <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Main Menu
                    </p>
                )}

                <div className="space-y-1">

                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${isActive(item.path)
                                    ? "bg-[#1E1B4B] text-white shadow-sm"
                                    : "text-slate-600 hover:bg-indigo-50 hover:text-[#1E1B4B]"
                                }`}
                        >
                            <span className="text-xl">
                                {item.icon}
                            </span>

                            {sidebarOpen && (
                                <span className="text-sm font-semibold">
                                    {item.name}
                                </span>
                            )}
                        </button>
                    ))}

                </div>

                {/* Explore */}
                {sidebarOpen && (
                    <p className="mb-3 mt-8 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Explore
                    </p>
                )}

                <div className="space-y-1">

                    {extraItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${isActive(item.path)
                                    ? "bg-[#1E1B4B] text-white shadow-sm"
                                    : "text-slate-600 hover:bg-indigo-50 hover:text-[#1E1B4B]"
                                }`}
                        >
                            <span className="text-xl">
                                {item.icon}
                            </span>

                            {sidebarOpen && (
                                <span className="text-sm font-semibold">
                                    {item.name}
                                </span>
                            )}
                        </button>
                    ))}

                </div>

            </nav>

            {/* Bottom Card */}
            {sidebarOpen && (
                <div className="mx-4 mt-4 rounded-2xl bg-indigo-50 p-4">

                    <div className="text-2xl">
                        🚀
                    </div>

                    <h3 className="mt-2 text-sm font-bold text-[#1E1B4B]">
                        Build Your Team
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Find students with the skills you need for your next
                        hackathon.
                    </p>

                    <button
                        onClick={() => navigate("/find-teammates")}
                        className="mt-3 w-full rounded-lg bg-[#1E1B4B] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#2b2768]"
                    >
                        Find Teammates →
                    </button>

                </div>
            )}

        </aside>
    );
}