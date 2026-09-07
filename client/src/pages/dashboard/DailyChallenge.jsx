import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Clock,
    Flame,
    Lightbulb,
    RotateCcw,
    Trophy,
    Target,
    Star,
    Award,
    CalendarDays,
    Zap,
    XCircle,
} from "lucide-react";

export default function DailyChallenge() {
    const navigate = useNavigate();

    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [answer, setAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(600);
    const [showHint, setShowHint] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState(false);

    const [streak, setStreak] = useState(() => {
        return Number(localStorage.getItem("dailyStreak")) || 7;
    });

    const [totalXP, setTotalXP] = useState(() => {
        return Number(localStorage.getItem("dailyXP")) || 1240;
    });

    const [completedDays, setCompletedDays] = useState(() => {
        return Number(localStorage.getItem("completedChallenges")) || 24;
    });

    const challenge = {
        title: "The Hacker's Sequence",
        category: "Logic & Problem Solving",
        difficulty: "Medium",
        time: "10 min",
        xp: 100,

        description:
            "A mysterious sequence has been found in an old programming challenge. Find the missing number and prove your problem-solving skills.",

        question: "3, 8, 15, 24, 35, ?",

        options: ["46", "48", "49", "50"],

        correctAnswer: "48",

        hint:
            "Look at the difference between consecutive numbers. The difference increases by 2 each time.",

        explanation:
            "The differences are +5, +7, +9, +11, so the next difference is +13. Therefore, 35 + 13 = 48.",
    };

    /* ================= TIMER ================= */

    useEffect(() => {
        if (!started || completed || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [started, completed, timeLeft]);

    /* ================= FORMAT TIMER ================= */

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    };

    /* ================= GET TODAY ================= */

    const getToday = () => {
        return new Date().toISOString().split("T")[0];
    };

    /* ================= COMPLETE STREAK ================= */

    const updateDailyStreak = () => {
        const today = getToday();

        const lastCompleted = localStorage.getItem(
            "lastChallengeCompleted"
        );

        // Already completed today
        if (lastCompleted === today) {
            return;
        }

        let newStreak = streak;

        if (lastCompleted) {
            const lastDate = new Date(lastCompleted);
            const currentDate = new Date(today);

            const difference =
                Math.floor(
                    (currentDate - lastDate) /
                    (1000 * 60 * 60 * 24)
                );

            // Consecutive day
            if (difference === 1) {
                newStreak = streak + 1;
            }

            // Missed one or more days
            else if (difference > 1) {
                newStreak = 1;
            }
        } else {
            newStreak = 1;
        }

        setStreak(newStreak);

        const newXP = totalXP + challenge.xp;
        const newCompletedDays = completedDays + 1;

        setTotalXP(newXP);
        setCompletedDays(newCompletedDays);

        localStorage.setItem("dailyStreak", newStreak);
        localStorage.setItem("dailyXP", newXP);
        localStorage.setItem(
            "completedChallenges",
            newCompletedDays
        );
        localStorage.setItem(
            "lastChallengeCompleted",
            today
        );
    };

    /* ================= START ================= */

    const startChallenge = () => {
        setStarted(true);
        setCompleted(false);
        setAnswer("");
        setWrongAnswer(false);
        setShowHint(false);
        setTimeLeft(600);
    };

    /* ================= SUBMIT ================= */

    const handleSubmit = () => {
        if (!answer || timeLeft === 0) return;

        if (answer === challenge.correctAnswer) {
            updateDailyStreak();
            setCompleted(true);
        } else {
            setWrongAnswer(true);
        }
    };

    /* ================= RESET ================= */

    const resetChallenge = () => {
        setStarted(false);
        setCompleted(false);
        setAnswer("");
        setWrongAnswer(false);
        setShowHint(false);
        setTimeLeft(600);
    };

    const timerDanger = timeLeft <= 60;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">

            {/* ================= HEADER ================= */}

            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">

                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                                🔥
                            </div>

                            <h1 className="text-xl font-bold text-[#1E1B4B] sm:text-2xl">
                                Daily Challenge
                            </h1>
                        </div>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            One challenge a day. One step closer to mastery 🚀
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        <ArrowLeft size={17} />
                        Dashboard
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:py-8">

                {/* ================= HERO ================= */}

                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#0F766E] p-6 text-white shadow-xl sm:p-8 md:p-10">

                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10" />
                    <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-white/5" />

                    <div className="relative z-10">

                        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                            <div className="max-w-2xl">

                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:px-4 sm:py-2 sm:text-sm">
                                    <Flame size={15} />
                                    Daily Challenge
                                </span>

                                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                                    Challenge yourself.
                                    <br />
                                    Grow every day.
                                </h2>

                                <p className="mt-4 text-sm leading-6 text-indigo-100 sm:text-base sm:leading-7">
                                    Complete today's challenge, earn XP,
                                    build your streak and become better
                                    every single day.
                                </p>
                            </div>

                            <div className="hidden lg:block">
                                <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-white/10 text-7xl backdrop-blur">
                                    🧠
                                </div>
                            </div>
                        </div>

                        {/* HERO STATS */}

                        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">

                            <HeroStat
                                icon={<Flame size={18} />}
                                label="Current Streak"
                                value={`${streak} Days`}
                            />

                            <HeroStat
                                icon={<Zap size={18} />}
                                label="Total XP"
                                value={totalXP.toLocaleString()}
                            />

                            <HeroStat
                                icon={<Trophy size={18} />}
                                label="Challenges Solved"
                                value={completedDays}
                            />

                        </div>
                    </div>
                </section>

                {/* ================= MOTIVATION BAR ================= */}

                <section className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:p-5">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                🔥
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#1E1B4B]">
                                    {streak >= 7
                                        ? "You're on fire! Keep your streak alive."
                                        : "Build your streak one day at a time!"}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    Complete today's challenge to continue your journey.
                                </p>
                            </div>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="text-xs text-slate-500">
                                Next milestone
                            </p>

                            <p className="text-sm font-bold text-indigo-700">
                                {Math.max(0, 10 - streak)} days to 10 🔥
                            </p>
                        </div>

                    </div>
                </section>

                {/* ================= STATS ================= */}

                <section className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">

                    <StatCard
                        label="Today's XP"
                        value="+100 XP"
                        icon={<Star size={20} />}
                    />

                    <StatCard
                        label="Difficulty"
                        value="Medium"
                        icon={<Target size={20} />}
                    />

                    <StatCard
                        label="Time Limit"
                        value="10 min"
                        icon={<Clock size={20} />}
                    />

                    <StatCard
                        label="Your Streak"
                        value={`${streak} 🔥`}
                        icon={<Flame size={20} />}
                    />

                </section>

                {/* ================= LOWER CONTENT ================= */}

                <div className="mt-7 grid gap-6 xl:grid-cols-3">

                    {/* ================= CHALLENGE ================= */}

                    <section className="xl:col-span-2">

                        {!started && !completed && (
                            <ChallengeIntro
                                challenge={challenge}
                                startChallenge={startChallenge}
                            />
                        )}

                        {started && !completed && (
                            <ActiveChallenge
                                challenge={challenge}
                                answer={answer}
                                setAnswer={setAnswer}
                                showHint={showHint}
                                setShowHint={setShowHint}
                                wrongAnswer={wrongAnswer}
                                handleSubmit={handleSubmit}
                                timerDanger={timerDanger}
                                formatTime={formatTime}
                                timeLeft={timeLeft}
                                resetChallenge={resetChallenge}
                            />
                        )}

                        {completed && (
                            <CompletedChallenge
                                challenge={challenge}
                                streak={streak}
                                navigate={navigate}
                                resetChallenge={resetChallenge}
                            />
                        )}

                    </section>

                    {/* ================= SIDEBAR ================= */}

                    <aside className="space-y-5">

                        {/* WEEKLY STREAK */}

                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="font-bold text-[#1E1B4B]">
                                        Weekly Streak
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Keep the fire alive 🔥
                                    </p>
                                </div>

                                <div className="rounded-xl bg-orange-50 p-2.5 text-orange-500">
                                    <Flame size={20} />
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-7 gap-1.5">

                                {["M", "T", "W", "T", "F", "S", "S"].map(
                                    (day, index) => (
                                        <div
                                            key={`${day}-${index}`}
                                            className="text-center"
                                        >
                                            <p className="mb-2 text-[10px] font-semibold text-slate-400">
                                                {day}
                                            </p>

                                            <div
                                                className={`flex h-9 w-full items-center justify-center rounded-lg text-sm ${index < 5
                                                        ? "bg-orange-100 text-orange-600"
                                                        : index === 5
                                                            ? "bg-[#1E1B4B] text-white"
                                                            : "bg-slate-100 text-slate-400"
                                                    }`}
                                            >
                                                {index < 5
                                                    ? "✓"
                                                    : index === 5
                                                        ? "🔥"
                                                        : "–"}
                                            </div>
                                        </div>
                                    )
                                )}

                            </div>

                            <div className="mt-5 rounded-xl bg-slate-50 p-3 text-center">
                                <p className="text-xs text-slate-500">
                                    Current streak
                                </p>

                                <p className="mt-1 text-2xl font-bold text-orange-500">
                                    {streak} Days 🔥
                                </p>
                            </div>
                        </div>

                        {/* ACHIEVEMENTS */}

                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-2">
                                <Award size={20} className="text-indigo-600" />

                                <div>
                                    <h3 className="font-bold text-[#1E1B4B]">
                                        Achievements
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        Your recent milestones
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">

                                <Achievement
                                    icon="🔥"
                                    title="7 Day Streak"
                                    text="Completed challenges for 7 days"
                                />

                                <Achievement
                                    icon="⚡"
                                    title="Fast Thinker"
                                    text="Solved a challenge under 5 min"
                                />

                                <Achievement
                                    icon="🏆"
                                    title="Problem Solver"
                                    text="Completed 20+ challenges"
                                />

                            </div>
                        </div>

                        {/* TIP */}

                        <div className="rounded-3xl bg-gradient-to-br from-indigo-950 to-indigo-800 p-5 text-white shadow-lg">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                💡
                            </div>

                            <h3 className="mt-4 font-bold">
                                Daily Tip
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-indigo-100">
                                Don't rush to find the answer. First identify
                                the pattern, then test your hypothesis.
                            </p>

                        </div>

                    </aside>
                </div>

                {/* ================= BOTTOM MOTIVATION ================= */}

                <section className="mt-7 overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-200 sm:p-8">

                    <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

                        <div className="flex flex-col items-center gap-4 sm:flex-row">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 text-3xl">
                                🚀
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#1E1B4B] sm:text-xl">
                                    Small progress every day = Big results
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Keep solving challenges and become a better problem solver.
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => navigate("/find-teammates")}
                            className="flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-900"
                        >
                            Find Teammates
                            <ArrowRight size={17} />
                        </button>

                    </div>
                </section>

            </main>
        </div>
    );
}


/* =========================================================
   CHALLENGE INTRO
========================================================= */

function ChallengeIntro({ challenge, startChallenge }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row">

                <div className="max-w-2xl">

                    <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                        {challenge.category}
                    </span>

                    <h2 className="mt-4 text-2xl font-bold text-[#1E1B4B] sm:text-3xl">
                        {challenge.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                        {challenge.description}
                    </p>

                </div>

                <div className="flex gap-3 md:flex-col">

                    <MiniStat
                        label="XP"
                        value={`+${challenge.xp}`}
                    />

                    <MiniStat
                        label="Time"
                        value={challenge.time}
                    />

                </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-7">

                <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 p-5 sm:p-8">

                    <p className="text-sm font-semibold text-slate-500">
                        🧩 Today's Question
                    </p>

                    <p className="mt-5 text-center text-2xl font-bold tracking-widest text-[#1E1B4B] sm:text-4xl">
                        {challenge.question}
                    </p>

                    <p className="mt-4 text-center text-xs text-slate-400">
                        Can you crack the pattern?
                    </p>

                </div>

                <button
                    onClick={startChallenge}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-7 py-3.5 font-semibold text-white transition hover:bg-indigo-900 sm:w-fit"
                >
                    Start Challenge
                    <ArrowRight size={18} />
                </button>

            </div>
        </div>
    );
}


/* =========================================================
   ACTIVE CHALLENGE
========================================================= */

function ActiveChallenge({
    challenge,
    answer,
    setAnswer,
    showHint,
    setShowHint,
    wrongAnswer,
    handleSubmit,
    timerDanger,
    formatTime,
    timeLeft,
    resetChallenge,
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-sm font-semibold text-indigo-600">
                        Question 1 of 1
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#1E1B4B] sm:text-2xl">
                        {challenge.title}
                    </h2>
                </div>

                <div
                    className={`flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold ${timerDanger
                            ? "bg-red-50 text-red-600"
                            : "bg-indigo-50 text-indigo-700"
                        }`}
                >
                    <Clock size={17} />
                    {formatTime()}
                </div>

            </div>

            {/* QUESTION */}

            <div className="mt-7 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 p-6 text-center sm:p-10">

                <p className="text-sm font-medium text-slate-500">
                    Find the missing number
                </p>

                <p className="mt-5 text-2xl font-bold tracking-widest text-[#1E1B4B] sm:text-4xl">
                    {challenge.question}
                </p>

            </div>

            {/* HINT */}

            <div className="mt-5">

                <button
                    onClick={() => setShowHint((prev) => !prev)}
                    className="flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                    <Lightbulb size={17} />
                    {showHint ? "Hide Hint" : "Need a Hint?"}
                </button>

                {showHint && (
                    <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                        💡 {challenge.hint}
                    </div>
                )}

            </div>

            {/* OPTIONS */}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

                {challenge.options.map((option, index) => (
                    <button
                        key={option}
                        onClick={() => {
                            setAnswer(option);
                        }}
                        className={`flex items-center justify-between rounded-xl border p-4 text-left text-base font-semibold transition sm:p-5 sm:text-lg ${answer === option
                                ? "border-[#1E1B4B] bg-[#1E1B4B] text-white shadow-md"
                                : "border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50"
                            }`}
                    >
                        <span>
                            {String.fromCharCode(65 + index)}. {option}
                        </span>

                        {answer === option && (
                            <CheckCircle size={20} />
                        )}
                    </button>
                ))}

            </div>

            {/* WRONG */}

            {wrongAnswer && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                    <XCircle
                        className="mt-0.5 shrink-0"
                        size={18}
                    />

                    <div>
                        <p className="font-bold">
                            Not quite!
                        </p>

                        <p className="mt-1">
                            Look carefully at how the difference between
                            the numbers changes. Try again.
                        </p>
                    </div>
                </div>
            )}

            {/* SUBMIT */}

            <button
                onClick={handleSubmit}
                disabled={!answer || timeLeft === 0}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] py-4 font-semibold text-white transition hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Submit Answer
                <ArrowRight size={18} />
            </button>

            {timeLeft === 0 && (
                <p className="mt-3 text-center text-sm font-semibold text-red-600">
                    ⏰ Time's up! Restart and try again.
                </p>
            )}

            <button
                onClick={resetChallenge}
                className="mx-auto mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#1E1B4B]"
            >
                <RotateCcw size={15} />
                Exit Challenge
            </button>

        </div>
    );
}


/* =========================================================
   COMPLETED
========================================================= */

function CompletedChallenge({
    challenge,
    streak,
    navigate,
    resetChallenge,
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl shadow-sm">
                🎉
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#1E1B4B] sm:text-3xl">
                Challenge Completed!
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                Excellent work! You solved today's challenge correctly.
                Your streak is still burning 🔥
            </p>

            <div className="mx-auto mt-7 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="rounded-2xl bg-indigo-50 p-5">
                    <p className="text-sm text-slate-500">
                        Earned
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#1E1B4B]">
                        +100 XP
                    </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                    <p className="text-sm text-slate-500">
                        Current Streak
                    </p>

                    <p className="mt-1 text-2xl font-bold text-orange-600">
                        {streak} 🔥
                    </p>
                </div>

            </div>

            <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-slate-50 p-5 text-left">

                <p className="text-sm font-bold text-[#1E1B4B]">
                    🧠 Solution
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    {challenge.explanation}
                </p>

            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-6 py-3 font-semibold text-white transition hover:bg-indigo-900"
                >
                    Back to Dashboard
                    <ArrowRight size={17} />
                </button>

                <button
                    onClick={resetChallenge}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    <RotateCcw size={16} />
                    View Challenge
                </button>

            </div>

        </div>
    );
}


/* =========================================================
   HERO STAT
========================================================= */

function HeroStat({ icon, label, value }) {
    return (
        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">

            <div className="flex items-center gap-2 text-indigo-200">
                {icon}

                <p className="text-xs">
                    {label}
                </p>
            </div>

            <p className="mt-1 text-xl font-bold">
                {value}
            </p>

        </div>
    );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, value, icon }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">

            <div className="flex items-center justify-between gap-2">

                <p className="text-xs text-slate-500 sm:text-sm">
                    {label}
                </p>

                <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                    {icon}
                </div>

            </div>

            <h3 className="mt-3 text-xl font-bold text-[#1E1B4B] sm:text-2xl">
                {value}
            </h3>

        </div>
    );
}


/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({ label, value }) {
    return (
        <div className="min-w-[90px] rounded-xl bg-slate-50 px-4 py-3 text-center">
            <p className="text-xs text-slate-500">
                {label}
            </p>

            <p className="mt-1 font-bold text-[#1E1B4B]">
                {value}
            </p>
        </div>
    );
}


/* =========================================================
   ACHIEVEMENT
========================================================= */

function Achievement({ icon, title, text }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-sm font-bold text-[#1E1B4B]">
                    {title}
                </p>

                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                    {text}
                </p>
            </div>

        </div>
    );
}