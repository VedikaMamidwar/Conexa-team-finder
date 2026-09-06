import Sidebar from "../components/layouts/Sidebar";
import Topbar from "../components/layouts/Topbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Top Navigation */}
                <Topbar />

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}