const User = require('../models/user.model');

// Get user coins
const getCoins = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('coins');
    res.json({ coins: user.coins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add coins to user
const addCoins = async (req, res) => {
  try {
    const { amount, reason } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { coins: amount } },
      { new: true }
    ).select('coins');

    res.json({ coins: user.coins, message: `Added ${amount} coins for ${reason || 'reward'}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Redeem coins
const redeemCoins = async (req, res) => {
  try {
    const { amount, reward } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findById(req.user.id).select('coins');
    if (user.coins < amount) {
      return res.status(400).json({ message: 'Insufficient coins' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { coins: -amount } },
      { new: true }
    ).select('coins');

    res.json({ coins: updatedUser.coins, message: `Redeemed ${amount} coins for ${reward || 'reward'}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCoins,
  addCoins,
  redeemCoins,
};
