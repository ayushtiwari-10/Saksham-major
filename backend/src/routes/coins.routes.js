const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getCoins, addCoins, redeemCoins } = require("../controllers/coins.controller");

router.get("/get", authMiddleware, getCoins);
router.post("/add", authMiddleware, addCoins);
router.post("/redeem", authMiddleware, redeemCoins);

module.exports = router;
