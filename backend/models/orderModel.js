const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true,
    },
    name: {
      type: String,
      required: [true, "Order name is required"],
    },
    email: {
      type: String,
      // required: [true, "Email is required"],
    },
    orderItems: [],
    shippingAddress: {
      //type should be Object :/
      type: Object,
    },
    orderAmount: {
      type: String,
      // required: true,
    },
    isDelivered: {
      type: String,
      // required: true,
    },
    transactionId: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
