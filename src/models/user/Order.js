const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  payment_status: {
    type: String,
    // required: true,
    default: "paid",
  },
  shipping_method: {
    type: String,
    required: true,
  },
  shipping_fee: {
    type: Number,
    required: true,
  },
  original_total: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total_paid: {
    type: Number,
    required: true,
  },
  payment_reference: {
    type: String,
  },
  payment_status: {
    type: String,
    default: "Paid",
  },
  delivery_status: {
    type: String,
    default: "Pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
