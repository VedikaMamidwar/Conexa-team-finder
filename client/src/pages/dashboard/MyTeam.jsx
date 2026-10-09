import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Users,
    User,
    FolderKanban,
    GraduationCap,
    MapPin,
    RefreshCw,
    LogOut,
    X,
    ShieldCheck,
    Crown,
    CalendarDays,
    Code2,
    Mail,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    Search,
    Copy,
    Check,
    Target,
    Plus,
    Activity,
    Sparkles,
    Circle,
    Rocket,
    Flag,
    ArrowRight,
    LayoutDashboard,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

/* =====================================================================
   CONNEXA theme
   Navy      #1E1B4B   Indigo    #312E81
   Teal      #14B8A6   Teal light #2DD4BF
   White     #FFFFFF   Soft gray #F8FAFC
   Text      #0F172A   Slate     #64748B   Border #E2E8F0
===================================================================== */

/* =====================================================================
   helpers
===================================================================== */

const getInitials = (name = "Student") => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "ST";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};

const skillLabel = (s) =>
    typeof s === "string" ? s : s?.name || s?.label || "Skill";

const timeAgo = (date) => {
    if (!date) return "";
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

const normalizeMember = (member, index) => {
    const user = member?.user || member?.member || member?.profile || member;
    return {
        id: member?._id || member?.id || user?._id || user?.id || `m-${index}`,
        name: user?.name || member?.name || "Team Member",
        email: user?.email || member?.email || "",
        photo: user?.photo || user?.avatar || member?.photo || member?.avatar || "",
        role: member?.role || member?.position || user?.role || "Team Member",
        college: user?.college || member?.college || "",
        branch: user?.branch || member?.branch || "",
        year: user?.year || member?.year || "",
        location: user?.location || member?.location || "",
        skills: user?.skills || member?.skills || [],
        github: user?.github || member?.github || "",
        linkedin: user?.linkedin || member?.linkedin || "",
        portfolio: user?.portfolio || member?.portfolio || "",
        isLead: member?.isLead ?? index === 0,
    };
};

const normalizeTeam = (data) => {
    const team = data?.team || data?.data?.team || data?.data || data;
    if (!team || typeof team !== "object") return null;

    const rawMembers = team.members || team.teamMembers || team.memberList || [];

    return {
        ...team,
        name: team.name || team.teamName || "My Team",
        project: team.project || team.projectTitle || team.title || "Project not specified",
        description: team.description || "No project description has been added yet.",
        hackathon: team.hackathon || team.event || "",
        college: team.college || "",
        branch: team.branch || "",
        year: team.year || "",
        maxMembers: team.maxMembers || team.teamSize || rawMembers.length || 4,
        skills: team.skills || team.techStack || [],
        visibility: team.visibility || "Private",
        inviteCode: team.inviteCode || "",
        milestones: team.milestones || [],
        activity: team.activity || [],
        members: rawMembers.map(normalizeMember),
    };
};

/* =====================================================================
   demo data (shown when the backend is unavailable)
===================================================================== */

const ago = (mins) => new Date(Date.now() - mins * 60000).toISOString();

const DEMO_TEAM = {
    _id: "demo-team",
    name: "Team Nexus",
    project: "CONNEXA – Student Collaboration Platform",
    description:
        "A platform that helps students find teammates, form hackathon teams and build projects together, with real-time chat, skill matching and progress tracking.",
    hackathon: "Smart India Hackathon 2026",
    college: "Shri Ramdeobaba College of Engineering",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    maxMembers: 5,
    visibility: "Private",
    inviteCode: "NX7A2C",
    skills: ["React", "Node.js", "MongoDB", "UI/UX", "Python"],
    members: [
        {
            _id: "d1",
            role: "Team Lead · Full Stack",
            isLead: true,
            user: {
                name: "Aarav Sharma",
                email: "aarav.sharma@example.com",
                college: "RCOEM, Nagpur",
                branch: "CSE",
                year: "3rd Year",
                location: "Nagpur, Maharashtra",
                skills: ["React", "Node.js", "MongoDB", "System Design"],
                github: "https://github.com/",
                linkedin: "https://linkedin.com/",
            },
        },
        {
            _id: "d2",
            role: "Frontend Developer",
            user: {
                name: "Ishita Verma",
                email: "ishita.verma@example.com",
                college: "RCOEM, Nagpur",
                branch: "CSE",
                year: "3rd Year",
                location: "Pune, Maharashtra",
                skills: ["React", "Tailwind CSS", "Framer Motion"],
                github: "https://github.com/",
                portfolio: "https://example.com/",
            },
        },
        {
            _id: "d3",
            role: "Backend Developer",
            user: {
                name: "Rohan Deshmukh",
                email: "rohan.deshmukh@example.com",
                college: "RCOEM, Nagpur",
                branch: "IT",
                year: "3rd Year",
                location: "Nagpur, Maharashtra",
                skills: ["Node.js", "MongoDB", "REST APIs", "Docker"],
                github: "https://github.com/",
            },
        },
        {
            _id: "d4",
            role: "UI/UX Designer",
            user: {
                name: "Meera Kulkarni",
                email: "meera.kulkarni@example.com",
                college: "RCOEM, Nagpur",
                branch: "CSE (AI)",
                year: "2nd Year",
                location: "Mumbai, Maharashtra",
                skills: ["Figma", "UI/UX", "React"],
                linkedin: "https://linkedin.com/",
                portfolio: "https://example.com/",
            },
        },
    ],
    milestones: [
        { _id: "ms1", title: "Finalize idea & problem statement", done: true },
        { _id: "ms2", title: "Design UI in Figma", done: true },
        { _id: "ms3", title: "Authentication & profile module", done: true },
        { _id: "ms4", title: "Team building & chat module", done: false },
        { _id: "ms5", title: "Deploy & prepare final presentation", done: false },
    ],
    activity: [
        { _id: "a1", text: 'Milestone completed: "Authentication & profile module"', createdAt: ago(35) },
        { _id: "a2", text: "Meera Kulkarni joined the team", createdAt: ago(60 * 5) },
        { _id: "a3", text: 'Milestone completed: "Design UI in Figma"', createdAt: ago(60 * 26) },
        { _id: "a4", text: "Team Nexus was created", createdAt: ago(60 * 24 * 4) },
    ],
};

/* =====================================================================
   small UI pieces
===================================================================== */

const KEYFRAMES = `
@keyframes cxFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
@keyframes cxDash { to { stroke-dashoffset: -24; } }
@keyframes cxRise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
@keyframes cxGlow { 0%,100% { box-shadow: 0 0 40px 6px rgba(20,184,166,.45) } 50% { box-shadow: 0 0 64px 14px rgba(45,212,191,.5) } }
.cx-rise { animation: cxRise .55s ease both; }
`;

function Avatar({ member, size = "h-14 w-14", text = "text-lg", ring = "ring-2 ring-[#E2E8F0]" }) {
    return member.photo ? (
        <img
            src={member.photo}
            alt={member.name}
            className={`${size} shrink-0 rounded-2xl object-cover ${ring}`}
        />
    ) : (
        <div
            className={`${size} ${text} ${ring} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#312E81] to-[#14B8A6] font-bold text-white`}
        >
            {getInitials(member.name)}
        </div>
    );
}

/** The signature element: members orbiting the project. */
function Constellation({ members, openSlots, project, onSelect, onCopyInvite }) {
    const seats = [
        ...members.map((m) => ({ type: "member", member: m })),
        ...Array.from({ length: openSlots }, (_, i) => ({ type: "open", key: `open-${i}` })),
    ];
    const total = seats.length || 1;

    const pos = (i) => {
        const a = (i / total) * 2 * Math.PI - Math.PI / 2;
        return { x: 50 + 38 * Math.cos(a), y: 50 + 36 * Math.sin(a) };
    };

    return (
        <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
            {/* orbit rings */}
            <div className="absolute left-1/2 top-1/2 h-[74%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" />
            <div className="absolute left-1/2 top-1/2 h-[40%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

            {/* connection lines */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                {seats.map((seat, i) => {
                    const { x, y } = pos(i);
                    return (
                        <line
                            key={i}
                            x1="50"
                            y1="50"
                            x2={x}
                            y2={y}
                            stroke={seat.type === "member" ? "rgba(45,212,191,.6)" : "rgba(45,212,191,.2)"}
                            strokeWidth="1.5"
                            strokeDasharray="4 8"
                            vectorEffect="non-scaling-stroke"
                            style={{ animation: "cxDash 2.4s linear infinite" }}
                        />
                    );
                })}
            </svg>

            {/* centre orb */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2DD4BF] via-[#14B8A6] to-[#312E81] text-white sm:h-28 sm:w-28"
                    style={{ animation: "cxGlow 3.5s ease-in-out infinite" }}
                >
                    <div className="text-center">
                        <Rocket size={26} className="mx-auto" />
                        <p className="mt-1 max-w-[84px] truncate px-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            {project.split(/[–-]/)[0].trim().slice(0, 14)}
                        </p>
                    </div>
                </div>
            </div>

            {/* member / open seat nodes */}
            {seats.map((seat, i) => {
                const { x, y } = pos(i);
                return (
                    <div
                        key={seat.type === "member" ? seat.member.id : seat.key}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                    >
                        <div
                            style={{
                                animation: "cxFloat 5s ease-in-out infinite",
                                animationDelay: `${i * 0.6}s`,
                            }}
                        >
                            {seat.type === "member" ? (
                                <button
                                    type="button"
                                    onClick={() => onSelect(seat.member)}
                                    className="group flex flex-col items-center gap-1.5 focus:outline-none"
                                    title={`${seat.member.name} – ${seat.member.role}`}
                                >
                                    <span className="relative">
                                        {seat.member.isLead && (
                                            <span className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#14B8A6] text-white ring-2 ring-[#1E1B4B]">
                                                <Crown size={10} />
                                            </span>
                                        )}
                                        <Avatar
                                            member={seat.member}
                                            size="h-12 w-12 sm:h-14 sm:w-14"
                                            text="text-base"
                                            ring="ring-2 ring-white/40 transition group-hover:ring-[#2DD4BF] group-hover:scale-110"
                                        />
                                    </span>
                                    <span className="max-w-[84px] truncate rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur sm:text-[11px]">
                                        {seat.member.name.split(" ")[0]}
                                    </span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={onCopyInvite}
                                    className="group flex flex-col items-center gap-1.5 focus:outline-none"
                                    title="Open seat – copy the invite code"
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-dashed border-white/35 text-white/60 transition group-hover:border-[#2DD4BF] group-hover:text-[#2DD4BF] sm:h-14 sm:w-14">
                                        <Plus size={20} />
                                    </span>
                                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-[#2DD4BF] sm:text-[11px]">
                                        Open seat
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function Radar({ data, total }) {
    const size = 280;
    const c = size / 2;
    const R = 78;
    const n = data.length;
    const pt = (i, v) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2;
        return [c + R * v * Math.cos(a), c + R * v * Math.sin(a)];
    };
    const ring = (v) => data.map((_, i) => pt(i, v).join(",")).join(" ");
    const poly = data.map(([, count], i) => pt(i, count / total).join(",")).join(" ");

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[290px]">
            {[0.33, 0.66, 1].map((v) => (
                <polygon key={v} points={ring(v)} fill="none" stroke="#E2E8F0" strokeWidth="1" />
            ))}
            {data.map((_, i) => {
                const [x, y] = pt(i, 1);
                return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#E2E8F0" />;
            })}
            <polygon points={poly} fill="rgba(20,184,166,0.25)" stroke="#14B8A6" strokeWidth="2" />
            {data.map(([label, count], i) => {
                const [x, y] = pt(i, count / total);
                const [lx, ly] = pt(i, 1.34);
                return (
                    <g key={label}>
                        <circle cx={x} cy={y} r="4" fill="#14B8A6" stroke="white" strokeWidth="1.5" />
                        <text
                            x={lx}
                            y={ly}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fontWeight="600"
                            fill="#64748B"
                        >
                            {label.length > 10 ? `${label.slice(0, 9)}…` : label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

function GlassStat({ icon: Icon, label, value }) {
    return (
        <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#2DD4BF]">
                <Icon size={13} />
                {label}
            </div>
            <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
    );
}

/* =====================================================================
   page
===================================================================== */

export default function MyTeam() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [demo, setDemo] = useState(false);

    const [tab, setTab] = useState("overview");
    const [selectedMember, setSelectedMember] = useState(null);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [leaving, setLeaving] = useState(false);

    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(false);
    const [newMilestone, setNewMilestone] = useState("");
    const [addingMilestone, setAddingMilestone] = useState(false);

    const authHeaders = () => ({
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
    });

    const fetchTeam = useCallback(async (showRefresh = false) => {
        if (!getToken()) {
            setTeam(normalizeTeam(DEMO_TEAM));
            setDemo(true);
            setLoading(false);
            return;
        }

        showRefresh ? setRefreshing(true) : setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(`${API_URL}/teams/my-team`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result?.message || result?.error || "Unable to load your team.");
            }

            const loaded = result?.team === null ? null : normalizeTeam(result);
            if (loaded) {
                setTeam(loaded);
                setDemo(false);
            } else {
                setTeam(normalizeTeam(DEMO_TEAM));
                setDemo(true);
            }
        } catch (err) {
            console.error("My Team error (showing demo data):", err);
            setTeam(normalizeTeam(DEMO_TEAM));
            setDemo(true);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    const teamId = team?._id || team?.id;

    /* ---------- actions ---------- */

    const handleLeaveTeam = async () => {
        if (!teamId) return;
        if (demo) {
            setShowLeaveModal(false);
            setTeam(null);
            setMessage("Demo team cleared. Hit Refresh to bring it back.");
            return;
        }
        setLeaving(true);
        setError("");
        try {
            const response = await fetch(`${API_URL}/teams/${teamId}/leave`, {
                method: "POST",
                headers: authHeaders(),
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(result?.message || result?.error || "Unable to leave the team.");
            }
            setShowLeaveModal(false);
            setTeam(null);
            setMessage("You have successfully left the team.");
        } catch (err) {
            setError(err.message || "Unable to leave the team.");
        } finally {
            setLeaving(false);
        }
    };

    const handleCopyInvite = async () => {
        if (!team?.inviteCode) return;
        try {
            await navigator.clipboard.writeText(team.inviteCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            setError("Could not copy the invite code.");
        }
    };

    const handleToggleMilestone = async (milestone) => {
        const mid = milestone._id || milestone.id;
        const previous = team.milestones;

        setTeam((t) => ({
            ...t,
            milestones: t.milestones.map((m) =>
                (m._id || m.id) === mid ? { ...m, done: !m.done } : m
            ),
        }));

        if (demo) return;

        try {
            const response = await fetch(
                `${API_URL}/teams/${teamId}/milestones/${mid}/toggle`,
                { method: "PATCH", headers: authHeaders() }
            );
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result?.message || "Unable to update milestone.");
            if (result?.team) setTeam(normalizeTeam(result));
        } catch (err) {
            setTeam((t) => ({ ...t, milestones: previous }));
            setError(err.message);
        }
    };

    const handleAddMilestone = async (event) => {
        event.preventDefault();
        const title = newMilestone.trim();
        if (!title) return;

        if (demo) {
            setTeam((t) => ({
                ...t,
                milestones: [...t.milestones, { _id: `d-${Date.now()}`, title, done: false }],
                activity: [
                    {
                        _id: `da-${Date.now()}`,
                        text: `Milestone added: "${title}"`,
                        createdAt: new Date().toISOString(),
                    },
                    ...t.activity,
                ],
            }));
            setNewMilestone("");
            return;
        }

        setAddingMilestone(true);
        setError("");
        try {
            const response = await fetch(`${API_URL}/teams/${teamId}/milestones`, {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify({ title }),
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result?.message || "Unable to add milestone.");
            setTeam(normalizeTeam(result));
            setNewMilestone("");
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingMilestone(false);
        }
    };

    /* ---------- derived ---------- */

    const memberCount = team?.members?.length || 0;
    const maxMembers = team?.maxMembers || memberCount || 1;
    const openSlots = Math.max(maxMembers - memberCount, 0);

    const milestones = team?.milestones || [];
    const doneCount = milestones.filter((m) => m.done).length;
    const progress = milestones.length ? Math.round((doneCount / milestones.length) * 100) : 0;
    const nextUp = milestones.find((m) => !m.done);

    const filteredMembers = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!team) return [];
        if (!q) return team.members;
        return team.members.filter((m) =>
            [m.name, m.role, m.branch, m.college, ...(m.skills || []).map(skillLabel)]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [team, search]);

    const skillCoverage = useMemo(() => {
        if (!team) return [];
        const counts = {};
        team.members.forEach((m) =>
            (m.skills || []).forEach((s) => {
                const key = skillLabel(s);
                counts[key] = (counts[key] || 0) + 1;
            })
        );
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    }, [team]);

    /* ---------- layout ---------- */

    // NOTE: a plain function (not a component) so inputs keep focus while typing.
    const shell = (children) => (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl space-y-6">{children}</div>
                </main>
            </div>
        </div>
    );

    if (loading) {
        return shell(
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-64 rounded-xl bg-[#E2E8F0]" />
                <div className="h-96 rounded-[2rem] bg-[#E2E8F0]" />
                <div className="h-12 w-80 rounded-2xl bg-[#E2E8F0]" />
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="h-72 rounded-3xl bg-[#E2E8F0] lg:col-span-2" />
                    <div className="h-72 rounded-3xl bg-[#E2E8F0]" />
                </div>
            </div>
        );
    }

    const tabs = [
        ["overview", "Overview", LayoutDashboard, null],
        ["crew", "Crew", Users, memberCount],
        ["roadmap", "Roadmap", Flag, `${doneCount}/${milestones.length}`],
    ];

    return (
        <>
            <style>{KEYFRAMES}</style>

            {shell(
                <>
                    {/* Header */}
                    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#14B8A6]">
                                <Users size={17} />
                                Team Workspace
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
                                My Team
                            </h1>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => fetchTeam(true)}
                                disabled={refreshing}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#312E81] shadow-sm transition hover:border-[#14B8A6] hover:bg-[#14B8A6]/10 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
                                Refresh
                            </button>
                            {team && (
                                <button
                                    type="button"
                                    onClick={() => setShowLeaveModal(true)}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
                                >
                                    <LogOut size={17} />
                                    Leave Team
                                </button>
                            )}
                        </div>
                    </section>

                    {error && (
                        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                            <AlertCircle className="mt-0.5 shrink-0" size={19} />
                            <div>
                                <p className="font-semibold">Something went wrong</p>
                                <p className="mt-1 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="flex items-center gap-3 rounded-2xl border border-[#14B8A6]/30 bg-[#14B8A6]/10 p-4 text-[#1E1B4B]">
                            <CheckCircle2 size={19} className="text-[#14B8A6]" />
                            <p className="text-sm font-semibold">{message}</p>
                        </div>
                    )}

                    {demo && team && (
                        <div className="flex items-center gap-3 rounded-2xl border border-[#312E81]/20 bg-[#312E81]/5 p-4 text-[#312E81]">
                            <Sparkles size={19} className="shrink-0 text-[#14B8A6]" />
                            <p className="text-sm font-semibold">
                                Demo mode: showing sample data because no live team was found.
                                Changes here are not saved.
                            </p>
                        </div>
                    )}

                    {/* No team */}
                    {!team && !error && (
                        <section className="rounded-3xl border border-[#E2E8F0] bg-white px-6 py-16 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                <Users size={30} />
                            </div>
                            <h2 className="mt-5 text-2xl font-bold text-[#0F172A]">
                                You are not in a team yet
                            </h2>
                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
                                Once you create or join a team, your constellation of teammates
                                will appear here.
                            </p>
                            <div className="mt-6">
                                <a
                                    href="/build-team"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#14B8A6]/30 transition hover:bg-[#0F9F8F]"
                                >
                                    <Users size={17} />
                                    Build a Team
                                </a>
                            </div>
                        </section>
                    )}

                    {team && (
                        <>
                            {/* ================= HERO ================= */}
                            <section className="cx-rise relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] p-6 shadow-2xl shadow-[#1E1B4B]/30 md:p-10">
                                {/* starfield */}
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(circle, rgba(255,255,255,.9) 1px, transparent 1.5px)",
                                        backgroundSize: "46px 46px",
                                    }}
                                />
                                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#312E81]/50 blur-3xl" />
                                <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#14B8A6]/25 blur-3xl" />

                                <div className="relative grid items-center gap-10 lg:grid-cols-2">
                                    {/* left */}
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                                                <ShieldCheck size={14} className="text-[#2DD4BF]" />
                                                {team.visibility} team
                                            </span>
                                            {team.hackathon && (
                                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                                                    <CalendarDays size={14} className="text-[#2DD4BF]" />
                                                    {team.hackathon}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="mt-5 break-words text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                                            {team.name}
                                        </h2>

                                        <p className="mt-3 flex items-start gap-2 text-slate-300">
                                            <FolderKanban size={18} className="mt-0.5 shrink-0 text-[#2DD4BF]" />
                                            <span className="font-medium">{team.project}</span>
                                        </p>

                                        {/* mission progress */}
                                        <div className="mt-7 max-w-md">
                                            <div className="flex items-end justify-between">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-[#2DD4BF]">
                                                    Mission progress
                                                </span>
                                                <span className="text-2xl font-bold text-white">{progress}%</span>
                                            </div>
                                            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF] transition-all duration-700"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* stats */}
                                        <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
                                            <GlassStat icon={Users} label="Crew" value={`${memberCount}/${maxMembers}`} />
                                            <GlassStat icon={Target} label="Done" value={`${doneCount}/${milestones.length}`} />
                                            <GlassStat icon={Code2} label="Skills" value={skillCoverage.length} />
                                        </div>

                                        {team.inviteCode && (
                                            <button
                                                type="button"
                                                onClick={handleCopyInvite}
                                                className="mt-7 inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#2DD4BF] hover:bg-white/20"
                                            >
                                                <span className="text-xs uppercase tracking-wider text-[#2DD4BF]">
                                                    Invite code
                                                </span>
                                                <span className="font-mono tracking-widest">{team.inviteCode}</span>
                                                {copied ? <Check size={16} className="text-[#2DD4BF]" /> : <Copy size={16} />}
                                            </button>
                                        )}
                                    </div>

                                    {/* right: constellation */}
                                    <Constellation
                                        members={team.members}
                                        openSlots={openSlots}
                                        project={team.project}
                                        onSelect={setSelectedMember}
                                        onCopyInvite={handleCopyInvite}
                                    />
                                </div>
                            </section>

                            {/* ================= TABS ================= */}
                            <div className="flex w-full gap-1 overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white p-1.5 shadow-sm sm:w-fit">
                                {tabs.map(([key, label, Icon, badge]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setTab(key)}
                                        className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                            tab === key
                                                ? "bg-gradient-to-r from-[#1E1B4B] to-[#312E81] text-white shadow-md shadow-[#1E1B4B]/25"
                                                : "text-[#64748B] hover:bg-[#14B8A6]/10 hover:text-[#312E81]"
                                        }`}
                                    >
                                        <Icon size={16} className={tab === key ? "text-[#2DD4BF]" : ""} />
                                        {label}
                                        {badge !== null && (
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[11px] ${
                                                    tab === key
                                                        ? "bg-[#14B8A6] text-white"
                                                        : "bg-[#F8FAFC] text-[#64748B]"
                                                }`}
                                            >
                                                {badge}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* ================= OVERVIEW ================= */}
                            {tab === "overview" && (
                                <div className="cx-rise grid gap-6 lg:grid-cols-3">
                                    <div className="space-y-6 lg:col-span-2">
                                        {/* Mission brief */}
                                        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                                    <Rocket size={19} />
                                                </div>
                                                <h3 className="text-xl font-bold text-[#0F172A]">Mission brief</h3>
                                            </div>

                                            <p className="mt-4 text-sm leading-7 text-[#64748B] md:text-base">
                                                {team.description}
                                            </p>

                                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                                {[
                                                    [GraduationCap, "College", team.college],
                                                    [Code2, "Branch", team.branch],
                                                    [CalendarDays, "Year", team.year],
                                                ]
                                                    .filter(([, , v]) => v)
                                                    .map(([Icon, label, value]) => (
                                                        <div key={label} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                                            <Icon size={17} className="text-[#14B8A6]" />
                                                            <p className="mt-2 text-xs font-semibold text-[#64748B]">
                                                                {label}
                                                            </p>
                                                            <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                                                                {value}
                                                            </p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>

                                        {/* Next up */}
                                        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#312E81] p-6 text-white shadow-lg shadow-[#1E1B4B]/25 md:p-8">
                                            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#14B8A6]/30 blur-2xl" />
                                            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2DD4BF]">
                                                        <Flag size={14} />
                                                        Next up
                                                    </p>
                                                    <p className="mt-2 text-xl font-bold md:text-2xl">
                                                        {nextUp
                                                            ? nextUp.title
                                                            : milestones.length
                                                            ? "Every milestone is complete. Mission accomplished!"
                                                            : "Add your first milestone"}
                                                    </p>
                                                </div>

                                                {nextUp ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleMilestone(nextUp)}
                                                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#2DD4BF] hover:text-[#1E1B4B]"
                                                    >
                                                        <Check size={16} />
                                                        Mark as done
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => setTab("roadmap")}
                                                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#2DD4BF] hover:text-[#1E1B4B]"
                                                    >
                                                        Open roadmap
                                                        <ArrowRight size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </section>

                                        {/* Activity */}
                                        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8">
                                            <div className="flex items-center gap-2">
                                                <Activity size={18} className="text-[#14B8A6]" />
                                                <h3 className="text-lg font-bold text-[#0F172A]">Recent activity</h3>
                                            </div>

                                            {team.activity?.length > 0 ? (
                                                <ol className="relative mt-6 space-y-5 border-l-2 border-[#E2E8F0] pl-6">
                                                    {team.activity.slice(0, 6).map((a, i) => (
                                                        <li key={a._id || i} className="relative">
                                                            <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-gradient-to-br from-[#14B8A6] to-[#2DD4BF] ring-2 ring-[#14B8A6]/20" />
                                                            <p className="text-sm font-medium text-[#0F172A]">{a.text}</p>
                                                            <p className="mt-0.5 text-xs text-[#64748B]">
                                                                {timeAgo(a.createdAt)}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ol>
                                            ) : (
                                                <p className="mt-4 text-sm text-[#64748B]">
                                                    Activity will show up here as your team makes progress.
                                                </p>
                                            )}
                                        </section>
                                    </div>

                                    {/* right column */}
                                    <aside className="space-y-6">
                                        <section className="rounded-3xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] p-6 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                                    <Code2 size={19} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-[#0F172A]">Skill radar</h3>
                                                    <p className="text-xs text-[#64748B]">
                                                        What your crew can build
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                {skillCoverage.length >= 3 ? (
                                                    <Radar
                                                        data={skillCoverage.slice(0, 6)}
                                                        total={Math.max(memberCount, 1)}
                                                    />
                                                ) : skillCoverage.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {skillCoverage.map(([skill, count]) => (
                                                            <div key={skill}>
                                                                <div className="mb-1 flex justify-between text-xs font-semibold text-[#64748B]">
                                                                    <span>{skill}</span>
                                                                    <span className="text-[#312E81]">
                                                                        {count}/{memberCount}
                                                                    </span>
                                                                </div>
                                                                <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                                                                    <div
                                                                        className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]"
                                                                        style={{
                                                                            width: `${(count / Math.max(memberCount, 1)) * 100}%`,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-[#64748B]">No skills added yet.</p>
                                                )}
                                            </div>

                                            {skillCoverage.length > 0 && (
                                                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[#E2E8F0] pt-4">
                                                    {skillCoverage.slice(0, 8).map(([skill, count]) => (
                                                        <span
                                                            key={skill}
                                                            className="rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-2.5 py-1 text-[11px] font-semibold text-[#312E81]"
                                                        >
                                                            {skill} · {count}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </section>

                                        {openSlots > 0 && (
                                            <section className="rounded-3xl border-2 border-dashed border-[#14B8A6]/40 bg-white p-6 text-center">
                                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                                    <Plus size={22} />
                                                </div>
                                                <h3 className="mt-3 font-bold text-[#0F172A]">
                                                    {openSlots} seat{openSlots === 1 ? "" : "s"} still open
                                                </h3>
                                                <p className="mt-1 text-sm text-[#64748B]">
                                                    Invite a teammate with your code, or search for the right skills.
                                                </p>
                                                <div className="mt-4 flex flex-col gap-2">
                                                    {team.inviteCode && (
                                                        <button
                                                            type="button"
                                                            onClick={handleCopyInvite}
                                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0F9F8F]"
                                                        >
                                                            {copied ? <Check size={15} /> : <Copy size={15} />}
                                                            {copied ? "Copied!" : "Copy invite code"}
                                                        </button>
                                                    )}
                                                    <a
                                                        href="/find-teammates"
                                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#312E81] transition hover:border-[#14B8A6] hover:bg-[#14B8A6]/10"
                                                    >
                                                        Find teammates
                                                        <ArrowRight size={15} />
                                                    </a>
                                                </div>
                                            </section>
                                        )}
                                    </aside>
                                </div>
                            )}

                            {/* ================= CREW ================= */}
                            {tab === "crew" && (
                                <section className="cx-rise space-y-5">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#0F172A]">Meet the crew</h3>
                                            <p className="mt-1 text-sm text-[#64748B]">
                                                {memberCount} member{memberCount === 1 ? "" : "s"} building {team.project}
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <Search
                                                size={15}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                                            />
                                            <input
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                placeholder="Search name, role or skill"
                                                className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 sm:w-64"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                        {filteredMembers.map((member) => {
                                            const depth = Math.min(((member.skills?.length || 0) / 6) * 100, 100);
                                            return (
                                                <article
                                                    key={member.id}
                                                    className="group overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#14B8A6] hover:shadow-xl hover:shadow-[#14B8A6]/15"
                                                >
                                                    {/* banner */}
                                                    <div className="relative h-24 overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#14B8A6]">
                                                        <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[88px] font-black leading-none text-white/10">
                                                            {getInitials(member.name)}
                                                        </span>
                                                        {member.isLead && (
                                                            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                                                                <Crown size={11} className="text-[#2DD4BF]" />
                                                                Team lead
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="relative px-5 pb-5">
                                                        <div className="-mt-9">
                                                            <Avatar
                                                                member={member}
                                                                size="h-[72px] w-[72px]"
                                                                text="text-2xl"
                                                                ring="ring-4 ring-white shadow-md"
                                                            />
                                                        </div>

                                                        <h4 className="mt-3 truncate text-lg font-bold text-[#0F172A]">
                                                            {member.name}
                                                        </h4>
                                                        <p className="text-sm font-semibold text-[#312E81]">
                                                            {member.role}
                                                        </p>

                                                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#64748B]">
                                                            {member.branch && (
                                                                <span className="flex items-center gap-1">
                                                                    <Code2 size={12} />
                                                                    {member.branch}
                                                                </span>
                                                            )}
                                                            {member.year && (
                                                                <span className="flex items-center gap-1">
                                                                    <GraduationCap size={12} />
                                                                    {member.year}
                                                                </span>
                                                            )}
                                                            {member.location && (
                                                                <span className="flex items-center gap-1">
                                                                    <MapPin size={12} />
                                                                    {member.location}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* skill depth */}
                                                        <div className="mt-4">
                                                            <div className="mb-1 flex justify-between text-[11px] font-semibold text-[#64748B]">
                                                                <span>SKILL DEPTH</span>
                                                                <span className="text-[#312E81]">
                                                                    {member.skills?.length || 0} skills
                                                                </span>
                                                            </div>
                                                            <div className="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                                                                <div
                                                                    className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]"
                                                                    style={{ width: `${depth}%` }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {member.skills?.length > 0 && (
                                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                                {member.skills.slice(0, 4).map((s, i) => (
                                                                    <span
                                                                        key={`${skillLabel(s)}-${i}`}
                                                                        className="rounded-full bg-[#14B8A6]/10 px-2.5 py-1 text-[11px] font-semibold text-[#312E81]"
                                                                    >
                                                                        {skillLabel(s)}
                                                                    </span>
                                                                ))}
                                                                {member.skills.length > 4 && (
                                                                    <span className="rounded-full bg-[#F8FAFC] px-2.5 py-1 text-[11px] font-semibold text-[#64748B]">
                                                                        +{member.skills.length - 4}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedMember(member)}
                                                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#312E81] transition group-hover:border-[#1E1B4B] group-hover:bg-[#1E1B4B] group-hover:text-white"
                                                        >
                                                            <User size={16} />
                                                            View Profile
                                                        </button>
                                                    </div>
                                                </article>
                                            );
                                        })}

                                        {/* open seats */}
                                        {!search &&
                                            Array.from({ length: openSlots }).map((_, i) => (
                                                <button
                                                    key={`seat-${i}`}
                                                    type="button"
                                                    onClick={handleCopyInvite}
                                                    className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#14B8A6]/40 bg-white/60 p-6 text-center transition hover:border-[#14B8A6] hover:bg-[#14B8A6]/10"
                                                >
                                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                                        <Plus size={24} />
                                                    </span>
                                                    <span className="mt-4 font-bold text-[#0F172A]">Open seat</span>
                                                    <span className="mt-1 text-sm text-[#64748B]">
                                                        {team.inviteCode
                                                            ? copied
                                                                ? "Invite code copied!"
                                                                : "Tap to copy your invite code"
                                                            : "Invite someone to join"}
                                                    </span>
                                                </button>
                                            ))}
                                    </div>

                                    {filteredMembers.length === 0 && (
                                        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-10 text-center text-sm text-[#64748B]">
                                            No crew members match your search.
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* ================= ROADMAP ================= */}
                            {tab === "roadmap" && (
                                <section className="cx-rise grid gap-6 lg:grid-cols-3">
                                    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8 lg:col-span-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-[#0F172A]">Project roadmap</h3>
                                                <p className="mt-1 text-sm text-[#64748B]">
                                                    Tap a station to mark it done.
                                                </p>
                                            </div>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                                <Flag size={19} />
                                            </div>
                                        </div>

                                        {milestones.length === 0 ? (
                                            <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-8 text-center text-sm text-[#64748B]">
                                                No milestones yet. Add your first one below.
                                            </div>
                                        ) : (
                                            <ol className="relative mt-8 space-y-4 pl-12 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-0.5 before:bg-[#E2E8F0]">
                                                {milestones.map((m, i) => {
                                                    const mid = m._id || m.id;
                                                    const isNext = nextUp && (nextUp._id || nextUp.id) === mid;
                                                    return (
                                                        <li key={mid} className="relative">
                                                            <span
                                                                className={`absolute -left-12 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold ${
                                                                    m.done
                                                                        ? "bg-gradient-to-br from-[#14B8A6] to-[#2DD4BF] text-white shadow-md shadow-[#14B8A6]/30"
                                                                        : isNext
                                                                        ? "border-2 border-[#312E81] bg-white text-[#312E81]"
                                                                        : "border-2 border-[#E2E8F0] bg-white text-[#64748B]"
                                                                }`}
                                                            >
                                                                {m.done ? <Check size={17} /> : i + 1}
                                                                {isNext && (
                                                                    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#14B8A6]/40" />
                                                                )}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggleMilestone(m)}
                                                                className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                                                                    m.done
                                                                        ? "border-[#14B8A6]/30 bg-[#14B8A6]/10"
                                                                        : isNext
                                                                        ? "border-[#312E81]/40 bg-white shadow-md shadow-[#312E81]/10"
                                                                        : "border-[#E2E8F0] bg-white hover:border-[#14B8A6] hover:bg-[#F8FAFC]"
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`text-sm font-semibold ${
                                                                        m.done
                                                                            ? "text-[#64748B] line-through decoration-[#14B8A6]"
                                                                            : "text-[#0F172A]"
                                                                    }`}
                                                                >
                                                                    {m.title}
                                                                </span>
                                                                {isNext ? (
                                                                    <span className="shrink-0 rounded-full bg-[#1E1B4B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                                                        Next up
                                                                    </span>
                                                                ) : m.done ? (
                                                                    <CheckCircle2 size={18} className="shrink-0 text-[#14B8A6]" />
                                                                ) : (
                                                                    <Circle size={18} className="shrink-0 text-[#E2E8F0]" />
                                                                )}
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ol>
                                        )}

                                        <form onSubmit={handleAddMilestone} className="mt-8 flex gap-2">
                                            <input
                                                value={newMilestone}
                                                onChange={(e) => setNewMilestone(e.target.value)}
                                                placeholder="Add a milestone, e.g. Finish login module"
                                                maxLength={120}
                                                className="min-w-0 flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/15"
                                            />
                                            <button
                                                type="submit"
                                                disabled={addingMilestone || !newMilestone.trim()}
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#14B8A6]/30 transition hover:bg-[#0F9F8F] disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Plus size={16} />
                                                Add
                                            </button>
                                        </form>
                                    </div>

                                    {/* progress card */}
                                    <aside className="h-fit rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] p-6 text-white shadow-xl shadow-[#1E1B4B]/25 md:p-8">
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#2DD4BF]">
                                            Overall progress
                                        </p>
                                        <p className="mt-2 text-6xl font-extrabold">{progress}%</p>
                                        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF] transition-all duration-700"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <p className="mt-4 text-sm text-slate-300">
                                            {doneCount} of {milestones.length} milestones completed
                                            {nextUp ? `. Next: ${nextUp.title}` : "."}
                                        </p>
                                    </aside>
                                </section>
                            )}
                        </>
                    )}
                </>
            )}

            {/* ================= PROFILE MODAL ================= */}
            {selectedMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-sm"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setSelectedMember(null);
                    }}
                >
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
                        <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] p-6 text-white">
                            <button
                                type="button"
                                onClick={() => setSelectedMember(null)}
                                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                            >
                                <X size={18} />
                            </button>

                            <div className="flex items-center gap-4 pr-10">
                                <Avatar
                                    member={selectedMember}
                                    size="h-16 w-16"
                                    text="text-xl"
                                    ring="ring-2 ring-[#2DD4BF]/60"
                                />
                                <div className="min-w-0">
                                    <h3 className="truncate text-2xl font-bold">{selectedMember.name}</h3>
                                    <p className="mt-1 text-[#2DD4BF]">{selectedMember.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 p-6">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    [Mail, "Email", selectedMember.email, true],
                                    [GraduationCap, "College", selectedMember.college],
                                    [Code2, "Branch", selectedMember.branch],
                                    [MapPin, "Location", selectedMember.location],
                                ]
                                    .filter(([, , v]) => v)
                                    .map(([Icon, label, value, breakAll]) => (
                                        <div key={label} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                                            <Icon size={17} className="text-[#14B8A6]" />
                                            <p className="mt-2 text-xs font-semibold text-[#64748B]">{label}</p>
                                            <p
                                                className={`mt-1 text-sm font-semibold text-[#0F172A] ${
                                                    breakAll ? "break-all" : ""
                                                }`}
                                            >
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                            </div>

                            {selectedMember.skills?.length > 0 && (
                                <div>
                                    <p className="text-sm font-bold text-[#0F172A]">Skills</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {selectedMember.skills.map((s, i) => (
                                            <span
                                                key={`${skillLabel(s)}-${i}`}
                                                className="rounded-full bg-[#14B8A6]/10 px-3 py-1.5 text-xs font-semibold text-[#312E81]"
                                            >
                                                {skillLabel(s)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(selectedMember.github ||
                                selectedMember.linkedin ||
                                selectedMember.portfolio) && (
                                <div className="flex flex-wrap gap-3 border-t border-[#E2E8F0] pt-5">
                                    {[
                                        ["GitHub", selectedMember.github],
                                        ["LinkedIn", selectedMember.linkedin],
                                        ["Portfolio", selectedMember.portfolio],
                                    ]
                                        .filter(([, href]) => href)
                                        .map(([label, href]) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#312E81] transition hover:border-[#14B8A6] hover:bg-[#14B8A6]/10"
                                            >
                                                {label}
                                                <ExternalLink size={14} />
                                            </a>
                                        ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => setSelectedMember(null)}
                                className="w-full rounded-xl bg-[#1E1B4B] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#312E81]"
                            >
                                Close Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= LEAVE MODAL ================= */}
            {showLeaveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <LogOut size={21} />
                        </div>
                        <h3 className="mt-5 text-xl font-bold text-[#0F172A]">Leave this team?</h3>
                        <p className="mt-2 text-sm leading-6 text-[#64748B]">
                            You will be removed from{" "}
                            <span className="font-semibold text-[#0F172A]">{team?.name}</span>. You can
                            join another team later.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowLeaveModal(false)}
                                disabled={leaving}
                                className="flex-1 rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleLeaveTeam}
                                disabled={leaving}
                                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {leaving ? "Leaving..." : "Yes, Leave"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
