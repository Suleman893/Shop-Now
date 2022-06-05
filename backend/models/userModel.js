const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please enter your name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [5, "Name should have more than 4 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      // minLength: [8, "Password should be greater than 8 character"],
      // select: false,
    },
    confirmPassword: {
      type: String,
      // required: true,
      // minLength: [8, "Password should be greater than 8 character"],
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
