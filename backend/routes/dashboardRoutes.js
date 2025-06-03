const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Campaign = require("../models/Campaign");
const Order = require("../models/Order");

router.get("/stats", async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeCampaigns = await Campaign.countDocuments();
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const ordersThisMonth = await Order.countDocuments({ createdAt: { $gte: startOfMonth } });
    res.json({ totalCustomers, activeCampaigns, ordersThisMonth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
