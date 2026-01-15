import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <div className="bg-white pt-20 pb-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#78CB81] md:text-4xl font-semibold mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please select a topic below related to your inquiry. If you don't
            find what you need, fill out our contact form.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="border rounded-lg p-6 shadow-sm">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full border bg-white px-4 py-3 rounded focus:outline-none focus:border-[#2CC4F4]"
              />

              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full bg-white border px-4 py-3 rounded focus:outline-none focus:border-[#2CC4F4]"
              />

              <input
                type="text"
                placeholder="Enter Your Phone Number"
                className="w-full bg-white border px-4 py-3 rounded focus:outline-none focus:border-[#2CC4F4]"
              />

              <textarea
                rows="5"
                placeholder="Please leave your comments here.."
                className="w-full border bg-white px-4 py-3 rounded focus:outline-none focus:border-[#2CC4F4]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#2CC4F4] hover:bg-[#24b3e0] text-white py-3 rounded font-medium transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Map + Contact Info */}
          <div className="space-y-6">
            {/* Google Map */}
            <div className="w-full h-64 md:h-72 rounded overflow-hidden border">
              <iframe
                title="Zhen Natural Location"
                src="https://www.google.com/maps?q=117/A,Old%20Airport%20Road,Tejgaon,Dhaka&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact</h3>

              <p className="flex items-start gap-3 text-gray-700">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-[#2CC4F4] mt-1"
                />
                <span>
                  <strong>Address:</strong> 117/A, Old Airport Road, Bijoy
                  Sharani, Tejgaon, Dhaka-1215.
                </span>
              </p>

              <p className="flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faPhone} className="text-[#2CC4F4]" />
                <span>
                  <strong>Call Us:</strong> +8801844545500
                </span>
              </p>

              <p className="flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#2CC4F4]" />
                <span>
                  <strong>Email:</strong> info@zhensg.com
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
