import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: "MERN Developer",
        },

        email: {
            type: String,
            required: true,
        },

        college: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        branch: {
            type: String,
            required: true,
        },

        year: {
            type: String,
            required: true,
        },

        photo: {
            type: String,
            default: null,
        },

        resume: {
            type: Object,
            default: null,
        },

        github: {
            type: String,
            default: "",
        },

        linkedin: {
            type: String,
            default: "",
        },

        portfolio: {
            type: String,
            default: "",
        },

        availability: {
            type: String,
            default: "Available",
        },

        bio: {
            type: String,
            default: "",
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