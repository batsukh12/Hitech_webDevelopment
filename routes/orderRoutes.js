const express = require("express");
const {
  order,
  getOrders,
  getUserOrder,
  getProductOrder,
} = require("../controller/orderControl");
const router = express.Router();
const { authenticateUser } = require("../middleware/protect");

//router.route("/").post(order)
router
  .post("/", authenticateUser, order)
  .get("/", getOrders)
  .get("/:id", getProductOrder);
router.route("/:id").get(getUserOrder);
module.exports = router;
