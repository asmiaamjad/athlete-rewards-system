const express = require("express");

const videoController = require("../controllers/video");

const isAuth = require("../middleware/is-auth");

const videoUrl = require("../middleware/videourl");

const router = express.Router();

router.get("/", videoController.videos);

router.get("/:videoId", videoController.show);

router.post("/", videoUrl.uploadvideo, videoController.create);

router.put("/:videoId", videoController.update);

router.delete("/:videoId", videoController.delete);

module.exports = router;
