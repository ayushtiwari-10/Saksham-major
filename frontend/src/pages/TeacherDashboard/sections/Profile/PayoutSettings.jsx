import React from "react";
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";
import "./Profile.css";

const PayoutSettings = () => {
  return (
    <div className="teacher-root">
      <Sidebar active="PayoutSettings" />

      <div className="teacher-main">
        <Topbar title="Payout Settings" />

        <div className="profile-container">
          <h3 className="section-title">Payout Method</h3>

          <form className="profile-form">
            <label>
              Bank Account Number
              <input type="text" />
            </label>

            <label>
              IFSC Code
              <input type="text" />
            </label>

            <label>
              Account Holder Name
              <input type="text" />
            </label>

            <button className="save-btn">Save Payout Info</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayoutSettings;
