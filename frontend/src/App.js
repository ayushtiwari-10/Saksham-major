import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import LandingPage from "./pages/LandingPage";

// Auth
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/login";

// Recommendation
import Interests from "./pages/Recommendation/Interests";

import ProtectedRoute from "./components/ProtectedRoute";

// Student Dashboard Shell
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";

// Student Pages
import StudentHome from "./pages/StudentDashboard/pages/StudentHome";
import MyCourses from "./pages/StudentDashboard/pages/StudentCourses";
import MyLibrary from "./pages/StudentDashboard/pages/StudentLibrary";
import Explore from "./pages/StudentDashboard/pages/StudentExplore";
import OfflineClasses from "./pages/StudentDashboard/pages/StudentOfflineClasses";
import Categories from "./pages/StudentDashboard/pages/StudentCategories";
import Saved from "./pages/StudentDashboard/pages/StudentSaved";
import StudentChatBox from "./pages/StudentDashboard/pages/StudentChatBox";
import StudentTransactions from "./pages/StudentDashboard/pages/StudentTransactions";
import RedeemRewards from "./pages/Common/RedeemRewards";

// Teacher Dashboard Shell
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";

// Teacher Pages
import DashboardHome from "./pages/TeacherDashboard/DashboardHome";
import Chatbox from "./pages/TeacherDashboard/sections/Chatbox";
import TeacherVideos from "./pages/TeacherDashboard/sections/TeacherVideos";
import TeacherSchedule from "./pages/TeacherDashboard/sections/TeacherSchedule";
import NoticeItem from "./pages/TeacherDashboard/NoticeItem";
import Finances from "./pages/TeacherDashboard/sections/Finances";
import Students from "./pages/TeacherDashboard/sections/Students";

// Profile (Shared)
import ProfileSettings from "./pages/TeacherDashboard/sections/Profile/ProfileSettings";
import ChangePassword from "./pages/TeacherDashboard/sections/Profile/ChangePassword";
import PayoutSettings from "./pages/TeacherDashboard/sections/Profile/PayoutSettings";
import KYCUpload from "./pages/TeacherDashboard/sections/Profile/KYCUpload";

// Floating AI Chatbot
import FloatingAIChatbot from "./components/FloatingAIChatbot";


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />

        <div className="App">
          <FloatingAIChatbot />
          <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/interests" element={<ProtectedRoute><Interests /></ProtectedRoute>} />

          {/* STUDENT DASHBOARD */}
          <Route path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>}>
            <Route index element={<StudentHome />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="library" element={<MyLibrary />} />
            <Route path="explore" element={<Explore />} />
            <Route path="offline" element={<OfflineClasses />} />
            <Route path="categories" element={<Categories />} />
            <Route path="saved" element={<Saved />} />
            <Route path="chatbox" element={<StudentChatBox />} />
            <Route path="transactions" element={<StudentTransactions />} />
            <Route path="redeem" element={<RedeemRewards />} />

            {/* Student → Profile uses same components */}
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="payout-settings" element={<PayoutSettings />} />
            <Route path="kyc" element={<KYCUpload />} />
          </Route>

          {/* TEACHER DASHBOARD */}
          <Route path="/teacher/dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="chatbox" element={<Chatbox />} />
            <Route path="videos" element={<TeacherVideos />} />
            <Route path="schedule" element={<TeacherSchedule />} />
            <Route path="notice" element={<NoticeItem />} />
            <Route path="finances" element={<Finances />} />
            <Route path="students" element={<Students />} />

            {/* Profile */}
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="payout-settings" element={<PayoutSettings />} />
            <Route path="kyc" element={<KYCUpload />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
