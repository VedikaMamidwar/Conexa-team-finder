import {
  SlidersHorizontal,
  RotateCcw,
  Code2,
  Clock3,
  GraduationCap,
  ArrowDownUp,
} from "lucide-react";

const skills = [
  "All",
  "React",
  "Node.js",
  "Java",
  "Python",
  "MongoDB",
  "Express",
  "UI/UX",
  "AI",
  "ML",
  "Flutter",
];

const years = [
  "All",
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

const availabilityOptions = [
  "All",
  "Available",
  "Busy",
];

export default function TeammateFilters({
  selectedSkill,
  setSelectedSkill,
  availability,
  setAvailability,
  year,
  setYear,
  sortBy,
  setSortBy,
  clearFilters,
  hasFilters,
}) {
  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:w-[250px] lg:shrink-0 xl:w-[270px]">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-5">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#0f766e]">
            <SlidersHorizontal className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-[#1E1B4B]">
              Filters
            </h3>

            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Refine your results
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#1E1B4B]"
            title="Clear filters"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Skill */}
      <div className="mt-5">

        <label className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
          <Code2 className="h-4 w-4" />
          Skill
        </label>

        <select
          value={selectedSkill}
          onChange={(event) =>
            setSelectedSkill(
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
        >
          {skills.map((skill) => (
            <option
              key={skill}
              value={skill}
            >
              {skill}
            </option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div className="mt-5">

        <label className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
          <Clock3 className="h-4 w-4" />
          Availability
        </label>

        <select
          value={availability}
          onChange={(event) =>
            setAvailability(
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
        >
          {availabilityOptions.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}
        </select>
      </div>

      {/* Academic Year */}
      <div className="mt-5">

        <label className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
          <GraduationCap className="h-4 w-4" />
          Academic Year
        </label>

        <select
          value={year}
          onChange={(event) =>
            setYear(
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
        >
          {years.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="mt-5">

        <label className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
          <ArrowDownUp className="h-4 w-4" />
          Sort By
        </label>

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
        >
          <option value="compatibility">
            Best Match
          </option>

          <option value="projects">
            Most Projects
          </option>

          <option value="hackathons">
            Most Hackathons
          </option>

          <option value="name">
            Name A-Z
          </option>
        </select>
      </div>

      {/* Clear */}
      <button
        type="button"
        onClick={clearFilters}
        disabled={!hasFilters}
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RotateCcw className="h-4 w-4" />
        Clear Filters
      </button>

    </aside>
  );
}