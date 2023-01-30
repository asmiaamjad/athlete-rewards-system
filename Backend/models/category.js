const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("category", categorySchema);
