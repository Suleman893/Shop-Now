const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please enter your name"],
      maxLength: [30, "cannot exceed 30 length"],
      minLength: [5, "should have more than 5 length"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Enter your email"],
      unique: true,
      validate: [validator.isEmail, "Enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    // avatar: {
    //   public_id: {
    //     type: String,
    //     // required: true,
    //   },
    //   url: {
    //     type: String,
    //     // required: true,
    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
