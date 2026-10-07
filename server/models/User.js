import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // =========================
        // BASIC USER INFORMATION
        // =========================

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

        // =========================
        // EDUCATION
        // =========================

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
        },

        // =========================
        // PROFILE INFORMATION
        // =========================

        role: {
            type: String,
            default: "MERN Developer",
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
            enum: ["Available", "Looking for Team", "Busy"],
            default: "Available",
        },

        // =========================
        // SKILLS
        // =========================

        skills: {
            type: [String],
            default: [],
        },

        // =========================
        // SOCIAL LINKS
        // =========================

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

        // =========================
        // PROFILE PHOTO
        // =========================

        photo: {
            type: String,
            default: "",
        },

        // =========================
        // RESUME
        // =========================

        resume: {
            name: {
                type: String,
                default: "",
            },

            size: {
                type: Number,
                default: 0,
            },

            type: {
                type: String,
                default: "",
            },

            data: {
                type: String,
                default: "",
            },
        },

        // =========================
        // PROFILE COMPLETION
        // =========================

        profileCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);