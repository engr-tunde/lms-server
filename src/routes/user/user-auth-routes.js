const express = require("express");
const {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  generateEmailVerificationToken,
  isUserLogin,
  isEmailRegistered,
  logoutUser,
} = require("../../controllers/user/user-auth-controller");
const {
  verificationEmail,
  emailVerifiedEmail,
  resetPasswordEmail,
  passwordUpdatedEmail,
} = require("../../services/emailServices");
const {
  validateUserSignupParams,
  validate,
} = require("../../middlewares/validator");
const {
  isPasswordResetTokenValid,
  validateNewUser,
  validateLoginType,
} = require("../../middlewares/user");

const router = express.Router();

router.post(
  "/signup",
  validateNewUser,
  signup,
  generateEmailVerificationToken,
  verificationEmail
);
router.post(
  "/resend-verification-otp",
  generateEmailVerificationToken,
  verificationEmail
);
router.post("/verify-email", verifyEmail, emailVerifiedEmail);
router.post("/forgot-password", forgotPassword, resetPasswordEmail);
router.post(
  "/reset-password",
  isPasswordResetTokenValid,
  resetPassword,
  passwordUpdatedEmail
);
router.post("/login", validateLoginType, login);
router.get("/check-session", isUserLogin);
router.post("/logout", logoutUser);
router.post("/check-email", isEmailRegistered);

module.exports = router;
