import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center mt-3">Your cart is empty.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeFromCart(item._id))}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {cartItems.length > 0 && (
          <button className="btn btn-warning" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
