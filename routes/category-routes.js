const express = require("express");
const { createCat, getCats, getCat, updateCat, deleteCat } = require("../controller/adminControls");

const router = express.Router();

router.route("/").post(createCat).get(getCats);
router.route("/:id").get(getCat).put(updateCat).delete(deleteCat)

module.exports = router;