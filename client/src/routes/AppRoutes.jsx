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
import Home from "../pages/dashboard/Home";
import Explore from "../pages/dashboard/Explore";
import FindTeammates from "../pages/dashboard/FindTeammates";
import BuildTeam from "../pages/dashboard/BuildTeam";
import Profile from "../pages/dashboard/Profile";

// ================= EVENTS =================
import UpcomingEvents from "../pages/dashboard/UpcomingEvents";

// ================= DAILY CHALLENGE =================
import DailyChallenge from "../pages/dashboard/DailyChallenge";

// ================= NOTIFICATIONS =================
import DashboardNotification from "../pages/dashboard/Dashboard-notification";

// ================= ACHIEVEMENTS =================
import Achievements from "../pages/dashboard/Achievements";

// ================= SETTINGS =================
import Settings from "../pages/dashboard/Settings";

// ================= WORKSPACE =================



// ================= CHAT =================


// ================= PROTECTED ROUTE =================
import ProtectedRoute from "./ProtectedRoute";


export default function AppRoutes() {

    return (
        <Routes>

            {/* =====================================================
                PUBLIC
            ===================================================== */}

            <Route
                path="/"
                element={<Splash />}
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
                COMPLETE PROFILE
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

            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/explore"
                element={
                    <ProtectedRoute>
                        <Explore />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                TEAM
            ===================================================== */}

            <Route
                path="/find-teammates"
                element={
                    <ProtectedRoute>
                        <FindTeammates />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/team-builder"
                element={
                    <ProtectedRoute>
                        <BuildTeam />
                    </ProtectedRoute>
                }
            />

            {/* Old URL */}
            <Route
                path="/build-team"
                element={
                    <ProtectedRoute>
                        <BuildTeam />
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
                CHAT
            ===================================================== */}



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

            {/* Also allow simple notification URL */}
            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <DashboardNotification />
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
                WORKSPACE
            ===================================================== */}






        </Routes>
    );
}