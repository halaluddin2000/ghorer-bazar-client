import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader.jsx";
import { CartContext } from "../Components/context/CartContext.jsx";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal.jsx";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, setIsDrawerOpen } = useContext(CartContext);
  const [openCOD, setOpenCOD] = useState(false);

  useEffect(() => {
    api
      .get(`/products/details/${slug}`)
      .then((res) => {
        setProduct(res.data);
        console.log("API product:", res.data);
      })
      .catch(console.error);
  }, [slug]);

  const handleCOD = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.unit_price),
      image: `https://backend.zhennatural.com/public/${product.thumbnail?.file_name}`,
      qty: 1,
    });

    setOpenCOD(true);
  };
  const handleAddToCart = async (product) => {
    const payload = {
      id: product.id, // backend যেটা accept করে
      quantity: 1,
    };

    try {
      const res = await api.post("/carts/add", payload);

      if (res.data?.result) {
        if (res.data.temp_user_id) {
          localStorage.setItem("temp_user_id", res.data.temp_user_id);
        }

        // local cart update
        addToCart({
          id: product.id,
          name: product.name,
          price: Number(product.unit_price), // details page এর price
          image: `https://backend.zhennatural.com/public/${product.thumbnail?.file_name}`,
          qty: 1,
        });

        // ✅ এখানেই drawer open হবে
        setIsDrawerOpen(true);
      }
    } catch (err) {
      console.error("Cart API error:", err);
    }
  };

  if (!product)
    return (
      <p className="text-center py-10">
        <Loader />
      </p>
    );

  return (
    <div className="container mx-auto px-3 sm:px-4 mt-6 bg-white mb-10">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {/*  Product Image */}
        <div className=" w-full md:w-2/5 flex items-center justify-center">
          <img
            src={`https://backend.zhennatural.com/public/${product?.thumbnail?.file_name}`}
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
            onClick={handleCOD}
            className="btn bg-[#2CC4F4]  text-white rounded-md p-2 w-full my-2"
          >
            <FontAwesomeIcon icon={faCartShopping} /> ক্যাশ অন ডেলিভারিতে অর্ডার
            করুন
          </button>

          <CashOnDeliveryModal
            open={openCOD}
            onClose={() => setOpenCOD(false)}
          />

          <button className="btn bg-[#2CC4F4] w-full text-white py-1 my-2">
            <FontAwesomeIcon icon={faMessage} /> Chat with us
          </button>

          <a
            href="https://wa.me/8801844545500?text=Hello%20I%20want%20to%20know%20about%20this%20product"
            target="_blank"
            rel="noopener noreferrer"
            className="btn py-1 bg-[#2CC4F4] w-full text-white text-center inline-block"
          >
            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
