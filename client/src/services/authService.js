
import axios from "axios";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
)
    .trim()
    .replace(/\/+$/, "");

const API = axios.create({
    baseURL: `${API_URL}/auth`,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

// Attach the token to protected requests.
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Keep API errors available to the login form.
const handleApiError = (error) => {
    if (error.response) {
        console.error("Authentication API error:", {
            status: error.response.status,
            message:
                error.response.data?.message ||
                error.response.data?.error ||
                "Authentication request failed.",
            url: error.config?.url,
        });
    } else if (error.request) {
        console.error(
            "Authentication server did not respond. Check whether the backend is running."
        );
    } else {
        console.error("Authentication request setup error:", error.message);
    }

    throw error;
};

// Register a student.
export const registerUser = async (userData) => {
    try {
        const response = await API.post("/register", userData);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Register a stakeholder for admin approval.
export const registerStakeholderUser = async (userData) => {
    try {
        const response = await API.post(
            "/register-stakeholder",
            userData
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Log in an existing student or stakeholder.
export const loginUser = async (userData) => {
    try {
        const response = await API.post("/login", {
            ...userData,
            email: userData.email?.trim().toLowerCase(),
        });

        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Google login.
export const googleLoginUser = async (credential) => {
    try {
        const response = await API.post("/google", {
            credential,
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Get authenticated user's profile.
export const getProfile = async () => {
    try {
        const response = await API.get("/profile");
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Update authenticated user's profile.
export const updateProfile = async (profileData) => {
    try {
        const response = await API.put("/profile", profileData);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

// Clear the local authentication session.
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
