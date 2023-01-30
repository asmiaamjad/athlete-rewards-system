const express = require("express");

const athleteController = require("../controllers/athlete");
const imageUrl = require("../middleware/imageurl");

const router = express.Router();

router.get("/", athleteController.athlete);

router.get("/:athleteId", athleteController.show);

router.post("/", imageUrl.uploadimage, athleteController.create);

router.put("/:athleteId", imageUrl.uploadimage, athleteController.update);

router.delete("/:athleteId", athleteController.delete);

module.exports = router;
