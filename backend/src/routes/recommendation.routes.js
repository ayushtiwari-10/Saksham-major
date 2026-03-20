const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Class = require("../models/class.model");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    // ✅ Get full user from DB
    const user = await User.findById(req.user.id);

console.log("USER:", user);
console.log("INTERESTS:", user.interests);

    // ✅ Safety check
    if (!user || !user.interests || user.interests.length === 0) {
      return res.json([]);
    }

    console.log("User interests:", user.interests);

    // ✅ Match courses
    const classes = await Class.find({
      category: { $in: user.interests }
    }).populate('instructor', 'name').sort({ createdAt: -1 });

    console.log("Recommended classes:", classes);

    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recommendations" });
  }
});

module.exports = router;