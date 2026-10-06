import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ArrowLeft,
    Building2,
    Globe,
    Loader2,
    Mail,
    MapPin,
    Save,
    User,
    Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000/api";

const StakeholderProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organizationName: "",
        location: "",
        description: "",
        website: "",
        linkedin: "",
        role: "",
    });

    // =====================================================
    // LOAD PROFILE FROM DATABASE
    // =====================================================

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/auth/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUser = response.data?.user;

                if (!currentUser) {
                    throw new Error(
                        "User profile not found"
                    );
                }

                setFormData({
                    name: currentUser.name || "",
                    email: currentUser.email || "",

                    organizationName:
                        currentUser.organizationName || "",

                    location:
                        currentUser.location || "",

                    description:
                        currentUser.organizationDescription ||
                        "",

                    website:
                        currentUser.website || "",

                    linkedin:
                        currentUser.linkedin || "",

                    role:
                        currentUser.stakeholderRole ||
                        currentUser.role ||
                        "",
                });

                // Store latest user data
                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
                );
            } catch (err) {
                console.error(
                    "Load stakeholder profile error:",
                    err
                );

                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");
                    return;
                }

                setError(
                    err.response?.data?.message ||
                    "Failed to load profile"
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [navigate]);

    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setMessage("");
        setError("");
    };

    // =====================================================
    // SAVE PROFILE
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const payload = {
                name: formData.name.trim(),

                location:
                    formData.location.trim(),

                organizationName:
                    formData.organizationName.trim(),

                organizationDescription:
                    formData.description.trim(),

                website:
                    formData.website.trim(),

                linkedin:
                    formData.linkedin.trim(),

                stakeholderRole:
                    formData.role.trim(),

                profileCompleted: true,
            };

            const response = await axios.put(
                `${API_URL}/auth/profile`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const updatedUser =
                response.data?.user;

            if (updatedUser) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );

                setFormData({
                    name:
                        updatedUser.name || "",

                    email:
                        updatedUser.email || "",

                    organizationName:
                        updatedUser.organizationName ||
                        "",

                    location:
                        updatedUser.location || "",

                    description:
                        updatedUser.organizationDescription ||
                        "",

                    website:
                        updatedUser.website || "",

                    linkedin:
                        updatedUser.linkedin || "",

                    role:
                        updatedUser.stakeholderRole ||
                        updatedUser.role ||
                        "",
                });
            }

            setMessage(
                "Profile saved successfully!"
            );
        } catch (err) {
            console.error(
                "Save stakeholder profile error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to save profile"
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-600">
                    <Loader2
                        size={24}
                        className="animate-spin"
                    />

                    <span>
                        Loading profile...
                    </span>
                </div>
            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">

            <div className="max-w-5xl mx-auto">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex items-center justify-between mb-8">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/stakeholder-dashboard"
                            )
                        }
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
                    >
                        <ArrowLeft size={20} />

                        Back to Dashboard
                    </button>

                    <div className="flex items-center gap-2">

                        <Building2
                            size={24}
                            className="text-teal-600"
                        />

                        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                            Manage Profile
                        </h1>

                    </div>

                </div>

                {/* =================================================
                    MAIN CARD
                ================================================= */}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* TOP SECTION */}

                    <div className="bg-gradient-to-r from-indigo-950 to-teal-600 px-6 md:px-10 py-8 text-white">

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <Building2 size={32} />
                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Stakeholder Profile
                                </h2>

                                <p className="text-white/80 mt-1">
                                    Manage your organization information
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="p-6 md:p-10 space-y-8"
                    >

                        {/* SUCCESS MESSAGE */}

                        {message && (
                            <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3">
                                {message}
                            </div>
                        )}

                        {/* ERROR MESSAGE */}

                        {error && (
                            <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                                {error}
                            </div>
                        )}

                        {/* =================================================
                            BASIC INFORMATION
                        ================================================= */}

                        <div>

                            <h3 className="text-lg font-bold text-slate-900 mb-5">
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* NAME */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            name="name"
                                            value={
                                                formData.name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter your name"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            required
                                        />

                                    </div>

                                </div>

                                {/* EMAIL */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={
                                                formData.email
                                            }
                                            readOnly
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed"
                                        />

                                    </div>

                                </div>

                                {/* ROLE */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Stakeholder Role
                                    </label>

                                    <div className="relative">

                                        <Briefcase
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            name="role"
                                            value={
                                                formData.role
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. Founder, HR Manager"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        />

                                    </div>

                                </div>

                                {/* LOCATION */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Location
                                    </label>

                                    <div className="relative">

                                        <MapPin
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            name="location"
                                            value={
                                                formData.location
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="City, State"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* =================================================
                            ORGANIZATION INFORMATION
                        ================================================= */}

                        <div>

                            <h3 className="text-lg font-bold text-slate-900 mb-5">
                                Organization Information
                            </h3>

                            <div className="space-y-5">

                                {/* ORGANIZATION NAME */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Organization Name
                                    </label>

                                    <div className="relative">

                                        <Building2
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            name="organizationName"
                                            value={
                                                formData.organizationName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter organization name"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        />

                                    </div>

                                </div>

                                {/* DESCRIPTION */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Organization Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={
                                            formData.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Tell students about your organization..."
                                        rows={5}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* =================================================
                            ONLINE PRESENCE
                        ================================================= */}

                        <div>

                            <h3 className="text-lg font-bold text-slate-900 mb-5">
                                Online Presence
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* WEBSITE */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Website
                                    </label>

                                    <div className="relative">

                                        <Globe
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="url"
                                            name="website"
                                            value={
                                                formData.website
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="https://example.com"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        />

                                    </div>

                                </div>

                                {/* LINKEDIN */}

                                <div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        LinkedIn
                                    </label>

                                    <div className="relative">

                                        <Globe
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="url"
                                            name="linkedin"
                                            value={
                                                formData.linkedin
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="https://linkedin.com/company/..."
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/stakeholder-dashboard"
                                    )
                                }
                                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Profile
                                    </>
                                )}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default StakeholderProfile;