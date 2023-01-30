const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Video = require("../models/video");

exports.users = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res, next) => {
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
      const check = await User.findOne({ email: email });
      if (check) {
        console.log("email already exist");
        res.status(404).json("email already exist");
      } else {
        //const saveduser = await  User.create(req.body);
        const saveduser = await User.create(user);
        res.status(201).json(saveduser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("password doesn't match");
  }
};

exports.show = async (req, res, next) => {
  const usId = req.params.userId;
  //console.log(usId);
  try {
    const users = await User.findById(usId);
    //console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.add_points = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.userId;
    const video = await Video.findById(videoId).select("points");
    //console.log({videoId, userId, video});
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { total_points: video.points } }
    );
    const updatedUser = await User.findById(user._id);
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const usId = req.params.userId;

  try {
    const us = await User.findById(usId).select("photo");

    fs.unlink(
      "C:/Users/asmia.amjad/Desktop/nodetask/public/Images/photos/" + us.photo,
      function (err) {
        console.log(us.photo);
        if (err) {
          console.log(err);
        }
      }
    );
    const users = await User.findByIdAndRemove(usId);
    res.status(204).json("User deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res, next) => {
  const usId = req.params.userId;
  console.log(req.body);
  if (req.file) {
    const photo = req.file.filename;
    users = {
      username: req.body.username,
      age: req.body.age,
      role: req.body.role,
      email: req.body.email,
      photo: photo,
    };
  } else {
    users = {
      username: req.body.username,
      age: req.body.age,
      role: req.body.role,
      email: req.body.email,
    };
  }

  try {
    const saveduser = await User.findByIdAndUpdate(usId, users);
    const newuser = await User.findById(usId);
    res.status(201).json(newuser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.set_favourite = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.userId;
    const video = await Video.findById(videoId);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { favourites: videoId } }
    );
    res.json("video added into favourite videos");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.unset_favourite = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    const userId = req.userId;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { favourites: videoId } }
    );
    res.json("video removed from favourite videos");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
