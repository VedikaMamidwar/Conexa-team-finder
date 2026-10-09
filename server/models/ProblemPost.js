import mongoose from "mongoose";

// =====================================================
// COMMENT SCHEMA
// =====================================================

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

// =====================================================
// PROBLEM POST SCHEMA
// =====================================================

const problemPostSchema = new mongoose.Schema(
    {
        // =================================================
        // STAKEHOLDER
        // =================================================

        stakeholderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // =================================================
        // BASIC PROBLEM INFORMATION
        // =================================================

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

        // =================================================
        // REQUIREMENTS
        // =================================================

        requiredSkills: {
            type: [String],
            default: [],
        },

        technologies: {
            type: [String],
            default: [],
        },

        // =================================================
        // LOCATION / DEADLINE / CONTACT
        // =================================================

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

        // =================================================
        // LIKES
        // =================================================

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // =================================================
        // SAVES
        // =================================================

        saves: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // =================================================
        // COMMENTS
        // =================================================

        comments: {
            type: [commentSchema],
            default: [],
        },

        // =================================================
        // SHARES
        // =================================================

        shares: {
            type: Number,
            default: 0,
        },

        // =================================================
        // VIEWS
        // =================================================

        views: {
            type: Number,
            default: 0,
        },

        // Stores users who have already viewed this problem.
        // This prevents the same logged-in user from
        // increasing the view count repeatedly.
        viewedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// =====================================================
// EXPORT
// =====================================================

export default mongoose.model(
    "ProblemPost",
    problemPostSchema
);