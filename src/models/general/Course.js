const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Double = require("@mongoosejs/double");

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  what_to_taught: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: Array,
  },
  audience: {
    type: Array,
  },
  duration: {
    type: String,
  },
  certificate: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Double,
    default: 0,
  },
  currency: {
    type: String,
    default: "US Dollar",
  },
  discount: {
    type: Double,
    default: 0,
  },
  total_price: {
    type: Double,
    default: 0,
  },
  status: {
    type: String,
    status: "draft",
  },
  action_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", expenseSchema);
