// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { meApi } from "../services/auth.service";
import API from "../services/api"; // ✅ ADD THIS

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("saksham_token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  // 🔁 Fetch user if token exists
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const me = await meApi(token);
        setUser(me);
      } catch (err) {
        console.error("me fetch failed", err);
        setToken(null);
        localStorage.removeItem("saksham_token");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // ✅ Save token
  const saveToken = (t) => {
    localStorage.setItem("saksham_token", t);
    setToken(t);
  };

  // ✅ LOGIN FUNCTION (VERY IMPORTANT)
  const login = async (formData) => {
    try {
      const res = await API.post("/auth/login", formData);

      // save token
      saveToken(res.data.token);

      // save user
      setUser(res.data.user);

      return { success: true, user: res.data.user };

    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("saksham_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        saveToken,
        setUser,
        login,     // ✅ ADD THIS
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};