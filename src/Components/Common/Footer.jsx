import {
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 pb-5 gap-6 items-start">
          {/* Brand */}
          <div className="md:col-span-3">
            <img className="w-36 sm:w-56" src={logo} alt="Zhen Natural" />
            <h3 className="text-lg sm:text-xl my-6">
              Zhen Aura – Pure Organic Living
            </h3>
            <p className="text-sm sm:text-base py-2 pr-4 text-start leading-relaxed">
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
            <h3 className="text-base font-medium">
              License Number : TRAD/DNCC/028023/2025
            </h3>
          </div>

          {/* Quick Help */}
          <div>
            <h3 className="text-[#FC8934] text-base sm:text-lg mb-2">
              QUICK HELP
            </h3>
            <a
              href="https://m.me/110872968359736"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#006fd6]   py-2 gap-3 text-sm sm:text-base inline-flex items-center"
            >
              <FontAwesomeIcon
                icon={faFacebookMessenger}
                className="text-base text-[#0084FF]"
              />
              Chat with Messenger
            </a>
            <Link to="/track-your-order">Track Order</Link>
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
      <div className="bg-[#5bcbed] w-full  flex py-4 items-center px-4">
        <div>
          <a
            href="https://www.facebook.com/zhenaura.bd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zhen Aura Facebook Page"
          >
            <FontAwesomeIcon
              className="text-white text-xl py-4 sm:py-6 cursor-pointer hover:opacity-80 transition"
              icon={faFacebook}
            />
          </a>
        </div>

        <div className="flex-1">
          <h4 className="text-white  text-center text-sm sm:text-base sm:pb-0">
            Copyright @ 2026 Zhen Aura. All Rights Reserved. Powered by{" "}
            <a
              href="https://nelsistech.com/"
              target="_blank"
              className="text-white"
            >
              Nelsis Tech
            </a>
          </h4>
        </div>
      </div>
    </>
  );
}

export default Footer;
