const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Images/photos");
  },
  filename: function (req, file, cb) {
    let ext = file.mimetype.split("/")[1];
    let fileName = `${file.fieldname}-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};
const upload = multer({ storage: storage, fileFilter });

exports.uploadimage = upload.single("photo");

exports.uploadLog = (e) => {
  console.log(e.file);
};
