
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import {
    getProfile,
    logout as clearAuthSession,
} from "../services/authService";

const AuthContext = createContext(null);

const VALID_ACCOUNT_TYPES = ["student", "stakeholder"];

const BLOCKED_STATUSES = [
    "rejected",
    "suspended",
    "disabled",
];

const normalizeUser = (userData) => {
    if (!userData || typeof userData !== "object") {
        return null;
    }

    const accountType = String(
        userData.accountType || ""
    ).toLowerCase().trim();

    const rawStatus =
        userData.accountStatus ?? userData.status;

    const accountStatus = String(
        rawStatus || ""
    ).toLowerCase().trim();

    if (
        !(userData.id || userData._id) ||
        !VALID_ACCOUNT_TYPES.includes(accountType)
    ) {
        return null;
    }

    // Students default to active only when the backend omits status.
    // Stakeholders must have an explicit status from the backend.
    if (
        accountType === "stakeholder" &&
        !accountStatus
    ) {
        return null;
    }

    return {
        ...userData,
        id: userData.id || userData._id,
        accountType,
        accountStatus:
            accountStatus ||
            (accountType === "student" ? "active" : ""),
    };
};

const getProfileFromResponse = (response) => {
    // Supports common API response formats.
    if (response?.user) {
        return response.user;
    }

    if (response?.data?.user) {
        return response.data.user;
    }

    if (response?.data) {
        return response.data;
    }

    return response;
};

const clearStoredSession = () => {
    clearAuthSession();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("jwt");
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ==================== LOGOUT ====================
    const logoutUser = useCallback(() => {
        clearStoredSession();
        setUser(null);
        setLoading(false);
    }, []);

    // ==================== RESTORE SESSION ====================
    useEffect(() => {
        let mounted = true;

        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                if (mounted) {
                    setUser(null);
                    setLoading(false);
                }

                return;
            }

            try {
                // Always request the latest profile from the backend.
                const response = await getProfile();
                const profile = getProfileFromResponse(response);
                const normalizedUser = normalizeUser(profile);

                if (!normalizedUser) {
                    throw new Error(
                        "The server returned an invalid account profile."
                    );
                }

                if (
                    BLOCKED_STATUSES.includes(
                        normalizedUser.accountStatus
                    )
                ) {
                    throw new Error(
                        "This account is restricted."
                    );
                }

                if (
                    normalizedUser.accountType === "student" &&
                    normalizedUser.accountStatus !== "active"
                ) {
                    throw new Error(
                        "The student account is not active."
                    );
                }

                if (mounted) {
                    setUser(normalizedUser);

                    localStorage.setItem(
                        "user",
                        JSON.stringify(normalizedUser)
                    );
                }
            } catch (error) {
                console.error(
                    "Session restoration failed:",
                    error
                );

                if (mounted) {
                    clearStoredSession();
                    setUser(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadUser();

        return () => {
            mounted = false;
        };
    }, []);

    // ==================== LOGIN ====================
    const loginUser = useCallback((userData, token) => {
        if (!userData || !token) {
            return false;
        }

        const normalizedUser = normalizeUser(userData);

        if (!normalizedUser) {
            console.error(
                "Login failed: invalid account information."
            );

            return false;
        }

        if (
            BLOCKED_STATUSES.includes(
                normalizedUser.accountStatus
            )
        ) {
            return false;
        }

        if (
            normalizedUser.accountType === "student" &&
            normalizedUser.accountStatus !== "active"
        ) {
            return false;
        }

        try {
            localStorage.setItem("token", token);

            localStorage.setItem(
                "user",
                JSON.stringify(normalizedUser)
            );

            setUser(normalizedUser);
            setLoading(false);

            return true;
        } catch (error) {
            console.error(
                "Unable to save login session:",
                error
            );

            clearStoredSession();
            setUser(null);

            return false;
        }
    }, []);

    // ==================== UPDATE USER ====================
    const updateUser = useCallback((userData) => {
        const normalizedUser = normalizeUser(userData);

        if (!normalizedUser) {
            return false;
        }

        try {
            setUser(normalizedUser);

            localStorage.setItem(
                "user",
                JSON.stringify(normalizedUser)
            );

            return true;
        } catch (error) {
            console.error(
                "Unable to update user:",
                error
            );

            return false;
        }
    }, []);

    const isAuthenticated = Boolean(
        user && localStorage.getItem("token")
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
                loginUser,
                logoutUser,
                updateUser,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider."
        );
    }

    return context;
};
