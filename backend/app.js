const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo");
require("dotenv").config();
require("./utils/passportConfig");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const vendorRoutes = require("./routes/vendorRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { secure: false, sameSite: "lax", maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/vendor", vendorRoutes);
app.get("/", (req, res) => res.send("Backend running on Vercel!"));
app.get("/api/auth/check", (req, res) => {
  if (req.isAuthenticated()) return res.json({ user: req.user });
  res.status(401).json({ error: "Not authenticated" });
});

module.exports = app;
