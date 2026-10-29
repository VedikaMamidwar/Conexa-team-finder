
import User from "../models/User.js";
import mongoose from "mongoose";

// =============================================
// GET PENDING STAKEHOLDER APPLICATIONS
// GET /api/admin/stakeholders/pending
// Admin authentication required
// =============================================
export const getPendingStakeholders = async (req, res) => {
    try {
        const stakeholders = await User.find({
            accountType: "stakeholder",
            accountStatus: "pending",
        })
            .select(
                "name email organizationName organizationDescription website createdAt accountStatus"
            )
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            count: stakeholders.length,
            stakeholders,
        });
    } catch (error) {
        console.error("Get Pending Stakeholders Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch pending stakeholder applications.",
        });
    }
};

// =============================================
// GET ALL REVIEWED STAKEHOLDERS
// GET /api/admin/stakeholders/reviewed
// Admin authentication required
// =============================================
export const getReviewedStakeholders = async (req, res) => {
    try {
        const stakeholders = await User.find({
            accountType: "stakeholder",
            accountStatus: {
                $in: ["active", "rejected", "suspended"],
            },
        })
            .select(
                "name email organizationName organizationDescription website accountStatus reviewedAt rejectionReason createdAt"
            )
            .sort({ reviewedAt: -1, createdAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            count: stakeholders.length,
            stakeholders,
        });
    } catch (error) {
        console.error("Get Reviewed Stakeholders Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch reviewed stakeholders.",
        });
    }
};

// =============================================
// APPROVE STAKEHOLDER
// PATCH /api/admin/stakeholders/:id/approve
// Admin authentication required
// =============================================
export const approveStakeholder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid stakeholder ID.",
            });
        }

        const stakeholder = await User.findOneAndUpdate(
            {
                _id: id,
                accountType: "stakeholder",
                accountStatus: "pending",
            },
            {
                $set: {
                    accountStatus: "active",
                    reviewedBy: req.admin.id,
                    reviewedAt: new Date(),
                    rejectionReason: "",
                },
            },
            {
                new: true,
                runValidators: true,
            }
        ).select(
            "name email organizationName organizationDescription website accountType accountStatus reviewedAt"
        );

        if (!stakeholder) {
            return res.status(404).json({
                success: false,
                message:
                    "Pending stakeholder application not found. It may already have been reviewed.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stakeholder approved successfully.",
            stakeholder,
        });
    } catch (error) {
        console.error("Approve Stakeholder Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to approve stakeholder.",
        });
    }
};

// =============================================
// REJECT STAKEHOLDER
// PATCH /api/admin/stakeholders/:id/reject
// Admin authentication required
// =============================================
export const rejectStakeholder = async (req, res) => {
    try {
        const { id } = req.params;
        const reason =
            typeof req.body.reason === "string"
                ? req.body.reason.trim()
                : "";

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid stakeholder ID.",
            });
        }

        if (reason.length > 500) {
            return res.status(400).json({
                success: false,
                message: "Rejection reason must be 500 characters or fewer.",
            });
        }

        const stakeholder = await User.findOneAndUpdate(
            {
                _id: id,
                accountType: "stakeholder",
                accountStatus: "pending",
            },
            {
                $set: {
                    accountStatus: "rejected",
                    reviewedBy: req.admin.id,
                    reviewedAt: new Date(),
                    rejectionReason: reason,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        ).select(
            "name email organizationName accountType accountStatus reviewedAt rejectionReason"
        );

        if (!stakeholder) {
            return res.status(404).json({
                success: false,
                message:
                    "Pending stakeholder application not found. It may already have been reviewed.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stakeholder application rejected.",
            stakeholder,
        });
    } catch (error) {
        console.error("Reject Stakeholder Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to reject stakeholder application.",
        });
    }
};
