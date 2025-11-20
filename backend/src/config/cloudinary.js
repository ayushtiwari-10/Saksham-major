const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "do4bcgwvl",
  api_key: "449464462931626",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
