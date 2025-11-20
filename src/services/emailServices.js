require("dotenv").config();
const sendEmail = require("../utils/email/sendEmail.util");
const {
  passwordUpdatedTemp,
} = require("../../public/email-templates/auth/password/passwordUpdated.template");
const {
  resetPasswordTemp,
} = require("../../public/email-templates/auth/password/resetPassword.template");
const { sendSuccess, sendError } = require("../utils/helpers");

// General
const resetPasswordEmail = async (req, res) => {
  const { user, token } = req.body;
  const email = user.email;
  const firstName = user.first_name;

  const link = `${process.env.USER_APP_URL}/reset-password?token=${token}&id=${user._id}`;
  const subject = `Reset Your Password`;
  const email_body = resetPasswordTemp(firstName, link);

  try {
    sendEmail(subject, email_body, email);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
  return res.status(200).json({
    success: true,
    email,
    userId: user._id,
    message: `Password reset link has been sent to your email - ${email}`,
  });
};
const passwordUpdatedEmail = async (req, res) => {
  const { user } = req.body;
  const firstName = user.first_name;
  const subject = `Your Password Has Been Updated`;
  const email_body = passwordUpdatedTemp(firstName);
  try {
    sendEmail(subject, email_body, user.email);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
  return sendSuccess(res, "Your password has been successfully updated");
};

module.exports = {
  resetPasswordEmail,
  passwordUpdatedEmail,
};
