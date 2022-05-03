const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {checkToken} = require("../middlewares/tokenAuth");
const {checkIsAdmin} = require("../middlewares/isAdmin");
const {
  CreateProduct,
  GetAllProducts,
  GetAdminProduct,
  UpdateProduct,
  DeleteProduct,
  ProductDetails,
} = require("../controllers/productController");

//AdminCanCreateProduct
router.post(
  "/admin/product/new",
  check("name", "Name cannot be empty").notEmpty(),
  check("description", "Description cannot be empty").notEmpty(),
  check("price", "Price cannot be empty").notEmpty(),
  check("ratings", "Ratings cannot be empty").notEmpty(),
  check("category", "Product Category roles cannot be empty").notEmpty(),
  check("stock", "Product Stock roles cannot be empty").notEmpty(),
  check("numOfReviews", "Number of Review cannot be empty").notEmpty(),
  // checkToken,
  // checkIsAdmin,
  CreateProduct
);

//GetAllProducts
router.get("/products", GetAllProducts);

//GetAdminProduct
// router.get("/getAdminProducts", checkToken, checkIsAdmin, GetAdminProduct);

//AdminCanUpdateProduct
router.put("/admin/product/:p_id", checkToken, checkIsAdmin, UpdateProduct);

//AdminCanDelete/RemoveProduct
router.delete("/admin/product/:p_id", checkToken, checkIsAdmin, DeleteProduct);

//GetSpecificProduct
router.get("/product/:p_id", ProductDetails);

module.exports = router;
