const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (fileBuffer, folder, resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

const uploadVideo = (fileBuffer) => uploadToCloudinary(fileBuffer, 'videos', 'video');
const uploadThumbnail = (fileBuffer) => uploadToCloudinary(fileBuffer, 'thumbnails', 'image');

module.exports = {
  uploadVideo,
  uploadThumbnail,
};
