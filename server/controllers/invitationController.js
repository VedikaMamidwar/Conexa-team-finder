import Invitation from "../models/Invitation.js";
import Student from "../models/Student.js"; // update if your model file is named differently
import { sendEmail, teammateRequestEmail } from "../utils/sendEmail.js";

export const sendInvitation = async (req, res) => {
  try {
    const { toStudentId, message } = req.body;
    const fromStudentId = req.user?.id || req.body.fromStudentId;

    if (!fromStudentId) {
      return res.status(401).json({ success: false, message: "You must be logged in to send a request." });
    }
    if (!toStudentId) {
      return res.status(400).json({ success: false, message: "toStudentId is required." });
    }
    if (String(fromStudentId) === String(toStudentId)) {
      return res.status(400).json({ success: false, message: "You cannot send a request to yourself." });
    }

    const [fromStudent, toStudent] = await Promise.all([
      Student.findById(fromStudentId),
      Student.findById(toStudentId),
    ]);

    if (!toStudent) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const existing = await Invitation.findOne({
      fromStudent: fromStudentId,
      toStudent: toStudentId,
      status: "pending",
    });

    if (existing) {
      return res.status(409).json({ success: false, message: "You already sent a request to this student." });
    }

    const invitation = await Invitation.create({
      fromStudent: fromStudentId,
      toStudent: toStudentId,
      message: message || "",
    });

    if (toStudent.email) {
      await sendEmail({
        to: toStudent.email,
        subject: `${fromStudent?.name || "A student"} wants to team up with you on Conexa`,
        html: teammateRequestEmail({
          toName: toStudent.name || "there",
          fromName: fromStudent?.name || "A student",
          message: message || `Hi ${toStudent.name}, I'd like to team up with you!`,
        }),
      });
    }

    return res.status(201).json({
      success: true,
      message: "Request sent successfully.",
      invitation,
    });
  } catch (error) {
    console.error("sendInvitation error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong while sending the request." });
  }
};

export const getReceivedInvitations = async (req, res) => {
  try {
    const { studentId } = req.params;
    const invitations = await Invitation.find({ toStudent: studentId })
      .populate("fromStudent", "name email role college")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, invitations });
  } catch (error) {
    console.error("getReceivedInvitations error:", error);
    return res.status(500).json({ success: false, message: "Could not load requests." });
  }
};