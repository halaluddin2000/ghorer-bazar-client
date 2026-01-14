import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Components/context/CartContext.jsx";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal.jsx";

import { useParams } from "react-router-dom";
import api from "../api/axios";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
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
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: Number(product.unit_price),
        image: `https://backend.zhennatural.com/public/${product.thumbnail?.file_name}`,
        qty: 1,
      },
      false // 👈 IMPORTANT
    );

    setOpenCOD(true);
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="container mx-auto px-3 sm:px-4 mt-6 bg-white mb-10">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {/*  Product Image */}
        <div className=" w-full md:w-1/2 flex items-center justify-center">
          <img
            src={`https://backend.zhennatural.com/public/${product.thumbnail?.file_name}`}
            alt={product.name}
            className="w-full max-w-sm md:max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:flex-1 space-y-6 mt-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mt-4 md:mt-10 font-bold">
            {product.name}
          </h1>

          <p className="text-lg sm:text-xl my-4">৳ {product.unit_price}</p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: Number(product.unit_price),
                image: product.thumbnail_image,
                qty: 1,
              })
            }
            className="w-full bg-[#8EC644] text-white font-medium mt-2 py-2 rounded"
          >
            Add to Cart
          </button>

          <button onClick={handleCOD} className="btn btn-primary w-full my-2">
            <FontAwesomeIcon icon={faCartShopping} /> ক্যাশ অন ডেলিভারিতে অর্ডার
            করুন
          </button>

          <CashOnDeliveryModal
            open={openCOD}
            onClose={() => setOpenCOD(false)}
          />

          <button className="btn bg-[#8EC644] w-full text-white my-2">
            <FontAwesomeIcon icon={faMessage} /> Chat with us
          </button>

          <button className="btn bg-[#8EC644] w-full text-white">
            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
