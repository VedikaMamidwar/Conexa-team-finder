
import { Navigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#14B8A6]" />
                    <p className="mt-3 text-sm text-slate-500">
                        Checking your session...
                    </p>
                </div>
            </div>
        );
    }

    if (user) {
        if (user.accountType === "stakeholder") {
            if (user.accountStatus === "active") {
                return (
                    <Navigate
                        to="/stakeholder-dashboard"
                        replace
                    />
                );
            }

            if (user.accountStatus === "pending") {
                return (
                    <Navigate
                        to="/stakeholder-pending"
                        replace
                    />
                );
            }

            if (
                user.accountStatus === "rejected" ||
                user.accountStatus === "suspended"
            ) {
                return (
                    <Navigate
                        to="/login"
                        replace
                        state={{
                            message:
                                user.accountStatus === "rejected"
                                    ? "Your stakeholder application was rejected. Please contact support."
                                    : "Your stakeholder account is suspended. Please contact support.",
                        }}
                    />
                );
            }
        }

        if (user.accountType === "student") {
            return (
                <Navigate
                    to="/dashboard"
                    replace
                />
            );
        }
    }

    return (
        <AuthLayout left={<LeftBanner />}>
            <LoginForm />
        </AuthLayout>
    );
}