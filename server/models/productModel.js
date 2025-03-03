import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 10, // Default stock quantity
    },
    rating: {
      type: Number,
      default: 0, // Default rating
    },
    numReviews: {
      type: Number,
      default: 0, // Default number of reviews
    },
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt timestamps
);

const Product = mongoose.model("Product", productSchema);

export default Product;
