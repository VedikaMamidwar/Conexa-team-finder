
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in backend .env");

            return res.status(500).json({
                success: false,
                message: "Authentication service is not configured.",
            });
        }

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please log in.",
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

        if (
            !decoded ||
            typeof decoded !== "object" ||
            !decoded.id ||
            decoded.role === "admin"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid user authentication token.",
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User account not found. Please log in again.",
            });
        }

        if (!["student", "stakeholder"].includes(user.accountType)) {
            return res.status(403).json({
                success: false,
                message: "Invalid account type.",
            });
        }

        // Attach authenticated user details for controllers.
        req.user = {
            id: user._id.toString(),
            _id: user._id.toString(),
            email: user.email,
            accountType: user.accountType,
            accountStatus: user.accountStatus,
        };

        req.userAccount = user;

        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Your session has expired. Please log in again.",
            });
        }

        if (
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token. Please log in again.",
            });
        }

        if (error.name === "CastError") {
            return res.status(401).json({
                success: false,
                message: "Invalid user authentication.",
            });
        }

        console.error("Authentication Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while verifying authentication.",
        });
    }
};

export default authMiddleware;
