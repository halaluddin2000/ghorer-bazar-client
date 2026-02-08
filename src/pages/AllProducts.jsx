import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";
import { CartContext } from "../Components/context/CartContext";

const AllProducts = () => {
  const { addToCart, cart, setIsDrawerOpen } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/all-products")
      .then((res) => {
        setProducts(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // Make sure you send the right payload
      const payload = { id: product.id, quantity: 1 };

      const res = await api.post("/carts/add", payload);

      if (res.data?.result) {
        // Save temp_user_id if exists
        if (res.data.temp_user_id) {
          localStorage.setItem("temp_user_id", res.data.temp_user_id);
        }

        // Ensure price is a number
        const price = parseFloat(
          String(product.main_price ?? 0).replace(/[^0-9.]/g, ""),
        );

        // Update cart context
        addToCart({
          id: product.id,
          name: product.name,
          price: price,
          image: product.thumbnail_image,
          qty: 1,
        });

        // Open cart drawer
        setIsDrawerOpen(true);
      } else {
        console.error("Add to cart failed, backend returned:", res.data);
      }
    } catch (err) {
      console.error("Cart API error:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-3 sm:px-4 bg-white mb-6 md:mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 py-6 lg:py-10 text-center">
        ALL PRODUCTS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 sm:p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1 relative"
          >
            {/* Discount Badge from backend */}
            {product.discount && product.discount > 0 ? (
              <span className="absolute top-2 left-2 bg-red-400 text-white text-sm font-semibold p-2 rounded-3xl z-10 shadow">
                {product.discount_type === "percent"
                  ? `${product.discount} % OFF`
                  : `Save ৳ ${product.discount}`}
              </span>
            ) : null}

            <Link to={`/products/details/${product.slug}`}>
              <img
                src={product.thumbnail_image}
                alt={product.name}
                className="w-full h-26 sm:h-28 md:h-56 object-cover mb-3 rounded"
              />
              <h3 className="font-semibold text-base py-2 text-center">
                {product.name}
              </h3>

              <div className="text-center flex justify-center items-center gap-2">
                <p className="text-lg text-gray-600">
                  ৳{" "}
                  {parseFloat(
                    String(product.main_price).replace(/[^0-9.]/g, ""),
                  ).toFixed(2)}
                </p>

                {/* Original Price (struck-through) */}
                {product.has_discount && product.stroked_price ? (
                  <p className="text-sm line-through text-gray-400">
                    ৳{" "}
                    {parseFloat(
                      String(product.stroked_price).replace(/[^0-9.]/g, ""),
                    ).toFixed(2)}
                  </p>
                ) : null}

                {/* Discount Badge */}
                {product.has_discount && product.discount_amount ? (
                  <p className="text-sm py-1 px-2 text-white rounded-lg bg-[#2CC4F4]">
                    Save ৳ {parseFloat(product.discount_amount).toFixed(2)}
                    {parseFloat(
                      String(product.discount_amount).replace(/[^0-9.]/g, ""),
                    ).toFixed(2)}
                  </p>
                ) : null}
              </div>
              {/* Final Price (after discount or just normal price) */}
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
    </div>
  );
};

export default AllProducts;
