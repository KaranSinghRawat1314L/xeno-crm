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
<<<<<<< HEAD

app.get("/", (req, res) => res.send("Backend running!"));
=======
app.get("/", (req, res) => res.send("Backend running on Vercel!"));
app.get("/api/auth/check", (req, res) => {
  if (req.isAuthenticated()) return res.json({ user: req.user });
  res.status(401).json({ error: "Not authenticated" });
});
>>>>>>> e4f6953025eb40e4428c7dab29dc35871d8e7e39

module.exports = app;
