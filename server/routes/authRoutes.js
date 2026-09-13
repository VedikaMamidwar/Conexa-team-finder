import express from "express";

import {
    register,
    login,
    getProfile,
    updateProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================

router.post("/register", register);

// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

router.post("/login", login);

// =====================================================
// GET PROFILE
// GET /api/auth/profile
// Protected
// =====================================================

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

// =====================================================
// UPDATE PROFILE
// PUT /api/auth/profile
// Protected
// =====================================================

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

export default router;