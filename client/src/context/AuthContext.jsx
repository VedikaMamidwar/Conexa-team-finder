import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const profile = await getProfile();
                setUser(profile);
            } catch (err) {
                logout();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);