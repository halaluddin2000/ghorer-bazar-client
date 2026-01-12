import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <div className="container grid grid-cols-7 mb-4 bg-white pt-20 justify-center items-start">
        <div className="col-span-3 pb-4">
          <img className="w-40" src={logo} alt="" />
          <h3 className="text-xl my-4">
            Zhen Natural: Your Trusted Source for Safe & Organic Food
          </h3>
          <p className="text-start">
            Zhen Natural Ltd. is passionate about promoting a healthy and
            vibrant lifestyle through a curated range of organic products,
            superfoods,
            <br /> and gut health essentials. To assure premium quality, we have
            sourced every single item from globally renowned authentic vendors.
          </p>
        </div>
        <div>
          <h3 className="text-[#FC8934] text-lg">COMPANY</h3>
          <h5>About Us</h5>
          <p className="my-1">রিটার্ন পলিসি</p>
          <p>রিফান্ড পলিসি</p>
        </div>
        <div>
          <h3 className="text-[#FC8934] text-lg">QUICK HELP</h3>
          <h6 className="my-1">গ্রাহক সেবা</h6>
          <h6>Contact</h6>
        </div>
        <div className="col-span-2">
          <h3 className="text-lg">DBID ID : 437361334</h3>
        </div>
      </div>
      {/* -------footer var */}
      <div className="bg-[#2CC4F4] w-full flex justify-between px-4 items-center">
        <h4 className="">
          <FontAwesomeIcon
            className="text-[#fff]  text-xl py-6"
            icon={faFacebook}
          />
        </h4>
        <h4 className="text-white">© ZHEN AURA 2026</h4>
      </div>
    </>
  );
}

export default Footer;
