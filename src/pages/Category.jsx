import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/filter/categories").then((res) => setCategories(res.data.data));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/category/${cat.slug}`}
          className="border p-3 rounded text-center"
        >
          <img src={cat.icon} className="h-20 mx-auto" />
          <h3 className="mt-2 font-semibold">{cat.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
