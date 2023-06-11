const express = require("express");
const { register, getUsers, getUser, updateUser, deleteUser ,login} = require("../controller/userControl");

const router = express.Router();

router.route("/").post(register).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/login").post(login);
module.exports = router;