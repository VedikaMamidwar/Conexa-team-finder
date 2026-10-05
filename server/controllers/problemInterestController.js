import ProblemInterest from "../models/ProblemInterest.js";
import ProblemPost from "../models/ProblemPost.js";
import User from "../models/User.js";

// =====================================================
// STUDENT - SHOW INTEREST
// =====================================================

export const showInterest = async (req, res) => {
    try {
        const studentId = req.user?.id;

        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const student = await User.findById(studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        // Only students can show interest
        if (student.accountType !== "student") {
            return res.status(403).json({
                success: false,
                message:
                    "Only students can show interest",
            });
        }

        const { problemId, message } = req.body;

        if (!problemId) {
            return res.status(400).json({
                success: false,
                message: "Problem ID is required",
            });
        }

        const problem =
            await ProblemPost.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        // Make sure the post belongs to a stakeholder
        const stakeholder =
            await User.findById(
                problem.stakeholderId
            );

        if (
            !stakeholder ||
            stakeholder.accountType !==
            "stakeholder"
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "This problem does not belong to a stakeholder",
            });
        }

        // Check duplicate interest
        const existingInterest =
            await ProblemInterest.findOne({
                problemId,
                studentId,
            });

        if (existingInterest) {
            return res.status(400).json({
                success: false,
                message:
                    "You have already shown interest in this problem",
            });
        }

        const interest =
            await ProblemInterest.create({
                problemId,
                studentId,
                message:
                    message?.trim() || "",
            });

        const populatedInterest =
            await ProblemInterest.findById(
                interest._id
            )
                .populate(
                    "studentId",
                    "name email college branch year skills role photo"
                )
                .populate(
                    "problemId",
                    "title organizationName"
                );

        return res.status(201).json({
            success: true,
            message:
                "Interest submitted successfully",
            interest: populatedInterest,
        });
    } catch (error) {
        console.error(
            "Show interest error:",
            error
        );

        // Duplicate index protection
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message:
                    "You have already shown interest in this problem",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                "Failed to submit interest",
        });
    }
};


// =====================================================
// STUDENT - GET OWN INTERESTS
// =====================================================

export const getMyInterests = async (
    req,
    res
) => {
    try {
        const studentId = req.user?.id;

        const interests =
            await ProblemInterest.find({
                studentId,
            })
                .populate(
                    "problemId",
                    "title description organizationName deadline location"
                )
                .populate(
                    "problemId.stakeholderId",
                    "name email organizationName"
                )
                .sort({
                    createdAt: -1,
                });

        return res.status(200).json({
            success: true,
            interests,
        });
    } catch (error) {
        console.error(
            "Get my interests error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch interests",
        });
    }
};


// =====================================================
// STAKEHOLDER - GET RESPONSES
// =====================================================

export const getProblemResponses = async (
    req,
    res
) => {
    try {
        const stakeholderId =
            req.user?.id;

        const { problemId } = req.params;

        const problem =
            await ProblemPost.findById(
                problemId
            );

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        // Only owner stakeholder can see responses
        if (
            problem.stakeholderId.toString() !==
            stakeholderId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You can only view responses to your own problems",
            });
        }

        const responses =
            await ProblemInterest.find({
                problemId,
            })
                .populate(
                    "studentId",
                    "name email college branch year skills role location bio photo github linkedin portfolio"
                )
                .sort({
                    createdAt: -1,
                });

        return res.status(200).json({
            success: true,
            responses,
        });
    } catch (error) {
        console.error(
            "Get problem responses error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch student responses",
        });
    }
};


// =====================================================
// STAKEHOLDER - UPDATE RESPONSE STATUS
// =====================================================

export const updateInterestStatus = async (
    req,
    res
) => {
    try {
        const stakeholderId =
            req.user?.id;

        const { interestId } =
            req.params;

        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "accepted",
            "rejected",
        ];

        if (
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid response status",
            });
        }

        const interest =
            await ProblemInterest.findById(
                interestId
            ).populate("problemId");

        if (!interest) {
            return res.status(404).json({
                success: false,
                message:
                    "Interest response not found",
            });
        }

        if (
            interest.problemId.stakeholderId.toString() !==
            stakeholderId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You cannot update this response",
            });
        }

        interest.status = status;

        await interest.save();

        const updatedInterest =
            await ProblemInterest.findById(
                interest._id
            )
                .populate(
                    "studentId",
                    "name email college branch year skills role photo"
                )
                .populate(
                    "problemId",
                    "title organizationName"
                );

        return res.status(200).json({
            success: true,
            message:
                "Response status updated",
            interest: updatedInterest,
        });
    } catch (error) {
        console.error(
            "Update interest status error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update response status",
        });
    }
};