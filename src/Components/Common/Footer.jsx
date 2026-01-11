import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <div className="container grid grid-cols-7 mb-4 bg-white pt-20 justify-center items-start">
        <div className="col-span-3 pb-4">
          <img className="w-40" src={logo} alt="" />
          <h3 className="text-xl my-2">
            Ghorer Bazar: Your Trusted Source for Safe & Organic Food
          </h3>
          <p className="text-start">
            Ghorer Bazar is a leading e-commerce platform committed to
            delivering safe, healthy, and organic food products across
            Bangladesh. Renowned for its dedication to quality, Ghorer Bazar
            offers a diverse range of health-focused items, including premium
            mustard oil, pure ghee, organic honey, dates, chia seeds, and an
            assortment of nuts. Each product is carefully sourced and crafted to
            ensure maximum health benefits, meeting the highest standards of
            purity and freshness.
            <br />
            With a focus on convenience, Ghorer Bazar operates primarily online,
            bringing the goodness of nature straight to your doorstep. Whether
            you're seeking to elevate your wellness journey or simply enjoy
            natural, wholesome foods, Ghorer Bazar is your go-to destination for
            authentic, trustworthy products.
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
      <div className="bg-[#8ec644] w-full flex justify-between px-4 items-center">
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
