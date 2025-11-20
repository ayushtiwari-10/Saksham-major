// frontend/src/components/ProfileUploader.jsx
import React, { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileUploader.css"; // small styles below

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME; // set in .env
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const ProfileUploader = ({ currentUrl, onSavedUrl }) => {
  const [preview, setPreview] = useState(currentUrl || "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef();

  const chooseFile = () => fileRef.current.click();

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    // preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);

    // upload
    const form = new FormData();
    form.append("file", f);
    form.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      setProgress(0);
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
      const resp = await axios.post(url, form, {
        onUploadProgress: (evt) => {
          const pct = Math.round((evt.loaded * 100) / evt.total);
          setProgress(pct);
        },
      });
      const imageUrl = resp.data.secure_url;
      toast.success("Uploaded to Cloudinary ✅");

      // send to backend to save to user profile
      try {
        // example endpoint - change to your real backend path & include auth
        await axios.post("/api/users/profile-photo", { imageUrl });
        toast.success("Profile saved ✅");
        onSavedUrl && onSavedUrl(imageUrl);
      } catch (err) {
        toast.error("Uploaded but failed to save to backend");
        console.error("Backend save error:", err?.response?.data || err.message);
      }
    } catch (err) {
      toast.error("Upload failed 😕");
      console.error(err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="profile-uploader">
      <ToastContainer position="top-right" autoClose={2200} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*,application/pdf"
        style={{ display: "none" }}
        onChange={handleFile}
      />

      <div className="avatar-wrap" onClick={chooseFile} title="Click to upload">
        {preview ? (
          <img src={preview} alt="avatar" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">Upload</div>
        )}
        {uploading && (
          <div className="upload-progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <small>{progress}%</small>
          </div>
        )}
      </div>
      <p className="hint">Click avatar to upload a profile photo</p>
    </div>
  );
};

export default ProfileUploader;
