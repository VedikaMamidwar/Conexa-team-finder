import { useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";





export default function BuildTeam() {
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

                    <div className="space-y-6">

                        <TeamHeader />

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                            {/* Left Section */}
                            <div className="xl:col-span-2 space-y-6">

                                <TeamGrid />

                                <JoinRequests />

                            </div>

                            {/* Right Section */}
                            <div className="space-y-6">

                                <PendingInvites />

                                <TeamSkills />

                                <TeamChatPreview />

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}