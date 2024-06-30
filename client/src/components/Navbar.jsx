// src/components/Navbar.js
import React, { useState,useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BackgroundLetterAvatars from "./Avatar";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.customer);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <nav className="bg-slate-800 p-4">
      <div className="max-w-6xl container mx-auto flex items-center justify-between">
        <Link to={"/"} className="text-white text-lg font-bold w-1/4">
          My E-Commerce Site
        </Link>
        <div className="w-1/2 mx-4">
          <div className="relative">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
              />
              <button>
                <SearchIcon className="absolute right-2 top-2 text-gray-500" />
              </button>
            </form>
          </div>
        </div>
        <div className="hidden md:flex w-1/4 justify-end items-center space-x-4">
          <Link to={"/cart"} c className="text-white hover:text-gray-200">
            <ShoppingBagIcon
              className="text-white"
              style={{ fontSize: "2rem" }}
            />
          </Link>
          {currentUser ? (
            <ProfileDropdown currentUser={currentUser} />
          ) : (
            <a href="/sign-in" className="text-white hover:text-gray-200">
              Sign In
            </a>
          )}
        </div>
        <div className="md:hidden text-white">
          <MenuIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
