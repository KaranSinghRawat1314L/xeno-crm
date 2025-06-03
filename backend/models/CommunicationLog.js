const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  message: String,
  status: { type: String, enum: ["SENT", "FAILED"], default: "SENT" },
  deliveryReceipt: String,
}, { timestamps: true });

module.exports = mongoose.model("CommunicationLog", logSchema);
