const User = require('../models/user.model');

// --- Get User Profile ---
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash"); // ✅ FIXED
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Update Profile ---
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,   // ✅ FIXED
      req.body,
      { new: true }
    ).select("-passwordHash");

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Update Interests (Recommendation Page) ---
const updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!Array.isArray(interests)) {
      return res.status(400).json({ message: "Interests must be an array" });
    }

    console.log("Incoming interests:", interests); // 🔥 DEBUG

    const user = await User.findByIdAndUpdate(
      req.user._id,   // ✅ FIXED (MOST IMPORTANT)
      {
        interests,
        profileCompleted: true
      },
      { new: true }
    ).select("-passwordHash");

    console.log("Saved user:", user); // 🔥 DEBUG

    res.json({ user });
  } catch (error) {
    console.error("Error updating interests:", error);
    res.status(500).json({ error: error.message });
  }
};

// --- Save Profile Photo ---
const saveProfilePhoto = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIXED

    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: "imageUrl required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { profileImage: imageUrl } },
      { new: true }
    );

    res.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateInterests,
  saveProfilePhoto,
};