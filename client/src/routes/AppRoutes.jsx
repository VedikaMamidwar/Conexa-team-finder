import { Routes, Route } from "react-router-dom";

// ==================== PUBLIC ====================
import Splash from "../pages/Splash";
import Landing from "../pages/Landing";

// ==================== AUTHENTICATION ====================
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";

// ==================== STUDENT DASHBOARD ====================
import CompleteProfile from "../pages/dashboard/CompleteProfile";
import Dashboard from "../pages/dashboard/Dashboard";
import BuildTeam from "../pages/dashboard/BuildTeam";
import FindTeammates from "../pages/dashboard/FindTeammates";
import Profile from "../pages/dashboard/Profile";
import Achievements from "../pages/dashboard/Achievements";
import Settings from "../pages/dashboard/Settings";
import UpcomingEvents from "../pages/dashboard/UpcomingEvents";
import DailyChallenge from "../pages/dashboard/DailyChallenge";

// IMPORTANT:
// Make sure the actual file name is:
// src/pages/dashboard/Dashboard-notification.jsx
import DashboardNotification from "../pages/dashboard/DashboardNotification";

// ==================== CHAT ====================
import ChatPage from "../pages/chat/ChatPage";

// ==================== PROTECTED ROUTE ====================
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>

            {/* =====================================================
                PUBLIC ROUTES
            ===================================================== */}
            <Route path="/" element={<Splash />} />

            <Route path="/landing" element={<Landing />} />


            {/* =====================================================
                AUTHENTICATION
            ===================================================== */}
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

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


            {/* =====================================================
                PROFILE SETUP
            ===================================================== */}
            <Route
                path="/complete-profile"
                element={
                    <ProtectedRoute>
                        <CompleteProfile />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                DASHBOARD
            ===================================================== */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                FIND TEAMMATES
            ===================================================== */}
            <Route
                path="/find-teammates"
                element={
                    <ProtectedRoute>
                        <FindTeammates />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                BUILD TEAM
            ===================================================== */}
            <Route
                path="/build-team"
                element={
                    <ProtectedRoute>
                        <BuildTeam />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                CHAT
            ===================================================== */}
            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                PROFILE
            ===================================================== */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                ACHIEVEMENTS
            ===================================================== */}
            <Route
                path="/achievements"
                element={
                    <ProtectedRoute>
                        <Achievements />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                SETTINGS
            ===================================================== */}
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                EVENTS
            ===================================================== */}
            <Route
                path="/events"
                element={
                    <ProtectedRoute>
                        <UpcomingEvents />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                DAILY CHALLENGE
            ===================================================== */}
            <Route
                path="/daily-challenge"
                element={
                    <ProtectedRoute>
                        <DailyChallenge />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                NOTIFICATIONS
            ===================================================== */}
            <Route
                path="/dashboard-notification"
                element={
                    <ProtectedRoute>
                        <DashboardNotification />
                    </ProtectedRoute>
                }
            />

            {/* Optional shorter URL */}
            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <DashboardNotification />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}