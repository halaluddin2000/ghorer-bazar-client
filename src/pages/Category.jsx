import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ category list থেকে slug match করে ID বের করা
    api.get("/filter/categories").then((res) => {
      const found = res.data.data.find((c) => c.slug === slug);

      if (found) {
        setCategory(found);

        // 2️⃣ category ID দিয়ে product load
        api.get(`/products/category/${found.id}`).then((res) => {
          setProducts(res.data.data);
          setLoading(false);
        });
      }
    });
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">{category?.name}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <Link to={`/product/details/${product.slug}`}>
              <img
                src={product.thumbnail_image}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <h3 className="font-semibold mt-2">{product.name}</h3>
              <p>{product.main_price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
