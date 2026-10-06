


import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock3,
    MapPin,
    Users,
    Trophy,
    Target,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    Code2,
    UserPlus,
    UserRoundSearch,
    UsersRound,
    Building2,
    HelpCircle,
    Timer,
    Rocket,
    Star,
} from "lucide-react";

import { hackathons } from "../../data/hackathonData";

export default function HackathonDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find selected hackathon
    const hackathon = hackathons.find(
        (item) => String(item.id) === String(id)
    );

    // =========================
    // HACKATHON NOT FOUND
    // =========================
    if (!hackathon) {
        return (
            <div className="min-h-screen bg-slate-100">
                <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4">
                    <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                            <Trophy className="h-8 w-8 text-indigo-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-[#1E1B4B]">
                            Hackathon Not Found
                        </h1>

                        <p className="mt-2 text-slate-500">
                            The hackathon you are looking for does not exist.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/hackathons")}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#312E81]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Hackathons
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // ACTIONS
    // =========================
    const handleRegister = () => {
        navigate(`/hackathons/${hackathon.id}/register`);
    };

    const handleBuildTeam = () => {
        navigate(`/build-team?hackathon=${hackathon.id}`);
    };

    const handleFindTeammates = () => {
        navigate(
            `/build-team?hackathon=${hackathon.id}&find=teammates`
        );
    };

    // =========================
    // FALLBACK DATA
    // =========================

    const technologies = Array.isArray(hackathon.technologies)
        ? hackathon.technologies
        : Array.isArray(hackathon.skills)
        ? hackathon.skills
        : ["React", "JavaScript", "Python", "AI/ML"];

    const timeline = Array.isArray(hackathon.timeline)
        ? hackathon.timeline
        : [
              {
                  title: "Registration Opens",
                  date:
                      hackathon.registrationStart ||
                      "Registration Open",
                  description:
                      "Participants can register and start preparing their teams.",
              },
              {
                  title: "Registration Deadline",
                  date:
                      hackathon.deadline ||
                      "Check event deadline",
                  description:
                      "Complete your registration before the deadline.",
              },
              {
                  title: "Hackathon Begins",
                  date:
                      hackathon.startDate ||
                      "Event Start",
                  description:
                      "Start building your innovative solution with your team.",
              },
              {
                  title: "Submission",
                  date:
                      hackathon.endDate ||
                      "Final Submission",
                  description:
                      "Submit your project before the final submission deadline.",
              },
              {
                  title: "Results",
                  date:
                      hackathon.resultDate ||
                      "After Evaluation",
                  description:
                      "Projects will be evaluated and winners will be announced.",
              },
          ];

    const sponsors = Array.isArray(hackathon.sponsors)
        ? hackathon.sponsors
        : [
              {
                  name:
                      hackathon.organizer ||
                      "Tech Innovators",
                  type: "Organizing Partner",
              },
              {
                  name: "CONEXA",
                  type: "Community Partner",
              },
              {
                  name: "Innovation Hub",
                  type: "Technology Partner",
              },
          ];

    const faqs = Array.isArray(hackathon.faqs)
        ? hackathon.faqs
        : [
              {
                  question:
                      "Who can participate in this hackathon?",
                  answer:
                      hackathon.eligibility ||
                      "Students, developers and technology enthusiasts can participate. Check the eligibility requirements before registering.",
              },
              {
                  question:
                      "Can I participate without a team?",
                  answer:
                      "Yes. You can register individually and use CONEXA to find teammates with matching skills and interests.",
              },
              {
                  question: "What is the team size?",
                  answer:
                      hackathon.teamSize ||
                      "Teams can generally have 1 to 4 members.",
              },
              {
                  question:
                      "Is there a registration fee?",
                  answer:
                      hackathon.fee ||
                      "Please check the registration information for the applicable participation fee.",
              },
              {
                  question:
                      "How will projects be judged?",
                  answer:
                      "Projects are evaluated according to the judging criteria mentioned on this page.",
              },
              {
                  question:
                      "Can I find teammates through CONEXA?",
                  answer:
                      "Yes. Use the Find Teammates for this Hackathon option to connect with students having relevant skills.",
              },
          ];

    const requirements = Array.isArray(hackathon.requirements)
        ? hackathon.requirements
        : [
              "Build a solution according to the hackathon theme.",
              "Use the required technologies or technologies permitted by the organizers.",
              "Submit your project before the final deadline.",
              "Follow all event rules and judging guidelines.",
          ];

    const rules = Array.isArray(hackathon.rules)
        ? hackathon.rules
        : [
              "All submitted work should be created according to the hackathon guidelines.",
              "Participants must follow the organizer's code of conduct.",
              "Projects must be submitted before the official deadline.",
              "Teams should provide accurate participant and project information.",
              "The organizer's decision regarding judging and results will be final.",
          ];

    const judgingCriteria =
        Array.isArray(hackathon.judgingCriteria) &&
        hackathon.judgingCriteria.length > 0
            ? hackathon.judgingCriteria
            : [
                  {
                      name: "Innovation",
                      weight: "25%",
                  },
                  {
                      name: "Technical Implementation",
                      weight: "25%",
                  },
                  {
                      name: "Impact & Usefulness",
                      weight: "25%",
                  },
                  {
                      name: "Presentation & UX",
                      weight: "25%",
                  },
              ];

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            {/* =====================================================
                HERO / HACKATHON BANNER
            ====================================================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-indigo-600">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
                <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        onClick={() => navigate("/hackathons")}
                        className="mb-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Hackathons
                    </button>

                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        {/* Hero Content */}
                        <div>
                            <div className="mb-5 flex flex-wrap gap-2">
                                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                                    {hackathon.category ||
                                        "Technology"}
                                </span>

                                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                                    {hackathon.mode || "Online"}
                                </span>

                                <span className="rounded-full bg-teal-400/20 px-3 py-1.5 text-xs font-semibold text-teal-200">
                                    {hackathon.difficulty ||
                                        "Beginner"}
                                </span>
                            </div>

                            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                {hackathon.title}
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
                                {hackathon.description ||
                                    "Join this exciting hackathon and build an innovative solution with talented participants."}
                            </p>

                            {/* Organizer */}
                            <div className="mt-5 flex items-center gap-3 text-sm text-indigo-200">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                                    <Building2 className="h-4 w-4 text-teal-300" />
                                </div>

                                <div>
                                    <p className="text-xs text-indigo-300">
                                        Organized by
                                    </p>

                                    <p className="font-semibold text-white">
                                        {hackathon.organizer ||
                                            "Tech Innovators"}
                                    </p>
                                </div>
                            </div>

                            {/* Hero Buttons */}
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-xl"
                                >
                                    <UserPlus className="h-5 w-5" />
                                    Register Now
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleFindTeammates
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                                >
                                    <UserRoundSearch className="h-5 w-5" />
                                    Find Teammates
                                </button>
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-1 shadow-2xl backdrop-blur-sm">
                            <div className="overflow-hidden rounded-[1.4rem]">
                                <img
                                    src={
                                        hackathon.image ||
                                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
                                    }
                                    alt={hackathon.title}
                                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105 lg:h-96"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* QUICK STATS */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {/* Prize */}
                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                            <Trophy className="h-5 w-5 text-indigo-600" />
                        </div>

                        <p className="text-xs font-medium text-slate-500">
                            Prize Pool
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
                            {hackathon.prize ||
                                "To be announced"}
                        </p>
                    </div>

                    {/* Participants */}
                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                            <Users className="h-5 w-5 text-teal-600" />
                        </div>

                        <p className="text-xs font-medium text-slate-500">
                            Participants
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
                            {hackathon.participants || 0}/
                            {hackathon.maxParticipants || "∞"}
                        </p>
                    </div>

                    {/* Duration */}
                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                            <Clock3 className="h-5 w-5 text-indigo-600" />
                        </div>

                        <p className="text-xs font-medium text-slate-500">
                            Duration
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
                            {hackathon.duration ||
                                "Multiple Days"}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                            <MapPin className="h-5 w-5 text-teal-600" />
                        </div>

                        <p className="text-xs font-medium text-slate-500">
                            Location
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
                            {hackathon.location ||
                                hackathon.mode ||
                                "Online"}
                        </p>
                    </div>
                </div>

                {/* CONTENT + SIDEBAR */}
                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    {/* LEFT CONTENT */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* OVERVIEW */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <Sparkles className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Overview
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        About this hackathon
                                    </p>
                                </div>
                            </div>

                            <p className="leading-7 text-slate-600">
                                {hackathon.overview ||
                                    hackathon.description ||
                                    "Learn, build and innovate with other talented participants."}
                            </p>
                        </section>

                        {/* IMPORTANT DATES */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <CalendarDays className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Important Dates
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Mark these dates on your calendar
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-indigo-50">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Start Date
                                    </p>

                                    <p className="mt-2 font-semibold text-[#1E1B4B]">
                                        {hackathon.startDate ||
                                            "To be announced"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-teal-50">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        End Date
                                    </p>

                                    <p className="mt-2 font-semibold text-[#1E1B4B]">
                                        {hackathon.endDate ||
                                            "To be announced"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-indigo-50">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Registration Deadline
                                    </p>

                                    <p className="mt-2 font-semibold text-[#1E1B4B]">
                                        {hackathon.deadline ||
                                            "To be announced"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-teal-50">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Duration
                                    </p>

                                    <p className="mt-2 font-semibold text-[#1E1B4B]">
                                        {hackathon.duration ||
                                            "Multiple Days"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ELIGIBILITY */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                    <Users className="h-5 w-5 text-teal-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Eligibility & Team
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Who can participate?
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-slate-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Eligibility
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {hackathon.eligibility ||
                                            "Students, developers and technology enthusiasts can participate."}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Team Size
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-[#1E1B4B]">
                                        {hackathon.teamSize ||
                                            "1 - 4 members"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* TECHNOLOGIES */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <Code2 className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Technologies & Skills
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Technologies useful for this event
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {technologies.map(
                                    (technology, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-100"
                                        >
                                            <Code2 className="h-4 w-4" />
                                            {technology}
                                        </span>
                                    )
                                )}
                            </div>
                        </section>

                        {/* REQUIREMENTS */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Requirements
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Things participants should know
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {requirements.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-teal-50"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />

                                            <p className="text-sm leading-6 text-slate-600">
                                                {item}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* RULES */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                                    <ShieldCheck className="h-5 w-5 text-red-500" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Rules & Regulations
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Please follow the event rules
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {rules.map((rule, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3"
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1E1B4B] text-xs font-bold text-white">
                                            {index + 1}
                                        </span>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {rule}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* JUDGING CRITERIA */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <Target className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Judging Criteria
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        How projects are evaluated
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {judgingCriteria.map(
                                    (criteria, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-indigo-50 hover:shadow-md"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="text-sm font-bold text-[#1E1B4B]">
                                                    {criteria.name}
                                                </p>

                                                <Star className="h-4 w-4 text-amber-500" />
                                            </div>

                                            <p className="mt-2 text-sm text-slate-500">
                                                {criteria.weight}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* TIMELINE */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-7 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                    <Timer className="h-5 w-5 text-teal-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Hackathon Timeline
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Important stages of the event
                                    </p>
                                </div>
                            </div>

                            <div className="relative space-y-6">
                                <div className="absolute left-[15px] top-3 hidden h-[calc(100%-25px)] w-px bg-indigo-100 sm:block" />

                                {timeline.map(
                                    (event, index) => (
                                        <div
                                            key={index}
                                            className="relative flex gap-4"
                                        >
                                            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1E1B4B] text-xs font-bold text-white ring-4 ring-indigo-50">
                                                {index + 1}
                                            </div>

                                            <div className="flex-1 rounded-2xl bg-slate-50 p-4 transition hover:bg-indigo-50">
                                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                                    <h3 className="font-bold text-[#1E1B4B]">
                                                        {event.title}
                                                    </h3>

                                                    <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
                                                        <CalendarDays className="h-3.5 w-3.5" />
                                                        {event.date}
                                                    </span>
                                                </div>

                                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                                    {
                                                        event.description
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* SPONSORS */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <Building2 className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Sponsors & Partners
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Organizations supporting this event
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {sponsors.map(
                                    (sponsor, index) => (
                                        <div
                                            key={index}
                                            className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                                        >
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition group-hover:bg-indigo-50">
                                                <Building2 className="h-6 w-6 text-indigo-600" />
                                            </div>

                                            <h3 className="mt-4 font-bold text-[#1E1B4B]">
                                                {sponsor.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {sponsor.type}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* FIND TEAMMATES */}
                        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-indigo-600 p-7 shadow-xl">
                            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-400/10 blur-2xl" />

                            <div className="relative">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div className="max-w-2xl">
                                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-teal-200">
                                            <UserRoundSearch className="h-4 w-4" />
                                            CONEXA Team Finder
                                        </div>

                                        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                                            Find Teammates for this Hackathon
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-indigo-100">
                                            Don't have a team yet? Connect
                                            with students who have the
                                            skills you need and build your
                                            ideal hackathon team on CONEXA.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            handleFindTeammates
                                        }
                                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-teal-600 hover:shadow-lg"
                                    >
                                        <UserRoundSearch className="h-5 w-5" />
                                        Find Teammates
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* BUILD TEAM */}
                        <section className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100">
                                        <UsersRound className="h-6 w-6 text-teal-700" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-[#1E1B4B]">
                                            Build Your Team on CONEXA
                                        </h2>

                                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                                            Create your team, invite teammates
                                            and collaborate with students who
                                            share your interests and technical
                                            skills.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleBuildTeam}
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                                >
                                    <UsersRound className="h-4 w-4" />
                                    Build Team
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </section>

                        {/* FAQ */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <HelpCircle className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1E1B4B]">
                                        Frequently Asked Questions
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        Everything you may want to know
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <details
                                        key={index}
                                        className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#1E1B4B]">
                                            <span>
                                                {faq.question}
                                            </span>

                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm transition group-open:rotate-45">
                                                +
                                            </span>
                                        </summary>

                                        <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-6 text-slate-600">
                                            {faq.answer}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-6">
                        {/* EVENT INFORMATION */}
                        <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-[#1E1B4B]">
                                Event Information
                            </h2>

                            <div className="mt-5 space-y-5">
                                <div className="flex items-start gap-3">
                                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Start Date
                                        </p>

                                        <p className="text-sm font-semibold text-slate-700">
                                            {hackathon.startDate ||
                                                "To be announced"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            End Date
                                        </p>

                                        <p className="text-sm font-semibold text-slate-700">
                                            {hackathon.endDate ||
                                                "To be announced"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Target className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Registration Deadline
                                        </p>

                                        <p className="text-sm font-semibold text-slate-700">
                                            {hackathon.deadline ||
                                                "To be announced"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Team Size
                                        </p>

                                        <p className="text-sm font-semibold text-slate-700">
                                            {hackathon.teamSize ||
                                                "1 - 4 members"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Location
                                        </p>

                                        <p className="text-sm font-semibold text-slate-700">
                                            {hackathon.location ||
                                                hackathon.mode ||
                                                "Online"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="my-6 h-px bg-slate-100" />

                            {/* PRIZE */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-5 text-white">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-teal-300" />

                                    <p className="text-xs text-indigo-200">
                                        Prize Pool
                                    </p>
                                </div>

                                <p className="mt-1 text-2xl font-extrabold">
                                    {hackathon.prize ||
                                        "To be announced"}
                                </p>

                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-sm font-bold transition hover:bg-teal-600"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Register Now
                                </button>
                            </div>
                        </div>

                        {/* TEAM FINDER */}
                        <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                                <UserRoundSearch className="h-5 w-5 text-indigo-600" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-[#1E1B4B]">
                                Need a Team?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Find students with matching skills and build
                                your team directly through CONEXA.
                            </p>

                            <button
                                type="button"
                                onClick={handleFindTeammates}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
                            >
                                <UserRoundSearch className="h-4 w-4" />
                                Find Teammates
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* QUICK REGISTER */}
                        <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
                                    <Rocket className="h-5 w-5 text-teal-700" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#1E1B4B]">
                                        Ready to Participate?
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        Secure your spot today
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleRegister}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                            >
                                Register Now
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </aside>
                </div>

                {/* BOTTOM CTA */}
                <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-indigo-600 p-8 shadow-xl sm:p-10">
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-teal-200">
                                <Sparkles className="h-4 w-4" />
                                CONEXA Hackathon Experience
                            </div>

                            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                                Turn your idea into something amazing.
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-indigo-100">
                                Register for the hackathon, build your team,
                                connect with talented students and create
                                something meaningful together.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleRegister}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-teal-600"
                            >
                                <UserPlus className="h-5 w-5" />
                                Register Now
                            </button>

                            <button
                                type="button"
                                onClick={handleBuildTeam}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                            >
                                <UsersRound className="h-5 w-5" />
                                Build Team
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
