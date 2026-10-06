import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
    children,
    allowedAccountType,
}) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // -----------------------------------------
    // 1. Wait for AuthContext to restore user
    // -----------------------------------------
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#14B8A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-slate-600 font-medium">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    // -----------------------------------------
    // 2. No user = go to login
    // -----------------------------------------
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    // -----------------------------------------
    // 3. Account type protection
    // -----------------------------------------
    if (
        allowedAccountType &&
        user.accountType !== allowedAccountType
    ) {
        // Student trying to access stakeholder page
        if (user.accountType === "student") {
            return (
                <Navigate
                    to="/dashboard"
                    replace
                />
            );
        }

        // Stakeholder trying to access student page
        if (user.accountType === "stakeholder") {
            return (
                <Navigate
                    to="/stakeholder-dashboard"
                    replace
                />
            );
        }
    }

    // -----------------------------------------
    // 4. Authenticated + correct account type
    // -----------------------------------------
    return children;
}