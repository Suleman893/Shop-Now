"use strict";
const jwtHelper = require("./jwt");
const dotenv = require("dotenv");
dotenv.config();

let checkIsAdmin = (req, res, next) => {

  let token = req.headers.authorization; // in header token will be send in "x-auth-token" variable
  console.log("The token", token);

  if (token) {
    const isVerified = jwtHelper.verify(token);
    if (isVerified.role === "Admin" || isVerified.role === "admin") {
      next();
    } else {
      return res.json({
        success: 401,
        message: "Only Admin have an Access to it",
        status: 401,
      });
    }
  } else {
    return res.json({
      success: 404,
      message: "Token is not provided",
      missingParameters: ["login_token"],
    });
  }
};

module.exports = {
  checkIsAdmin: checkIsAdmin,
};
