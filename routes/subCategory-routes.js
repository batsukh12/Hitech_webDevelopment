const express = require("express");
const { createSubCat, getSubCats, getSubCat, updateSubCat, deleteSubCat } = require("../controller/subCategoryControl")

const router = express.Router();

router.route("/").post(createSubCat).get(getSubCats);
router.route("/:id").get(getSubCat).put(updateSubCat).delete(deleteSubCat)

module.exports = router;