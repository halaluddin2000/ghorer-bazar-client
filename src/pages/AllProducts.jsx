import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../Components/context/CartContext";

const AllProducts = () => {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/all-products")
      .then((res) => {
        setProducts(res.data.data); // 🔥 important
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

    // 2 sec পরে popup hide হবে
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };
  if (loading)
    return <p className="text-center text-5xlc text-black py-10">Loading...</p>;

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
            <Link to={`/products/details/${product.slug}`}>
              <img
                src={product.thumbnail_image}
                alt={product.name}
                className="w-full h-40 object-cover mb-3 hover:scale-105 transition"
              />
              <h3 className="font-semibold text-base py-2 text-center">
                {product.name}
              </h3>
              <p className="text-lg text-gray-600 text-center">
                {product.main_price}
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
