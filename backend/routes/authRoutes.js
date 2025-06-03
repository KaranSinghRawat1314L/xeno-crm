const express = require("express");
const passport = require("passport");
const router = express.Router();

// Trigger Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL + "/dashboard",
  failureRedirect: process.env.CLIENT_URL + "/"
}));

// Logout (works if using sessions)
router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
