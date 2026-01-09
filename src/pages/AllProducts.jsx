import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Components/context/CartContext";
import { products } from "../data/product";

const AllProducts = () => {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products");
        console.log(response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);

    // 2 sec পরে popup hide হবে
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="container bg-white mb-10">
      <h2 className="text-4xl font-semibold mb-6 py-16 text-center">
        ALL PRODUCT
      </h2>

      {/* ✅ Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          ✅ Product added to cart
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-3 hover:scale-105 transition"
              />
              <h3 className="font-semibold text-base">{product.name}</h3>
              <p className="text-sm text-gray-600 text-center">
                TK {product.price}
              </p>
            </Link>

            <br />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="btn-primary w-full"
            >
              Quick Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
