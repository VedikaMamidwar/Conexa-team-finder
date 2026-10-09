
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

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />


            {/* =====================================================
                MAIN AREA
            ===================================================== */}

            <div
                className={`
                    min-h-screen
                    transition-all
                    duration-300
                    ${sidebarOpen ? "ml-[264px]" : "ml-[82px]"}
                `}
            >

                {/* =================================================
                    TOPBAR
                ================================================= */}

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <main className="p-6">

                    {/* =================================================
                        GREETING
                    ================================================= */}

                    <div className="bg-white rounded-xl shadow p-6 mb-6">

                        <h1 className="text-3xl font-bold text-[#1E1B4B]">
                            Hello, {user?.name || "Student"} 👋
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Welcome back to CONEXA
                        </p>

                    </div>


                    {/* =================================================
                        DASHBOARD GRID
                    ================================================= */}

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                        {/* =================================================
                            LEFT / MAIN CONTENT
                        ================================================= */}

                        <div className="xl:col-span-3 space-y-8">

                            <WelcomeBanner user={user} />

                            <StatsCards />

                            <QuickActions />

                            <RecommendedStudents />

                            <TeamWorkspace />

                        </div>


                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================= */}

                        <div className="space-y-6">

                            <RightSidebar />

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}
