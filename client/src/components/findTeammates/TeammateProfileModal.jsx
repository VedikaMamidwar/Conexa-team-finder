import { useEffect } from "react";
import {
  X,
  MapPin,
  GraduationCap,
  CalendarDays,
  BriefcaseBusiness,
  FolderGit2,
  Trophy,
  Send,
  Check,
  Loader2,
} from "lucide-react";

const getInitials = (name) => {
  if (!name) return "ST";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (String(parts[0][0]) + String(parts[1][0])).toUpperCase();
};

export default function TeammateProfileModal({ teammate, status = "idle", onClose, onConnect }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!teammate) return null;

  const {
    name = "Student",
    role = "Student Developer",
    college = "College not specified",
    branch = "Computer Science",
    year = "Student",
    location = "India",
    availability = "Available",
    compatibility = 0,
    skills = [],
    projects = 0,
    hackathons = 0,
    bio = "This student hasn't added a bio yet.",
    avatar,
  } = teammate;

  const available = availability.toLowerCase().includes("available");
  const isSending = status === "sending";
  const isSent = status === "sent";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="relative bg-[#1E1B4B] px-6 pb-16 pt-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-4 top-4 rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <p className="text-xs font-bold uppercase tracking-wider text-[#5eead4]">Student Profile</p>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar overlapping header */}
          <div className="-mt-12 flex items-end justify-between">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#14B8A6]/10 text-2xl font-extrabold text-[#1E1B4B] shadow-sm">
              {avatar ? (
                <img src={avatar} alt={name} className="h-full w-full object-cover" />
              ) : (
                <span>{getInitials(name)}</span>
              )}
            </div>
            <span
              className={
                "mb-1 rounded-full px-3 py-1 text-xs font-bold " +
                (available ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")
              }
            >
              {availability}
            </span>
          </div>

          <h2 id="profile-modal-title" className="mt-3 text-xl font-extrabold tracking-tight text-[#1E1B4B]">
            {name}
          </h2>
          <p className="text-sm font-semibold text-slate-500">{role}</p>

          {/* Match */}
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-600">Compatibility</span>
              <span className="font-extrabold text-[#0f766e]">{compatibility}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#14B8A6] transition-all duration-500"
                style={{ width: `${Math.min(Math.max(compatibility, 0), 100)}%` }}
              />
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{bio}</p>

          {/* Details grid */}
          <div className="mt-5 grid grid-cols-2 gap-3.5">
            <Detail icon={GraduationCap} label="College" value={college} />
            <Detail icon={BriefcaseBusiness} label="Branch" value={branch} />
            <Detail icon={CalendarDays} label="Year" value={year} />
            <Detail icon={MapPin} label="Location" value={location} />
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-3.5">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <FolderGit2 className="h-5 w-5 text-[#14B8A6]" />
              <div>
                <p className="text-sm font-extrabold text-[#1E1B4B]">{projects}</p>
                <p className="text-[11px] font-medium text-slate-500">Projects</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <Trophy className="h-5 w-5 text-[#14B8A6]" />
              <div>
                <p className="text-sm font-extrabold text-[#1E1B4B]">{hackathons}</p>
                <p className="text-[11px] font-medium text-slate-500">Hackathons</p>
              </div>
            </div>
          </div>

          {/* All skills */}
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              All Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">No skills listed</span>
              )}
            </div>
          </div>

          {/* Connect */}
          <button
            type="button"
            disabled={isSent || isSending}
            onClick={() => onConnect && !isSent && !isSending && onConnect(teammate)}
            className={
              "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-1 " +
              (isSent
                ? "cursor-not-allowed bg-emerald-600"
                : isSending
                ? "cursor-wait bg-[#1E1B4B]/70"
                : "bg-[#1E1B4B] hover:bg-[#16143a]")
            }
          >
            {isSent ? (
              <>
                <Check className="h-4 w-4" />
                Request Sent
              </>
            ) : isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Teammate Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}