// src/services/auth.service.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Add request interceptor to include auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signupApi = (payload) => API.post("/auth/signup", payload).then(r => r.data);
export const loginApi = (payload) => API.post("/auth/login", payload).then(r => r.data);
export const meApi = (token) => API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const updateInterestsApi = (token, interests) => API.patch("/users/interests", { interests }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Auth service object for authenticated requests
export const authService = {
  get: (url) => API.get(url).then(r => r.data),
  post: (url, data) => API.post(url, data).then(r => r.data),
  put: (url, data) => API.put(url, data).then(r => r.data),
  patch: (url, data) => API.patch(url, data).then(r => r.data),
  delete: (url) => API.delete(url).then(r => r.data),
};
