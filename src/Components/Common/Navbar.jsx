import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      api.get(`/products/search?name=${query}`).then((res) => {
        setResults(res.data.data || []);
      });
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* ================= TOP BAR ================= */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
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
                  className="w-full border px-3 py-2 outline-none"
                />

                {results.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {results.map((item) => (
                      <Link
                        key={item.id}
                        to={`/products/details/${item.slug}`}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100"
                        onClick={() => setShowSearch(false)}
                      >
                        <img
                          src={item.thumbnail_image}
                          className="w-10 h-10 object-cover"
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.main_price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

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
          <div className="flex items-center gap-6">
            {user ? (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar_original}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span className="text-sm">{user.name}</span>
                </div>

                <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded hidden group-hover:block">
                  <Link
                    to="/user-dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
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
      <nav className="border-t border-b">
        <div className="container mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center gap-10 py-3">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>

            <div className="relative group">
              <span className="cursor-pointer select-none">Category ▾</span>
              <div className="absolute left-0 top-full bg-white shadow-lg rounded hidden group-hover:block z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-2 whitespace-nowrap hover:bg-gray-100"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
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
              <Link onClick={() => setMobileMenuOpen(false)} to="/products">
                Products
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

              <Link onClick={() => setMobileMenuOpen(false)} to="/about">
                About
              </Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/blog">
                Blog
              </Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/contact">
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
