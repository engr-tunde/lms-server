const bcrypt = require("bcryptjs");
const { sendError, sendSuccess } = require("../../utils/helpers");
const Admin = require("../../models/admin/Admin");
const { actionUser } = require("../../middlewares/admin");

const addAdmin = async (req, res) => {
  const added_by = await actionUser(req.id);
  console.log("added_by", added_by);
  if (!added_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.added_by = added_by;
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  req.body.password = hashedPassword;
  const admin = new Admin({ ...req.body });

  try {
    await admin.save();
    return sendSuccess(
      res,
      "New admin account has been successfully created.",
      admin
    );
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new admin");
  }
};
const updateAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    return sendError(res, "Admin profile does not exist");
  }
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password);
  } else {
    req.body.password = admin.password;
  }
  try {
    const savedAdminProfile = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(
      res,
      "Successfully updated the admin profile",
      savedAdminProfile
    );
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to update the admin profile");
  }
};
const deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    return sendSuccess(res, "Successfully deleted the admin profile");
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to delete the admin profile");
  }
};
const fetchAllAdmins = async (req, res, next) => {
  try {
    const allAdmins = await Admin.find()
      .limit(req.query.limit)
      .sort({ createdAt: -1 });
    const admins = allAdmins.filter((admin) => admin.username !== "devteeking");
    return res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the admins data");
  }
};
const fetchSingleAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id, "-password");
    if (!admin) {
      return sendError(res, "Admin data does not exist");
    }
    return res.status(200).json({ success: true, data: admin });
  } catch (error) {
    return sendError(res, "Unable to fetch the admin profile data");
  }
};

module.exports = {
  addAdmin,
  updateAdminProfile,
  deleteAdmin,
  fetchAllAdmins,
  fetchSingleAdmin,
};
