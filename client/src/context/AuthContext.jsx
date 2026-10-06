
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getProfile,
    logout,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadUser = async () => {
            const token = localStorage.getItem("token");

            // No token = not logged in
            if (!token) {
                if (mounted) {
                    setUser(null);
                    setLoading(false);
                }

                return;
            }

            try {
                /*
                 * Verify the token with the backend.
                 *
                 * getProfile() should return:
                 *
                 * {
                 *   success: true,
                 *   user: {...}
                 * }
                 */

                const response = await getProfile();

                if (!mounted) return;

                // Backend returned the user
                if (response?.success && response?.user) {
                    setUser(response.user);
                } else if (response?.user) {
                    // Extra safety if API returns user directly
                    setUser(response.user);
                } else {
                    // Invalid response
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                }
            } catch (error) {
                console.error(
                    "Authentication check failed:",
                    error
                );

                /*
                 * Token is invalid / expired / backend rejected it.
                 * Remove authentication data.
                 */

                logout();

                if (mounted) {
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

    /*
     * Login / Register / Google Login can use this
     * function to immediately update AuthContext.
     */

    const login = (userData) => {
        setUser(userData);

        if (userData) {
            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );
        }
    };

    /*
     * Logout helper
     */

    const handleLogout = () => {
        logout();

        localStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,

                // Existing code can continue using setUser()
                setUser,

                // Recommended helpers
                login,
                logout: handleLogout,
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
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};

