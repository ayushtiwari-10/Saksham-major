import React from "react";
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";
import "./Profile.css";

const ChangePassword = () => {
  return (
    <div className="teacher-root">
      <Sidebar active="ChangePassword" />

      <div className="teacher-main">
        <Topbar title="Change Password" />

        <div className="profile-container">
          <h3 className="section-title">Change Password</h3>

          <form className="profile-form">
            <label>
              Current Password
              <input type="password" />
            </label>

            <label>
              New Password
              <input type="password" />
            </label>

            <label>
              Confirm New Password
              <input type="password" />
            </label>

            <button className="save-btn">Update Password</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;
