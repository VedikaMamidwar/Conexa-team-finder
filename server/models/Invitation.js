import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    fromStudent: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    toStudent: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    message: { type: String, default: "" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Invitation", invitationSchema);