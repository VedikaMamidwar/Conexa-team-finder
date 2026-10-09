const MEMBER_FIELDS =
    "name email photo avatar college branch year location skills github linkedin portfolio";
 
// Load a team with populated members + the newest 10 activity entries
const loadTeam = async (teamId) => {
    const team = await Team.findById(teamId)
        .populate("members.user", MEMBER_FIELDS)
        .lean();
    if (team) {
        team.activity = (team.activity || [])
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);
    }
    return team;
};
 
const findMyTeam = (userId) => Team.findOne({ "members.user": userId });
 
const pushActivity = (team, text, userId) => {
    team.activity.push({ text, user: userId });
    if (team.activity.length > 50) team.activity.splice(0, team.activity.length - 50);
};
 
const isMember = (team, userId) =>
    team.members.some((m) => String(m.user) === String(userId));
 
// GET /api/teams/my-team
const getMyTeam = async (req, res) => {
    try {
        const mine = await findMyTeam(req.user._id);
        if (!mine) return res.status(200).json({ team: null });
        res.json({ team: await loadTeam(mine._id) });
    } catch (err) {
        console.error("getMyTeam:", err);
        res.status(500).json({ message: "Unable to load your team." });
    }
};
 
// POST /api/teams/:id/leave
const leaveTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found." });
        if (!isMember(team, req.user._id)) {
            return res.status(403).json({ message: "You are not a member of this team." });
        }
 
        const leaving = team.members.find((m) => String(m.user) === String(req.user._id));
        team.members = team.members.filter((m) => String(m.user) !== String(req.user._id));
 
        // Last member out -> delete the team
        if (team.members.length === 0) {
            await team.deleteOne();
            return res.json({ message: "You left the team. The team was removed." });
        }
 
        // Lead left -> promote the longest-standing member
        if (leaving.isLead) team.members[0].isLead = true;
 
        pushActivity(team, "A member left the team", req.user._id);
        await team.save();
        res.json({ message: "You have left the team." });
    } catch (err) {
        console.error("leaveTeam:", err);
        res.status(500).json({ message: "Unable to leave the team." });
    }
};
 
// POST /api/teams/:id/milestones   { title }
const addMilestone = async (req, res) => {
    try {
        const title = (req.body.title || "").trim();
        if (!title) return res.status(400).json({ message: "Milestone title is required." });
 
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found." });
        if (!isMember(team, req.user._id)) {
            return res.status(403).json({ message: "Only team members can do this." });
        }
        if (team.milestones.length >= 30) {
            return res.status(400).json({ message: "Milestone limit reached (30)." });
        }
 
        team.milestones.push({ title });
        pushActivity(team, `Milestone added: "${title}"`, req.user._id);
        await team.save();
 
        res.status(201).json({ team: await loadTeam(team._id) });
    } catch (err) {
        console.error("addMilestone:", err);
        res.status(500).json({ message: "Unable to add milestone." });
    }
};
 
// PATCH /api/teams/:id/milestones/:mid/toggle
const toggleMilestone = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found." });
        if (!isMember(team, req.user._id)) {
            return res.status(403).json({ message: "Only team members can do this." });
        }
 
        const milestone = team.milestones.id(req.params.mid);
        if (!milestone) return res.status(404).json({ message: "Milestone not found." });
 
        milestone.done = !milestone.done;
        milestone.completedAt = milestone.done ? new Date() : undefined;
        pushActivity(
            team,
            milestone.done
                ? `Milestone completed: "${milestone.title}"`
                : `Milestone reopened: "${milestone.title}"`,
            req.user._id
        );
        await team.save();
 
        res.json({ team: await loadTeam(team._id) });
    } catch (err) {
        console.error("toggleMilestone:", err);
        res.status(500).json({ message: "Unable to update milestone." });
    }
};