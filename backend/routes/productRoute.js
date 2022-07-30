const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { checkToken } = require("../middlewares/tokenAuth");
const { checkIsAdmin } = require("../middlewares/isAdmin");
const {
  CreateProduct,
  GetAllProducts,
  AdminGetAllProducts,
  GetLatestProducts,
  GetFeaturedProduct,
  UpdateProduct,
  DeleteProduct,
  ProductDetails,
  SearchProduct,
  GetProductByCategory,
  CreateProductReview,
  NewGetAllProducts,
  LatestGetAllProducts,
} = require("../controllers/productController");

//LatestGetAllProducts
router.get("/latestGetProduct/:category", LatestGetAllProducts);

//GetAllProducts
router.get("/products", GetAllProducts);

//NewGetAllProducts
router.get("/newProducts", NewGetAllProducts);

//SearchProduct
router.get("/searchProduct/:productName", SearchProduct);

//GetLatestProduct
router.get("/latestProduct", GetLatestProducts);

//GetFeaturedProduct
router.get("/featuredProduct", GetFeaturedProduct);

//GetSpecificProduct
router.get("/product/:id", ProductDetails);

//GetProductByCategory
router.get("/productbycategory/:category", GetProductByCategory);

// Create New Review or Update the review
router.put("/productreview", checkToken, CreateProductReview);

//AdminGetAllProducts
router.get("/adminproducts", checkIsAdmin, AdminGetAllProducts);

//AdminCanCreateProduct
router.post(
  "/admin/product/new",
  check("productName", "Name cannot be empty").notEmpty(),
  check("description", "Description cannot be empty").notEmpty(),
  check("price", "Price cannot be empty").notEmpty(),
  check("category", "Product Category roles cannot be empty").notEmpty(),
  check("stock", "Product Stock roles cannot be empty").notEmpty(),
  checkIsAdmin,
  CreateProduct
);

//AdminCanUpdateProduct
router.put("/admin/product", checkIsAdmin, UpdateProduct);

//AdminCanDelete/RemoveProduct
router.delete("/admin/product", checkIsAdmin, DeleteProduct);

module.exports = router;
