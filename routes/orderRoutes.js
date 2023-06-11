const express = require("express");
const { order } = require("../controller/orderControl")
const router = express.Router();
const {authenticateUser } = require("../middleware/protect")

//router.route("/").post(order)
router.post('/', authenticateUser, order);

module.exports = router;