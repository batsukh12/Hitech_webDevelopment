const express = require("express");
const { register, getUsers, getUser, updateUser, deleteUser ,login, resetPassword} = require("../controller/userControl");

const router = express.Router();

router.route("/").post(register).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/login").post(login);
router.route("/reset").post(resetPassword)
module.exports = router;