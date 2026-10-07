import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000/api";
const GOOGLE_SCRIPT =
    "https://accounts.google.com/gsi/client";

export default function SocialLogin() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const googleButtonRef = useRef(null);
    const googleInitialized = useRef(false);

    const [googleReady, setGoogleReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const clientId =
            import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId) {
            console.error(
                "VITE_GOOGLE_CLIENT_ID is missing from .env"
            );

            setError(
                "Google Login is not configured. Please try email login."
            );

            return;
        }

        // =====================================================
        // GOOGLE RESPONSE
        // =====================================================

        const handleGoogleResponse = async (
            response
        ) => {
            try {
                setLoading(true);
                setError("");

                if (!response?.credential) {
                    throw new Error(
                        "Google did not return a valid credential."
                    );
                }

                const result = await fetch(
                    `${API_URL}/auth/google`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            credential:
                                response.credential,
                        }),
                    }
                );

                let data;

                try {
                    data = await result.json();
                } catch {
                    throw new Error(
                        "Invalid response received from server."
                    );
                }

                if (!result.ok) {
                    throw new Error(
                        data?.message ||
                        "Google login failed. Please try again."
                    );
                }

                if (!data?.token || !data?.user) {
                    throw new Error(
                        "Invalid authentication response from server."
                    );
                }

                // =================================================
                // SAVE AUTH DATA
                // =================================================

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                // =================================================
                // UPDATE AUTH CONTEXT
                // =================================================

                setUser(data.user);

                // =================================================
                // ROLE BASED REDIRECT
                // =================================================

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
                    navigate("/dashboard", {
                        replace: true,
                    });
                }
            } catch (err) {
                console.error(
                    "Google login error:",
                    err
                );

                setError(
                    err?.message ||
                    "Google login failed. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        // =====================================================
        // INITIALIZE GOOGLE
        // =====================================================

        const initializeGoogle = () => {
            if (
                !window.google?.accounts?.id
            ) {
                return;
            }

            if (googleInitialized.current) {
                return;
            }

            googleInitialized.current = true;

            try {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleGoogleResponse,
                });

                setGoogleReady(true);

                // =============================================
                // RENDER OFFICIAL GOOGLE BUTTON
                // =============================================

                if (googleButtonRef.current) {
                    googleButtonRef.current.innerHTML =
                        "";

                    window.google.accounts.id.renderButton(
                        googleButtonRef.current,
                        {
                            theme: "outline",
                            size: "large",
                            width: 400,
                            text: "continue_with",
                            shape: "rectangular",
                            logo_alignment: "left",
                        }
                    );
                }
            } catch (err) {
                console.error(
                    "Google initialization error:",
                    err
                );

                googleInitialized.current =
                    false;

                setError(
                    "Unable to initialize Google Login."
                );
            }
        };

        // =====================================================
        // GOOGLE ALREADY AVAILABLE
        // =====================================================

        if (window.google?.accounts?.id) {
            initializeGoogle();
            return;
        }

        // =====================================================
        // EXISTING SCRIPT
        // =====================================================

        const existingScript =
            document.querySelector(
                `script[src="${GOOGLE_SCRIPT}"]`
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
        // LOAD GOOGLE SCRIPT
        // =====================================================

        const script =
            document.createElement("script");

        script.src = GOOGLE_SCRIPT;
        script.async = true;
        script.defer = true;

        script.onload = initializeGoogle;

        script.onerror = () => {
            console.error(
                "Failed to load Google Identity Services."
            );

            setError(
                "Failed to load Google Login. Please use email login."
            );
        };

        document.head.appendChild(script);

        // Do not remove the script because both
        // LoginForm and RegisterForm use SocialLogin.
    }, [navigate, setUser]);

    return (
        <div className="w-full">

            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (
                <div
                    className="
                        mb-4
                        flex
                        items-start
                        gap-2.5
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-xs
                        sm:text-sm
                        font-medium
                        text-red-600
                    "
                >
                    <span className="mt-0.5 shrink-0">
                        ●
                    </span>

                    <p className="leading-5">
                        {error}
                    </p>
                </div>
            )}

            {/* =====================================================
                GOOGLE BUTTON
            ===================================================== */}

            <div className="flex justify-center w-full">

                <div
                    className="
                        relative
                        w-full
                        max-w-[400px]
                        h-14
                        overflow-hidden
                        rounded-2xl
                    "
                >

                    {/* =================================================
                        CUSTOM VISUAL BUTTON
                    ================================================= */}

                    <div
                        className={`
                            absolute
                            inset-0
                            z-10
                            flex
                            items-center
                            justify-center
                            gap-3
                            w-full
                            h-14
                            rounded-2xl
                            border
                            bg-white
                            transition-all
                            duration-300
                            ${googleReady &&
                                !loading
                                ? "border-slate-200 shadow-sm"
                                : "border-slate-200 opacity-70"
                            }
                        `}
                    >
                        <FcGoogle
                            size={23}
                        />

                        <span
                            className="
                                text-sm
                                sm:text-base
                                font-semibold
                                text-slate-700
                            "
                        >
                            {loading
                                ? "Connecting..."
                                : googleReady
                                    ? "Continue with Google"
                                    : "Loading Google..."}
                        </span>
                    </div>

                    {/* =================================================
                        OFFICIAL GOOGLE BUTTON
                    ================================================= */}

                    <div
                        ref={googleButtonRef}
                        className="
                            absolute
                            inset-0
                            z-20
                            w-full
                            h-full
                            opacity-0
                            overflow-hidden
                        "
                    />
                </div>
            </div>

            {/* =====================================================
                SECURITY NOTE
            ===================================================== */}

            <p
                className="
                    mt-3
                    text-center
                    text-[10px]
                    sm:text-xs
                    text-slate-400
                "
            >
                Continue securely using your Google account.
            </p>
        </div>
    );
}