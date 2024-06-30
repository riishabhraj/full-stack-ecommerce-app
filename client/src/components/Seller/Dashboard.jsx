// src/components/Seller/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const sellerId = params.id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/${sellerId}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const deleteProduct = async (productId) => {
    try {
      await axios.post(`/api/product/delete/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Seller Dashboard</h1>
      <div className="flex justify-between">
        <div>
          <Link
            to={`/seller/add-product/`}
            className="bg-green-500 text-white py-2 px-4 rounded mb-5 inline-block"
          >
            Add New Product
          </Link>
        </div>
        <div className="flex">
          <Link
            to={`/seller/profile/${sellerId}`}
            className="bg-green-500 text-white py-2 px-4 rounded mb-5 inline-block mr-4"
          >
            Profile
          </Link>
          <Link
            to={`/seller/manage-orders`}
            className="bg-green-500 text-white py-2 px-4 rounded mb-5 inline-block"
          >
            Manage Orders
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border border-gray-300 rounded flex justify-between items-center"
          >
            <div className="flex items-center">
              <img
                src={product.images[0]}
                alt="product_image"
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
            <p>Stock: {product.stock}</p>
            <div className="flex space-x-2">
              <Link
                to={`/seller/edit-product/${product._id}`}
                className="bg-blue-500 text-white py-1 px-3 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
