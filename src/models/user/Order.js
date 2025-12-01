const Double = require("@mongoosejs/double");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
  course_title: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "US Dollar",
  },
  original_total: {
    type: Double,
    required: true,
  },
  discount: {
    type: Double,
    required: true,
  },
  subtotal: {
    type: Double,
    required: true,
  },
  total_paid: {
    type: Double,
    required: true,
  },
  payment_reference: {
    type: String,
  },
  payment_status: {
    type: String,
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
