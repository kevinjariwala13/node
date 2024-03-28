const passport = require("passport");
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

// To use Passport-Local Strategy in application.
const localStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (username, password, done) => {
    try {
      const user = User.findOne({ email: username })
        .select("+password")
        .then(async (user) => {
          if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    } catch (error) {
      return done(error, false);
    }
  }
);

passport.use(localStrategy);

//To use Passport Google Auth20 Strategy to Authenticate user.
// const googleStrategy = new GoogleStrategy(
//   {
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/user/google/callback",
//   },
//   async (refreshToken, accessToken, profile, done) => {
//     const user = await User.findOneAndUpdate(
//       { email: profile.emails[0].value, googleId: null },
//       { googleId: profile.id }
//     );
//     if (user) {
//       return done(null, user);
//     } else {
//       const findUser = await User.findOne({ googleId: profile.id });
//       if (findUser !== null) {
//         done(null, findUser);
//       } else {
//         const newUser = new User({
//           email: profile.emails[0].value,
//           profile: {
//             name: profile.displayName,
//             avatar: profile.photos[0].value,
//           },
//           googleId: profile.id,
//           password: null,
//           username: null,
//         });
//         newUser.save().then((user) => done(null, user));
//       }
//     }
//   }
// );
// passport.use(googleStrategy);

// To Serialize a User.
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

// To Deserialize a User.
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, { password: 0 })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, false);
    });
});
