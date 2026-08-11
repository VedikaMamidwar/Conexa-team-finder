export default function TeammateCard({
    teammate,
    connected,
    onConnect,
}) {
    return (
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_45px_rgba(79,70,229,0.12)]">

            {/* Top gradient */}
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#111827] via-[#312e81] to-[#6366f1]">

                <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                <div className="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl" />

                {/* Match */}
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">

                    <span className="text-yellow-300">
                        ✦
                    </span>

                    {teammate.match}% Match

                </div>

            </div>

            <div className="px-5 pb-5">

                {/* Avatar */}
                <div className="-mt-11 flex items-end justify-between">

                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-black text-white shadow-lg">

                        {teammate.initials}

                    </div>

                    <div className="mb-1 flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                        {teammate.availability === "Available"
                            ? "Available"
                            : "Looking for team"}

                    </div>

                </div>

                {/* Name */}
                <div className="mt-4">

                    <h3 className="text-lg font-black text-slate-950">
                        {teammate.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-indigo-600">
                        {teammate.role}
                    </p>

                </div>

                {/* College */}
                <div className="mt-4 space-y-2">

                    <div className="flex items-start gap-2.5 text-sm text-slate-500">

                        <span className="mt-0.5">
                            🎓
                        </span>

                        <div>
                            <p className="font-semibold text-slate-700">
                                {teammate.college}
                            </p>

                            <p className="text-xs text-slate-400">
                                {teammate.branch} · {teammate.year}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-500">

                        <span>
                            📍
                        </span>

                        {teammate.location}

                    </div>

                </div>

                {/* Match score */}
                <div className="mt-5 rounded-2xl bg-slate-50 p-3.5">

                    <div className="mb-2 flex items-center justify-between">

                        <span className="text-xs font-bold text-slate-500">
                            Compatibility
                        </span>

                        <span className="text-xs font-black text-indigo-600">
                            {teammate.match}%
                        </span>

                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 transition-all duration-700"
                            style={{
                                width: `${teammate.match}%`,
                            }}
                        />

                    </div>

                </div>

                {/* Skills */}
                <div className="mt-5">

                    <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Skills
                    </p>

                    <div className="flex flex-wrap gap-1.5">

                        {teammate.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700"
                            >
                                {skill}
                            </span>
                        ))}

                    </div>

                </div>

                {/* Interests */}
                <div className="mt-4 flex flex-wrap gap-1.5">

                    {teammate.interests.map((interest) => (
                        <span
                            key={interest}
                            className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-500"
                        >
                            {interest}
                        </span>
                    ))}

                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 divide-x rounded-2xl border border-slate-100 bg-white">

                    <div className="px-3 py-3 text-center">

                        <p className="text-lg font-black text-slate-900">
                            {teammate.projects}
                        </p>

                        <p className="text-[11px] font-medium text-slate-400">
                            Projects
                        </p>

                    </div>

                    <div className="px-3 py-3 text-center">

                        <p className="text-lg font-black text-slate-900">
                            {teammate.hackathons}
                        </p>

                        <p className="text-[11px] font-medium text-slate-400">
                            Hackathons
                        </p>

                    </div>

                </div>

                {/* Button */}
                <button
                    onClick={onConnect}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200 ${
                        connected
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-950 text-white hover:bg-indigo-600"
                    }`}
                >
                    {connected ? (
                        <>
                            <span>✓</span>
                            Request Sent
                        </>
                    ) : (
                        <>
                            Connect
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </>
                    )}
                </button>

            </div>

        </article>
    );
}