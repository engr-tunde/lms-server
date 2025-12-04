const { sendError, sendSuccess } = require("../../utils/helpers");

const Course = require("../../models/general/Course");
const CourseMaterial = require("../../models/general/CourseMaterial");

const fetchAvailableCourses = async (req, res) => {
  try {
    let allCourses = await Course.find()
      .sort({ _id: "desc" })
      .limit(req.query.limit);

    allCourses = allCourses?.map((item) => ({
      course_id: item._id,
      title: item.title,
      category: item.category,
      language: item.language,
      level: item.level,
      what_to_taught: item.what_to_taught,
      description: item.description,
      currency: item.currency,
      price: item.price,
      discount: item.discount,
      total_price: item.total_price,
    }));
    return sendSuccess(res, "Successfully fetched data", allCourses);
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the course data");
  }
};

const fetchCourseDetails = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id)
      .sort({ _id: "desc" })
      .limit(req.query.limit);

    let courseMaterials = await CourseMaterial.find({
      course_id: req.params.id,
    });

    courseMaterials = courseMaterials?.map((item) => ({
      title: item.title,
      objective: item.objective,
    }));

    course = {
      course_id: course._id,
      title: course.title,
      category: course.category,
      language: course.language,
      level: course.level,
      what_to_taught: course.what_to_taught,
      description: course.description,
      currency: course.currency,
      price: course.price,
      discount: course.discount,
      total_price: course.total_price,
      students: course.purchased_by?.length,
      course_content: courseMaterials,
    };

    return sendSuccess(res, "Successfully fetched data", course);
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the course data");
  }
};

module.exports = {
  fetchAvailableCourses,
  fetchCourseDetails,
};
