const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { checkToken } = require("../middlewares/tokenAuth");
const { checkIsAdmin } = require("../middlewares/isAdmin");
const {
  UserRegistration,
  UserLogin,
  UserLogout,
  UserDetails,
  UpdateDetails,
  GetAllUsers,
  GetUserById,
  RemoveUserById,
  UpdateUserById,
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

//LogoutUser
router.post("/logout", UserLogout);

//GetLoggedInUser
router.get("/userInfo", checkToken, UserDetails);

//UpdateLoggedInUser
router.put("/userInfo/update", checkToken, UpdateDetails);

//AdminCanGetAllUsers
router.get("/admin/users", checkIsAdmin,GetAllUsers);

//AdminCanPerformTheseOperationsById
router.get("/admin/getUser/:u_id", checkToken, checkIsAdmin, GetUserById);
router.put("/admin/updateUser", checkToken, UpdateUserById);
router.delete("/admin/deleteUser", checkIsAdmin, RemoveUserById);

module.exports = router;
