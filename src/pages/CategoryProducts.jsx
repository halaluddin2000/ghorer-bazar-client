import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Components/context/CartContext";
import api from "../api/axios";

const CategoryProducts = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/products/category/${slug}`)
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (!products) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className=" bg-white ">
      <h2 className="text-3xl font-semibold text-center py-6 text-white bg-[#8EC644] mb-10">
        Category: {slug}
      </h2>

      <div className="grid grid-cols-2 pb-32 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.thumbnail_image}
              className="h-40 w-full object-cover"
            />
            <h3 className="mt-2">{product.name}</h3>
            <p>{product.main_price}</p>

            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: Number(product.main_price.replace(/[^\d]/g, "")),
                  image: product.thumbnail_image,
                  qty: 1,
                })
              }
              className="w-full bg-[#8EC644] text-white font-medium mt-2 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
