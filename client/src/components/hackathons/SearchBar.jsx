
import React, { useEffect, useRef, useState } from "react";
import {
    Search,
    X,
    Sparkles,
    Tag,
    Users,
    Trophy,
    ArrowRight,
    Zap,
    Brain,
    Code2,
} from "lucide-react";

const SearchBar = ({ searchTerm = "", onSearch }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(searchTerm);
    const inputRef = useRef(null);

    // Keep local input synchronized with parent searchTerm
    useEffect(() => {
        setInputValue(searchTerm || "");
    }, [searchTerm]);

    // Handle search input
    const handleChange = (event) => {
        const value = event.target.value;

        setInputValue(value);

        if (typeof onSearch === "function") {
            onSearch(value);
        }
    };

    // Clear search
    const clearSearch = () => {
        setInputValue("");

        if (typeof onSearch === "function") {
            onSearch("");
        }

        inputRef.current?.focus();
    };

    // Search from category buttons
    const handleCategorySearch = (value) => {
        setInputValue(value);

        if (typeof onSearch === "function") {
            onSearch(value);
        }

        inputRef.current?.focus();
    };

    // Ctrl + K / Cmd + K shortcut
    useEffect(() => {
        const handleKeyboardShortcut = (event) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();
                inputRef.current?.focus();
            }

            if (event.key === "Escape") {
                clearSearch();
            }
        };

        window.addEventListener("keydown", handleKeyboardShortcut);

        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcut);
        };
    }, []);

    const quickActions = [
        {
            title: "Hackathons",
            subtitle: "Find events",
            icon: Trophy,
            value: "",
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
            border: "border-indigo-100",
            hoverBorder: "hover:border-indigo-300",
            gradient: "from-indigo-50 to-white",
        },
        {
            title: "Skills",
            subtitle: "Find by skill",
            icon: Tag,
            value: "React",
            iconBg: "bg-teal-100",
            iconColor: "text-teal-600",
            border: "border-teal-100",
            hoverBorder: "hover:border-teal-300",
            gradient: "from-teal-50 to-white",
        },
        {
            title: "Teams",
            subtitle: "Find teammates",
            icon: Users,
            value: "team",
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600",
            border: "border-violet-100",
            hoverBorder: "hover:border-violet-300",
            gradient: "from-violet-50 to-white",
        },
        {
            title: "Categories",
            subtitle: "Explore topics",
            icon: Sparkles,
            value: "AI",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            border: "border-amber-100",
            hoverBorder: "hover:border-amber-300",
            gradient: "from-amber-50 to-white",
        },
    ];

    const popularSearches = [
        {
            label: "AI",
            value: "AI",
            icon: Brain,
        },
        {
            label: "React",
            value: "React",
            icon: Code2,
        },
        {
            label: "Python",
            value: "Python",
            icon: Zap,
        },
    ];

    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-6xl">

                {/* =====================================================
                    HEADER
                ====================================================== */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <Search size={16} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">
                                Explore
                            </span>
                        </div>

                        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                            Find your next{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                                opportunity
                            </span>
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Search hackathons, skills, teams, and categories.
                        </p>
                    </div>

                    {/* Small status box */}
                    <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm sm:flex">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />

                        <span className="text-xs font-bold text-slate-500">
                            Explore opportunities
                        </span>
                    </div>
                </div>

                {/* =====================================================
                    MAIN SEARCH
                ====================================================== */}
                <div className="group relative">

                    {/* Animated glow */}
                    <div
                        className={`pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-indigo-600 via-teal-500 to-violet-500 blur-2xl transition-all duration-500 ${
                            isFocused
                                ? "opacity-25"
                                : "opacity-0 group-hover:opacity-10"
                        }`}
                    />

                    <div
                        className={`relative overflow-hidden rounded-[1.7rem] border bg-white transition-all duration-300 ${
                            isFocused
                                ? "border-teal-300 shadow-2xl shadow-teal-100"
                                : "border-slate-200 shadow-lg hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                        }`}
                    >

                        {/* Top accent */}
                        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-teal-500 to-violet-500" />

                        <div className="flex items-center p-3 sm:p-4">

                            {/* Search icon */}
                            <div className="mr-2 sm:mr-3">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                                        isFocused
                                            ? "bg-gradient-to-br from-indigo-600 to-teal-500 text-white shadow-lg shadow-teal-200"
                                            : "bg-slate-100 text-indigo-600"
                                    }`}
                                >
                                    <Search
                                        size={21}
                                        className={`transition-all duration-300 ${
                                            isFocused
                                                ? "scale-110 rotate-3"
                                                : ""
                                        }`}
                                    />
                                </div>
                            </div>

                            {/* Input */}
                            <div className="min-w-0 flex-1">
                                <label className="mb-0.5 block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Search
                                </label>

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={handleChange}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Search hackathons, skills, categories..."
                                    aria-label="Search hackathons"
                                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                                />
                            </div>

                            {/* Right controls */}
                            <div className="ml-2 flex items-center gap-2">

                                {inputValue ? (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        aria-label="Clear search"
                                        className="group/clear flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:bg-red-50 hover:text-red-500 hover:shadow-md active:scale-90"
                                    >
                                        <X
                                            size={18}
                                            className="transition-transform duration-300 group-hover/clear:rotate-90"
                                        />
                                    </button>
                                ) : (
                                    <div className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
                                        <span className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-sm">
                                            Ctrl
                                        </span>

                                        <span className="text-xs text-slate-300">
                                            +
                                        </span>

                                        <span className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-sm">
                                            K
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    SEARCH HINT + POPULAR SEARCHES
                ====================================================== */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-500 transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:bg-teal-100">
                            <Sparkles size={13} />
                        </div>

                        <span>
                            Search by title, organizer, category, or description
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Popular:
                        </span>

                        {popularSearches.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() =>
                                        handleCategorySearch(item.value)
                                    }
                                    className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md"
                                >
                                    <Icon
                                        size={12}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* =====================================================
                    QUICK ACTION BOXES
                ====================================================== */}
                <div className="mt-6">

                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black text-slate-800">
                                Quick explore
                            </h3>

                            <p className="text-xs text-slate-400">
                                Jump directly to what you're looking for
                            </p>
                        </div>

                        <div className="hidden h-px flex-1 bg-slate-100 sm:ml-5 sm:block" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                        {quickActions.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={() =>
                                        handleCategorySearch(item.value)
                                    }
                                    className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border ${item.border} bg-gradient-to-br ${item.gradient} p-3.5 text-left transition-all duration-300 ${item.hoverBorder} hover:-translate-y-1.5 hover:shadow-xl`}
                                >
                                    {/* Hover decoration */}
                                    <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-white/70 transition-transform duration-500 group-hover:scale-[2.5]" />

                                    {/* Icon */}
                                    <div
                                        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md`}
                                    >
                                        <Icon size={18} />
                                    </div>

                                    {/* Text */}
                                    <div className="relative min-w-0">
                                        <p className="truncate text-xs font-black text-slate-800 sm:text-sm">
                                            {item.title}
                                        </p>

                                        <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                                            {item.subtitle}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="relative ml-auto hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white sm:flex">
                                        <ArrowRight
                                            size={13}
                                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* =====================================================
                    ACTIVE SEARCH
                ====================================================== */}
                {inputValue && (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 via-white to-indigo-50 shadow-sm transition-all duration-300 hover:shadow-md">

                        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm">
                                    <Search size={17} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-600">
                                        Currently searching
                                    </p>

                                    <p className="truncate text-sm font-black text-slate-800 sm:text-base">
                                        "{inputValue}"
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={clearSearch}
                                className="group flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-500 hover:shadow-md"
                            >
                                <X
                                    size={14}
                                    className="transition-transform duration-300 group-hover:rotate-90"
                                />

                                Clear search
                            </button>
                        </div>
                    </div>
                )}

                {/* =====================================================
                    BOTTOM INFO BOXES
                ====================================================== */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-md">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-110">
                            <Trophy size={15} />
                        </div>

                        <div>
                            <p className="text-xs font-black text-slate-700">
                                Discover
                            </p>

                            <p className="text-[10px] text-slate-400">
                                New opportunities
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-md">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-transform duration-300 group-hover:scale-110">
                            <Users size={15} />
                        </div>

                        <div>
                            <p className="text-xs font-black text-slate-700">
                                Connect
                            </p>

                            <p className="text-[10px] text-slate-400">
                                Find your teammates
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-md">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform duration-300 group-hover:scale-110">
                            <Sparkles size={15} />
                        </div>

                        <div>
                            <p className="text-xs font-black text-slate-700">
                                Create
                            </p>

                            <p className="text-[10px] text-slate-400">
                                Build something amazing
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchBar;

