const subscribeSchema = require("../models/subscribeModel");
const { validationResult } = require("express-validator");
const sendEmail = require("../utils/sendEmail");

const MailSender = async (req, res) => {
  const { email } = req.body;

  const message = "Subscription message";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    const emailExist = await subscribeSchema.findOne({
      email,
    });
    if (emailExist) {
      return res.status(409).send({
        message: "Email already exist",
      });
    } else {
      await sendEmail({
        email: email,
        subject: "Thanks for subscribing with Shop now",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${email} successfully`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Out of try",
    });
  }
};

module.exports = {
  MailSender,
};
