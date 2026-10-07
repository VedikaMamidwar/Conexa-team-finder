import express from "express";
import { sendInvitation, getReceivedInvitations } from "../controllers/invitationController.js";

const router = express.Router();

router.post("/", sendInvitation);
router.get("/received/:studentId", getReceivedInvitations);

export default router;