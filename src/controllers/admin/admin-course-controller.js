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
const Order = require("../../models/user/Order");

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
      course_id: course._id,
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
      req.body.course_id = course._id;
      const courseMat = new CourseMaterial(req.body);
      await courseMat.save();
      return sendSuccess(res, "Successfully added the course material", {
        course_id: course._id,
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

const addNewCourseRequirements = async (req, res) => {
  const action_by = await actionUser(req.id);
  const { requirements, audience, duration, certificate } = req.body;
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;

  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      course.requirements = requirements;
      course.audience = audience;
      course.duration = duration;
      course.certificate = certificate;
      await course.save();
      return sendSuccess(
        res,
        "Successfully added the course requirements & audience",
        {
          course_id: course._id,
        }
      );
    } else {
      return sendError(res, "Course data has not been instantiated");
    }
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new course requirements & audience");
  }
};

const setCoursePricing = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  let price = req.body.price || 0;
  let discount;

  req.body.action_by = action_by;
  if (discount) {
    discount = Number((req.body.discount / 100) * price);
  } else {
    discount = 0;
  }
  const total_price = price - discount;

  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      course.price = price;
      course.currency = req.body.currency || "US Dollar";
      course.discount = discount;
      course.total_price = total_price;
      course.status = "published";
      await course.save();
      return sendSuccess(res, "Successfully completed course publishing", {
        course,
      });
    } else {
      return sendError(res, "Course data has not been instantiated");
    }
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to complete course publishing");
  }
};
const editCoursePricing = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      if (req.body.discount) {
        if (req.body.price) {
          let discount = Number((req.body.discount / 100) * req.body.price);
          let price = Number(req.body.price);
          course.discount = discount;
          course.price = price;
          course.total_price = price - discount;
        } else {
          let discount = Number((req.body.discount / 100) * course.price);
          course.discount = discount;
          course.price = course.price;
          course.total_price = course.price - discount;
        }
      }
      course.currency = req.body.currency || course.currency;
      await course.save();
      return sendSuccess(res, "Successfully updated course course", {
        course,
      });
    } else {
      return sendError(res, "Course data has not been instantiated");
    }
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to complete course publishing");
  }
};

const setCourseAsDraft = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return sendError(res, "Course data does not exist");
    }
    if (course.status === "draft") {
      return sendError(res, "Course is already saved as draft");
    }
    course.status = "draft";
    await course.save();
    return sendSuccess(res, "Course successfully saved as draft!", course);
  } catch (error) {
    return sendError(res, "Unable to fetch the course data");
  }
};
const setCourseAsArchive = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return sendError(res, "Course data does not exist");
    }
    if (course.status === "archived") {
      return sendError(res, "Course is already archived");
    }
    course.status = "archived";
    await course.save();
    return sendSuccess(res, "Course successfully archived!", course);
  } catch (error) {
    return sendError(res, "Unable to fetch the course data");
  }
};
const fetchAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ _id: "desc" })
      .limit(req.query.limit);

    let totalCoursesCount = courses?.length;
    let publishedCoursesCount = courses?.filter(
      (item) => item.status === "published"
    )?.length;
    let draftCoursesCount = courses?.filter(
      (item) => item.status === "draft"
    )?.length;
    let archivedCoursesCount = courses?.filter(
      (item) => item.status === "archived"
    )?.length;

    return sendSuccess(res, "Successfully fetched courses", {
      courses: courses,
      summary: {
        totalCoursesCount,
        publishedCoursesCount,
        draftCoursesCount,
        archivedCoursesCount,
      },
    });
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the data");
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    return sendSuccess(res, "Successfully deleted the course data");
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to delete the data");
  }
};

const fetchCourseMaterials = async (req, res) => {
  try {
    const courseMats = await CourseMaterial.find({
      course_id: req.params.course_id,
    })
      .sort({ _id: "desc" })
      .limit(req.query.limit);
    return sendSuccess(res, "Successfully fetched courses", courseMats);
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the data");
  }
};

const fetchCourseOrders = async (req, res) => {
  try {
    const courseOrders = await Order.find({
      course_id: req.params.course_id,
    })
      .sort({ _id: "desc" })
      .limit(req.query.limit);
    return sendSuccess(
      res,
      "Successfully fetched course's orders",
      courseOrders
    );
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the data");
  }
};

const deleteCourseMaterial = async (req, res) => {
  try {
    await CourseMaterial.findByIdAndDelete(req.params.id);
    return sendSuccess(res, "Successfully deleted the course material");
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to delete the data");
  }
};

module.exports = {
  addNewCourseCategory,
  editCourseCategory,
  fetchCourseCategories,
  deleteCourseCategory,

  addNewCourseOverview,
  addNewCourseMaterial,
  addNewCourseRequirements,
  setCoursePricing,
  editCoursePricing,

  setCourseAsDraft,
  setCourseAsArchive,

  fetchAllCourses,
  deleteCourse,

  fetchCourseMaterials,
  fetchCourseOrders,
  deleteCourseMaterial,
};
