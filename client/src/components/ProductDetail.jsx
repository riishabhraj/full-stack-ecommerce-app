import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {
//   decrement,
//   increment,
//   setQuantitytoAdd,
// } from "../redux/reducers/productReducer"

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const value = useSelector((state) => state.product.value); // Access quantity state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/product/${id}`);
        const data = res.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProduct(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleIncrement = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const handleDecrement = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <div className="flex justify-center flex-col md:flex-row">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={true}
            interval={3000}
            className="carousel-wrapper"
            style={{ maxWidth: "600px", margin: "0 auto" }} // Adjust width as needed
          >
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={product.title}
                  className="object-cover h-[35rem] w-[35rem]"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col mx-10 mt-4 md:mt-0">
          <div className="text-slate-400 mb-7">
            <p>Product ID: {product._id}</p>
          </div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <h2 className="text-xl font-bold text-gray-700 mt-2">
            ${product.price}
          </h2>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="flex flex-col mt-7">
            <span>Quantity</span>
            <div>
              <Button onClick={handleDecrement} variant="contained">
                -
              </Button>
              <input
                value={quantity}
                type="number"
                className="p-2 w-20 border text-center"
                min="0"
                readOnly
              />
              <Button onClick={handleIncrement} variant="contained">
                +
              </Button>
            </div>
            <div>
              <p className="text-slate-500">stock: {product.stock}</p>
            </div>
            <div className="mt-10 flex space-x-4">
              <Button variant="contained">Buy Now</Button>
              <Button onClick={handleAddToCart} variant="outlined">
                Add to Cart
              </Button>
            </div>
            <p className="text-slate-600 mt-7c">
              Seller: {product.user.firstName} {product.user.lastName}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
