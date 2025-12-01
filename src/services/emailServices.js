require("dotenv").config();
const sendEmail = require("../utils/email/sendEmail.util");
const {
  passwordUpdatedTemp,
} = require("../../public/email-templates/auth/password/passwordUpdated.template");
const {
  resetPasswordTemp,
} = require("../../public/email-templates/auth/password/resetPassword.template");
const { sendSuccess, sendError } = require("../utils/helpers");
const {
  emailVerifiedTemp,
} = require("../../public/email-templates/auth/signup/emailVerified.template");
const {
  verifyEmailCodeTemp,
} = require("../../public/email-templates/auth/signup/verifyEmailCode.template");

// General

const verificationEmail = async (req, res) => {
  const { user, otp } = req.body;
  const first_name = user.name.split(" ")[0];
  const subject = `Thank You for Registering! Verify Your Email`;
  const email_body = verifyEmailCodeTemp(first_name, otp);
  try {
    sendEmail(subject, email_body, user.email);
  } catch (error) {
    res.status(500).json(error.message);
  }
  return res.status(200).json({
    success: true,
    message: `Successfully signed up. Verification code has been sent to your submitted email - ${user.email}`,
    userId: user._id,
  });
};
const emailVerifiedEmail = async (req, res) => {
  const { user } = req.body;
  const email = user.email;
  const firstName = user.name.split(" ")[0];
  const subject = `Your Email Has Been Verified`;
  const email_body = emailVerifiedTemp(firstName);
  try {
    sendEmail(subject, email_body, email);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
  return res.status(200).json({
    success: true,
    message: "Your email has been successfully verified. Happy shopping!",
    user: {
      name: user.name,
      id: user._id,
      email,
      email_verified: user.email_verified,
    },
  });
};

const resetPasswordEmail = async (req, res) => {
  const { user, token } = req.body;
  const email = user.email;
  const firstName = user.name.split(" ")[0];

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
  const firstName = user.name.split(" ")[0];
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
  verificationEmail,
  emailVerifiedEmail,
  resetPasswordEmail,
  passwordUpdatedEmail,
};
