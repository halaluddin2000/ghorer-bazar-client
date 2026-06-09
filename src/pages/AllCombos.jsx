import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";

const AllCombos = () => {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/combo-products")
      .then((res) => {
        setCombos(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="md:text-4xl text-xl font-bold text-center my-4 md:my-10">
        ALL COMBO PRODUCTS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {combos.map((combo) => {
          const mainPrice = parseFloat(
            String(combo.main_price || 0).replace(/[^0-9.]/g, ""),
          );

          const strokedPrice = parseFloat(
            String(combo.stroked_price || 0).replace(/[^0-9.]/g, ""),
          );

          const saveAmount = strokedPrice - mainPrice;

          return (
            <div
              key={combo.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg"
            >
              <Link to={`/combo-products/details/${combo.slug}`}>
                <div className="relative bg-gray-50">
                  {combo.discount && (
                    <div className="absolute top-0 left-0 z-10">
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-br-2xl">
                        {combo.discount_type === "percent"
                          ? `Save ${combo.discount}%`
                          : `Save ৳${combo.discount}`}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-0 right-0 z-10">
                    <span className="bg-[#2CC4F4] text-white text-xs font-semibold px-3 py-2 rounded-bl-2xl">
                      Combo Offer
                    </span>
                  </div>

                  <img
                    src={combo.thumbnail_image}
                    alt={combo.name}
                    className="w-full h-64 object-contain p-4"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-base py-2 text-center">
                    {combo.name}
                  </h3>

                  <div className="flex gap-2 mt-2">
                    <span className="text-[#000] text-lg font-medium">
                      {combo.main_price}
                    </span>

                    {combo.discount && (
                      <span className="line-through text-gray-400">
                        {combo.stroked_price}
                      </span>
                    )}
                  </div>

                  <button className="w-full mt-4 bg-[#2CC4F4] text-white py-2 rounded">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCombos;
