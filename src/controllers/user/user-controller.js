const bcrypt = require("bcryptjs");
const { sendError, sendSuccess } = require("../../utils/helpers");
const Admin = require("../../models/admin/Admin");
const { actionUser } = require("../../middlewares/admin");
const User = require("../../models/user/User");
const Course = require("../../models/general/Course");
const Order = require("../../models/user/Order");
const CourseMaterial = require("../../models/general/CourseMaterial");
const Payment = require("../../models/user/Payment");

const getUserProfile = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.id, "-password");
    if (!user) {
      return sendError(res, "user data not found");
    }
    return sendSuccess(res, "successfully fetched user data", user);
  } catch (err) {
    return sendError(res, err.message);
  }
};

const orderForCourse = async (req, res) => {
  const { total_paid, payment_reference } = req.body;

  try {
    const course = await Course.findById(req.params.course_id);
    if (!course) {
      return sendError("Invalid or course is ano longer available");
    }
    const newOrder = new Order({
      owner: req.id,
      course_id: req.params.course_id,
      course_title: course.title,
      currency: course.currency,
      original_total: course.price,
      discount: course.discount,
      subtotal: course.total_price,
      total_paid,
      payment_reference,
      payment_status: "completed",
    });
    const newPayment = new Payment({
      owner: req.id,
      order_id: newOrder._id,
      order_title: `Payment for ${course.title}`,
      currency: course.currency,
      amount_paid: total_paid,
      payment_reference,
      payment_status: "completed",
    });

    const courseBuyers = course?.purchased_by;
    let user = await User.findById(req.id, "-password");
    let userData = {
      userId: user?._id,
      name: user?.name,
      email: user?.email,
    };

    courseBuyers.push(userData);

    await newOrder.save();
    await newPayment.save();
    await course.save();
    return sendSuccess(
      res,
      "Course purchase has been successfully completed.",
      newOrder
    );
  } catch (err) {
    console.log(err);
    return sendError(res, "Unable to add your pucrhase. Please contact admin");
  }
};

const fetchUserOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .limit(req.query.limit)
      .sort({ createdAt: -1 });
    return sendSuccess(res, "Successfully fetched orders", allOrders);
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the admins data");
  }
};

const fetchUserCourses = async (req, res) => {
  try {
    const allCourses = await Course.find()
      .limit(req.query.limit)
      .sort({ createdAt: -1 });

    let userCourses = allCourses.filter((course) => {
      return course?.purchased_by?.some((owner) =>
        owner?.userId?.toString()?.includes(req.id)
      );
    });

    userCourses = userCourses?.map((item) => ({
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
      total_paid: item.total_price,
    }));
    return sendSuccess(res, "Successfully fetched orders", userCourses);
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the course data");
  }
};

const fetchUserCourseMaterials = async (req, res) => {
  try {
    const courseMats = await CourseMaterial.find({
      course_id: req.params.course_id,
    })
      .sort({ _id: "desc" })
      .limit(req.query.limit);
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

module.exports = {
  getUserProfile,

  orderForCourse,
  fetchUserOrders,
  fetchUserCourses,
  fetchUserCourseMaterials,
};
