import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // ✅ Backend API URL

// ✅ Fetch all products with filters, sorting & pagination
export const fetchProducts = async (filters = {}) => {
  try {
    const {
      category = "",
      minPrice = "",
      maxPrice = "",
      search = "",
      sort = "price-asc",
      page = 1,
      limit = 6,
    } = filters; // ✅ Set Default Values

    const response = await axios.get(API_URL, {
      params: { category, minPrice, maxPrice, search, sort, page, limit },
    });

    return response.data; // ✅ Returns { products, totalProducts, totalPages, currentPage, perPage }
  } catch (error) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);
    return { products: [], totalPages: 0 }; // ✅ Return empty data if error occurs
  }
};

// ✅ Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    if (!id) {
      console.error("❌ Product ID is required");
      return null;
    }

    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching product:", error.response?.data || error.message);
    return null; // ✅ Return null if error occurs
  }
};
