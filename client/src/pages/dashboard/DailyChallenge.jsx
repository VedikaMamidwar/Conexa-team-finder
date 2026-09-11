import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    Code2,
    Lightbulb,
    Trophy,
    Flame,
    ChevronRight,
} from "lucide-react";

const challenges = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        category: "Arrays",
        description:
            "Given an array of integers, find two numbers that add up to a given target.",
        points: 10,
        time: "15 min",
    },
    {
        id: 2,
        title: "Reverse a String",
        difficulty: "Easy",
        category: "Strings",
        description:
            "Write a program to reverse a string without using a built-in reverse function.",
        points: 10,
        time: "10 min",
    },
    {
        id: 3,
        title: "Find Maximum Element",
        difficulty: "Easy",
        category: "Arrays",
        description:
            "Find the largest element in an array of integers.",
        points: 15,
        time: "15 min",
    },
];

export default function DailyChallenge() {
    const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
    const [answer, setAnswer] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!answer.trim()) return;
        setSubmitted(true);
    };

    const handleReset = () => {
        setAnswer("");
        setSubmitted(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">

            {/* HEADER */}
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
                <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-600 transition hover:bg-slate-100"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-semibold">
                            Back to Dashboard
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-orange-600">
                        <Flame size={18} />
                        <span className="text-sm font-bold">
                            7 Day Streak
                        </span>
                    </div>

                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* TITLE */}
                <div className="mb-6">

                    <div className="mb-2 flex items-center gap-2 text-[#14B8A6]">
                        <Code2 size={22} />
                        <span className="text-sm font-bold uppercase tracking-wider">
                            Daily Practice
                        </span>
                    </div>

                    <h1 className="text-3xl font-black text-[#1E1B4B] sm:text-4xl">
                        Daily Challenge
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Improve your coding skills with a new challenge every day.
                    </p>

                </div>

                {/* STATS */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <StatCard
                        icon={<Trophy size={22} />}
                        title="Total Points"
                        value="120"
                        subtitle="+10 today"
                    />

                    <StatCard
                        icon={<CheckCircle2 size={22} />}
                        title="Completed"
                        value="12"
                        subtitle="Challenges"
                    />

                    <StatCard
                        icon={<Flame size={22} />}
                        title="Current Streak"
                        value="7"
                        subtitle="Days"
                    />

                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                    {/* CHALLENGE LIST */}
                    <div className="lg:col-span-4">

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="mb-4">
                                <h2 className="text-lg font-bold text-[#1E1B4B]">
                                    Challenges
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Choose a challenge
                                </p>
                            </div>

                            <div className="space-y-3">

                                {challenges.map((challenge) => {

                                    const active =
                                        selectedChallenge.id === challenge.id;

                                    return (
                                        <button
                                            key={challenge.id}
                                            onClick={() => {
                                                setSelectedChallenge(challenge);
                                                handleReset();
                                            }}
                                            className={`w-full rounded-xl border p-4 text-left transition ${active
                                                    ? "border-[#14B8A6] bg-[#14B8A6]/5"
                                                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                                }`}
                                        >

                                            <div className="flex items-start justify-between gap-3">

                                                <div>

                                                    <h3 className="font-bold text-[#1E1B4B]">
                                                        {challenge.title}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {challenge.category}
                                                    </p>

                                                </div>

                                                <ChevronRight
                                                    size={18}
                                                    className={
                                                        active
                                                            ? "text-[#14B8A6]"
                                                            : "text-slate-400"
                                                    }
                                                />

                                            </div>

                                            <div className="mt-3 flex items-center justify-between">

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${challenge.difficulty === "Easy"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-orange-100 text-orange-700"
                                                        }`}
                                                >
                                                    {challenge.difficulty}
                                                </span>

                                                <span className="text-xs font-semibold text-slate-500">
                                                    +{challenge.points} pts
                                                </span>

                                            </div>

                                        </button>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                    {/* SELECTED CHALLENGE */}
                    <div className="lg:col-span-8">

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                            {/* CHALLENGE HEADER */}
                            <div className="border-b border-slate-200 p-5 sm:p-6">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div>

                                        <div className="mb-2 flex flex-wrap items-center gap-2">

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                                {selectedChallenge.difficulty}
                                            </span>

                                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-[#1E1B4B]">
                                                {selectedChallenge.category}
                                            </span>

                                        </div>

                                        <h2 className="text-2xl font-black text-[#1E1B4B]">
                                            {selectedChallenge.title}
                                        </h2>

                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock3 size={17} />
                                        {selectedChallenge.time}
                                    </div>

                                </div>

                            </div>

                            {/* DESCRIPTION */}
                            <div className="p-5 sm:p-6">

                                <div className="mb-6 rounded-xl bg-slate-50 p-4">

                                    <div className="mb-2 flex items-center gap-2">
                                        <Lightbulb
                                            size={18}
                                            className="text-yellow-500"
                                        />

                                        <h3 className="font-bold text-[#1E1B4B]">
                                            Problem
                                        </h3>
                                    </div>

                                    <p className="leading-7 text-slate-600">
                                        {selectedChallenge.description}
                                    </p>

                                </div>

                                {/* ANSWER */}
                                <div>

                                    <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                                        Your Solution
                                    </label>

                                    <textarea
                                        value={answer}
                                        onChange={(e) =>
                                            setAnswer(e.target.value)
                                        }
                                        placeholder="Write your solution or explanation here..."
                                        rows={10}
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm outline-none transition focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20"
                                    />

                                </div>

                                {/* RESULT */}
                                {submitted && (
                                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

                                        <CheckCircle2 size={22} />

                                        <div>
                                            <p className="font-bold">
                                                Solution submitted!
                                            </p>

                                            <p className="text-sm">
                                                You earned +{selectedChallenge.points} points.
                                            </p>
                                        </div>

                                    </div>
                                )}

                                {/* BUTTONS */}
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">

                                    <button
                                        onClick={handleReset}
                                        className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
                                    >
                                        Reset
                                    </button>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!answer.trim()}
                                        className="rounded-xl bg-[#1E1B4B] px-6 py-3 font-bold text-white transition hover:bg-[#2a2765] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Submit Solution
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}

function StatCard({ icon, title, value, subtitle }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#14B8A6]">
                    {icon}
                </div>

                <span className="text-xs font-semibold text-green-600">
                    {subtitle}
                </span>

            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-1 text-2xl font-black text-[#1E1B4B]">
                {value}
            </p>

        </div>
    );
}