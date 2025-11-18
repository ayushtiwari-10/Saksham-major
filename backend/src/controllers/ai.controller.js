const aiService = require('../services/ai.service');

const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await aiService.generateResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateResponse,
};
