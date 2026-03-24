// backend/src/models/class.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClassSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: "" },
  image: { type: String, trim: true, default: "" }, // store image URL (Cloudinary or uploaded)
  price: { type: Number, default: 0 },
  category: { 
    type: String, 
    trim: true, 
    default: "General",
    enum: ['Music', 'Dance', 'Art & Craft', 'Cooking', 'Coding', 'Fitness', 'Yoga', 'Photography', 'Business', 'Languages', 'Beauty & Makeup', 'Digital Marketing', 'Career Skills', 'Home Décor', 'Sewing & Tailoring', 'Acting', 'Finance', 'Writing', 'Gardening', 'Public Speaking']
  },
  mode: { 
    type: String, 
    enum: ['online', 'offline', 'hybrid'], 
    default: 'online' 
  },
  location: { type: String, default: '' },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date },
  time: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Class", ClassSchema);
