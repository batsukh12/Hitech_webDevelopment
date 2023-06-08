const express = require("express");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controller/productControl");

const router = express.Router();

router.route("/").post(createProduct).get(getProducts)
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router;