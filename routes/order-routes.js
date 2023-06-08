const express = require("express");
const { order } = require("../controller/orderControl")
const router = express.Router();


//router.route("/").post(order)
router.post('/', order);

module.exports = router;