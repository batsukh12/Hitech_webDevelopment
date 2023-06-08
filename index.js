const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user-routes");
const errorHandler = require("./middleware/error");
const categoryRoutes = require("./routes/category-routes")
const subCatRoutes = require("./routes/subCategory-routes")
const productRoutes = require("./routes/product-routes")
const orderRoutes = require("./routes/order-routes")


const app = express();
const PORT = 3000;
app.get("/", (req, res, next) => {
  try {
    throw new Error("Aldaa garlaa");
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

connectDB();
// user routes
app.use(express.json());
app.use("/api/v1/auth", userRoutes);
// category routes
app.use("/api/admin", categoryRoutes);
// subcategory routes
app.use("/api/v2", subCatRoutes);
//product routes
app.use("/api/product", productRoutes);
// order routes
app.use("api/order", orderRoutes);



app.listen(PORT, (err) => {
  console.log("Express running on port " + PORT);
});