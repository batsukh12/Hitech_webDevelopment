const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

exports.order = async (req, res, next) => {
  try {
    const { totalPrice, userId, productId, quantity } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user has sufficient balance
    if (user.balance < totalPrice) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the requested product count is available
    if (product.count < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for product: ${product.name}`,
      });
    }

    // Deduct the user's balance and update product count
    user.balance -= totalPrice;
    product.count -= quantity;

    // Save the updated user and product
    await user.save();
    await product.save();

    // Create a new order
    const order = new Order({
      productId: product._id,
      userId: user._id,
      quantity: quantity,
      totalPrice: totalPrice,
    });

    // Save the order
    await order.save();

    // Return a success response
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    next(err);
  }
};
exports.getOrders = async (req, res, next) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {}
};
exports.getUserOrder = async(req, res, next)  => {
  try{
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const order = await Order.find({ userId });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
exports.getProductOrder = async(req, res, next)  => {
  try{
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    const order = await Order.find({ productId });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
