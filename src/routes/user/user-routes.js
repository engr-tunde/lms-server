const express = require("express");

const {
  getUserProfile,
  orderForCourse,
  fetchUserOrders,
  fetchUserCourses,
  fetchUserCourseMaterials,
} = require("../../controllers/user/user-controller");

const router = express.Router();

router.get("/fetch-user-profile", getUserProfile);
router.post("/order-course/:course_id", orderForCourse);
router.get("/fetch-orders", fetchUserOrders);
router.get("/fetch-courses", fetchUserCourses);
router.get("/fetch-course-materials/:course_id", fetchUserCourseMaterials);

module.exports = router;
