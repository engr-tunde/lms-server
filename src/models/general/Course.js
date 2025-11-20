const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Double = require("@mongoosejs/double");

const expenseSchema = new Schema({
  expense_date: {
    type: String,
    required: true,
  },
  expense_category: {
    type: String,
    required: true,
  },
  reference_no: {
    type: String,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
  },
  amount: {
    type: Double,
    required: true,
  },
  bank_account: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  note: {
    type: String,
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

module.exports = mongoose.model("Expense", expenseSchema);
