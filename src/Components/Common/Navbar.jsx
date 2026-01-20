import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import api from "../../api/axios";
import logo from "../../assets/logo.png";
import { CartContext } from "../context/CartContext";
import "./navbar.css";

const Navbar = () => {
  const { cart, setIsDrawerOpen } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ================= USER ================= */
  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= CATEGORY ================= */
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.get("/filter/categories").then((res) => {
      setCategories(res.data.data || []);
    });
  }, []);

  /* ================= SEARCH ================= */
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // close search on route change
  useEffect(() => {
    setShowSearch(false);
    setQuery("");
    setResults([]);
  }, [location.pathname]);

  // click outside to close search
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // search api
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const delay = setTimeout(() => {
      api
        .get(`/products/search?q=${query}`)
        .then((res) => {
          setResults(res.data.data || []);
        })
        .catch((err) => console.log(err));
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      {/* ================= DESKTOP TOP BAR ================= */}
      <div className="hidden md:block py-3 border-b">
        <div className="px-4 container mx-auto flex items-center justify-between">
          {/* LEFT: Search */}
          <div ref={searchRef} className="relative flex-1 md:flex-none">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-xl cursor-pointer"
              onClick={() => setShowSearch((p) => !p)}
            />
            {showSearch && (
              <div className="absolute left-0 top-10 bg-white shadow-lg w-72 z-50 p-3">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white border px-3 py-2 outline-none"
                />
                {results.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      navigate(`/category/${item.slug}`);
                      setShowSearch(false);
                      setQuery("");
                      setResults([]);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2"
                  >
                    <img
                      src={item.thumbnail_image}
                      className="w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.main_price}</p>
                    </div>
                  </li>
                ))}
                {query.length > 1 && results.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">No product found</p>
                )}
              </div>
            )}
          </div>

          {/* CENTER: Logo */}
          <div className="flex-1 flex justify-end">
            <Link to="/">
              <img src={logo} alt="logo" className="w-28" />
            </Link>
          </div>

          {/* RIGHT: User + Cart */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            {user ? (
              <Link to="/user-dashboard">
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </Link>
            ) : (
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </Link>
            )}
            <div
              onClick={() => setIsDrawerOpen(true)}
              className="relative cursor-pointer"
            >
              <FontAwesomeIcon icon={faBagShopping} className="text-xl" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden py-3 border-b">
        <div className="px-4 container mx-auto flex items-center justify-between">
          {/* LEFT: Mobile Menu */}
          <button
            className="text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          {/* CENTER: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/">
              <img src={logo} alt="logo" className="w-28" />
            </Link>
          </div>

          {/* RIGHT: Search + User + Cart */}
          <div className="flex items-center gap-4">
            <div ref={searchRef} className="relative flex-1 md:flex-none">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-xl cursor-pointer"
                onClick={() => setShowSearch((p) => !p)}
              />
              {showSearch && (
                <div className="absolute right-0 top-10 bg-white shadow-lg w-52 z-50 p-3">
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-white border px-3 py-2 outline-none"
                  />
                  {results.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => {
                        navigate(`/category/${item.slug}`);
                        setShowSearch(false);
                        setQuery("");
                        setResults([]);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2"
                    >
                      <img
                        src={item.thumbnail_image}
                        className="w-10 h-10 object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.main_price}
                        </p>
                      </div>
                    </li>
                  ))}
                  {query.length > 1 && results.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      No product found
                    </p>
                  )}
                </div>
              )}
            </div>

            <div
              onClick={() => setIsDrawerOpen(true)}
              className="relative cursor-pointer"
            >
              <FontAwesomeIcon icon={faBagShopping} className="text-xl" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP MENU ================= */}
      <nav className="bg-gradient-to-br from-[#2CC4F4] via-[#5ED1CE] to-[#8DC642] border-t">
        <div className="container mx-auto px-4 text-white">
          {/* Desktop Menu */}
          <div className="hidden md:flex font-medium justify-center gap-14 py-3">
            <Link className="hover:text-black transition" to="/">
              Home
            </Link>

            <div className="relative group inline-block">
              <span className="cursor-pointer select-none hover:text-black transition">
                Category ▾
              </span>

              <div
                className="
      absolute left-0 top-full
      inline-block
      bg-gradient-to-br from-[#2CC4F4] via-[#5ED1CE] to-[#8DC642]
      text-white shadow-lg rounded
      hidden group-hover:block
      z-50 py-2
      whitespace-nowrap
    "
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="
          block px-4 py-2 text-sm font-medium
          hover:bg-red-300
        "
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link className="hover:text-black transition" to="/products">
              Products
            </Link>
            <Link className="hover:text-black transition" to="/about">
              About
            </Link>
            <Link className="hover:text-black transition" to="/contact">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden flex flex-col gap-3 pb-4 px-4">
              <Link onClick={() => setMobileMenuOpen(false)} to="/">
                Home
              </Link>

              <div className="relative group">
                <span className="cursor-pointer select-none hover:text-black transition">
                  Category ▾
                </span>
                <div className="absolute left-0 top-full bg-gradient-to-br from-[#2CC4F4] via-[#5ED1CE] to-[#8DC642] text-white shadow-lg rounded hidden group-hover:block z-50 py-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      onClick={() => setMobileMenuOpen(false)}
                      to={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm font-medium hover:bg-gray-400"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link onClick={() => setMobileMenuOpen(false)} to="/products">
                Products
              </Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/about">
                About
              </Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/contact">
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
