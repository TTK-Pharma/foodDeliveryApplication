var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GOOGLE_CLIENT_ID = "680943099585-cvgut3cbu9vgusvekviij7jd8c633hgg.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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"
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
    
  }
));
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})






































