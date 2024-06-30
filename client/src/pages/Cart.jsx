import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../redux/reducers/cartReducer";

import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-6xl flex flex-col justify-center cart-container mx-auto mt-7">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p className="text-gray-600">Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/" className="flex items-center text-blue-500 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles flex justify-between mb-4">
            <h3 className="font-semibold product-title w-64">Product</h3>
            <h3 className="font-semibold price w-2/12 flex justify-center">Price</h3>
            <h3 className="font-semibold quantity w-3/12 flex justify-center">Quantity</h3>
            <h3 className="font-semibold total w-2/12">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div
                  className="cart-item flex justify-between items-center border-b pb-4"
                  key={cartItem.id}
                >
                  <div className="cart-product flex items-center w-64">
                    <img
                      src={cartItem.images[0]}
                      alt={cartItem.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{cartItem.title}</h3>
                      {/* <p className="text-gray-600">{cartItem.description}</p> */}
                      <button
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className="text-red-500 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">
                    {Number(cartItem.price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                  <div className="cart-product-quantity w-3/12 flex items-center justify-center px-auto">
                    <button
                      onClick={() => handleDecreaseCart(cartItem)}
                      className="border rounded-full px-3 py-1 mr-2"
                    >
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button
                      onClick={() => handleAddToCart(cartItem)}
                      className="border rounded-full px-3 py-1 ml-2"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-product-total-price w-2/12">
                    {Number(
                      cartItem.price * cartItem.cartQuantity
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
              ))}
          </div>
          <div className="max-w-6xl cart-summary mt-8 flex justify-end">
            <div className="cart-checkout mt-4">
              <div className="subtotal flex justify-between items-center mb-2">
                <span className="font-semibold">Subtotal</span>
                <span className="amount font-semibold">
                  ${cart.cartTotalAmount}
                </span>
              </div>
              <p className="text-sm">
                Taxes and shipping calculated at checkout
              </p>
              <div className="mr-3">
                <button
                  className="clear-btn bg-red-500 text-white px-4 py-2 rounded-full mr-2"
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">
                  Check out
                </button>
              </div>
              <div className="continue-shopping mt-4">
                <Link to="/" className="flex items-center text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
