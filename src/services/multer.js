const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files/imgs/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file type" }, false);
  }
};

const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 7 },
});

module.exports = fileUpload;
