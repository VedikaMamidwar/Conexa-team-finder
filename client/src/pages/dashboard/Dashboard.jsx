
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecommendedStudents from "../../components/dashboard/RecommendedStudents";
import TeamWorkspace from "../../components/dashboard/TeamWorkspace";
import RightSidebar from "../../components/dashboard/RightSidebar";

export default function Dashboard() {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Area */}
            <div
                className={`min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-[260px]" : "ml-[100px]"
                    } max-lg:ml-0`}
            >
                {/* Topbar */}
                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Main Content */}
                <main className="p-4 sm:p-6">
                    {/* Greeting */}
                    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                        <h1 className="text-2xl font-bold text-[#1E1B4B] sm:text-3xl">
                            Hello, {user?.name || "Student"} 👋
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Welcome back to CONEXA
                        </p>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                        {/* Left Content */}
                        <div className="space-y-8 xl:col-span-3">
                            <WelcomeBanner user={user} />
                            <StatsCards />
                            <QuickActions />
                            <RecommendedStudents />
                            <TeamWorkspace />
                        </div>

                        {/* Right Content */}
                        <div className="space-y-6">
                            <RightSidebar />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

