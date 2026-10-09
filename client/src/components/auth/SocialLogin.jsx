import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000/api";

export default function SocialLogin() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const googleButtonRef = useRef(null);
    const googleInitialized = useRef(false);

    const [googleReady, setGoogleReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId) {
            console.error(
                "VITE_GOOGLE_CLIENT_ID is missing from .env"
            );

            setError("Google Client ID is missing.");
            return;
        }

        const handleGoogleResponse = async (response) => {
            try {
                setLoading(true);
                setError("");

                if (!response?.credential) {
                    throw new Error(
                        "Google did not return a credential."
                    );
                }

                const result = await fetch(
                    `${API_URL}/auth/google`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            credential: response.credential,
                        }),
                    }
                );

                const data = await result.json();

                if (!result.ok) {
                    throw new Error(
                        data.message ||
                        "Google login failed."
                    );
                }

                if (!data.token || !data.user) {
                    throw new Error(
                        "Invalid response from server."
                    );
                }

                // =====================================================
                // SAVE JWT
                // =====================================================

                localStorage.setItem(
                    "token",
                    data.token
                );

                // =====================================================
                // SAVE USER
                // =====================================================

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                // =====================================================
                // UPDATE AUTH CONTEXT
                // =====================================================

                setUser(data.user);

                // =====================================================
                // ACCOUNT TYPE BASED REDIRECT
                // =====================================================

                if (
                    data.user.accountType ===
                    "stakeholder"
                ) {
                    navigate(
                        "/stakeholder-dashboard",
                        {
                            replace: true,
                        }
                    );
                } else {
                    navigate(
                        "/dashboard",
                        {
                            replace: true,
                        }
                    );
                }
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
        };

        const initializeGoogle = () => {
            if (
                !window.google ||
                !window.google.accounts ||
                !window.google.accounts.id
            ) {
                return;
            }

            // Prevent multiple initialize calls
            if (googleInitialized.current) {
                return;
            }

            googleInitialized.current = true;

            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleResponse,
            });

            setGoogleReady(true);

            // Render Google's official button
            if (googleButtonRef.current) {
                googleButtonRef.current.innerHTML = "";

                window.google.accounts.id.renderButton(
                    googleButtonRef.current,
                    {
                        theme: "outline",
                        size: "large",
                        width: 350,
                        text: "continue_with",
                        shape: "rectangular",
                    }
                );
            }
        };

        // =====================================================
        // GOOGLE ALREADY LOADED
        // =====================================================

        if (window.google?.accounts?.id) {
            initializeGoogle();
            return;
        }

        // =====================================================
        // CHECK EXISTING GOOGLE SCRIPT
        // =====================================================

        const existingScript =
            document.querySelector(
                'script[src="https://accounts.google.com/gsi/client"]'
            );

        if (existingScript) {
            existingScript.addEventListener(
                "load",
                initializeGoogle
            );

            return () => {
                existingScript.removeEventListener(
                    "load",
                    initializeGoogle
                );
            };
        }

        // =====================================================
        // LOAD GOOGLE IDENTITY SERVICES
        // =====================================================

        const script = document.createElement("script");

        script.src =
            "https://accounts.google.com/gsi/client";

        script.async = true;
        script.defer = true;

        script.onload = initializeGoogle;

        script.onerror = () => {
            console.error(
                "Failed to load Google Identity Services."
            );

            setError(
                "Failed to load Google Login."
            );
        };

        document.head.appendChild(script);

        // Do not remove the script on unmount.
        // Login and Register both use SocialLogin.
    }, [navigate, setUser]);

    return (
        <div className="w-full">

            {/* =====================================================
                DIVIDER
            ===================================================== */}

            <div className="relative my-8">

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-slate-500 font-medium">
                        OR CONTINUE WITH
                    </span>
                </div>

            </div>

            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* =====================================================
                GOOGLE LOGIN ONLY
            ===================================================== */}

            <div className="flex justify-center">

                <div className="relative w-full max-w-[350px] h-14 overflow-hidden rounded-xl">

                    {/* =================================================
                        OUR UI
                    ================================================= */}

                    <button
                        type="button"
                        disabled={
                            loading ||
                            !googleReady
                        }
                        className="
                            absolute
                            inset-0
                            z-10
                            flex
                            items-center
                            justify-center
                            gap-3
                            h-14
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            hover:border-[#14B8A6]
                            hover:shadow-md
                            transition-all
                            duration-300
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            pointer-events-none
                        "
                    >

                        <FcGoogle size={24} />

                        <span className="font-semibold text-slate-700">
                            {loading
                                ? "Connecting..."
                                : "Continue with Google"}
                        </span>

                    </button>

                    {/* =================================================
                        ACTUAL GOOGLE BUTTON
                    ================================================= */}

                    <div
                        ref={googleButtonRef}
                        className="
                            absolute
                            inset-0
                            z-20
                            opacity-0
                            w-full
                            h-full
                        "
                    />

                </div>

            </div>

        </div>
    );
}