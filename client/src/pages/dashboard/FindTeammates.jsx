import { useMemo, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import TeammateCard from "../../components/findTeammates/TeammateCard";
import TeammateFilters from "../../components/findTeammates/TeammateFilters";
import TeammateProfileModal from "../../components/findTeammates/TeammateProfileModal";
import { sendTeammateRequest } from "../../services/invitationService";

const STUDENTS = [
  { id: "1", name: "Aarav Sharma", role: "Frontend Developer", college: "YCCE, Nagpur", branch: "Computer Science", year: "3rd Year", location: "Nagpur", availability: "Available", compatibility: 96, skills: ["React", "JavaScript", "Tailwind", "HTML"], projects: 6, hackathons: 3, bio: "Builds clean, fast interfaces and enjoys turning rough Figma files into real products." },
  { id: "2", name: "Priya Deshmukh", role: "UI/UX Designer", college: "VNIT, Nagpur", branch: "Design", year: "2nd Year", location: "Nagpur", availability: "Available", compatibility: 92, skills: ["UI/UX", "React"], projects: 5, hackathons: 2, bio: "Designer-developer hybrid who cares as much about user flows as pixel spacing." },
  { id: "3", name: "Rohan Patil", role: "Backend Developer", college: "COEP, Pune", branch: "Information Technology", year: "3rd Year", location: "Pune", availability: "Busy", compatibility: 89, skills: ["Node.js", "MongoDB", "Express"], projects: 8, hackathons: 4, bio: "Has shipped three hackathon-winning APIs and likes designing clean schemas." },
  { id: "4", name: "Sneha Kulkarni", role: "AI/ML Engineer", college: "MIT-WPU, Pune", branch: "AI & Data Science", year: "4th Year", location: "Pune", availability: "Available", compatibility: 87, skills: ["Python", "AI", "ML"], projects: 7, hackathons: 5, bio: "Spends weekends fine-tuning models and writing about them on a small blog." },
  { id: "5", name: "Vedant Joshi", role: "Full Stack Developer", college: "VJTI, Mumbai", branch: "Computer Science", year: "3rd Year", location: "Mumbai", availability: "Busy", compatibility: 85, skills: ["React", "Node.js", "MongoDB"], projects: 9, hackathons: 3, bio: "Comfortable across the whole stack, from database design to deploys." },
  { id: "6", name: "Ananya Mehta", role: "Frontend Developer", college: "Ramdeobaba University", branch: "Computer Science", year: "2nd Year", location: "Nagpur", availability: "Available", compatibility: 84, skills: ["React", "JavaScript", "UI/UX"], projects: 4, hackathons: 1, bio: "New to hackathons but ships fast and picks up new tools quickly." },
  { id: "7", name: "Kunal Gupta", role: "Java Developer", college: "SPIT, Mumbai", branch: "Information Technology", year: "3rd Year", location: "Mumbai", availability: "Busy", compatibility: 81, skills: ["Java", "Express", "MongoDB"], projects: 5, hackathons: 2, bio: "Strong on backend architecture and enterprise-style Java systems." },
  { id: "8", name: "Isha Nair", role: "Flutter Developer", college: "VIT, Pune", branch: "Computer Science", year: "2nd Year", location: "Pune", availability: "Available", compatibility: 79, skills: ["Flutter", "UI/UX"], projects: 3, hackathons: 2, bio: "Mobile-first developer who has published two apps on the Play Store." },
  { id: "9", name: "Aditya Rao", role: "Python Developer", college: "VNIT, Nagpur", branch: "Computer Science", year: "4th Year", location: "Nagpur", availability: "Available", compatibility: 76, skills: ["Python", "AI", "ML"], projects: 6, hackathons: 3, bio: "Focused on applied ML projects with real datasets, not just tutorials." },
];

const DEFAULT_FILTERS = { skill: "All", availability: "All", year: "All", sort: "compatibility" };

export default function FindTeammates() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(DEFAULT_FILTERS.skill);
  const [availability, setAvailability] = useState(DEFAULT_FILTERS.availability);
  const [year, setYear] = useState(DEFAULT_FILTERS.year);
  const [sortBy, setSortBy] = useState(DEFAULT_FILTERS.sort);

  const [requestStatus, setRequestStatus] = useState({}); // { [studentId]: 'sending' | 'sent' | 'error' }
  const [activeTeammate, setActiveTeammate] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message }

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const hasFilters =
    selectedSkill !== DEFAULT_FILTERS.skill ||
    availability !== DEFAULT_FILTERS.availability ||
    year !== DEFAULT_FILTERS.year ||
    sortBy !== DEFAULT_FILTERS.sort;

  const clearFilters = () => {
    setSelectedSkill(DEFAULT_FILTERS.skill);
    setAvailability(DEFAULT_FILTERS.availability);
    setYear(DEFAULT_FILTERS.year);
    setSortBy(DEFAULT_FILTERS.sort);
  };

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const filtered = STUDENTS.filter((student) => {
      const searchableText = [student.name, student.role, student.college, ...student.skills]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query === "" || searchableText.includes(query);
      const matchesSkill = selectedSkill === "All" || student.skills.includes(selectedSkill);
      const matchesAvailability = availability === "All" || student.availability === availability;
      const matchesYear = year === "All" || student.year === year;

      return matchesSearch && matchesSkill && matchesAvailability && matchesYear;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "projects") return b.projects - a.projects;
      if (sortBy === "hackathons") return b.hackathons - a.hackathons;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.compatibility - a.compatibility;
    });
  }, [searchTerm, selectedSkill, availability, year, sortBy]);

  const handleConnect = async (teammate) => {
    const studentId = teammate.id;
    if (requestStatus[studentId] === "sending" || requestStatus[studentId] === "sent") return;

    setRequestStatus((prev) => ({ ...prev, [studentId]: "sending" }));

    try {
      await sendTeammateRequest({
        toStudentId: studentId,
        message: `Hi ${teammate.name}, I'd like to team up with you on Conexa!`,
      });
      setRequestStatus((prev) => ({ ...prev, [studentId]: "sent" }));
      setToast({ type: "success", message: `Request sent to ${teammate.name}. They'll get an email.` });
    } catch (error) {
      setRequestStatus((prev) => ({ ...prev, [studentId]: "error" }));
      setToast({ type: "error", message: error.message || "Could not send the request. Try again." });
      // Reset to idle shortly after so the button becomes clickable again
      setTimeout(() => {
        setRequestStatus((prev) => ({ ...prev, [studentId]: "idle" }));
      }, 1500);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} stablePosition />

      <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen((value) => !value)} />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            {/* Hero */}
            <section className="rounded-2xl bg-[#1E1B4B] px-6 py-8 sm:px-9 sm:py-10">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Find your perfect teammate
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                Connect with students who complement your skills and build something great
                together, matched by skills, interests, and project needs.
              </p>
              <div className="mt-6 flex gap-8">
                <div>
                  <p className="text-xl font-extrabold text-white">500+</p>
                  <p className="text-xs font-medium text-white/60">Students</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">20+</p>
                  <p className="text-xs font-medium text-white/60">Skills</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">3</p>
                  <p className="text-xs font-medium text-white/60">Cities</p>
                </div>
              </div>
            </section>

            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" style={{ height: 18, width: 18 }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, skill, college or technology…"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters + Results */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <TeammateFilters
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
                availability={availability}
                setAvailability={setAvailability}
                year={year}
                setYear={setYear}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-[#1E1B4B]">Recommended Teammates</h2>
                  <p className="text-sm font-semibold text-slate-500">
                    {filteredStudents.length} {filteredStudents.length === 1 ? "student" : "students"} found
                  </p>
                </div>

                {filteredStudents.length > 0 ? (
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredStudents.map((student) => (
                      <TeammateCard
                        key={student.id}
                        teammate={student}
                        status={requestStatus[student.id] || "idle"}
                        onConnect={handleConnect}
                        onViewProfile={setActiveTeammate}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#14B8A6]/10 text-[#0f766e]">
                      <Search className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-base font-extrabold text-[#1E1B4B]">No teammates found</h3>
                    <p className="mt-1.5 max-w-sm text-sm text-slate-500">
                      Try changing your search or filters to discover more students.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        clearFilters();
                        setSearchTerm("");
                      }}
                      className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#1E1B4B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#16143a]"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {activeTeammate && (
        <TeammateProfileModal
          teammate={activeTeammate}
          status={requestStatus[activeTeammate.id] || "idle"}
          onClose={() => setActiveTeammate(null)}
          onConnect={handleConnect}
        />
      )}

      {toast && (
        <div
          role="status"
          className={
            "fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg " +
            (toast.type === "success" ? "bg-emerald-600" : "bg-red-600")
          }
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}