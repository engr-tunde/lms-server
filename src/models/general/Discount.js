const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  percent: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Discount", discountSchema);
