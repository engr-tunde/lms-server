const express = require("express");

const {
  fetchAllUsers,
  fetchSingleUser,
  deleteUser,
  blockUser,
  unblockUser,
} = require("../../controllers/admin/admin-user-controller");

const router = express.Router();
router.get("/fetch-all-users", fetchAllUsers);
router.get("/fetch-single-user/:id", fetchSingleUser);
router.delete("/delete-user/:id", deleteUser);
router.put("/block-user/:id", blockUser);
router.put("/unblock-user/:id", unblockUser);

module.exports = router;
