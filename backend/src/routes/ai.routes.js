const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/chat', aiController.chatWithAI);
router.get('/recommendations', authMiddleware, aiController.getRecommendations);
router.get('/trending', aiController.getTrending);
router.post('/track-activity', authMiddleware, aiController.trackActivity);

module.exports = router;
