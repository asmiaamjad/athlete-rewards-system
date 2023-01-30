const express = require("express");

const categoryController = require("../controllers/category");
const imageUrl = require("../middleware/imageurl");

const router = express.Router();

router.get("/", categoryController.category);

router.get("/:categoryId", categoryController.show);

router.post("/", imageUrl.uploadimage, categoryController.create);

router.put("/:categoryId", imageUrl.uploadimage, categoryController.update);

router.delete("/:categoryId", categoryController.delete);

module.exports = router;
