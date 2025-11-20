const aiService = require('../services/ai.service');

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ reply: "Message missing" });

    // AI reply placeholder — will integrate OpenAI later
    return res.json({
      reply: `You said: "${message}". I will help you soon once AI integration is added.`,
    });

  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const recommendations = await aiService.getRecommendations(userId);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrending = async (req, res) => {
  try {
    const trending = await aiService.getTrending();
    res.json({ trending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const trackActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { action, courseId } = req.body;
    await aiService.trackActivity(userId, action, courseId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  chatWithAI,
  getRecommendations,
  getTrending,
  trackActivity,
};
