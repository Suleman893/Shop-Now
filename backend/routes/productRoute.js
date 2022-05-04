const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {checkToken} = require("../middlewares/tokenAuth");
const {checkIsAdmin} = require("../middlewares/isAdmin");
const {
  CreateProduct,
  GetAllProducts,
  GetLatestProducts,
  GetFeaturedProduct,
  GetAdminProduct,
  UpdateProduct,
  DeleteProduct,
  ProductDetails,
  SearchProduct,
} = require("../controllers/productController");

//SearchProduct
router.get("/searchProduct/:name", SearchProduct);

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

//GetLatestProduct
router.get("/latestProduct", GetLatestProducts);

//GetFeaturedProduct
router.get("/featuredProduct", GetFeaturedProduct);

//GetAdminProduct
// router.get("/getAdminProducts", checkToken, checkIsAdmin, GetAdminProduct);

//AdminCanUpdateProduct
router.put("/admin/product/:id", checkToken, checkIsAdmin, UpdateProduct);

//AdminCanDelete/RemoveProduct
router.delete("/admin/product/:id", checkToken, checkIsAdmin, DeleteProduct);

//GetSpecificProduct
router.get("/product/:id", ProductDetails);

module.exports = router;
