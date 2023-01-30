const express = require("express");

const isAuth = require("../middleware/is-auth");

const userController = require("../controllers/users");
const imageUrl = require("../middleware/imageurl");

const router = express.Router();

router.get("/", userController.users);

router.get("/:userId", userController.show);

router.post("/", imageUrl.uploadimage, userController.create);

router.patch("/:videoId", isAuth, userController.add_points);

router.put("/favourite/:videoId", isAuth, userController.set_favourite);

router.put("/unfavourite/:videoId", isAuth, userController.unset_favourite);

router.put("/:userId", imageUrl.uploadimage, userController.update);

router.delete("/:userId", userController.delete);

module.exports = router;
