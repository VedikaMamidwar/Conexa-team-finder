import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecommendedStudents from "../../components/dashboard/RecommendedStudents";
import TeamWorkspace from "../../components/dashboard/TeamWorkspace";
import HackathonSection from "../../components/dashboard/HackathonSection";
import RightSidebar from "../../components/dashboard/RightSidebar";

export default function Dashboard() {

    const { user } = useAuth();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col">

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="p-6">

                    {/* Greeting */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <h1 className="text-3xl font-bold text-[#1E1B4B]">
                            Hello, {user?.name || "Student"} 👋
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Welcome back to CONEXA
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                        <div className="xl:col-span-3 space-y-8">

                            <WelcomeBanner />

                            <StatsCards />

                            <QuickActions />

                            <RecommendedStudents />

                            <TeamWorkspace />

                            <HackathonSection />

                        </div>

                        <div className="space-y-6">

                            <RightSidebar />

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}