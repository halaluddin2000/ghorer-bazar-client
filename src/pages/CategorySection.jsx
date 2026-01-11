import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/filter/categories")
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={cat.cover_image}
              alt={cat.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4 text-center font-semibold">{cat.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
