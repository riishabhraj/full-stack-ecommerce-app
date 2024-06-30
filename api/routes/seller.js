import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/sellerController.js";

router.post("/auth/register", register);
router.post("/auth/signin", login);
router.post("/auth/signout", logout);
export default router;
