import { Link } from "react-router-dom";
import { products } from "../data/product";
import { useContext, useState } from "react";
import { CartContext } from "../Components/context/CartContext";

const AllProducts = () => {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

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
