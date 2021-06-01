// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Post = require("../models/post");
const Discord = require("../models/discord");


// RETRIEVE all books
router.get("/", function(req,res){
  Post.find({}, function (err, post_list){
    res.render("index", {posts:post_list});
  });
});
router.get("/posts", function(req,res){
  Post.find({}, function (err, post_list){
    res.json(post_list)
  });
});

module.exports = router;