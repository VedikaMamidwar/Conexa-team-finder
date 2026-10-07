import User from "../models/User.js";

const stakeholderMiddleware = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.accountType !== "stakeholder") {
            return res.status(403).json({
                success: false,
                message: "Only stakeholders can perform this action",
            });
        }

        req.userAccount = user;

        next();

    } catch (error) {
        console.error("Stakeholder middleware error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export default stakeholderMiddleware;