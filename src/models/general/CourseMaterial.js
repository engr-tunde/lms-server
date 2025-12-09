const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  course_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    required: true,
  },
  article: {
    type: Array,
  },
  video: {
    type: Array,
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

module.exports = mongoose.model("CourseMaterial", dataSchema);
