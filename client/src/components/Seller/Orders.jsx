import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Orders = () => {
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.seller);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        const data = res.data;
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.log("error fetching orders", error);
        setError(true);
      }
    };
    getOrders();
  }, [currentUser._id]);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`/api/orders/update/${orderId}`, { status });
      const updatedOrder = res.data;
      // Update local orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status", error);
      setError(true);
    }
  };

  // Filter orders based on the current user's seller ID
  const filteredOrders = orders.filter(
    (order) => order.user === currentUser._id
  );

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-5">Orders</h1>
      {error && (
        <p className="text-red-500">There was an error fetching orders.</p>
      )}
      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <div key={order._id} className="p-5 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-3">
              Order ID: {order._id}
            </h2>
            <p>
              <strong>Customer:</strong> {order.shippingAddress.customer}
            </p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {order.isDelivered ? "Delivered" : "Pending"}
            </p>
            {/* Dropdown for updating order status */}
            <div className="mt-4">
              <label
                htmlFor={`status-${order._id}`}
                className="block font-semibold"
              >
                Update Status:
              </label>
              <select
                id={`status-${order._id}`}
                value={order.isDelivered ? "shipped" : "unshipped"}
                onChange={(e) =>
                  updateOrderStatus(order._id, e.target.value === "shipped")
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="shipped">Shipped</option>
                <option value="unshipped">Unshipped</option>
              </select>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
              <ul className="list-disc list-inside">
                {order.orderItems.map((item) => (
                  <li key={item._id} className="mb-2">
                    <p>
                      <strong>Product:</strong>{" "}
                      {item.product
                        ? item.product.title
                        : "Product not available"}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ${item.price.toFixed(2)}
                    </p>
                    <img
                      src={item.image}
                      alt={item.product ? item.product.title : "Product"}
                      className="w-20 h-20 object-cover rounded-lg mt-2"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
