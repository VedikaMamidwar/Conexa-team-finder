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
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">

            {/* ================= SIDEBAR ================= */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />


            {/* ================= MAIN AREA ================= */}

            <div
                className={`
                    min-h-screen
                    flex
                    flex-col
                    transition-all
                    duration-300
                    ${sidebarOpen
                        ? "lg:ml-72"
                        : "lg:ml-24"
                    }
                `}
            >

                {/* ================= TOPBAR ================= */}

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />


                {/* ================= CONTENT ================= */}

                <main
                    className="
                        flex-1
                        px-3
                        py-4
                        sm:px-4
                        sm:py-5
                        lg:px-6
                        lg:py-6
                    "
                >

                    {/* ================= GREETING ================= */}

                    <section
                        className="
                            relative
                            overflow-hidden
                            mb-5
                            rounded-2xl
                            bg-white
                            border
                            border-slate-200
                            px-5
                            py-5
                            shadow-sm
                        "
                    >

                        {/* Decorative Circle */}

                        <div
                            className="
                                absolute
                                -right-10
                                -top-12
                                h-36
                                w-36
                                rounded-full
                                bg-[#14B8A6]/10
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-16
                                right-24
                                h-32
                                w-32
                                rounded-full
                                bg-[#1E1B4B]/5
                            "
                        />


                        {/* Greeting Content */}

                        <div className="relative z-10">

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    text-[#14B8A6]
                                "
                            >
                                Welcome back 👋
                            </p>


                            <h1
                                className="
                                    mt-1
                                    text-2xl
                                    sm:text-3xl
                                    font-black
                                    leading-tight
                                    text-[#1E1B4B]
                                "
                            >
                                Hello, {user?.name || "Student"}!
                            </h1>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    sm:text-sm
                                    text-slate-500
                                "
                            >
                                Ready to find your perfect team and
                                build something amazing?
                            </p>

                        </div>

                    </section>


                    {/* ================= DASHBOARD GRID ================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-5
                            xl:grid-cols-12
                        "
                    >

                        {/* ================= LEFT / MAIN ================= */}

                        <div
                            className="
                                min-w-0
                                space-y-5
                                xl:col-span-8
                                2xl:col-span-9
                            "
                        >

                            {/* Welcome */}

                            <WelcomeBanner />


                            {/* Statistics */}

                            <StatsCards />


                            {/* Quick Actions */}

                            <QuickActions />


                            {/* Recommended Students */}

                            <RecommendedStudents />


                            {/* Team Workspace */}

                            <TeamWorkspace />


                            {/* Hackathons */}

                            <HackathonSection />

                        </div>


                        {/* ================= RIGHT SIDEBAR ================= */}

                        <div
                            className="
                                min-w-0
                                xl:col-span-4
                                2xl:col-span-3
                            "
                        >

                            <div
                                className="
                                    space-y-5
                                    xl:sticky
                                    xl:top-24
                                "
                            >

                                <RightSidebar />

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}