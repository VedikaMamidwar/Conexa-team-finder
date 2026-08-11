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

export default function TeammateFilters({
    selectedSkill,
    setSelectedSkill,
}) {
    return (
        <div className="mt-4">

            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Filter by skill
            </p>

            <div className="flex w-full gap-2 overflow-x-auto pb-1">

                {skills.map((skill) => {
                    const active = selectedSkill === skill;

                    return (
                        <button
                            key={skill}
                            onClick={() => setSelectedSkill(skill)}
                            className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-bold transition ${
                                active
                                    ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                        >
                            {skill}
                        </button>
                    );
                })}

            </div>

        </div>
    );
}