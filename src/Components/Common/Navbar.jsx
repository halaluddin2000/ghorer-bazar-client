import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { navbarCategories } from "../../data/navbarData";
import logo from "../../assets/logo.png";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = ({ onCODClick }) => {
  const { cart, setIsDrawerOpen } = useContext(CartContext);
  return (
    <div>
      {/*----------- upper navbar----------- */}
      <div className="bg-[#98CB55] py-2 mb-5">
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
      <div className="container flex justify-between items-center mx-8 py-6">
        <div id="icon">
          <FontAwesomeIcon
            className="text-[#2CC4F4] text-xl"
            icon={faMagnifyingGlass}
          />
          <span id="showText" className="btn-primary">
            Search
          </span>
        </div>
        <div>
          <Link to="/">
            <img className="w-28" src={logo} alt="" srcset="" />
          </Link>
        </div>
        <div>
          <div id="icon">
            <FontAwesomeIcon
              className="text-[#2CC4F4] text-xl px-6"
              icon={faUser}
            />
            <span id="showText" className="btn-primary">
              Account
            </span>
          </div>
          <div
            onClick={() => setIsDrawerOpen(true)}
            className="relative"
            id="icon"
          >
            <FontAwesomeIcon
              onClick={onCODClick}
              className="text-[#2CC4F4] text-xl"
              icon={faBagShopping}
            />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
            <span id="showText" className="btn-primary">
              Cart
            </span>
          </div>
        </div>
      </div>
      {/* navbar end */}
      <div className="my-4 bg-[#F3F3F3] py-4">
        {/* CENTER (Desktop Menu) */}
        <div className="navbar-center hidden px-4 items-center justify-center lg:grid lg:grid-cols-9 gap-4">
          {navbarCategories.map((item) => (
            <p
              className="gap-4 text-base font-medium text-center"
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
