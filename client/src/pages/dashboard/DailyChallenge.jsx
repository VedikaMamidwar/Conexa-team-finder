import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DailyChallenge() {
    const navigate = useNavigate();

    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [answer, setAnswer] = useState("");

    const challenge = {
        title: "Find the Missing Number",
        category: "Logic & Problem Solving",
        difficulty: "Medium",
        time: "10 min",
        xp: 100,
        description:
            "Test your problem-solving skills. Find the missing number in the following sequence.",
        question: "2, 6, 12, 20, 30, ?",
        options: ["36", "40", "42", "44"],
    };

    const handleSubmit = () => {
        if (!answer) return;

        if (answer === "42") {
            setCompleted(true);
        } else {
            alert("Not quite! Try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <h1 className="text-2xl font-bold text-indigo-950">
                            Daily Challenge
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Improve your skills every day 🚀
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        ← Dashboard
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero */}
                <section className="relative overflow-hidden rounded-3xl bg-indigo-950 p-8 text-white shadow-xl">
                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                            🔥 Daily Challenge
                        </span>

                        <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                            Challenge yourself.
                            <br />
                            Grow every day.
                        </h2>

                        <p className="mt-4 leading-7 text-indigo-100">
                            Complete today's challenge to earn XP, maintain your
                            streak and improve your problem-solving skills.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <div className="rounded-xl bg-white/10 px-4 py-3">
                                <p className="text-xs text-indigo-200">
                                    Current Streak
                                </p>
                                <p className="mt-1 text-xl font-bold">7 🔥</p>
                            </div>

                            <div className="rounded-xl bg-white/10 px-4 py-3">
                                <p className="text-xs text-indigo-200">
                                    Total XP
                                </p>
                                <p className="mt-1 text-xl font-bold">1,240</p>
                            </div>

                            <div className="rounded-xl bg-white/10 px-4 py-3">
                                <p className="text-xs text-indigo-200">
                                    Challenges
                                </p>
                                <p className="mt-1 text-xl font-bold">24</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-800 opacity-50" />
                    <div className="absolute -bottom-20 right-20 h-56 w-56 rounded-full bg-indigo-800 opacity-40" />
                </section>

                {/* Stats */}
                <section className="mt-8 grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">Today's XP</p>
                        <div className="mt-2 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-indigo-950">
                                +100 XP
                            </h3>
                            <span className="text-2xl">⭐</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">Difficulty</p>
                        <div className="mt-2 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-indigo-950">
                                Medium
                            </h3>
                            <span className="text-2xl">⚡</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">Time Limit</p>
                        <div className="mt-2 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-indigo-950">
                                10 min
                            </h3>
                            <span className="text-2xl">⏱️</span>
                        </div>
                    </div>
                </section>

                {/* Challenge Card */}
                <section className="mt-8">
                    {!started && !completed && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="flex flex-col justify-between gap-6 md:flex-row">
                                <div>
                                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                                        {challenge.category}
                                    </span>

                                    <h2 className="mt-4 text-3xl font-bold text-indigo-950">
                                        {challenge.title}
                                    </h2>

                                    <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                                        {challenge.description}
                                    </p>
                                </div>

                                <div className="flex gap-3 md:flex-col">
                                    <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
                                        <p className="text-xs text-slate-500">
                                            XP
                                        </p>
                                        <p className="font-bold text-indigo-950">
                                            +{challenge.xp}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
                                        <p className="text-xs text-slate-500">
                                            Time
                                        </p>
                                        <p className="font-bold text-indigo-950">
                                            {challenge.time}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8">
                                <div className="rounded-2xl bg-slate-50 p-6">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Today's Question
                                    </p>

                                    <p className="mt-4 text-2xl font-bold tracking-wide text-indigo-950">
                                        {challenge.question}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setStarted(true)}
                                    className="mt-6 rounded-xl bg-indigo-950 px-7 py-3 font-semibold text-white transition hover:bg-indigo-900"
                                >
                                    Start Challenge →
                                </button>
                            </div>
                        </div>
                    )}

                    {started && !completed && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-indigo-600">
                                        Question 1 of 1
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-indigo-950">
                                        {challenge.title}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
                                    ⏱️ 10:00
                                </div>
                            </div>

                            <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">
                                <p className="text-sm text-slate-500">
                                    Find the missing number
                                </p>

                                <p className="mt-4 text-3xl font-bold tracking-widest text-indigo-950">
                                    {challenge.question}
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                {challenge.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setAnswer(option)}
                                        className={`rounded-xl border p-4 text-lg font-semibold transition ${answer === option
                                                ? "border-indigo-950 bg-indigo-950 text-white"
                                                : "border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!answer}
                                className="mt-8 w-full rounded-xl bg-indigo-950 py-4 font-semibold text-white transition hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}

                    {completed && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                                🎉
                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-indigo-950">
                                Challenge Completed!
                            </h2>

                            <p className="mx-auto mt-3 max-w-lg text-slate-500">
                                Excellent work! You solved today's challenge
                                correctly and kept your learning streak alive.
                            </p>

                            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-indigo-50 p-5">
                                    <p className="text-sm text-slate-500">
                                        Earned
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-indigo-950">
                                        +100 XP
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-orange-50 p-5">
                                    <p className="text-sm text-slate-500">
                                        Streak
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-orange-600">
                                        8 🔥
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="rounded-xl bg-indigo-950 px-6 py-3 font-semibold text-white hover:bg-indigo-900"
                                >
                                    Back to Dashboard
                                </button>

                                <button
                                    onClick={() => {
                                        setCompleted(false);
                                        setStarted(false);
                                        setAnswer("");
                                    }}
                                    className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    View Challenge
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}