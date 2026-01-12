import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import logo from "../../assets/logo.png";
import { CartContext } from "../context/CartContext";
import "./navbar.css";

const Navbar = () => {
  const { cart, setIsDrawerOpen } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // search ----
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const delay = setTimeout(() => {
      api.get(`/products/search?name=${query}`).then((res) => {
        setResults(res.data.data || []);
        console.log("search", res.data.data);
      });
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    api.get("/filter/categories").then((res) => {
      setCategories(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="container mt-5  mx-8">
        <div className="flex justify-between items-center pt-6 pb-2 ">
          <div id="icon" className="relative">
            <FontAwesomeIcon
              className="text-xl cursor-pointer"
              icon={faMagnifyingGlass}
              onClick={() => setShowSearch(!showSearch)}
            />
            <span id="showText" className="btn-primary">
              Search
            </span>

            {/*  Search Input */}
            {showSearch && (
              <div className="absolute top-10 left-0 bg-white shadow-lg w-80 z-50 p-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white border px-3 py-2 outline-none"
                />

                {/*  Live Results */}
                {results.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {results.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/details/${item.slug}`}
                        onClick={() => {
                          setShowSearch(false);
                          setQuery("");
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100"
                      >
                        <img
                          src={item.thumbnail_image}
                          alt={item.name}
                          className="w-10 h-10 object-cover"
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

          <div>
            <Link to="/">
              <img className="w-28" src={logo} alt="" srcset="" />
            </Link>
          </div>
          <div>
            <Link to="/login">
              <div id="icon">
                <FontAwesomeIcon className="text-xl px-6" icon={faUser} />
                <span id="showText" className="btn-primary">
                  Account
                </span>
              </div>
            </Link>
            <div
              onClick={() => setIsDrawerOpen(true)}
              className="relative"
              id="icon"
            >
              <FontAwesomeIcon className=" text-xl" icon={faBagShopping} />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
              <span id="showText" className="btn-primary">
                Cart
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* navbar end */}
      <nav className="navbar">
        <div className="flex gap-14 py-3 mx-auto justify-center items-center">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          <div className="relative group">
            <span className="cursor-pointer">Category ▾</span>

            <div className="absolute hidden  group-hover:block bg-white shadow-lg z-10 w-max">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="block w-full text-base px-4 py-2 hover:bg-gray-100"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/about">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
