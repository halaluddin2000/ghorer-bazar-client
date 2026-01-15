import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Components/Common/Loader";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get("/blog-list").then((res) => {
      const found = res.data.blogs.data.find((item) => item.slug === slug);
      setBlog(found);
    });
  }, [slug]);

  if (!blog) {
    return (
      <p className="text-center py-20">
        <Loader />
      </p>
    );
  }

  return (
    <div className="mt-16 sm:mt-5">
      <div className="container  mx-auto px-4 py-10 max-w-4xl sm:max-w-2xl">
        {/* Banner */}
        <img
          src={blog.banner}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded mb-6"
        />

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          {blog.title}
        </h1>

        {/* Content */}
        <div
          className="prose max-w-none text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
