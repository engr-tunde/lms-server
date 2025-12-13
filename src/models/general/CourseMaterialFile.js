const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  material_id: {
    // type: String,
    required: true,

    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseMaterial",
  },
  material: {
    type: String,
    required: true,
  },
  type: {
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
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CourseMaterialFile", dataSchema);
