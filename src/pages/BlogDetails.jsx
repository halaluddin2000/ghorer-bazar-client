import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api.get(`/blog-details/${slug}`).then((res) => {
      setBlog(res.data.blog);
      setLoading(false);
    });
  }, [slug]);

  if (loading)
    return (
      <div className="py-20 text-center">
        <Loader />
      </div>
    );

  if (!blog) return <p className="text-center py-20">Blog not found</p>;

  return (
    <div className="bg-white">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <img
          src={blog.banner}
          alt={blog.title}
          className="w-full h-56 sm:h-72 md:h-[420px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
              {blog.title}
            </h1>
          </div>
        </div>
      </motion.div>

      {/* 🔷 Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="container mx-auto px-3 sm:px-4 py-10 max-w-4xl"
      >
        {/* Meta */}
        <p className="text-sm text-gray-500 mb-6">
          Published on {blog.created_at}
        </p>

        {/* Description */}
        <div
          className="prose prose-sm sm:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </motion.div>
    </div>
  );
};

export default BlogDetails;
