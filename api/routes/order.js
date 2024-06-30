import express from "express";
import {
  verifyCustomerToken,
  verifySellerToken,
} from "../middlewares/verifyToken.js";
import {
  getAllOrders,
  getOrderDetail,
  newOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/order/new", verifyCustomerToken, newOrder);
router.get("/myorders", verifyCustomerToken, getAllOrders);
router.get("/orders", verifySellerToken, getAllOrders);
router.get("/orders/:id", verifySellerToken, getOrderDetail);
router.post("/orders/update/:id", verifySellerToken, updateOrder);
router.post("/orders/delete/:id", verifyCustomerToken, deleteOrder);

export default router;
