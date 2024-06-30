import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // const connect = await mongoose.connect(process.env.MONGODB_URL);
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/mern-ecommerce"
    );
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
