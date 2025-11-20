import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "./Profile.css";
import { uploadProfilePic, updateProfile } from "../../api/userApi";

const TeacherProfile = () => {
  const [data, setData] = useState({
    name: "Ayush Tiwari",
    email: "ayush@example.com",
    phone: "9999999999",
    bio: "Knitting | Cooking | Crafts Teacher",
    skills: "Knitting, Baking, Stitching",
    role: "teacher"
  });

  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // CLOUDINARY UPLOAD
  const handlePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const url = await uploadProfilePic(file);
    setAvatar(url);
    setLoading(false);
  };

  // SAVE PROFILE
  const handleSave = async () => {
    await updateProfile({ ...data, avatar });
    alert("Profile updated successfully!");
  };

  return (
    <div className="teacher-root">
      <Sidebar active="Profile" />

      <div className="teacher-main">
        <Topbar title="My Profile" />

        <div className="profile-container">

          {/* LEFT SECTION */}
          <div className="profile-left">
            <img src={avatar} className="profile-avatar" alt="avatar" />

            <label className="upload-btn">
              Upload Image
              <input type="file" accept="image/*" onChange={handlePicUpload} hidden />
            </label>

            {loading && <p>Uploading...</p>}
          </div>

          {/* RIGHT SECTION */}
          <div className="profile-right">
            <div className="profile-field">
              <label>Name</label>
              <input name="name" value={data.name} onChange={handleChange} />
            </div>

            <div className="profile-field">
              <label>Email</label>
              <input name="email" value={data.email} onChange={handleChange} />
            </div>

            <div className="profile-field">
              <label>Phone</label>
              <input name="phone" value={data.phone} onChange={handleChange} />
            </div>

            <div className="profile-field">
              <label>Bio</label>
              <textarea name="bio" value={data.bio} onChange={handleChange} />
            </div>

            <div className="profile-field">
              <label>Skills</label>
              <input name="skills" value={data.skills} onChange={handleChange} />
            </div>

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>

            <button
              className="switch-btn"
              onClick={() => {
                const newRole = data.role === "teacher" ? "student" : "teacher";
                setData({ ...data, role: newRole });
                alert(`Switched to ${newRole} mode`);
              }}
            >
              Switch to {data.role === "teacher" ? "Student" : "Teacher"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
