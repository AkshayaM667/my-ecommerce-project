import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const categories = [
  { name: "Phones", image: "/images/phones.jpg" },
  { name: "Computers", image: "/images/computers.jpg" },
  { name: "Smartwatch", image: "/images/smartwatch.jpg" },
  { name: "Camera", image: "/images/camera.jpg" },
  { name: "Headphones", image: "/images/headphones.jpg" },
  { name: "Gaming", image: "/images/gaming.jpg" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts({ limit: 4 });
      setProducts(data.products);
      setFilteredProducts(data.products);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  return (
    <div>
      <Header />

      

      {/* ✅ Hero Section */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div>
          <h1>Welcome to Our E-Commerce Store</h1>
          <p>Find the best deals on premium products!</p>
          <Link to="/products" className="btn btn-light btn-lg">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="container mt-4">
        {/* ✅ Search Bar */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ✅ Categories Section */}
        <div className="category-section container mt-4">
         
          <h2 className="fw-bold text-center">Browse By Category</h2>

          <div className="row mt-3">
            {categories.map((category) => (
              <div className="col-md-4 mb-4" key={category.name}>
                <Link to={`/products?category=${category.name}`} className="category-card">
                  <img src={category.image} alt={category.name} className="category-image" />
                  <div className="category-overlay">
                    <h4>{category.name}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Featured Products Section */}
        <h2 className="mt-4">Featured Products</h2>
        <div className="row mt-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-danger">No matching products found.</p>
          )}
        </div>

        {/* ✅ View All Products Button */}
        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>

        {/* ✅ Testimonials Section */}
        <h2 className="mt-5">What Our Customers Say</h2>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="testimonial p-3 border rounded shadow-sm">
              <p>"Amazing quality and great service!"</p>
              <strong>- John Doe</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial p-3 border rounded shadow-sm">
              <p>"Super fast delivery and fantastic deals!"</p>
              <strong>- Sarah Smith</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial p-3 border rounded shadow-sm">
              <p>"Best shopping experience I've ever had!"</p>
              <strong>- Michael Lee</strong>
            </div>
          </div>
        </div>

        {/* ✅ Newsletter Subscription */}
        <div className="newsletter-section mt-5 text-center">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with the latest deals and offers.</p>
          <input type="email" className="form-control w-50 mx-auto" placeholder="Enter your email" />
          <button className="btn btn-primary mt-2">Subscribe</button>
        </div>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Home;
