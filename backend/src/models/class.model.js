// backend/src/models/class.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClassSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: "" },
  image: { type: String, trim: true, default: "" }, // store image URL (Cloudinary or uploaded)
  price: { type: Number, default: 0 },
  category: { type: String, trim: true, default: "General" },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date },
  time: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Class", ClassSchema);
