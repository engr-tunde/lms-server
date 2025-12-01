const { sendError, sendSuccess } = require("../../utils/helpers");
const Order = require("../../models/user/Order");
const Payment = require("../../models/user/Payment");

const fetchAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .limit(req.query.limit)
      .sort({ createdAt: -1 });
    let totalOrdersCount = allOrders?.length;
    let totalOrdersAmount = 0;

    allOrders.forEach((order) => {
      totalOrdersAmount = totalOrdersAmount + order?.total_paid;
    });

    // let pendingOrdersCount = allOrders?.filter(
    //   (item) => item.status === "published"
    // )?.length;
    // let draftOrdersCount = allOrders?.filter(
    //   (item) => item.status === "draft"
    // )?.length;
    // let archivedOrdersCount = allOrders?.filter(
    //   (item) => item.status === "archived"
    // )?.length;

    return sendSuccess(res, "Successfully fetched orders", {
      orders: {
        count: allOrders,
        total: totalOrdersAmount,
      },
    });
  } catch (error) {
    console.log(error);
    return sendError(res, "Unable to fetch the orders data");
  }
};
const fetchSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return sendError(res, "Order data does not exist");
    }
    return sendSuccess(res, "Successfully fetched order data", order);
  } catch (error) {
    return sendError(res, "Unable to fetch the order profile data");
  }
};

const orderPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({ order_id: req.pramas.order_id });
    if (!payment) {
      return sendError(res, "Order's payment data does not exist");
    }
    return sendSuccess(res, "Successfully fetched order's payment!", payment);
  } catch (error) {
    return sendError(res, "Unable to fetch the order's payment data");
  }
};

const allPayments = async (req, res) => {
  const { id } = req.params;
  try {
    const payments = await Payment.find()
      .limit(req.query.limit)
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Successfully fetched payments!", payments);
  } catch (error) {
    return sendError(res, "Unable to fetch payments data");
  }
};

module.exports = {
  fetchAllOrders,
  fetchSingleOrder,
  orderPayment,
  allPayments,
};
