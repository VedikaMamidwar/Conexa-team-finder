import {
  MapPin,
  GraduationCap,
  CalendarDays,
  BriefcaseBusiness,
  Sparkles,
  Eye,
  Send,
  Check,
  Clock3,
} from "lucide-react";

const getInitials = (name) => {
  if (!name) return "ST";

  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    String(parts[0][0]) +
    String(parts[1][0])
  ).toUpperCase();
};

export default function TeammateCard({
  teammate = {},
  connected = false,
  onConnect,
  onViewProfile,
}) {
  const name =
    teammate?.name || "Student";

  const role =
    teammate?.role || "Student Developer";

  const college =
    teammate?.college ||
    "College not specified";

  const branch =
    teammate?.branch ||
    "Computer Science";

  const year =
    teammate?.year || "Student";

  const location =
    teammate?.location || "India";

  const availability =
    teammate?.availability ||
    "Available";

  const compatibility = Number(
    teammate?.compatibility || 0
  );

  const skills = Array.isArray(
    teammate?.skills
  )
    ? teammate.skills
    : [];

  const visibleSkills =
    skills.slice(0, 3);

  const remainingSkills =
    Math.max(
      skills.length -
        visibleSkills.length,
      0
    );

  const initials =
    getInitials(name);

  const available =
    availability
      .toLowerCase()
      .includes("available");

  return (
    <article className="flex h-full min-h-[430px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:p-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-3.5">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#14B8A6]/20 bg-[#14B8A6]/10 text-xl font-extrabold text-[#1E1B4B]">
              {teammate?.avatar ? (
                <img
                  src={teammate.avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center">
                  {initials}
                </span>
              )}
            </div>

            <span
              className={
                "absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-[3px] border-white " +
                (available
                  ? "bg-emerald-500"
                  : "bg-amber-400")
              }
            />
          </div>

          <div className="min-w-0">

            <h3 className="truncate text-lg font-extrabold tracking-tight text-[#1E1B4B]">
              {name}
            </h3>

            <p className="mt-1 truncate text-sm font-semibold text-slate-500">
              {role}
            </p>

            <div className="mt-2 flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-[#14B8A6]" />

              <span
                className={
                  "text-xs font-bold " +
                  (available
                    ? "text-emerald-600"
                    : "text-amber-600")
                }
              >
                {availability}
              </span>
            </div>
          </div>
        </div>

        {/* Match */}
        <div className="shrink-0 rounded-full bg-[#14B8A6]/10 px-3 py-1.5 text-xs font-extrabold text-[#0f766e]">
          {compatibility}% Match
        </div>
      </div>

      {/* Compatibility */}
      <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">

        <div className="mb-2 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#14B8A6]" />

            <span className="text-sm font-bold text-slate-600">
              Compatibility
            </span>
          </div>

          <span className="text-sm font-extrabold text-[#1E1B4B]">
            {compatibility}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#14B8A6] transition-all duration-500"
            style={{
              width:
                Math.min(
                  Math.max(
                    compatibility,
                    0
                  ),
                  100
                ) + "%",
            }}
          />
        </div>
      </div>

      {/* Limited Student Information */}
      <div className="mt-6 space-y-3.5">

        <div className="flex min-w-0 items-start gap-3">
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              College
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-700">
              {college}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <BriefcaseBusiness className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Branch
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-700">
              {branch}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div className="flex min-w-0 items-start gap-2.5">
            <CalendarDays className="mt-0.5 h-4.5 w-4.5 shrink-0 text-slate-400" />

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Year
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                {year}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-2.5">
            <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-slate-400" />

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Location
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                {location}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Skills */}
      <div className="mt-6">

        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Key Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {visibleSkills.length > 0 ? (
            visibleSkills.map(
              (skill, index) => (
                <span
                  key={
                    String(skill) +
                    "-" +
                    String(index)
                  }
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600"
                >
                  {skill}
                </span>
              )
            )
          ) : (
            <span className="text-xs text-slate-400">
              No skills listed
            </span>
          )}

          {remainingSkills > 0 && (
            <span className="rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 px-3 py-1.5 text-xs font-extrabold text-[#0f766e]">
              +{remainingSkills}
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-auto flex gap-3 pt-7">

        <button
          type="button"
          onClick={() => {
            if (onViewProfile) {
              onViewProfile(
                teammate
              );
            }
          }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-[#1E1B4B] transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Eye className="h-4 w-4" />
          View Profile
        </button>

        <button
          type="button"
          disabled={connected}
          onClick={() => {
            if (
              onConnect &&
              !connected
            ) {
              onConnect(
                teammate
              );
            }
          }}
          className={
            "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-white transition " +
            (connected
              ? "cursor-not-allowed bg-emerald-600"
              : "bg-[#1E1B4B] hover:bg-[#16143a]")
          }
        >
          {connected ? (
            <>
              <Check className="h-4 w-4" />
              Request Sent
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