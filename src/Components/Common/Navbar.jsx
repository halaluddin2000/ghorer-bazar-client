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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

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

  // click outside close
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
    <header className="bg-white  sticky top-0 z-50">
      {/* ================= TOP BAR ================= */}
      <div className="py-4">
        <div className="px-4 container mx-auto flex items-center justify-between py-4">
          {/* SEARCH ICON */}
          <div ref={searchRef} className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-xl cursor-pointer"
              onClick={() => setShowSearch((p) => !p)}
            />

            {showSearch && (
              <div className="absolute left-0 top-10 bg-white shadow-lg w-80 z-50 p-3">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white  border px-3 py-2 outline-none"
                />

                {results.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      navigate(`/category/${item.slug}`); // go to product page
                      setShowSearch(false); // close search box
                      setQuery(""); // clear search input
                      setResults([]); // clear results
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2"
                  >
                    <img
                      src={item.thumbnail_image}
                      alt={item.name}
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

          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>

          {/* USER + CART */}
          <div className="flex items-center justify-center gap-6">
            {user ? (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2 ">
                  <Link to="/user-dashboard">
                    <span className=" md:text-sm text-xs">
                      <FontAwesomeIcon icon={faUser} className="text-xl" />
                    </span>
                  </Link>
                </div>
              </div>
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

      {/* ================= MENU ================= */}
      <nav className="bg-gradient-to-br from-[#2CC4F4] via-[#5ED1CE] to-[#8DC642] border-t border-b">
        <div className="container  text-white mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex font-medium justify-center gap-14 py-3">
            <Link className="hover:text-black transition" to="/">
              Home
            </Link>

            <div className="relative group">
              <span className="cursor-pointer select-none hover:text-black transition">
                Category ▾
              </span>
              <div className="absolute left-0 pt-2 top-full bg-gradient-to-br from-[#2CC4F4] via-[#5ED1CE] to-[#8DC642] text-white shadow-lg rounded hidden group-hover:block z-70 text-center py-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-gray-400"
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

          {/* Mobile Hamburger */}
          <div className="flex md:hidden justify-between items-center py-3">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-2xl"
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden flex flex-col gap-3 pb-4">
              <Link onClick={() => setMobileMenuOpen(false)} to="/">
                Home
              </Link>

              <div className="border rounded">
                <p className="px-3 py-2 font-semibold">Category</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
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
