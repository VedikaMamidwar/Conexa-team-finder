import { Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash";
import Landing from "../pages/Landing";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";

import CompleteProfile from "../pages/dashboard/CompleteProfile";
import Dashboard from "../pages/dashboard/Dashboard";
import BuildTeam from "../pages/dashboard/BuildTeam";

import FindTeammates from "../pages/dashboard/FindTeammates";
import Profile from "../pages/dashboard/Profile";
import Achievements from "../pages/dashboard/Achievements";
import Settings from "../pages/dashboard/Settings";
import UpcomingEvents from "../pages/dashboard/UpcomingEvents";
import DailyChallenge from "../pages/dashboard/DailyChallenge";
import DashboardNotification from "../pages/dashboard/DashboardNotification";

import ProtectedRoute from "./ProtectedRoute";

import ChatPage from "../pages/chat/ChatPage";

export default function AppRoutes() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Splash />} />
            <Route path="/landing" element={<Landing />} />

            {/* Authentication */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Profile Setup */}
            <Route
                path="/complete-profile"
                element={<CompleteProfile />}
            />

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Team */}
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

            {/* Chat */}
            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />

            {/* User */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/achievements"
                element={
                    <ProtectedRoute>
                        <Achievements />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            {/* Events */}
            <Route
                path="/events"
                element={
                    <ProtectedRoute>
                        <UpcomingEvents />
                    </ProtectedRoute>
                }
            />

            {/* Daily Challenge */}
            <Route
                path="/daily-challenge"
                element={
                    <ProtectedRoute>
                        <DailyChallenge />
                    </ProtectedRoute>
                }
            />

            {/* Notifications */}
            <Route
                path="/dashboard-notification"
                element={
                    <ProtectedRoute>
                        <DashboardNotification />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}