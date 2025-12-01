const express = require("express");
const upload = require("../../services/multer");

const {
  addNewCourseCategory,
  editCourseCategory,
  fetchCourseCategories,
  deleteCourseCategory,
  addNewCourseOverview,
  addNewCourseMaterial,
  addNewCourseRequirements,
  setCoursePricing,
  fetchAllCourses,
  fetchCourseMaterials,
  deleteCourseMaterial,
  deleteCourse,
  setCourseAsDraft,
  setCourseAsArchive,
  editCoursePricing,
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
router.post("/add-course-requirements/:id", addNewCourseRequirements);
router.post("/add-course-pricing/:id", setCoursePricing);
router.put("/edit-course-pricing/:id", editCoursePricing);

router.put("/draft-course/:id", setCourseAsDraft);
router.put("/archive-course/:id", setCourseAsArchive);

router.get("/fetch-all-courses", fetchAllCourses);
router.get("/fetch-course-materials/:material_id", fetchCourseMaterials);
router.delete("/delete-course-material/:id", deleteCourseMaterial);
router.delete("/delete-course/:id", deleteCourse);

module.exports = router;
