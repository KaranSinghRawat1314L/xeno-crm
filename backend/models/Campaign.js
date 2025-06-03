const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: String,
  rules: Array,
  createdBy: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);
