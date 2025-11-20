const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionStoreSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 86400,
    default: Date.now,
  },
});

module.exports = mongoose.model("SessionStore", sessionStoreSchema);
