const router = require("express").Router();
const orderRoutes = require("./order-routes");
const productRoutes = require("./product-routes");
router.use("/order", orderRoutes);
router.use("product", productRoutes);
module.exports = router;
