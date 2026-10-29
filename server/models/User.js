
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
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
            select: false,
        },

        accountType: {
            type: String,
            enum: ["student", "stakeholder"],
            default: "student",
            required: true,
        },

        accountStatus: {
            type: String,
            enum: ["active", "pending", "rejected", "suspended"],
            default: "active",
            required: true,
        },

        // Stakeholder approval audit information
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            default: null,
        },

        reviewedAt: {
            type: Date,
            default: null,
        },

        rejectionReason: {
            type: String,
            default: "",
            trim: true,
            maxlength: 500,
        },

        // Student education
        college: { type: String, default: "", trim: true },
        branch: { type: String, default: "", trim: true },
        year: { type: String, default: "", trim: true },

        // Stakeholder organization
        organizationName: { type: String, default: "", trim: true },
        organizationDescription: { type: String, default: "", trim: true },
        website: { type: String, default: "", trim: true },

        // Profile information
        role: { type: String, default: "MERN Developer", trim: true },
        location: { type: String, default: "", trim: true },
        bio: { type: String, default: "", trim: true },

        availability: {
            type: String,
            enum: ["Available", "Looking for Team", "Busy"],
            default: "Available",
        },

        skills: { type: [String], default: [] },

        github: { type: String, default: "", trim: true },
        linkedin: { type: String, default: "", trim: true },
        portfolio: { type: String, default: "", trim: true },

        photo: { type: String, default: "" },

        resume: {
            name: { type: String, default: "" },
            size: { type: Number, default: 0 },
            type: { type: String, default: "" },
            data: { type: String, default: "" },
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);

