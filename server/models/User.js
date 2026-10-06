import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // =====================================================
        // BASIC USER INFORMATION
        // =====================================================

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        // =====================================================
        // ACCOUNT TYPE
        // =====================================================

        accountType: {
            type: String,
            enum: ["student", "stakeholder"],
            default: "student",
            index: true,
        },

        // =====================================================
        // STUDENT INFORMATION
        // =====================================================

        college: {
            type: String,
            default: "",
            trim: true,
        },

        branch: {
            type: String,
            default: "",
            trim: true,
        },

        year: {
            type: String,
            default: "",
            trim: true,
        },

        // =====================================================
        // GENERAL PROFILE
        // =====================================================

        role: {
            type: String,
            default: "",
            trim: true,
        },

        location: {
            type: String,
            default: "",
            trim: true,
        },

        bio: {
            type: String,
            default: "",
            trim: true,
        },

        availability: {
            type: String,
            default: "Available",
            trim: true,
        },

        skills: {
            type: [String],
            default: [],
        },

        // =====================================================
        // SOCIAL LINKS
        // =====================================================

        github: {
            type: String,
            default: "",
            trim: true,
        },

        linkedin: {
            type: String,
            default: "",
            trim: true,
        },

        portfolio: {
            type: String,
            default: "",
            trim: true,
        },

        // =====================================================
        // PROFILE FILES
        // =====================================================

        photo: {
            type: String,
            default: "",
        },

        resume: {
            type: String,
            default: "",
        },

        // =====================================================
        // STAKEHOLDER INFORMATION
        // =====================================================

        organizationName: {
            type: String,
            default: "",
            trim: true,
        },

        organizationType: {
            type: String,
            default: "",
            trim: true,
        },

        organizationDescription: {
            type: String,
            default: "",
            trim: true,
        },

        website: {
            type: String,
            default: "",
            trim: true,
        },

        organizationLogo: {
            type: String,
            default: "",
        },

        stakeholderRole: {
            type: String,
            default: "",
            trim: true,
        },

        // =====================================================
        // PROFILE STATUS
        // =====================================================

        profileCompleted: {
            type: Boolean,
            default: false,
        },

        // =====================================================
        // PASSWORD RESET
        // =====================================================

        resetOtpHash: {
            type: String,
            default: "",
        },

        resetOtpExpires: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;