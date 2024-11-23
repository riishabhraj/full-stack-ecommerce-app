import Customer from "../models/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, avatar } = req.body;
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await Customer.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Wrong credentials" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = validUser._doc;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ ...rest, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");

    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } 
};
