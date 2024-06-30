import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./HomePage.css";
import FeaturedCategories from "../components/FeaturedCategories";
import Products from "../components/Products";
import Footer from "../components/Footer";

const HomePage = () => {
  const categories = [
    "Headphones",
    "Laptop",
    "Footwear",
    "Bottom",
    "Toys",
    "Books",
    "Camera",
    "Smartphones",
  ];

  return (
    <div>
      <div className="bg-slate-400 flex items-center p-4 gap-7 justify-center">
        <ul className="flex space-x-4">
          {categories.map((category, index) => (
            <li key={index} className="relative group">
              <Link
                to={`/products/categories/${category}`}
                className="hover:underline p-2 rounded"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          background: `url(https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="h-[70vh] max-w-6xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-gray-200 uppercase stroked-text">
            Welcome to our ecommerce Store
          </h1>
          <p className="text-gray-600 font-semibold tracking-[0.5rem]">
            Shop the Best Trends
          </p>
        </div>
      </div>
      <h1 className="max-w-6xl flex mx-auto text-lg md:text-3xl mt-7 justify-center">
        {" "}
        Featured Products
      </h1>
      <Products />
    </div>
  );
};

export default HomePage;
