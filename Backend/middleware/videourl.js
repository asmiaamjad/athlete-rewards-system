const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/videos");
  },
  filename: function (req, file, cb) {
    let ext = file.mimetype.split("/")[1];
    let fileName = `${file.fieldname}-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
    return cb(new Error("Please uplaod a video"));
  }
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter });

exports.uploadvideo = upload.single("videoUrl");

exports.uploadLog = (e) => {
  console.log(e.file);
};
