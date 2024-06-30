import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.customer);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        const data = res.data;
        setOrders(data);
        console.log(data); // Check console for fetched data structure
      } catch (error) {
        console.log("error fetching orders", error);
        setError(true);
      }
    };
    getOrders();
  }, []);

  // Filter orders based on the current user's ID
  const filteredOrders = orders.filter(
    (order) => order.customer === currentUser._id
  );

  const handleRemoveOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Failed to delete order", error);
      setError(true);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {error && (
        <p className="text-red-500">There was an error fetching orders.</p>
      )}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p className="text-gray-600">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Total Price:{" "}
                {order.totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <h3 className="font-bold mt-2">Order Items:</h3>
              <ul className="list-disc pl-5">
                {order.orderItems.map((item) => (
                  <li key={item._id}>
                    {item.product && item.product.title} - {item.quantity} x{" "}
                    {item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleRemoveOrder(order._id)}
                className="text-red-500 mt-2"
              >
                Remove Order
              </button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
