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
// STAKEHOLDER ONLY
// =====================================================

router.post(
    "/",
    authMiddleware,
    stakeholderMiddleware,
    createProblem
);


// =====================================================
// UPDATE PROBLEM
// STAKEHOLDER ONLY
// Owner check is inside controller
// =====================================================

router.put(
    "/:id",
    authMiddleware,
    stakeholderMiddleware,
    updateProblem
);


// =====================================================
// DELETE PROBLEM
// STAKEHOLDER ONLY
// Owner check is inside controller
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


export default router;