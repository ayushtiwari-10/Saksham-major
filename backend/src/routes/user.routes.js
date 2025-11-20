// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getProfile, updateProfile, updateInterests } = require("../controllers/user.controller");

router.get("/me", authMiddleware, getProfile);
router.patch("/me", authMiddleware, updateProfile);
router.patch("/interests", authMiddleware, updateInterests);

module.exports = router;
