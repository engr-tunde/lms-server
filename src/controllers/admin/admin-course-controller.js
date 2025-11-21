const bcrypt = require("bcryptjs");
const { sendError, sendSuccess, generateSlug } = require("../../utils/helpers");
const Admin = require("../../models/admin/Admin");
const { actionUser } = require("../../middlewares/admin");
const Course = require("../../models/general/Course");
const CourseCategory = require("../../models/general/CourseCategory");
const {
  uploadSingleImage,
  uploadSingleVideo,
} = require("../../middlewares/general");
const CourseMaterial = require("../../models/general/CourseMaterial");

const addNewCourseCategory = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  try {
    const categoryExists = await CourseCategory.findOne({
      category: req.body.category,
    });
    if (categoryExists) {
      return sendError(res, "Category already exists");
    }
    req.body.category_slug = await generateSlug(
      req.body.category.toLowerCase()
    );
    const category = new CourseCategory({ ...req.body });
    await category.save();
    return sendSuccess(
      res,
      "New course category successfully added.",
      category
    );
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new course category");
  }
};
const editCourseCategory = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  try {
    const category = await CourseCategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(res, "Successfully updated the category data", category);
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to update the category");
  }
};
const fetchCourseCategories = async (req, res) => {
  try {
    const categories = await CourseCategory.find()
      .sort({ _id: "desc" })
      .limit(req.query.limit);
    return sendSuccess(
      res,
      "Successfully fetched all course categories",
      categories
    );
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the data");
  }
};
const deleteCourseCategory = async (req, res) => {
  try {
    await CourseCategory.findByIdAndDelete(req.params.id);
    return sendSuccess(res, "Successfully deleted the category data");
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to delete the category");
  }
};

const addNewCourseOverview = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  const course = new Course({ ...req.body });
  try {
    await course.save();
    return sendSuccess(res, "Course overview details successfully set.", {
      courseId: course._id,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new course overview");
  }
};
const addNewCourseMaterial = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  const videoFile = await uploadSingleImage(req);
  req.body.video = videoFile?.url;
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      req.body.courseId = course._id;
      const courseMat = new CourseMaterial(req.body);
      return sendSuccess(res, "Successfully added the course material", {
        courseId: course._id,
        newMaterial: courseMat,
      });
    } else {
      return sendError(res, "Course data has not been instantiated");
    }
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new course material");
  }
};

module.exports = {
  addNewCourseCategory,
  editCourseCategory,
  fetchCourseCategories,
  deleteCourseCategory,

  addNewCourseOverview,
  addNewCourseMaterial,
};
