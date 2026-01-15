import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/blog-list").then((res) => {
      setBlogs(res.data.blogs.data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <p className="text-center py-20">
        <Loader />
      </p>
    );
  }

  return (
    <div className="bg-white">
      {/*  Header */}
      <div className="bg-gradient-to-b from-[#2CC4F4] to-white py-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Our Blog
        </h1>
        <p className="text-sm text-gray-600 mt-2">Latest news & articles</p>
      </div>

      {/*  Blog Grid */}
      <div className="container mx-auto px-3 sm:px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={blog.banner}
                alt={blog.title}
                className="w-full h-48 sm:h-44 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {blog.short_description}
                </p>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-block border p-2 hover:bg-[#2CC4F4] hover:text-white mt-6 text-[#2CC4F4] text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {blogs.length === 0 && (
          <p className="text-center text-gray-500 py-10">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
