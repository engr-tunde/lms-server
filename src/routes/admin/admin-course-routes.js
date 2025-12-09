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
  editCourseOverview,
  editCourseRequirements,
  publishCourse,
  fetchCourseDetails,
  addCourseMaterialTitle,
  addCourseMaterialFile,
} = require("../../controllers/admin/admin-course-controller");

const router = express.Router();

router.post("/add-category", addNewCourseCategory);
router.put("/update-category/:id", editCourseCategory);
router.get("/fetch-all-categories", fetchCourseCategories);
router.delete("/delete-category/:id", deleteCourseCategory);

router.post("/add-course-overview", addNewCourseOverview);
router.put("/update-course-overview/:id", editCourseOverview);

router.post("/add-course-material-title/:id", addCourseMaterialTitle);
router.post(
  "/add-course-material-files/:id",
  upload.array("video"),
  addCourseMaterialFile
);
router.post("/add-course-requirements/:id", addNewCourseRequirements);
router.put("/update-course-requirements/:id", editCourseRequirements);

router.post("/add-course-pricing/:id", setCoursePricing);

router.post("/publish-course/:id", publishCourse);

router.put("/draft-course/:id", setCourseAsDraft);
router.put("/archive-course/:id", setCourseAsArchive);

router.get("/fetch-all-courses", fetchAllCourses);
router.get("/course-details/:id", fetchCourseDetails);
router.get("/fetch-course-materials/:course_id", fetchCourseMaterials);
router.delete("/delete-course-material/:id", deleteCourseMaterial);
router.delete("/delete-course/:id", deleteCourse);

module.exports = router;
