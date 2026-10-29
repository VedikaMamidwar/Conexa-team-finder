
import express from "express";

import {
    register,
    registerStakeholder,
    login,
    googleLogin,
    getProfile,
    updateProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC AUTHENTICATION ROUTES
// ==========================================

// Student registration
router.post("/register", register);

// Stakeholder registration (application starts as pending)
router.post("/register-stakeholder", registerStakeholder);

// Login for approved students and stakeholders
router.post("/login", login);

// Google login for existing accounts
router.post("/google", googleLogin);

// ==========================================
// PROTECTED PROFILE ROUTES
// ==========================================

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

export default router;

