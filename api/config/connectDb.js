import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    // const url = "mongodb://127.0.0.1:27017/mern-ecommerce";
    // const url =
    //   process.env.NODE_ENV == "docker"
    //     ? "mongodb://mongodb:27017/mern-ecommerce"
    //     : "mongodb://localhost:27017/mern-ecommerce";
    // console.log(url);
    // const connect = await mongoose.connect(url);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
