const cloud = require("cloudinary");
const cloudinary = cloud.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

exports.autoUploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload_large(
      file,
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        resolve({
          url: result.url,
          id: result.public_id,
        });
      }
    );
  });
};

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (error, result) => {
      resolve({
        url: result.secure_url,
        id: result.public_id,
      });
    });
  });
};

exports.videoUpload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "video" },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
    // .end(file);
    // stream.end(req.file.buffer);
    // return result;
  });
  // .then((uploadResult) => {
  //   console.log(
  //     `Buffer upload_stream wth promise success - ${uploadResult.public_id}`
  //   );
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
};
