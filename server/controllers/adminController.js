
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

// =====================================================
// ADMIN LOGIN
// POST /api/admin/login
// =====================================================

export const adminLogin = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error("JWT_SECRET is missing.");
            return res.status(500).json({
                success: false,
                message: "Server authentication is not configured.",
            });
        }

        const admin = await Admin.findOne({ email }).select("+password");

        if (!admin || !admin.active) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials.",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id.toString(),
                role: "admin",
            },
            jwtSecret,
            {
                expiresIn: "2h",
                algorithm: "HS256",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Admin login successful.",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: "admin",
            },
        });
    } catch (error) {
        console.error("Admin login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to log in as admin.",
        });
    }
};

// =====================================================
// GET CURRENT ADMIN
// GET /api/admin/me
// Requires adminMiddleware
// =====================================================

export const getCurrentAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select(
            "name email role active createdAt"
        );

        if (!admin || !admin.active) {
            return res.status(401).json({
                success: false,
                message: "Admin account is unavailable.",
            });
        }

        return res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: "admin",
            },
        });
    } catch (error) {
        console.error("Get current admin error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve admin profile.",
        });
    }
};

