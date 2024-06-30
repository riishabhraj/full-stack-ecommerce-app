import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartItems = state.cartItems || [];
      const existingIndex = cartItems.findIndex(
        (item) => item._id === action.payload.product._id
      );

      if (existingIndex >= 0) {
        cartItems[existingIndex] = {
          ...cartItems[existingIndex],
          cartQuantity:
            cartItems[existingIndex].cartQuantity + action.payload.quantity,
        };
      } else {
        let tempProductItem = {
          ...action.payload.product,
          cartQuantity: action.payload.quantity,
        };
        cartItems.push(tempProductItem);
      }
      state.cartItems = cartItems;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    decreaseCart(state, action) {
      const cartItems = state.cartItems || [];
      const itemIndex = cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        if (cartItems[itemIndex].cartQuantity > 1) {
          cartItems[itemIndex].cartQuantity -= 1;
          // toast.info("Decreased product quantity", { position: "bottom-left" });
        } else if (cartItems[itemIndex].cartQuantity === 1) {
          const nextCartItems = cartItems.filter(
            (item) => item._id !== action.payload._id
          );
          state.cartItems = nextCartItems;
          // toast.error("Product removed from cart", { position: "bottom-left" });
        }
        state.cartItems = cartItems;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    },
    removeFromCart(state, action) {
      const cartItems = state.cartItems || [];
      state.cartItems = cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // toast.error("Product removed from cart", { position: "bottom-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state) {
      const cartItems = state.cartItems || [];
      let { total, quantity } = cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total.toFixed(2);
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
      // toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
