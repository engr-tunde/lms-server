const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  category_slug: {
    type: String,
    required: true,
  },
  action_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CourseCategory", dataSchema);
