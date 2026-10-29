
import express from "express";

import {
    createProblem,
    getAllProblems,
    getProblemById,
    getMyProblems,
    updateProblem,
    deleteProblem,
    likeProblem,
    commentOnProblem,
    saveProblem,
    shareProblem,
    expressInterest,
    createContactRequest,
    getProblemEngagement,
    updateContactRequestStatus,
} from "../controllers/problemController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import stakeholderMiddleware from "../middleware/stakeholderMiddleware.js";

const router = express.Router();

// Stakeholder's own problems
router.get(
    "/mine",
    authMiddleware,
    stakeholderMiddleware,
    getMyProblems
);

// Publicly visible to authenticated users: approved stakeholder posts only
router.get("/", authMiddleware, getAllProblems);

// Create stakeholder problem
router.post(
    "/",
    authMiddleware,
    stakeholderMiddleware,
    createProblem
);

// Student interest and contact requests
router.post(
    "/:id/interest",
    authMiddleware,
    expressInterest
);

router.post(
    "/:id/contact-request",
    authMiddleware,
    createContactRequest
);

// Stakeholder engagement and contact request management
router.get(
    "/:id/engagement",
    authMiddleware,
    stakeholderMiddleware,
    getProblemEngagement
);

router.patch(
    "/:id/contact-requests/:requestId",
    authMiddleware,
    stakeholderMiddleware,
    updateContactRequestStatus
);

// Edit and delete stakeholder's own problem
router.put(
    "/:id",
    authMiddleware,
    stakeholderMiddleware,
    updateProblem
);

router.delete(
    "/:id",
    authMiddleware,
    stakeholderMiddleware,
    deleteProblem
);

// Feed interactions
router.post("/:id/like", authMiddleware, likeProblem);
router.post("/:id/comment", authMiddleware, commentOnProblem);
router.post("/:id/save", authMiddleware, saveProblem);
router.post("/:id/share", authMiddleware, shareProblem);

// Keep this parameterized GET route last
router.get("/:id", authMiddleware, getProblemById);

export default router;
