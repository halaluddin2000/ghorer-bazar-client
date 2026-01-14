import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../Components/context/CartContext";

const AllProducts = () => {
  const { addToCart, cart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/all-products")
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.main_price.replace(/[^\d]/g, "")),
      image: product.thumbnail_image,
      qty: 1,
    });

    addToCart(product);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  if (loading) return <p className="text-center text-xl py-10">Loading...</p>;

  return (
    <div className="container mx-auto px-3 sm:px-4 bg-white mb-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 py-10 sm:py-16 text-center">
        ALL PRODUCT
      </h2>

      {/* ✅ Popup */}
      {showPopup && (
        <div className="fixed top-5 right-3 sm:right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
          ✅ Product added to cart
        </div>
      )}

      {/* ✅ Mobile: 1 card | Tablet: 3 | Desktop: 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 sm:p-4 hover:shadow transition"
          >
            <Link to={`/products/details/${product.slug}`}>
              <img
                src={product.thumbnail_image}
                alt={product.name}
                className="w-full h-48 sm:h-36 md:h-40 object-cover mb-3"
              />

              <h3 className="font-semibold text-base py-2 text-center line-clamp-2">
                {product.name}
              </h3>

              <p className="text-base text-gray-600 text-center">
                {product.main_price}
              </p>
            </Link>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="btn-primary w-full mt-3"
            >
              Quick Add
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Mobile Sticky Add to Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-semibold">🛒 {cart.length} item added</p>

            <Link
              to="/cart"
              className="bg-black text-white px-5 py-2 rounded text-sm"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
