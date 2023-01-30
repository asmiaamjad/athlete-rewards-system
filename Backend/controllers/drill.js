const { response } = require("express");
const mongoose = require("mongoose");
const Drill = require("../models/drill");
const { find } = require("../models/user");
const Video = require("../models/video");

exports.drill = async (req, res, next) => {
  try {
    //const drills = await Drill.find();
    const drills = await Drill.find();
    // console.log(drills)
    let results = []
    for(let item of drills){
      const videos = await Video.find({drillId: item._id},{videoUrl:1,_id:0});
      results.push({
        _id: item._id,
        drillName: item.drillName,
        videos: videos
      })
    }

    res.status(200).json(results);
    
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res, next) => {
  const drillName = req.body.drillName;

  const drill = {
    drillName: drillName,
  };
  try {
    const saveddrill = await Drill.create(drill);
    res.status(201).json(saveddrill);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.show = async (req, res, next) => {
  const drillId = req.params.drillId;
  console.log(drillId);
  try {
    const drills = await Drill.findById(drillId);
    console.log(drills);
    const videos = await Video.find({drillId: {$in: [ drillId ]}});
    if(videos.length === 0){
      res.json({drills,message:"No Video Found in this Drill"});
    }else{
    
    res.json({drills,videos});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const drillId = req.params.drillId;
  try {
    const videos = await Video.deleteMany({drillId: {$in: [ drillId ]}});

    const drills = await Drill.findByIdAndRemove(drillId);
    res.json("Drill and all videos in this drill deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res, next) => {
  const drillId = req.params.drillId;

  const drill = {
    drillName: req.body.drillName,
  };

  try {
    const saveddrill = await Drill.findByIdAndUpdate(drillId, drill);
    res.status(201).json(saveddrill);
  } catch (err) {
    res.status(500).json(err);
  }
};
