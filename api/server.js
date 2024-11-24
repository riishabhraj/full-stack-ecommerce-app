import express from "express";
import connectDb from "./config/connectDb.js";
import customerRoute from "./routes/customer.js";
import sellerRoute from "./routes/seller.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Product from "./models/product.js";
import dotenv from 'dotenv'
import path from "path";
import cors from 'cors';
import Stripe from "stripe"; // Adjust the path to your Product model

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDb();

app.use("/api/customer", customerRoute);
app.use("/api/seller", sellerRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
// app.use("/")
// Function to fetch product from the database
const getProductFromDB = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    console.log(product)
    return product;
  } catch (error) {
    console.error("Error fetching product from database:", error.message);
    throw error;
  }
};

// Stripe checkout session route
app.post("/create-checkout-session", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await getProductFromDB(productId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100, // Stripe uses smallest currency unit
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    console.log(session.url)
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
