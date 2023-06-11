const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const userRoutes = require("./routes/userRoutes");

const categoryRoutes = require("./routes/categoryRoutes")
const subCatRoutes = require("./routes/subCategoryRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const forgotPassword = require("./routes/forgetPassword")

const app = express();
const PORT = 3000;
app.get("/", (req, res, next) => {
  try {
    throw new Error("Aldaa garlaa");
  } catch (err) {
    next(err);
  }
});


connectDB();
// user routes
app.use(express.json());
app.use("/api/user", userRoutes);
// category routes
app.use("/api/cat", categoryRoutes);
// subcategory routes
app.use("/api/subCat", subCatRoutes);
//product routes
app.use("/api/product", productRoutes);
// order routes
app.use("/api/order", orderRoutes);
//
app.use("/api/pass", forgotPassword)

app.use(errorHandler);
app.listen(PORT, (err) => {
  console.log("Express running on port " + PORT);
});
