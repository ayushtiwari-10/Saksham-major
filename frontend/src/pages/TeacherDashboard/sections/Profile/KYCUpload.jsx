import React, { useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";
import "./Profile.css";

const KYCUpload = () => {
  const [aadhar, setAadhar] = useState(null);

  return (
    <div className="teacher-root">
      <Sidebar active="KYC" />

      <div className="teacher-main">
        <Topbar title="KYC Upload" />

        <div className="profile-container">
          <h3 className="section-title">Upload KYC Documents</h3>

          <div className="kyc-box">
            <p>Upload Aadhar / PAN / Govt ID</p>

            <label className="upload-btn">
              Upload Document
              <input
                type="file"
                hidden
                onChange={(e) => setAadhar(e.target.files[0].name)}
              />
            </label>

            {aadhar && <p className="file-name">Uploaded: {aadhar}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCUpload;
