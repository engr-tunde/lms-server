const SessionStore = require("../models/admin/SessionStore");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const cloudinary = require("../services/cloudinary");
const fs = require("fs");
const { badRequestError } = require("../utils/helpers");

const addSessionToken = async (key, value, id) => {
  try {
    const newSession = new SessionStore({
      owner: id,
      key,
      value,
    });
    const saveSession = await newSession.save();
    if (saveSession) {
      return true;
    }
  } catch (error) {
    console.log("session store error:", error);
    return false;
  }
};

const getSessionToken = async (key) => {
  try {
    const session = await SessionStore.findOne({ key });
    if (session) {
      return session;
    }
  } catch (error) {
    console.log("session store error:", error);
    return false;
  }
};

const deleteSessionToken = async (id) => {
  try {
    const deleteSession = await SessionStore.findByIdAndDelete(id);
    if (deleteSession) {
      return true;
    }
  } catch (error) {
    console.log("session store deletion error:", error);
    return false;
  }
};

const createLoginSession = async (id, secrete) => {
  const sessionId = nanoid();
  const token = jwt.sign(id, secrete, {
    expiresIn: "1d",
  });
  const sid = id.id;
  await addSessionToken(sessionId, token, sid);
  return { sessionId, token };
};

const verifyLoginSession = async (token, secrete, req) => {
  let result;
  jwt.verify(String(token), secrete, (err, user) => {
    if (err) {
      result = false;
    }
    if (user) {
      req.id = user.id;
      result = true;
    }
  });
  return result;
};

const logoutSession = async (token, secrete) => {
  let result;
  jwt.verify(String(token), secrete, (err, user) => {
    if (err) {
      console.log("logout error:", err);
      result = false;
    }
    if (user) {
      result = true;
    }
  });
  console.log("result", result);
  return result;
};

const uploadSingleImage = async (req) => {
  if (!req.files?.length) {
    return null;
  }
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const file = req.files[0];
  const { path } = file;
  const image = await uploader(path);
  fs.unlinkSync(path);
  return image;
};

// const uploadSingleVideo = async (req) => {
//   if (!req.files?.length) {
//     return null;
//   }
//   const uploader = async (path) => await cloudinary.uploads(path, "Images");
//   const file = req.files[0];
//   const { path } = file;
//   const video = await uploader(path);
//   fs.unlinkSync(path);
//   return video;
// };

const uploadSingleVideo = async (audioFile) => {
  const uploader = async (path) => await cloudinary.videoUpload(path);
  const { path } = audioFile;
  const audio = await uploader(path);
  fs.unlinkSync(path);
  return audio;
};

const uploadMultipleImages = async (req, res, errorMessage) => {
  if (!req?.files?.length) {
    return null;
  }
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const images = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    images.push(newPath);
    fs.unlinkSync(path);
  }
  return images;
};

module.exports = {
  addSessionToken,
  getSessionToken,
  deleteSessionToken,

  createLoginSession,
  verifyLoginSession,
  logoutSession,

  uploadSingleImage,
  uploadSingleVideo,
  uploadMultipleImages,
};
