import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ImagePlus,
  Layers3,
  Link as LinkIcon,
  Pencil,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

/* =========================================================
   CONEXA COLOR SYSTEM
=========================================================

Primary Navy       #1E1B4B
Secondary Indigo   #312E81
Accent Teal        #14B8A6
Accent Light       #2DD4BF
White              #FFFFFF
Light Background   #F8FAFC
Main Text          #0F172A
Secondary Text     #64748B
Border             #E2E8F0

========================================================= */

const STORAGE_KEY = "conexa_projects";

/* =========================================================
   DEFAULT PROJECTS
========================================================= */

const DEFAULT_PROJECTS = [
  {
    id: "wanderlust",
    name: "WanderLust",
    category: "Full Stack",
    status: "Completed",
    year: 2026,
    role: "Full Stack Developer",
    type: "Personal Project",
    progress: 100,

    shortDescription:
      "A full-stack travel and accommodation platform for discovering, creating and managing stays.",

    description:
      "WanderLust is a full-stack travel and accommodation platform designed to provide users with a complete experience for discovering, creating, managing and reviewing accommodation listings. The application includes secure authentication, image uploads, interactive maps, reviews and ratings, CRUD operations and persistent MongoDB storage.",

    contribution:
      "Designed and implemented the complete full-stack application including frontend views, backend APIs, authentication, database integration, image uploads and CRUD functionality.",

    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
      "JavaScript",
      "Passport.js",
      "Cloudinary",
      "Multer",
    ],

    features: [
      "User authentication",
      "Accommodation listings",
      "CRUD operations",
      "Image uploads",
      "Interactive maps",
      "Reviews and ratings",
      "MongoDB persistence",
      "Responsive interface",
      "Session management",
    ],

    github: "https://github.com/Tenali04/Wanderlust",
    live: "https://wanderlust-l51x.onrender.com",
    githubProfile: "https://github.com/Tenali04",

    gradient:
      "from-[#1E1B4B] via-[#312E81] to-[#14B8A6]",

    image: null,
    isCustom: false,
  },

  {
    id: "conexa",
    name: "CONEXA",
    category: "Collaborative",
    status: "In Progress",
    year: 2026,
    role: "Frontend Developer",
    type: "Team Project",
    progress: 75,

    shortDescription:
      "A student collaboration platform for discovering teammates, building teams and managing projects.",

    description:
      "CONEXA is a student-focused collaboration platform that helps students discover teammates based on skills and interests, build teams, manage projects and collaborate through a centralized dashboard. The platform brings student profiles, team management, project collaboration, requests, notifications and teammate discovery into one application.",

    contribution:
      "Developed frontend pages including teammate discovery, team-building interfaces, project screens, responsive layouts, navigation and reusable UI components.",

    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],

    features: [
      "Find teammates",
      "Team Builder",
      "My Team management",
      "Student profiles",
      "Project collaboration",
      "Responsive dashboard",
      "Notifications",
      "Team requests",
      "Skill-based discovery",
    ],

    github:
      "https://github.com/VedikaMamidwar/Conexa-team-finder.git",

    live: null,

    githubProfile:
      "https://github.com/Tenali04",

    gradient:
      "from-[#1E1B4B] via-[#312E81] to-[#14B8A6]",

    image: null,
    isCustom: false,
  },
];

/* =========================================================
   TECHNOLOGY GROUPS
========================================================= */

const TECHNOLOGY_GROUPS = {
  "Programming Languages": [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "Go",
    "PHP",
  ],

  Frontend: [
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Bootstrap",
    "EJS",
  ],

  Backend: [
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "REST API",
  ],

  Database: [
    "MongoDB",
    "Mongoose",
    "MySQL",
    "PostgreSQL",
    "Firebase",
    "Redis",
    "SQLite",
  ],

  "Tools & Platforms": [
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Vercel",
    "Render",
    "Cloudinary",
    "Multer",
    "Passport.js",
    "Figma",
  ],
};

/* =========================================================
   EMPTY FORM
========================================================= */

const createEmptyForm = () => ({
  name: "",
  category: "",
  status: "In Progress",
  year: new Date().getFullYear(),
  role: "",
  type: "Personal Project",
  progress: 0,
  shortDescription: "",
  description: "",
  contribution: "",
  stack: [],
  features: "",
  github: "",
  live: "",
  image: null,
});

/* =========================================================
   READ LOCAL STORAGE
========================================================= */

const readStoredProjects = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((project) => ({
      ...project,
      isCustom: true,
    }));
  } catch {
    return [];
  }
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MyProject() {
  const navigate = useNavigate();

  const [customProjects, setCustomProjects] = useState(
    () => readStoredProjects()
  );

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingProjectId, setEditingProjectId] =
    useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [form, setForm] = useState(createEmptyForm);

  /* =======================================================
     ALL PROJECTS
  ======================================================= */

  const allProjects = useMemo(
    () => [...DEFAULT_PROJECTS, ...customProjects],
    [customProjects]
  );

  /* =======================================================
     FILTERED PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allProjects.filter((project) => {
      const searchableText = [
        project.name,
        project.category,
        project.role,
        project.type,
        project.shortDescription,
        project.description,
        ...(project.stack || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    allProjects,
    search,
    statusFilter,
  ]);

  /* =======================================================
     OPEN CREATE
  ======================================================= */

  const openCreateModal = () => {
    setEditingProjectId(null);
    setForm(createEmptyForm());
    setModalOpen(true);
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditModal = (project) => {
    setEditingProjectId(project.id);

    setForm({
      name: project.name || "",
      category: project.category || "",
      status: project.status || "In Progress",
      year:
        project.year ||
        new Date().getFullYear(),

      role: project.role || "",

      type:
        project.type ||
        "Personal Project",

      progress:
        project.progress || 0,

      shortDescription:
        project.shortDescription || "",

      description:
        project.description || "",

      contribution:
        project.contribution || "",

      stack:
        project.stack || [],

      features:
        Array.isArray(project.features)
          ? project.features.join(", ")
          : "",

      github:
        project.github || "",

      live:
        project.live || "",

      image:
        project.image || null,
    });

    setModalOpen(true);
  };

  /* =======================================================
     FORM UPDATE
  ======================================================= */

  const updateForm = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =======================================================
     SAVE PROJECT
  ======================================================= */

  const saveProject = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter the project name.");
      return;
    }

    if (!form.category.trim()) {
      alert("Please enter the project category.");
      return;
    }

    if (!form.role.trim()) {
      alert("Please enter your role.");
      return;
    }

    if (!form.shortDescription.trim()) {
      alert("Please add a short description.");
      return;
    }

    if (!form.description.trim()) {
      alert(
        "Please add a detailed project description."
      );
      return;
    }

    if (!form.contribution.trim()) {
      alert(
        "Please describe your contribution."
      );
      return;
    }

    if (!form.stack.length) {
      alert(
        "Please select at least one technology."
      );
      return;
    }

    const existingProject =
      allProjects.find(
        (project) =>
          project.id === editingProjectId
      );

    const project = {
      id:
        editingProjectId ||
        `project-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

      name: form.name.trim(),

      category:
        form.category.trim(),

      status: form.status,

      year: Number(form.year),

      role: form.role.trim(),

      type: form.type,

      progress: Math.min(
        100,
        Math.max(
          0,
          Number(form.progress) || 0
        )
      ),

      shortDescription:
        form.shortDescription.trim(),

      description:
        form.description.trim(),

      contribution:
        form.contribution.trim(),

      stack: [...form.stack],

      features: form.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      github:
        form.github.trim() || null,

      live:
        form.live.trim() || null,

      githubProfile:
        existingProject?.githubProfile ||
        "https://github.com/Tenali04",

      gradient:
        existingProject?.gradient ||
        "from-[#1E1B4B] via-[#312E81] to-[#14B8A6]",

      image:
        form.image || null,

      isCustom: true,
    };

    let updatedProjects;

    if (editingProjectId) {
      updatedProjects =
        customProjects.map((item) =>
          item.id === editingProjectId
            ? project
            : item
        );
    } else {
      updatedProjects = [
        ...customProjects,
        project,
      ];
    }

    setCustomProjects(updatedProjects);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProjects)
    );

    setModalOpen(false);
    setEditingProjectId(null);
    setForm(createEmptyForm());

    if (
      selectedProject?.id ===
      editingProjectId
    ) {
      setSelectedProject(project);
    }
  };

  /* =======================================================
     DELETE PROJECT
  ======================================================= */

  const deleteProject = (projectId) => {
    const project =
      customProjects.find(
        (item) =>
          item.id === projectId
      );

    if (!project) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${project.name}"?`
      );

    if (!confirmed) {
      return;
    }

    const updatedProjects =
      customProjects.filter(
        (item) =>
          item.id !== projectId
      );

    setCustomProjects(updatedProjects);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProjects)
    );

    if (
      selectedProject?.id ===
      projectId
    ) {
      setSelectedProject(null);
    }
  };

  /* =======================================================
     DETAILS VIEW
  ======================================================= */

  if (selectedProject) {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() =>
          setSelectedProject(null)
        }
        onDashboard={() =>
          navigate("/dashboard")
        }
      />
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B] text-white shadow-sm">
              <BriefcaseBusiness size={21} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-[#1E1B4B] sm:text-xl">
                My Projects
              </h1>

              <p className="hidden text-xs text-[#64748B] sm:block">
                Showcase your work, skills and
                contributions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">

            {/* GITHUB */}

            <a
              href="https://github.com/Tenali04"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#64748B] transition hover:border-[#14B8A6]/40 hover:bg-[#F0FDFA] hover:text-[#0F766E] md:inline-flex"
            >
              <ExternalLink size={16} />
              GitHub
            </a>

            {/* DASHBOARD */}

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="hidden items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#64748B] transition hover:border-[#14B8A6]/40 hover:bg-[#F0FDFA] hover:text-[#0F766E] sm:inline-flex"
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>

            {/* ADD PROJECT */}

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#312E81] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1E1B4B] hover:shadow-md"
            >
              <Plus size={17} />

              <span className="hidden sm:inline">
                Add Project
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">

        {/* =================================================
            INTRO
        ================================================= */}

        <section className="mb-7 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">

          <div className="relative p-6 sm:p-8">

            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#14B8A6]/5 blur-3xl" />

            <div className="relative max-w-3xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/20 bg-[#F0FDFA] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0F766E]">
                <Layers3 size={14} />
                Portfolio
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#1E1B4B] sm:text-3xl lg:text-4xl">
                Your work, clearly presented.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
                Keep your projects organized and
                give teammates, recruiters and
                collaborators a clear view of what
                you have built, the technologies you
                use and your contribution.
              </p>

            </div>
          </div>
        </section>

        {/* =================================================
            FILTERS
        ================================================= */}

        <section className="mb-7 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search projects, skills or roles..."
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#312E81] focus:bg-white focus:ring-2 focus:ring-[#312E81]/10"
              />
            </div>

            <div className="flex items-center gap-3">

              <div className="relative min-w-[150px]">

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 pr-10 text-sm font-medium text-[#0F172A] outline-none transition focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="On Hold">
                    On Hold
                  </option>
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />

              </div>

              <span className="hidden whitespace-nowrap text-sm font-semibold text-[#64748B] sm:block">
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1
                  ? "project"
                  : "projects"}
              </span>

            </div>
          </div>
        </section>

        {/* =================================================
            PROJECT GRID
        ================================================= */}

        {filteredProjects.length > 0 ? (
          <section className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">

            {filteredProjects.map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={() =>
                    setSelectedProject(
                      project
                    )
                  }
                  onEdit={() =>
                    openEditModal(
                      project
                    )
                  }
                  onDelete={() =>
                    deleteProject(
                      project.id
                    )
                  }
                />
              )
            )}

          </section>
        ) : (
          <EmptyProjects
            search={search}
            onClear={() => {
              setSearch("");
              setStatusFilter("All");
            }}
            onAdd={openCreateModal}
          />
        )}
      </main>

      {/* ===================================================
          MODAL
      =================================================== */}

      {modalOpen && (
        <ProjectFormModal
          form={form}
          updateForm={updateForm}
          onClose={() => {
            setModalOpen(false);
            setEditingProjectId(null);
            setForm(createEmptyForm());
          }}
          onSubmit={saveProject}
          editing={Boolean(
            editingProjectId
          )}
        />
      )}
    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <article className="flex min-h-[535px] w-full max-w-[390px] flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-xl">

      {/* IMAGE */}

      <div
        className={`relative h-48 shrink-0 overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
                <BriefcaseBusiness
                  size={30}
                />
              </div>

              <p className="text-sm font-semibold text-white/80">
                {project.category}
              </p>

            </div>
          </div>
        )}

        {/* STATUS */}

        <div className="absolute left-4 top-4">
          <ProjectStatus
            status={project.status}
          />
        </div>
      </div>

      {/* BODY */}

      <div className="flex flex-1 flex-col p-5">

        {/* TITLE */}

        <div className="mb-3 flex items-start justify-between gap-3">

          <div className="min-w-0">

            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              {project.category}
            </p>

            <h3 className="truncate text-xl font-bold text-[#1E1B4B]">
              {project.name}
            </h3>

          </div>

          <span className="shrink-0 rounded-lg bg-[#F8FAFC] px-2.5 py-1 text-xs font-bold text-[#64748B]">
            {project.year}
          </span>

        </div>

        {/* META */}

        <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#64748B]">
          <span>
            {project.role}
          </span>

          <span>•</span>

          <span>
            {project.type}
          </span>
        </div>

        {/* DESCRIPTION */}

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-[#64748B]">
          {project.shortDescription}
        </p>

        {/* TECHNOLOGIES */}

        <div className="mb-5">

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Technologies
          </p>

          <div className="flex flex-wrap gap-2">

            {(project.stack || [])
              .slice(0, 3)
              .map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-[#14B8A6]/15 bg-[#F0FDFA] px-2.5 py-1.5 text-xs font-semibold text-[#0F766E]"
                  >
                    {technology}
                  </span>
                )
              )}

            {project.stack?.length >
              3 && (
              <span className="rounded-lg bg-[#F8FAFC] px-2.5 py-1.5 text-xs font-semibold text-[#64748B]">
                +
                {project.stack.length -
                  3}
              </span>
            )}

          </div>
        </div>

        {/* FEATURES PREVIEW */}

        {project.features?.length > 0 && (
          <div className="mb-5">

            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Key Features
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">

              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-[#0F766E]">
                <Check size={12} />
              </span>

              <span className="line-clamp-1">
                {project.features[0]}
              </span>

              {project.features.length >
                1 && (
                <span className="shrink-0 text-[#64748B]">
                  +
                  {project.features.length -
                    1}
                </span>
              )}

            </div>
          </div>
        )}

        {/* PROGRESS */}

        <div className="mt-auto">

          <div className="mb-2 flex items-center justify-between text-xs font-bold">

            <span className="text-[#64748B]">
              Progress
            </span>

            <span className="text-[#312E81]">
              {project.progress}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#312E81] to-[#14B8A6] transition-all"
              style={{
                width: `${project.progress}%`,
              }}
            />

          </div>
        </div>

        {/* ACTIONS */}

        <div className="mt-5 flex gap-2 border-t border-[#E2E8F0] pt-4">

          <button
            type="button"
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#312E81] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E1B4B] hover:shadow-md"
          >
            View Details
            <ChevronRight size={16} />
          </button>

          {project.isCustom && (
            <>
              <button
                type="button"
                onClick={onEdit}
                title="Edit Project"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] transition hover:border-[#14B8A6]/30 hover:bg-[#F0FDFA] hover:text-[#0F766E]"
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                onClick={onDelete}
                title="Delete Project"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}

        </div>
      </div>
    </article>
  );
}

/* =========================================================
   STATUS
========================================================= */

function ProjectStatus({
  status,
}) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#1E1B4B]/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
        Completed
      </span>
    );
  }

  if (status === "On Hold") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#1E1B4B]/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
        On Hold
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#1E1B4B]/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
      In Progress
    </span>
  );
}

/* =========================================================
   PROJECT DETAILS
========================================================= */

function ProjectDetails({
  project,
  onBack,
  onDashboard,
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">

      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#64748B] transition hover:border-[#14B8A6]/30 hover:bg-[#F0FDFA] hover:text-[#0F766E]"
          >
            <ArrowLeft size={17} />
            <span>
              My Projects
            </span>
          </button>

          <div className="flex items-center gap-2">

            <a
              href={
                project.githubProfile ||
                "https://github.com/Tenali04"
              }
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#64748B] transition hover:border-[#14B8A6]/30 hover:bg-[#F0FDFA] hover:text-[#0F766E] sm:inline-flex"
            >
              <ExternalLink size={16} />
              GitHub Profile
            </a>

            <button
              type="button"
              onClick={onDashboard}
              className="hidden rounded-xl bg-[#312E81] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E1B4B] sm:inline-flex"
            >
              Dashboard
            </button>

          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.gradient} shadow-xl`}
        >

          {project.image && (
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
          )}

          <div className="absolute inset-0 bg-[#1E1B4B]/10" />

          <div className="relative p-6 sm:p-8 lg:p-10">

            {/* BADGES */}

            <div className="mb-5 flex flex-wrap gap-2">

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                {project.category}
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                {project.status}
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                {project.year}
              </span>

            </div>

            {/* TITLE */}

            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
              {project.shortDescription}
            </p>

            {/* META */}

            <div className="mt-7 grid gap-3 sm:grid-cols-3">

              <InfoItem
                label="Role"
                value={project.role}
                light
              />

              <InfoItem
                label="Project Type"
                value={project.type}
                light
              />

              <InfoItem
                label="Completion"
                value={`${project.progress}%`}
                light
              />

            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* LEFT */}

          <div className="space-y-6">

            <DetailSection title="About This Project">
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                {project.description}
              </p>
            </DetailSection>

            <DetailSection title="My Contribution">
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                {project.contribution}
              </p>
            </DetailSection>

            <DetailSection title="Technology Stack">

              <div className="flex flex-wrap gap-2.5">

                {(project.stack || []).map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-xl border border-[#14B8A6]/20 bg-[#F0FDFA] px-3.5 py-2 text-sm font-semibold text-[#0F766E]"
                    >
                      {technology}
                    </span>
                  )
                )}

              </div>
            </DetailSection>

            {/* KEY FEATURES */}

            <DetailSection title="Key Features">

              {project.features?.length ? (

                <div className="grid gap-3 sm:grid-cols-2">

                  {project.features.map(
                    (feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition hover:border-[#14B8A6]/20 hover:bg-[#F0FDFA]/40"
                      >

                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-[#0F766E]">
                          <Check size={14} />
                        </span>

                        <span className="text-sm font-medium leading-6 text-[#475569]">
                          {feature}
                        </span>

                      </div>
                    )
                  )}

                </div>

              ) : (
                <p className="text-sm text-[#64748B]">
                  No key features have been
                  added yet.
                </p>
              )}
            </DetailSection>

          </div>

          {/* RIGHT */}

          <aside className="space-y-6">

            {/* PROGRESS */}

            <DetailSection title="Project Progress">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm font-semibold text-[#64748B]">
                  Completion
                </span>

                <span className="text-lg font-bold text-[#312E81]">
                  {project.progress}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#E2E8F0]">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#312E81] to-[#14B8A6]"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-xs leading-5 text-[#64748B]">
                Current project completion based
                on the development status.
              </p>

            </DetailSection>

            {/* LINKS */}

            <DetailSection title="Project Links">

              <div className="space-y-3">

                {project.github && (
                  <ProjectLink
                    href={project.github}
                    label="GitHub Repository"
                    icon={
                      <ExternalLink
                        size={17}
                      />
                    }
                  />
                )}

                {project.live && (
                  <ProjectLink
                    href={project.live}
                    label="Live Deployment"
                    icon={
                      <LinkIcon
                        size={17}
                      />
                    }
                  />
                )}

                {project.githubProfile && (
                  <ProjectLink
                    href={
                      project.githubProfile
                    }
                    label="My GitHub Profile"
                    icon={
                      <ExternalLink
                        size={17}
                      />
                    }
                  />
                )}

                {!project.live && (
                  <div className="rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <p className="text-xs leading-5 text-[#64748B]">
                      A live deployment link has
                      not been added for this
                      project yet.
                    </p>
                  </div>
                )}

              </div>
            </DetailSection>

          </aside>
        </div>

        {/* FOOTER ACTION */}

        <div className="mt-8 border-t border-[#E2E8F0] pt-6">

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-bold text-[#64748B] transition hover:border-[#14B8A6]/30 hover:bg-[#F0FDFA] hover:text-[#0F766E]"
          >
            <ArrowLeft size={17} />
            Back to My Projects
          </button>

        </div>
      </main>
    </div>
  );
}

/* =========================================================
   DETAIL SECTION
========================================================= */

function DetailSection({
  title,
  children,
}) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">

      <h2 className="mb-5 flex items-center gap-2.5 text-lg font-bold text-[#1E1B4B]">

        <span className="h-5 w-1 rounded-full bg-[#14B8A6]" />

        {title}

      </h2>

      {children}
    </section>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  label,
  value,
  light = false,
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        light
          ? "border border-white/10 bg-white/10"
          : "border border-[#E2E8F0] bg-[#F8FAFC]"
      }`}
    >

      <p
        className={`text-xs font-semibold uppercase tracking-wide ${
          light
            ? "text-white/60"
            : "text-[#64748B]"
        }`}
      >
        {label}
      </p>

      <p
        className={`mt-1.5 text-sm font-bold ${
          light
            ? "text-white"
            : "text-[#1E1B4B]"
        }`}
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   PROJECT LINK
========================================================= */

function ProjectLink({
  href,
  label,
  icon,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3.5 transition hover:border-[#14B8A6]/30 hover:bg-[#F0FDFA]"
    >

      <div className="flex min-w-0 items-center gap-3">

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0FDFA] text-[#0F766E] transition group-hover:bg-[#CCFBF1]">
          {icon}
        </span>

        <span className="truncate text-sm font-semibold text-[#475569]">
          {label}
        </span>

      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-[#94A3B8] transition group-hover:text-[#0F766E]"
      />

    </a>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyProjects({
  search,
  onClear,
  onAdd,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-6 py-16 text-center shadow-sm">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#0F766E]">
        <BriefcaseBusiness size={28} />
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#1E1B4B]">
        No projects found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
        {search
          ? "Try changing your search or status filter."
          : "Add your first project to start building your portfolio."}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">

        {search && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B] transition hover:bg-[#F8FAFC]"
          >
            Clear Filters
          </button>
        )}

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-[#312E81] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E1B4B]"
        >
          <Plus size={17} />
          Add Project
        </button>

      </div>
    </div>
  );
}

/* =========================================================
   PROJECT FORM MODAL
========================================================= */

function ProjectFormModal({
  form,
  updateForm,
  onClose,
  onSubmit,
  editing,
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1B4B]/70 p-3 backdrop-blur-sm sm:p-5">

      <div className="flex min-h-full items-center justify-center py-4 sm:py-8">

        <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-2xl">

          {/* HEADER */}

          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E8F0] bg-white px-5 py-4 sm:px-6">

            <div>

              <h2 className="text-xl font-bold text-[#1E1B4B]">
                {editing
                  ? "Edit Project"
                  : "Add New Project"}
              </h2>

              <p className="mt-1 text-xs text-[#64748B]">
                Add clear information about
                your project and contribution.
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#1E1B4B]"
            >
              <X size={19} />
            </button>

          </div>

          {/* FORM */}

          <form onSubmit={onSubmit}>

            <div className="space-y-8 p-5 sm:p-6">

              {/* BASIC */}

              <FormSection title="Basic Information">

                <div className="grid gap-4 sm:grid-cols-2">

                  <FormField
                    label="Project Name"
                    required
                  >
                    <input
                      value={form.name}
                      onChange={(event) =>
                        updateForm(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Smart Campus"
                      className={inputClass}
                    />
                  </FormField>

                  <FormField
                    label="Category"
                    required
                  >
                    <input
                      value={form.category}
                      onChange={(event) =>
                        updateForm(
                          "category",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Full Stack"
                      className={inputClass}
                    />
                  </FormField>

                  <FormField
                    label="Your Role"
                    required
                  >
                    <input
                      value={form.role}
                      onChange={(event) =>
                        updateForm(
                          "role",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Frontend Developer"
                      className={inputClass}
                    />
                  </FormField>

                  <FormField label="Project Type">

                    <select
                      value={form.type}
                      onChange={(event) =>
                        updateForm(
                          "type",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    >
                      <option>
                        Personal Project
                      </option>

                      <option>
                        Team Project
                      </option>

                      <option>
                        College Project
                      </option>

                      <option>
                        Hackathon Project
                      </option>

                      <option>
                        Open Source
                      </option>
                    </select>

                  </FormField>

                  <FormField label="Status">

                    <select
                      value={form.status}
                      onChange={(event) =>
                        updateForm(
                          "status",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    >
                      <option>
                        In Progress
                      </option>

                      <option>
                        Completed
                      </option>

                      <option>
                        On Hold
                      </option>
                    </select>

                  </FormField>

                  <FormField label="Year">

                    <input
                      type="number"
                      min="2000"
                      max="2100"
                      value={form.year}
                      onChange={(event) =>
                        updateForm(
                          "year",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />

                  </FormField>

                </div>
              </FormSection>

              {/* IMAGE */}

              <FormSection title="Project Image">

                <ImageUploader
                  image={form.image}
                  onChange={(image) =>
                    updateForm(
                      "image",
                      image
                    )
                  }
                />

              </FormSection>

              {/* DESCRIPTION */}

              <FormSection title="Project Description">

                <div className="space-y-4">

                  <FormField
                    label="Short Description"
                    required
                  >
                    <textarea
                      rows={3}
                      value={
                        form.shortDescription
                      }
                      onChange={(event) =>
                        updateForm(
                          "shortDescription",
                          event.target.value
                        )
                      }
                      placeholder="Write a concise summary of your project..."
                      className={textareaClass}
                    />
                  </FormField>

                  <FormField
                    label="Detailed Description"
                    required
                  >
                    <textarea
                      rows={6}
                      value={
                        form.description
                      }
                      onChange={(event) =>
                        updateForm(
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="Explain what the project does, who it is for and how it works..."
                      className={textareaClass}
                    />
                  </FormField>

                  <FormField
                    label="Your Contribution"
                    required
                  >
                    <textarea
                      rows={5}
                      value={
                        form.contribution
                      }
                      onChange={(event) =>
                        updateForm(
                          "contribution",
                          event.target.value
                        )
                      }
                      placeholder="Describe what you personally designed, developed or contributed..."
                      className={textareaClass}
                    />
                  </FormField>

                </div>
              </FormSection>

              {/* TECHNOLOGIES */}

              <FormSection title="Technology Stack">

                <TechnologyMultiSelect
                  value={form.stack}
                  onChange={(stack) =>
                    updateForm(
                      "stack",
                      stack
                    )
                  }
                />

              </FormSection>

              {/* FEATURES */}

              <FormSection title="Key Features">

                <FormField label="Features">

                  <textarea
                    rows={4}
                    value={form.features}
                    onChange={(event) =>
                      updateForm(
                        "features",
                        event.target.value
                      )
                    }
                    placeholder="Authentication, Team Builder, Notifications, Responsive UI"
                    className={textareaClass}
                  />

                  <p className="mt-2 text-xs text-[#94A3B8]">
                    Separate each feature
                    with a comma.
                  </p>

                </FormField>

              </FormSection>

              {/* LINKS */}

              <FormSection title="Project Links">

                <div className="grid gap-4 sm:grid-cols-2">

                  <FormField label="GitHub Repository">

                    <div className="relative">

                      <ExternalLink
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                      <input
                        type="url"
                        value={form.github}
                        onChange={(event) =>
                          updateForm(
                            "github",
                            event.target.value
                          )
                        }
                        placeholder="https://github.com/..."
                        className={`${inputClass} pl-10`}
                      />

                    </div>
                  </FormField>

                  <FormField label="Live Deployment">

                    <div className="relative">

                      <LinkIcon
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                      <input
                        type="url"
                        value={form.live}
                        onChange={(event) =>
                          updateForm(
                            "live",
                            event.target.value
                          )
                        }
                        placeholder="https://your-project.com"
                        className={`${inputClass} pl-10`}
                      />

                    </div>
                  </FormField>

                </div>
              </FormSection>

              {/* PROGRESS */}

              <FormSection title="Project Progress">

                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">

                  <div className="mb-3 flex items-center justify-between">

                    <span className="text-sm font-semibold text-[#64748B]">
                      Completion
                    </span>

                    <span className="text-sm font-bold text-[#312E81]">
                      {form.progress}%
                    </span>

                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={form.progress}
                    onChange={(event) =>
                      updateForm(
                        "progress",
                        event.target.value
                      )
                    }
                    className="w-full accent-[#312E81]"
                  />

                </div>

              </FormSection>

            </div>

            {/* FOOTER */}

            <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-[#E2E8F0] bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#E2E8F0] px-5 py-2.5 text-sm font-bold text-[#64748B] transition hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#312E81] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E1B4B] hover:shadow-md"
              >
                <CheckCircle2 size={17} />

                {editing
                  ? "Save Changes"
                  : "Add Project"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TECHNOLOGY SELECT
========================================================= */

function TechnologyMultiSelect({
  value,
  onChange,
}) {
  const [open, setOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredGroups =
    Object.entries(
      TECHNOLOGY_GROUPS
    )
      .map(
        ([group, technologies]) => [
          group,
          technologies.filter(
            (technology) =>
              technology
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          ),
        ]
      )
      .filter(
        ([, technologies]) =>
          technologies.length
      );

  const toggleTechnology = (
    technology
  ) => {
    if (
      value.includes(technology)
    ) {
      onChange(
        value.filter(
          (item) =>
            item !== technology
        )
      );
    } else {
      onChange([
        ...value,
        technology,
      ]);
    }
  };

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() =>
          setOpen(
            (previous) =>
              !previous
          )
        }
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-left outline-none transition hover:border-[#14B8A6]/40 focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
      >

        <div className="flex min-w-0 flex-1 flex-wrap gap-2">

          {value.length ? (
            value
              .slice(0, 4)
              .map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-[#14B8A6]/15 bg-[#F0FDFA] px-2.5 py-1 text-xs font-semibold text-[#0F766E]"
                  >
                    {technology}
                  </span>
                )
              )
          ) : (
            <span className="text-sm text-[#94A3B8]">
              Select technologies...
            </span>
          )}

          {value.length > 4 && (
            <span className="rounded-lg bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#64748B]">
              +{value.length - 4}
            </span>
          )}

        </div>

        <ChevronDown
          size={18}
          className={`shrink-0 text-[#64748B] transition ${
            open
              ? "rotate-180"
              : ""
          }`}
        />

      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-[400px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl">

          <div className="border-b border-[#E2E8F0] p-3">

            <div className="relative">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
              />

              <input
                autoFocus
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search technologies..."
                className="h-10 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pl-9 pr-3 text-sm outline-none focus:border-[#312E81]"
              />

            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-3">

            {filteredGroups.map(
              ([group, technologies]) => (
                <div
                  key={group}
                  className="mb-5 last:mb-0"
                >

                  <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-[#64748B]">
                    {group}
                  </p>

                  <div className="grid gap-1 sm:grid-cols-2">

                    {technologies.map(
                      (technology) => {
                        const selected =
                          value.includes(
                            technology
                          );

                        return (
                          <button
                            type="button"
                            key={technology}
                            onClick={() =>
                              toggleTechnology(
                                technology
                              )
                            }
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                              selected
                                ? "bg-[#F0FDFA] text-[#0F766E]"
                                : "text-[#475569] hover:bg-[#F8FAFC]"
                            }`}
                          >

                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                selected
                                  ? "border-[#14B8A6] bg-[#14B8A6] text-white"
                                  : "border-[#CBD5E1] bg-white"
                              }`}
                            >
                              {selected && (
                                <Check
                                  size={
                                    13
                                  }
                                />
                              )}
                            </span>

                            <span className="font-medium">
                              {technology}
                            </span>

                          </button>
                        );
                      }
                    )}

                  </div>
                </div>
              )
            )}

            {!filteredGroups.length && (
              <p className="py-8 text-center text-sm text-[#64748B]">
                No technologies found.
              </p>
            )}

          </div>

          <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-[#F8FAFC] p-3">

            <button
              type="button"
              onClick={() =>
                onChange([])
              }
              className="text-xs font-bold text-[#64748B] transition hover:text-[#0F766E]"
            >
              Clear All
            </button>

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="rounded-lg bg-[#312E81] px-4 py-2 text-xs font-bold text-white hover:bg-[#1E1B4B]"
            >
              Done
            </button>

          </div>
        </div>
      )}

      <p className="mt-2 text-xs text-[#94A3B8]">
        {value.length}{" "}
        {value.length === 1
          ? "technology"
          : "technologies"}{" "}
        selected
      </p>
    </div>
  );
}

/* =========================================================
   IMAGE UPLOADER
========================================================= */

function ImageUploader({
  image,
  onChange,
}) {
  const inputRef = useRef(null);

  const processFile = (
    file
  ) => {
    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      alert(
        "Please upload a JPG, PNG or WEBP image."
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Image size must be less than 5MB."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      onChange(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (
    event
  ) => {
    event.preventDefault();

    const file =
      event.dataTransfer.files?.[0];

    processFile(file);
  };

  return (
    <div>

      {image ? (
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">

          <div className="relative h-56">

            <img
              src={image}
              alt="Project preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() =>
                onChange(null)
              }
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E1B4B]/80 text-white backdrop-blur transition hover:bg-[#1E1B4B]"
            >
              <X size={17} />
            </button>

          </div>

          <div className="flex items-center justify-between gap-3 p-3">

            <p className="truncate text-xs font-medium text-[#64748B]">
              Project image uploaded
            </p>

            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              className="shrink-0 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-bold text-[#312E81] hover:bg-[#F0FDFA]"
            >
              Change
            </button>

          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          onDragOver={(event) =>
            event.preventDefault()
          }
          onDrop={handleDrop}
          className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-5 py-12 text-center transition hover:border-[#14B8A6]/50 hover:bg-[#F0FDFA]/30"
        >

          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#0F766E]">
            <ImagePlus size={25} />
          </span>

          <p className="mt-4 text-sm font-bold text-[#1E1B4B]">
            Upload project image
          </p>

          <p className="mt-1 text-xs text-[#64748B]">
            Drag & drop or click to browse
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E]">
            <UploadCloud size={14} />
            JPG, PNG or WEBP • Max 5MB
          </span>

        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          processFile(
            event.target.files?.[0]
          );

          event.target.value = "";
        }}
      />
    </div>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  title,
  children,
}) {
  return (
    <section>

      <div className="mb-4 flex items-center gap-2.5">

        <div className="h-5 w-1 rounded-full bg-[#14B8A6]" />

        <h3 className="text-sm font-bold uppercase tracking-wide text-[#1E1B4B]">
          {title}
        </h3>

      </div>

      {children}
    </section>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  required = false,
  children,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-semibold text-[#475569]">

        {label}

        {required && (
          <span className="ml-1 text-[#14B8A6]">
            *
          </span>
        )}

      </span>

      {children}

    </label>
  );
}

/* =========================================================
   INPUT STYLES
========================================================= */

const inputClass =
  "h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10";

const textareaClass =
  "w-full resize-y rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10";