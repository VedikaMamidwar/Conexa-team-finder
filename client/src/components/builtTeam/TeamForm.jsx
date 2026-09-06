import { useState } from "react";
import {
  Users,
  Trophy,
  BookOpen,
  GraduationCap,
  FileText,
  Sparkles,
  Shield,
  Plus,
  X,
  Check,
  ChevronRight,
  Code2,
  BriefcaseBusiness,
  Eye,
  Lock,
  Rocket,
} from "lucide-react";

export default function TeamForm() {
  const [form, setForm] = useState({
    teamName: "",
    hackathon: "",
    projectTitle: "",
    description: "",
    college: "",
    branch: "",
    year: "",
    teamSize: 4,
    visibility: "Public",
    rules: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [lookingFor, setLookingFor] = useState([]);
  const [created, setCreated] = useState(false);

  const techOptions = [
    "MERN",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "Java",
    "AI",
    "Flutter",
    "DevOps",
  ];

  const roleOptions = [
    "Frontend",
    "Backend",
    "UI/UX",
    "AI Engineer",
    "ML Engineer",
    "Tester",
    "Presentation",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  const toggleTech = (tech) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter((item) => item !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  const toggleRole = (role) => {
    if (lookingFor.includes(role)) {
      setLookingFor(lookingFor.filter((item) => item !== role));
    } else {
      setLookingFor([...lookingFor, role]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...form,
      skills,
      techStack,
      lookingFor,
    });

    setCreated(true);

    setTimeout(() => {
      setCreated(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-indigo-600">
            <div className="rounded-lg bg-indigo-100 p-2">
              <Users size={20} />
            </div>

            <span className="text-sm font-bold uppercase tracking-wider">
              TeamBuild
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Build your dream team
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Create a team, showcase your skills, and find the perfect
            teammates for your next hackathon or project.
          </p>
        </div>

        {/* Success message */}
        {created && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 shadow-sm">
            <div className="rounded-full bg-emerald-500 p-1 text-white">
              <Check size={16} />
            </div>

            <div>
              <p className="font-bold">Team created successfully!</p>
              <p className="text-sm">
                Your team information has been saved.
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-8 xl:grid-cols-3">
          {/* ================= LEFT FORM ================= */}
          <div className="xl:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Section 1 */}
              <section className="border-b border-slate-100 p-6 md:p-8">
                <SectionHeading
                  icon={<Users size={20} />}
                  title="Team Information"
                  description="Tell people what your team is all about."
                />

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Team Name"
                    name="teamName"
                    value={form.teamName}
                    onChange={handleChange}
                    placeholder="e.g. Code Warriors"
                    required
                  />

                  <InputField
                    label="Hackathon"
                    name="hackathon"
                    value={form.hackathon}
                    onChange={handleChange}
                    placeholder="e.g. Smart India Hackathon"
                    required
                  />

                  <div className="md:col-span-2">
                    <InputField
                      label="Project Title"
                      name="projectTitle"
                      value={form.projectTitle}
                      onChange={handleChange}
                      placeholder="e.g. AI Health Assistant"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Project Description
                    </label>

                    <textarea
                      rows="5"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe your idea, problem statement and what your team wants to build..."
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="border-b border-slate-100 p-6 md:p-8">
                <SectionHeading
                  icon={<Sparkles size={20} />}
                  title="Skills & Technology"
                  description="Choose the skills and technologies your team needs."
                />

                {/* Skills */}
                <div className="mt-7">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Required Skills
                  </label>

                  <div className="flex gap-2">
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      placeholder="e.g. Computer Vision"
                      className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />

                    <button
                      type="button"
                      onClick={addSkill}
                      className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-95"
                    >
                      <Plus size={18} />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>

                  <div className="mt-3 flex min-h-10 flex-wrap gap-2">
                    {skills.length === 0 ? (
                      <p className="text-sm text-slate-400">
                        Add skills your teammates should have.
                      </p>
                    ) : (
                      skills.map((skill) => (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => removeSkill(skill)}
                          className="group flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-red-50 hover:text-red-600"
                        >
                          {skill}
                          <X
                            size={14}
                            className="transition group-hover:rotate-90"
                          />
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mt-8">
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Tech Stack
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {techOptions.map((tech) => {
                      const selected = techStack.includes(tech);

                      return (
                        <button
                          type="button"
                          key={tech}
                          onClick={() => toggleTech(tech)}
                          className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                            selected
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
                          }`}
                        >
                          {selected && <Check size={15} />}
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="border-b border-slate-100 p-6 md:p-8">
                <SectionHeading
                  icon={<GraduationCap size={20} />}
                  title="Team Details"
                  description="Help potential teammates understand your background."
                />

                <div className="mt-7 grid gap-5 md:grid-cols-3">
                  <InputField
                    label="College"
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    placeholder="Your college"
                  />

                  <InputField
                    label="Branch"
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    placeholder="e.g. CSE"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Year
                    </label>

                    <select
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    >
                      <option value="">Select Year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Team Size
                  </label>

                  <div className="grid grid-cols-5 gap-2">
                    {[2, 3, 4, 5, 6].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() =>
                          setForm({
                            ...form,
                            teamSize: size,
                          })
                        }
                        className={`rounded-2xl border py-3 text-sm font-bold transition ${
                          Number(form.teamSize) === size
                            ? "border-indigo-500 bg-indigo-600 text-white shadow-md"
                            : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="border-b border-slate-100 p-6 md:p-8">
                <SectionHeading
                  icon={<BriefcaseBusiness size={20} />}
                  title="Who are you looking for?"
                  description="Select the roles you want to add to your team."
                />

                <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {roleOptions.map((role) => {
                    const selected = lookingFor.includes(role);

                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => toggleRole(role)}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                            selected
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selected && <Check size={13} />}
                        </div>

                        <span
                          className={`text-sm font-semibold ${
                            selected
                              ? "text-indigo-700"
                              : "text-slate-600"
                          }`}
                        >
                          {role}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Section 5 */}
              <section className="p-6 md:p-8">
                <SectionHeading
                  icon={<Shield size={20} />}
                  title="Privacy & Team Rules"
                  description="Control who can discover and join your team."
                />

                <div className="mt-7">
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Team Visibility
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <VisibilityCard
                      selected={form.visibility === "Public"}
                      title="Public"
                      description="Anyone can discover your team."
                      icon={<Eye size={20} />}
                      onClick={() =>
                        setForm({
                          ...form,
                          visibility: "Public",
                        })
                      }
                    />

                    <VisibilityCard
                      selected={form.visibility === "Private"}
                      title="Private"
                      description="Only invited members can join."
                      icon={<Lock size={20} />}
                      onClick={() =>
                        setForm({
                          ...form,
                          visibility: "Private",
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Team Rules
                  </label>

                  <textarea
                    rows="4"
                    name="rules"
                    value={form.rules}
                    onChange={handleChange}
                    placeholder="Example: Members should be available for weekend meetings..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:translate-y-0"
                >
                  <Rocket size={19} />
                  Create My Team
                  <ChevronRight size={18} />
                </button>
              </section>
            </form>
          </div>

          {/* ================= RIGHT PREVIEW ================= */}
          <aside className="xl:sticky xl:top-6 xl:h-fit">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Preview header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10" />

                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
                      <Trophy size={22} />
                    </div>

                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                      LIVE PREVIEW
                    </span>
                  </div>

                  <h2 className="text-2xl font-black">
                    {form.teamName || "Your Team"}
                  </h2>

                  <p className="mt-1 text-sm text-indigo-100">
                    {form.hackathon || "Your Hackathon"}
                  </p>
                </div>
              </div>

              {/* Preview body */}
              <div className="space-y-6 p-6">
                <PreviewItem
                  icon={<FileText size={18} />}
                  label="Project"
                  value={form.projectTitle || "Project title"}
                />

                <PreviewItem
                  icon={<Users size={18} />}
                  label="Team Size"
                  value={`${form.teamSize} Members`}
                />

                <PreviewItem
                  icon={<GraduationCap size={18} />}
                  label="Background"
                  value={
                    form.college
                      ? `${form.college}${form.branch ? ` • ${form.branch}` : ""}`
                      : "College information"
                  }
                />

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Required Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? (
                      skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400">
                        No skills added yet
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tech Stack
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {techStack.length > 0 ? (
                      techStack.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          <Code2 size={12} />
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400">
                        Choose technologies
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Looking For
                  </p>

                  {lookingFor.length > 0 ? (
                    <div className="space-y-2">
                      {lookingFor.map((role) => (
                        <div
                          key={role}
                          className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                        >
                          <div className="rounded-full bg-emerald-100 p-1 text-emerald-600">
                            <Check size={12} />
                          </div>
                          {role}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">
                      Select the roles you need
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Visibility
                    </span>

                    <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                      {form.visibility === "Public" ? (
                        <Eye size={15} />
                      ) : (
                        <Lock size={15} />
                      )}
                      {form.visibility}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip card */}
            <div className="mt-5 rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
              <div className="flex gap-3">
                <div className="rounded-xl bg-white p-2 text-indigo-600 shadow-sm">
                  <Sparkles size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-indigo-900">
                    Build a stronger team
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-indigo-700">
                    Add specific skills and roles so the right teammates can
                    discover your team.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SectionHeading({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
        {icon}
      </div>

      <div>
        <h2 className="text-lg font-black text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}

function VisibilityCard({
  selected,
  title,
  description,
  icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-indigo-500 bg-indigo-50"
          : "border-slate-200 bg-white hover:border-indigo-300"
      }`}
    >
      <div
        className={`rounded-xl p-3 ${
          selected
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p
          className={`text-sm font-bold ${
            selected ? "text-indigo-700" : "text-slate-700"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      {selected && (
        <div className="rounded-full bg-indigo-600 p-1 text-white">
          <Check size={13} />
        </div>
      )}
    </button>
  );
}

function PreviewItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-slate-100 p-2 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-bold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}