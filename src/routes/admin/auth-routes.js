const express = require("express");
const {
  isAdminPasswordResetTokenValid,
  validateAdminLoginType,
} = require("../../middlewares/admin");
const {
  resetPasswordEmail,
  passwordUpdatedEmail,
} = require("../../services/emailServices");
const {
  login,
  verifyLoginToken,
  forgotPassword,
  resetPassword,
  getAdmin,
  isAdminLogin,
  logoutAdmin,
} = require("../../controllers/admin/auth-controller");

const router = express.Router();

router.post("/forgot-password", forgotPassword, resetPasswordEmail);
router.post(
  "/reset-password",
  isAdminPasswordResetTokenValid,
  resetPassword,
  passwordUpdatedEmail
);
router.post("/login", validateAdminLoginType, login);

router.get("/get-admin", verifyLoginToken, getAdmin);

router.get("/check-session", isAdminLogin);
router.post("/logout", logoutAdmin);

module.exports = router;
