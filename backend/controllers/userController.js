const userSchema = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../middlewares/jwt");

const UserRegistration = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
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
        message: "Password and Confirm password don't match",
      });
    } else {
      let salt = await bcrypt.genSalt(10); //round 10 out of total 12 round
      let encryptedPassword = await bcrypt.hash(password, salt);
      const user = await userSchema.create({
        ...req.body,
        password: encryptedPassword,
        confirmPassword: encryptedPassword,
      });
      return res.status(200).send({
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
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
      return res.status(205).send({
        message: "Invalid Credientials",
      });
    }
    const token = jwtHelper.issue({
      id: user._id,
      name: user.name,
      role: user.role,
    });
    return res.status(200).send({
      message: "Login successfull",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const UserLogout = async (req, res) => {
  try {
    res.cookie("token", null);
    res.status(200).send({
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).send({
      message: "The server error",
      error,
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
      message: "Users Info found successfully",
      data: SpecificUserInfo,
      specficUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const UpdateDetails = async (req, res) => {
  const specficUser = req.userId;
  const { name, email, password, confirmPassword, role } = req.body;
  let salt = await bcrypt.genSalt(10); //round 10 out of total 12 round
  let encryptedPassword = await bcrypt.hash(password, salt);
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
        password: encryptedPassword,
        confirmPassword: encryptedPassword,
        ...req.body,
      }
    );
    return res.status(200).send({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetAllUsers = async (req, res) => {
  // const specficUser = req.userId;
  try {
    let allUsers = await userSchema.find();
    if (allUsers.length < 0) {
      return res.status.send({
        message: "No User Found",
        data: [],
      });
    }
    // const foundedUser = await userSchema
    //   .findOne({ specficUser })
    //   .select("name");
    return res.status(200).send({
      message: "Users found successfully",
      data: allUsers,
      // foundedUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetUserById = async (req, res) => {
  try {
    let user = await userSchema
      .findOne({ _id: req.params.u_id })
      .select("-_id name email role");
    if (!user) {
      return res.status(404).send({
        message: "The User Not Found",
      });
    }
    return res.status(200).send({
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
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
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const UpdateUserById = async (req, res) => {
  const { _id, name, email, password, confirmPassword, role } = req.body;
  let salt = await bcrypt.genSalt(10); //round 10 out of total 12 round
  let encryptedPassword = await bcrypt.hash(password, salt);
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
        password: encryptedPassword,
        confirmPassword: encryptedPassword,
        ...req.body,
      }
    );
    if (!user) {
      return res.status(404).send({
        message: "The User not found and not updated",
      });
    }
    return res.status(200).send({
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

module.exports = {
  UserRegistration,
  UserLogin,
  UserLogout,
  UserDetails,
  UpdateDetails,
  GetAllUsers,
  GetUserById,
  RemoveUserById,
  UpdateUserById,
};
