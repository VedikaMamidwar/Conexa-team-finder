
import express from "express";

import adminMiddleware from "../middleware/adminMiddleware.js";

import {

    getPendingStakeholders,

    getReviewedStakeholders,

    approveStakeholder,

    rejectStakeholder,

} from "../controllers/stakeholderController.js";

const router = express.Router();

// All routes in this file require an authenticated, active admin.

router.use(adminMiddleware);

// GET /api/admin/stakeholders/pending

router.get("/pending", getPendingStakeholders);

// GET /api/admin/stakeholders/reviewed

router.get("/reviewed", getReviewedStakeholders);

// PATCH /api/admin/stakeholders/:id/approve

router.patch("/:id/approve", approveStakeholder);

// PATCH /api/admin/stakeholders/:id/reject

router.patch("/:id/reject", rejectStakeholder);

export default router;