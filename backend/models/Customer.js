const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  totalSpend: Number,
  visitCount: Number,
  lastOrderDate: Date,
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
