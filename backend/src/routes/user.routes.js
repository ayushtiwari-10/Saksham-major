// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { updateInterests } = require("../controllers/user.controller");

router.patch("/interests", authMiddleware, updateInterests);

module.exports = router;
