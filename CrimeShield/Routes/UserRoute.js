const router = require("express").Router();
const passport = require("passport");
const User = require("../Models/UserModel");
const { hashPassword } = require("../Utilities/EncryptPassword");
const crypto = require("crypto");

// To allow users to create a new account.
router.post("/register", async (req, res, next) => {
  try {
    const user = req.body.user;
    // console.log(user);
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser) {
      return res
        .status(401)
        .json({ success: false, message: "User Already Exists!" });
    }
    const hashedPassword = hashPassword(user.password);
    const newUser = new User({
      ...user,
      password: hashedPassword,
    });
    newUser.save().then((User) => {
      return res.status(200).json({
        success: true,
        msg: "User Registered Successfully!",
      });
    });
  } catch (err) {
    next(err);
  }
});

// To allow users to login into their account.
router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user) => {
      if (user) {
        req.login(user, (err) => {
          if (err) {
            return res.status(500).json({ success: false, err });
          } else {
            return res
              .status(200)
              .json({ success: true, message: "User Logged In Successfully!" });
          }
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Email or Password!" });
      }
    })(req, res, next);
  } catch (error) {
    next(error);
  }
});

// To allow Logged In users to access their details.
router.get("/get", async (req, res, next) => {
  try {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
});

router.get("/count", async (req, res) => {
  try {
    const data = await User.find(req.query);
    res.status(200).json({
      status: "success",
      length: data.length,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
});

//To display Registered users to admin.
router.get("/display", async (req, res) => {
  const data = await User.find();
  res.status(200).json({
    data: {
      data,
    },
  });
});

// To allow logged in users to logout from their account.
router.get("/logout", (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "User Logout Unsuccessful!" });
      }
      return res
        .status(200)
        .json({ success: true, message: "User Logout Successfull!" });
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err,
    });
  }
});

// To generate reset password url for the user.
router.post("/password/reset", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const resetToken = await user.resetTokenGenerate();
      await user.save();
      return res.status(200).json({
        success: true,
        action_url: resetToken,
        name: user.firstname,
      });
    } else {
      return res.status(404).json({
        success: false,
        message:
          "Email not found!Please ensure the email address is correct or Sign up for a new account!",
      });
    }
  } catch (error) {
    next(error);
  }
});

// To update password of user associated with token.
router.put("/password/reset", async (req, res, next) => {
  try {
    let { token } = req.body;
    const { newPassword } = req.body;
    token = await crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $lt: Date.now() + 10 * 60 * 1000 },
    });
    console.log(token, newPassword);
    if (user) {
      const newHashedPassword = hashPassword(newPassword);
      user.password = newHashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password has been reset successfully!",
      });
    } else {
      return res.status(401).json({
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
