
import React from "react";
import HackathonCard from "./HackathonCard";
import {
    SearchX,
    Sparkles,
    Trophy,
    Users,
    ArrowRight,
} from "lucide-react";

const HackathonGrid = ({ hackathons, onViewDetails }) => {
    // Empty State
    if (!hackathons || hackathons.length === 0) {
        return (
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-2xl">

                {/* Background Decorations */}
                <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#CCFBF1]/60 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-slate-100/80 blur-3xl" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CCFBF1]/40 blur-3xl" />

                <div className="relative mx-auto max-w-md text-center">

                    {/* Icon */}
                    <div className="group mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#CCFBF1] text-[#14B8A6] shadow-sm ring-1 ring-[#99F6E4] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-[#99F6E4] hover:shadow-lg">

                        <SearchX
                            size={42}
                            className="transition-transform duration-300 group-hover:rotate-6"
                        />

                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#CCFBF1] px-4 py-2 text-xs font-bold text-[#0F766E] ring-1 ring-[#99F6E4]">

                        <Sparkles size={14} />

                        Explore Opportunities

                    </div>

                    <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-3xl">
                        No Hackathons Found
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                        We couldn't find any hackathons matching your search
                        or selected filters. Try adjusting your preferences.
                    </p>

                    {/* Helpful Flex Boxes */}
                    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">

                        <div className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md">

                            <Trophy
                                size={17}
                                className="text-[#14B8A6] transition-transform duration-300 group-hover:scale-110"
                            />

                            <span className="text-xs font-semibold text-slate-600 group-hover:text-[#0F766E]">
                                Find Events
                            </span>

                        </div>

                        <div className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md">

                            <Users
                                size={17}
                                className="text-[#14B8A6] transition-transform duration-300 group-hover:scale-110"
                            />

                            <span className="text-xs font-semibold text-slate-600 group-hover:text-[#0F766E]">
                                Build Teams
                            </span>

                        </div>

                        <div className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md">

                            <Sparkles
                                size={17}
                                className="text-[#14B8A6] transition-transform duration-300 group-hover:rotate-12"
                            />

                            <span className="text-xs font-semibold text-slate-600 group-hover:text-[#0F766E]">
                                Start Building
                            </span>

                        </div>

                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#CCFBF1] px-5 py-2.5 text-xs font-semibold text-[#0F766E] ring-1 ring-[#99F6E4] transition-all duration-300 hover:scale-105 hover:shadow-md">

                        <Sparkles size={14} />

                        Try changing your filters or search

                    </div>

                </div>
            </div>
        );
    }

    return (
        <section className="w-full">

            {/* Section Header */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    {/* Explore Badge */}
                    <div className="flex items-center gap-2">

                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E1B4B] text-white shadow-sm transition-all duration-300 hover:rotate-6 hover:scale-105">
                            <Sparkles size={17} />
                        </span>

                        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#14B8A6]">
                            Explore
                        </span>

                    </div>

                    <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-3xl">
                        Discover Hackathons
                    </h2>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                        Find exciting competitions that match your skills,
                        interests and ambitions.
                    </p>

                </div>

                {/* Found Count Box */}
                <div className="group flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:shadow-lg">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#14B8A6] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#99F6E4]">
                        <Trophy size={17} />
                    </div>

                    <div>

                        <p className="text-lg font-extrabold leading-none text-[#1E1B4B]">
                            {hackathons.length}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-500">
                            {hackathons.length === 1
                                ? "Hackathon Found"
                                : "Hackathons Found"}
                        </p>

                    </div>

                </div>
            </div>

            {/* Small Information Boxes */}
            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#14B8A6] transition-transform duration-300 group-hover:scale-110">
                        <Trophy size={18} />
                    </div>

                    <div>

                        <p className="text-xs font-bold text-[#1E1B4B]">
                            Compete
                        </p>

                        <p className="text-[11px] text-slate-500">
                            Showcase your skills
                        </p>

                    </div>

                </div>

                <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#14B8A6] transition-transform duration-300 group-hover:scale-110">
                        <Users size={18} />
                    </div>

                    <div>

                        <p className="text-xs font-bold text-[#1E1B4B]">
                            Collaborate
                        </p>

                        <p className="text-[11px] text-slate-500">
                            Connect with teammates
                        </p>

                    </div>

                </div>

                <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:shadow-md">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#14B8A6] transition-transform duration-300 group-hover:scale-110">
                        <Sparkles size={18} />
                    </div>

                    <div>

                        <p className="text-xs font-bold text-[#1E1B4B]">
                            Innovate
                        </p>

                        <p className="text-[11px] text-slate-500">
                            Build something amazing
                        </p>

                    </div>

                </div>

            </div>

            {/* Hackathon Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {hackathons.map((hackathon) => (

                    <div
                        key={hackathon.id}
                        className="group transition-all duration-300 hover:-translate-y-1"
                    >

                        <HackathonCard
                            hackathon={hackathon}
                            onViewDetails={onViewDetails}
                        />

                    </div>

                ))}

            </div>

            {/* Bottom Explore Banner */}
            <div className="group relative mt-8 overflow-hidden rounded-3xl border border-[#99F6E4] bg-[#14B8A6] p-[1px] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="relative flex flex-col items-center justify-between gap-5 rounded-[1.4rem] bg-white px-6 py-6 sm:flex-row sm:px-8">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1E1B4B] text-white shadow-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                            <Sparkles size={21} />
                        </div>

                        <div>

                            <h3 className="text-base font-extrabold text-[#1E1B4B]">
                                Ready to build something amazing?
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                Explore opportunities and turn your ideas into reality.
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="group/btn flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
                    >

                        Explore More

                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />

                    </button>

                </div>

            </div>

        </section>
    );
};

export default HackathonGrid;


