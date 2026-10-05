import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const problemPostSchema = new mongoose.Schema(
    {
        stakeholderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        problemInfo: {
            type: String,
            required: true,
            trim: true,
        },

        organizationName: {
            type: String,
            required: true,
            trim: true,
        },

        requiredSkills: {
            type: [String],
            default: [],
        },

        technologies: {
            type: [String],
            default: [],
        },

        location: {
            type: String,
            default: "",
            trim: true,
        },

        deadline: {
            type: Date,
            default: null,
        },

        contactEmail: {
            type: String,
            default: "",
            trim: true,
            lowercase: true,
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        saves: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        comments: {
            type: [commentSchema],
            default: [],
        },

        shares: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("ProblemPost", problemPostSchema);