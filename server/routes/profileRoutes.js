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

        // If profile doesn't exist, create a basic profile
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

                role:
                    user.accountType === "stakeholder"
                        ? user.stakeholderRole || "Stakeholder"
                        : user.role || "MERN Developer",

                email: user.email || "",

                college: user.college || "",

                location: user.location || "",

                branch: user.branch || "",

                year: user.year || "",

                photo: user.photo || null,

                resume: user.resume || null,

                github: user.github || "",

                linkedin: user.linkedin || "",

                portfolio: user.portfolio || "",

                availability: user.availability || "Available",

                bio:
                    user.accountType === "stakeholder"
                        ? user.organizationDescription || ""
                        : user.bio || "",

                skills: Array.isArray(user.skills)
                    ? user.skills
                    : [],

                profileCompleted:
                    Boolean(user.profileCompleted),
            });

            return res.status(200).json({
                success: true,

                profile: newProfile,

                accountType: user.accountType || "student",

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    accountType:
                        user.accountType || "student",
                    organizationName:
                        user.organizationName || "",
                    organizationType:
                        user.organizationType || "",
                    stakeholderRole:
                        user.stakeholderRole || "",
                    website:
                        user.website || "",
                },
            });
        }

        // Get latest User information
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,

            profile,

            accountType:
                user.accountType || "student",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,

                accountType:
                    user.accountType || "student",

                organizationName:
                    user.organizationName || "",

                organizationType:
                    user.organizationType || "",

                organizationDescription:
                    user.organizationDescription || "",

                stakeholderRole:
                    user.stakeholderRole || "",

                website:
                    user.website || "",

                organizationLogo:
                    user.organizationLogo || "",
            },
        });

    } catch (error) {
        console.error(
            "Get profile error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get profile",
            error: error.message,
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


        // ==========================================
        // BASIC VALIDATION
        // ==========================================

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


        // ==========================================
        // CLEAN SKILLS
        // ==========================================

        const cleanSkills = Array.isArray(skills)
            ? skills
                .map((skill) =>
                    String(skill).trim()
                )
                .filter(Boolean)
            : [];


        // ==========================================
        // GET USER ACCOUNT TYPE
        // ==========================================

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // ==========================================
        // UPDATE PROFILE
        // ==========================================

        const profile =
            await Profile.findOneAndUpdate(
                { userId },

                {
                    userId,

                    name: name.trim(),

                    role:
                        role ||
                        (
                            user.accountType ===
                                "stakeholder"
                                ? user.stakeholderRole ||
                                "Stakeholder"
                                : "MERN Developer"
                        ),

                    email: email.trim(),

                    college:
                        college || "",

                    location:
                        location || "",

                    branch:
                        branch || "",

                    year:
                        year || "",

                    photo:
                        photo || null,

                    resume:
                        resume || null,

                    github:
                        github || "",

                    linkedin:
                        linkedin || "",

                    portfolio:
                        portfolio || "",

                    availability:
                        availability ||
                        "Available",

                    bio:
                        bio || "",

                    skills:
                        cleanSkills,

                    profileCompleted:
                        Boolean(profileCompleted),
                },

                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                }
            );


        // ==========================================
        // SYNC BASIC USER INFORMATION
        // ==========================================

        await User.findByIdAndUpdate(
            userId,
            {
                name: name.trim(),

                email: email.trim(),

                college:
                    college || "",

                branch:
                    branch || "",

                year:
                    year || "",
            },
            {
                new: true,
            }
        );


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({
            success: true,

            message:
                "Profile updated successfully",

            profile,

            accountType:
                user.accountType ||
                "student",
        });

    } catch (error) {
        console.error(
            "Profile update error:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                "Failed to update profile",

            error:
                error.message,
        });
    }
});


/*
=====================================================
DELETE PROFILE
DELETE /api/profile
=====================================================
*/
router.delete(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const userId = req.user.id;

            await Profile.findOneAndDelete({
                userId,
            });

            return res.status(200).json({
                success: true,

                message:
                    "Profile deleted successfully",
            });

        } catch (error) {
            console.error(
                "Delete profile error:",
                error
            );

            return res.status(500).json({
                success: false,

                message:
                    "Failed to delete profile",

                error:
                    error.message,
            });
        }
    }
);


export default router;