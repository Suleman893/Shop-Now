const orderSchema = require("../models/orderModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../middlewares/jwt");
const stripe = require("stripe")("hereprivatekey");
const { v4: uuidv4 } = require("uuid");

const CreateOrder = async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    const newOrder = await orderSchema.create({
      ...req.body,
      paidAt: Date.now(),
      // user: req.user._id,
    });
    return res.status(200).send({
      message: "New order made successfully",
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetSingleOrderDetail = async (req, res) => {
  try {
    let order = await orderSchema
      .findOne({ _id: req.params.o_id })
      .poulate("user", "name email");
    if (!order) {
      return res.status(404).send({
        message: "The order not found",
      });
    }
    return res.status(200).send({
      message: "Order found successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error of server",
    });
  }
};

const MyOrders = async (req, res) => {
  try {
    const myOrders = await orderSchema.find({ user: req.user._id });
    if (myOrders.length < 0) {
      return res.status.send({
        message: "No Orders Found",
        data: [],
      });
    }
    return res.status(200).send({
      message: "Orders found successfully",
      data: myOrders,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetAllOrders = async (req, res) => {
  try {
    let allOrders = await orderSchema.find().countDocuments();
    if (allOrders.length < 0) {
      return res.status.send({
        message: "No Order Found",
        data: [],
      });
    }
    return res.status(200).send({
      message: "Order found successfully",
      data: allOrders,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const DeleteOrderById = async (req, res) => {
  try {
    let order = await orderSchema.findOneAndDelete({
      _id: req.params.orderid,
    });
    if (!order) {
      return res.status(400).send({
        message: "order not found and not deleted",
      });
    }
    return res.status(200).send({
      message: "order deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

//admin get all orders
const adminGetAllOrders = async (req, res) => {
  try {
    let allOrders = await orderSchema.find().countDocuments();
    if (allOrders.length < 0) {
      return res.status.send({
        message: "No Order Found",
        data: [],
      });
    }
    return res.status(200).send({
      message: "Order found successfully",
      data: allOrders,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const UpdateOrderById = async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let order = await orderSchema.findOneAndUpdate(
      { _id: req.params.o_id },
      {
        ...req.body,
      }
    );

    if (!order) {
      return res.status(404).send({
        message: "The order not found and not updated",
      });
    }
    return res.status(200).send({
      message: "order updated successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
    });
  }
};

//New
const PlaceOrder = async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subTotal * 100,
        currency: "aed",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      console.log("first");
      const newOrder = new orderSchema({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: subTotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      newOrder.save();
      res.status(200).send({ message: "Payment successful" });
    } else {
      res.status(500).send({ message: "Payment unsuccessful" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
      error: error,
    });
  }
};

const GetOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await orderSchema.find({ userId }).sort({ _id: "-1" });
    res.status(200).send({
      orders: orders,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
      error: error,
    });
  }
};
module.exports = {
  CreateOrder,
  GetSingleOrderDetail,
  MyOrders,
  GetAllOrders,
  DeleteOrderById,
  UpdateOrderById,
  PlaceOrder,
  GetOrders,

  //
  adminGetAllOrders,
};
