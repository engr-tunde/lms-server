const cloud = require("cloudinary");
const cloudinary = cloud.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (error, result) => {
      resolve({
        url: result.url,
        id: result.public_id,
      });
    });
  });
};
