//const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,

  port: process.env.EMAIL_PORT,

  auth: {
    user: "2b29d044df40dc",

    pass: "e2142564c1acd1",
  },
});
exports.signup = async (req, res, next) => {
  console.log(req.file.filename);
  const username = req.body.username;
  const age = req.body.age;
  const role = req.body.role;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const photo = req.file.filename;
  if (password === confirmPassword) {
    const hash = await bcrypt.hash(password, 12);
    const user = {
      username: username,
      age: age,
      role: role,
      email: email,
      password: hash,
      photo: photo,
    };

    try {
      const existinguser = await User.findOne({ email: email });
      if (existinguser) {
        return res.status(404).json("email already exist");
      }

      const saveduser = await User.create(user);
      res.status(201).json(saveduser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("user not found");
      return res.status(404).json("user not found");
    }
    // console.log(user);
    const validated = await bcrypt.compare(password, user.password);

    if (!validated) {
      console.log("wrong credentials");
      res.status(401).json("wrong credentials");
    } else {
      const token = jwt.sign(
        { email: user.email, userId: user._id.toString() },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      res.status(200).json({ user: user, token: token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.forgotpassword = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: "5m" }
    );
    const saveduser = await User.findOneAndUpdate(
      { email: user.email },
      { resetLink: token }
    );

    await transporter.sendMail({
      to: email,
      from: "asmia<hello@testin.io>",
      subject: "Password reset",
      html: `<p> You requested password reset</p>
        <p> Click this <a href ="http://localhost:3000/resetpassword/${token}">link</a> to set a new password</p>`,
    });

    res
      .status(200)
      .json("Email sent sucessfully.Kindly follow the instruction");
  } catch (err) {
    console.log(err, "Email not sent");
    res.status(500).json(err);
  }
};

exports.resetpassword = async (req, res, next) => {
  const { resetLink } = req.params;
  console.log(resetLink);

  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (!password === confirmPassword) {
    res.status(500).json("Password and confirm password doesn't match");
  }

  const hash = await bcrypt.hash(req.body.password, 12);
  try {
    if (resetLink) {
      jwt.verify(
        resetLink,
        process.env.RESET_PASSWORD_KEY,
        function (err, decodedToken) {
          if (err) {
            res.json("Invalid token or It is expired");
          }
        }
      );
      const user = await User.findOne({ resetLink: resetLink });
      if (!user) {
        return res.status(404).json("user with this token not found");
      }
      const users = {
        password: hash,
      };

      const saveduser = await User.findOneAndUpdate(
        { resetLink: resetLink },
        users
      );
      res.status(201).json("password has been changed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
