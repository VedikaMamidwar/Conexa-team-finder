const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // <- your existing JWT middleware
 
router.get("/my-team", protect, getMyTeam);
router.post("/:id/leave", protect, leaveTeam);
router.post("/:id/milestones", protect, addMilestone);
router.patch("/:id/milestones/:mid/toggle", protect, toggleMilestone);
 
module.exports = router;
module.exports.Team = Team;
 