import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            default: "MERN Developer",
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        college: {
            type: String,
            default: "",
            trim: true,
        },

        location: {
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

        photo: {
            type: String,
            default: null,
        },

        resume: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

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

        availability: {
            type: String,
            enum: [
                "Available",
                "Looking for Team",
                "Busy",
            ],
            default: "Available",
        },

        bio: {
            type: String,
            default: "",
            trim: true,
        },

        skills: {
            type: [String],
            default: [],
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
);

export default mongoose.model("Profile", profileSchema);