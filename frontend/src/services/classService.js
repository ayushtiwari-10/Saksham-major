// frontend/src/services/classService.js
const API_BASE = process.env.REACT_APP_API_URL || ""; // if you use proxy in package.json, leave empty

export async function createClassApi(payload) {
  // expects payload: { title, description, image, price, category }
  const token = localStorage.getItem("token"); // adjust if you store token differently
  const res = await fetch(`${API_BASE}/api/teacher/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
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
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error("Failed fetching classes");
  }
  return res.json();
}
