import express from "express";

import {
    register,
    login,
    googleLogin,
    getProfile,
    updateProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication
router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

// Profile
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

export default router;