const orderSchema = require("../models/orderModel");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../middlewares/jwt");

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
  } catch (err) {
    return res.status(500).send({
      message: "Service error",
      error: err,
    });
  }
};

const GetSingleOrderDetail = async (req, res) => {
  try {
    let order = await orderSchema
      .findOne({_id: req.params.o_id})
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
    const myOrders = await orderSchema.find({user: req.user._id});
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
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
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
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
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
      {_id: req.params.o_id},
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

module.exports = {
  CreateOrder,
  GetSingleOrderDetail,
  MyOrders,
  GetAllOrders,
  DeleteOrderById,
  UpdateOrderById,
};
