import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const Sidebar = ({ role = "student" }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const location = useLocation(); // ✅ MUST be inside component

  const switchToTeacher = () => {
    localStorage.setItem("role", "teacher");
    navigate("/teacher/dashboard");
  };

  const switchToStudent = () => {
    localStorage.setItem("role", "student");
    navigate("/student/dashboard");
  };

  const menus = {
    student: [
      { label: "Dashboard", path: "/student/dashboard" },
      { label: "Offline Classes", path: "/student/dashboard/offline" },
      { label: "My Courses", path: "/student/dashboard/courses" },
      { label: "My Library", path: "/student/dashboard/library" },
      { label: "Explore", path: "/student/dashboard/explore" },
      { label: "ChatBox", path: "/student/dashboard/chatbox" },
      { label: "Logout", onClick: "logout" },
      { label: "Switch to Teacher", action: "switchToTeacher" },
    ],


teacher: [
  { label: "Dashboard", path: "/teacher/dashboard" },
  { label: "My Videos", path: "/teacher/dashboard/videos" },
  { label: "Schedule", path: "/teacher/dashboard/schedule" },
  { label: "Students", path: "/teacher/dashboard/students" },
  { label: "Finances", path: "/teacher/dashboard/finances" },
  { label: "Chatbox", path: "/teacher/dashboard/chatbox" },
  { label: "Logout", onClick: "logout" },
  { label: "Switch to Student", action: "switchToStudent" },
],


  };


  return (
    <aside className="saksham-sidebar">
      <div className="header-top">
        <button 
          className="profile-icon"
          onClick={() => navigate(`${role === 'student' ? '/student' : '/teacher'}/dashboard/profile`)}
        >
          👤
        </button>
        <div className="brand">saksham</div>

      </div>


      <nav className="sidebar-nav">
        {menus[role].map((item) => (
          <button
            key={item.label}
            className={`sidebar-item ${
              item.path && location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              } else if (item.onClick === "logout") {
                logout();
              } else if (item.action === "switchToTeacher") {
                switchToTeacher();
              } else if (item.action === "switchToStudent") {
                switchToStudent();
              }

            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
