
import { Routes, Route } from "react-router-dom";

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

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>

            {/* =====================================================
                PUBLIC ROUTES
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
                AUTHENTICATION ROUTES
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
                PROFILE
            ===================================================== */}

            <Route
                path="/complete-profile"
                element={<CompleteProfile />}
            />


            {/* =====================================================
                PROTECTED ROUTES
            ===================================================== */}

            {/* Build Team */}
            <Route
                path="/build-team"
                element={
                    <ProtectedRoute>
                        <BuildTeam />
                    </ProtectedRoute>
                }
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

        </Routes>
    );
}
