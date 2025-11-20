const User = require('../models/user.model');
const Course = require('../models/course.model');
const UserActivity = require('../models/userActivity.model');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const generateResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Sorry, I am unable to respond right now. Please try again later.';
  }
};

const getRecommendations = async (userId) => {
  try {
    // Get user interests
    const user = await User.findById(userId);
    if (!user) return [];

    const interests = user.interests || [];

    // Get recent activities (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentActivities = await UserActivity.find({
      userId,
      createdAt: { $gte: thirtyDaysAgo }
    }).populate('courseId');

    // Get all courses
    const courses = await Course.find({}).populate('instructor', 'name');

    // Score courses based on interests and activities
    const scoredCourses = courses.map(course => {
      let score = 0;

      // Interest match (higher weight)
      if (interests.includes(course.category)) {
        score += 10;
      }

      // Recent activity similarity
      const similarActivities = recentActivities.filter(activity =>
        activity.courseId && activity.courseId.category === course.category
      );
      score += similarActivities.length * 5;

      // Popularity boost
      score += (course.views / 100) + (course.enrollments / 10) + (course.rating * 2);

      return { ...course.toObject(), score };
    });

    // Sort by score and return top 10
    return scoredCourses
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

const getTrending = async () => {
  try {
    const courses = await Course.find({})
      .populate('instructor', 'name')
      .sort({ views: -1, enrollments: -1, rating: -1 })
      .limit(10);

    return courses;
  } catch (error) {
    console.error('Error getting trending courses:', error);
    return [];
  }
};

const trackActivity = async (userId, action, courseId, rating = null) => {
  try {
    const activity = new UserActivity({
      userId,
      action,
      courseId,
      rating,
    });
    await activity.save();

    // Update course stats
    if (action === 'view') {
      await Course.findByIdAndUpdate(courseId, { $inc: { views: 1 } });
    } else if (action === 'enroll') {
      await Course.findByIdAndUpdate(courseId, { $inc: { enrollments: 1 } });
    } else if (action === 'rate' && rating) {
      const course = await Course.findById(courseId);
      if (course) {
        const newRatingsCount = course.ratingsCount + 1;
        const newRating = ((course.rating * course.ratingsCount) + rating) / newRatingsCount;
        await Course.findByIdAndUpdate(courseId, {
          rating: newRating,
          ratingsCount: newRatingsCount
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error tracking activity:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  generateResponse,
  getRecommendations,
  getTrending,
  trackActivity,
};
