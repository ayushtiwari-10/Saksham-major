const User = require('../models/user.model');

// --- Get User Profile ---
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Update Profile ---
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
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

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        interests,
        profileCompleted: true
      },
      { new: true }
    ).select("-passwordHash");

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id; // make sure your auth middleware sets req.user
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ message: "imageUrl required" });

    const user = await User.findByIdAndUpdate(userId, { $set: { profileImage: imageUrl } }, { new: true });
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
