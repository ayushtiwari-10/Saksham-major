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

module.exports = {
  getProfile,
  updateProfile,
  updateInterests,
};
