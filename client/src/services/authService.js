import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/auth",
});

// =====================================================
// AXIOS INTERCEPTOR
// Automatically attach JWT token to every request
// =====================================================

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// =====================================================
// REGISTER
// =====================================================

export const registerUser = async (userData) => {
    const response = await API.post(
        "/register",
        userData
    );

    if (response.data?.token) {
        localStorage.setItem(
            "token",
            response.data.token
        );
    }

    if (response.data?.user) {
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );
    }

    return response.data;
};

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (userData) => {
    const response = await API.post(
        "/login",
        userData
    );

    if (response.data?.token) {
        localStorage.setItem(
            "token",
            response.data.token
        );
    }

    if (response.data?.user) {
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );
    }

    return response.data;
};

// =====================================================
// GOOGLE LOGIN
// =====================================================

export const googleLoginUser = async (credential) => {
    const response = await API.post(
        "/google",
        {
            credential,
        }
    );

    if (response.data?.token) {
        localStorage.setItem(
            "token",
            response.data.token
        );
    }

    if (response.data?.user) {
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );
    }

    return response.data;
};

// =====================================================
// GET LOGGED-IN USER
// =====================================================

export const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "No authentication token found"
        );
    }

    const response = await API.get(
        "/profile"
    );

    // Save latest user information
    // including accountType
    if (response.data?.user) {
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );
    }

    return response.data;
};

// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword = async (email) => {
    const response = await API.post(
        "/forgot-password",
        {
            email,
        }
    );

    return response.data;
};

// =====================================================
// VERIFY OTP
// =====================================================

export const verifyOTP = async (
    email,
    otp
) => {
    const response = await API.post(
        "/verify-otp",
        {
            email,
            otp,
        }
    );

    return response.data;
};

// =====================================================
// RESEND OTP
// =====================================================

export const resendOTP = async (email) => {
    const response = await API.post(
        "/resend-otp",
        {
            email,
        }
    );

    return response.data;
};

// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword = async (
    resetToken,
    password
) => {
    const response = await API.post(
        "/reset-password",
        {
            resetToken,
            password,
        }
    );

    return response.data;
};

// =====================================================
// LOGOUT
// =====================================================

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};