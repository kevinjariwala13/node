const mongoose = require("mongoose");
const crypto = require("crypto");
const cron = require("node-cron");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      default: null,
    },
    lastname: {
      type: String,
      required: true,
      default: null,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: { type: String },
    resetTokenExpire: { type: String },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.resetTokenGenerate = async function () {
  const resetToken = await crypto.randomBytes(20).toString("hex");

  const token = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetToken = token;
  this.resetTokenExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
userSchema.methods.changeStatus = async function () {
  this.blocked = this.blocked ? false : true;
  return 1;
};

const users = new mongoose.model("users", userSchema);
cron.schedule("*/1 * * * *", async () => {
  const tokensToUpdate = await users.find({
    resetTokenExpire: { $lt: Date.now() },
  });
  tokensToUpdate.map(async (token) => {
    token.resetToken = undefined;
    token.resetTokenExpire = undefined;
    await token.save();
  });
});

module.exports = users;
