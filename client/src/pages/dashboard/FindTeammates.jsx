import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Users,
  Sparkles,
  RefreshCw,
  UserRoundSearch,
  X,
  MapPin,
  GraduationCap,
  CalendarDays,
  BriefcaseBusiness,
  Trophy,
  FolderKanban,
  Clock3,
  Check,
  Send,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import TeammateCard from "../../components/findTeammates/TeammateCard";
import TeammateFilters from "../../components/findTeammates/TeammateFilters";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const fallbackTeammates = [
  {
    _id: "demo-1",
    name: "Aarav Sharma",
    role: "Full Stack Developer",
    college:
      "MIT World Peace University",
    branch: "Computer Engineering",
    year: "3rd Year",
    location:
      "Pune, Maharashtra",
    availability: "Available",
    compatibility: 96,
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
    ],
    interests: [
      "Web Development",
      "Hackathons",
      "AI",
    ],
    projects: 6,
    hackathons: 4,
    bio:
      "Passionate full-stack developer who enjoys building practical products and participating in hackathons.",
    experience:
      "Experience building full-stack web applications and participating in college hackathons.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    lookingFor: [
      "Frontend",
      "UI/UX",
      "AI",
    ],
    achievements: [
      "Hackathon finalist",
      "Built multiple full-stack projects",
      "Open source contributor",
    ],
    avatar: "",
  },

  {
    _id: "demo-2",
    name: "Ishita Patil",
    role: "UI/UX Designer",
    college:
      "Vishwakarma Institute of Technology",
    branch: "Information Technology",
    year: "3rd Year",
    location:
      "Pune, Maharashtra",
    availability: "Available",
    compatibility: 92,
    skills: [
      "UI/UX",
      "Figma",
      "React",
      "Prototyping",
    ],
    interests: [
      "Design",
      "Product",
      "Startups",
    ],
    projects: 8,
    hackathons: 3,
    bio:
      "Product-focused designer interested in creating clean interfaces and meaningful digital experiences.",
    experience:
      "Experience designing student products, dashboards and mobile-first interfaces.",
    techStack: [
      "Figma",
      "FigJam",
      "Adobe XD",
    ],
    lookingFor: [
      "Frontend",
      "Backend",
      "Product",
    ],
    achievements: [
      "Designed 8+ projects",
      "Hackathon design winner",
      "Product design mentor",
    ],
    avatar: "",
  },

  {
    _id: "demo-3",
    name: "Rohan Kulkarni",
    role: "AI / ML Engineer",
    college:
      "COEP Technological University",
    branch: "Computer Science",
    year: "4th Year",
    location:
      "Pune, Maharashtra",
    availability: "Available",
    compatibility: 89,
    skills: [
      "Python",
      "AI",
      "ML",
      "TensorFlow",
    ],
    interests: [
      "Machine Learning",
      "Data Science",
      "Research",
    ],
    projects: 7,
    hackathons: 5,
    bio:
      "AI enthusiast working on machine learning projects and intelligent solutions for real-world problems.",
    experience:
      "Experience with machine learning models, data processing and academic research projects.",
    techStack: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
    ],
    lookingFor: [
      "Frontend",
      "Backend",
      "UI/UX",
    ],
    achievements: [
      "ML project lead",
      "Research contributor",
      "Hackathon finalist",
    ],
    avatar: "",
  },

  {
    _id: "demo-4",
    name: "Sneha Joshi",
    role: "Frontend Developer",
    college:
      "Pimpri Chinchwad College of Engineering",
    branch: "Computer Engineering",
    year: "2nd Year",
    location:
      "Pune, Maharashtra",
    availability: "Busy",
    compatibility: 84,
    skills: [
      "React",
      "JavaScript",
      "UI/UX",
      "CSS",
    ],
    interests: [
      "Frontend",
      "Open Source",
      "Design",
    ],
    projects: 5,
    hackathons: 2,
    bio:
      "Frontend developer who loves turning ideas into polished and responsive web experiences.",
    experience:
      "Experience creating responsive college projects and participating in frontend-focused hackathons.",
    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
    ],
    lookingFor: [
      "Backend",
      "UI/UX",
    ],
    achievements: [
      "Built 5+ frontend projects",
      "Hackathon participant",
      "Responsive UI specialist",
    ],
    avatar: "",
  },

  {
    _id: "demo-5",
    name: "Neha Deshmukh",
    role: "Backend Developer",
    college:
      "AISSMS Institute of Information Technology",
    branch: "Computer Engineering",
    year: "3rd Year",
    location:
      "Pune, Maharashtra",
    availability: "Available",
    compatibility: 87,
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "Java",
    ],
    interests: [
      "Backend Systems",
      "APIs",
      "Cloud",
    ],
    projects: 6,
    hackathons: 4,
    bio:
      "Backend developer interested in APIs, databases and reliable software systems.",
    experience:
      "Experience creating REST APIs, authentication systems and database-driven applications.",
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
    ],
    lookingFor: [
      "Frontend",
      "AI",
    ],
    achievements: [
      "Built multiple REST APIs",
      "Backend team lead",
      "Cloud deployment experience",
    ],
    avatar: "",
  },

  {
    _id: "demo-6",
    name: "Kunal More",
    role: "Java Developer",
    college:
      "Dr. D. Y. Patil Institute of Technology",
    branch: "Information Technology",
    year: "4th Year",
    location:
      "Pune, Maharashtra",
    availability: "Available",
    compatibility: 82,
    skills: [
      "Java",
      "Spring Boot",
      "MySQL",
      "REST API",
    ],
    interests: [
      "Enterprise Applications",
      "Backend",
      "Cloud",
    ],
    projects: 10,
    hackathons: 5,
    bio:
      "Java developer with a strong interest in backend architecture and scalable applications.",
    experience:
      "Experience with Java applications, REST APIs and database-driven backend systems.",
    techStack: [
      "Java",
      "Spring Boot",
      "MySQL",
      "REST API",
    ],
    lookingFor: [
      "Frontend",
      "UI/UX",
    ],
    achievements: [
      "Completed 10+ projects",
      "Backend internship experience",
      "Hackathon finalist",
    ],
    avatar: "",
  },
];

const normalizeTeammate = (
  person,
  index
) => {
  const firstName =
    person.firstName || "";

  const lastName =
    person.lastName || "";

  const generatedName = (
    firstName +
    " " +
    lastName
  ).trim();

  return {
    _id:
      person._id ||
      person.id ||
      "teammate-" +
        String(index),

    name:
      person.name ||
      person.fullName ||
      generatedName ||
      "Student",

    role:
      person.role ||
      person.title ||
      "Student Developer",

    college:
      person.college ||
      person.collegeName ||
      "College not specified",

    branch:
      person.branch ||
      person.department ||
      "Computer Science",

    year:
      person.year ||
      person.studyYear ||
      "Student",

    location:
      person.location ||
      person.city ||
      "India",

    availability:
      person.availability ||
      "Available",

    compatibility: Number(
      person.compatibility ??
        person.matchScore ??
        80
    ),

    skills: Array.isArray(
      person.skills
    )
      ? person.skills
      : [],

    interests: Array.isArray(
      person.interests
    )
      ? person.interests
      : [],

    projects: Number(
      person.projects ??
        person.projectCount ??
        0
    ),

    hackathons: Number(
      person.hackathons ??
        person.hackathonCount ??
        0
    ),

    bio:
      person.bio ||
      "Looking for talented teammates to build something meaningful.",

    experience:
      person.experience ||
      "Not specified",

    techStack: Array.isArray(
      person.techStack
    )
      ? person.techStack
      : [],

    lookingFor: Array.isArray(
      person.lookingFor
    )
      ? person.lookingFor
      : [],

    achievements: Array.isArray(
      person.achievements
    )
      ? person.achievements
      : [],

    avatar:
      person.avatar ||
      person.profileImage ||
      "",
  };
};

const getInitials = (name) => {
  if (!name) return "ST";

  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    String(parts[0][0]) +
    String(parts[1][0])
  ).toUpperCase();
};

export default function FindTeammates() {
  const [
    teammates,
    setTeammates,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedSkill,
    setSelectedSkill,
  ] = useState("All");

  const [
    availability,
    setAvailability,
  ] = useState("All");

  const [
    year,
    setYear,
  ] = useState("All");

  const [
    sortBy,
    setSortBy,
  ] = useState("compatibility");

  const [
    connectedIds,
    setConnectedIds,
  ] = useState(new Set());

  const [
    selectedTeammate,
    setSelectedTeammate,
  ] = useState(null);

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(true);

  const fetchTeammates = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          API_URL +
            "/teammates",
          {
            headers: {
              "Content-Type":
                "application/json",

              ...(token
                ? {
                    Authorization:
                      "Bearer " +
                      token,
                  }
                : {}),
            },
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to load teammates."
        );
      }

      const data =
        await response.json();

      const list =
        data?.teammates ||
        data?.users ||
        data?.data ||
        (Array.isArray(data)
          ? data
          : []);

      const normalized =
        list.map(
          (
            person,
            index
          ) =>
            normalizeTeammate(
              person,
              index
            )
        );

      setTeammates(
        normalized.length > 0
          ? normalized
          : fallbackTeammates
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the server. Showing sample profiles."
      );

      setTeammates(
        fallbackTeammates
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeammates();
  }, []);

  const filteredTeammates =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        teammates.filter(
          (person) => {
            const searchableText = [
              person.name,
              person.role,
              person.college,
              person.branch,
              person.year,
              person.location,
              ...person.skills,
              ...person.interests,
            ]
              .join(" ")
              .toLowerCase();

            const matchesSearch =
              !query ||
              searchableText.includes(
                query
              );

            const matchesSkill =
              selectedSkill ===
                "All" ||
              person.skills.some(
                (skill) =>
                  String(
                    skill
                  ).toLowerCase() ===
                  selectedSkill.toLowerCase()
              );

            const matchesAvailability =
              availability ===
                "All" ||
              String(
                person.availability
              ).toLowerCase() ===
                availability.toLowerCase();

            const matchesYear =
              year === "All" ||
              String(
                person.year
              )
                .toLowerCase()
                .includes(
                  year.toLowerCase()
                );

            return (
              matchesSearch &&
              matchesSkill &&
              matchesAvailability &&
              matchesYear
            );
          }
        );

      return [
        ...filtered,
      ].sort((a, b) => {
        if (
          sortBy ===
          "compatibility"
        ) {
          return (
            b.compatibility -
            a.compatibility
          );
        }

        if (
          sortBy ===
          "projects"
        ) {
          return (
            b.projects -
            a.projects
          );
        }

        if (
          sortBy ===
          "hackathons"
        ) {
          return (
            b.hackathons -
            a.hackathons
          );
        }

        return a.name.localeCompare(
          b.name
        );
      });
    }, [
      teammates,
      search,
      selectedSkill,
      availability,
      year,
      sortBy,
    ]);

  const clearFilters = () => {
    setSearch("");
    setSelectedSkill("All");
    setAvailability("All");
    setYear("All");
    setSortBy(
      "compatibility"
    );
  };

  const hasFilters =
    Boolean(
      search.trim()
    ) ||
    selectedSkill !==
      "All" ||
    availability !==
      "All" ||
    year !== "All";

  const handleConnect =
    async (teammate) => {
      if (
        !teammate?._id ||
        connectedIds.has(
          teammate._id
        )
      ) {
        return;
      }

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            API_URL +
              "/teammates/connect",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",

                ...(token
                  ? {
                      Authorization:
                        "Bearer " +
                        token,
                    }
                  : {}),
              },

              body: JSON.stringify({
                receiverId:
                  teammate._id,

                message:
                  "Hi! I'd love to connect and explore working together.",
              }),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Connection request failed"
          );
        }

        setConnectedIds(
          (previous) => {
            const updated =
              new Set(previous);

            updated.add(
              teammate._id
            );

            return updated;
          }
        );
      } catch (err) {
        console.error(err);

        /*
         * Demo profiles remain clickable
         * while backend integration is being tested.
         */
        if (
          String(
            teammate._id
          ).startsWith("demo-")
        ) {
          setConnectedIds(
            (previous) => {
              const updated =
                new Set(previous);

              updated.add(
                teammate._id
              );

              return updated;
            }
          );
        }
      }
    };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        stablePosition
      />

      <div className="min-w-0">

        <Topbar
          sidebarOpen={
            sidebarOpen
          }
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <main className="mx-auto w-full max-w-[1550px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* Page Header */}
          <section className="mb-7">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 px-3.5 py-1.5 text-xs font-bold text-[#0f766e]">
                  <Sparkles className="h-4 w-4" />
                  Discover your next teammate
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl lg:text-[42px]">
                  Find Teammates
                </h1>

                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500 sm:text-base">
                  Connect with students who match your skills,
                  interests, experience, and project goals.
                </p>

              </div>

              <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E1B4B]/5 text-[#1E1B4B]">
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xl font-extrabold text-[#1E1B4B]">
                    {teammates.length}
                  </p>

                  <p className="text-xs font-semibold text-slate-500">
                    Profiles available
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* Search */}
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="relative flex-1">

                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(
                    event
                  ) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search by name, skill, college, branch or location..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-[#14B8A6]/10 sm:text-[15px]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch(
                        ""
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

              </div>

              <button
                type="button"
                onClick={
                  fetchTeammates
                }
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-[#1E1B4B] transition hover:bg-slate-50"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>

            </div>
          </section>

          {/* Main Layout */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

            {/* Vertical Filters */}
            <TeammateFilters
              selectedSkill={
                selectedSkill
              }
              setSelectedSkill={
                setSelectedSkill
              }
              availability={
                availability
              }
              setAvailability={
                setAvailability
              }
              year={year}
              setYear={setYear}
              sortBy={sortBy}
              setSortBy={
                setSortBy
              }
              clearFilters={
                clearFilters
              }
              hasFilters={
                hasFilters
              }
            />

            {/* Results */}
            <section className="min-w-0 flex-1">

              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#14B8A6]" />

                    <h2 className="text-xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-2xl">
                      Recommended teammates
                    </h2>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {filteredTeammates.length}{" "}
                    {filteredTeammates.length ===
                    1
                      ? "profile"
                      : "profiles"}{" "}
                    match your preferences
                  </p>

                </div>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset filters
                  </button>
                )}

              </div>

              {/* Loading */}
              {loading ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {Array.from({
                    length: 6,
                  }).map(
                    (_, index) => (
                      <div
                        key={
                          "loading-" +
                          String(
                            index
                          )
                        }
                        className="h-[430px] animate-pulse rounded-2xl border border-slate-200 bg-white"
                      />
                    )
                  )}

                </div>
              ) : filteredTeammates.length >
                0 ? (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {filteredTeammates.map(
                    (
                      teammate
                    ) => (
                      <TeammateCard
                        key={
                          teammate._id
                        }
                        teammate={
                          teammate
                        }
                        connected={connectedIds.has(
                          teammate._id
                        )}
                        onConnect={
                          handleConnect
                        }
                        onViewProfile={
                          setSelectedTeammate
                        }
                      />
                    )
                  )}

                </div>

              ) : (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <UserRoundSearch className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-[#1E1B4B]">
                    No teammates found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Try changing your search or removing
                    some filters to discover more students.
                  </p>

                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="mt-5 rounded-xl bg-[#1E1B4B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#16143a]"
                  >
                    Clear filters
                  </button>

                </div>

              )}

              {error && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
                  {error}
                </div>
              )}

            </section>
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      {selectedTeammate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <button
            type="button"
            aria-label="Close profile"
            onClick={() =>
              setSelectedTeammate(
                null
              )
            }
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="border-b border-slate-200 px-5 py-5 sm:px-7">

              <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#14B8A6]/20 bg-[#14B8A6]/10 text-xl font-extrabold text-[#1E1B4B]">

                    {selectedTeammate.avatar ? (
                      <img
                        src={
                          selectedTeammate.avatar
                        }
                        alt={
                          selectedTeammate.name
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {getInitials(
                          selectedTeammate.name
                        )}
                      </span>
                    )}

                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate text-2xl font-extrabold tracking-tight text-[#1E1B4B]">
                      {
                        selectedTeammate.name
                      }
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {
                        selectedTeammate.role
                      }
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">

                      <span className="rounded-full bg-[#14B8A6]/10 px-3 py-1 text-xs font-extrabold text-[#0f766e]">
                        {
                          selectedTeammate.compatibility
                        }% Match
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {
                          selectedTeammate.availability
                        }
                      </span>

                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedTeammate(
                      null
                    )
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto px-5 py-6 sm:px-7">

              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <GraduationCap className="h-5 w-5 text-[#14B8A6]" />

                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    College
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#1E1B4B]">
                    {
                      selectedTeammate.college
                    }
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <BriefcaseBusiness className="h-5 w-5 text-[#14B8A6]" />

                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Branch
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#1E1B4B]">
                    {
                      selectedTeammate.branch
                    }
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <CalendarDays className="h-5 w-5 text-[#14B8A6]" />

                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Academic Year
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#1E1B4B]">
                    {
                      selectedTeammate.year
                    }
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <MapPin className="h-5 w-5 text-[#14B8A6]" />

                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#1E1B4B]">
                    {
                      selectedTeammate.location
                    }
                  </p>
                </div>

              </div>

              {/* About */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

                <h4 className="text-lg font-extrabold text-[#1E1B4B]">
                  About
                </h4>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {
                    selectedTeammate.bio
                  }
                </p>

              </div>

              {/* Skills and Interests */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-5">

                  <h4 className="text-base font-extrabold text-[#1E1B4B]">
                    Skills
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {selectedTeammate.skills.length >
                    0 ? (
                      selectedTeammate.skills.map(
                        (
                          skill,
                          index
                        ) => (
                          <span
                            key={
                              String(
                                skill
                              ) +
                              "-" +
                              String(
                                index
                              )
                            }
                            className="rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 px-3 py-1.5 text-xs font-bold text-[#0f766e]"
                          >
                            {skill}
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-sm text-slate-400">
                        No skills listed
                      </span>
                    )}

                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">

                  <h4 className="text-base font-extrabold text-[#1E1B4B]">
                    Interests
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {selectedTeammate.interests.length >
                    0 ? (
                      selectedTeammate.interests.map(
                        (
                          interest,
                          index
                        ) => (
                          <span
                            key={
                              String(
                                interest
                              ) +
                              "-" +
                              String(
                                index
                              )
                            }
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600"
                          >
                            {interest}
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-sm text-slate-400">
                        No interests listed
                      </span>
                    )}

                  </div>
                </div>

              </div>

              {/* Experience */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

                <h4 className="text-base font-extrabold text-[#1E1B4B]">
                  Experience
                </h4>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {
                    selectedTeammate.experience
                  }
                </p>

              </div>

              {/* Tech Stack / Looking For */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-5">

                  <h4 className="text-base font-extrabold text-[#1E1B4B]">
                    Tech Stack
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {selectedTeammate.techStack.length >
                    0 ? (
                      selectedTeammate.techStack.map(
                        (
                          item,
                          index
                        ) => (
                          <span
                            key={
                              String(
                                item
                              ) +
                              "-" +
                              String(
                                index
                              )
                            }
                            className="rounded-full border border-[#1E1B4B]/10 bg-[#1E1B4B]/5 px-3 py-1.5 text-xs font-bold text-[#1E1B4B]"
                          >
                            {item}
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-sm text-slate-400">
                        Not specified
                      </span>
                    )}

                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">

                  <h4 className="text-base font-extrabold text-[#1E1B4B]">
                    Looking For
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {selectedTeammate.lookingFor.length >
                    0 ? (
                      selectedTeammate.lookingFor.map(
                        (
                          item,
                          index
                        ) => (
                          <span
                            key={
                              String(
                                item
                              ) +
                              "-" +
                              String(
                                index
                              )
                            }
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600"
                          >
                            {item}
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-sm text-slate-400">
                        Not specified
                      </span>
                    )}

                  </div>
                </div>

              </div>

              {/* Achievements */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

                <h4 className="text-base font-extrabold text-[#1E1B4B]">
                  Achievements
                </h4>

                <div className="mt-4 space-y-3">

                  {selectedTeammate.achievements.length >
                  0 ? (
                    selectedTeammate.achievements.map(
                      (
                        achievement,
                        index
                      ) => (
                        <div
                          key={
                            String(
                              achievement
                            ) +
                            "-" +
                            String(
                              index
                            )
                          }
                          className="flex items-start gap-3"
                        >
                          <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-[#14B8A6]" />

                          <span className="text-sm leading-6 text-slate-600">
                            {
                              achievement
                            }
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <span className="text-sm text-slate-400">
                      No achievements listed
                    </span>
                  )}

                </div>
              </div>

              {/* Statistics */}
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <FolderKanban className="h-5 w-5 text-[#14B8A6]" />

                  <p className="mt-3 text-2xl font-extrabold text-[#1E1B4B]">
                    {
                      selectedTeammate.projects
                    }
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Projects
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <Trophy className="h-5 w-5 text-[#14B8A6]" />

                  <p className="mt-3 text-2xl font-extrabold text-[#1E1B4B]">
                    {
                      selectedTeammate.hackathons
                    }
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Hackathons
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <Clock3 className="h-5 w-5 text-[#14B8A6]" />

                  <p className="mt-3 text-base font-extrabold text-[#1E1B4B]">
                    {
                      selectedTeammate.availability
                    }
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Availability
                  </p>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">

              <button
                type="button"
                onClick={() =>
                  setSelectedTeammate(
                    null
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                disabled={connectedIds.has(
                  selectedTeammate._id
                )}
                onClick={() =>
                  handleConnect(
                    selectedTeammate
                  )
                }
                className={
                  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition " +
                  (connectedIds.has(
                    selectedTeammate._id
                  )
                    ? "cursor-not-allowed bg-emerald-600"
                    : "bg-[#1E1B4B] hover:bg-[#16143a]")
                }
              >
                {connectedIds.has(
                  selectedTeammate._id
                ) ? (
                  <>
                    <Check className="h-4 w-4" />
                    Request Sent
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Request
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}