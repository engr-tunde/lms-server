const express = require("express");
const { validateAdmin, validate } = require("../../middlewares/validator");
const { validateNewAdmin } = require("../../middlewares/admin");

const {
  addAdmin,
  updateAdminProfile,
  deleteAdmin,
  fetchAllAdmins,
  fetchSingleAdmin,
} = require("../../controllers/admin/admin-controller");

const router = express.Router();

router.post("/add-admin", validateAdmin, validate, validateNewAdmin, addAdmin);
router.put("/update-admin/:id", updateAdminProfile);
router.delete("/delete-admin/:id", deleteAdmin);
router.get("/fetch-all-admins", fetchAllAdmins);
router.get("/fetch-single-admin/:id", fetchSingleAdmin);

module.exports = router;
