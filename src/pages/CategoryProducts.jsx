import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";
import { CartContext } from "../Components/context/CartContext";

const CategoryProducts = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, cart, setIsDrawerOpen } = useContext(CartContext);

  // Fetch category products
  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/category/${slug}`)
      .then((res) => {
        setProducts(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = async (product) => {
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

        // finalPrice calculation
        const mainPrice = parseFloat(
          product.main_price?.replace(/[^0-9.]/g, "") || 0,
        );

        const finalPrice =
          product.discount && product.discount_type === "percent"
            ? mainPrice * (1 - product.discount / 100)
            : product.discount && product.discount_type === "amount"
              ? mainPrice - product.discount
              : mainPrice;

        addToCart({
          id: product.id,
          name: product.name,
          price: finalPrice,
          image: product.thumbnail_image,
          qty: 1,
        });

        setIsDrawerOpen(true);
      }
    } catch (err) {
      console.error("Cart API error:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center text-xl py-10">
        <Loader />
      </div>
    );

  return (
    <div className="bg-white">
      <h2
        className="text-3xl font-medium text-center py-6 text-white
        bg-gradient-to-t from-[#2CC4F4] to-slate-100 mb-10"
      >
        Category: {slug}
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 pb-32">
        {products.map((product) => {
          const mainPrice = parseFloat(
            product.main_price?.replace(/[^0-9.]/g, "") || 0,
          );

          const hasDiscount = product.discount && product.discount > 0;

          const finalPrice = hasDiscount
            ? product.discount_type === "percent"
              ? mainPrice * (1 - product.discount / 100)
              : mainPrice - product.discount
            : mainPrice;

          const saveAmount = hasDiscount
            ? product.discount_type === "percent"
              ? (mainPrice * product.discount) / 100
              : product.discount
            : 0;

          return (
            <div
              key={product.id}
              className="border rounded-lg p-3 sm:p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1 relative"
            >
              <Link to={`/products/details/${product.slug}`}>
                <div className="relative">
                  <img
                    src={product.thumbnail_image}
                    className="h-26 w-full  object-cover mb-2 rounded"
                    alt={product.name}
                  />

                  {/* % OFF Badge */}
                  {hasDiscount && product.discount_type === "percent" ? (
                    <span className="absolute top-2 left-2 bg-[#F87171] text-white text-xs font-semibold px-2 py-1 rounded shadow">
                      {product.discount}% OFF
                    </span>
                  ) : null}

                  {/* Save ৳ Badge */}
                  {hasDiscount && product.discount_type === "amount" ? (
                    <span className="absolute top-2 left-1 bg-[#F87171] text-white text-xs font-semibold px-2 py-1 rounded shadow">
                      Save ৳ {saveAmount.toFixed(2)}
                    </span>
                  ) : null}
                </div>

                <h3 className="font-semibold text-base py-2 text-center">
                  {product.name}
                </h3>
                <p className="text-base text-gray-600 text-center">
                  ৳ {finalPrice.toFixed(2)}
                  {hasDiscount ? (
                    <span className="line-through text-gray-400 text-sm ml-2">
                      {product.main_price}
                    </span>
                  ) : null}
                </p>
              </Link>

              {/* Add to Cart */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="w-full bg-[#2CC4F4] text-white font-medium mt-2 py-1 rounded hover:bg-[#1fa3dc] transition-colors duration-300"
              >
                Quick Add
              </button>
            </div>
          );
        })}
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

export default CategoryProducts;
