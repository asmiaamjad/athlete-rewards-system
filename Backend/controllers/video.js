const mongoose = require("mongoose");
const fs = require("fs");
const Video = require("../models/video");
const multer = require("multer");
const videoUrl = require("../middleware/videourl");
exports.videos = async (req, res, next) => {
  try {
    const videos = await Video.find().populate("drillId");
    res.json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res, next) => {
  console.log(req.file);
  const video = {
    title: req.body.title,
    videoUrl: req.file.filename,
    drillId: req.body.drillId,
    points: req.body.points,
  };

  try {
    const savedvideo = await Video.create(video);

    res.status(201).json(savedvideo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.show = async (req, res, next) => {
  const videoId = req.params.videoId;

  try {
    const videos = await Video.findById(videoId).populate("drillId");

    res.json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const videoId = req.params.videoId;
  try {
    const video = await Video.findById(videoId).select("videoUrl");

    fs.unlink("./public/videos/" + video.videoUrl,
      function (err) {
        console.log(video.videoUrl);
        if (err) {
          console.log(err);
        }
      }
    );
    const videos = await Video.findByIdAndRemove(videoId);
    console.log(`user destroyed ${videos}`);
    res.status(204).json("video deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res, next) => {
  const videoId = req.params.videoId;
  const video = {
    title: req.body.title,
    drillId: req.body.drillId,
    points: req.body.points,
  };
  try {
    const savedvideo = await Video.findByIdAndUpdate(videoId, video);
    const updatedvideo = await Video.findById(videoId);
    res.status(201).json(updatedvideo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
