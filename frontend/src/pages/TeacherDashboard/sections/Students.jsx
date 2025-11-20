import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import "./Students.css";

const Students = () => {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
    const routes = {
      Dashboard: "/teacher/dashboard",
      "My Videos": "/teacher/dashboard/videos",
      Schedule: "/teacher/dashboard/schedule",
      ChatBox: "/teacher/dashboard/chatbox",
      Finances: "/teacher/dashboard/finances",
      Students: "/teacher/dashboard/students",
    };
    navigate(routes[section] || "/teacher/dashboard");
  };

  const students = [
    {
      id: 1,
      name: "Priya Sharma",
      course: "Knitting Basics",
      joined: "10 Jan 2025",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Rohini Verma",
      course: "Baking Essentials",
      joined: "08 Jan 2025",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/36.jpg",
    },
    {
      id: 3,
      name: "Anjali Gupta",
      course: "Crafts & DIY",
      joined: "04 Jan 2025",
      status: "Pending",
      img: "https://randomuser.me/api/portraits/women/21.jpg",
    },
  ];

  return (
    <div className="teacher-root">
      <Sidebar active="Students" onNavigate={handleNavigate} />

      <div className="teacher-main">
        <Topbar title="Students List" />

        <div className="students-container">
          <h3 className="students-title">Your Students</h3>

          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="student-info">
                      <img src={s.img} alt="" className="student-img" />
                      <span>{s.name}</span>
                    </div>
                  </td>

                  <td>{s.course}</td>
                  <td>{s.joined}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        s.status === "Active" ? "active" : "pending"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="actions-cell">
                    <button className="btn small ghost">Message</button>
                    <button className="btn small primary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
