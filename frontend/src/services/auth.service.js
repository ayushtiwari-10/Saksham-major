// src/services/auth.service.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const signupApi = (payload) => API.post("/auth/signup", payload).then(r => r.data);
export const loginApi = (payload) => API.post("/auth/login", payload).then(r => r.data);
export const meApi = (token) => API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const updateInterestsApi = (token, interests) => API.patch("/users/interests", { interests }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
