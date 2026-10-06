
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { hackathons } from "../../data/hackathonData";

const CreateHackathon = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    mode: "Online",
    difficulty: "Beginner",
    prize: "",
    deadline: "",
    maxParticipants: "",
    image: "",
  });

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // CREATE HACKATHON
  // =========================================================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new hackathon object
    const newHackathon = {
      id: Date.now(),

      title: formData.title.trim(),

      description: formData.description.trim(),

      category: formData.category,

      mode: formData.mode,

      difficulty: formData.difficulty,

      prize: formData.prize.trim(),

      deadline: formData.deadline,

      maxParticipants: Number(formData.maxParticipants),

      participants: 0,

      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",

      organizer: "Tech Innovators",

      status: "Active",

      featured: false,

      skills: [],

      createdAt: new Date().toISOString(),
    };

    // =========================================================
    // 1. SAVE TO MY HACKATHONS
    // =========================================================

    const existingMyHackathons =
      JSON.parse(localStorage.getItem("myHackathons")) || [];

    const updatedMyHackathons = [
      ...existingMyHackathons,
      newHackathon,
    ];

    localStorage.setItem(
      "myHackathons",
      JSON.stringify(updatedMyHackathons)
    );

    // =========================================================
    // 2. SAVE TO ALL HACKATHONS
    // =========================================================

    const existingHackathons =
      JSON.parse(localStorage.getItem("hackathons")) || [];

    const updatedHackathons = [
      ...existingHackathons,
      newHackathon,
    ];

    localStorage.setItem(
      "hackathons",
      JSON.stringify(updatedHackathons)
    );

    // =========================================================
    // 3. ADD TO CURRENT HACKATHON DATA
    //
    // Your Hackathons.jsx currently imports:
    //
    // import { hackathons } from "../../data/hackathonData";
    //
    // So we add the newly created hackathon to that same
    // array. This makes it appear immediately when navigating
    // to the Hackathons page.
    // =========================================================

    const alreadyExists = hackathons.some(
      (hackathon) => hackathon.id === newHackathon.id
    );

    if (!alreadyExists) {
      hackathons.push(newHackathon);
    }

    // =========================================================
    // 4. SUCCESS MESSAGE
    // =========================================================

    alert("Hackathon created successfully! 🎉");

    // =========================================================
    // 5. GO TO HACKATHON DASHBOARD
    // =========================================================

    navigate("/hackathons");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <div
            onClick={() => navigate("/hackathons")}
            className="group flex cursor-pointer items-center gap-3"
          >

            <div className="relative">

              <div className="absolute inset-0 rounded-xl bg-[#14B8A6]/20 blur-lg transition-all duration-300 group-hover:bg-[#14B8A6]/40" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E1B4B] text-lg shadow-md transition-all duration-300 group-hover:scale-105">
                🚀
              </div>

            </div>

            <div>

              <h1 className="text-lg font-black tracking-tight text-[#1E1B4B]">
                CONEXA
              </h1>

              <p className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-[#14B8A6] sm:block">
                Hackathon Platform
              </p>

            </div>

          </div>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/my-hackathons")}
            className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1E1B4B] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#14B8A6] hover:bg-[#F0FDFA] hover:text-[#0F766E] hover:shadow-md"
          >

            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            My Hackathons

          </button>

        </div>

      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* =========================================================
            PAGE INTRO
        ========================================================= */}
        <section className="mb-10">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/20 bg-[#F0FDFA] px-4 py-2">

            <span className="h-2 w-2 rounded-full bg-[#14B8A6]" />

            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              Organizer Dashboard
            </span>

          </div>

          <h1 className="text-4xl font-black tracking-tight text-[#1E1B4B] sm:text-5xl">
            Create Hackathon
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Create an exciting hackathon, bring talented developers together
            and build something amazing with Connexa.
          </p>

        </section>

        {/* =========================================================
            FORM
        ========================================================= */}
        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* =====================================================
                LEFT SIDE
            ===================================================== */}
            <div className="space-y-6 lg:col-span-2">

              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:border-[#14B8A6]/30 hover:shadow-2xl sm:p-7">

                <div className="mb-7 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-lg">
                    📝
                  </div>

                  <div>

                    <h2 className="text-lg font-black text-[#1E1B4B]">
                      Basic Information
                    </h2>

                    <p className="text-xs text-slate-400">
                      Tell participants about your hackathon
                    </p>

                  </div>

                </div>

                {/* TITLE */}
                <div className="mb-5">

                  <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                    Hackathon Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter hackathon title"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                  />

                </div>

                {/* DESCRIPTION */}
                <div className="mb-5">

                  <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your hackathon..."
                    rows="5"
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                  />

                </div>

                {/* CATEGORY + DIFFICULTY */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* CATEGORY */}
                  <div>

                    <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                      Category
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                    >

                      <option value="">
                        Select category
                      </option>

                      <option value="Web Development">
                        Web Development
                      </option>

                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>

                      <option value="Cybersecurity">
                        Cybersecurity
                      </option>

                      <option value="Mobile Development">
                        Mobile Development
                      </option>

                      <option value="Blockchain">
                        Blockchain
                      </option>

                      <option value="IoT">
                        IoT
                      </option>

                      <option value="Green Technology">
                        Green Technology
                      </option>

                      <option value="Education">
                        Education
                      </option>

                      <option value="Healthcare">
                        Healthcare
                      </option>

                    </select>

                  </div>

                  {/* DIFFICULTY */}
                  <div>

                    <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                      Difficulty
                    </label>

                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                    >

                      <option value="Beginner">
                        Beginner
                      </option>

                      <option value="Intermediate">
                        Intermediate
                      </option>

                      <option value="Advanced">
                        Advanced
                      </option>

                    </select>

                  </div>

                </div>

              </section>

              {/* =================================================
                  EVENT DETAILS
              ================================================= */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:border-[#14B8A6]/30 hover:shadow-2xl sm:p-7">

                <div className="mb-7 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FDFA] text-lg">
                    ⚙️
                  </div>

                  <div>

                    <h2 className="text-lg font-black text-[#1E1B4B]">
                      Event Details
                    </h2>

                    <p className="text-xs text-slate-400">
                      Configure your hackathon
                    </p>

                  </div>

                </div>

                {/* MODE */}
                <div className="mb-5">

                  <label className="mb-3 block text-sm font-bold text-[#1E1B4B]">
                    Event Mode
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    {/* ONLINE */}
                    <label
                      className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-300 ${
                        formData.mode === "Online"
                          ? "border-[#14B8A6] bg-[#F0FDFA] shadow-md shadow-[#14B8A6]/10"
                          : "border-slate-200 bg-slate-50 hover:border-[#14B8A6]/40 hover:bg-[#F0FDFA]"
                      }`}
                    >

                      <input
                        type="radio"
                        name="mode"
                        value="Online"
                        checked={formData.mode === "Online"}
                        onChange={handleChange}
                        className="accent-[#14B8A6]"
                      />

                      <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                        🌐
                      </span>

                      <div>

                        <p className="text-sm font-bold text-[#1E1B4B]">
                          Online
                        </p>

                        <p className="text-[10px] text-slate-400">
                          Virtual event
                        </p>

                      </div>

                    </label>

                    {/* OFFLINE */}
                    <label
                      className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-300 ${
                        formData.mode === "Offline"
                          ? "border-[#14B8A6] bg-[#F0FDFA] shadow-md shadow-[#14B8A6]/10"
                          : "border-slate-200 bg-slate-50 hover:border-[#14B8A6]/40 hover:bg-[#F0FDFA]"
                      }`}
                    >

                      <input
                        type="radio"
                        name="mode"
                        value="Offline"
                        checked={formData.mode === "Offline"}
                        onChange={handleChange}
                        className="accent-[#14B8A6]"
                      />

                      <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                        📍
                      </span>

                      <div>

                        <p className="text-sm font-bold text-[#1E1B4B]">
                          Offline
                        </p>

                        <p className="text-[10px] text-slate-400">
                          Physical event
                        </p>

                      </div>

                    </label>

                  </div>

                </div>

                {/* DEADLINE + PARTICIPANTS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* DEADLINE */}
                  <div>

                    <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                      Registration Deadline
                    </label>

                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                    />

                  </div>

                  {/* PARTICIPANTS */}
                  <div>

                    <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
                      Maximum Participants
                    </label>

                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                      min="1"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                    />

                  </div>

                </div>

              </section>

            </div>

            {/* =====================================================
                RIGHT SIDE
            ===================================================== */}
            <div className="space-y-6">

              {/* =================================================
                  PRIZE
              ================================================= */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-2xl">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-lg">
                    🏆
                  </div>

                  <div>

                    <h2 className="text-base font-black text-[#1E1B4B]">
                      Prize Pool
                    </h2>

                    <p className="text-[10px] text-slate-400">
                      Reward your winners
                    </p>

                  </div>

                </div>

                <input
                  type="text"
                  name="prize"
                  value={formData.prize}
                  onChange={handleChange}
                  placeholder="₹ 50,000"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                />

                <div className="mt-3 flex gap-2">

                  <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#14B8A6]/20 bg-[#F0FDFA] px-2.5 py-2">

                    <span className="text-sm">
                      🥇
                    </span>

                    <span className="text-[9px] font-bold text-[#0F766E]">
                      1st Prize
                    </span>

                  </div>

                  <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2">

                    <span className="text-sm">
                      🎁
                    </span>

                    <span className="text-[9px] font-bold text-slate-600">
                      Exciting Rewards
                    </span>

                  </div>

                </div>

              </section>

              {/* =================================================
                  COVER IMAGE
              ================================================= */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-2xl">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-lg">
                    🖼️
                  </div>

                  <div>

                    <h2 className="text-base font-black text-[#1E1B4B]">
                      Cover Image
                    </h2>

                    <p className="text-[10px] text-slate-400">
                      Add a visual identity
                    </p>

                  </div>

                </div>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10"
                />

                {/* IMAGE PREVIEW */}
                {formData.image && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">

                    <img
                      src={formData.image}
                      alt="Hackathon preview"
                      className="h-32 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                  </div>
                )}

              </section>

              {/* =================================================
                  QUICK PREVIEW
              ================================================= */}
              <section className="rounded-3xl border border-[#14B8A6]/20 bg-gradient-to-br from-[#EEF2FF] via-white to-[#F0FDFA] p-5 shadow-lg shadow-slate-200/40">

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#14B8A6]">
                      Quick Preview
                    </p>

                    <h3 className="mt-1 text-base font-black text-[#1E1B4B]">
                      {formData.title || "Your Event"}
                    </h3>

                  </div>

                  <span className="rounded-full bg-white px-2.5 py-1 text-[8px] font-bold text-[#0F766E] shadow-sm">
                    LIVE
                  </span>

                </div>

                <div className="space-y-2">

                  {/* MODE */}
                  <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">

                    <span className="text-[9px] font-semibold text-slate-400">
                      Mode
                    </span>

                    <span className="text-[9px] font-bold text-[#0F766E]">
                      {formData.mode}
                    </span>

                  </div>

                  {/* CATEGORY */}
                  <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">

                    <span className="text-[9px] font-semibold text-slate-400">
                      Category
                    </span>

                    <span className="max-w-[150px] truncate text-[9px] font-bold text-[#1E1B4B]">
                      {formData.category || "—"}
                    </span>

                  </div>

                  {/* DIFFICULTY */}
                  <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">

                    <span className="text-[9px] font-semibold text-slate-400">
                      Difficulty
                    </span>

                    <span className="text-[9px] font-bold text-[#1E1B4B]">
                      {formData.difficulty}
                    </span>

                  </div>

                  {/* PARTICIPANTS */}
                  <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">

                    <span className="text-[9px] font-semibold text-slate-400">
                      Participants
                    </span>

                    <span className="text-[9px] font-bold text-[#14B8A6]">
                      {formData.maxParticipants || "—"}
                    </span>

                  </div>

                </div>

              </section>

            </div>

          </div>

          {/* =========================================================
              BOTTOM ACTION BOX
          ========================================================= */}
          <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDFA] text-lg">
                ✨
              </div>

              <div>

                <p className="text-sm font-black text-[#1E1B4B]">
                  Ready to launch?
                </p>

                <p className="text-[10px] text-slate-400">
                  Review your details before creating the event.
                </p>

              </div>

            </div>

            <div className="flex gap-2">

              {/* CANCEL */}
              <button
                type="button"
                onClick={() => navigate("/my-hackathons")}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-[#1E1B4B] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md"
              >
                Cancel
              </button>

              {/* CREATE */}
              <button
                type="submit"
                className="group relative overflow-hidden rounded-xl bg-[#1E1B4B] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#312E81] hover:shadow-xl"
              >

                <span className="absolute inset-0 -translate-x-full bg-[#14B8A6]/20 transition-transform duration-500 group-hover:translate-x-full" />

                <span className="relative flex items-center gap-2">
                  🚀
                  Create Hackathon
                </span>

              </button>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
};

export default CreateHackathon;

