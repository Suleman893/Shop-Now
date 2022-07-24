"use strict";
const jwtHelper = require("./jwt");
const dotenv = require("dotenv");
dotenv.config();

let checkToken = (req, res, next) => {
  let token = req.headers.authorization; // in header token will be send in "x-auth-token" variable
  if (token) {
    const isVerified = jwtHelper.verify(token);
    if (isVerified) {
      console.log("Is verified", isVerified);
      req.userId = isVerified.id;
      req.name = isVerified.name;
      req.email = isVerified.email;
req.userPic=isVerified.userPic;
      next();
    } else {
      return res.json({
        success: 404,
        message: "Token is not valid, Please enter a valid token",
      });
    }
  } else {
    return res.json({
      success: 404,
      message: "Token is not provided, Please provide token",
      missingParameters: ["login_token"],
    });
  }
};

module.exports = {
  checkToken,
};
