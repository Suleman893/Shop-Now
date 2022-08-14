const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { MailSender } = require("../controllers/mailController");

//MAIL
router.post(
  "/sendmail",
  check("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email"),
  MailSender
);

module.exports = router;
