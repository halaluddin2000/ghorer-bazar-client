import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ProductDetails() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/products/details/${slug}`)
      .then((res) => {
        setProducts(res.data.data);
        console.log("API product:", res.data.data);
      })
      .catch(console.error);
  }, [slug]);

  if (!products.length) return <p>Loading...</p>;

  return (
    <div className="container mx-auto bg-white mb-5">
      {products.map((p) => (
        <div key={p.id} className="flex gap-6 mb-10">
          <div>
            <img src={p.thumbnail_image} alt={p.name} />
          </div>

          <div>
            <h1 className="text-4xl mt-10 font-bold">{p.name}</h1>
            <p className="text-xl my-4">{p.main_price}</p>
            <p className="mb-6">Category: {p.category}</p>

            <button className="btn bg-black text-[#F89503] px-4 py-2 rounded">
              Add to Cart
            </button>

            <button className="btn btn-primary w-full my-2">
              <FontAwesomeIcon icon={faCartShopping} /> ক্যাশ অন ডেলিভারিতে
              অর্ডার করুন
            </button>

            <button className="btn bg-black w-full text-white my-2">
              <FontAwesomeIcon icon={faMessage} /> Chat with us
            </button>

            <button className="btn bg-black w-full text-white">
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductDetails;
