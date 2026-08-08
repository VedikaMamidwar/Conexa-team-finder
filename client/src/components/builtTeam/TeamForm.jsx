import { useState } from "react";
import {
  Users,
  Trophy,
  BookOpen,
  GraduationCap,
  FileText,
  Sparkles,
  Shield,
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
    if (
      skillInput.trim() &&
      !skills.includes(skillInput.trim())
    ) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const toggleTech = (tech) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter((t) => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  const toggleRole = (role) => {
    if (lookingFor.includes(role)) {
      setLookingFor(
        lookingFor.filter((r) => r !== role)
      );
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

    alert("Team Created Successfully");
  };

  return (
    <div className="grid xl:grid-cols-3 gap-8">

      {/* Left Form */}

      <div className="xl:col-span-2 bg-white rounded-3xl shadow-lg p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="font-semibold">
              Team Name
            </label>

            <input
              type="text"
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
              placeholder="Code Warriors"
              className="w-full mt-2 border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="font-semibold">
              Hackathon
            </label>

            <input
              type="text"
              name="hackathon"
              value={form.hackathon}
              onChange={handleChange}
              placeholder="Smart India Hackathon"
              className="w-full mt-2 border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="font-semibold">
              Project Title
            </label>

            <input
              type="text"
              name="projectTitle"
              value={form.projectTitle}
              onChange={handleChange}
              placeholder="AI Health Assistant"
              className="w-full mt-2 border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-4"
            />
          </div>

          {/* Skills */}

          <div>

            <label className="font-semibold">
              Required Skills
            </label>

            <div className="flex gap-3 mt-3">

              <input
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                placeholder="React"
                className="flex-1 border rounded-xl p-3"
              />

              <button
                type="button"
                onClick={addSkill}
                className="bg-indigo-600 text-white px-6 rounded-xl"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

              {skills.map((skill) => (
                <span
                  key={skill}
                  onClick={() =>
                    removeSkill(skill)
                  }
                  className="cursor-pointer px-4 py-2 rounded-full bg-cyan-100 text-cyan-700"
                >
                  {skill} ✕
                </span>
              ))}

            </div>

          </div>

          {/* Tech Stack */}

          <div>

            <label className="font-semibold">
              Tech Stack
            </label>

            <div className="grid md:grid-cols-2 gap-3 mt-3">

              {techOptions.map((tech) => (

                <label
                  key={tech}
                  className="flex gap-2 items-center"
                >

                  <input
                    type="checkbox"
                    checked={techStack.includes(
                      tech
                    )}
                    onChange={() =>
                      toggleTech(tech)
                    }
                  />

                  {tech}

                </label>

              ))}

            </div>

          </div>

          {/* Team Size */}

          <div>

            <label className="font-semibold">
              Team Size
            </label>

            <select
              name="teamSize"
              value={form.teamSize}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 mt-2"
            >
              <option value={2}>2 Members</option>
              <option value={3}>3 Members</option>
              <option value={4}>4 Members</option>
              <option value={5}>5 Members</option>
              <option value={6}>6 Members</option>
            </select>

          </div>

          {/* College */}

          <div className="grid md:grid-cols-3 gap-5">

            <input
              name="college"
              value={form.college}
              onChange={handleChange}
              placeholder="College"
              className="border rounded-xl p-4"
            />

            <input
              name="branch"
              value={form.branch}
              onChange={handleChange}
              placeholder="Branch"
              className="border rounded-xl p-4"
            />

            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="border rounded-xl p-4"
            >
              <option value="">
                Select Year
              </option>

              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>

            </select>

          </div>

          {/* Looking For */}

          <div>

            <label className="font-semibold">
              Looking For
            </label>

            <div className="grid md:grid-cols-2 gap-3 mt-3">

              {roleOptions.map((role) => (

                <label
                  key={role}
                  className="flex gap-2"
                >

                  <input
                    type="checkbox"
                    checked={lookingFor.includes(
                      role
                    )}
                    onChange={() =>
                      toggleRole(role)
                    }
                  />

                  {role}

                </label>

              ))}

            </div>

          </div>

          {/* Visibility */}

          <div>

            <label className="font-semibold">
              Team Visibility
            </label>

            <div className="flex gap-6 mt-3">

              <label>

                <input
                  type="radio"
                  name="visibility"
                  value="Public"
                  checked={
                    form.visibility ===
                    "Public"
                  }
                  onChange={handleChange}
                />

                Public

              </label>

              <label>

                <input
                  type="radio"
                  name="visibility"
                  value="Private"
                  checked={
                    form.visibility ===
                    "Private"
                  }
                  onChange={handleChange}
                />

                Private

              </label>

            </div>

          </div>

          <div>

            <label className="font-semibold">
              Team Rules
            </label>

            <textarea
              rows="4"
              name="rules"
              value={form.rules}
              onChange={handleChange}
              className="w-full border rounded-xl mt-2 p-4"
            />

          </div>

          <button
            className="w-full py-4 rounded-xl bg-indigo-700 text-white font-semibold hover:bg-indigo-800"
          >
            Create Team
          </button>

        </form>

      </div>

      {/* Right Preview */}

      <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-24">

        <h2 className="text-2xl font-bold mb-6">
          Live Preview
        </h2>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-slate-500">
              Team Name
            </p>
            <h3 className="font-bold text-xl">
              {form.teamName || "Your Team"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Hackathon
            </p>
            <h3>{form.hackathon || "-"}</h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Project
            </p>
            <h3>{form.projectTitle || "-"}</h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Team Size
            </p>
            <h3>{form.teamSize} Members</h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Required Skills
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length === 0
                ? "No Skills Added"
                : skills.map((s) => (
                    <span
                      key={s}
                      className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm"
                    >
                      {s}
                    </span>
                  ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}