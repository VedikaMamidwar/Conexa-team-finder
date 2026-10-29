
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const adminMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in server .env");

            return res.status(500).json({
                success: false,
                message: "Authentication service is not configured.",
            });
        }

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Please log in as an administrator.",
            });
        }

        const token = authHeader.slice(7).trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is missing.",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ["HS256"] }
        );

        // Admin tokens must have a separate admin identity.
        if (
            !decoded ||
            typeof decoded !== "object" ||
            decoded.role !== "admin" ||
            !decoded.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Admin access is required.",
            });
        }

        // Verify the admin still exists and remains active.
        const admin = await Admin.findById(decoded.id);

        if (!admin || !admin.active) {
            return res.status(403).json({
                success: false,
                message: "Administrator account is inactive or unavailable.",
            });
        }

        req.admin = {
            id: admin._id.toString(),
            email: admin.email,
            role: "admin",
        };

        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Admin session expired. Please log in again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid admin authentication token.",
            });
        }

        console.error("Admin Middleware Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to verify administrator access.",
        });
    }
};

export default adminMiddleware;

