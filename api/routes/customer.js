import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/customerController.js";

router.post("/auth/signup", register);
router.post("/auth/signin", login);
router.post("/auth/signout", logout);
export default router;
