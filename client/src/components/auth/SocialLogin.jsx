
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleLoginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function SocialLogin() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [googleReady, setGoogleReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId) {
            setError(
                "Google Client ID is missing. Check your frontend .env file."
            );
            return () => {
                mounted = false;
            };
        }

        const handleScriptLoad = () => {
            if (mounted && window.google?.accounts?.id) {
                setGoogleReady(true);
                setError("");
            }
        };

        const scriptUrl =
            "https://accounts.google.com/gsi/client";

        let script = document.querySelector(
            `script[src="${scriptUrl}"]`
        );

        if (window.google?.accounts?.id) {
            handleScriptLoad();
        } else if (script) {
            script.addEventListener("load", handleScriptLoad);

            if (script.dataset.loaded === "true") {
                handleScriptLoad();
            }
        } else {
            script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.defer = true;

            script.addEventListener("load", () => {
                script.dataset.loaded = "true";
                handleScriptLoad();
            });

            script.addEventListener("error", () => {
                if (mounted) {
                    setError(
                        "Failed to load Google Login. Check your internet connection."
                    );
                }
            });

            document.head.appendChild(script);
        }

        return () => {
            mounted = false;

            if (script) {
                script.removeEventListener(
                    "load",
                    handleScriptLoad
                );
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

        if (!window.google?.accounts?.id || !googleReady) {
            setError(
                "Google Login is still loading. Please try again."
            );
            return;
        }

        setLoading(true);

        try {
            window.google.accounts.id.initialize({
                client_id: clientId,

                callback: async (response) => {
                    try {
                        if (!response?.credential) {
                            throw new Error(
                                "Google did not return a valid credential."
                            );
                        }

                        const payload = await googleLoginUser(
                            response.credential
                        );

                        const data = payload?.data ?? payload;

                        if (data?.success === false) {
                            throw new Error(
                                data.message || "Google login failed."
                            );
                        }

                        const user = data?.user;
                        const token =
                            data?.token || data?.accessToken;

                        if (!user || !token) {
                            throw new Error(
                                data?.message ||
                                "The server did not return a valid login session."
                            );
                        }

                        if (
                            user.accountType !== "student" &&
                            user.accountType !== "stakeholder"
                        ) {
                            throw new Error(
                                "Your account type is missing. Please contact support."
                            );
                        }

                        if (
                            user.accountStatus &&
                            user.accountStatus !== "active"
                        ) {
                            throw new Error(
                                "Your account is not active. Please contact support."
                            );
                        }

                        // Save the session through AuthContext.
                        const saved = loginUser(user, token);

                        if (saved === false) {
                            throw new Error(
                                "Unable to establish your login session."
                            );
                        }

                        const destination =
                            user.accountType === "stakeholder"
                                ? "/stakeholder-dashboard"
                                : "/dashboard";

                        navigate(destination, {
                            replace: true,
                        });
                    } catch (err) {
                        console.error(
                            "Google login error:",
                            err
                        );

                        setError(
                            err?.response?.data?.message ||
                            err.message ||
                            "Google login failed. Please try again."
                        );
                    } finally {
                        setLoading(false);
                    }
                },
            });

            window.google.accounts.id.prompt(
                (notification) => {
                    if (
                        notification.isNotDisplayed?.() ||
                        notification.isSkippedMoment?.()
                    ) {
                        setLoading(false);
                        setError(
                            "Google login popup was not displayed. Please click Continue with Google and try again."
                        );
                    }
                }
            );
        } catch (err) {
            console.error(
                "Google initialization error:",
                err
            );

            setLoading(false);
            setError(
                "Unable to start Google Login. Please try again."
            );
        }
    };

    return (
        <div className="w-full">
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm font-medium text-slate-500">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                    {error}
                </div>
            )}

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading || !googleReady}
                    className="flex h-14 w-full max-w-[350px] items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-[#14B8A6] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <FcGoogle size={24} />

                    <span className="font-semibold text-slate-700">
                        {loading
                            ? "Connecting..."
                            : !googleReady
                                ? "Loading Google..."
                                : "Continue with Google"}
                    </span>
                </button>
            </div>
        </div>
    );
}

