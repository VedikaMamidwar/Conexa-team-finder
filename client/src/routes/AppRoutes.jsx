import { Routes, Route } from "react-router-dom";

// =====================================================
// PUBLIC
// =====================================================

import Landing from "../pages/Landing";

// =====================================================
// AUTHENTICATION
// =====================================================

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";

// =====================================================
// STUDENT DASHBOARD
// =====================================================

import CompleteProfile from "../pages/dashboard/CompleteProfile";
import Dashboard from "../pages/dashboard/Dashboard";
import BuildTeam from "../pages/dashboard/BuildTeam";
import FindTeammates from "../pages/dashboard/FindTeammates";
import Profile from "../pages/dashboard/Profile";
import Projects from "../pages/dashboard/Projects";
import Achievements from "../pages/dashboard/Achievements";
import Settings from "../pages/dashboard/Settings";
import UpcomingEvents from "../pages/dashboard/UpcomingEvents";
import DailyChallenge from "../pages/dashboard/DailyChallenge";
import DashboardNotification from "../pages/dashboard/DashboardNotification";

// =====================================================
// REAL-WORLD PROBLEMS
// =====================================================

import RealWorldProblems from "../components/dashboard/RealWorldProblems";

// =====================================================
// CHAT
// =====================================================

import ChatPage from "../pages/chat/ChatPage";

// =====================================================
// STAKEHOLDER
// =====================================================

import StakeholderDashboard from "../pages/stakeholder/StakeholderDashboard";
import CreateProblem from "../pages/stakeholder/CreateProblem";
import MyProblems from "../pages/stakeholder/MyProblems";
import StakeholderProfile from "../pages/stakeholder/StakeholderProfile";
import StudentResponses from "../pages/stakeholder/StudentResponses";

// =====================================================
// PROTECTED ROUTE
// =====================================================

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>

            {/* =====================================================
                LANDING PAGE
            ===================================================== */}

            <Route
                path="/"
                element={<Landing />}
            />

            <Route
                path="/landing"
                element={<Landing />}
            />

            {/* =====================================================
                AUTHENTICATION
            ===================================================== */}

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
                STUDENT DASHBOARD
            ===================================================== */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/find-teammates"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <FindTeammates />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/build-team"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <BuildTeam />
                    </ProtectedRoute>
                }
            />

            {/* =====================================================
                PROJECTS
            ===================================================== */}

            <Route
                path="/projects"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Projects />
                    </ProtectedRoute>
                }
            />

            {/* =====================================================
                REAL-WORLD PROBLEMS
            ===================================================== */}

            <Route
                path="/real-world-problems"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <RealWorldProblems />
                    </ProtectedRoute>
                }
            />

            {/* =====================================================
                CHAT
            ===================================================== */}

            <Route
                path="/chat"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <ChatPage />
                    </ProtectedRoute>
                }
            />

            {/* =====================================================
                STUDENT PROFILE
            ===================================================== */}

            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/achievements"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Achievements />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Settings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/events"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <UpcomingEvents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/daily-challenge"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <DailyChallenge />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard-notification"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <DashboardNotification />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <DashboardNotification />
                    </ProtectedRoute>
                }
            />

            {/* =====================================================
                STAKEHOLDER
            ===================================================== */}

            <Route
                path="/stakeholder-dashboard"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <StakeholderDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/stakeholder/create-problem"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <CreateProblem />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/stakeholder/problems"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <MyProblems />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/stakeholder/problems/:problemId/responses"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <StudentResponses />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/stakeholder/profile"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <StakeholderProfile />
                    </ProtectedRoute>
                }
            />

            {/* =====================================================
                UNKNOWN ROUTE
            ===================================================== */}

            <Route
                path="*"
                element={<Login />}
            />

        </Routes>
    );
}