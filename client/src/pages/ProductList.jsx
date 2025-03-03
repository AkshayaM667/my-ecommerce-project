import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("price-asc");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const loadProducts = async () => {
      let data = await fetchProducts();
      const uniqueCategories = [...new Set(data.map((product) => product.category))];
      setCategories(uniqueCategories);
      setProducts(data);
      setFilteredProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];
    if (category) updatedProducts = updatedProducts.filter((product) => product.category === category);
    if (searchTerm) updatedProducts = updatedProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (sort === "price-asc") updatedProducts.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") updatedProducts.sort((a, b) => b.price - a.price);
    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  }, [category, searchTerm, sort, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Products</h2>
        
        <div className="category-container text-center mb-4">
          {categories.map((cat) => (
            <button key={cat} className={`btn m-2 ${category === cat ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-md-4">
            <label className="form-label">Sort by:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="form-select">
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Search:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-secondary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </button>
          <span className="align-self-center mx-3">Page {currentPage} of {totalPages}</span>
          <button className="btn btn-secondary" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
