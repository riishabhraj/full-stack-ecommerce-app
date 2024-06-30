// src/components/ProductsPage.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import "./ProductsPage.css";

const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

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
      <Typography variant="h2" className="text-center" marginTop={3}>
        {category}
      </Typography>

      <Grid item xs={12} md={9}>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                className="transition-transform duration-300 hover:scale-105"
              >
                <Link to={`/products/${product._id}`}>
                  <ProductCard product={product} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default ProductsPage;
