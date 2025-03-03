import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">
        {/* ✅ Clickable Image to Navigate to Product Details */}
        <Link to={`/product/${product._id}`}>
          <img src={product.image} className="card-img-top" alt={product.name} loading="lazy" />
        </Link>

        <div className="card-body d-flex flex-column">
          {/* ✅ Clickable Product Name */}
          <h5 className="card-title text-truncate">
            <Link to={`/product/${product._id}`} className="text-dark text-decoration-none">
              {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name}
            </Link>
          </h5>

          <p className="card-text text-muted fw-bold">${product.price}</p>

          <div className="mt-auto">
            {/* ✅ View Details Button */}
            <Link to={`/product/${product._id}`} className="btn btn-primary w-100 mb-2">
              View Details
            </Link>

            {/* ✅ Add to Cart Button */}
            <button className="btn btn-outline-success w-100">
              <i className="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
