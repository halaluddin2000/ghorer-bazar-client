import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal.jsx";
import OnlinePaymentModal from "../Components/Modal/OnlinePaymentModal.jsx";

import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader.jsx";

import { CartContext } from "../Components/context/CartContext";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, setIsDrawerOpen } = useContext(CartContext);

  const [openCOD, setOpenCOD] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api
      .get(`/products/details/${slug}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.photo_list?.length > 0) {
          setSelectedImage(res.data.photo_list[0].file_name);
        } else if (res.data.thumbnail) {
          setSelectedImage(res.data.thumbnail.file_name);
        }
      })
      .catch(console.error);
  }, [slug]);

  if (!product) return <Loader />;
  const now = Math.floor(Date.now() / 1000); // current time in seconds

  const isDiscountActive =
    product.discount &&
    product.discount > 0 &&
    product.discount_start_date &&
    product.discount_end_date &&
    now >= product.discount_start_date &&
    now <= product.discount_end_date;

  const isOutOfStock = product.current_stock === 0;

  const mainPrice = parseFloat(product.unit_price);
  const hasDiscount = isDiscountActive;

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

  const handleAddToCart = async (openDrawer = true) => {
    if (isOutOfStock) return;

    try {
      const res = await api.post("/carts/add", {
        id: product.id,
        quantity: quantity,
      });

      if (res.data?.temp_user_id) {
        localStorage.setItem("temp_user_id", res.data.temp_user_id);
      }

      addToCart({
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: `https://backend.zhenaura.net/public/${selectedImage}`,
        qty: quantity,
      });

      if (openDrawer) setIsDrawerOpen(true);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const handleQuantityChange = (type) => {
    if (isOutOfStock) return;

    let newQty = quantity;
    if (type === "plus") newQty = Math.min(quantity + 1, product.current_stock);
    if (type === "minus") newQty = Math.max(quantity - 1, 1);

    setQuantity(newQty);
  };

  const handleCOD = async () => {
    if (isOutOfStock) return;
    await handleAddToCart(false);
    setOpenCOD(true);
  };

  const handleOP = async () => {
    if (isOutOfStock) return;
    await handleAddToCart(false);
    setOpenOnline(true);
  };

  const handleWhatsApp = () => {
    const imageUrl = `https://backend.zhenaura.net/public/${selectedImage}`;
    const message = `${imageUrl}\nProduct Name: ${
      product.name
    }\nPrice: ৳ ${finalPrice.toFixed(2)}\nLink: ${window.location.href}`;
    window.open(
      `https://wa.me/8801844545500?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | ZHEN AURA</title>
      </Helmet>

      <div className="container mx-auto px-3 sm:px-4 mt-6 bg-white mb-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-2/5 relative">
            <img
              src={`https://backend.zhenaura.net/public/${selectedImage}`}
              alt={product.name}
              className={`w-full mt-4 max-w-sm md:max-w-full object-contain ${
                isOutOfStock ? "opacity-60 grayscale" : ""
              }`}
            />

            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="w-full md:flex-1 space-y-6 mt-5">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-3">
              <p className="text-xl">৳ {finalPrice.toFixed(2)}</p>
              {hasDiscount ? (
                <>
                  <p className="text-sm line-through text-gray-400">
                    ৳ {mainPrice.toFixed(2)}
                  </p>
                  <p className="text-sm py-1 px-2 text-white rounded-lg bg-[#2CC4F4]">
                    Save ৳ {saveAmount.toFixed(2)}
                  </p>
                </>
              ) : null}
            </div>

            {isOutOfStock && (
              <p className="text-red-500 font-semibold">Out of Stock</p>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                disabled={isOutOfStock}
                onClick={() => handleQuantityChange("minus")}
                className="p-1 border rounded disabled:opacity-40"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="px-2">{quantity}</span>
              <button
                disabled={isOutOfStock}
                onClick={() => handleQuantityChange("plus")}
                className="p-1 border rounded disabled:opacity-40"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            {/* Buttons */}
            <button
              disabled={isOutOfStock}
              onClick={() => handleAddToCart()}
              className={`w-full py-2 rounded text-white ${
                isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-[#2CC4F4]"
              }`}
            >
              Add to Cart
            </button>

            <button
              disabled={isOutOfStock}
              onClick={handleOP}
              className="w-full bg-[#2CC4F4] text-white py-2 rounded disabled:bg-gray-400"
            >
              <FontAwesomeIcon icon={faCartShopping} /> Pay Online
            </button>
            <OnlinePaymentModal
              open={openOnline}
              onClose={() => setOpenOnline(false)}
            />

            <button
              disabled={isOutOfStock}
              onClick={handleCOD}
              className="w-full bg-[#2CC4F4] text-white py-2 rounded disabled:bg-gray-400"
            >
              <FontAwesomeIcon icon={faCartShopping} /> ক্যাশ অন ডেলিভারিতে
              অর্ডার করুন
            </button>
            <CashOnDeliveryModal
              open={openCOD}
              onClose={() => setOpenCOD(false)}
            />

            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#2CC4F4] text-white py-2 rounded"
            >
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
