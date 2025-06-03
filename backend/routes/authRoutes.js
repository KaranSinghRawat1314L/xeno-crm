const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../utils/passportConfig"); // Your Google strategy setup
app.use(passport.initialize());
app.use(passport.session()); // Only if using sessions

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL + "/dashboard",
  failureRedirect: process.env.CLIENT_URL + "/"
}));

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect(process.env.CLIENT_URL));
});

module.exports = router;
