const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [5, "Name should have more than 4 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [8, "Price cannot exceed 8 character"],
    },
    category: {
      type: String,
      enum: [
        "Men Fashion",
        "Women Fashion",
        "Electronic Devices",
        "Home & Lifestyle",
        "Sports & Outdoor",
        "Automotive & Motorbike",
        "Groceries & Pets",
        "Health & Beauty",
      ],
      required: [true, "Please enter product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          // required: true,
        },
        name: {
          type: String,
          required: [true, "Name is required"],
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true,
    },
    //   {
    // images: [
    //     public_id: {
    //       type: String,
    //       required: true,
    //     },
    //     url: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", productSchema);
