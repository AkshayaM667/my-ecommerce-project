import express from "express";
import Product from "../models/productModel.js"; // ✅ Import Product Model

const router = express.Router();

// ✅ Get all products with filters, sorting & pagination
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sort, page = 1, limit = 6 } = req.query;
    let filter = {};

    // ✅ Filter by category
    if (category) {
      filter.category = category;
    }

    // ✅ Filter by price range
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    }

    // ✅ Search by product name (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // ✅ Sorting Logic
    const sortOptions = {};
    if (sort === "price-asc") {
      sortOptions.price = 1; // Ascending
    } else if (sort === "price-desc") {
      sortOptions.price = -1; // Descending
    }

    // ✅ Pagination settings
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // ✅ Fetch products from DB with filters, sorting, and pagination
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
      perPage: parseInt(limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;