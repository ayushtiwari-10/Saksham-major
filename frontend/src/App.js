import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

// Auth
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/login";

// Recommendation
import Interests from "./pages/Recommendation/Interests";

// Student Dashboard
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";

// Teacher Dashboard Shell
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";

// Teacher Main Pages
import DashboardHome from "./pages/TeacherDashboard/DashboardHome";
import Chatbox from "./pages/TeacherDashboard/sections/Chatbox";
import TeacherVideos from "./pages/TeacherDashboard/sections/TeacherVideos";
import TeacherSchedule from "./pages/TeacherDashboard/sections/TeacherSchedule";
import NoticeItem from "./pages/TeacherDashboard/NoticeItem";
import Finances from "./pages/TeacherDashboard/sections/Finances";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interests" element={<Interests />} />

        {/* STUDENT */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* TEACHER DASHBOARD WITH NESTED PAGES */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="chatbox" element={<Chatbox />} />
          <Route path="videos" element={<TeacherVideos />} />
          <Route path="schedule" element={<TeacherSchedule />} />
          <Route path="notice" element={<NoticeItem />} />
          <Route path="finances" element={<Finances />} />
        </Route>

        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
