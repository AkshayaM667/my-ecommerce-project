import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../api/productApi";
import { addToCart } from "../redux/cartSlice";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p className="text-muted">${product.price}</p>
            <p>{product.description}</p>
            <button className="btn btn-primary mt-3" onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
