import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";

const ComboProducts = () => {
  const [comboProducts, setComboProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/combo-products")
      .then((res) => {
        setComboProducts(res.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Combo Products Error:", err);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return parseFloat(String(price || 0).replace(/[^0-9.]/g, "")).toFixed(2);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-3 sm:px-4 bg-white mb-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-[#132238]">
          Exclusive Combo Deals
        </h2>

        <Link
          to="/combo-products"
          className="bg-[#2CC4F4] text-white px-5 py-3 rounded-md font-semibold"
        >
          View All Combos →
        </Link>
      </div>

      {comboProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No Combo Products Found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {comboProducts.map((combo) => {
            const isOutOfStock = combo.current_stock === 0;

            return (
              <div
                key={combo.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/combo-products/details/${combo.slug}`}>
                  {/* Image */}
                  <div className="relative bg-gray-50">
                    {/* Save Badge */}
                    {combo.discount > 0 && (
                      <div className="absolute top-0 left-0 z-10">
                        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-br-2xl">
                          {combo.discount_type === "percent"
                            ? `Save ${combo.discount}%`
                            : `Save ৳${combo.discount}`}
                        </span>
                      </div>
                    )}

                    {/* Combo Badge */}

                    <img
                      src={combo.thumbnail_image}
                      alt={combo.name}
                      className="w-full h-64 object-contain p-4"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-[18px] font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
                      {combo.name}
                    </h3>

                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span className="text-lg font-medium text-[#000]">
                        {combo.main_price}
                      </span>

                      {combo.discount > 0 && (
                        <span className="text-xl text-gray-400 line-through">
                          {combo.stroked_price}
                        </span>
                      )}
                    </div>

                    <button className="w-full mt-5 bg-[#2CC4F4] hover:bg-[#1fa3dc] text-white py-3 rounded-md font-semibold transition">
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComboProducts;
