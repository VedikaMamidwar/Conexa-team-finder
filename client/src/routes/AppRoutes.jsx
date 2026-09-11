import { Routes, Route } from "react-router-dom";

// ================= PUBLIC =================
import Splash from "../pages/Splash";
import Landing from "../pages/Landing";

// ================= AUTHENTICATION =================
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";

// ================= DASHBOARD =================
import CompleteProfile from "../pages/dashboard/CompleteProfile";
import Dashboard from "../pages/dashboard/Dashboard";
import BuildTeam from "../pages/dashboard/BuildTeam";
import FindTeammates from "../pages/dashboard/FindTeammates";

// ================= CHAT =================
import ChatPage from "../pages/chat/ChatPage";

// ================= PROTECTED ROUTE =================
import ProtectedRoute from "./ProtectedRoute";


export default function AppRoutes() {
    return (
        <Routes>

            {/* ================= PUBLIC ================= */}

            <Route
                path="/"
                element={<Splash />}
            />

            <Route
                path="/landing"
                element={<Landing />}
            />


            {/* ================= AUTHENTICATION ================= */}

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/verify-otp"
                element={<VerifyOTP />}
            />

            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />


            {/* ================= COMPLETE PROFILE ================= */}

            <Route
                path="/complete-profile"
                element={
                    <ProtectedRoute>
                        <CompleteProfile />
                    </ProtectedRoute>
                }
            />


            {/* ================= DASHBOARD ================= */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />


            {/* ================= TEAM ================= */}

            <Route
                path="/find-teammates"
                element={
                    <ProtectedRoute>
                        <FindTeammates />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/build-team"
                element={
                    <ProtectedRoute>
                        <BuildTeam />
                    </ProtectedRoute>
                }
            />


            {/* ================= CHAT ================= */}

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}