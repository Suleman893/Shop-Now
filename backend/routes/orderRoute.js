const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { checkToken } = require("../middlewares/tokenAuth");
const { checkIsAdmin } = require("../middlewares/isAdmin");
const {
  CreateOrder,
  GetSingleOrderDetail,
  MyOrders,
  GetAllOrders,
  DeleteOrderById,
  UpdateOrderById,
  PlaceOrder,
  GetOrders,
  adminGetAllOrders,
} = require("../controllers/orderController");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("hereprivatekey");

router.post("/placeOrder", PlaceOrder);

router.post("/getUserOrder", GetOrders);

//Old
//OrderTheProduct
router.post(
  "/new",
  check("shippingInfo", "Name cannot be empty").notEmpty(),
  check("orderItems", "Description cannot be empty").notEmpty(),
  check("paymentInfo", "Price cannot be empty").notEmpty(),
  check("itemsPrice", "Ratings cannot be empty").notEmpty(),
  check("taxPrice", "Product Category roles cannot be empty").notEmpty(),
  check("shippingPrice", "Product Stock roles cannot be empty").notEmpty(),
  check("totalPrice", "Number of Review cannot be empty").notEmpty(),
  CreateOrder
);

//GetSpecificOrder
router.get("/my/:o_id", GetSingleOrderDetail);

//GetAllOrders
router.get("/my", MyOrders);

//GetAllProduct
router.get("/admin/orders", GetAllOrders);

//Admin can delete update order of user
router.get(
  "/admin/orderDelete/:o_id",

  DeleteOrderById
);
router.get(
  "/admin/orderUpdate/:o_id",

  UpdateOrderById
);

//Admin get all order
router.get("/admin/adminGetAllOrders", adminGetAllOrders);

module.exports = router;
