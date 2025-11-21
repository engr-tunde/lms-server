const bcrypt = require("bcryptjs");
const {
  sendError,
  createRandomBytes,
  sendSuccess,
  sendLoginError,
} = require("../../utils/helpers");
const {
  createLoginSession,
  getSessionToken,
  verifyLoginSession,
} = require("../../middlewares/general");
const SessionStore = require("../../models/admin/SessionStore");
const Admin = require("../../models/admin/Admin");
const ResetPasswordToken = require("../../models/admin/ResetPasswordToken");

// FORGOT PASSWORD
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Please provide account email");

  const admin = await Admin.findOne({ email });
  if (!admin) return sendError(res, "Sorry, user not found. Invalid request");

  if (!admin.email_verified) {
    return res.status(401).json({
      success: true,
      message: "Unverified email",
      userId: admin._id,
    });
  }

  const checkToken = await ResetPasswordToken.findOne({
    owner: admin._id,
  });
  if (checkToken)
    return sendError(res, "You can only request a new token after 10 minutes");

  // Generate token
  const token = await createRandomBytes(30);

  const resetToken = new ResetPasswordToken({ owner: admin._id, token });
  await resetToken.save();
  req.body = {
    user: admin,
    token,
    type: "admin",
  };
  next();
};

const resetPassword = async (req, res, next) => {
  const { admin, password } = req.body;
  const isPasswordSame = bcrypt.compareSync(password, admin.password);
  if (isPasswordSame)
    return sendError(
      res,
      "New password must be different from the old password"
    );
  if (password.trim().length < 8 || password.trim().length > 20)
    return sendError(res, "Password must be between 8 and 20 charcaters long");

  const hashedPassword = bcrypt.hashSync(password);

  admin.password = hashedPassword;
  await admin.save();
  await ResetPasswordToken.findOneAndDelete({ owner: admin._id });

  req.body = {
    user: admin,
  };
  next();
};

// LOGIN
const login = async (req, res, next) => {
  const { existingAdmin, password } = req.body;
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isPasswordCorrect) {
    return sendError(res, "Invalid email or password");
  }
  req.body = {
    userId: existingAdmin._id,
  };
  const { sessionId, token } = await createLoginSession(
    { id: existingAdmin._id },
    process.env.JWT_ADMIN_SECRET_KEY
  );
  res.set("u-x-key", sessionId);
  res.header("Access-Control-Expose-Headers", "u-x-key");
  return sendSuccess(res, "Successfullly logged in!", existingAdmin);
};

const isAdminLogin = async (req, res) => {
  const tokenKey = req.headers["u-x-key"];
  try {
    if (!tokenKey) {
      return sendError(res, "Unauthorised. No headers key");
    }
    if (tokenKey) {
      const sessionToken = await getSessionToken(String(tokenKey));
      if (!sessionToken) {
        return sendError(res, "Session token expired");
      }
      if (sessionToken) {
        return sendSuccess(res, "You are a logged in user");
      }
    }
  } catch (error) {
    console.log(error);
    return sendError(res, "Unauthorised");
  }
};

const verifyLoginToken = async (req, res, next) => {
  const tokenKey = req.headers["u-x-key"];
  try {
    if (!tokenKey) {
      return sendLoginError(res, "Unauthorised. No headers key");
    }
    if (tokenKey) {
      const sessionToken = await getSessionToken(String(tokenKey));
      if (!sessionToken) {
        return sendLoginError(res, "Authorization token expired");
      }
      if (sessionToken) {
        const token = sessionToken.value;
        const checkSession = await verifyLoginSession(
          token,
          process.env.JWT_ADMIN_SECRET_KEY,
          req
        );
        if (!checkSession) {
          return sendLoginError(res, "Invalid Token");
        } else {
          req.id = sessionToken.owner;
          next();
        }
      }
    }
  } catch (error) {
    console.log(error);
    return sendLoginError(res, "Unauthorised");
  }
};

const getAdmin = async (req, res) => {
  const adminId = req.id;
  let admin;
  try {
    admin = await Admin.findById(adminId, "-password");
    if (!admin) {
      return sendError(res, "Admin data not found");
    }
    return sendSuccess(res, "successfully fetched admin data", admin);
  } catch (err) {
    return sendError(res, err.message);
  }
};

const logoutAdmin = async (req, res) => {
  const tokenKey = req.headers["u-x-key"];
  try {
    if (!tokenKey) {
      return sendError(res, "Unauthorised. No headers key");
    }
    const sessionToken = await getSessionToken(String(tokenKey));
    if (!sessionToken) {
      return sendSuccess(res, "Session already expired");
    }
    if (sessionToken) {
      const token = sessionToken.value;
      const checkSession = await verifyLoginSession(
        token,
        process.env.JWT_ADMIN_SECRET_KEY,
        req
      );
      if (checkSession) {
        const deleteData = await SessionStore.findByIdAndDelete(
          sessionToken._id
        );
        if (deleteData) {
          return sendSuccess(res, "Successfully logged out");
        }
        return sendError(res, `Unable to log you out now`);
      }
    }
  } catch (error) {
    return sendError(res, `Something went wrong - ${error}`);
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
  login,
  isAdminLogin,
  verifyLoginToken,
  getAdmin,
  logoutAdmin,
};
