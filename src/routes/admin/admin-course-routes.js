const express = require("express");
const upload = require("../../services/multer");

const {
  addNewCourseCategory,
  editCourseCategory,
  fetchCourseCategories,
  deleteCourseCategory,
  addNewCourseOverview,
  addNewCourseMaterial,
} = require("../../controllers/admin/admin-course-controller");

const router = express.Router();

router.post("/add-category", addNewCourseCategory);
router.put("/update-category/:id", editCourseCategory);
router.get("/fetch-all-categories", fetchCourseCategories);
router.delete("/delete-category/:id", deleteCourseCategory);

router.post("/add-course-overview", addNewCourseOverview);
router.post(
  "/add-course-material/:id",
  upload.array("file"),
  addNewCourseMaterial
);

module.exports = router;
