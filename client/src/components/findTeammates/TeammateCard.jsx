import {
  MapPin,
  Eye,
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

export default function TeammateCard({ teammate = {}, status = "idle", onConnect, onViewProfile }) {
  const name = teammate?.name || "Student";
  const role = teammate?.role || "Student Developer";
  const location = teammate?.location || "India";
  const availability = teammate?.availability || "Available";
  const compatibility = Number(teammate?.compatibility || 0);
  const skills = Array.isArray(teammate?.skills) ? teammate.skills : [];
  const visibleSkills = skills.slice(0, 3);
  const remainingSkills = Math.max(skills.length - visibleSkills.length, 0);
  const initials = getInitials(name);
  const available = availability.toLowerCase().includes("available");

  const isSending = status === "sending";
  const isSent = status === "sent";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      {/* Identity */}
      <div className="flex items-start gap-3.5">
        <div className="relative shrink-0">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-[#14B8A6]/20 bg-[#14B8A6]/10 text-lg font-extrabold text-[#1E1B4B]">
            {teammate?.avatar ? (
              <img src={teammate.avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <span
            className={
              "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white " +
              (available ? "bg-emerald-500" : "bg-amber-400")
            }
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-extrabold tracking-tight text-[#1E1B4B]">{name}</h3>
          <p className="truncate text-sm font-semibold text-slate-500">{role}</p>
          <p className="mt-1 flex items-center gap-1 truncate text-xs font-medium text-slate-400">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {location}
          </p>
        </div>
      </div>

      {/* Match */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span
            className={
              "text-xs font-bold " + (available ? "text-emerald-600" : "text-amber-600")
            }
          >
            {availability}
          </span>
          <span className="text-xs font-extrabold text-[#0f766e]">{compatibility}% match</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#14B8A6] transition-all duration-500"
            style={{ width: `${Math.min(Math.max(compatibility, 0), 100)}%` }}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {visibleSkills.length > 0 ? (
          visibleSkills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400">No skills listed</span>
        )}
        {remainingSkills > 0 && (
          <span className="rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 px-2.5 py-1 text-[11px] font-extrabold text-[#0f766e]">
            +{remainingSkills}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2.5 pt-5">
        <button
          type="button"
          onClick={() => onViewProfile && onViewProfile(teammate)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-[#1E1B4B] transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]"
        >
          <Eye className="h-4 w-4" />
          View Profile
        </button>

        <button
          type="button"
          disabled={isSent || isSending}
          onClick={() => onConnect && !isSent && !isSending && onConnect(teammate)}
          aria-label={isSent ? `Request sent to ${name}` : `Send teammate request to ${name}`}
          className={
            "inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-1 " +
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
              Connect
            </>
          )}
        </button>
      </div>
    </article>
  );
}