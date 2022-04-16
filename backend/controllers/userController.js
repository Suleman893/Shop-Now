const userSchema = require("../models/userModel");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../middlewares/jwt");

const UserRegistration = async (req, res) => {
  const {name, email, password, confirmPassword, role} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let emailExist;
    emailExist = await userSchema.findOne({
      email: email,
    });
    if (emailExist) {
      return res.status(409).send({
        message: "Email already exist",
      });
    } else if (password !== confirmPassword) {
      return res.status(409).send({
        message: "Password and confirm password dont match",
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
        data: user,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Service error",
      error: err,
    });
  }
};

const UserLogin = async (req, res) => {
  const {email, password} = req.body;
  try {
    let user;
    user = await userSchema.findOne({
      email: email,
    });

    if (!user) {
      return res.status(204).send({
        message: "Invalid Email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(205).send({
        message: "Invalid Password",
      });
    }
    const token = jwtHelper.issue({id: user._id, role: user.role});
    return res.status(200).cookie("token", token).send({
      message: "Login successfull",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "The server error",
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
        data: [],
      });
    }
    return res.status(200).send({
      message: "Users Info found successfully",
      data: SpecificUserInfo,
      specficUser,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

const UpdateDetails = async (req, res) => {
  const specficUser = req.userId;
  const {name, email, password, confirmPassword, role} = req.body;
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
      {_id: specficUser},
      {
        password: encryptedPassword,
        confirmPassword: encryptedPassword,
        ...req.body,
      }
    );
    return res.status(200).send({
      message: "user updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
    });
  }
};

const GetAllUsers = async (req, res) => {
  const specficUser = req.userId;
  try {
    let allUsers = await userSchema.find().select("_id name email role status");
    if (allUsers.length < 0) {
      return res.status.send({
        message: "No User Found",
        data: [],
      });
    }
    const foundedUser = await userSchema.findOne({specficUser}).select("name");
    return res.status(200).send({
      message: "Users found successfully",
      data: allUsers,
      foundedUser,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

const GetUserById = async (req, res) => {
  console.log("id", req.params.u_id);
  try {
    let user = await userSchema
      .findOne({_id: req.params.u_id})
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
      message: "Error of server",
    });
  }
};

const RemoveUserById = async (req, res) => {
  try {
    let user = await userSchema.findOneAndDelete({
      _id: req.params.u_id,
    });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }
    return res.status(200).send({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

const UpdateUserById = async (req, res) => {
  const {name, email, password, confirmPassword, role} = req.body;
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
      {_id: req.params.u_id},
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
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
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
