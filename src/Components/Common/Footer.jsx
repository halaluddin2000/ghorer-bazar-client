import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <>
      {/* ================= Main Footer ================= */}
      <div className="container mx-auto px-4 bg-white pt-6 md:pt-16 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 pb-5 gap-8 items-start">
          {/* Brand */}
          <div className="md:col-span-3">
            <img className="w-36 sm:w-56" src={logo} alt="Zhen Natural" />
            <h3 className="text-lg sm:text-xl my-6">
              Zhen Aura – Pure Organic Living
            </h3>
            <p className="text-sm sm:text-base py-2 text-start leading-relaxed">
              Zhen Aura delivers trusted organic foods sourced naturally to
              support healthier lifestyles, sustainable choices, and everyday
              wellness.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#FC8934] text-base sm:text-lg mb-2">
              COMPANY
            </h3>
            <Link to="/about">
              <h5 className="text-sm hover:text-[#2CC4F4] sm:text-base">
                About Us
              </h5>
            </Link>
            <Link to="/blog">
              <h5 className="text-sm hover:text-[#2CC4F4] sm:text-base">
                Blog
              </h5>
            </Link>
            <Link to="/returns-policy">
              <p className="my-1 text-sm hover:text-[#2CC4F4] sm:text-base">
                Return & Refund Policy
              </p>
            </Link>
            {/* <Link to="/repand">
              <p className="text-sm hover:text-[#2CC4F4] sm:text-base">
                রিফান্ড পলিসি
              </p>
            </Link> */}
          </div>

          {/* Quick Help */}
          <div>
            <h3 className="text-[#FC8934] text-base sm:text-lg mb-2">
              QUICK HELP
            </h3>
            <h6 className="my-1 text-sm sm:text-base">গ্রাহক সেবা</h6>
          </div>

          {/* DBID */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact</h3>

              <p className="flex items-start gap-3 text-gray-700">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-[#2CC4F4] mt-1"
                />
                <span>
                  <strong>Address:</strong> 427, Tejgaon Industrial Area,
                  Dhaka-1208, Bangladesh.
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
                  <strong>Email:</strong> info@zhenaura.net
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Bottom Bar ================= */}
      <div className="bg-[#5bcbed] w-full  flex py-4 justify-between items-center px-4">
        <FontAwesomeIcon
          className="text-white text-xl py-4 sm:py-6"
          icon={faFacebook}
        />

        <h4 className="text-white text-sm sm:text-base sm:pb-0">
          © ZHEN AURA 2026
        </h4>
      </div>
    </>
  );
}

export default Footer;
