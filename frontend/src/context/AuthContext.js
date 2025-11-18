// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { meApi } from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("saksham_token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) { setUser(null); setLoading(false); return; }
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

  const saveToken = (t) => {
    localStorage.setItem("saksham_token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("saksham_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, saveToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
