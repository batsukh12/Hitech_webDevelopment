const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

function orderNumbers() {
  return Math.floor(1000 + Math.random() * 9000);
}
exports.order = async (req, res, next) => {
  try {
    const { userId, orders = [] } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    let totalOrderPrice = 0;
    const productUpdates = [];
    const orderUpdates = [];
    const orderNumber = orderNumbers();

    for (let i = 0; i < orders.length; i++) {
      const product = await Product.findById(orders[i].productId);

      if (!product) {
        return res.status(200).json({
          success: false,
          message: `Product ${orders[i].productId} not found`,
        });
      }

      if (product.count < orders[i].quantity) {
        return res.status(200).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      const totalPrice = orders[i].quantity * product.price;
      totalOrderPrice += totalPrice;
      product.count -= orders[i].quantity;

      productUpdates.push(product.save());

      const order = new Order({
        orderNumber: orderNumber,
        productId: product._id,
        userId: user._id,
        quantity: orders[i].quantity,
        totalPrice: totalPrice,
      });
      orderUpdates.push(order.save());
    }

    if (user.balance < totalOrderPrice) {
      return res.status(200).json({
        success: false,
        message: "Insufficient balance",
      });
    }
    user.balance -= totalOrderPrice;

    await Promise.all([user.save(), ...productUpdates, ...orderUpdates]);

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
exports.getUserOrder = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({
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
exports.getProductOrder = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(200).json({
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
