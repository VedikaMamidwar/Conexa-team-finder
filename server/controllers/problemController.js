
import mongoose from "mongoose";
import ProblemPost from "../models/Problem.js";
import User from "../models/User.js";

const getUserId = (req) => req.user?.id || req.user?._id;
const isValidId = (id) => mongoose.isValidObjectId(id);

const getActiveUser = async (userId) => {
    if (!userId || !isValidId(userId)) return null;
    return User.findById(userId);
};

const isApprovedStakeholder = (user) =>
    Boolean(
        user &&
        user.accountType === "stakeholder" &&
        user.accountStatus === "active"
    );

const isAllowedToInteract = (user) =>
    Boolean(
        user &&
        user.accountStatus === "active" &&
        (
            user.accountType === "student" ||
            isApprovedStakeholder(user)
        )
    );

const populateProblem = (query) =>
    query
        .populate(
            "stakeholderId",
            "name email organizationName organizationDescription website photo accountType accountStatus"
        )
        .populate(
            "comments.userId",
            "name email photo college branch year role skills linkedin accountType"
        )
        .populate(
            "likes",
            "name email photo college branch year role skills linkedin accountType"
        )
        .populate(
            "savedBy",
            "name email photo college branch year role skills linkedin accountType"
        )
        .populate(
            "interestedStudents",
            "name email photo college branch year role skills linkedin accountType"
        )
        .populate(
            "contactRequests.studentId",
            "name email photo college branch year role skills linkedin accountType"
        );

const getProblemForFeed = async (id) => {
    const problem = await populateProblem(
        ProblemPost.findById(id)
    );

    if (
        !problem ||
        !problem.stakeholderId ||
        problem.stakeholderId.accountType !== "stakeholder" ||
        problem.stakeholderId.accountStatus !== "active"
    ) {
        return null;
    }

    return problem;
};

const canInteractWithProblem = async (req, res) => {
    const user = await getActiveUser(getUserId(req));

    if (!user) {
        res.status(401).json({
            success: false,
            message: "Please log in again.",
        });
        return null;
    }

    if (!isAllowedToInteract(user)) {
        res.status(403).json({
            success: false,
            message:
                "Your account is not permitted to interact with problems.",
        });
        return null;
    }

    return user;
};

const validateProblemBody = (body, res) => {
    const {
        title,
        description,
        problemInfo,
        requiredSkills,
        technologies,
        contactEmail,
        deadline,
    } = body;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        title.trim().length > 200 ||
        typeof description !== "string" ||
        !description.trim() ||
        typeof problemInfo !== "string" ||
        !problemInfo.trim()
    ) {
        res.status(400).json({
            success: false,
            message:
                "A valid title (maximum 200 characters), description and problem information are required.",
        });
        return false;
    }

    if (
        !Array.isArray(requiredSkills) ||
        requiredSkills.length === 0 ||
        !requiredSkills.every(
            (item) => typeof item === "string" && item.trim()
        )
    ) {
        res.status(400).json({
            success: false,
            message: "Add at least one valid required skill.",
        });
        return false;
    }

    if (
        !Array.isArray(technologies) ||
        technologies.length === 0 ||
        !technologies.every(
            (item) => typeof item === "string" && item.trim()
        )
    ) {
        res.status(400).json({
            success: false,
            message: "Add at least one valid technology.",
        });
        return false;
    }

    if (
        contactEmail !== undefined &&
        contactEmail !== null &&
        contactEmail !== "" &&
        (
            typeof contactEmail !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())
        )
    ) {
        res.status(400).json({
            success: false,
            message: "Enter a valid contact email.",
        });
        return false;
    }

    if (deadline !== undefined && deadline !== null && deadline !== "") {
        const parsedDeadline = new Date(deadline);

        if (Number.isNaN(parsedDeadline.getTime())) {
            res.status(400).json({
                success: false,
                message: "Enter a valid deadline.",
            });
            return false;
        }
    }

    return true;
};

const getProblemPayload = (body, stakeholder) => ({
    title: body.title.trim(),
    organizationName:
        typeof body.organizationName === "string" &&
            body.organizationName.trim()
            ? body.organizationName.trim()
            : stakeholder.organizationName || stakeholder.name,
    description: body.description.trim(),
    problemInfo: body.problemInfo.trim(),
    requiredSkills: body.requiredSkills.map((item) => item.trim()),
    technologies: body.technologies.map((item) => item.trim()),
    location:
        typeof body.location === "string"
            ? body.location.trim()
            : "",
    deadline: body.deadline || null,
    contactEmail:
        typeof body.contactEmail === "string" &&
            body.contactEmail.trim()
            ? body.contactEmail.trim().toLowerCase()
            : stakeholder.email,
});

// =====================================================
// CREATE PROBLEM — approved stakeholders only
// =====================================================

export const createProblem = async (req, res) => {
    try {
        const stakeholder = await getActiveUser(getUserId(req));

        if (!stakeholder) {
            return res.status(401).json({
                success: false,
                message: "Please log in again.",
            });
        }

        if (!isApprovedStakeholder(stakeholder)) {
            return res.status(403).json({
                success: false,
                message:
                    "Only approved stakeholders can publish problems.",
            });
        }

        if (!validateProblemBody(req.body, res)) return;

        const problem = await ProblemPost.create({
            ...getProblemPayload(req.body, stakeholder),
            stakeholderId: stakeholder._id,
        });

        const populatedProblem = await populateProblem(
            ProblemPost.findById(problem._id)
        );

        return res.status(201).json({
            success: true,
            message: "Problem published successfully.",
            problem: populatedProblem,
        });
    } catch (error) {
        console.error("Create problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create problem.",
        });
    }
};

// =====================================================
// GET ALL VISIBLE PROBLEMS — stakeholder posts only
// =====================================================

export const getAllProblems = async (req, res) => {
    try {
        const userId = getUserId(req)?.toString();

        const problems = await populateProblem(
            ProblemPost.find({
                status: { $in: ["open", "in-progress"] },
            }).sort({ createdAt: -1 })
        );

        const visibleProblems = problems
            .filter(
                (problem) =>
                    problem.stakeholderId &&
                    problem.stakeholderId.accountType === "stakeholder" &&
                    problem.stakeholderId.accountStatus === "active"
            )
            .map((problem) => {
                const item = problem.toObject();

                item.liked = Boolean(
                    userId &&
                    item.likes?.some(
                        (person) =>
                            person._id?.toString() === userId
                    )
                );

                item.saved = Boolean(
                    userId &&
                    item.savedBy?.some(
                        (person) =>
                            person._id?.toString() === userId
                    )
                );

                item.likesCount = item.likes?.length || 0;
                item.savesCount = item.savedBy?.length || 0;
                item.interestedCount =
                    item.interestedStudents?.length || 0;
                item.commentsCount = item.comments?.length || 0;
                item.shareCount = item.shareCount || 0;

                delete item.savedBy;
                delete item.interestedStudents;
                delete item.contactRequests;

                return item;
            });

        return res.status(200).json({
            success: true,
            count: visibleProblems.length,
            problems: visibleProblems,
        });
    } catch (error) {
        console.error("Get all problems error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch problems.",
        });
    }
};

// =====================================================
// GET SINGLE PROBLEM
// =====================================================

export const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const problem = await getProblemForFeed(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        const item = problem.toObject();
        const userId = getUserId(req)?.toString();

        item.liked = Boolean(
            userId &&
            item.likes?.some(
                (person) => person._id?.toString() === userId
            )
        );

        item.saved = Boolean(
            userId &&
            item.savedBy?.some(
                (person) => person._id?.toString() === userId
            )
        );

        item.likesCount = item.likes?.length || 0;
        item.savesCount = item.savedBy?.length || 0;
        item.interestedCount =
            item.interestedStudents?.length || 0;
        item.commentsCount = item.comments?.length || 0;

        delete item.savedBy;
        delete item.interestedStudents;
        delete item.contactRequests;

        return res.status(200).json({
            success: true,
            problem: item,
        });
    } catch (error) {
        console.error("Get problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch problem.",
        });
    }
};

// =====================================================
// GET MY PROBLEMS — stakeholder's own posts
// =====================================================

export const getMyProblems = async (req, res) => {
    try {
        const stakeholder = await getActiveUser(getUserId(req));

        if (!stakeholder) {
            return res.status(401).json({
                success: false,
                message: "Please log in again.",
            });
        }

        if (!isApprovedStakeholder(stakeholder)) {
            return res.status(403).json({
                success: false,
                message:
                    "Only approved stakeholders can view their published problems.",
            });
        }

        const problems = await populateProblem(
            ProblemPost.find({
                stakeholderId: stakeholder._id,
            }).sort({ createdAt: -1 })
        );

        return res.status(200).json({
            success: true,
            count: problems.length,
            problems,
        });
    } catch (error) {
        console.error("Get my problems error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch your problems.",
        });
    }
};

// =====================================================
// UPDATE MY PROBLEM
// =====================================================

export const updateProblem = async (req, res) => {
    try {
        const stakeholder = await getActiveUser(getUserId(req));

        if (!stakeholder) {
            return res.status(401).json({
                success: false,
                message: "Please log in again.",
            });
        }

        if (!isApprovedStakeholder(stakeholder)) {
            return res.status(403).json({
                success: false,
                message:
                    "Only approved stakeholders can update problems.",
            });
        }

        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const problem = await ProblemPost.findOne({
            _id: id,
            stakeholderId: stakeholder._id,
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found or you do not own it.",
            });
        }

        const allowedFields = [
            "title",
            "organizationName",
            "description",
            "problemInfo",
            "requiredSkills",
            "technologies",
            "location",
            "deadline",
            "contactEmail",
        ];

        if (
            !allowedFields.some(
                (field) => req.body[field] !== undefined
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "No editable problem fields were provided.",
            });
        }

        const updatedBody = {
            title: req.body.title ?? problem.title,
            organizationName:
                req.body.organizationName ?? problem.organizationName,
            description: req.body.description ?? problem.description,
            problemInfo: req.body.problemInfo ?? problem.problemInfo,
            requiredSkills:
                req.body.requiredSkills ?? problem.requiredSkills,
            technologies:
                req.body.technologies ?? problem.technologies,
            location: req.body.location ?? problem.location,
            contactEmail:
                req.body.contactEmail ?? problem.contactEmail,
            deadline:
                req.body.deadline === undefined
                    ? problem.deadline
                    : req.body.deadline,
        };

        if (!validateProblemBody(updatedBody, res)) return;

        for (const field of allowedFields) {
            if (req.body[field] === undefined) continue;

            const value = req.body[field];

            if (
                [
                    "title",
                    "organizationName",
                    "description",
                    "problemInfo",
                    "location",
                    "contactEmail",
                ].includes(field)
            ) {
                if (typeof value !== "string") {
                    return res.status(400).json({
                        success: false,
                        message: `${field} must be text.`,
                    });
                }

                problem[field] = value.trim();
            } else if (
                ["requiredSkills", "technologies"].includes(field)
            ) {
                if (
                    !Array.isArray(value) ||
                    !value.every(
                        (entry) =>
                            typeof entry === "string" &&
                            entry.trim()
                    )
                ) {
                    return res.status(400).json({
                        success: false,
                        message:
                            `${field} must be an array of non-empty strings.`,
                    });
                }

                problem[field] = value.map(
                    (entry) => entry.trim()
                );
            } else if (field === "deadline") {
                if (value === "" || value === null) {
                    problem.deadline = null;
                } else {
                    const parsedDeadline = new Date(value);

                    if (
                        Number.isNaN(parsedDeadline.getTime())
                    ) {
                        return res.status(400).json({
                            success: false,
                            message: "Enter a valid deadline.",
                        });
                    }

                    problem.deadline = parsedDeadline;
                }
            }
        }

        await problem.save();

        const updatedProblem = await populateProblem(
            ProblemPost.findById(problem._id)
        );

        return res.status(200).json({
            success: true,
            message: "Problem updated successfully.",
            problem: updatedProblem,
        });
    } catch (error) {
        console.error("Update problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update problem.",
        });
    }
};

// =====================================================
// DELETE MY PROBLEM
// =====================================================

export const deleteProblem = async (req, res) => {
    try {
        const stakeholder = await getActiveUser(getUserId(req));

        if (!stakeholder) {
            return res.status(401).json({
                success: false,
                message: "Please log in again.",
            });
        }

        if (!isApprovedStakeholder(stakeholder)) {
            return res.status(403).json({
                success: false,
                message:
                    "Only approved stakeholders can delete problems.",
            });
        }

        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const problem = await ProblemPost.findOneAndDelete({
            _id: id,
            stakeholderId: stakeholder._id,
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message:
                    "Problem not found or you do not own it.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully.",
        });
    } catch (error) {
        console.error("Delete problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete problem.",
        });
    }
};

// =====================================================
// LIKE / UNLIKE
// =====================================================

export const likeProblem = async (req, res) => {
    try {
        const user = await canInteractWithProblem(req, res);
        if (!user) return;

        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const visibleProblem = await getProblemForFeed(id);

        if (!visibleProblem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        const problem = await ProblemPost.findById(id);

        const alreadyLiked = problem.likes.some(
            (person) =>
                person.toString() === user._id.toString()
        );

        if (alreadyLiked) {
            problem.likes.pull(user._id);
        } else {
            problem.likes.addToSet(user._id);
        }

        await problem.save();

        return res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount: problem.likes.length,
        });
    } catch (error) {
        console.error("Like problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update like.",
        });
    }
};

// =====================================================
// ADD COMMENT
// =====================================================

export const commentOnProblem = async (req, res) => {
    try {
        const user = await canInteractWithProblem(req, res);
        if (!user) return;

        const { id } = req.params;
        const { text } = req.body;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        if (
            typeof text !== "string" ||
            !text.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty.",
            });
        }

        if (text.trim().length > 2000) {
            return res.status(400).json({
                success: false,
                message:
                    "Comment cannot exceed 2000 characters.",
            });
        }

        const problem = await ProblemPost.findById(id);

        if (!problem || !(await getProblemForFeed(id))) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        problem.comments.push({
            userId: user._id,
            text: text.trim(),
        });

        await problem.save();

        const updatedProblem = await populateProblem(
            ProblemPost.findById(problem._id)
        );

        return res.status(201).json({
            success: true,
            message: "Comment added successfully.",
            comment:
                updatedProblem.comments[
                updatedProblem.comments.length - 1
                ],
        });
    } catch (error) {
        console.error("Comment problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add comment.",
        });
    }
};

// =====================================================
// SAVE / UNSAVE
// =====================================================

export const saveProblem = async (req, res) => {
    try {
        const user = await canInteractWithProblem(req, res);
        if (!user) return;

        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const visibleProblem = await getProblemForFeed(id);

        if (!visibleProblem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        const problem = await ProblemPost.findById(id);

        const alreadySaved = problem.savedBy.some(
            (person) =>
                person.toString() === user._id.toString()
        );

        if (alreadySaved) {
            problem.savedBy.pull(user._id);
        } else {
            problem.savedBy.addToSet(user._id);
        }

        await problem.save();

        return res.status(200).json({
            success: true,
            saved: !alreadySaved,
            savesCount: problem.savedBy.length,
        });
    } catch (error) {
        console.error("Save problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update saved problem.",
        });
    }
};

// =====================================================
// SHARE
// =====================================================

export const shareProblem = async (req, res) => {
    try {
        const user = await canInteractWithProblem(req, res);
        if (!user) return;

        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const visibleProblem = await getProblemForFeed(id);

        if (!visibleProblem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        const problem = await ProblemPost.findById(id);
        problem.shareCount = (problem.shareCount || 0) + 1;

        await problem.save();

        return res.status(200).json({
            success: true,
            shareCount: problem.shareCount,
            message: "Problem share recorded.",
        });
    } catch (error) {
        console.error("Share problem error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to record problem share.",
        });
    }
};

// =====================================================
// EXPRESS / REMOVE INTEREST — students only
// =====================================================

export const expressInterest = async (req, res) => {
    try {
        const user = await canInteractWithProblem(req, res);
        if (!user) return;

        if (user.accountType !== "student") {
            return res.status(403).json({
                success: false,
                message:
                    "Only students can express interest in problems.",
            });
        }

        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const visibleProblem = await getProblemForFeed(id);

        if (!visibleProblem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        const problem = await ProblemPost.findById(id);

        const alreadyInterested = problem.interestedStudents.some(
            (studentId) =>
                studentId.toString() === user._id.toString()
        );

        if (alreadyInterested) {
            problem.interestedStudents.pull(user._id);
        } else {
            problem.interestedStudents.addToSet(user._id);
        }

        await problem.save();

        return res.status(200).json({
            success: true,
            interested: !alreadyInterested,
            interestedCount: problem.interestedStudents.length,
            message: alreadyInterested
                ? "Interest removed."
                : "Interest recorded successfully.",
        });
    } catch (error) {
        console.error("Express interest error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update interest.",
        });
    }
};

// =====================================================
// CREATE CONTACT REQUEST — students only
// =====================================================

export const createContactRequest = async (req, res) => {
    try {
        const user = await canInteractWithProblem(req, res);
        if (!user) return;

        if (user.accountType !== "student") {
            return res.status(403).json({
                success: false,
                message:
                    "Only students can send contact requests.",
            });
        }

        const { id } = req.params;
        const message =
            typeof req.body.message === "string"
                ? req.body.message.trim()
                : "";

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        if (message.length > 1000) {
            return res.status(400).json({
                success: false,
                message:
                    "Contact message cannot exceed 1000 characters.",
            });
        }

        const visibleProblem = await getProblemForFeed(id);

        if (!visibleProblem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });
        }

        const problem = await ProblemPost.findById(id);

        const existingRequest = problem.contactRequests.find(
            (request) =>
                request.studentId.toString() ===
                user._id.toString() &&
                request.status !== "rejected"
        );

        if (existingRequest) {
            return res.status(409).json({
                success: false,
                message:
                    "You already have an active contact request for this problem.",
                request: existingRequest,
            });
        }

        problem.contactRequests.push({
            studentId: user._id,
            message,
            status: "pending",
            updatedAt: new Date(),
        });

        problem.interestedStudents.addToSet(user._id);

        await problem.save();

        const updatedProblem = await populateProblem(
            ProblemPost.findById(problem._id)
        );

        const request =
            updatedProblem.contactRequests[
            updatedProblem.contactRequests.length - 1
            ];

        return res.status(201).json({
            success: true,
            message: "Contact request sent successfully.",
            request,
        });
    } catch (error) {
        console.error("Create contact request error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send contact request.",
        });
    }
};

// =====================================================
// GET ENGAGEMENT — owner stakeholder only
// =====================================================

export const getProblemEngagement = async (req, res) => {
    try {
        const stakeholder = await getActiveUser(getUserId(req));

        if (!stakeholder) {
            return res.status(401).json({
                success: false,
                message: "Please log in again.",
            });
        }

        if (!isApprovedStakeholder(stakeholder)) {
            return res.status(403).json({
                success: false,
                message:
                    "Only approved stakeholders can view engagement details.",
            });
        }

        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID.",
            });
        }

        const problem = await populateProblem(
            ProblemPost.findOne({
                _id: id,
                stakeholderId: stakeholder._id,
            })
        );

        if (!problem) {
            return res.status(404).json({
                success: false,
                message:
                    "Problem not found or you do not own it.",
            });
        }

        const problemData = {
            _id: problem._id,
            title: problem.title,
            organizationName: problem.organizationName,
            status: problem.status,
        };

        const engagement = {
            problemId: problem._id,
            title: problem.title,
            likes: problem.likes,
            likesCount: problem.likes.length,
            savedBy: problem.savedBy,
            savesCount: problem.savedBy.length,
            interestedStudents: problem.interestedStudents,
            interestedCount: problem.interestedStudents.length,
            comments: problem.comments,
            commentsCount: problem.comments.length,
            contactRequests: problem.contactRequests,
            contactRequestsCount: problem.contactRequests.length,
            shareCount: problem.shareCount,
        };

        return res.status(200).json({
            success: true,
            engagement,
            problem: problemData,
            contactRequests: problem.contactRequests,
            responses: problem.contactRequests,
            count: problem.contactRequests.length,
        });
    } catch (error) {
        console.error("Get problem engagement error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch engagement details.",
        });
    }
};

// =====================================================
// ACCEPT / REJECT CONTACT REQUEST — owner stakeholder only
// =====================================================

export const updateContactRequestStatus = async (req, res) => {
    try {
        const stakeholder = await getActiveUser(getUserId(req));

        if (!stakeholder) {
            return res.status(401).json({
                success: false,
                message: "Please log in again.",
            });
        }

        if (!isApprovedStakeholder(stakeholder)) {
            return res.status(403).json({
                success: false,
                message:
                    "Only approved stakeholders can manage contact requests.",
            });
        }

        const { id, requestId } = req.params;
        const { status } = req.body;

        if (!isValidId(id) || !isValidId(requestId)) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid problem or contact request ID.",
            });
        }

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message:
                    "Status must be accepted or rejected.",
            });
        }

        const problem = await ProblemPost.findOne({
            _id: id,
            stakeholderId: stakeholder._id,
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message:
                    "Problem not found or you do not own it.",
            });
        }

        const request = problem.contactRequests.id(requestId);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Contact request not found.",
            });
        }

        request.status = status;
        request.updatedAt = new Date();

        await problem.save();

        const updatedProblem = await populateProblem(
            ProblemPost.findById(problem._id)
        );

        const updatedRequest =
            updatedProblem.contactRequests.id(requestId);

        return res.status(200).json({
            success: true,
            message: `Contact request ${status}.`,
            request: updatedRequest,
        });
    } catch (error) {
        console.error("Update contact request error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update contact request.",
        });
    }
};
