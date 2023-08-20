const Product = require("../models/product");
const Order = require("../models/order");
const mongoose = require("mongoose");
const order = require("../models/order");
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
    if (!product) {
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

exports.filterProducts = async (req, res) => {
  try {
    let products = [];
    var startDate = new Date(Date.now() - 12096e5);

    if (req.body.type === "new") {
      products = await Product.find({
        createdAt: {
          $gte: startDate,
          $lt: new Date(),
        },
      })
        .skip(req.query.page * req.query.size)
        .limit(req.query.size)
        .sort({ createdAt: -1 })
        .exec();

      return res.send({
        data: products,
      });
    }
  } catch (error) {}
};

exports.popularProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const orders = await Order.find();

    if (!products) {
      throw new Error("Product not found");
    }

    if (!orders) {
      throw new Error("Orders not found");
    }

    // console.log("products",products);
    // console.log("orders",orders);

    const popular = products.filter((prod) =>
      orders.find((order) => order.productId == prod._id)
    );

    res.status(200).json({
      data: popular,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.saleProducts = async (req, res) => {
  try {
    let saleProducts = [];

    saleProducts = await Product.find({
      count: {
        $gte: 10,
      },
    });

    res.status(200).json({
      data: saleProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.specialProducts = async (req, res) => {
  try {
    let specialProducts = [];
    var startDate = new Date(Date.now() - 12096e5);

    specialProducts = await Product.find({
      count: {
        $gte: 1,
        $lte: 3,
      },
      createdAt: {
        $gte: startDate,
        $lt: new Date(),
      },
    });

    res.status(200).json({
      data: specialProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.sortProduct = async (req, res, next) => {
//   try {
//     const products = await Product.find();
//     const type = req.body.type;

//     if (type === "new") {
//       const newProducts = products.filter((prod) => {
//         const checkDate = new Date();
//         checkDate.setDate(checkDate.getDate() - 14);
//         return prod.createdAt >= checkDate;
//       });
//       res.status(200).json({
//         success: true,
//         data: newProducts,
//       });
//     } else if (type === "demand") {
//       const demandProducts = products.filter((prod) => {
//         //  order.productId == productId;
//         //  order.productId.length() =< 5;
//         //   return prod.
//       });
//       res.status(200).json({
//         success: true,
//         data: demandProducts,
//       });
//     } else if (type === "sale") {
//       const saleProduct = products.filter((prod) => {});
//       res.status(200).json({
//         success: true,
//         data: saleProducts,
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// {
//  type: "new"
// }
