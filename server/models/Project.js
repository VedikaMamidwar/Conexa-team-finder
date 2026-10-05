import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    role: {
      type: String,
      trim: true,
      default: "Team Member",
    },

    college: {
      type: String,
      trim: true,
      default: "",
    },

    year: {
      type: String,
      trim: true,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    problemStatement: {
      type: String,
      trim: true,
      default: "",
    },

    objectives: {
      type: [String],
      default: [],
    },

    features: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      trim: true,
      default: "Web Development",
    },

    projectStatus: {
      type: String,
      enum: [
        "Completed",
        "In Progress",
        "Planned",
        "On Hold",
      ],
      default: "In Progress",
    },

    githubUrl: {
      type: String,
      trim: true,
      default: "",
    },

    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },

    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    challenges: {
      type: String,
      trim: true,
      default: "",
    },

    futureScope: {
      type: String,
      trim: true,
      default: "",
    },

    teamMembers: {
      type: [teamMemberSchema],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({
  title: "text",
  shortDescription: "text",
  description: "text",
  technologies: "text",
  category: "text",
});

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);

export default Project;
