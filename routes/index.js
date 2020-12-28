// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Post = require("../models/post");

// RETRIEVE all books
router.get("/", function(req,res){
  Post.find({}, function (err, post_list){
    res.render("index", {posts:post_list});
  });
});

module.exports = router;