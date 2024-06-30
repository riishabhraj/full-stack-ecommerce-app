import Order from "../models/order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("orderItems.product", "title");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order doesn't exist" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const newOrder = async (req, res) => {
  try {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const newOrder = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await newOrder.save();

    // Return a success response
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateDetails = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updateDetails, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the updated order
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
