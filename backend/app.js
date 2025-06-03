const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const aiRoutes = require("./routes/aiRoutes");
const vendorRoutes = require("./routes/vendorRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/vendor", vendorRoutes);

app.get("/", (req, res) => res.send("Backend running!"));

module.exports = app;
