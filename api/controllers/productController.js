import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      images,
      category,
      stock,
      reviews,
      user,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !images ||
      !category ||
      !stock ||
      !user
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      images,
      category,
      stock,
      reviews: reviews || [], // Default to empty array if no reviews provided
      user,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("reviews.user", "name")
      .populate("user", "firstName lastName");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12;
    const skip = parseInt(req.query.skip) || 0;
    const searchTerm = req.query.searchTerm || "";

    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const products = await Product.find(query)
      .populate("reviews.user", "name")
      .skip(skip)
      .limit(limit);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSellerProducts = async (req, res) => {
  try {
    const { id } = req.params; // Get seller ID from query params
    const products = await Product.find({ user: id }).populate(
      "reviews.user",
      "name"
    );

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};
