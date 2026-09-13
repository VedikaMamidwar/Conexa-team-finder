import express from "express";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=====================================================
GET LOGGED-IN USER PROFILE
GET /api/profile
=====================================================
*/
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await Profile.findOne({ userId });

        // If profile doesn't exist yet, create basic profile
        if (!profile) {
            const user = await User.findById(userId).select("-password");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const newProfile = await Profile.create({
                userId: user._id,
                name: user.name || "",
                role: "MERN Developer",
                email: user.email || "",
                college: user.college || "",
                location: "",
                branch: user.branch || "",
                year: user.year || "",
                photo: null,
                resume: null,
                github: "",
                linkedin: "",
                portfolio: "",
                availability: "Available",
                bio: "",
                skills: [],
                profileCompleted: false,
            });

            return res.status(200).json({
                success: true,
                profile: newProfile,
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


/*
=====================================================
SAVE / UPDATE LOGGED-IN USER PROFILE
PUT /api/profile
=====================================================
*/
router.put("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const {
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

        // Basic validation
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const cleanSkills = Array.isArray(skills)
            ? skills
                .map((skill) => String(skill).trim())
                .filter(Boolean)
            : [];

        const profile = await Profile.findOneAndUpdate(
            { userId },

            {
                userId,
                name: name.trim(),
                role: role || "MERN Developer",
                email: email.trim(),
                college: college || "",
                location: location || "",
                branch: branch || "",
                year: year || "",
                photo: photo || null,
                resume: resume || null,
                github: github || "",
                linkedin: linkedin || "",
                portfolio: portfolio || "",
                availability: availability || "Available",
                bio: bio || "",
                skills: cleanSkills,
                profileCompleted: Boolean(profileCompleted),
            },

            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        /*
        Optional:
        Also keep basic education information
        synced with User collection.
        */
        await User.findByIdAndUpdate(userId, {
            name: name.trim(),
            email: email.trim(),
            college: college || "",
            branch: branch || "",
            year: year || "",
        });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
        });
    } catch (error) {
        console.error("Profile update error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
});


/*
=====================================================
DELETE PROFILE
DELETE /api/profile
=====================================================
*/
router.delete("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        await Profile.findOneAndDelete({ userId });

        res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });
    } catch (error) {
        console.error("Delete profile error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete profile",
        });
    }
});


export default router;