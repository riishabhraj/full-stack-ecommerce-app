import express from "express";
import connectDb from "./config/connectDb.js";
import customerRoute from "./routes/customer.js";
import sellerRoute from "./routes/seller.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDb();

app.use("/api/customer", customerRoute);
app.use("/api/seller", sellerRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
const __dirname = path.resolve();
const amit = "amit";
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
