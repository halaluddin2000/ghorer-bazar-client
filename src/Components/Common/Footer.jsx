import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <>
      {/* ================= Main Footer ================= */}
      <div className="container mx-auto px-4 bg-white pt-16 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 pb-5 gap-8 items-start">
          {/* Brand */}
          <div className="md:col-span-3">
            <img className="w-36 sm:w-40" src={logo} alt="Zhen Natural" />
            <h3 className="text-lg sm:text-xl my-4">
              Zhen Natural: Your Trusted Source for Safe & Organic Food
            </h3>
            <p className="text-sm sm:text-base text-start leading-relaxed">
              Zhen Natural Ltd. is passionate about promoting a healthy and
              vibrant lifestyle through a curated range of organic products,
              superfoods,
              <br className="hidden sm:block" /> and gut health essentials. To
              assure premium quality, we have sourced every single item from
              globally renowned authentic vendors.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#FC8934] text-base sm:text-lg mb-2">
              COMPANY
            </h3>
            <h5 className="text-sm sm:text-base">About Us</h5>
            <p className="my-1 text-sm sm:text-base">রিটার্ন পলিসি</p>
            <p className="text-sm sm:text-base">রিফান্ড পলিসি</p>
          </div>

          {/* Quick Help */}
          <div>
            <h3 className="text-[#FC8934] text-base sm:text-lg mb-2">
              QUICK HELP
            </h3>
            <h6 className="my-1 text-sm sm:text-base">গ্রাহক সেবা</h6>
            <h6 className="text-sm sm:text-base">Contact</h6>
          </div>

          {/* DBID */}
          <div className="md:col-span-2">
            <h3 className="text-sm sm:text-lg font-medium">
              DBID ID : 437361334
            </h3>
          </div>
        </div>
      </div>

      {/* ================= Bottom Bar ================= */}
      <div className="bg-[#2CC4F4] w-full flex flex-col sm:flex-row justify-between items-center px-4">
        <FontAwesomeIcon
          className="text-white text-xl py-4 sm:py-6"
          icon={faFacebook}
        />

        <h4 className="text-white text-sm sm:text-base pb-4 sm:pb-0">
          © ZHEN AURA 2026
        </h4>
      </div>
    </>
  );
}

export default Footer;
