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
        <div className="mt-5">

            <div className="mb-3 flex items-center justify-between">

                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Popular skills
                </p>

                <p className="text-xs font-medium text-slate-400">
                    Filter matches
                </p>

            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">

                {skills.map((skill) => {
                    const active = selectedSkill === skill;

                    return (
                        <button
                            key={skill}
                            onClick={() => setSelectedSkill(skill)}
                            className={`whitespace-nowrap rounded-xl border px-4 py-2 text-xs font-bold transition-all duration-200 ${
                                active
                                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
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