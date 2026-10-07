const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function sendTeammateRequest({ toStudentId, message }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/invitations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ toStudentId, message }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Failed to send teammate request");
  }

  return data;
}