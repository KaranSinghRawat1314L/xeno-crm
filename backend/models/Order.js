const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  amount: Number,
  date: Date,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
