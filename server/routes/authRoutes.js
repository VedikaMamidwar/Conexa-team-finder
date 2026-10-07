import express from "express";

import {
    register,
    login,
    googleLogin,
    getProfile,
    updateProfile,
    forgotPassword,
    verifyOtp,
    resendOtp,
    resetPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================== AUTH ====================

router.post("/register", register);

router.post("/login", login);

router.post("/google", googleLogin);

// ==================== PASSWORD RESET ====================

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);

router.post("/reset-password", resetPassword);

// ==================== PROTECTED ====================

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

export default router;