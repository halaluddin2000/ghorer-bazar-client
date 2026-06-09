import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";
import { CartContext } from "../Components/context/CartContext";

const ComboDetails = () => {
  const { slug } = useParams();
  const { addToCart, setIsDrawerOpen } = useContext(CartContext);
  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/combo-products")
      .then((res) => {
        const found = res.data.data.find((item) => item.slug === slug);

        setCombo(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);
  const handleAddToCartCommon = async (item) => {
    if (item.current_stock === 0) return;

    try {
      const temp_user_id = localStorage.getItem("temp_user_id");

      const payload = {
        id: item.id,
        quantity: 1,
        ...(temp_user_id ? { temp_user_id } : {}),
      };

      const res = await api.post("/carts/add", payload);

      if (res.data?.result) {
        if (res.data.temp_user_id) {
          localStorage.setItem("temp_user_id", res.data.temp_user_id);
        }

        const price = parseFloat(
          String(item.main_price ?? 0).replace(/[^0-9.]/g, ""),
        );

        addToCart({
          id: item.id,
          name: item.name,
          price: price,
          image: item.thumbnail_image,
          qty: 1,
        });

        setIsDrawerOpen(true);
      }
    } catch (err) {
      console.error("Cart API error:", err);
    }
  };

  if (loading) return <Loader />;

  if (!combo) return <div className="text-center py-20">Combo Not Found</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid mt-6 md:mt-14 lg:grid-cols-2 gap-10">
        <div className="border rounded-xl p-6">
          <img
            src={combo.thumbnail_image}
            alt={combo.name}
            className="w-full object-contain h-[500px]"
          />
        </div>

        <div>
          <h1 className="text-xl md:text-3xl font-bold mb-5">{combo.name}</h1>

          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="text-lg text-[#000] font-medium">
              {combo.main_price}
            </span>

            {combo.discount && (
              <>
                <span className="line-through text-gray-400">
                  {combo.stroked_price}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                  {combo.discount_type === "percent"
                    ? `Save ${combo.discount}%`
                    : `Save ৳${combo.discount}`}
                </span>
              </>
            )}
          </div>

          <h3 className="text-2xl font-semibold mb-4">Items in This Combo</h3>

          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-3">SL</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Qty</th>
              </tr>
            </thead>

            <tbody>
              {combo.combo_product.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-3">{index + 1}</td>

                  <td className="border p-3">{item.product.name}</td>

                  <td className="border p-3">{item.quantity || 1}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCartCommon(combo);
            }}
            className="w-full mt-8 bg-[#2CC4F4] text-white py-4 rounded-lg font-semibold"
          >
            ADD COMBO TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboDetails;
