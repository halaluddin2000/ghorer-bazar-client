import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader.jsx";
import { CartContext } from "../Components/context/CartContext.jsx";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal.jsx";
import OnlinePaymentModal from "../Components/Modal/OnlinePaymentModal";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, setIsDrawerOpen } = useContext(CartContext);
  const [openCOD, setOpenCOD] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);

  useEffect(() => {
    api
      .get(`/products/details/${slug}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(console.error);
  }, [slug]);

  const handleCOD = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.unit_price),
      image: `https://backend.zhenaura.net/public/${product.thumbnail?.file_name}`,
      qty: 1,
    });

    setOpenCOD(true);
  };
  const handleOP = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.unit_price),
      image: `https://backend.zhenaura.net/public/${product.thumbnail?.file_name}`,
      qty: 1,
    });

    setOpenOnline(true);
  };

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

        addToCart({
          id: product.id,
          name: product.name,
          price: Number(product.unit_price),
          image: `https://backend.zhenaura.net/public/${product.thumbnail?.file_name}`,
          qty: 1,
        });

        setIsDrawerOpen(true);
      }
    } catch (err) {
      console.error("Cart API error:", err);
    }
  };

  const handleWhatsApp = () => {
    if (!product) return;

    const imageUrl = `https://backend.zhenaura.net/public/${product.thumbnail?.file_name}`;

    const message = `${imageUrl}

Product Name: ${product.name}
Price: ৳ ${product.unit_price}

Product Link:
${window.location.href}
`;

    const whatsappUrl = `https://wa.me/8801844545500?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  if (!product)
    return (
      <p className="text-center py-10">
        <Loader />
      </p>
    );

  return (
    <>
      {/* ✅ Helmet MUST be here */}
      <Helmet>
        <title>{product.name} | ZHEN AURA</title>

        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content={`Price: ৳ ${product.unit_price}`}
        />
        <meta
          property="og:image"
          content={`https://backend.zhenaura.net/public/${product.thumbnail?.file_name}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="container mx-auto px-3 sm:px-4 mt-6 bg-white mb-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Product Image */}
          <div className="w-full md:w-2/5 flex items-center justify-center">
            <img
              src={`https://backend.zhenaura.net/public/${product?.thumbnail?.file_name}`}
              alt={product?.name}
              className="w-full max-w-sm md:max-w-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:flex-1 md:w-3/4 space-y-6 mt-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mt-4 md:mt-10 font-bold">
              {product?.name}
            </h1>

            <p className="text-lg sm:text-xl my-4">৳ {product?.unit_price}</p>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="w-full bg-[#2CC4F4] text-white font-medium mt-2 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={handleOP}
              className="btn bg-[#2CC4F4] text-white rounded-md p-2 w-full my-2"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Pay Online
            </button>
            <OnlinePaymentModal
              open={openOnline}
              onClose={() => setOpenOnline(false)}
            />
            <button
              onClick={handleCOD}
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
            <div>
              <h3 className="border-b text-xl mt-4 py-3">Description</h3>
              <p className="text-base p-2">{product?.meta_description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
