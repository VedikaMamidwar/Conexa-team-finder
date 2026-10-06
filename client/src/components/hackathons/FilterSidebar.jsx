import React from "react";
import {
    categories,
    modes,
    difficulties,
} from "../../data/hackathonData";

import {
    SlidersHorizontal,
    Monitor,
    Layers,
    Gauge,
    RotateCcw,
    Sparkles,
    Check,
    Zap,
} from "lucide-react";

const FilterSidebar = ({ filters, onFilterChange }) => {
    const handleChange = (filterName, value) => {
        onFilterChange({
            ...filters,
            [filterName]: value,
        });
    };

    const resetFilters = () => {
        onFilterChange({
            mode: "All",
            category: "All",
            difficulty: "All",
        });
    };

    return (
        <aside className="group relative sticky top-6 w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-indigo-100/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/70">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-100/50 blur-3xl transition-all duration-700 group-hover:bg-indigo-200/60" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-teal-100/50 blur-3xl transition-all duration-700 group-hover:bg-teal-100" />

            {/* Header */}
            <div className="relative border-b border-slate-200 bg-slate-50/80 p-5 sm:p-6">

                <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3">

                        <div className="relative">
                            <div className="absolute inset-0 rounded-2xl bg-[#14B8A6]/20 blur-lg transition-all duration-500 group-hover:bg-[#14B8A6]/30" />

                            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1E1B4B] text-white shadow-lg shadow-indigo-100 transition-all duration-500 hover:rotate-6 hover:scale-110">
                                <SlidersHorizontal size={21} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">

                                <h3 className="text-xl font-black tracking-tight text-[#1E1B4B]">
                                    Filters
                                </h3>

                                <span className="rounded-full border border-teal-100 bg-teal-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-[#14B8A6]">
                                    Explore
                                </span>

                            </div>

                            <p className="mt-1 text-xs font-medium text-slate-500">
                                Find your perfect hackathon
                            </p>
                        </div>

                    </div>

                    {/* Clear Button */}
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="group/clear flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-[#312E81] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#312E81] hover:bg-[#1E1B4B] hover:text-white hover:shadow-lg"
                    >
                        <RotateCcw
                            size={13}
                            className="transition-transform duration-500 group-hover/clear:rotate-180"
                        />

                        Clear
                    </button>

                </div>

                {/* Active Filter Mini Boxes */}
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">

                    <div className="group/filter flex min-w-0 items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2 text-[11px] font-black text-[#312E81] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-100 hover:shadow-md">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 group-hover/filter:rotate-6 group-hover/filter:scale-110">
                            <Monitor
                                size={13}
                                className="text-[#312E81]"
                            />
                        </div>

                        <span className="truncate">
                            {filters.mode}
                        </span>

                    </div>

                    <div className="group/filter flex min-w-0 items-center gap-2 rounded-xl border border-teal-100 bg-teal-50/70 px-3 py-2 text-[11px] font-black text-[#14B8A6] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-100 hover:shadow-md">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 group-hover/filter:rotate-6 group-hover/filter:scale-110">
                            <Layers
                                size={13}
                                className="text-[#14B8A6]"
                            />
                        </div>

                        <span className="truncate">
                            {filters.category}
                        </span>

                    </div>

                    <div className="group/filter flex min-w-0 items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50/70 px-3 py-2 text-[11px] font-black text-cyan-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-100 hover:shadow-md">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 group-hover/filter:rotate-6 group-hover/filter:scale-110">
                            <Gauge
                                size={13}
                                className="text-cyan-600"
                            />
                        </div>

                        <span className="truncate">
                            {filters.difficulty}
                        </span>

                    </div>

                </div>
            </div>

            {/* Filter Content */}
            <div className="relative p-5 sm:p-6">

                {/* Mode */}
                <div className="mb-8">

                    <div className="mb-4 flex items-center justify-between">

                        <div className="flex items-center gap-2.5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#312E81] transition-all duration-300 hover:scale-110 hover:rotate-3 hover:bg-indigo-100">
                                <Monitor size={17} />
                            </div>

                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">
                                    Mode
                                </h4>

                                <p className="text-[10px] font-medium text-slate-400">
                                    Choose event format
                                </p>
                            </div>

                        </div>

                        <span className="rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-black text-[#312E81]">
                            {modes.length}
                        </span>

                    </div>

                    <div className="space-y-2">

                        {modes.map((mode) => {

                            const isActive = filters.mode === mode;

                            return (
                                <label
                                    key={mode}
                                    className={`group/item flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all duration-300 ${isActive
                                            ? "border-indigo-200 bg-indigo-50 text-[#312E81] shadow-sm"
                                            : "border-slate-200 bg-white text-slate-700 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-md"
                                        }`}
                                >

                                    <div
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                                                ? "border-[#312E81] bg-[#312E81]"
                                                : "border-slate-300 group-hover/item:border-[#312E81]"
                                            }`}
                                    >
                                        {isActive && (
                                            <Check
                                                size={11}
                                                className="text-white"
                                            />
                                        )}
                                    </div>

                                    <input
                                        type="radio"
                                        name="mode"
                                        value={mode}
                                        checked={isActive}
                                        onChange={() =>
                                            handleChange("mode", mode)
                                        }
                                        className="hidden"
                                    />

                                    <span className="flex-1 text-sm font-bold">
                                        {mode}
                                    </span>

                                    <ArrowIndicator active={isActive} />

                                </label>
                            );
                        })}

                    </div>
                </div>

                {/* Category */}
                <div className="mb-8">

                    <div className="mb-4 flex items-center justify-between">

                        <div className="flex items-center gap-2.5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-[#14B8A6] transition-all duration-300 hover:scale-110 hover:rotate-3 hover:bg-teal-100">
                                <Layers size={17} />
                            </div>

                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">
                                    Category
                                </h4>

                                <p className="text-[10px] font-medium text-slate-400">
                                    Pick your interest
                                </p>
                            </div>

                        </div>

                        <span className="rounded-full bg-teal-50 px-2 py-1 text-[9px] font-black text-[#14B8A6]">
                            {categories.length}
                        </span>

                    </div>

                    <div className="max-h-64 space-y-2 overflow-y-auto pr-1 scrollbar-thin">

                        {categories.map((category) => {

                            const isActive =
                                filters.category === category;

                            return (
                                <label
                                    key={category}
                                    className={`group/item flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all duration-300 ${isActive
                                            ? "border-teal-200 bg-teal-50 text-[#14B8A6] shadow-sm"
                                            : "border-slate-200 bg-white text-slate-700 hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50/50 hover:shadow-md"
                                        }`}
                                >

                                    <div
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                                                ? "border-[#14B8A6] bg-[#14B8A6]"
                                                : "border-slate-300 group-hover/item:border-[#14B8A6]"
                                            }`}
                                    >
                                        {isActive && (
                                            <Check
                                                size={11}
                                                className="text-white"
                                            />
                                        )}
                                    </div>

                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={isActive}
                                        onChange={() =>
                                            handleChange(
                                                "category",
                                                category
                                            )
                                        }
                                        className="hidden"
                                    />

                                    <span className="flex-1 text-sm font-bold">
                                        {category}
                                    </span>

                                    <ArrowIndicator active={isActive} />

                                </label>
                            );
                        })}

                    </div>
                </div>

                {/* Difficulty */}
                <div>

                    <div className="mb-4 flex items-center justify-between">

                        <div className="flex items-center gap-2.5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition-all duration-300 hover:scale-110 hover:rotate-3 hover:bg-cyan-100">
                                <Gauge size={17} />
                            </div>

                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">
                                    Difficulty
                                </h4>

                                <p className="text-[10px] font-medium text-slate-400">
                                    Select skill level
                                </p>
                            </div>

                        </div>

                        <span className="rounded-full bg-cyan-50 px-2 py-1 text-[9px] font-black text-cyan-600">
                            {difficulties.length}
                        </span>

                    </div>

                    <div className="space-y-2">

                        {difficulties.map((difficulty) => {

                            const isActive =
                                filters.difficulty === difficulty;

                            return (
                                <label
                                    key={difficulty}
                                    className={`group/item flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all duration-300 ${isActive
                                            ? "border-cyan-200 bg-cyan-50 text-cyan-700 shadow-sm"
                                            : "border-slate-200 bg-white text-slate-700 hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50/50 hover:shadow-md"
                                        }`}
                                >

                                    <div
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                                                ? "border-cyan-600 bg-cyan-600"
                                                : "border-slate-300 group-hover/item:border-cyan-500"
                                            }`}
                                    >
                                        {isActive && (
                                            <Check
                                                size={11}
                                                className="text-white"
                                            />
                                        )}
                                    </div>

                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value={difficulty}
                                        checked={isActive}
                                        onChange={() =>
                                            handleChange(
                                                "difficulty",
                                                difficulty
                                            )
                                        }
                                        className="hidden"
                                    />

                                    <span className="flex-1 text-sm font-bold">
                                        {difficulty}
                                    </span>

                                    <ArrowIndicator active={isActive} />

                                </label>
                            );
                        })}

                    </div>
                </div>

                {/* Explore Footer */}
                <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#1E1B4B] p-5 text-white shadow-xl shadow-indigo-100 transition-all duration-500 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-2xl">

                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#312E81] blur-xl" />

                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-[#14B8A6]/20 blur-xl" />

                    <div className="relative">

                        <div className="mb-3 flex items-center justify-between">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:rotate-12 hover:scale-110">
                                <Sparkles size={17} />
                            </div>

                            <Zap
                                size={18}
                                className="text-[#5EEAD4]"
                            />

                        </div>

                        <h4 className="text-base font-black">
                            Explore More
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-indigo-100">
                            Find hackathons that match your
                            skills, interests and experience.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[10px] font-bold backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                                🚀 Innovate
                            </span>

                            <span className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[10px] font-bold backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                                🤝 Collaborate
                            </span>

                            <span className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[10px] font-bold backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                                🏆 Compete
                            </span>

                        </div>

                    </div>
                </div>

            </div>

            {/* Bottom Dashboard Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#14B8A6] transition-all duration-500 group-hover:h-1.5" />

        </aside>
    );
};

/* Arrow Indicator */
const ArrowIndicator = ({ active }) => {
    return (
        <div
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 ${active
                    ? "bg-[#312E81] text-white shadow-sm"
                    : "bg-slate-50 text-slate-300 group-hover/item:bg-indigo-100 group-hover/item:text-[#312E81]"
                }`}
        >
            <span className="text-xs">→</span>
        </div>
    );
};

export default FilterSidebar;