const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenAuth");
const { checkIsAdmin } = require("../middlewares/isAdmin");
const {
  PlaceOrder,
  GetOrders,
  GetAllOrders,
  RemoveOrderById
} = require("../controllers/orderController");

//PlaceTheProduct
router.post("/placeOrder", checkToken, PlaceOrder);

//GetLoggedInUserOrder
router.get("/getUserOrder",checkToken, GetOrders);

//AdminCanGetAllOrders
router.get("/admin/orders", checkIsAdmin, GetAllOrders);

//AdminCanRemoveOrder
router.delete("/delete/orders", checkIsAdmin, RemoveOrderById);

module.exports = router;
