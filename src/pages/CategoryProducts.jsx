import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";
import { CartContext } from "../Components/context/CartContext";

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

  if (loading) return <Loader />;

  return (
    <div className="bg-white">
      <h2
        className="text-3xl font-medium text-center py-6 text-white
        bg-gradient-to-t from-[#2CC4F4] to-slate-100 mb-10"
      >
        Category: {slug}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 pb-32">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            {/* ✅ CLICKABLE AREA */}
            <Link to={`/products/details/${product.slug}`}>
              <img
                src={product.thumbnail_image}
                className="h-40 w-full object-cover"
                alt={product.name}
              />
              <h3 className="mt-2 font-medium line-clamp-2">{product.name}</h3>
              <p className="text-gray-600">{product.main_price}</p>
            </Link>

            {/* ✅ ADD TO CART */}
            <button
              onClick={(e) => {
                e.preventDefault(); // link block করবে
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: Number(product.main_price.replace(/[^\d]/g, "")),
                  image: product.thumbnail_image,
                  qty: 1,
                });
              }}
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
