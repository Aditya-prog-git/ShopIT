import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name"],
    maxLength: [200, "Product name cannot exceed 200 characters"]
  },
  price: {
    type: Number,
    required: [true, "Please enter a product price"],
    maxLength: [8, "Product price cannot exceed 8 characters"]
  },
  description: { // Corrected spelling
    type: String,
    required: [true, "Please enter a product description"]
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please enter a product category"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select the correct category for this product"
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter a product seller"]
  },
  stock: {
    type: Number,
    required: [true, "Please enter a product stock"]
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews : [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, {timestamps: true});

export default mongoose.model("Product", productSchema);