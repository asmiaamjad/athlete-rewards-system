const mongoose = require("mongoose");
const fs = require("fs");
const Category = require("../models/category");
const Athlete = require("../models/athlete");
exports.category = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};
   
exports.create = async (req, res, next) => {
  const categoryName = req.body.categoryName;
  const photo = req.file.filename;
console.log(photo);
  const category = {
    categoryName: categoryName,
    photo: photo
  };
  try {
    const savedcategory = await Category.create(category);
    res.status(201).json(savedcategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.show = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  //console.log(usId);
  try {
    const category = await Category.findById(categoryId);
    const athlete = await Athlete.find({category_id:categoryId});
    console.log({category,athlete});
    res.json({category,athlete});
    // res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById(categoryId).select("photo");

    fs.unlink(
      "C:/Users/asmia.amjad/Desktop/nodetask/public/Images/photos/" + category.photo,
      function (err) {
        console.log(category.photo);
        if (err) {
          console.log(err);
        }
      }
    );
    const categories = await Category.findByIdAndRemove(categoryId);

    res.status(201).json("Category deleted successfully");
  } catch (err) {
console.log(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  console.log('file', req.file)
  let category = {}
  if(req.file){
    const photo = req.file.filename;
    category = {
      categoryName: req.body.categoryName,
      photo : photo
    };
  }else{
    category = {
      categoryName: req.body.categoryName,
    };
  }
  
  try {
    const savedcategory = await Category.findByIdAndUpdate(categoryId, category);
    res.status(201).json(savedcategory);
  } catch (err) {
    res.status(500).json(err);
  }
};
