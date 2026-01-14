import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blog-list")
      .then((res) => {
        setBlogs(res.data.blogs.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center py-20">
        <Loader />
      </p>
    );
  }

  return (
    <div className="container mx-auto mt-16 px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10">
        Our Blogs
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={blog.banner}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-lg line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {blog.short_description}
              </p>

              <Link
                to={`/blogs/${blog.slug}`}
                className="inline-block mt-4 text-[#2CC4F4] font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
