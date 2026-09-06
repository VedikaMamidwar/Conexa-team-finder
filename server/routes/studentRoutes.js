import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/students
// Example:
// /api/students?search=React
router.get("/", async (req, res) => {
    try {
        const { search } = req.query;

        let query = {};

        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), "i");

            query = {
                $or: [
                    { name: searchRegex },
                    { email: searchRegex },
                    { college: searchRegex },
                    { branch: searchRegex },
                    { year: searchRegex },
                    { skills: searchRegex },
                ],
            };
        }

        const students = await User.find(query)
            .select("-password")
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: students.length,
            students,
        });
    } catch (error) {
        console.error("Student search error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
        });
    }
});

export default router;