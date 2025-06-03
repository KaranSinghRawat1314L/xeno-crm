const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/Customer"); // Use Customer as user model for demo

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  // For demo, use Customer as User
  let user = await User.findOne({ email: profile.emails[0].value });
  if (!user) {
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      totalSpend: 0,
      visitCount: 0
    });
  }
  done(null, user);
}));
