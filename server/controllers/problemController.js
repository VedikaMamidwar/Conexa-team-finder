import ProblemPost from "../models/ProblemPost.js";
import User from "../models/User.js";

// =====================================================
// CREATE PROBLEM
// ONLY STAKEHOLDER
// =====================================================

export const createProblem = async (req, res) => {
    try {
        const stakeholderId = req.user.id;

        const stakeholder = await User.findById(stakeholderId);

        if (!stakeholder) {
            return res.status(404).json({
                success: false,
                message: "Stakeholder not found",
            });
        }

        if (stakeholder.accountType !== "stakeholder") {
            return res.status(403).json({
                success: false,
                message: "Only stakeholders can create problems",
            });
        }

        const {
            title,
            description,
            problemInfo,
            requiredSkills,
            technologies,
            location,
            deadline,
            contactEmail,
        } = req.body;

        if (!title || !description || !problemInfo) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, description and problem information are required",
            });
        }

        const problem = await ProblemPost.create({
            stakeholderId,

            title,
            description,
            problemInfo,

            organizationName:
                stakeholder.organizationName || stakeholder.name,

            requiredSkills: Array.isArray(requiredSkills)
                ? requiredSkills
                : [],

            technologies: Array.isArray(technologies)
                ? technologies
                : [],

            location: location || "",

            deadline: deadline || null,

            contactEmail:
                contactEmail || stakeholder.email,
        });

        const populatedProblem = await ProblemPost.findById(problem._id)
            .populate(
                "stakeholderId",
                "name email organizationName organizationDescription website photo"
            );

        return res.status(201).json({
            success: true,
            message: "Problem posted successfully",
            problem: populatedProblem,
        });

    } catch (error) {
        console.error("Create problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create problem",
            error: error.message,
        });
    }
};


// =====================================================
// GET ALL STAKEHOLDER POSTS
// STUDENTS + STAKEHOLDERS CAN VIEW
// =====================================================

export const getAllProblems = async (req, res) => {
    try {
        const problems = await ProblemPost.find()
            .populate(
                "stakeholderId",
                "name email organizationName organizationDescription website photo accountType"
            )
            .populate(
                "comments.userId",
                "name photo"
            )
            .sort({ createdAt: -1 });

        const stakeholderProblems = problems
            .filter(
                (problem) =>
                    problem.stakeholderId &&
                    problem.stakeholderId.accountType ===
                    "stakeholder"
            )
            .map((problem) => {
                const problemObject =
                    problem.toObject();

                const userId =
                    req.user?.id?.toString();

                problemObject.liked =
                    problem.likes?.some(
                        (id) =>
                            id.toString() === userId
                    ) || false;

                problemObject.saved =
                    problem.saves?.some(
                        (id) =>
                            id.toString() === userId
                    ) || false;

                return problemObject;
            });

        return res.status(200).json({
            success: true,
            problems: stakeholderProblems,
        });
    } catch (error) {
        console.error(
            "Get all problems error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch problems",
        });
    }
};


// =====================================================
// GET SINGLE PROBLEM
// =====================================================

export const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;

        const problem = await ProblemPost.findById(id)
            .populate(
                "stakeholderId",
                "name email accountType organizationName organizationDescription website photo"
            )
            .populate(
                "comments.userId",
                "name email accountType photo role"
            );

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        // Only stakeholder posts are allowed in the feed.
        if (
            !problem.stakeholderId ||
            problem.stakeholderId.accountType !== "stakeholder"
        ) {
            return res.status(404).json({
                success: false,
                message: "Problem post not available",
            });
        }

        return res.status(200).json({
            success: true,
            problem,
        });

    } catch (error) {
        console.error("Get problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch problem",
            error: error.message,
        });
    }
};


// =====================================================
// UPDATE PROBLEM
// ONLY OWNER STAKEHOLDER
// =====================================================

export const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const stakeholderId = req.user.id;

        const problem = await ProblemPost.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        // Check ownership
        if (problem.stakeholderId.toString() !== stakeholderId) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own problems",
            });
        }

        const {
            title,
            description,
            problemInfo,
            requiredSkills,
            technologies,
            location,
            deadline,
            contactEmail,
        } = req.body;

        if (title !== undefined) {
            problem.title = title;
        }

        if (description !== undefined) {
            problem.description = description;
        }

        if (problemInfo !== undefined) {
            problem.problemInfo = problemInfo;
        }

        if (requiredSkills !== undefined) {
            problem.requiredSkills = Array.isArray(requiredSkills)
                ? requiredSkills
                : [];
        }

        if (technologies !== undefined) {
            problem.technologies = Array.isArray(technologies)
                ? technologies
                : [];
        }

        if (location !== undefined) {
            problem.location = location;
        }

        if (deadline !== undefined) {
            problem.deadline = deadline || null;
        }

        if (contactEmail !== undefined) {
            problem.contactEmail = contactEmail;
        }

        await problem.save();

        const updatedProblem = await ProblemPost.findById(problem._id)
            .populate(
                "stakeholderId",
                "name email accountType organizationName organizationDescription website photo"
            );

        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem: updatedProblem,
        });

    } catch (error) {
        console.error("Update problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update problem",
            error: error.message,
        });
    }
};


// =====================================================
// DELETE PROBLEM
// ONLY OWNER STAKEHOLDER
// =====================================================

export const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const stakeholderId = req.user.id;

        const problem = await ProblemPost.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        // Check ownership
        if (problem.stakeholderId.toString() !== stakeholderId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own problems",
            });
        }

        await ProblemPost.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        });

    } catch (error) {
        console.error("Delete problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete problem",
            error: error.message,
        });
    }
};


// =====================================================
// LIKE / UNLIKE
// STUDENTS + STAKEHOLDERS
// =====================================================

export const likeProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const problem = await ProblemPost.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        const alreadyLiked = problem.likes.some(
            (likeId) => likeId.toString() === userId
        );

        if (alreadyLiked) {
            problem.likes = problem.likes.filter(
                (likeId) => likeId.toString() !== userId
            );
        } else {
            problem.likes.push(userId);
        }

        await problem.save();

        return res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount: problem.likes.length,
            message: alreadyLiked
                ? "Problem unliked"
                : "Problem liked",
        });

    } catch (error) {
        console.error("Like problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to like problem",
        });
    }
};


// =====================================================
// ADD COMMENT
// STUDENTS + STAKEHOLDERS
// =====================================================

export const commentOnProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty",
            });
        }

        const problem = await ProblemPost.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        problem.comments.push({
            userId,
            text: text.trim(),
        });

        await problem.save();

        const updatedProblem = await ProblemPost.findById(id)
            .populate(
                "comments.userId",
                "name email accountType photo role"
            );

        const newComment =
            updatedProblem.comments[
            updatedProblem.comments.length - 1
            ];

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment,
        });

    } catch (error) {
        console.error("Comment problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add comment",
        });
    }
};


// =====================================================
// SAVE / UNSAVE
// STUDENTS + STAKEHOLDERS
// =====================================================

export const saveProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const problem = await ProblemPost.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        const alreadySaved = problem.saves.some(
            (savedId) => savedId.toString() === userId
        );

        if (alreadySaved) {
            problem.saves = problem.saves.filter(
                (savedId) => savedId.toString() !== userId
            );
        } else {
            problem.saves.push(userId);
        }

        await problem.save();

        return res.status(200).json({
            success: true,
            saved: !alreadySaved,
            savesCount: problem.saves.length,
            message: alreadySaved
                ? "Problem removed from saved"
                : "Problem saved successfully",
        });

    } catch (error) {
        console.error("Save problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to save problem",
        });
    }
};


// =====================================================
// SHARE
// STUDENTS + STAKEHOLDERS
// =====================================================

export const shareProblem = async (req, res) => {
    try {
        const { id } = req.params;

        const problem = await ProblemPost.findById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        problem.shares += 1;

        await problem.save();

        return res.status(200).json({
            success: true,
            shares: problem.shares,
            message: "Problem shared successfully",
        });

    } catch (error) {
        console.error("Share problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to share problem",
        });
    }
};