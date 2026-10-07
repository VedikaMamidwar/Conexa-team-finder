import express from "express";

import {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    likeProblem,
    commentOnProblem,
    saveProblem,
    shareProblem,
    viewProblem,
} from "../controllers/problemController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import stakeholderMiddleware from "../middleware/stakeholderMiddleware.js";

const router = express.Router();

// =====================================================
// GET ALL PROBLEMS
// Students + Stakeholders
// =====================================================

router.get(
    "/",
    authMiddleware,
    getAllProblems
);

// =====================================================
// GET SINGLE PROBLEM
// Students + Stakeholders
// =====================================================

router.get(
    "/:id",
    authMiddleware,
    getProblemById
);

// =====================================================
// CREATE PROBLEM
// ONLY STAKEHOLDER
// =====================================================

router.post(
    "/",
    authMiddleware,
    stakeholderMiddleware,
    createProblem
);

// =====================================================
// UPDATE PROBLEM
// ONLY STAKEHOLDER
// =====================================================

router.put(
    "/:id",
    authMiddleware,
    stakeholderMiddleware,
    updateProblem
);

// =====================================================
// DELETE PROBLEM
// ONLY STAKEHOLDER
// =====================================================

router.delete(
    "/:id",
    authMiddleware,
    stakeholderMiddleware,
    deleteProblem
);

// =====================================================
// LIKE / UNLIKE
// Students + Stakeholders
// =====================================================

router.post(
    "/:id/like",
    authMiddleware,
    likeProblem
);

// =====================================================
// COMMENT
// Students + Stakeholders
// =====================================================

router.post(
    "/:id/comment",
    authMiddleware,
    commentOnProblem
);

// =====================================================
// SAVE / UNSAVE
// Students + Stakeholders
// =====================================================

router.post(
    "/:id/save",
    authMiddleware,
    saveProblem
);

// =====================================================
// SHARE
// Students + Stakeholders
// =====================================================

router.post(
    "/:id/share",
    authMiddleware,
    shareProblem
);

// =====================================================
// VIEW
// Students + Stakeholders
// One view per user
// =====================================================

router.post(
    "/:id/view",
    authMiddleware,
    viewProblem
);

export default router;