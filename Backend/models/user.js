const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "Your name must contain atleast 4 character"],
      validate: [validator.isAlpha, "Your name must contain only characters"],
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your email"],
      unique: [true, "This Email already exist, try other one"],
      lowercase: true,
      validate: [
        validator.isEmail,
        "Please enter a valid email e.g: abc@xyz.com ",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "A password must be 8 character long"],
    },
    photo: {
      type: String,

      required: true,
    },
    favourites: [
      {
        type: String,
      },
    ],

    total_points: {
      type: Number,
    },
    resetLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
