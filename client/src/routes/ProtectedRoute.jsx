
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
    children,
    allowedAccountType,
}) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // ==================== LOADING ====================
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm font-medium text-slate-600">
                    Loading your account...
                </p>
            </div>
        );
    }

    // ==================== AUTHENTICATION ====================
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    const accountType = user.accountType;
    const accountStatus = user.accountStatus || user.status;

    // ==================== ACCOUNT TYPE VALIDATION ====================
    if (
        accountType !== "student" &&
        accountType !== "stakeholder"
    ) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    message:
                        "Account type is missing. Please log in again.",
                }}
            />
        );
    }

    // ==================== STUDENT ROUTE RESTRICTIONS ====================
    if (accountType === "student") {
        // Students cannot access stakeholder-only pages.
        if (allowedAccountType === "stakeholder") {
            return (
                <Navigate
                    to="/dashboard"
                    replace
                />
            );
        }

        // Students cannot access the stakeholder pending page.
        if (location.pathname === "/stakeholder-pending") {
            return (
                <Navigate
                    to="/dashboard"
                    replace
                />
            );
        }

        return children;
    }

    // ==================== STAKEHOLDER APPROVAL ====================
    if (accountType === "stakeholder") {
        // Pending stakeholders can access only the pending page.
        if (accountStatus === "pending") {
            if (location.pathname !== "/stakeholder-pending") {
                return (
                    <Navigate
                        to="/stakeholder-pending"
                        replace
                    />
                );
            }

            return children;
        }

        // Rejected or suspended stakeholder accounts.
        if (
            accountStatus === "rejected" ||
            accountStatus === "suspended"
        ) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                    <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-lg">
                        <div className="mb-4 text-4xl">
                            <span role="img" aria-label="Restricted">
                                🔒
                            </span>
                        </div>

                        <h1 className="text-2xl font-black text-red-700">
                            Account Access Restricted
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            {accountStatus === "rejected"
                                ? "Your stakeholder application was rejected. Please contact the CONEXA team."
                                : "Your account has been suspended. Please contact support."}
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                window.location.replace("/login");
                            }}
                            className="mt-6 rounded-xl bg-[#1E1B4B] px-6 py-3 font-semibold text-white transition hover:bg-[#312E81]"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            );
        }

        // Never allow access when stakeholder status is missing or invalid.
        if (accountStatus !== "active") {
            return (
                <Navigate
                    to="/login"
                    replace
                    state={{
                        message:
                            "Your stakeholder account status could not be verified. Please log in again or contact support.",
                    }}
                />
            );
        }

        // Approved stakeholders cannot access student-only pages.
        if (allowedAccountType === "student") {
            return (
                <Navigate
                    to="/stakeholder-dashboard"
                    replace
                />
            );
        }

        // Approved stakeholders cannot access the pending page.
        if (location.pathname === "/stakeholder-pending") {
            return (
                <Navigate
                    to="/stakeholder-dashboard"
                    replace
                />
            );
        }

        return children;
    }

    return (
        <Navigate
            to="/login"
            replace
        />
    );
}
