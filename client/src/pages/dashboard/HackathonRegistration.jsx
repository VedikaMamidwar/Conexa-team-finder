
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHackathonById } from "../../services/hackathonService";

const HackathonRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const hackathon = getHackathonById(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    teamName: "",
    teamSize: "1",
    skills: "",
  });

  const [registered, setRegistered] = useState(false);

  /*
   * ============================================================
   * GET REGISTERED HACKATHONS
   * ============================================================
   */
  const getRegisteredHackathons = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("registeredHackathons") || "[]"
      );

      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      console.error("Error reading registered hackathons:", error);
      return [];
    }
  };

  /*
   * ============================================================
   * CHECK EXISTING REGISTRATION
   * ============================================================
   */
  useEffect(() => {
    if (!hackathon) return;

    const registrations = getRegisteredHackathons();

    const alreadyRegistered = registrations.some(
      (item) => String(item.id) === String(hackathon.id)
    );

    if (alreadyRegistered) {
      setRegistered(true);
    }
  }, [hackathon]);

  /*
   * ============================================================
   * HACKATHON NOT FOUND
   * ============================================================
   */
  if (!hackathon) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-indigo-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-4xl shadow-sm">
            ⚠️
          </div>

          <h2 className="mt-6 text-2xl font-black text-slate-900">
            Hackathon Not Found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The hackathon you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/hackathons")}
            className="mt-6 w-full rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
          >
            ← Back to Hackathons
          </button>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * SEATS
   * ============================================================
   */
  const seatsLeft =
    Number(hackathon.maxParticipants || 0) -
    Number(hackathon.participants || 0);

  /*
   * ============================================================
   * HANDLE INPUT
   * ============================================================
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * ============================================================
   * HANDLE REGISTRATION
   * ============================================================
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (seatsLeft <= 0) {
      return;
    }

    const existingRegistrations = getRegisteredHackathons();

    /*
     * Check duplicate registration.
     */
    const alreadyRegistered = existingRegistrations.some(
      (item) => String(item.id) === String(hackathon.id)
    );

    if (alreadyRegistered) {
      setRegistered(true);
      return;
    }

    /*
     * Create complete registration object.
     */
    const registrationData = {
      ...hackathon,

      registrationDetails: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        college: formData.college.trim(),
        teamName: formData.teamName.trim(),
        teamSize: formData.teamSize,
        skills: formData.skills.trim(),
      },

      registeredAt: new Date().toISOString(),

      registrationStatus: "Registered",

      /*
       * Keep participant count updated
       * for the registered copy.
       */
      participants: Number(hackathon.participants || 0) + 1,
    };

    /*
     * Save registration.
     */
    const updatedRegistrations = [
      ...existingRegistrations,
      registrationData,
    ];

    localStorage.setItem(
      "registeredHackathons",
      JSON.stringify(updatedRegistrations)
    );

    /*
     * Also update created hackathons if
     * this hackathon exists there.
     */
    try {
      const storedMyHackathons = JSON.parse(
        localStorage.getItem("myHackathons") || "[]"
      );

      if (Array.isArray(storedMyHackathons)) {
        const updatedMyHackathons = storedMyHackathons.map((item) => {
          if (String(item.id) === String(hackathon.id)) {
            return {
              ...item,
              participants: Number(item.participants || 0) + 1,
            };
          }

          return item;
        });

        localStorage.setItem(
          "myHackathons",
          JSON.stringify(updatedMyHackathons)
        );
      }
    } catch (error) {
      console.error("Error updating my hackathons:", error);
    }

    /*
     * Show success screen.
     */
    setRegistered(true);
  };

  /*
   * ============================================================
   * SUCCESS SCREEN
   * ============================================================
   */
  if (registered) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
          <div className="relative overflow-hidden bg-[#1E1B4B] px-6 py-12 text-center text-white">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#312E81]/60 blur-2xl" />

            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#14B8A6]/20 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-emerald-500 shadow-xl transition-all duration-500 hover:scale-110 hover:rotate-6">
                ✓
              </div>

              <h1 className="mt-6 text-3xl font-black">
                Registration Successful!
              </h1>

              <p className="mt-2 text-sm text-indigo-100">
                You are officially registered for this hackathon.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                🏆
              </div>

              <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">
                Hackathon
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900">
                {hackathon.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Organized by{" "}
                <span className="font-black text-[#312E81]">
                  {hackathon.organizer}
                </span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="text-sm">👤</span>

                <div>
                  <p className="text-[9px] text-slate-400">
                    Participant
                  </p>

                  <p className="text-[10px] font-black text-[#312E81]">
                    {formData.name || "Registered Participant"}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-2 rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="text-sm">👥</span>

                <div>
                  <p className="text-[9px] text-slate-400">
                    Team Size
                  </p>

                  <p className="text-[10px] font-black text-[#14B8A6]">
                    {formData.teamSize} Member
                    {Number(formData.teamSize) > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-center">
              <p className="text-xs font-black text-emerald-700">
                ✓ Added to My Hackathons
              </p>

              <p className="mt-1 text-[10px] text-emerald-600">
                You can now find this hackathon in your Registered section.
              </p>
            </div>

            <button
              onClick={() => navigate("/hackathons")}
              className="mt-6 w-full rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#312E81] hover:shadow-xl"
            >
              🚀 Explore More Hackathons
            </button>

            <button
              onClick={() => navigate(`/hackathons/${id}`)}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-black text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-[#312E81]"
            >
              View Hackathon Details →
            </button>

            <button
              onClick={() => navigate("/my-hackathons")}
              className="mt-3 w-full rounded-xl border border-teal-100 bg-teal-50 px-5 py-3 text-sm font-black text-[#0f766e] transition-all duration-300 hover:-translate-y-1 hover:bg-teal-100 hover:shadow-md"
            >
              📋 Go to My Hackathons
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * REGISTRATION PAGE
   * ============================================================
   */
  return (
    <div className="min-h-screen overflow-hidden bg-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(`/hackathons/${id}`)}
          className="group mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50 hover:text-[#312E81] hover:shadow-lg"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          Back to Details
        </button>

        <section className="group relative mb-8 overflow-hidden rounded-[2rem] bg-[#1E1B4B] p-6 shadow-2xl shadow-indigo-100 sm:p-9">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#312E81]/70 blur-2xl transition-transform duration-1000 group-hover:scale-125" />

          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#14B8A6]/20 blur-2xl transition-transform duration-1000 group-hover:scale-110" />

          <div className="absolute right-20 top-10 h-3 w-3 animate-ping rounded-full bg-[#14B8A6]" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#14B8A6]" />
              {hackathon.category}
            </div>

            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              {hackathon.title}
            </h1>

            <p className="mt-3 text-sm text-indigo-100 sm:text-base">
              Organized by{" "}
              <span className="font-black text-white">
                {hackathon.organizer}
              </span>
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="group/box flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-sm transition-transform duration-300 group-hover/box:scale-110 group-hover/box:rotate-6">
                  🏆
                </span>

                <div>
                  <p className="text-[8px] font-bold text-indigo-200">
                    Prize Pool
                  </p>

                  <p className="text-[10px] font-black text-white">
                    {hackathon.prize}
                  </p>
                </div>
              </div>

              <div className="group/box flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-sm transition-transform duration-300 group-hover/box:scale-110">
                  📅
                </span>

                <div>
                  <p className="text-[8px] font-bold text-indigo-200">
                    Deadline
                  </p>

                  <p className="text-[10px] font-black text-white">
                    {hackathon.deadline}
                  </p>
                </div>
              </div>

              <div className="group/box flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-sm transition-transform duration-300 group-hover/box:scale-110">
                  🌐
                </span>

                <div>
                  <p className="text-[8px] font-bold text-indigo-200">
                    Mode
                  </p>

                  <p className="text-[10px] font-black text-white">
                    {hackathon.mode}
                  </p>
                </div>
              </div>

              <div className="group/box flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-sm transition-transform duration-300 group-hover/box:scale-110">
                  👥
                </span>

                <div>
                  <p className="text-[8px] font-bold text-indigo-200">
                    Seats Left
                  </p>

                  <p className="text-[10px] font-black text-white">
                    {seatsLeft > 0 ? seatsLeft : "Full"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              🏆
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-400">
                Prize Pool
              </p>

              <p className="truncate text-xs font-black text-slate-900">
                {hackathon.prize}
              </p>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg transition-transform duration-300 group-hover:scale-110">
              📅
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-400">
                Deadline
              </p>

              <p className="truncate text-xs font-black text-slate-900">
                {hackathon.deadline}
              </p>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg transition-transform duration-300 group-hover:scale-110">
              👥
            </div>

            <div>
              <p className="text-[9px] font-bold text-slate-400">
                Seats Available
              </p>

              <p
                className={`text-xs font-black ${
                  seatsLeft > 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {seatsLeft > 0 ? seatsLeft : "Full"}
              </p>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-lg transition-transform duration-300 group-hover:scale-110">
              📍
            </div>

            <div>
              <p className="text-[9px] font-bold text-slate-400">
                Mode
              </p>

              <p className="text-xs font-black text-slate-900">
                {hackathon.mode}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-7">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl shadow-sm">
                  📝
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Registration Details
                  </h2>

                  <p className="text-xs text-slate-400">
                    Enter your details to participate
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-black text-slate-700">
                    Full Name *
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-indigo-200"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-black text-slate-700">
                      Email Address *
                    </label>

                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-indigo-200"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black text-slate-700">
                      Phone Number *
                    </label>

                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-indigo-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-slate-700">
                    College / Organization *
                  </label>

                  <input
                    name="college"
                    type="text"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college or organization"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-indigo-200"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-black text-slate-700">
                      Team Name
                    </label>

                    <input
                      name="teamName"
                      type="text"
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder="Enter team name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-indigo-200"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black text-slate-700">
                      Team Size
                    </label>

                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-indigo-200"
                    >
                      <option value="1">1 Member</option>
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black text-slate-700">
                    Skills
                  </label>

                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Example: React, JavaScript, MongoDB, Java..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-indigo-200"
                  />
                </div>

                <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-50 p-3">
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-sm">🔒</span>

                    <span className="text-[9px] font-bold text-slate-500">
                      Secure Registration
                    </span>
                  </div>

                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-sm">⚡</span>

                    <span className="text-[9px] font-bold text-slate-500">
                      Quick Process
                    </span>
                  </div>

                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-sm">🎯</span>

                    <span className="text-[9px] font-bold text-slate-500">
                      Build & Compete
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate(`/hackathons/${id}`)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-xs font-black text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={seatsLeft <= 0}
                    className="group relative w-full overflow-hidden rounded-xl bg-[#1E1B4B] px-6 py-3 text-xs font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-[#312E81] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                    <span className="relative">
                      {seatsLeft > 0
                        ? "Complete Registration →"
                        : "Registration Full"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/50">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                  📋
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Hackathon Summary
                  </h3>

                  <p className="text-[9px] text-slate-400">
                    Event information
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="group flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-all duration-300 hover:bg-indigo-50 hover:shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏷️</span>

                    <span className="text-[10px] font-bold text-slate-400">
                      Category
                    </span>
                  </div>

                  <span className="text-[10px] font-black text-[#312E81]">
                    {hackathon.category}
                  </span>
                </div>

                <div className="group flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-all duration-300 hover:bg-indigo-50 hover:shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🌐</span>

                    <span className="text-[10px] font-bold text-slate-400">
                      Mode
                    </span>
                  </div>

                  <span className="text-[10px] font-black text-[#14B8A6]">
                    {hackathon.mode}
                  </span>
                </div>

                <div className="group flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-all duration-300 hover:bg-amber-50 hover:shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏆</span>

                    <span className="text-[10px] font-bold text-slate-400">
                      Prize
                    </span>
                  </div>

                  <span className="text-[10px] font-black text-amber-600">
                    {hackathon.prize}
                  </span>
                </div>

                <div className="group flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition-all duration-300 hover:bg-emerald-50 hover:shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🎯</span>

                    <span className="text-[10px] font-bold text-slate-400">
                      Difficulty
                    </span>
                  </div>

                  <span className="text-[10px] font-black text-emerald-600">
                    {hackathon.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] bg-[#1E1B4B] p-6 text-white shadow-xl">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#312E81] blur-xl transition-transform duration-700 group-hover:scale-150" />

              <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#14B8A6]/20 blur-xl" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  💡
                </div>

                <h3 className="mt-5 text-lg font-black">
                  Registration Tips
                </h3>

                <p className="mt-1 text-[10px] text-indigo-200">
                  Make sure everything is correct
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-white/20">
                    <span className="text-[#14B8A6]">✓</span>

                    <span className="text-[10px] font-bold text-indigo-100">
                      Use a valid email address
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-white/20">
                    <span className="text-[#14B8A6]">✓</span>

                    <span className="text-[10px] font-bold text-indigo-100">
                      Enter your correct phone number
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-white/20">
                    <span className="text-[#14B8A6]">✓</span>

                    <span className="text-[10px] font-bold text-indigo-100">
                      Mention your technical skills
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-white/20">
                    <span className="text-[#14B8A6]">✓</span>

                    <span className="text-[10px] font-bold text-indigo-100">
                      Select the correct team size
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#14B8A6]">
                    Availability
                  </p>

                  <h3 className="mt-1 text-lg font-black text-slate-900">
                    {seatsLeft > 0
                      ? `${seatsLeft} Seats Left`
                      : "Registration Full"}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  👥
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-teal-100">
                <div
                  className="h-full rounded-full bg-[#14B8A6] transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      (Number(hackathon.participants || 0) /
                        Number(hackathon.maxParticipants || 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-[9px] font-bold text-[#14B8A6]">
                {hackathon.participants} of {hackathon.maxParticipants}{" "}
                participants registered
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative mt-16 overflow-hidden bg-[#1E1B4B] px-6 py-8 text-center text-white">
        <div className="absolute -left-10 -top-20 h-48 w-48 rounded-full bg-[#312E81] blur-2xl" />

        <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-[#14B8A6]/10 blur-2xl" />

        <div className="relative">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl transition-all duration-500 hover:rotate-12 hover:scale-110">
              🚀
            </div>

            <span className="text-xl font-black">
              Connexa
            </span>
          </div>

          <p className="mt-3 text-xs font-bold tracking-wide text-indigo-200">
            Connect • Create • Collaborate • Compete
          </p>

          <p className="mt-3 text-[10px] text-slate-400">
            Join amazing hackathons and build something extraordinary.
          </p>

          <div className="mx-auto mt-5 h-px max-w-xs bg-white/10" />

          <p className="mt-4 text-[9px] text-slate-400">
            © 2026 Connexa • Hackathon Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HackathonRegistration;

