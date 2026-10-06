
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
   ========================================================= */


const GitHubIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.2 7.69 10.69.56.1.77-.24.77-.54v-1.91c-3.13.68-3.79-1.5-3.79-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.56.4.35.75 1.04.75 2.1v3.11c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.69C23.25 5.48 18.27.5 12 .5Z" />
  </svg>
);
const COLORS = {
  navy: "#1E1B4B",
  indigo: "#312E81",
  teal: "#0F766E",
  accent: "#14B8A6",
  accentLight: "#CCFBF1",
  background: "#F8FAFC",
  white: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  lightMuted: "#94A3B8",
  border: "#E2E8F0",
  softBorder: "#CBD5E1",
};

const STORAGE_KEY = "conexa_projects";

const PROJECT_TYPES = [
  "All",
  "Personal Project",
  "Team Project",
  "College Project",
  "Hackathon Project",
  "Open Source",
];

const STATUS_OPTIONS = ["All", "In Progress", "Completed", "On Hold"];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "progress", label: "Highest progress" },
  { value: "name", label: "Name A–Z" },
];

/* =========================================================
   DEFAULT PROJECTS
   ========================================================= */

const DEFAULT_PROJECTS = [
  {
    id: "wanderlust-default",
    name: "WanderLust",
    category: "Full Stack",
    status: "Completed",
    year: "2026",
    role: "Full Stack Developer",
    type: "Personal Project",
    progress: 100,
    shortDescription:
      "A full-stack travel platform for discovering and sharing memorable destinations.",
    description:
      "WanderLust is a full-stack travel platform where users can discover destinations, create listings, share experiences, and interact with travel content through a modern web interface.",
    contribution:
      "Designed and developed the full application including authentication, backend APIs, database integration, image uploads, responsive UI, and deployment.",
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
      "Create and manage listings",
      "Image upload and cloud storage",
      "Review and rating system",
      "Responsive interface",
      "Protected routes",
    ],
    github: "https://github.com/Tenali04/Wanderlust",
    live: "https://wanderlust-l51x.onrender.com",
    profile: "https://github.com/Tenali04",
    gradient: "from-[#1E1B4B] via-[#312E81] to-[#0F766E]",
    custom: false,
  },
  {
    id: "conexa-default",
    name: "CONEXA",
    category: "Collaborative",
    status: "In Progress",
    year: "2026",
    role: "Frontend Developer",
    type: "Team Project",
    progress: 75,
    shortDescription:
      "A student collaboration platform for finding teammates, building projects, and showcasing work.",
    description:
      "CONEXA is a collaborative platform designed to help students discover compatible teammates, build project teams, manage projects, and showcase their technical work in one place.",
    contribution:
      "Worked on frontend development, teammate discovery, project showcase functionality, responsive interfaces, and integration of student-focused project features.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    features: [
      "Find compatible teammates",
      "Student profiles",
      "Project showcase",
      "Team collaboration",
      "Project management",
      "Responsive dashboard",
    ],
    github: "https://github.com/VedikaMamidwar/Conexa-team-finder.git",
    live: null,
    profile: "https://github.com/Tenali04",
    gradient: "from-[#1E1B4B] via-[#312E81] to-[#0F766E]",
    custom: false,
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
   HELPERS
   ========================================================= */

const createEmptyForm = () => ({
  name: "",
  category: "Web Development",
  status: "In Progress",
  year: new Date().getFullYear().toString(),
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
  image: "",
});

const readStoredProjects = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.map((project) => ({
      ...project,
      custom: true,
    }));
  } catch (error) {
    console.error("Unable to read saved projects:", error);
    return [];
  }
};

const saveProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Unable to save projects:", error);
  }
};

const normalizeFeatures = (features) => {
  if (Array.isArray(features)) return features;

  if (!features) return [];

  return String(features)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function Projects() {
  const navigate = useNavigate();

  const [customProjects, setCustomProjects] = useState(readStoredProjects);
  const [selectedProject, setSelectedProject] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [form, setForm] = useState(createEmptyForm);
  const [formError, setFormError] = useState("");

  const allProjects = useMemo(
    () => [...DEFAULT_PROJECTS, ...customProjects],
    [customProjects]
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = allProjects.filter((project) => {
      const features = normalizeFeatures(project.features);

      const searchableText = [
        project.name,
        project.category,
        project.status,
        project.role,
        project.type,
        project.shortDescription,
        project.description,
        project.contribution,
        ...(project.stack || []),
        ...features,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesType =
        typeFilter === "All" || project.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "oldest") {
        return Number(a.year || 0) - Number(b.year || 0);
      }

      if (sortBy === "progress") {
        return Number(b.progress || 0) - Number(a.progress || 0);
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return Number(b.year || 0) - Number(a.year || 0);
    });
  }, [
    allProjects,
    search,
    statusFilter,
    typeFilter,
    sortBy,
  ]);

  const stats = useMemo(() => {
    const technologies = new Set();

    allProjects.forEach((project) => {
      (project.stack || []).forEach((technology) =>
        technologies.add(technology)
      );
    });

    return {
      total: allProjects.length,
      completed: allProjects.filter(
        (project) => project.status === "Completed"
      ).length,
      inProgress: allProjects.filter(
        (project) => project.status === "In Progress"
      ).length,
      technologies: technologies.size,
    };
  }, [allProjects]);

  const openCreateModal = () => {
    setEditingProjectId(null);
    setForm(createEmptyForm());
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProjectId(project.id);

    setForm({
      name: project.name || "",
      category: project.category || "Web Development",
      status: project.status || "In Progress",
      year: project.year || new Date().getFullYear().toString(),
      role: project.role || "",
      type: project.type || "Personal Project",
      progress: Number(project.progress || 0),
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      contribution: project.contribution || "",
      stack: project.stack || [],
      features: normalizeFeatures(project.features).join("\n"),
      github: project.github || "",
      live: project.live || "",
      image: project.image || "",
    });

    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProjectId(null);
    setForm(createEmptyForm());
    setFormError("");
  };

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const saveProject = () => {
    if (!form.name.trim()) {
      setFormError("Please enter a project name.");
      return;
    }

    if (!form.shortDescription.trim()) {
      setFormError("Please add a short project description.");
      return;
    }

    if (!form.description.trim()) {
      setFormError("Please add a detailed project description.");
      return;
    }

    if (!form.stack.length) {
      setFormError("Please select at least one technology.");
      return;
    }

    const projectData = {
      id:
        editingProjectId ||
        `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: form.name.trim(),
      category: form.category.trim() || "Web Development",
      status: form.status,
      year: form.year,
      role: form.role.trim() || "Developer",
      type: form.type,
      progress: Math.min(100, Math.max(0, Number(form.progress) || 0)),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      contribution:
        form.contribution.trim() || "Worked on the development of this project.",
      stack: form.stack,
      features: normalizeFeatures(form.features),
      github: form.github.trim(),
      live: form.live.trim(),
      image: form.image || "",
      profile: "https://github.com/Tenali04",
      gradient: "from-[#1E1B4B] via-[#312E81] to-[#0F766E]",
      custom: true,
    };

    let updatedProjects;

    if (editingProjectId) {
      updatedProjects = customProjects.map((project) =>
        project.id === editingProjectId ? projectData : project
      );
    } else {
      updatedProjects = [...customProjects, projectData];
    }

    setCustomProjects(updatedProjects);
    saveProjects(updatedProjects);

    if (selectedProject?.id === editingProjectId) {
      setSelectedProject(projectData);
    }

    closeModal();
  };

  const deleteProject = (projectId) => {
    const project = customProjects.find(
      (item) => item.id === projectId
    );

    if (!project) return;

    const confirmed = window.confirm(
      `Delete "${project.name}" from your projects?`
    );

    if (!confirmed) return;

    const updatedProjects = customProjects.filter(
      (item) => item.id !== projectId
    );

    setCustomProjects(updatedProjects);
    saveProjects(updatedProjects);

    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setSortBy("newest");
  };

  if (selectedProject) {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
        onEdit={
          selectedProject.custom
            ? () => openEditModal(selectedProject)
            : undefined
        }
        onDelete={
          selectedProject.custom
            ? () => deleteProject(selectedProject.id)
            : undefined
        }
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
              aria-label="Go back"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Layers3
                  size={19}
                  className="hidden text-[#0F766E] sm:block"
                />
                <h1 className="truncate text-lg font-bold text-[#1E1B4B] sm:text-xl">
                  My Projects
                </h1>
              </div>

              <p className="hidden text-sm text-[#64748B] sm:block">
                Showcase your technical work and achievements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Tenali04"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-[#E2E8F0] px-3 py-2 text-sm font-semibold text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF] sm:flex"
            >
              <GitHubIcon size={17} />
              GitHub
            </a>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="hidden rounded-xl border border-[#E2E8F0] px-3 py-2 text-sm font-semibold text-[#1E1B4B] transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC] md:block"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="flex items-center gap-2 rounded-xl bg-[#312E81] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1E1B4B] hover:shadow-md"
            >
              <Plus size={18} />
              <span>Add Project</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#0F766E]" />

          <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_320px] lg:p-9">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/20 bg-[#CCFBF1] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0F766E]">
                <BriefcaseBusiness size={14} />
                Student Portfolio
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl">
                Showcase what you have built.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                Keep your best academic, personal, hackathon, and team
                projects in one professional portfolio. Highlight your
                skills, contribution, technologies, and project progress.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E1B4B] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#312E81]"
                >
                  <Plus size={17} />
                  Add your project
                </button>

                <a
                  href="https://github.com/Tenali04"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-bold text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
                >
                  <GitHubIcon size={17} />
                  View GitHub
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Portfolio overview
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <StatCard
                  value={stats.total}
                  label="Projects"
                  icon={<Layers3 size={17} />}
                />

                <StatCard
                  value={stats.completed}
                  label="Completed"
                  icon={<CheckCircle2 size={17} />}
                />

                <StatCard
                  value={stats.inProgress}
                  label="In progress"
                  icon={<BriefcaseBusiness size={17} />}
                />

                <StatCard
                  value={stats.technologies}
                  label="Technologies"
                  icon={<LinkIcon size={17} />}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            FILTERS
        =================================================== */}

        <section className="mt-7 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-bold text-[#1E1B4B]">
                  Your project portfolio
                </h3>
                <p className="mt-1 text-sm text-[#64748B]">
                  Search, filter, and organize your work.
                </p>
              </div>

              {(search ||
                statusFilter !== "All" ||
                typeFilter !== "All" ||
                sortBy !== "newest") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="self-start text-sm font-semibold text-[#0F766E] hover:text-[#1E1B4B]"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_180px_190px_170px]">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search projects, skills, technologies..."
                  className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-[#312E81]/10"
                />
              </div>

              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={STATUS_OPTIONS}
                label="Status"
              />

              <FilterSelect
                value={typeFilter}
                onChange={setTypeFilter}
                options={PROJECT_TYPES}
                label="Project type"
              />

              <FilterSelect
                value={sortBy}
                onChange={setSortBy}
                options={SORT_OPTIONS}
                label="Sort"
                objectOptions
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            PROJECT GRID
        =================================================== */}

        <section className="mt-7">
          {filteredProjects.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#64748B]">
                  Showing{" "}
                  <span className="text-[#1E1B4B]">
                    {filteredProjects.length}
                  </span>{" "}
                  {filteredProjects.length === 1 ? "project" : "projects"}
                </p>
              </div>

              <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onView={() => setSelectedProject(project)}
                    onEdit={
                      project.custom
                        ? () => openEditModal(project)
                        : undefined
                    }
                    onDelete={
                      project.custom
                        ? () => deleteProject(project.id)
                        : undefined
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyProjects
              hasFilters={
                Boolean(search) ||
                statusFilter !== "All" ||
                typeFilter !== "All"
              }
              onClear={clearFilters}
              onAdd={openCreateModal}
            />
          )}
        </section>
      </main>

      {/* =====================================================
          PROJECT FORM MODAL
      ===================================================== */}

      {modalOpen && (
        <ProjectFormModal
          form={form}
          error={formError}
          editing={Boolean(editingProjectId)}
          onChange={updateForm}
          onClose={closeModal}
          onSave={saveProject}
        />
      )}
    </div>
  );
}

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({ value, label, icon }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="text-[#0F766E]">{icon}</span>
        <span className="text-xl font-extrabold text-[#1E1B4B]">
          {value}
        </span>
      </div>

      <p className="mt-1 text-xs font-semibold text-[#64748B]">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   FILTER SELECT
   ========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
  label,
  objectOptions = false,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 pr-9 text-sm font-semibold text-[#1E1B4B] outline-none transition focus:border-[#312E81] focus:bg-white focus:ring-4 focus:ring-[#312E81]/10"
      >
        {options.map((option) => {
          const optionValue = objectOptions ? option.value : option;
          const optionLabel = objectOptions ? option.label : option;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
      />
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
  const features = normalizeFeatures(project.features);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-lg">
      {/* Project visual */}
      <div className="relative h-48 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} project`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.gradient || "from-[#1E1B4B] via-[#312E81] to-[#0F766E]"}`}
          >
            <div className="text-center text-white">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                <span className="text-xl font-extrabold">
                  {getInitials(project.name)}
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold text-white/90">
                {project.category}
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4">
          <ProjectStatus status={project.status} />
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-[#1E1B4B]/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-[#0F766E]">
              {project.category}
            </p>

            <h3 className="mt-1.5 line-clamp-1 text-xl font-extrabold text-[#1E1B4B]">
              {project.name}
            </h3>
          </div>

          {project.custom && (
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={onEdit}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#312E81] transition hover:bg-[#EEF2FF]"
                aria-label={`Edit ${project.name}`}
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#0F766E] transition hover:bg-[#CCFBF1]"
                aria-label={`Delete ${project.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[#64748B]">
          <span className="rounded-lg bg-[#F8FAFC] px-2.5 py-1">
            {project.role}
          </span>

          <span className="rounded-lg bg-[#F8FAFC] px-2.5 py-1">
            {project.type}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 min-h-[66px] text-sm leading-6 text-[#64748B]">
          {project.shortDescription}
        </p>

        {/* Technology preview */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
            Technologies
          </p>

          <div className="flex min-h-[52px] flex-wrap content-start gap-1.5">
            {(project.stack || []).slice(0, 5).map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-semibold text-[#312E81]"
              >
                {technology}
              </span>
            ))}

            {project.stack?.length > 5 && (
              <span className="rounded-lg bg-[#CCFBF1] px-2.5 py-1 text-xs font-bold text-[#0F766E]">
                +{project.stack.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B]">
              Project progress
            </span>

            <span className="text-xs font-extrabold text-[#1E1B4B]">
              {project.progress || 0}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#312E81] to-[#0F766E] transition-all"
              style={{
                width: `${Math.min(100, Math.max(0, Number(project.progress) || 0))}%`,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center gap-2 pt-5">
          <button
            type="button"
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#312E81] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E1B4B]"
          >
            View details
            <ChevronRight size={16} />
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
              aria-label={`Open ${project.name} GitHub`}
            >
              <GitHubIcon size={17} />
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#0F766E] transition hover:border-[#0F766E] hover:bg-[#CCFBF1]"
              aria-label={`Open ${project.name} live website`}
            >
              <ExternalLink size={17} />
            </a>
          )}
        </div>

        {features.length > 0 && (
          <p className="mt-3 text-center text-[11px] font-semibold text-[#94A3B8]">
            {features.length} key {features.length === 1 ? "feature" : "features"}
          </p>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   PROJECT STATUS
   ========================================================= */

function ProjectStatus({ status }) {
  const styles = {
    Completed:
      "border-[#14B8A6]/30 bg-[#CCFBF1] text-[#0F766E]",
    "In Progress":
      "border-[#312E81]/30 bg-[#EEF2FF] text-[#312E81]",
    "On Hold":
      "border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold backdrop-blur ${
        styles[status] || styles["In Progress"]
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Completed"
            ? "bg-[#14B8A6]"
            : status === "On Hold"
              ? "bg-[#94A3B8]"
              : "bg-[#312E81]"
        }`}
      />

      {status}
    </span>
  );
}

/* =========================================================
   PROJECT DETAILS
   ========================================================= */

function ProjectDetails({
  project,
  onBack,
  onEdit,
  onDelete,
}) {
  const features = normalizeFeatures(project.features);

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm font-bold text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
          >
            <ArrowLeft size={17} />
            <span>Back to projects</span>
          </button>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] px-3.5 py-2.5 text-sm font-bold text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
              >
                <Pencil size={16} />
                <span className="hidden sm:inline">Edit</span>
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#0F766E] transition hover:border-[#0F766E] hover:bg-[#CCFBF1]"
                aria-label="Delete project"
              >
                <Trash2 size={17} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="relative min-h-[300px] overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.name} project`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  project.gradient ||
                  "from-[#1E1B4B] via-[#312E81] to-[#0F766E]"
                }`}
              />
            )}

            <div className="absolute inset-0 bg-[#1E1B4B]/55" />

            <div className="relative flex min-h-[300px] flex-col justify-end p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <ProjectStatus status={project.status} />

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  {project.year}
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  {project.type}
                </span>
              </div>

              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-[#CCFBF1]">
                {project.category}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                {project.name}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85 sm:text-base">
                {project.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#1E1B4B] transition hover:bg-[#CCFBF1]"
                  >
                    <GitHubIcon size={17} />
                    GitHub
                    <ExternalLink size={14} />
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    <ExternalLink size={17} />
                    Live project
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <DetailSection title="About the project">
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                {project.description}
              </p>
            </DetailSection>

            <DetailSection title="My contribution">
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                {project.contribution}
              </p>
            </DetailSection>

            <DetailSection title="Technology stack">
              <div className="flex flex-wrap gap-2">
                {(project.stack || []).map((technology) => (
                  <span
                    key={technology}
                    className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm font-semibold text-[#312E81]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </DetailSection>

            {features.length > 0 && (
              <DetailSection title="Key features">
                <div className="grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#CCFBF1] text-[#0F766E]">
                        <Check size={14} strokeWidth={3} />
                      </span>

                      <span className="text-sm font-semibold leading-5 text-[#1E1B4B]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}
          </div>

          <aside className="space-y-6">
            <DetailSection title="Project snapshot">
              <div className="space-y-4">
                <InfoItem label="Role" value={project.role} />
                <InfoItem label="Project type" value={project.type} />
                <InfoItem label="Category" value={project.category} />
                <InfoItem label="Year" value={project.year} />
              </div>
            </DetailSection>

            <DetailSection title="Project progress">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#64748B]">
                    Completion
                  </span>

                  <span className="text-lg font-extrabold text-[#1E1B4B]">
                    {project.progress || 0}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#312E81] to-[#0F766E]"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, Number(project.progress) || 0)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </DetailSection>

            <DetailSection title="Project links">
              <div className="space-y-2">
                {project.github && (
                  <ProjectLink
                    href={project.github}
                    icon={<GitHubIcon size={17} />}
                    label="Source code"
                  />
                )}

                {project.live && (
                  <ProjectLink
                    href={project.live}
                    icon={<ExternalLink size={17} />}
                    label="Live deployment"
                  />
                )}

                {project.profile && (
                  <ProjectLink
                    href={project.profile}
                    icon={<LinkIcon size={17} />}
                    label="Developer profile"
                  />
                )}
              </div>
            </DetailSection>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   DETAIL SECTION
   ========================================================= */

function DetailSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-extrabold text-[#1E1B4B]">
        {title}
      </h2>

      <div className="mt-4">{children}</div>
    </section>
  );
}

/* =========================================================
   INFO ITEM
   ========================================================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#1E1B4B]">
        {value || "Not specified"}
      </p>
    </div>
  );
}

/* =========================================================
   PROJECT LINK
   ========================================================= */

function ProjectLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-3 text-sm font-bold text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
    >
      <span className="flex items-center gap-2.5">
        {icon}
        {label}
      </span>

      <ExternalLink size={14} />
    </a>
  );
}

/* =========================================================
   EMPTY PROJECTS
   ========================================================= */

function EmptyProjects({
  hasFilters,
  onClear,
  onAdd,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E]">
        <Layers3 size={25} />
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-[#1E1B4B]">
        {hasFilters ? "No projects found" : "Your portfolio is empty"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
        {hasFilters
          ? "Try changing your search or filters to find the project you are looking for."
          : "Add your first project to start building a professional student portfolio."}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-bold text-[#312E81] transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
          >
            Clear filters
          </button>
        )}

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-[#312E81] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E1B4B]"
        >
          <Plus size={17} />
          Add project
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   FORM MODAL
   ========================================================= */

function ProjectFormModal({
  form,
  error,
  editing,
  onChange,
  onClose,
  onSave,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1B4B]/60 p-3 backdrop-blur-sm sm:p-5">
      <div
        className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-title"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              Student portfolio
            </p>

            <h2
              id="project-form-title"
              className="mt-1 text-xl font-extrabold text-[#1E1B4B]"
            >
              {editing ? "Edit project" : "Add a project"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#1E1B4B]"
            aria-label="Close project form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {error && (
            <div className="mb-5 rounded-xl border border-[#14B8A6]/30 bg-[#CCFBF1] px-4 py-3 text-sm font-semibold text-[#0F766E]">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <FormSection
              number="01"
              title="Basic information"
              description="Tell people what this project is."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Project name" required className="sm:col-span-2">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      onChange("name", event.target.value)
                    }
                    placeholder="e.g. Campus Connect"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Category">
                  <input
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      onChange("category", event.target.value)
                    }
                    placeholder="e.g. Full Stack"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Year">
                  <input
                    type="number"
                    min="2000"
                    max="2100"
                    value={form.year}
                    onChange={(event) =>
                      onChange("year", event.target.value)
                    }
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Your role">
                  <input
                    type="text"
                    value={form.role}
                    onChange={(event) =>
                      onChange("role", event.target.value)
                    }
                    placeholder="e.g. Frontend Developer"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Project type">
                  <select
                    value={form.type}
                    onChange={(event) =>
                      onChange("type", event.target.value)
                    }
                    className={inputClass}
                  >
                    {PROJECT_TYPES.filter((item) => item !== "All").map(
                      (type) => (
                        <option key={type}>{type}</option>
                      )
                    )}
                  </select>
                </FormField>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      onChange("status", event.target.value)
                    }
                    className={inputClass}
                  >
                    {STATUS_OPTIONS.filter((item) => item !== "All").map(
                      (status) => (
                        <option key={status}>{status}</option>
                      )
                    )}
                  </select>
                </FormField>
              </div>
            </FormSection>

            <FormSection
              number="02"
              title="Project image"
              description="Add an optional project image or screenshot."
            >
              <ImageUploader
                value={form.image}
                onChange={(value) => onChange("image", value)}
              />
            </FormSection>

            <FormSection
              number="03"
              title="Project description"
              description="Explain what you built and what you contributed."
            >
              <div className="space-y-4">
                <FormField
                  label="Short description"
                  required
                  hint="Keep this concise. It appears on the project card."
                >
                  <textarea
                    value={form.shortDescription}
                    onChange={(event) =>
                      onChange("shortDescription", event.target.value)
                    }
                    rows={3}
                    maxLength={220}
                    placeholder="Briefly describe what your project does..."
                    className={textareaClass}
                  />
                </FormField>

                <FormField label="Detailed description" required>
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      onChange("description", event.target.value)
                    }
                    rows={5}
                    placeholder="Describe the purpose, users, problem solved, and how the project works..."
                    className={textareaClass}
                  />
                </FormField>

                <FormField label="Your contribution">
                  <textarea
                    value={form.contribution}
                    onChange={(event) =>
                      onChange("contribution", event.target.value)
                    }
                    rows={4}
                    placeholder="Explain your responsibilities, features you developed, and technical work..."
                    className={textareaClass}
                  />
                </FormField>
              </div>
            </FormSection>

            <FormSection
              number="04"
              title="Technology"
              description="Select the technologies you used."
            >
              <TechnologyMultiSelect
                selected={form.stack}
                onChange={(value) => onChange("stack", value)}
              />
            </FormSection>

            <FormSection
              number="05"
              title="Key features"
              description="Add the most important project features, one per line."
            >
              <textarea
                value={form.features}
                onChange={(event) =>
                  onChange("features", event.target.value)
                }
                rows={5}
                placeholder={`User authentication
Responsive dashboard
Project search
Team collaboration`}
                className={textareaClass}
              />
            </FormSection>

            <FormSection
              number="06"
              title="Project links"
              description="Help recruiters and teammates explore your work."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="GitHub repository">
                  <div className="relative">
                    <GitHubIcon
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                    />

                    <input
                      type="url"
                      value={form.github}
                      onChange={(event) =>
                        onChange("github", event.target.value)
                      }
                      placeholder="https://github.com/..."
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </FormField>

                <FormField label="Live deployment">
                  <div className="relative">
                    <ExternalLink
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                    />

                    <input
                      type="url"
                      value={form.live}
                      onChange={(event) =>
                        onChange("live", event.target.value)
                      }
                      placeholder="https://your-project.com"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </FormField>
              </div>
            </FormSection>

            <FormSection
              number="07"
              title="Project progress"
              description="Show how much of the project is currently complete."
            >
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1E1B4B]">
                      Completion
                    </p>

                    <p className="mt-1 text-xs text-[#64748B]">
                      Update this whenever your project progresses.
                    </p>
                  </div>

                  <span className="rounded-xl bg-[#CCFBF1] px-3 py-1.5 text-sm font-extrabold text-[#0F766E]">
                    {form.progress}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.progress}
                  onChange={(event) =>
                    onChange("progress", Number(event.target.value))
                  }
                  className="w-full accent-[#312E81]"
                />

                <div className="mt-2 flex justify-between text-xs font-semibold text-[#94A3B8]">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </FormSection>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-bold text-[#64748B] transition hover:border-[#CBD5E1] hover:text-[#1E1B4B]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#312E81] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E1B4B]"
          >
            <Check size={17} />
            {editing ? "Save changes" : "Add project"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FORM SECTION
   ========================================================= */

function FormSection({
  number,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white">
      <div className="border-b border-[#E2E8F0] px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1E1B4B] text-xs font-extrabold text-white">
            {number}
          </span>

          <div>
            <h3 className="font-extrabold text-[#1E1B4B]">
              {title}
            </h3>

            <p className="mt-0.5 text-xs leading-5 text-[#64748B]">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

/* =========================================================
   FORM FIELD
   ========================================================= */

function FormField({
  label,
  required = false,
  hint,
  children,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-bold text-[#1E1B4B]">
        {label}

        {required && (
          <span className="ml-1 text-[#0F766E]">*</span>
        )}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs text-[#94A3B8]">
          {hint}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#312E81] focus:ring-4 focus:ring-[#312E81]/10";

const textareaClass =
  "w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#312E81] focus:ring-4 focus:ring-[#312E81]/10 resize-y";

/* =========================================================
   TECHNOLOGY MULTI SELECT
   ========================================================= */

function TechnologyMultiSelect({
  selected,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const wrapperRef = useRef(null);

  const technologies = Object.entries(TECHNOLOGY_GROUPS)
    .flatMap(([group, items]) =>
      items.map((item) => ({
        group,
        item,
      }))
    )
    .filter(({ item }) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

  const toggleTechnology = (technology) => {
    if (selected.includes(technology)) {
      onChange(selected.filter((item) => item !== technology));
    } else {
      onChange([...selected, technology]);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-left transition hover:border-[#CBD5E1] focus:border-[#312E81]"
      >
        <div className="flex flex-wrap gap-1.5">
          {selected.length ? (
            selected.slice(0, 5).map((technology) => (
              <span
                key={technology}
                className="rounded-lg bg-[#EEF2FF] px-2.5 py-1 text-xs font-bold text-[#312E81]"
              >
                {technology}
              </span>
            ))
          ) : (
            <span className="text-sm text-[#94A3B8]">
              Select technologies
            </span>
          )}

          {selected.length > 5 && (
            <span className="rounded-lg bg-[#CCFBF1] px-2.5 py-1 text-xs font-bold text-[#0F766E]">
              +{selected.length - 5}
            </span>
          )}
        </div>

        <ChevronDown
          size={17}
          className={`shrink-0 text-[#64748B] transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">
          <div className="border-b border-[#E2E8F0] p-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />

              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search technologies..."
                className={`${inputClass} pl-9`}
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto p-3">
            {technologies.length > 0 ? (
              <div className="space-y-4">
                {Object.entries(
                  technologies.reduce((groups, item) => {
                    if (!groups[item.group]) {
                      groups[item.group] = [];
                    }

                    groups[item.group].push(item.item);
                    return groups;
                  }, {})
                ).map(([group, items]) => (
                  <div key={group}>
                    <p className="mb-2 px-1 text-xs font-extrabold uppercase tracking-wide text-[#94A3B8]">
                      {group}
                    </p>

                    <div className="grid gap-1 sm:grid-cols-2">
                      {items.map((technology) => {
                        const isSelected =
                          selected.includes(technology);

                        return (
                          <button
                            key={technology}
                            type="button"
                            onClick={() =>
                              toggleTechnology(technology)
                            }
                            className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                              isSelected
                                ? "bg-[#CCFBF1] text-[#0F766E]"
                                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E1B4B]"
                            }`}
                          >
                            {technology}

                            {isSelected && (
                              <Check size={15} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-[#94A3B8]">
                No technologies found.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5">
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs font-bold text-[#0F766E] hover:text-[#1E1B4B]"
            >
              Clear all
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="rounded-lg bg-[#312E81] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1E1B4B]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   IMAGE UPLOADER
   ========================================================= */

function ImageUploader({
  value,
  onChange,
}) {
  const inputRef = useRef(null);

  const handleFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please choose an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {value ? (
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0]">
          <div className="relative h-56">
            <img
              src={value}
              alt="Project preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E1B4B]/85 text-white backdrop-blur transition hover:bg-[#312E81]"
              aria-label="Remove project image"
            >
              <X size={17} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#F8FAFC] p-3">
            <p className="text-xs font-semibold text-[#64748B]">
              Project image added
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs font-bold text-[#312E81] hover:text-[#0F766E]"
            >
              Change image
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-5 text-center transition hover:border-[#312E81] hover:bg-[#EEF2FF]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
            <UploadCloud size={22} />
          </div>

          <p className="mt-4 text-sm font-bold text-[#1E1B4B]">
            Upload project image
          </p>

          <p className="mt-1 text-xs text-[#64748B]">
            JPG, PNG, or WebP up to 5 MB
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#312E81]">
            <ImagePlus size={14} />
            Choose image
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}






