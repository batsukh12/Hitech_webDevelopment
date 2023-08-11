const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
  popularProducts,
  saleProducts,
  specialProducts,
} = require("../controller/productControl");

const router = express.Router();

router.route("/special").post(specialProducts);
router.route("/popular").post(popularProducts);
router.route("/sale").post(saleProducts);
router.route("/search").post(filterProducts);
router.route("/").post(createProduct).get(getProducts);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
