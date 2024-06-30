// src/components/Footer.js
import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-slate-800 py-10 mt-10 text-white">
      <Container>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h6 className="text-lg font-bold mb-4">About Us</h6>
              <p className="text-sm">
                We are a leading e-commerce platform providing a wide range of
                products to suit all your needs.
              </p>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-4">Quick Links</h6>
              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Link to="/" className=" hover:text-blue-500">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/products" className=" hover:text-blue-500">
                    Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className=" hover:text-blue-500">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className=" hover:text-blue-500">
                    Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/seller/sign-up" className=" hover:text-blue-500">
                    Register as a Seller
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-4">Contact Us</h6>
              <p className="text-sm">
                Email: support@example.com
                <br />
                Phone: +123 456 7890
              </p>
            </div>
          </div>
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Your E-commerce. All rights
            reserved.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
