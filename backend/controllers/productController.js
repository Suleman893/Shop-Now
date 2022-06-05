const productSchema = require("../models/productModel");
const { validationResult } = require("express-validator");

const CreateProduct = async (req, res) => {
  const {
    productName,
    description,
    price,
    ratings,
    category,
    stock,
    numOfReviews,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let productExist;
    productExist = await productSchema.findOne({
      productName,
    });
    if (productExist) {
      return res.status(409).send({
        message: "This product already exist",
      });
    } else {
      const newProduct = await productSchema.create({
        ...req.body,
      });
      return res.status(200).send({
        message: "New Product Created Successfully",
        product: newProduct,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetAllProducts = async (req, res) => {
  const pageSize = 21;
  const page = parseInt(req.query.page) || "0";
  try {
    const total = await productSchema.countDocuments();
    let allProducts = await productSchema
      .find()
      .limit(pageSize)
      .skip(pageSize * page);

    if (allProducts.length < 0) {
      return res.status.send({
        message: "No Product Found",
        products: [],
      });
    }
    return res.status(200).send({
      message: "Product found successfully",
      products: allProducts,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};
const AdminGetAllProducts = async (req, res) => {
  try {
    let allProducts = await productSchema.find();
    if (allProducts.length < 0) {
      return res.status.send({
        message: "No Product Found",
        products: [],
      });
    }
    return res.status(200).send({
      message: "Product found successfully",
      products: allProducts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetLatestProducts = async (req, res) => {
  const limitProduct = 8;
  try {
    let allLatestProducts = await productSchema
      .find()
      .sort({ _id: -1 })
      .limit(limitProduct);
    if (allLatestProducts.length < 0) {
      return res.status.send({
        message: "No Product Found",
        latestProducts: [],
      });
    }
    return res.status(200).send({
      message: "Product found successfully",
      latestProducts: allLatestProducts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetFeaturedProduct = async (req, res) => {
  const limitProduct = 4;
  try {
    let featuredProducts = await productSchema
      .find({ featured: true })
      .sort({ _id: -1 })
      .limit(limitProduct);
    if (featuredProducts.length < 0) {
      return res.status.send({
        message: "No Product Found",
        featuredProducts: [],
      });
    }
    return res.status(200).send({
      message: "Product found successfully",
      featuredProducts: featuredProducts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const GetAdminProduct = async (req, res) => {
  try {
    let allProducts = await productSchema.find();
    if (allProducts.length < 0) {
      return res.status.send({
        message: "No Product Found",
        data: [],
      });
    }
    return res.status(200).send({
      message: "Product found successfully",
      data: allProducts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    let product = await productSchema.findOneAndDelete({
      _id: req.params.id,
    });
    if (!product) {
      return res.status(400).send({
        message: "Product not found",
      });
    }
    return res.status(200).send({
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const UpdateProduct = async (req, res) => {
  const {
    productName,
    description,
    price,
    ratings,
    category,
    stock,
    numOfReviews,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let product = await productSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );

    if (!product) {
      return res.status(404).send({
        message: "The product not found and not updated",
      });
    }

    return res.status(200).send({
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const ProductDetails = async (req, res) => {
  try {
    let product = await productSchema.findOne({ _id: req.params.id });
    if (!product) {
      return res.send({
        status: "404",
        message: "The product not found",
      });
    }
    return res.send({
      message: "Product found successfully",
      status: "200",
      product: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error,
    });
  }
};

const SearchProduct = async (req, res) => {
  try {
    let searchedProduct = await productSchema.find({
      // $or: [{ name: { $regex: req.params.name, $options: "i" } }],
      // $or: [{ productName: { $regex: req.params.name, $options: "i" } }],
    });
    return res.status(200).send({
      searchedProduct: searchedProduct,
      message: "The Product searched",
    });
  } catch (error) {
    return res.status(500).send({
      message: err.message,
      error,
    });
  }
};

module.exports = {
  SearchProduct,
  CreateProduct,
  GetAllProducts,
  AdminGetAllProducts,
  GetLatestProducts,
  GetFeaturedProduct,
  GetAdminProduct,
  UpdateProduct,
  DeleteProduct,
  ProductDetails,
};
