import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  getFilteredProducts,
  getSellerProducts
} from "../controllers/productController.js";
import { verifySellerToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/product/:id", getProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getSellerProducts);
router.get("/products/category/:category", getFilteredProducts);
router.post("/product/create", verifySellerToken, createProduct);
router.post("/product/update/:id", verifySellerToken, updateProduct);
router.post("/product/delete/:id", verifySellerToken, deleteProduct);

export default router;
