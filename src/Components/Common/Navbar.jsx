import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { navbarCategories } from "../../data/navbarData";
import logo from "../../assets/logo.webp";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./navbar.css";

const Navbar = () => {
  return (
    <div>
      {/*----------- upper navbar----------- */}
      <div className="bg-[#e88742] py-2 mb-5">
        <p className="text-center text-white text-base tracking-wide ">
          আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:{" "}
          <span>
            <FontAwesomeIcon icon={faPhone} />
          </span>
          +8801321208940 |{" "}
          <span>
            <FontAwesomeIcon icon={faPhone} />
          </span>
          হট লাইন: 09642-922922
        </p>
      </div>
      {/* -------navbar----- */}
      <div className="container px-10 flex justify-between items-center py-6">
        <div id="searchIcon">
          <FontAwesomeIcon
            className="text-[#F58822] text-xl"
            icon={faMagnifyingGlass}
          />
          <span id="showSearchText" className="btn-primary">
            Search
          </span>
        </div>
        <div>
          <img className="w-28" src={logo} alt="" srcset="" />
        </div>
        <div className="">
          <FontAwesomeIcon
            className="text-[#F58822] text-xl px-3"
            icon={faUser}
          />
          <FontAwesomeIcon
            className="text-[#F58822] text-xl"
            icon={faBagShopping}
          />
        </div>
      </div>
      {/* navbar end */}
      <div className="my-4 bg-[#F3F3F3] py-4">
        {/* CENTER (Desktop Menu) */}
        <div className="navbar-center hidden px-4 items-center justify-center lg:grid lg:grid-cols-9 gap-4">
          {navbarCategories.map((item) => (
            <p
              className="gap-4 text-lg font-medium text-center"
              key={item.slug}
            >
              <Link
                className="link link-underline link-underline-black text-black"
                to={`/category/${item.slug}`}
              >
                {item.name}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
