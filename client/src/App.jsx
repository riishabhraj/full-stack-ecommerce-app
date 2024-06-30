import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProductDetail from "./components/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import SellerSignUp from "./components/Seller/SellerSignUp";
import SellerSignIn from "./components/Seller/SellerSignIn";
import Dashboard from "./components/Seller/Dashboard";
import AddProduct from "./components/Seller/AddProduct";
import EditProduct from "./components/Seller/EditProduct";
import Profile from "./components/Seller/Profile";
import Orders from "./components/Seller/Orders";
import CustomerProfile from "./pages/customerProfile";
import MyOrders from "./pages/MyOrders";
import Search from "./components/Search";

// A wrapper to use useLocation hook outside Router
const Wrapper = ({ children }) => {
  const location = useLocation();
  const sellerRoutes = ["/seller"];

  const shouldShowNavbarAndFooter =
    !["/sign-in", "/sign-up"].includes(location.pathname) &&
    !sellerRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <>
      {shouldShowNavbarAndFooter && <Navbar />}
      {children}
      {shouldShowNavbarAndFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/products/categories/:category"
            element={<ProductsPage />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/seller/sign-up" element={<SellerSignUp />} />
          <Route path="/profile" element={<CustomerProfile />} />

          <Route path="/seller/sign-in" element={<SellerSignIn />} />
          <Route path="/seller/dashboard/:id" element={<Dashboard />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route
            path="/seller/edit-product/:productId"
            element={<EditProduct />}
          />
          <Route path="/seller/profile/:id" element={<Profile />} />
          <Route path="/seller/manage-orders" element={<Orders />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;
