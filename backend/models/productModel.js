const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Enter product name"],
      maxLength: [40, "Name shouldnt exceed 40 characters"],
      minLength: [30, "Name should have more than 30 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Enter product description"],
      maxLength: [400, "Name shouldnt exceed 400 characters"],
    },
    price: {
      type: Number,
      required: [true, "Enter product price"],
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
      required: [true, "Show correct product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [20, "Stock cannot exceed 20"],
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    //Reviews
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
        email: {
          type: String,
          required: [true, "Email is required"],
        },
        userPic: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
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
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", productSchema);
