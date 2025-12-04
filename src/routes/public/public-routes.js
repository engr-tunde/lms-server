const express = require("express");

const {
  fetchAvailableCourses,
  fetchCourseDetails,
} = require("../../controllers/public/public-controller");

const router = express.Router();

router.get("/fetch-courses", fetchAvailableCourses);

router.get("/course-details/:id", fetchCourseDetails);

module.exports = router;
