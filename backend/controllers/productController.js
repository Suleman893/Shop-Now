const productSchema = require("../models/productModel");
const { validationResult } = require("express-validator");

const CreateProduct = async (req, res) => {
  const { productName } = req.body;
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
      return res.status(201).send({
        success: true,
        message: "New Product Created Successfully",
        product: newProduct,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const GetAllProducts = async (req, res) => {
  const pageSize = 15;
  const page = parseInt(req.query.page) || "0";
  try {
    const total = await productSchema.countDocuments({});
    let allProducts = await productSchema
      .find({})
      .limit(pageSize)
      .skip(pageSize * page);

    if (allProducts.length < 0) {
      return res.status.send({
        message: "No Product Found",
        products: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: "Product found successfully",
      products: allProducts,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const AdminGetAllProducts = async (req, res) => {
  try {
    let allProducts = await productSchema.find().sort({ _id: "-1" });
    if (allProducts.length < 0) {
      return res.status.send({
        message: "No Product Found",
        products: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: "Product found successfully",
      products: allProducts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
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
      success: true,
      message: "Product found successfully",
      latestProducts: allLatestProducts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
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
      success: true,
      message: "Product found successfully",
      featuredProducts: featuredProducts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    let product = await productSchema.findOneAndDelete({
      _id: req.body.id,
    });
    if (!product) {
      return res.status(400).send({
        message: "Product not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const UpdateProduct = async (req, res) => {
  const { productId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  try {
    let product = await productSchema.findOneAndUpdate(
      { _id: productId },
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!product) {
      return res.status(404).send({
        message: "The product not found and not updated",
      });
    }

    return res.status(200).send({
      success: true,
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
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
    return res.status(200).send({
      success: true,
      message: "Product found successfully",
      product: product,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const SearchProduct = async (req, res) => {
  try {
    let searchedProduct = await productSchema.find({
      $or: [{ productName: { $regex: req.params.productName, $options: "i" } }],
      $or: [{ productName: { $regex: req.params.productName, $options: "i" } }],
    });
    return res.status(200).send({
      success: true,
      message: "The Product searched",
      searchedProduct: searchedProduct,
    });
  } catch (error) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

const GetProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    let query = productSchema.find({ category: category }).sort({ _id: -1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = 16;
    const skip = (page - 1) * pageSize;
    const total = await productSchema.countDocuments();
    const pages = Math.ceil(total / pageSize);
    query = query.skip(skip).limit(pageSize);
    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }
    const result = await query;
    res.status(200).send({
      sucess: true,
      message: "Product found",
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const CreateProductReview = async (req, res) => {
  const { rating, comment, productId } = req.body;
  try {
    const review = {
      user: req.userId,
      name: req.name,
      rating: Number(rating),
      comment,
    };
    const product = await productSchema.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.userId.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.userId.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(201).json({
      success: true,
      message: "Product review created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: err.message,
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
  UpdateProduct,
  DeleteProduct,
  ProductDetails,
  GetProductByCategory,
  CreateProductReview,
};
