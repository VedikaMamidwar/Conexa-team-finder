export default function TeammateCard({
    teammate,
    connected,
    onConnect,
}) {
    const skills = Array.isArray(teammate?.skills)
        ? teammate.skills
        : [];

    const interests = Array.isArray(teammate?.interests)
        ? teammate.interests
        : [];

    const match = Math.min(
        100,
        Math.max(0, Number(teammate?.match) || 0)
    );

    const availability =
        teammate?.availability === "Available"
            ? "Available"
            : "Looking for team";

    return (
        <article
            className="
                group relative overflow-hidden
                rounded-2xl border border-slate-200
                bg-white
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-indigo-200
                hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
            "
        >
            {/* Cover */}
            <div
                className="
                    relative h-24 overflow-hidden
                    bg-gradient-to-br
                    from-slate-950
                    via-indigo-950
                    to-indigo-600
                    sm:h-28
                "
            >
                <div
                    className="
                        absolute -right-10 -top-16
                        h-40 w-40 rounded-full
                        bg-white/10 blur-3xl
                    "
                />

                <div
                    className="
                        absolute -bottom-20 left-16
                        h-40 w-40 rounded-full
                        bg-violet-400/20 blur-3xl
                    "
                />

                <div
                    className="
                        absolute inset-0
                        bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]
                    "
                />

                {/* Match badge */}
                <div
                    className="
                        absolute right-3 top-3 z-10
                        inline-flex items-center gap-1.5
                        rounded-full
                        border border-white/15
                        bg-black/20
                        px-3 py-1.5
                        text-[11px] font-bold
                        text-white
                        backdrop-blur-md
                        sm:right-4 sm:top-4
                    "
                >
                    <span className="text-yellow-300">
                        ✦
                    </span>

                    {match}% Match
                </div>
            </div>

            {/* Main content */}
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">

                {/* Avatar + availability */}
                <div
                    className="
                        relative z-20
                        -mt-9
                        flex items-end justify-between
                        sm:-mt-10
                    "
                >
                    {/* Avatar */}
                    <div
                        className="
                            relative flex
                            h-[68px] w-[68px]
                            shrink-0
                            items-center justify-center
                            rounded-2xl
                            border-4 border-white
                            bg-gradient-to-br
                            from-indigo-500
                            to-violet-600
                            shadow-lg
                            sm:h-[76px] sm:w-[76px]
                        "
                    >
                        <span
                            className="
                                text-lg font-black
                                tracking-tight text-white
                                sm:text-xl
                            "
                        >
                            {teammate?.initials || "?"}
                        </span>
                    </div>

                    {/* Availability */}
                    <div
                        className="
                            mb-1
                            inline-flex items-center gap-1.5
                            rounded-full
                            border border-emerald-100
                            bg-emerald-50
                            px-2.5 py-1.5
                            text-[10px] font-bold
                            text-emerald-700
                            sm:px-3 sm:text-[11px]
                        "
                    >
                        <span
                            className="
                                h-1.5 w-1.5 rounded-full
                                bg-emerald-500
                            "
                        />

                        {availability}
                    </div>
                </div>

                {/* Name / Role */}
                <div className="mt-4">
                    <h3
                        className="
                            truncate
                            text-base font-extrabold
                            tracking-tight text-slate-950
                            sm:text-lg
                        "
                    >
                        {teammate?.name || "Unknown User"}
                    </h3>

                    <p
                        className="
                            mt-1
                            text-sm font-semibold
                            text-indigo-600
                        "
                    >
                        {teammate?.role || "Student Developer"}
                    </p>
                </div>

                {/* Education / Location */}
                <div className="mt-4 space-y-3">

                    {/* College */}
                    <div className="flex items-start gap-3">
                        <div
                            className="
                                flex h-8 w-8 shrink-0
                                items-center justify-center
                                rounded-lg
                                bg-slate-100
                                text-sm
                            "
                        >
                            🎓
                        </div>

                        <div className="min-w-0">
                            <p
                                className="
                                    truncate
                                    text-sm font-semibold
                                    text-slate-700
                                "
                            >
                                {teammate?.college ||
                                    "College not specified"}
                            </p>

                            {(teammate?.branch ||
                                teammate?.year) && (
                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    {teammate?.branch ||
                                        "Student"}

                                    {teammate?.branch &&
                                        teammate?.year &&
                                        " · "}

                                    {teammate?.year || ""}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    {teammate?.location && (
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex h-8 w-8 shrink-0
                                    items-center justify-center
                                    rounded-lg
                                    bg-slate-100
                                    text-sm
                                "
                            >
                                📍
                            </div>

                            <p
                                className="
                                    truncate
                                    text-sm font-medium
                                    text-slate-500
                                "
                            >
                                {teammate.location}
                            </p>
                        </div>
                    )}
                </div>

                {/* Compatibility */}
                <div
                    className="
                        mt-5
                        rounded-xl
                        border border-slate-100
                        bg-slate-50
                        p-3.5
                    "
                >
                    <div
                        className="
                            mb-2.5
                            flex items-center justify-between
                        "
                    >
                        <span
                            className="
                                text-[11px]
                                font-bold uppercase
                                tracking-wider
                                text-slate-400
                            "
                        >
                            Compatibility
                        </span>

                        <span
                            className="
                                text-xs font-extrabold
                                text-indigo-600
                            "
                        >
                            {match}%
                        </span>
                    </div>

                    <div
                        className="
                            h-1.5 overflow-hidden
                            rounded-full
                            bg-slate-200
                        "
                    >
                        <div
                            className="
                                h-full rounded-full
                                bg-gradient-to-r
                                from-indigo-500
                                via-violet-500
                                to-purple-500
                                transition-all duration-700
                            "
                            style={{
                                width: `${match}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mt-5">
                        <div
                            className="
                                mb-2.5
                                flex items-center justify-between
                            "
                        >
                            <p
                                className="
                                    text-[11px]
                                    font-extrabold uppercase
                                    tracking-wider
                                    text-slate-400
                                "
                            >
                                Skills
                            </p>

                            <span
                                className="
                                    text-[10px] font-semibold
                                    text-slate-400
                                "
                            >
                                {skills.length}{" "}
                                {skills.length === 1
                                    ? "skill"
                                    : "skills"}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            {skills.slice(0, 6).map(
                                (skill, index) => (
                                    <span
                                        key={`${skill}-${index}`}
                                        className="
                                            rounded-lg
                                            border
                                            border-indigo-100
                                            bg-indigo-50
                                            px-2.5 py-1.5
                                            text-xs font-semibold
                                            text-indigo-700
                                            transition-colors
                                            group-hover:border-indigo-200
                                        "
                                    >
                                        {skill}
                                    </span>
                                )
                            )}

                            {skills.length > 6 && (
                                <span
                                    className="
                                        rounded-lg
                                        bg-slate-100
                                        px-2.5 py-1.5
                                        text-xs font-semibold
                                        text-slate-500
                                    "
                                >
                                    +{skills.length - 6}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {interests.length > 0 && (
                    <div className="mt-4">
                        <p
                            className="
                                mb-2
                                text-[10px]
                                font-bold uppercase
                                tracking-wider
                                text-slate-400
                            "
                        >
                            Interests
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                            {interests.slice(0, 4).map(
                                (interest, index) => (
                                    <span
                                        key={`${interest}-${index}`}
                                        className="
                                            rounded-lg
                                            bg-slate-100
                                            px-2.5 py-1.5
                                            text-xs font-medium
                                            text-slate-500
                                        "
                                    >
                                        {interest}
                                    </span>
                                )
                            )}

                            {interests.length > 4 && (
                                <span
                                    className="
                                        rounded-lg
                                        bg-slate-100
                                        px-2.5 py-1.5
                                        text-xs font-medium
                                        text-slate-400
                                    "
                                >
                                    +{interests.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Connect button */}
                <div className="mt-5">
                    <button
                        type="button"
                        onClick={onConnect}
                        disabled={connected}
                        className={`
                            flex w-full items-center
                            justify-center gap-2
                            rounded-xl
                            px-4 py-3
                            text-sm font-bold
                            transition-all duration-200
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            focus:ring-offset-2

                            ${
                                connected
                                    ? `
                                        cursor-default
                                        border border-emerald-100
                                        bg-emerald-50
                                        text-emerald-700
                                    `
                                    : `
                                        bg-slate-950
                                        text-white
                                        shadow-sm
                                        hover:bg-indigo-600
                                        hover:shadow-md
                                        active:scale-[0.98]
                                    `
                            }
                        `}
                    >
                        {connected ? (
                            <>
                                <span
                                    className="
                                        flex h-5 w-5
                                        items-center justify-center
                                        rounded-full
                                        bg-emerald-100
                                        text-xs
                                    "
                                >
                                    ✓
                                </span>

                                Request Sent
                            </>
                        ) : (
                            <>
                                <span>Connect</span>

                                <span
                                    className="
                                        text-base
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-1
                                    "
                                >
                                    →
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
}