import { Box, Container, Grid, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const limit = 8; // Number of products to load initially and on "Show More"

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/products?limit=${limit}&skip=${skip}`
        );
        const data = res.data;
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setShowMore(data.length === limit);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [skip]);

  const handleShowMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  return (
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
  );
};

export default Products;
