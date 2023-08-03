const Product = require("../models/product");
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(200).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {}
};

exports.getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {}
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {}
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!user) {
      res.status(200).json({
        success: false,
        message: "product not found",
      });
    }
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
