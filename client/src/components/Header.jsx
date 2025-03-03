import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MyShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login{" "}
              </Link>
            </li>
            {/* ✅ Top Right Buttons (After Login Box) */}
            <div className="top-right-buttons">
              <Link to="/cart" className="btn btn-warning me-2">
                🛒 Cart
              </Link>
              <Link to="/wishlist" className="btn btn-danger">
                ❤️ Wishlist
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
