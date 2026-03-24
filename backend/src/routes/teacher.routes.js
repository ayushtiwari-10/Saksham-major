const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const {
  getRecommendedClasses,
  getPublicClasses,
  getDashboard,
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  getFinances,
  getSchedule,
  addEvent,
  getVideos,
  uploadVideo,
  updateVideo,
  deleteVideo,
  getMessages,
  sendMessage,
  createClass,
  getMyClasses,
} = require('../controllers/teacher.controller');

// Multer for file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Dashboard
router.get('/dashboard', authenticate, getDashboard);

// Notices
router.get('/notices', authenticate, getNotices);
router.post('/notices', authenticate, createNotice);
router.put('/notices/:id', authenticate, updateNotice);
router.delete('/notices/:id', authenticate, deleteNotice);

// Finances
router.get('/finances', authenticate, getFinances);

// Schedule
router.get('/schedule', authenticate, getSchedule);
router.post('/schedule', authenticate, addEvent);

// Videos
router.get('/videos', authenticate, getVideos);
router.post('/videos', authenticate, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo);
router.put('/videos/:id', authenticate, updateVideo);
router.delete('/videos/:id', authenticate, deleteVideo);

// Messages
router.get('/messages', authenticate, getMessages);
router.post('/messages', authenticate, sendMessage);

// Classes
router.get('/classes', getPublicClasses); // public
router.get('/classes/recommended', getRecommendedClasses); // interests query
router.post('/classes', authenticate, upload.single('image'), createClass);
router.get('/classes/my', authenticate, getMyClasses);

module.exports = router;
