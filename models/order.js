const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  productId: {
    type: "string",
    required: true,
  },
  userId: {
    type: "string",
    required: true,
  },
  quantity: {
    type: "string",
    required: true,
  },
  totalPrice: {
    type: "string",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
