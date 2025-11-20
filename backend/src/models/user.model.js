// src/models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
  },
  interests: { type: [String], default: [] },
  walletBalance: { type: Number, default: 0 },
  profileCompleted: { type: Boolean, default: false },
  profileImage: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
