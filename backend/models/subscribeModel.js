const mongoose = require("mongoose");

const subscribeSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subscribe", subscribeSchema);
