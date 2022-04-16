const productSchema = require("../models/productModel");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../middlewares/jwt");

const CreateProduct = async (req, res) => {
  const {name, description, price, ratings, category, stock, numOfReviews} =
    req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let productExist;
    productExist = await productSchema.findOne({
      name: name,
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
        message: "New product created successfully",
        data: newProduct,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Service error",
      error: err,
    });
  }
};

const GetAllProducts = async (req, res) => {
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
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
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
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    let product = await productSchema.findOneAndDelete({
      _id: req.params.p_id,
    });
    if (!product) {
      return res.status(400).send({
        message: "product not found",
      });
    }
    return res.status(200).send({
      message: "product deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

const UpdateProduct = async (req, res) => {
  const {name, description, price, ratings, category, stock, numOfReviews} =
    req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }

  try {
    let product = await productSchema.findOneAndUpdate(
      {_id: req.params.p_id},
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
      message: "Server error",
    });
  }
};

const ProductDetails = async (req, res) => {
  try {
    let product = await productSchema.findOne({_id: req.params.p_id});
    if (!product) {
      return res.send({
        status: "404",
        message: "The product not found",
      });
    }

    return res.send({
      message: "Product found successfully",
      status: "200",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      status: "500",
      message: "Error of server",
    });
  }
};

module.exports = {
  CreateProduct,
  GetAllProducts,
  GetAdminProduct,
  UpdateProduct,
  DeleteProduct,
  ProductDetails,
};
