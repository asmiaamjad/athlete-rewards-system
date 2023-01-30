const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drillSchema = new Schema(
  {
    drillName: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("drill", drillSchema);
