import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FindTeammates() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

    // Fetch students
    const fetchStudents = async (searchText = "") => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_URL}/api/students`,
                {
                    params: {
                        search: searchText.trim(),
                    },
                }
            );

            setStudents(response.data.students || []);
        } catch (err) {
            console.error("Search error:", err);
            setError(
                "Unable to load students. Please check if your server is running."
            );
        } finally {
            setLoading(false);
        }
    };

    // Load students when page opens
    useEffect(() => {
        fetchStudents(search);
    }, []);

    // Search
    const handleSearch = (e) => {
        e.preventDefault();

        setSearchParams(
            search.trim()
                ? { search: search.trim() }
                : {}
        );

        fetchStudents(search);
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-sm text-[#1E1B4B] font-medium mb-4"
                >
                    ← Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold text-[#1E1B4B]">
                    Find Teammates 🤝
                </h1>

                <p className="text-gray-500 mt-2">
                    Find students with the skills you need for your next project.
                </p>
            </div>

            {/* Search */}
            <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex gap-3"
            >
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, college, branch or skill..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1E1B4B]"
                />

                <button
                    type="submit"
                    className="px-6 py-3 bg-[#1E1B4B] text-white rounded-xl font-semibold hover:opacity-90"
                >
                    🔍 Search
                </button>
            </form>

            {/* Error */}
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="text-center py-10 text-gray-500">
                    Loading students...
                </div>
            )}

            {/* Results */}
            {!loading && (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold text-gray-800">
                            {search
                                ? `Search Results for "${search}"`
                                : "Students on CONEXA"}
                        </h2>

                        <span className="text-sm text-gray-500">
                            {students.length} student
                            {students.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {students.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                            <div className="text-5xl mb-4">🔎</div>

                            <h3 className="text-xl font-bold text-gray-800">
                                No students found
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Try searching with another name, college or skill.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {students.map((student) => (
                                <div
                                    key={student._id}
                                    className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
                                >
                                    {/* Avatar */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-14 h-14 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center text-xl font-bold">
                                            {student.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">
                                                {student.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {student.branch || "Branch not added"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 text-sm text-gray-600 mb-5">
                                        <p>
                                            🎓{" "}
                                            {student.college ||
                                                "College not added"}
                                        </p>

                                        <p>
                                            📚{" "}
                                            {student.year ||
                                                "Year not added"}
                                        </p>

                                        <p>
                                            ✉️ {student.email}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-6">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">
                                            Skills
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {student.skills?.length > 0 ? (
                                                student.skills.map(
                                                    (skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-indigo-50 text-[#1E1B4B] rounded-full text-xs font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    )
                                                )
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    No skills added
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                setSelectedStudent(student)
                                            }
                                            className="flex-1 border border-[#1E1B4B] text-[#1E1B4B] py-2.5 rounded-xl font-semibold hover:bg-indigo-50"
                                        >
                                            View Profile
                                        </button>

                                        <button
                                            onClick={() =>
                                                alert(
                                                    `Team request sent to ${student.name}!`
                                                )
                                            }
                                            className="flex-1 bg-[#1E1B4B] text-white py-2.5 rounded-xl font-semibold hover:opacity-90"
                                        >
                                            + Team
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Profile Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">

                        <div className="flex justify-between items-start mb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center text-2xl font-bold">
                                    {selectedStudent.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold">
                                        {selectedStudent.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        {selectedStudent.branch ||
                                            "Branch not added"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="text-gray-400 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <p>
                                <strong>College:</strong>{" "}
                                {selectedStudent.college ||
                                    "Not added"}
                            </p>

                            <p>
                                <strong>Year:</strong>{" "}
                                {selectedStudent.year ||
                                    "Not added"}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {selectedStudent.email}
                            </p>

                            <div>
                                <strong>Skills:</strong>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedStudent.skills?.length > 0 ? (
                                        selectedStudent.skills.map(
                                            (skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-indigo-50 text-[#1E1B4B] rounded-full text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span className="text-gray-400">
                                            No skills added
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                alert(
                                    `Team request sent to ${selectedStudent.name}!`
                                );
                                setSelectedStudent(null);
                            }}
                            className="w-full mt-6 bg-[#1E1B4B] text-white py-3 rounded-xl font-semibold"
                        >
                            🤝 Send Team Request
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}