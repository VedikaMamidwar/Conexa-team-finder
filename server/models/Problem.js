
import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const contactRequestSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true }
);

const problemPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        organizationName: {
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

        requiredSkills: {
            type: [String],
            required: true,
            validate: {
                validator: (skills) =>
                    Array.isArray(skills) && skills.length > 0,
                message: "At least one required skill is necessary",
            },
        },

        technologies: {
            type: [String],
            required: true,
            validate: {
                validator: (items) =>
                    Array.isArray(items) && items.length > 0,
                message: "At least one technology is necessary",
            },
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

        stakeholderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        status: {
            type: String,
            enum: ["open", "in-progress", "completed", "closed"],
            default: "open",
            index: true,
        },

        // Students who liked this problem.
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        comments: {
            type: [commentSchema],
            default: [],
        },

        // Students who bookmarked this problem.
        savedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Total number of recorded shares.
        shareCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        // Students who explicitly expressed interest in this problem.
        interestedStudents: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Student-to-stakeholder contact requests.
        contactRequests: {
            type: [contactRequestSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

problemPostSchema.index({ createdAt: -1 });
problemPostSchema.index({ stakeholderId: 1, createdAt: -1 });

problemPostSchema.index({ likes: 1 });
problemPostSchema.index({ savedBy: 1 });
problemPostSchema.index({ interestedStudents: 1 });

problemPostSchema.index({
    stakeholderId: 1,
    "contactRequests.studentId": 1,
});

export default mongoose.model("ProblemPost", problemPostSchema);
