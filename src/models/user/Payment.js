const Double = require("@mongoosejs/double");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  order_title: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "US Dollar",
  },
  amount_paid: {
    type: Double,
    required: true,
  },
  payment_reference: {
    type: String,
  },
  payment_status: {
    type: String,
    default: "completed",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", dataSchema);
