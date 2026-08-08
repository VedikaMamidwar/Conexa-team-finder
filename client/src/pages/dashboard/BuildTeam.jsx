import { useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import TeamForm from "../../components/builtTeam/TeamForm";

export default function BuildTeam() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-1 flex-col">

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8">

                    <TeamForm />

                </main>

            </div>

        </div>
    );
}