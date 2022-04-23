const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    pinCode: {
      type: Number,
      required: [true, "PinCode is required"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Phone Number is required"],
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity"],
      },
      image: {
        type: String,
        // required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required to make order"],
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  paymentInfo: {
    id: {
      type: String,
      required: [true, "Payment Info"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
  },
  paidAt: {
    type: Date,
    required: [true, "Paid at required"],
  },
  itemsPrice: {
    type: Number,
    required: [true, "Item price is required"],
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: [true, "Tax Price is required"],
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: [true, "Shipping Price is required"],
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: [true, "Total Price is required"],
    default: 0,
  },
  orderStatus: {
    type: String,
    required: [true, "Order status is required"],
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
