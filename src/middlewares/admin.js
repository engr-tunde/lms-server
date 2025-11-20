const { isValidObjectId } = require("mongoose");
const Admin = require("../models/admin/Admin");
const ResetPasswordToken = require("../models/admin/ResetPasswordToken");
const { sendError } = require("../utils/helpers");

const validateNewAdmin = async (req, res, next) => {
  const { email, username } = req.body;
  let existingAdmin;
  let existingUsername;

  try {
    existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return sendError(
        res,
        `Email already used for another staff named - ${existingAdmin.name}`
      );
    }
  } catch (err) {
    console.log(err);
  }
  try {
    existingUsername = await Admin.findOne({
      username: username.toLowerCase(),
    });
  } catch (err) {
    console.log(err);
  }
  if (existingUsername) {
    return sendError(res, "Username already taken");
  }
  req.body.email = email.toLowerCase();
  req.body.username = username.toLowerCase();
  next();
};

const isAdminPasswordResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;

  if (!token || !id) return sendError(res, "Invalid request");

  if (!isValidObjectId(id)) return sendError(res, "Invalid user");

  const admin = await Admin.findById(id);

  if (!admin) return sendError(res, "Admin not found");

  const resToken = await ResetPasswordToken.findOne({ owner: admin._id });
  if (!resToken) return sendError(res, "Reset token not found");

  const resetToken = resToken.token;

  if (token !== resetToken) {
    return sendError(res, "Reset token is invalid");
  }

  req.body.admin = admin;
  next();
};

const validateAdminLoginType = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return sendError(res, "email is missing", 1);
  }

  let existingAdmin;
  let adminIdentity;

  if (email.includes("@")) {
    adminIdentity = email.toLowerCase();
    try {
      existingAdmin = await Admin.findOne({ email: adminIdentity });
      if (!existingAdmin) {
        return sendError(res, "Email not registered. Access denied.");
      }
      req.body = {
        existingAdmin,
        password,
      };
      next();
    } catch (err) {
      return sendError(res, err.message, 500);
    }
  }
};

const actionUser = async (userId) => {
  try {
    existingAdmin = await Admin.findById(userId);
    if (existingAdmin) {
      return existingAdmin.email;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

module.exports = {
  validateNewAdmin,
  isAdminPasswordResetTokenValid,
  validateAdminLoginType,
  actionUser,
};
