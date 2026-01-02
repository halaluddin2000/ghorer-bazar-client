import { useParams } from "react-router-dom";
import { products } from "../data/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found</p>;
  return (
    <div>
      <div className="container flex gap-6 mx-auto bg-white mb-5">
        <div className="mb-36">
          <img src={product.image} alt="" />
        </div>
        <div>
          <h1 className="text-4xl mt-10 font-bold">{product.name}</h1>
          <p className="text-xl my-4">৳ {product.price}</p>
          <p className="mb-6">Category: {product.category}</p>
          <button className="btn bg-[#000000] py-2 px-4 rounded-lg text-[#F89503]">
            Add to Cart
          </button>
          <button className="btn btn-primary w-full my-2">
            <span>
              <FontAwesomeIcon
                className="text-black text-xl px-6"
                icon={faCartShopping}
              />
            </span>{" "}
            ক্যাশ অন ডেলিভারিতে অর্ডার করুন
          </button>
          <button className="btn bg-[#000000] space-y-4 w-full rounded-lg p-2 text-white">
            <span>
              <FontAwesomeIcon
                className="text-[#DE47A9] text-xl px-6"
                icon={faMessage}
              />
            </span>{" "}
            Chat with us
          </button>
          <button className="btn bg-[#000000] mt-2 w-full rounded-lg p-2 text-white">
            <span>
              <FontAwesomeIcon
                className="text-[#DE47A9] text-xl px-6"
                icon={faWhatsapp}
              />
            </span>{" "}
            WhatsApp Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
