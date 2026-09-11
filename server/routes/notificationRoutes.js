import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

// GET notifications
router.get(
    "/",
    authMiddleware,
    getNotifications
);

// CREATE notification
router.post(
    "/",
    authMiddleware,
    createNotification
);

// MARK ALL AS READ
router.put(
    "/read-all",
    authMiddleware,
    markAllAsRead
);

// MARK ONE AS READ
router.put(
    "/:id/read",
    authMiddleware,
    markAsRead
);

// DELETE ALL
router.delete(
    "/",
    authMiddleware,
    deleteAllNotifications
);

// DELETE ONE
router.delete(
    "/:id",
    authMiddleware,
    deleteNotification
);

export default router;