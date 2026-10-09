import express from "express";

import {
    showInterest,
    getMyInterests,
    getProblemResponses,
    updateInterestStatus,
} from "../controllers/problemInterestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import stakeholderMiddleware from "../middleware/stakeholderMiddleware.js";

const router = express.Router();


// =====================================================
// STUDENT
// =====================================================

// Student submits interest
router.post(
    "/",
    authMiddleware,
    showInterest
);

// Student sees problems they are interested in
router.get(
    "/my",
    authMiddleware,
    getMyInterests
);


// =====================================================
// STAKEHOLDER
// =====================================================

// Stakeholder sees responses for a problem
router.get(
    "/problem/:problemId",
    authMiddleware,
    stakeholderMiddleware,
    getProblemResponses
);

// Stakeholder accepts/rejects student
router.patch(
    "/:interestId/status",
    authMiddleware,
    stakeholderMiddleware,
    updateInterestStatus
);


export default router;