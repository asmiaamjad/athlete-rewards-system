const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    drillId: {
      type: Schema.Types.ObjectId,
      ref: "drill",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },

    points: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("video", videoSchema);
