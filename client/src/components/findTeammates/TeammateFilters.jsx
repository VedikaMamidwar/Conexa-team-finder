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

const skillIcons = {
    All: "✦",
    React: "⚛",
    "Node.js": "◆",
    Java: "☕",
    Python: "🐍",
    MongoDB: "◉",
    Express: "E",
    "UI/UX": "✦",
    AI: "✧",
    ML: "◈",
    Flutter: "◆",
};

export default function TeammateFilters({
    selectedSkill,
    setSelectedSkill,
}) {
    return (
        <section className="mt-5 sm:mt-6">
            {/* Filter container */}
            <div
                className="
                    relative overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-3.5
                    shadow-sm
                    sm:p-4
                "
            >
                {/* Decorative background */}
                <div
                    className="
                        pointer-events-none absolute
                        -right-16 -top-20
                        h-40 w-40
                        rounded-full
                        bg-indigo-100/50
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none absolute
                        -bottom-20 left-1/3
                        h-32 w-32
                        rounded-full
                        bg-violet-100/40
                        blur-3xl
                    "
                />

                {/* Header */}
                <div
                    className="
                        relative z-10
                        flex items-center
                        justify-between gap-3
                    "
                >
                    <div className="flex min-w-0 items-center gap-3">
                        {/* Icon */}
                        <div
                            className="
                                flex h-9 w-9 shrink-0
                                items-center justify-center
                                rounded-xl
                                border border-indigo-100
                                bg-gradient-to-br
                                from-indigo-50
                                to-violet-50
                                text-indigo-600
                                shadow-sm
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-[17px] w-[17px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M7 12h10M10 18h4"
                                />
                            </svg>
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <p
                                    className="
                                        text-xs font-extrabold
                                        tracking-tight
                                        text-slate-900
                                        sm:text-sm
                                    "
                                >
                                    Explore by skill
                                </p>

                                <span
                                    className="
                                        hidden rounded-full
                                        bg-slate-100
                                        px-2 py-0.5
                                        text-[9px] font-bold
                                        text-slate-400
                                        sm:inline-flex
                                    "
                                >
                                    {skills.length - 1} skills
                                </span>
                            </div>

                            <p
                                className="
                                    mt-0.5
                                    truncate
                                    text-[10px]
                                    font-medium
                                    text-slate-400
                                    sm:text-[11px]
                                "
                            >
                                Discover teammates with matching skills
                            </p>
                        </div>
                    </div>

                    {/* Active filter */}
                    <div
                        className="
                            hidden shrink-0 items-center gap-2
                            rounded-xl
                            border border-indigo-100
                            bg-indigo-50/70
                            px-3 py-2
                            sm:flex
                        "
                    >
                        <span
                            className="
                                flex h-5 w-5
                                items-center justify-center
                                rounded-md
                                bg-indigo-600
                                text-[9px] text-white
                            "
                        >
                            {skillIcons[selectedSkill] || "✦"}
                        </span>

                        <div>
                            <p
                                className="
                                    text-[9px] font-bold
                                    uppercase tracking-wider
                                    text-indigo-400
                                "
                            >
                                Selected
                            </p>

                            <p
                                className="
                                    text-[11px] font-extrabold
                                    text-indigo-700
                                "
                            >
                                {selectedSkill === "All"
                                    ? "All skills"
                                    : selectedSkill}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="
                        relative z-10
                        my-3.5 h-px
                        bg-gradient-to-r
                        from-transparent
                        via-slate-200
                        to-transparent
                    "
                />

                {/* Skills */}
                <div
                    className="
                        relative z-10
                        -mx-1 overflow-x-auto
                        px-1 pb-1
                        [&::-webkit-scrollbar]:hidden
                        [-ms-overflow-style:none]
                        [scrollbar-width:none]
                    "
                >
                    <div className="flex min-w-max gap-2">
                        {skills.map((skill) => {
                            const active =
                                selectedSkill === skill;

                            return (
                                <button
                                    key={skill}
                                    type="button"
                                    onClick={() =>
                                        setSelectedSkill(skill)
                                    }
                                    aria-pressed={active}
                                    className={`
                                        group relative
                                        inline-flex
                                        items-center gap-2
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        px-3 py-2
                                        text-xs font-bold
                                        transition-all duration-300
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-indigo-500
                                        focus:ring-offset-2
                                        sm:px-3.5 sm:py-2.5

                                        ${
                                            active
                                                ? `
                                                    border-indigo-600
                                                    bg-gradient-to-r
                                                    from-indigo-600
                                                    to-violet-600
                                                    text-white
                                                    shadow-lg
                                                    shadow-indigo-200
                                                    -translate-y-0.5
                                                `
                                                : `
                                                    border-slate-200
                                                    bg-white
                                                    text-slate-600
                                                    hover:-translate-y-0.5
                                                    hover:border-indigo-200
                                                    hover:bg-indigo-50/70
                                                    hover:text-indigo-700
                                                    hover:shadow-sm
                                                `
                                        }
                                    `}
                                >
                                    {/* Active glow */}
                                    {active && (
                                        <span
                                            className="
                                                pointer-events-none
                                                absolute inset-0
                                                bg-gradient-to-r
                                                from-white/10
                                                via-transparent
                                                to-white/10
                                            "
                                        />
                                    )}

                                    {/* Skill icon */}
                                    <span
                                        className={`
                                            relative z-10
                                            flex h-5 w-5
                                            items-center justify-center
                                            rounded-md
                                            text-[10px]
                                            transition-all duration-300

                                            ${
                                                active
                                                    ? `
                                                        bg-white/15
                                                        text-white
                                                    `
                                                    : `
                                                        bg-slate-100
                                                        text-slate-400
                                                        group-hover:bg-indigo-100
                                                        group-hover:text-indigo-600
                                                    `
                                            }
                                        `}
                                    >
                                        {skillIcons[skill] || "•"}
                                    </span>

                                    {/* Skill name */}
                                    <span className="relative z-10">
                                        {skill}
                                    </span>

                                    {/* Active check */}
                                    {active && (
                                        <span
                                            className="
                                                relative z-10
                                                ml-0.5
                                                flex h-4 w-4
                                                items-center justify-center
                                                rounded-full
                                                bg-white/15
                                            "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.42l2.543 2.544 6.543-6.544a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile selected indicator */}
                <div
                    className="
                        relative z-10
                        mt-3
                        flex items-center justify-between
                        rounded-lg
                        bg-slate-50
                        px-3 py-2
                        sm:hidden
                    "
                >
                    <span
                        className="
                            text-[10px] font-bold
                            uppercase tracking-wider
                            text-slate-400
                        "
                    >
                        Showing
                    </span>

                    <div
                        className="
                            flex items-center gap-1.5
                            text-[11px] font-extrabold
                            text-indigo-600
                        "
                    >
                        <span>✦</span>
                        {selectedSkill === "All"
                            ? "All teammates"
                            : selectedSkill}
                    </div>
                </div>
            </div>
        </section>
    );
}