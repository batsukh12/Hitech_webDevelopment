const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const User = require('../models/user');

exports.order = async (req, res, next) => {
  try {
    const { token, order } = req.body;

    // jwt token verifey hine
    const decodedToken = jwt.verify(token, 'yourSecretKey');

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decodedToken.userId;

    // tuhain token taarch bui user iig olno
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has sufficient balance
    if (user.balance < order.totalPrice) {
      return res.status(403).json({ message: 'Insufficient balance' });
    }

    // Check if the requested products are available
    const products = await Product.find({ _id: { $in: order.products } });

    if (products.length !== order.products.length) {
      return res.status(404).json({ message: 'Some products are not found' });
    }

    // Check if the requested product counts are available
    for (const product of products) {
      const requestedCount = order.products.find((item) => item.productId === product._id.toString()).count;
      if (product.count < requestedCount) {
        return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
      }
    }

    // Deduct the user's balance and update product counts
    const updatedProducts = [];
    let totalPrice = 0;

    for (const product of products) {
      const requestedCount = order.products.find((item) => item.productId === product._id.toString()).count;
      product.count -= requestedCount;
      updatedProducts.push(product);
      totalPrice += product.price * requestedCount;
    }

    user.balance -= totalPrice;

    // Save the updated user and products
    await user.save();
    await Product.bulkWrite(
      updatedProducts.map((product) => ({
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { count: product.count } },
        },
      }))
    );

    // Return a success response
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    next(err);
  }
};
