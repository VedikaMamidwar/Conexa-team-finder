import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export default function SocialLogin() {
    const navigate = useNavigate();

    const [googleReady, setGoogleReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId) {
            console.error(
                "VITE_GOOGLE_CLIENT_ID is missing from .env"
            );
            return;
        }

        // Google Identity Services script
        if (window.google) {
            setGoogleReady(true);
            return;
        }

        const script = document.createElement("script");

        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;

        script.onload = () => {
            setGoogleReady(true);
        };

        script.onerror = () => {
            setError("Failed to load Google Login.");
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleGoogleLogin = () => {
        setError("");

        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId) {
            setError("Google Client ID is missing.");
            return;
        }

        if (!googleReady || !window.google) {
            setError("Google Login is still loading. Try again.");
            return;
        }

        setLoading(true);

        window.google.accounts.id.initialize({
            client_id: clientId,

            callback: async (response) => {
                try {
                    const googleCredential = response.credential;

                    const result = await fetch(
                        `${API_URL}/auth/google`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                            },

                            body: JSON.stringify({
                                credential: googleCredential,
                            }),
                        }
                    );

                    const data = await result.json();

                    if (!result.ok) {
                        throw new Error(
                            data.message || "Google login failed."
                        );
                    }

                    // Store JWT
                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    // Store user
                    if (data.user) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(data.user)
                        );
                    }

                    // Go to dashboard
                    navigate("/dashboard");

                } catch (err) {
                    console.error(
                        "Google login error:",
                        err
                    );

                    setError(
                        err.message ||
                        "Google login failed."
                    );
                } finally {
                    setLoading(false);
                }
            },
        });

        // Open Google popup
        window.google.accounts.id.prompt();
    };

    const handleGithubLogin = () => {
        alert("GitHub login will be added next.");
    };

    return (
        <div className="w-full">

            {/* Divider */}

            <div className="relative my-8">

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-slate-500 font-medium">
                        OR CONTINUE WITH
                    </span>
                </div>

            </div>


            {/* Error */}

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}


            {/* Buttons */}

            <div className="grid grid-cols-2 gap-4">

                {/* Google */}

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="flex items-center justify-center gap-3 h-14 rounded-xl border border-slate-300 bg-white hover:border-[#14B8A6] hover:shadow-md transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <FcGoogle size={24} />

                    <span className="font-semibold text-slate-700">
                        {loading ? "Connecting..." : "Google"}
                    </span>

                </button>


                {/* GitHub */}

                <button
                    type="button"
                    onClick={handleGithubLogin}
                    className="flex items-center justify-center gap-3 h-14 rounded-xl border border-slate-300 bg-white hover:border-[#1E1B4B] hover:bg-[#1E1B4B] hover:text-white transition-all duration-300"
                >
                    <FaGithub size={22} />

                    <span className="font-semibold">
                        GitHub
                    </span>

                </button>

            </div>

        </div>
    );
}