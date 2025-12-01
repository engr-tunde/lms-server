const { check, validationResult } = require("express-validator");

// User
exports.validateUserSignupParams = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Your full name is missing!")
    .isLength({ min: 6, max: 40 })
    .withMessage("Name must be between 6 and 40 characters"),
  check("email").isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty"),
];

// Admin Dashboard
exports.validateAdmin = [
  check("email").isEmail().withMessage("Email is invalid"),
  check("username").trim().not().isEmpty().withMessage("username is missing!"),
  check("name").trim().not().isEmpty().withMessage("Full name is missing!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Admin password is missing!"),
];

exports.validateAddCourseOverview = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("deposit balance is missing!"),
  check("profit_balance")
    .trim()
    .not()
    .isEmpty()
    .withMessage("profit balance amount is missing!"),
  check("total_balance")
    .trim()
    .not()
    .isEmpty()
    .withMessage("total balance type is missing!"),
];

exports.validateUpdatePasswordParams = [
  check("oldPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Old Password is missing!"),
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("New Password is missing!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Password must be between 8 and 20 characters long"),
];

exports.validateAddAdPost = [
  check("whatsapp")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Whatsapp channel link is missing!"),
  check("telegram")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Telegram channel link is missing!"),
  check("title").trim().not().isEmpty().withMessage("Ad title is missing!"),
  check("content").trim().not().isEmpty().withMessage("Ad content is missing!"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();
  res.status(206).json({ success: false, error: error[0].msg });
};
