
import User from "../models/User.js";

const stakeholderMiddleware = async (req, res, next) => {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please log in.",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (user.accountType !== "stakeholder") {
            return res.status(403).json({
                success: false,
                message: "Only stakeholders can perform this action.",
            });
        }

        if (user.accountStatus !== "active") {
            const messages = {
                pending:
                    "Your stakeholder account is awaiting admin approval.",
                rejected:
                    user.rejectionReason ||
                    "Your stakeholder application was rejected. Please contact the administrator.",
                suspended:
                    "Your stakeholder account is suspended. Please contact the administrator.",
            };

            return res.status(403).json({
                success: false,
                requiresApproval: user.accountStatus === "pending",
                accountStatus: user.accountStatus,
                message:
                    messages[user.accountStatus] ||
                    "Your stakeholder account is not active. Please contact the administrator.",
            });
        }

        req.userAccount = user;

        return next();
    } catch (error) {
        console.error("Stakeholder middleware error:", error);

        if (error.name === "CastError") {
            return res.status(401).json({
                success: false,
                message: "Invalid user authentication.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error while verifying stakeholder access.",
        });
    }
};

export default stakeholderMiddleware;
