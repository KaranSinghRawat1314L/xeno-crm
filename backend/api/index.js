const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

// Import your route files
const customerRoutes = require("../routes/customerRoutes");
const orderRoutes = require("../routes/orderRoutes");
const campaignRoutes = require("../routes/campaignRoutes");
const deliveryRoutes = require("../routes/deliveryRoutes");
const aiRoutes = require("../routes/aiRoutes");
const vendorRoutes = require("../routes/vendorRoutes");
const authRoutes = require("../routes/authRoutes"); // Added

// Passport config (e.g., Google OAuth)
require("../utils/passportConfig"); // Added

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  }
}));
app.use(passport.initialize());
app.use(passport.session());
// MongoDB connection
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
app.use("/auth", authRoutes); // Added

module.exports = app;
  
