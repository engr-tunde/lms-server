const {
  sendError,
  sendSuccess,
  generateSlug,
  createRandomBytes,
} = require("../../utils/helpers");
const { actionUser } = require("../../middlewares/admin");
const Course = require("../../models/general/Course");
const CourseCategory = require("../../models/general/CourseCategory");
const { uploadSingleFile } = require("../../middlewares/general");
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
      courseData: course,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new course overview");
  }
};
const editCourseOverview = async (req, res) => {
  const action_by = await actionUser(req.id);
  const { title, category, level, language, what_to_taught, description } =
    req.body;
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      course.title = title;
      course.category = category;
      course.level = level;
      course.language = language;
      course.what_to_taught = what_to_taught;
      course.description = description;
      await course.save();
      return sendSuccess(res, "Course overview details updated!", {
        course_id: course._id,
        courseData: course,
      });
    } else {
      return sendError(res, "Unable to find course data");
    }
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new course overview");
  }
};

const addCourseMaterialTitle = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  try {
    const course = await Course.findById(req.params.id);
    req.body.course_id = course._id;
    const courseMat = new CourseMaterial(req.body);
    if (course) {
      if (course.progress_status === "overview") {
        course.progress_status = "materials";
        await course.save();
      }
      await courseMat.save();
      return sendSuccess(res, "Successfully added the course material", {
        course_id: course._id,
        courseData: course,
        material_id: courseMat._id,
        materialData: courseMat,
      });
    } else {
      return sendError(res, "Course data has not been instantiated");
    }
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add new course material");
  }
};
const addCourseMaterialFile = async (req, res) => {
  const action_by = await actionUser(req.id);
  const { type } = req.body;
  const { files } = req;
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  let newMaterialFile;
  let file_id = await createRandomBytes();

  try {
    const courseMat = await CourseMaterial.findById(req.params.id);
    if (courseMat) {
      if (type === "article") {
        newMaterialFile = {
          type,
          material: req.body.material,
          file_id,
        };
      } else {
        if (!files) {
          return sendError(res, "Material video file is missing!");
        }
        const materialFile = files.material[0];

        const material = await uploadSingleFile(materialFile);
        if (material) {
          newMaterialFile = {
            type,
            material: material?.url,
            file_id,
          };
        } else {
          return sendError(res, "Unable to finish nvideo upload");
        }
      }

      const currentCourseMats = courseMat?.materials;
      currentCourseMats.push(newMaterialFile);
      courseMat.materials = currentCourseMats;
      const saveData = await courseMat.save();
      if (saveData) {
        return sendSuccess(res, "Successfully added the course material", {
          material_id: req.params.id,
          materialData: courseMat,
        });
      }
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
      course.progress_status = "requirements";
      await course.save();
      return sendSuccess(
        res,
        "Successfully added the course requirements & audience",
        {
          course_id: course._id,
          courseData: course,
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
const editCourseRequirements = async (req, res) => {
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
        "Course requirements & audience have been updated",
        {
          course_id: course._id,
          courseData: course,
        }
      );
    } else {
      return sendError(res, "Course data has not be found");
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
  let discountPercent = req.body.discount_percent || 0;
  let discountVal;

  req.body.action_by = action_by;
  discountVal = Number((discountPercent / 100) * price);
  const total_price = price - discountVal;

  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      course.price = price;
      course.currency = req.body.currency || "US Dollar";
      course.discount_percent = discountPercent;
      course.discount_value = discountVal;
      course.total_price = total_price;
      course.progress_status = "pricing";
      await course.save();
      return sendSuccess(
        res,
        "Successfully added pricing data to the course",
        course
      );
    } else {
      return sendError(res, "Course data has not been instantiated");
    }
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to complete course publishing");
  }
};

const publishCourse = async (req, res) => {
  const action_by = await actionUser(req.id);
  if (!action_by) {
    return sendError(res, "You are not authenticated");
  }
  req.body.action_by = action_by;
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      course.status = "published";
      course.progress_status = "completed";
      await course.save();
      return sendSuccess(res, "Successfully published the course", course);
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

const fetchCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const courseMats = await CourseMaterial.find({
      course_id: req.params.id,
    });
    return sendSuccess(res, "Successfully fetched courses", {
      courseData: course,
      courseMaterials: courseMats,
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
    const courseMats = await CourseMaterial.find(
      {
        course_id: req.params.course_id,
      },
      ["-created_at", "-updated_at", "-course_id", "-__v"]
    );
    return sendSuccess(
      res,
      "Successfully fetched course materials",
      courseMats
    );
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

const deleteCourseMaterialFile = async (req, res) => {
  const { material_id, file_id } = req.query;
  try {
    const courseMat = await CourseMaterial.findById(material_id);
    if (!courseMat) {
      return sendError(res, "Unable to verify the course material");
    }
    const currentCourseMats = courseMat?.materials;
    const otherMatFiles = currentCourseMats?.filter(
      (item) => item?.file_id !== file_id
    );
    courseMat.materials = otherMatFiles;
    const saveData = await courseMat.save();
    if (saveData) {
      return sendSuccess(
        res,
        "Successfully deleted the course material",
        saveData
      );
    }
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
  editCourseOverview,

  addCourseMaterialTitle,
  addCourseMaterialFile,

  addNewCourseRequirements,
  editCourseRequirements,

  setCoursePricing,

  publishCourse,

  setCourseAsDraft,
  setCourseAsArchive,

  fetchAllCourses,
  fetchCourseDetails,
  deleteCourse,

  fetchCourseMaterials,
  fetchCourseOrders,
  deleteCourseMaterial,
  deleteCourseMaterialFile,
};
