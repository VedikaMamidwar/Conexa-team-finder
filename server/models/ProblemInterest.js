import mongoose from "mongoose";

const problemInterestSchema = new mongoose.Schema(
    {
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProblemPost",
            required: true,
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        message: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "rejected",
            ],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

// One student can show interest only once
problemInterestSchema.index(
    {
        problemId: 1,
        studentId: 1,
    },
    {
        unique: true,
    }
);

export default mongoose.model(
    "ProblemInterest",
    problemInterestSchema
);