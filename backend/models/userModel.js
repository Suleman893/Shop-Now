const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please enter your name"],
      maxLength: [15, "cannot exceed 15 length"],
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
    userPic: {
      type: String,
      default:
        "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
