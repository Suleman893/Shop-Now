const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { checkToken } = require("../middlewares/tokenAuth");
const { checkIsAdmin } = require("../middlewares/isAdmin");
const {
  UserRegistration,
  UserLogin,
  UserDetails,
  UpdateDetails,
  GetAllUsers,
  RemoveUserById,
  AdminUpdateUser,
  UpdatePassword,
} = require("../controllers/userController");

//UserRegistration
router.post(
  "/register",
  check("name", "Name cannot be empty").notEmpty(),
  check("email", "Email cannot be empty").notEmpty(),
  check("password", "Password cannot be empty").notEmpty(),
  check("confirmPassword", "Confirm password cannot be empty").notEmpty(),
  // check("role", "User roles cannot be empty").notEmpty(),
  UserRegistration
);

//UserLogin
router.post(
  "/login",
  check("email", "Email cannot be empty").notEmpty(),
  check("password", "Password cannot be empty").notEmpty(),
  UserLogin
);

//GetLoggedInUser
router.get("/userInfo", checkToken, UserDetails);

//UpdateLoggedInUser
router.put("/userInfo/update", checkToken, UpdateDetails);

//AdminCanGetAllUsers
router.get("/admin/users", checkIsAdmin, GetAllUsers);

//AdminCanUpdateUser(Role of user can be changed)
router.put("/admin/updateUser", checkIsAdmin, AdminUpdateUser);

//AdminCanDeleteUser
router.delete("/admin/deleteUser", checkIsAdmin, RemoveUserById);

//UserCanUpdateItsPassword
router.put("/updatePassword", checkToken, UpdatePassword);

module.exports = router;
