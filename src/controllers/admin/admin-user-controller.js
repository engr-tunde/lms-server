const { sendError, sendSuccess } = require("../../utils/helpers");
const User = require("../../models/user/User");

const fetchAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
      .limit(req.query.limit)
      .sort({ createdAt: -1 });
    return sendSuccess(res, "Successfully fetched users", allUsers);
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the users data");
  }
};
const fetchSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "-password");
    if (!user) {
      return sendError(res, "User data does not exist");
    }
    return sendSuccess(res, "Successfully fetched user data", user);
  } catch (error) {
    return sendError(res, "Unable to fetch the user profile data");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return sendSuccess(res, "Successfully deleted the user profile");
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to delete the user profile");
  }
};

const blockUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "-password");
    if (!user) {
      return sendError(res, "User data does not exist");
    }
    if (user.status === "blocked") {
      return sendError(res, "User is already blocked");
    }
    user.status = "blocked";
    await user.save();
    return sendSuccess(res, "User successfully blocked!", user);
  } catch (error) {
    return sendError(res, "Unable to fetch the user profile data");
  }
};

const unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "-password");
    if (!user) {
      return sendError(res, "User data does not exist");
    }
    if (user.status === "active") {
      return sendError(res, "User is already active");
    }
    user.status = "active";
    await user.save();
    return sendSuccess(res, "User successfully unblocked!", user);
  } catch (error) {
    return sendError(res, "Unable to fetch the user profile data");
  }
};

module.exports = {
  fetchAllUsers,
  fetchSingleUser,
  deleteUser,
  blockUser,
  unblockUser,
};
