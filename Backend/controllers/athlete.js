const mongoose = require("mongoose");

const Athlete = require("../models/athlete");
const User = require("../models/user");
const Drill = require("../models/drill");
exports.athlete = async (req, res, next) => {
  try {
    const athletes = await Athlete.find().populate("category_id drill_id");
    res.json(athletes);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res, next) => {
  
  const drill_id = req.body.drill_id;
  console.log(drill_id);
  const category_id = req.body.category_id;
  const athleteName = req.body.athleteName;
  const dateofBirth = req.body.dateofBirth;
  const photo = req.file.filename;

  const athlete = {
    category_id: category_id,
    drill_id: drill_id,
    athleteName: athleteName,
    dateofBirth: dateofBirth,
    photo: photo,
  };
  try {
    const savedathlete = await Athlete.create(athlete);
    res.status(201).json(savedathlete);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } 
  
};

exports.show = async (req, res, next) => {
  const athleteId = req.params.athleteId;
  //console.log(usId);
  try {
    const athletes = await Athlete.findById(athleteId).populate(
      "category_id drill_id"
    );
    //console.log(users);
    res.json(athletes);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const athleteId = req.params.athleteId;
  try {
    
    const athletes = await Athlete.findByIdAndRemove(athleteId);
    //console.log(`user destroyed ${users}`);
    res.status(204).json("Athlete deleted successfully");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.update = async (req, res, next) => {
  const athleteId = req.params.athleteId;
if(req.file){
  athlete = {
    athleteName: req.body.athleteName,
    dateofBirth: req.body.dateofBirth,
    category_id: req.body.category_id,
    drill_id: req.body.drill_id,
    photo: req.file.filename,
  };
}
else{
  athlete = {
    athleteName: req.body.athleteName,
    dateofBirth: req.body.dateofBirth,
    category_id: req.body.category_id,
    drill_id: req.body.drill_id
  };
}
  try {
    console.log(req.body);
    const savedathlete = await Athlete.findByIdAndUpdate(athleteId, athlete);
    res.status(201).json(savedathlete);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
