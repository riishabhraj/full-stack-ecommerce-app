import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Products from "./Products";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const Search = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      fetchProducts(searchTermFromUrl);
    }
  }, [location.search]);

  const fetchProducts = async (searchTerm, startIndex = 0) => {
    setLoading(true);
    const res = await axios.get(
      `/api/products?searchTerm=${searchTerm}&startIndex=${startIndex}`
    );
    const data = res.data;
    if (startIndex === 0) {
      setProducts(data);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...data]);
    }
    setShowMore(data.length > 8);
    setLoading(false);
  };

  const onShowMoreClick = () => {
    const numberOfListings = products.length;
    fetchProducts(searchTerm, numberOfListings);
  };

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-32 w-full object-cover mb-2"
                />
                <h3 className="font-bold text-lg truncate">{product.title}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Show More
            </button>
          )} */}
          <Container>
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
              {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <CircularProgress />
                </Box>
              )}
              {showMore && !loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShowMore}
                  >
                    Show More
                  </Button>
                </Box>
              )}
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default Search;
