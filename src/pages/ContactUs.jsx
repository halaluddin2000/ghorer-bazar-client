import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://backend.zhenaura.net/api/v2/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Message sent successfully ✅");
        setFormData({
          name: "",
          email: "",
          phone: "",
          content: "",
        });
      } else {
        setMessage("Something went wrong ❌");
      }
    } catch (error) {
      setMessage("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pt-20 pb-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#78CB81] md:text-4xl font-semibold mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please select a topic below related to your inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="border rounded-lg p-6 shadow-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full bg-white border px-4 py-3 rounded"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full bg-white border px-4 py-3 rounded"
                required
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                className="w-full border bg-white px-4 py-3 rounded"
                required
              />

              <textarea
                name="content"
                rows="5"
                value={formData.content}
                onChange={handleChange}
                placeholder="Please leave your comments here.."
                className="w-full bg-white border px-4 py-3 rounded"
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2CC4F4] text-white py-3 rounded"
              >
                {loading ? "Sending..." : "Submit"}
              </button>

              {message && (
                <p className="text-center text-sm mt-2 text-green-600">
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Map + Contact Info */}
          <div className="space-y-6">
            <div className="w-full h-64 rounded overflow-hidden border">
              <iframe
                title="Location"
                src="https://www.google.com/maps?q=427,Tejgaon%20Industrial%20Area,Dhaka-1208,Bangladesh&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact</h3>

              <p className="flex items-center gap-3">
                <FontAwesomeIcon icon={faLocationDot} />
                427, Tejgaon Industrial Area, Dhaka-1208, Bangladesh.
              </p>

              <p className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} />
                +8801844545500
              </p>

              <p className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} />
                info@zhenaura.net
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
