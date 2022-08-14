const productSchema = require("../models/productModel");
const { validationResult } = require("express-validator");
const ApiFeatures = require("../utils/apifeatures");
const { cloudinary } = require("../utils/cloudinary");

const CreateProduct = async (req, res) => {
  const { productName } = req.body;
  let images = [...req.body.images];
  let imagesBuffer = [];
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
    let result;
    if (productExist) {
      return res.status(409).send({
        message: "This product already exist",
      });
    } else {
      for (let i = 0; i < images.length; i++) {
        result = await cloudinary.uploader.upload(images[i], {
          upload_preset: "Shop-Now",
        });
        imagesBuffer.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      req.body.images = imagesBuffer;
      const newProduct = await productSchema.create({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        images: req.body.images,
      });

      return res.status(201).send({
        success: true,
        message: "New product created successfully",
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
  let query;

  let uiValues = {
    filtering: {},
    sorting: {},
  };
  const reqQuery = { ...req.query }; //Spread the original query so we dont make deletion in original query.
  console.log("the reqQuery", reqQuery);

  const removeFields = ["sort"];

  removeFields.forEach((val) => delete reqQuery[val]);

  const filterKeys = Object.keys(reqQuery);
  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  );

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  try {
    query = productSchema.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortByArr = req.query.sort.split(",");
      sortByArr.forEach((val) => {
        let order;
        if (val[0] === "-") {
          order = "descending";
        } else {
          order = "ascending";
        }
        uiValues.sorting[val.replace("-", "")] = order;
      });
      const sortByStr = sortByArr.join(" ");
      query = query.sort(sortByStr);
    } else {
      query = query.sort("-price");
    }

    const allProducts = await query;
    const maxPrice = await productSchema
      .find()
      .sort({ price: -1 })
      .limit(1)
      .select("-_id price");
    const minPrice = await productSchema
      .find()
      .sort({ price: 1 })
      .limit(1)
      .select("-_id price");
    uiValues.maxPrice = maxPrice[0].price;
    uiValues.minPrice = minPrice[0].price;

    if (allProducts.length < 0) {
      return res.status.send({
        message: "No product found",
        products: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: "Product found successfully",
      products: allProducts,
      uiValues,
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
      // $or: [{ productName: { $regex: req.params.productName, $options: "i" } }],
    });
    return res.status(200).send({
      success: true,
      message: "The product searched",
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
  console.log("Category", category);
  try {
    let query = productSchema.find({ category: category }).sort({ _id: -1 });
    if (query.length < 0) {
      return res.status(404).json({
        status: "fail",
        message: "No product found",
      });
    }
    const result = await query;
    res.status(200).send({
      sucess: true,
      message: "Product found",
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const NewGetAllProducts = async (req, res) => {
  const resultPerPage = 2;
  const productCount = await productSchema.countDocuments();
  try {
    const apiFeature = new ApiFeatures(productSchema.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    let products = await apiFeature.query;
    res.status(200).send({
      success: true,
      products,
      productCount,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const LatestGetAllProducts = async (req, res) => {
  const pageSize = 9;
  const page = parseInt(req.query.page) || "0";
  const { category } = req.params;
  try {
    if (category) {
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
      const categorizedProducts = await query;
    }
    if (!req.params.productName) {
      const total = await productSchema.countDocuments({});
      let allProducts = await productSchema
        .find({})
        .sort({
          _id: -1,
        })
        .limit(pageSize)
        .skip(pageSize * page);
      if (allProducts.length < 0) {
        return res.status.send({
          message: "No product found",
          products: [],
        });
      }
    } else {
      var searchedProduct = await productSchema.find({
        $or: [
          { productName: { $regex: req.params.productName, $options: "i" } },
        ],
        // $or: [{ productName: { $regex: req.params.productName, $options: "i" } }],
      });
    }
    return res.status(200).send({
      success: true,
      message: "Product found successfully",
      products: searchedProduct.length ? searchedProduct : allProducts,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const GetLatestProducts = async (req, res) => {
  const limitProduct = 4;
  try {
    let allLatestProducts = await productSchema
      .find()
      .sort({ _id: -1 })
      .limit(limitProduct);
    if (allLatestProducts.length < 0) {
      return res.status.send({
        message: "No product found",
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
        message: "No product found",
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

const CreateProductReview = async (req, res) => {
  const { rating, comment, productId } = req.body;
  try {
    const review = {
      user: req.userId,
      name: req.name,
      email: req.name,
      userPic: req.userPic,
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

//Admin
const AdminGetAllProducts = async (req, res) => {
  try {
    let allProducts = await productSchema.find().sort({ _id: "-1" });
    if (allProducts.length < 0) {
      return res.status.send({
        message: "No product found",
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
  NewGetAllProducts,
  LatestGetAllProducts,
};
