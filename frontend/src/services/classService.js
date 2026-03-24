// frontend/src/services/classService.js
const API_BASE = process.env.REACT_APP_API_URL || ''; // proxy

export async function createClassApi(formData) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/api/teacher/classes`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData, // FormData - no Content-Type
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Server error" }));
    throw new Error(err.message || "Failed to create class");
  }
  return res.json();
}

export async function getMyClassesApi() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/api/teacher/classes/my`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed fetching classes");
  return res.json();
}

export async function getRecommendedClassesApi(interests) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams({ interests: interests.join(',') });
  const res = await fetch(`${API_BASE}/api/teacher/classes/recommended?${params}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed fetching recommendations");
  return res.json();
}

export async function getPublicClassesApi() {
  const res = await fetch(`${API_BASE}/api/teacher/classes`);
  if (!res.ok) throw new Error("Failed fetching classes");
  return res.json();
}
