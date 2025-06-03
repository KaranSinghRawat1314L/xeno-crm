const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import your route files
const customerRoutes = require("../routes/customerRoutes");
const orderRoutes = require("../routes/orderRoutes");
const campaignRoutes = require("../routes/campaignRoutes");
const deliveryRoutes = require("../routes/deliveryRoutes");
const aiRoutes = require("../routes/aiRoutes");
const vendorRoutes = require("../routes/vendorRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., https://your-frontend.vercel.app
  credentials: true
}));

// MongoDB connection (avoid multiple connections in serverless)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas connected!"))
    .catch(err => console.error("MongoDB connection error:", err));
}

// Routes
app.get("/", (req, res) => res.send("Backend running on Vercel!"));

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/vendor", vendorRoutes);

// Export the app for Vercel serverless
module.exports = app;
