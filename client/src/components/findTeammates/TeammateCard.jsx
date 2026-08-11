export default function TeammateCard({
    teammate,
    connected,
    onConnect,
}) {
    return (
        <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">

            {/* Top */}
            <div className="relative h-24 shrink-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-600">

                <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    ✦ {teammate.match}% Match
                </div>

            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col px-5 pb-5">

                {/* Avatar + status */}
                <div className="-mt-9 flex items-end justify-between">

                    <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-extrabold text-white shadow-md">
                        {teammate.initials}
                    </div>

                    <span className="mb-1 flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {teammate.availability}
                    </span>

                </div>

                {/* Name */}
                <div className="mt-4">

                    <h3 className="truncate text-lg font-extrabold text-slate-900">
                        {teammate.name}
                    </h3>

                    <p className="mt-1 truncate text-sm font-semibold text-indigo-600">
                        {teammate.role}
                    </p>

                </div>

                {/* College */}
                <div className="mt-4 space-y-2 border-b border-slate-100 pb-4">

                    <div className="flex gap-2 text-xs text-slate-500">
                        <span className="shrink-0">🎓</span>

                        <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-700">
                                {teammate.college}
                            </p>

                            <p className="truncate text-[11px] text-slate-400">
                                {teammate.branch} · {teammate.year}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>📍</span>
                        <span>{teammate.location}</span>
                    </div>

                </div>

                {/* Compatibility */}
                <div className="mt-4 rounded-xl bg-slate-50 p-3">

                    <div className="mb-2 flex items-center justify-between">

                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                            Compatibility
                        </span>

                        <span className="text-xs font-extrabold text-indigo-600">
                            {teammate.match}%
                        </span>

                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                            style={{
                                width: `${teammate.match}%`,
                            }}
                        />

                    </div>

                </div>

                {/* Skills */}
                <div className="mt-4">

                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Skills
                    </p>

                    <div className="flex min-h-[58px] flex-wrap content-start gap-1.5">

                        {teammate.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-700"
                            >
                                {skill}
                            </span>
                        ))}

                    </div>

                </div>

                {/* Interests */}
                <div className="mt-3 flex min-h-[30px] flex-wrap gap-1.5">

                    {teammate.interests.map((interest) => (
                        <span
                            key={interest}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500"
                        >
                            {interest}
                        </span>
                    ))}

                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-100">

                    <div className="border-r border-slate-100 px-3 py-3 text-center">
                        <p className="text-base font-extrabold text-slate-900">
                            {teammate.projects}
                        </p>
                        <p className="text-[10px] text-slate-400">
                            Projects
                        </p>
                    </div>

                    <div className="px-3 py-3 text-center">
                        <p className="text-base font-extrabold text-slate-900">
                            {teammate.hackathons}
                        </p>
                        <p className="text-[10px] text-slate-400">
                            Hackathons
                        </p>
                    </div>

                </div>

                {/* Button */}
                <button
                    onClick={onConnect}
                    className={`mt-4 flex h-11 w-full shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                        connected
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-900 text-white hover:bg-indigo-600"
                    }`}
                >
                    {connected ? "✓ Request Sent" : "Connect →"}
                </button>

            </div>
        </div>
    );
}