const User = require('../models/user.model');
const Course = require('../models/course.model');
const Class = require('../models/class.model');
const Booking = require('../models/booking.model');
const Transaction = require('../models/transaction.model');
const Notice = require('../models/notice.model');
const Video = require('../models/video.model');
const Message = require('../models/message.model');
const { uploadVideo: uploadVideoToCloud, uploadThumbnail } = require('../services/cloudinary.service');
const { successResponse, errorResponse } = require('../utils/response');

// Get teacher dashboard data
const getDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Get teacher's courses
    const courses = await Course.find({ instructor: teacherId }).populate('instructor', 'name');

    // Get classes for each course
    const classes = await Class.find({ instructor: teacherId })
      .populate('course', 'title')
      .populate('enrolledStudents', 'name');

    // Calculate total earnings from transactions
    const transactions = await Transaction.find({ course: { $in: courses.map(c => c._id) }, status: 'success' });
    const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0);

    // Get notices
    const notices = await Notice.find({ teacher: teacherId }).sort({ pinned: -1, createdAt: -1 });

    res.status(200).json(successResponse({
      courses: courses.map(c => ({
        id: c._id,
        title: c.title,
        image: 'https://via.placeholder.com/300', // placeholder
        progress: Math.floor(Math.random() * 100), // calculate based on classes
        students: c.enrolledStudents?.length || 0,
      })),
      totalEarnings,
      notices: notices.map(n => ({
        id: n._id,
        text: n.text,
        pinned: n.pinned,
      })),
    }));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch dashboard data'));
  }
};

// Notices CRUD
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ teacher: req.user.id }).sort({ pinned: -1, createdAt: -1 });
    res.status(200).json(successResponse(notices));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch notices'));
  }
};

const createNotice = async (req, res) => {
  try {
    const { text, pinned } = req.body;
    const notice = new Notice({ teacher: req.user.id, text, pinned });
    await notice.save();
    res.status(201).json(successResponse(notice));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to create notice'));
  }
};

const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, pinned } = req.body;
    const notice = await Notice.findOneAndUpdate(
      { _id: id, teacher: req.user.id },
      { text, pinned },
      { new: true }
    );
    if (!notice) return res.status(404).json(errorResponse('Notice not found'));
    res.status(200).json(successResponse(notice));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to update notice'));
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findOneAndDelete({ _id: id, teacher: req.user.id });
    res.status(200).json(successResponse({ message: 'Notice deleted' }));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to delete notice'));
  }
};

// Finances
const getFinances = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const courses = await Course.find({ instructor: teacherId });

    // Monthly earnings
    const monthlyEarnings = await Transaction.aggregate([
      { $match: { course: { $in: courses.map(c => c._id) }, status: 'success' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          earnings: { $sum: '$amount' },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    // Total earnings, withdrawn, pending
    const totalEarnings = monthlyEarnings.reduce((sum, m) => sum + m.earnings, 0);
    const withdrawn = totalEarnings * 0.8; // placeholder
    const pending = totalEarnings - withdrawn;

    // Student payments
    const payments = await Transaction.find({ course: { $in: courses.map(c => c._id) } })
      .populate('user', 'name')
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(successResponse({
      totalEarnings,
      withdrawn,
      pending,
      monthlyEarnings: monthlyEarnings.map(m => ({ month: m._id, earnings: m.earnings })),
      payments: payments.map(p => ({
        student: p.user.name,
        course: p.course.title,
        amount: p.amount,
        date: p.createdAt.toISOString().split('T')[0],
        status: p.status,
      })),
    }));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch finances'));
  }
};

// Schedule
const getSchedule = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const classes = await Class.find({ instructor: teacherId })
      .populate('course', 'title')
      .sort({ date: 1 });

    const events = [];
    classes.forEach(cls => {
      events.push({
        id: cls._id,
        date: cls.date.toISOString().split('T')[0],
        time: cls.time || '10:00 AM',
        title: cls.title,
      });
    });

    res.status(200).json(successResponse('Schedule fetched successfully', events));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch schedule'));
  }
};

const addEvent = async (req, res) => {
  try {
    const { date, time, title } = req.body;
    const teacherId = req.user.id;
    const newClass = new Class({
      title,
      instructor: teacherId,
      date: new Date(date),
      time,
    });
    await newClass.save();
    res.status(201).json(successResponse('Event added successfully', { id: newClass._id, date, time, title }));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to add event'));
  }
};

// Videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ teacher: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(successResponse(videos));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch videos'));
  }
};

const uploadVideo = async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    let videoUrl = 'placeholder';
    let thumbnailUrl = null;

    if (req.files && req.files.video && req.files.video[0]) {
      const fs = require('fs');
      const videoBuffer = fs.readFileSync(req.files.video[0].path);
      const videoResult = await uploadVideoToCloud(videoBuffer);
      videoUrl = videoResult.secure_url;
    }

    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const fs = require('fs');
      const thumbBuffer = fs.readFileSync(req.files.thumbnail[0].path);
      const thumbResult = await uploadThumbnail(thumbBuffer);
      thumbnailUrl = thumbResult.secure_url;
    }

    const video = new Video({
      teacher: req.user.id,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
    });
    await video.save();
    res.status(201).json(successResponse(video));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to upload video'));
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const video = await Video.findOneAndUpdate(
      { _id: id, teacher: req.user.id },
      updates,
      { new: true }
    );
    if (!video) return res.status(404).json(errorResponse('Video not found'));
    res.status(200).json(successResponse(video));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to update video'));
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await Video.findOneAndDelete({ _id: id, teacher: req.user.id });
    res.status(200).json(successResponse({ message: 'Video deleted' }));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to delete video'));
  }
};

// Messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    })
      .populate('sender', 'name')
      .populate('receiver', 'name')
      .sort({ createdAt: -1 });

    // Group by conversation
    const conversations = {};
    messages.forEach(msg => {
      const otherUser = msg.sender._id.toString() === req.user.id ? msg.receiver : msg.sender;
      const key = otherUser._id.toString();
      if (!conversations[key]) {
        conversations[key] = {
          user: otherUser,
          messages: [],
          unread: 0,
        };
      }
      conversations[key].messages.push(msg);
      if (!msg.read && msg.receiver._id.toString() === req.user.id) {
        conversations[key].unread++;
      }
    });

    res.status(200).json(successResponse(Object.values(conversations)));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch messages'));
  }
};

const sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const message = new Message({ sender: req.user.id, receiver, content });
    await message.save();
    res.status(201).json(successResponse(message));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to send message'));
  }
};

// Create a new class (teacher only)
const createClass = async (req, res) => {
  try {
    // assume auth middleware sets req.user = { id, ... }
    const teacherId = req.user && req.user.id;
    if (!teacherId) return res.status(401).json({ message: "Unauthorized" });

    const { title, description, image, price, category } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newClass = new Class({
      title,
      description,
      image,
      price: price || 0,
      category: category || "General",
      instructor: teacherId,
    });

    await newClass.save();
    return res.status(201).json(successResponse('Class created successfully', { class: newClass }));
  } catch (err) {
    console.error("createClass error:", err);
    return res.status(500).json(errorResponse('Server error'));
  }
};

// Get classes for currently authenticated teacher
const getMyClasses = async (req, res) => {
  try {
    const teacherId = req.user && req.user.id;
    if (!teacherId) return res.status(401).json({ message: "Unauthorized" });

    const classes = await Class.find({ instructor: teacherId }).sort({ createdAt: -1 });
    return res.json(successResponse('Classes fetched successfully', { classes }));
  } catch (err) {
    console.error("getMyClasses error:", err);
    return res.status(500).json(errorResponse('Server error'));
  }
};

module.exports = {
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
};
