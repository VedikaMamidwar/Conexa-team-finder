import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// =====================================================
// ROUTES
// =====================================================

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import problemInterestRoutes from "./routes/problemInterestRoutes.js";


// =====================================================
// ENVIRONMENT VARIABLES
// =====================================================

dotenv.config();


// =====================================================
// APP
// =====================================================

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// =====================================================
// BASIC TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CONEXA Backend API is running",
    });
});


// =====================================================
// API ROUTES
// =====================================================

// Authentication
app.use(
    "/api/auth",
    authRoutes
);

// Student / Stakeholder Profile
app.use(
    "/api/profile",
    profileRoutes
);

// Stakeholder Problems
app.use(
    "/api/problems",
    problemRoutes
);

// Problem Interests
app.use(
    "/api/problem-interests",
    problemInterestRoutes
);


// =====================================================
// 404 API ROUTE
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((error, req, res, next) => {
    console.error(
        "Global server error:",
        error
    );

    res.status(
        error.status || 500
    ).json({
        success: false,
        message:
            error.message ||
            "Internal server error",
    });
});


// =====================================================
// MONGODB CONNECTION
// =====================================================

const PORT =
    process.env.PORT || 5000;

const MONGO_URI =
    process.env.MONGO_URI;


if (!MONGO_URI) {
    console.error(
        "❌ MONGO_URI is missing in .env file"
    );

    process.exit(1);
}


mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log(
            "✅ MongoDB connected successfully"
        );

        // =================================================
        // START SERVER
        // =================================================

        app.listen(
            PORT,
            () => {
                console.log(
                    `🚀 CONEXA server running on port ${PORT}`
                );

                console.log(
                    `🌐 API: http://localhost:${PORT}`
                );

                console.log(
                    `📌 Problems API: http://localhost:${PORT}/api/problems`
                );
            }
        );
    })
    .catch((error) => {
        console.error(
            "❌ MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    });