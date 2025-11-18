import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import "./Finances.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const monthlyEarnings = [
  { month: "Jan", earnings: 11000 },
  { month: "Feb", earnings: 9000 },
  { month: "Mar", earnings: 15000 },
  { month: "Apr", earnings: 8000 },
  { month: "May", earnings: 17000 },
  { month: "Jun", earnings: 14000 },
];

const Finances = () => {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
    const routes = {
      "Dashboard": "/teacher/dashboard",
      "My Videos": "/teacher/dashboard/videos",
      "Schedule": "/teacher/dashboard/schedule",
      "ChatBox": "/teacher/dashboard/chatbox",
      "Finances": "/teacher/dashboard/finances"
    };
    navigate(routes[section] || "/teacher/dashboard");
  };

  return (
    <>
      <Sidebar active="Finances" onNavigate={handleNavigate} />

      <div className="teacher-main">
        <Topbar title="Finances" />

        <div className="finance-container">

          {/* FINANCE CARDS */}
          <div className="finance-cards">
            <div className="f-card">
              <h3>₹42,500</h3>
              <p>Total Earnings</p>
            </div>
            <div className="f-card">
              <h3>₹31,800</h3>
              <p>Withdrawn</p>
            </div>
            <div className="f-card">
              <h3>₹10,700</h3>
              <p>Pending Payout</p>
            </div>
            <div className="f-card">
              <h3>15</h3>
              <p>Total Enrollments</p>
            </div>
          </div>

          {/* REAL EARNINGS CHART */}
          <div className="chart-section">
            <h3>Monthly Earnings</h3>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyEarnings}>
                  <defs>
                    <linearGradient id="earn-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2fa874" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#2fa874" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#2fa874"
                    strokeWidth={3}
                    fill="url(#earn-gradient)"
                    dot={{ r: 5, fill: "#077a59" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PAYMENTS TABLE */}
          <div className="payment-table-section">
            <h3>Student Payments</h3>
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Priya Sharma</td>
                  <td>Knitting Basics</td>
                  <td>₹799</td>
                  <td>10 Jan 2025</td>
                  <td><span className="status paid">Paid</span></td>
                </tr>

                <tr>
                  <td>Rohini Verma</td>
                  <td>Baking Essentials</td>
                  <td>₹999</td>
                  <td>08 Jan 2025</td>
                  <td><span className="status paid">Paid</span></td>
                </tr>

                <tr>
                  <td>Anjali Gupta</td>
                  <td>Handmade Crafts</td>
                  <td>₹499</td>
                  <td>05 Jan 2025</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PAYOUT SECTION */}
          <div className="payout-section">
            <h3>Payout Requests</h3>
            <div className="payout-box">
              <p>Current Balance: <strong>₹10,700</strong></p>
              <button className="payout-btn">Request Withdrawal</button>
            </div>
          </div>

          {/* EXPENSES */}
          <div className="expense-section">
            <h3>Expenses Breakdown</h3>
            <ul>
              <li>Platform Fee — ₹2,000</li>
              <li>Transaction Charges — ₹450</li>
              <li>Marketing Boost — ₹1,500</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Finances;
