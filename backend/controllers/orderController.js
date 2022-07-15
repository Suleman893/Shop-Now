const orderSchema = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KwisUAehaVXR4RDAvBTlXixPTnamVm6L78e4sd2joHOPTy0OWGB6WPJJe4XpsGCvzsfr5m1iEGFWLrooSRnSwSZ00w9GrhBzi"
);

const PlaceOrder = async (req, res) => {
  const { token, subTotal, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subTotal * 100,
        currency: "pkr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newOrder = new orderSchema({
        userId: req.userId,
        name: req.name,
        // email: req.email,
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
      res.status(201).send({
        success: true,
        message: "Order placed successful",
      });
    } else {
      res.status(500).send({ message: "Order placed unsuccessful" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const GetOrders = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({ userId: req.userId })
      .sort({ _id: "-1" });
    res.status(200).send({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const GetAllOrders = async (req, res) => {
  try {
    let allOrders = await orderSchema.find().sort({ _id: "-1" });
    const totalOrders = await orderSchema.countDocuments();
    if (allOrders.length < 0) {
      return res.status.send({
        message: "No order found",
        orders: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: "Order found successfully",
      orders: allOrders,
      totalOrders: totalOrders,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const RemoveOrderById = async (req, res) => {
  try {
    let order = await orderSchema.findOneAndDelete({
      _id: req.body.id,
    });
    if (!order) {
      return res.status(400).send({
        message: "Order not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  GetAllOrders,
  PlaceOrder,
  GetOrders,
  RemoveOrderById,
};
