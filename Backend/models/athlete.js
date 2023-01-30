const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const athleteSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    drill_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "drill",
        required: true,
      },
    ],
    athleteName: {
      type: String,
      required: true,
    },
    dateofBirth: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("athlete", athleteSchema);
