import axios from "axios";

const API = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api',
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;