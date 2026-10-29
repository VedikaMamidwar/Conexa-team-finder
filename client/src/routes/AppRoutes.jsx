
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// ==================== PUBLIC ====================
import SplashScreen from "../components/splash/SplashScreen";
import Landing from "../pages/Landing";

// ==================== AUTHENTICATION ====================
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";

// ==================== ADMIN ====================
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

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
import DashboardNotification from "../pages/dashboard/DashboardNotification";
import RealWorldProblems from "../pages/dashboard/RealWorldProblems";
import Analytics from "../pages/dashboard/Analytics";
import Projects from "../pages/dashboard/Projects";

// ==================== HACKATHONS & TEAMS ====================
import HackathonHome from "../pages/dashboard/HackathonHome";
import ExploreHackathons from "../pages/dashboard/ExploreHackathons";
import MyHackathons from "../pages/dashboard/MyHackathons";
import HackathonDetails from "../pages/dashboard/HackathonDetails";
import HackathonRegistration from "../pages/dashboard/HackathonRegistration";
import MyTeam from "../pages/dashboard/MyTeam";

// ==================== AI CHATBOT ====================
import AiChatbot from "../components/Chatbot/AIChatbot";

// ==================== STAKEHOLDER ====================
import StakeholderDashboard from "../pages/stakeholder/StakeholderDashboard";
import CreateProblem from "../pages/stakeholder/CreateProblem";
import MyProblems from "../pages/stakeholder/MyProblems";

// ==================== CHAT ====================
import ChatPage from "../pages/chat/ChatPage";

// ==================== ROUTE GUARD ====================
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            {/* ==================== PUBLIC ==================== */}

            <Route
                path="/"
                element={
                    <SplashScreen
                        onComplete={() => {
                            window.location.replace("/landing");
                        }}
                    />
                }
            />

            <Route
                path="/landing"
                element={<Landing />}
            />

            {/* ==================== AUTHENTICATION ==================== */}

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

            {/* ==================== ADMIN ==================== */}

            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />

            <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
            />

            {/* ==================== STUDENT PROFILE ==================== */}

            <Route
                path="/complete-profile"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <CompleteProfile />
                    </ProtectedRoute>
                }
            />

            {/* ==================== STUDENT DASHBOARD ==================== */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* ==================== MY PROJECTS ==================== */}

            <Route
                path="/projects"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Projects />
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

            {/* ==================== MY TEAMS ==================== */}

            {/* Sidebar uses /teams */}
            <Route
                path="/teams"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <MyTeam />
                    </ProtectedRoute>
                }
            />

            {/* Backward-compatible singular URL */}
            <Route
                path="/team"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <MyTeam />
                    </ProtectedRoute>
                }
            />

            {/* ==================== PROFILE ==================== */}

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
                    <ProtectedRoute allowedAccountType="student">
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

            {/* ==================== ANALYTICS ==================== */}

            <Route
                path="/analytics"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <Analytics />
                    </ProtectedRoute>
                }
            />

            {/* ==================== EVENTS ==================== */}

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

            {/* ==================== NOTIFICATIONS ==================== */}

            <Route
                path="/dashboard-notification"
                element={
                    <ProtectedRoute>
                        <DashboardNotification />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <DashboardNotification />
                    </ProtectedRoute>
                }
            />

            {/* ==================== HACKATHONS ==================== */}

            <Route
                path="/hackathons"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <HackathonHome />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/explore-hackathons"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <ExploreHackathons />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-hackathons"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <MyHackathons />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hackathons/:id/register"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <HackathonRegistration />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hackathons/:id"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <HackathonDetails />
                    </ProtectedRoute>
                }
            />

            {/* ==================== REAL-WORLD PROBLEMS ==================== */}

            <Route
                path="/real-world-problems"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <RealWorldProblems />
                    </ProtectedRoute>
                }
            />

            {/* ==================== AI CHATBOT ==================== */}

            <Route
                path="/ai-chatbot"
                element={
                    <ProtectedRoute allowedAccountType="student">
                        <AiChatbot />
                    </ProtectedRoute>
                }
            />

            {/* ==================== CHAT ==================== */}

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />

            {/* ==================== STAKEHOLDER DASHBOARD ==================== */}

            <Route
                path="/stakeholder-dashboard"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <StakeholderDashboard />
                    </ProtectedRoute>
                }
            />

            {/* ==================== STAKEHOLDER PROBLEMS ==================== */}

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

            {/* Existing dashboard button uses /my-problems */}
            <Route
                path="/my-problems"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <Navigate
                            to="/stakeholder/problems"
                            replace
                        />
                    </ProtectedRoute>
                }
            />

            {/* Old pending URL: no verification page */}
            <Route
                path="/stakeholder-pending"
                element={
                    <ProtectedRoute allowedAccountType="stakeholder">
                        <Navigate
                            to="/stakeholder-dashboard"
                            replace
                        />
                    </ProtectedRoute>
                }
            />

            {/* ==================== FALLBACK ==================== */}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}
