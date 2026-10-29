
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import stakeholderRoutes from "./routes/stakeholderRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import ensureAdmin from "./utils/ensureAdmin.js";

dotenv.config();

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json({ limit: "15mb" }));

app.use(
    express.urlencoded({
        extended: true,
        limit: "15mb",
    })
);

// =====================================================
// ROUTES
// =====================================================

// Authentication
app.use("/api/auth", authRoutes);

// Notifications
app.use("/api/notifications", notificationRoutes);

// User profiles
app.use("/api/profile", profileRoutes);

// Admin login and profile
app.use("/api/admin", adminRoutes);

// Admin-only stakeholder approval
app.use("/api/admin/stakeholders", stakeholderRoutes);

// Real-world problems: create, view, edit, delete, and interact
app.use("/api/problems", problemRoutes);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CONEXA API is running.",
    });
});

// =====================================================
// 404 HANDLER
// Keep this AFTER all route registrations.
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl} `,
    });
});

// =====================================================
// SERVER STARTUP
// =====================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await ensureAdmin();

        app.listen(PORT, () => {
            console.log(`CONEXA server running on port ${PORT} `);
            console.log("Problems API: http://localhost:" + PORT + "/api/problems");
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
