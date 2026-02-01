import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faMessage,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader.jsx";

import { CartContext } from "../Components/context/CartContext";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal.jsx";
import OnlinePaymentModal from "../Components/Modal/OnlinePaymentModal.jsx";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, setIsDrawerOpen } = useContext(CartContext);

  const [openCOD, setOpenCOD] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("cart ki ado ace", cart);

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

  const mainPrice = parseFloat(product.unit_price);
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

  const handleQuantityChange = (type) => {
    if (type === "plus")
      setQuantity((q) => Math.min(q + 1, product.current_stock));
    if (type === "minus") setQuantity((q) => Math.max(q - 1, 1));
  };

  const handleAddToCart = async () => {
    try {
      const res = await api.post("/carts/add", {
        id: product.id,
        quantity: quantity,
      });

      //  backend temp_user_id save
      if (res.data?.temp_user_id) {
        localStorage.setItem("temp_user_id", res.data.temp_user_id);
      }

      // ✅ local cart (UI)
      addToCart({
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: `https://backend.zhenaura.net/public/${selectedImage}`,
        qty: quantity,
      });

      setIsDrawerOpen(true);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const handleCOD = () => setOpenCOD(true);
  const handleOP = () => setOpenOnline(true);

  const handleWhatsApp = () => {
    const imageUrl = `https://backend.zhenaura.net/public/${selectedImage}`;
    const message = `${imageUrl}\nProduct Name: ${product.name}\nPrice: ৳ ${finalPrice.toFixed(
      2,
    )}\nLink: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/8801844545500?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | ZHEN AURA</title>
        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content={`Price: ৳ ${finalPrice.toFixed(2)}`}
        />
        <meta
          property="og:image"
          content={`https://backend.zhenaura.net/public/${selectedImage}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="container mx-auto px-3 sm:px-4 mt-6 bg-white mb-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Image Gallery */}
          <div className="w-full md:w-2/5 flex flex-col gap-3 relative">
            {hasDiscount ? (
              <span className="absolute top-2 left-2 bg-white text-red-600 px-2 py-1 rounded text-xs shadow">
                {product.discount_type === "percent"
                  ? `${product.discount}% OFF`
                  : `Save ৳ ${saveAmount.toFixed(2)}`}
              </span>
            ) : null}
            <img
              src={`https://backend.zhenaura.net/public/${selectedImage}`}
              alt={product.name}
              className="w-full max-w-sm md:max-w-full object-contain"
            />
            <div className="flex gap-2">
              {(product.photo_list || []).map((img) => (
                <img
                  key={img.id}
                  src={`https://backend.zhenaura.net/public/${img.file_name}`}
                  alt={product.name}
                  className={`w-16 h-16 object-cover cursor-pointer border ${
                    selectedImage === img.file_name
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img.file_name)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:flex-1 md:w-3/4 space-y-6 mt-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mt-4 md:mt-10 font-bold">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <p className="text-lg sm:text-xl">৳ {finalPrice.toFixed(2)}</p>
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

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange("minus")}
                className="p-1 border rounded"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="px-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("plus")}
                className="p-1 border rounded"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              onClick={() => handleAddToCart()}
              className="w-full bg-[#2CC4F4] text-white font-medium mt-2 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleOP()}
              className="btn bg-[#2CC4F4] text-white rounded-md p-2 w-full my-2"
            >
              <FontAwesomeIcon icon={faCartShopping} /> Pay Online
            </button>
            <OnlinePaymentModal
              open={openOnline}
              onClose={() => setOpenOnline(false)}
            />

            <button
              onClick={() => handleCOD()}
              className="btn bg-[#2CC4F4] text-white rounded-md p-2 w-full my-2"
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
              className="btn bg-[#2CC4F4] w-full text-white py-1 my-2"
            >
              <FontAwesomeIcon icon={faMessage} /> Chat with us
            </button>

            <button
              onClick={handleWhatsApp}
              className="btn py-1 bg-[#2CC4F4] w-full text-white text-center inline-block"
            >
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
            </button>

            {/* Description */}
            <div>
              <h3 className="border-b text-xl mt-4 py-3">Description</h3>
              <div
                className="text-base p-2"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
