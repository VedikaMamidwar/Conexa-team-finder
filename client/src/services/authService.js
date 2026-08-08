import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/auth",
});

// Register
export const registerUser = async (userData) => {
    const response = await API.post("/register", userData);

    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

// Login
export const loginUser = async (userData) => {
    const response = await API.post("/login", userData);

    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

// Get Logged-in User
export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await API.get("/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Logout
export const logout = () => {
    localStorage.removeItem("token");
};