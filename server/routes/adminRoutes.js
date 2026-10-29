
import express from "express";

import {
    adminLogin,
    getCurrentAdmin,
} from "../controllers/adminController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// =============================================
// PUBLIC ADMIN LOGIN
// POST /api/admin/login
// =============================================
router.post("/login", adminLogin);

// =============================================
// PROTECTED ADMIN ROUTES
// =============================================
router.get("/me", adminMiddleware, getCurrentAdmin);

export default router;

