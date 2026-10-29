import axios from "axios"

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
)
    .trim()
    .replace(/\/+$/, "")

const adminAPI = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

adminAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken")


        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)


)

export const adminLogin = async (credentials) => {
    const response = await adminAPI.post("/admin/login", credentials)
    return response.data
}

export const getCurrentAdmin = async () => {
    const response = await adminAPI.get("/admin/me")
    return response.data
}

export const getPendingStakeholders = async () => {
    const response = await adminAPI.get("/admin/stakeholders/pending")
    return response.data
}

export const getReviewedStakeholders = async () => {
    const response = await adminAPI.get("/admin/stakeholders/reviewed")
    return response.data
}

export const approveStakeholder = async (id) => {
    const response = await adminAPI.patch(
        `/admin/stakeholders/${id}/approve`
    )
    return response.data
}

export const rejectStakeholder = async (id, reason) => {
    const response = await adminAPI.patch(
        `/admin/stakeholders/${id}/reject`,
        { reason }
    )
    return response.data
}

export const adminLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
}

export default adminAPI
