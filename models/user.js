const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: "string",
  },
  lastName: {
    type: "string",
  },
  email: {
    type: "string",
    unique: true,
    required: true,
  },
  phone: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    default: "user",
  },
  balance: {
    type: "number",
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
