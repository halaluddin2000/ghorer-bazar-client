import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";
import { CartContext } from "../Components/context/CartContext";

const AllProducts = () => {
  const { addToCart, cart, setIsDrawerOpen } = useContext(CartContext);
  console.log("AllProducts cart:", cart);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/all-products")
      .then((res) => {
        setProducts(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product) => {
    // const tempUserId = localStorage.getItem("temp_user_id");

    const payload = {
      id: product.id,
      quantity: 1,
    };

    try {
      const res = await api.post("/carts/add", payload);

      if (res.data?.result) {
        if (res.data.temp_user_id) {
          localStorage.setItem("temp_user_id", res.data.temp_user_id);
        }

        addToCart({
          id: product.id,
          name: product.name,
          price: parseFloat(product.main_price.replace(/[^0-9.]/g, "")),
          image: product.thumbnail_image,
          qty: 1,
        });

        setIsDrawerOpen(true);
      }
    } catch (err) {
      console.error("Cart API error:", err);
    }
    console.log("Cart payload:", payload);
  };

  if (loading)
    return (
      <div className="text-center text-xl py-10">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto px-3 sm:px-4 bg-white mb-6 md:mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 py-6 lg:py-10 md:mt-6 sm:py-16 text-center">
        ALL PRODUCTS
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 sm:p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <Link to={`/products/details/${product.slug}`}>
              <img
                src={product.thumbnail_image}
                alt={product.name}
                className="w-full h-26 sm:h-28 md:h-56 object-cover mb-3 rounded"
              />
              <h3 className="font-semibold text-base py-2 text-center">
                {product.name}
              </h3>
              <p className="text-lg text-gray-600 text-center">
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
              className="bg-[#2CC4F4] rounded-lg p-2 text-white w-full mt-3 hover:bg-[#1fa3dc] transition-colors duration-300"
            >
              Quick Add
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Sticky Add to Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-semibold">🛒 {cart.length} item added</p>

            <Link
              to="/cart"
              className="bg-black text-white px-5 py-2 rounded text-sm hover:bg-gray-800 transition-colors duration-300"
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
