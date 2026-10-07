import React from "react";

export default function DashboardNotification() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">
            <div className="mx-auto max-w-5xl">

                <h1 className="text-3xl font-bold text-[#1E1B4B]">
                    Notifications
                </h1>

                <p className="mt-2 text-slate-500">
                    Stay updated with your latest Conexa activities.
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-xl">
                            🔔
                        </div>

                        <div>
                            <h2 className="font-semibold text-[#1E1B4B]">
                                No new notifications
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                You're all caught up!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}