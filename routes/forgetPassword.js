const express = require('express');
const {forgotPassword} = require("../controller/userControl")
const router = express.Router();

router.route("/").post(forgotPassword)
module.exports = router