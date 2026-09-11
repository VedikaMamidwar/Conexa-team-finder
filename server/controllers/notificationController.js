import Notification from "../models/Notification.js";

// =====================================================
// GET ALL NOTIFICATIONS
// =====================================================
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            userId: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications,
        });

    } catch (error) {
        console.error("Get notifications error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch notifications",
        });
    }
};


// =====================================================
// CREATE NOTIFICATION
// =====================================================
export const createNotification = async (req, res) => {
    try {
        const {
            userId,
            type,
            title,
            message,
            path,
        } = req.body;

        if (!userId || !title || !message) {
            return res.status(400).json({
                success: false,
                message: "userId, title and message are required",
            });
        }

        const notification = await Notification.create({
            userId,
            type: type || "general",
            title,
            message,
            path: path || "",
            read: false,
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification,
        });

    } catch (error) {
        console.error("Create notification error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create notification",
        });
    }
};


// =====================================================
// MARK ONE AS READ
// =====================================================
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id,
            },
            {
                read: true,
            },
            {
                new: true,
            }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        res.status(200).json({
            success: true,
            notification,
        });

    } catch (error) {
        console.error("Mark as read error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to mark notification as read",
        });
    }
};


// =====================================================
// MARK ALL AS READ
// =====================================================
export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                userId: req.user.id,
                read: false,
            },
            {
                read: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read",
        });

    } catch (error) {
        console.error("Mark all as read error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to mark all notifications as read",
        });
    }
};


// =====================================================
// DELETE ONE NOTIFICATION
// =====================================================
export const deleteNotification = async (req, res) => {
    try {
        const notification =
            await Notification.findOneAndDelete({
                _id: req.params.id,
                userId: req.user.id,
            });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });

    } catch (error) {
        console.error("Delete notification error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete notification",
        });
    }
};


// =====================================================
// DELETE ALL NOTIFICATIONS
// =====================================================
export const deleteAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({
            userId: req.user.id,
        });

        res.status(200).json({
            success: true,
            message: "All notifications deleted successfully",
        });

    } catch (error) {
        console.error("Delete all notifications error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete all notifications",
        });
    }
};