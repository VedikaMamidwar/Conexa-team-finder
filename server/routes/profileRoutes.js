import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// SAVE / UPDATE PROFILE
router.post("/", async (req, res) => {
    try {
        const {
            userId,
            name,
            role,
            email,
            college,
            location,
            branch,
            year,
            photo,
            resume,
            github,
            linkedin,
            portfolio,
            availability,
            bio,
            skills,
            profileCompleted,
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const profile = await Profile.findOneAndUpdate(
            { userId },
            {
                userId,
                name,
                role,
                email,
                college,
                location,
                branch,
                year,
                photo,
                resume,
                github,
                linkedin,
                portfolio,
                availability,
                bio,
                skills,
                profileCompleted,
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Profile saved successfully",
            profile,
        });
    } catch (error) {
        console.error("Profile save error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save profile",
            error: error.message,
        });
    }
});

// GET PROFILE
router.get("/:userId", async (req, res) => {
    try {
        const profile = await Profile.findOne({
            userId: req.params.userId,
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        res.status(200).json({
            success: true,
            profile,
        });
    } catch (error) {
        console.error("Get profile error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get profile",
        });
    }
});

export default router;