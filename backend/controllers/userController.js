const userSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../middlewares/jwt");
const { validationResult } = require("express-validator");

const UserRegistration = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let emailExist;
    emailExist = await userSchema.findOne({
      email,
    });

    if (emailExist) {
      return res.status(409).send({
        message: "Email already exist",
      });
    } else if (password !== confirmPassword) {
      return res.status(409).send({
        message: "Password and confirm password don't match",
      });
    } else {
      let salt = await bcrypt.genSalt(10); //round 10 out of total 12 round
      let encryptedPassword = await bcrypt.hash(password, salt);
      const user = await userSchema.create({
        ...req.body,
        password: encryptedPassword,
        confirmPassword: encryptedPassword,
      });
      return res.status(201).send({
        success: true,
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({
      email,
    });
    if (!user) {
      return res.status(401).send({
        message: "This email dont exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid credientials",
      });
    }
    const token = jwtHelper.issue({
      id: user._id,
      name: user.name,
      role: user.role,
    });
    return res.status(200).send({
      success: true,
      message: "Login successfull",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const UserDetails = async (req, res) => {
  const specficUser = req.userId;
  try {
    let SpecificUserInfo = await userSchema.findById(specficUser);
    if (SpecificUserInfo.length < 0) {
      return res.status.send({
        message: "No user info found",
        specificUser: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: "Users Info found successfully",
      user: SpecificUserInfo,
      specficUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const UpdateDetails = async (req, res) => {
  const specficUser = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let user = await userSchema.findOneAndUpdate(
      { _id: specficUser },
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    let allUsers = await userSchema.find().sort({ _id: "-1" });
    if (allUsers.length < 0) {
      return res.status.send({
        message: "No user found",
        allUser: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: "Users found successfully",
      allUsers,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const RemoveUserById = async (req, res) => {
  try {
    let user = await userSchema.findOneAndDelete({
      _id: req.body.id,
    });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const AdminUpdateUser = async (req, res) => {
  const { _id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let user = await userSchema.findByIdAndUpdate(
      { _id },
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    if (!user) {
      return res.status(404).send({
        message: "The user not found and not updated",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// update User password
const UpdatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const user = await userSchema.findById(req.userId);
    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      return res.status(400).send({
        message: "Old password is incorrect",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).send({
        message: "Password does not match",
      });
    }
    let salt = await bcrypt.genSalt(10); //round 10 out of total 12 round
    let encryptedPassword = await bcrypt.hash(newPassword, salt);
    user.password = encryptedPassword;
    user.confirmNewPassword = encryptedPassword;
    await user.save();
    return res.status(200).send({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  UserRegistration,
  UserLogin,
  UserDetails,
  UpdateDetails,
  GetAllUsers,
  RemoveUserById,
  AdminUpdateUser,
  UpdatePassword,
};
