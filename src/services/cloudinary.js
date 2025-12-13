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

exports.videoUpload = (req) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
    // stream.end(req.file.buffer);
    // return result;
  });
};
