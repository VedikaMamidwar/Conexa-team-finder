import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

function getUserId(req) {
  return (
    req.user?.id ||
    req.user?._id ||
    req.user?.userId ||
    req.user?.user_id
  );
}

function cleanArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function cleanTeamMembers(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((member) => member && typeof member === "object")
    .map((member) => ({
      name: String(member.name || "").trim(),
      role: String(
        member.role || "Team Member"
      ).trim(),
      college: String(member.college || "").trim(),
      year: String(member.year || "").trim(),
      skills: cleanArray(member.skills),
    }));
}

function projectPayload(body) {
  return {
    title: String(body.title || "").trim(),

    shortDescription: String(
      body.shortDescription || ""
    ).trim(),

    description: String(
      body.description || ""
    ).trim(),

    problemStatement: String(
      body.problemStatement || ""
    ).trim(),

    objectives: cleanArray(body.objectives),

    features: cleanArray(body.features),

    technologies: cleanArray(body.technologies),

    category:
      String(
        body.category || "Web Development"
      ).trim(),

    projectStatus:
      String(
        body.projectStatus || "In Progress"
      ).trim(),

    githubUrl: String(
      body.githubUrl || ""
    ).trim(),

    liveUrl: String(
      body.liveUrl || ""
    ).trim(),

    imageUrl: String(
      body.imageUrl || ""
    ).trim(),

    challenges: String(
      body.challenges || ""
    ).trim(),

    futureScope: String(
      body.futureScope || ""
    ).trim(),

    teamMembers: cleanTeamMembers(
      body.teamMembers
    ),
  };
}

/*
|--------------------------------------------------------------------------
| GET ALL PROJECTS
|--------------------------------------------------------------------------
| GET /api/projects
*/
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate(
        "createdBy",
        "name email username college year profilePicture avatar"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(
      "GET PROJECTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET SINGLE PROJECT
|--------------------------------------------------------------------------
| GET /api/projects/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    ).populate(
      "createdBy",
      "name email username college year profilePicture avatar"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "GET SINGLE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| CREATE PROJECT
|--------------------------------------------------------------------------
| POST /api/projects
|--------------------------------------------------------------------------
*/
router.post("/", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required to create a project.",
      });
    }

    const payload = projectPayload(req.body);

    if (!payload.title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required.",
      });
    }

    if (!payload.shortDescription) {
      return res.status(400).json({
        success: false,
        message:
          "Short project description is required.",
      });
    }

    if (!payload.description) {
      return res.status(400).json({
        success: false,
        message:
          "Project description is required.",
      });
    }

    const allowedStatuses = [
      "Completed",
      "In Progress",
      "Planned",
      "On Hold",
    ];

    if (
      !allowedStatuses.includes(
        payload.projectStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid project status.",
      });
    }

    const project = await Project.create({
      ...payload,
      createdBy: userId,
    });

    const populatedProject =
      await Project.findById(project._id).populate(
        "createdBy",
        "name email username college year profilePicture avatar"
      );

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: populatedProject,
    });
  } catch (error) {
    console.error(
      "CREATE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create project.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| UPDATE PROJECT
|--------------------------------------------------------------------------
| PUT /api/projects/:id
|--------------------------------------------------------------------------
*/
router.put("/:id", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required to update a project.",
      });
    }

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (
      String(project.createdBy) !==
      String(userId)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only edit your own projects.",
      });
    }

    const payload = projectPayload(req.body);

    if (!payload.title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required.",
      });
    }

    if (!payload.shortDescription) {
      return res.status(400).json({
        success: false,
        message:
          "Short project description is required.",
      });
    }

    if (!payload.description) {
      return res.status(400).json({
        success: false,
        message:
          "Project description is required.",
      });
    }

    const allowedStatuses = [
      "Completed",
      "In Progress",
      "Planned",
      "On Hold",
    ];

    if (
      !allowedStatuses.includes(
        payload.projectStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid project status.",
      });
    }

    Object.assign(project, payload);

    await project.save();

    const populatedProject =
      await Project.findById(project._id).populate(
        "createdBy",
        "name email username college year profilePicture avatar"
      );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project: populatedProject,
    });
  } catch (error) {
    console.error(
      "UPDATE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update project.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE PROJECT
|--------------------------------------------------------------------------
| DELETE /api/projects/:id
|--------------------------------------------------------------------------
*/
router.delete("/:id", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required to delete a project.",
      });
    }

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (
      String(project.createdBy) !==
      String(userId)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own projects.",
      });
    }

    await Project.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete project.",
    });
  }
});

export default router;
