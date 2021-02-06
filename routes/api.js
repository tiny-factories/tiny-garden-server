// Route handlers
const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var { nanoid } = require("nanoid");
var ID = nanoid();



// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const url = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);

//import data models
const Book = require("../models/book");
const Member = require("../models/post");

//CREATE Member Post
router.post("/", function(req, res) {
  
  // look up key based on discord ID
// db.users.find( { "discordChannelId": "Hopper" } )
  

  const lookUpById = req.body[1];
  // console.log(lookUpById);

// var MongoClient = require('mongodb').MongoClient;
// var mongoDB = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tinyprofiles");
  //Find the first document in the customers collection:
  dbo.collection("users").findOne({}, function(err, result) {
    if (err) throw err;
    // console.log(result._id);
    
    
    db.close();
    
  const creatorId = result._id;


  let member = new Member(req.body);
  // console.log(req.body[1])
  //Mapping incoming Post to Database Schema Post Info
  member._id =  nanoid(12);
  member.creatorId = creatorId;
  member.type = req.body[0].name;
  member.source = "discord";
  member.content = req.body[0].value;
  // console.log(member);
  member.save(); // Save to db
  res.status(201).send("Saved to TinyProfiles db");
});
  
    
    
    
    
  });
});


  
  // @START: Will fix the connetion path for db.findone{} // then pass the discord ID into he quesrry from the current hard doced number // then finish schemafrom discord posts

  
  
  
//   let member = new Member(req.body);
//   console.log(req.body[1])
//   //Mapping incoming Post to Database Schema Post Info
//   member._id =  nanoid(12);
//   member.creatorId = result._id
//   // member.creatorIdDiscord = 
//   member.type = req.body[0].name;
//   member.source = "discord";
//   member.content = req.body[0].value;
//   // console.log(req);
//   member.save(); // Save to db
//   res.status(201).send("Saved to TinyProfiles db");
// });


// _id :"MhssRbvK2lgp"
// type :"post"
// creatorId:req.body[2]
// content:
// "Test: Local post from webite editor."
// discordChannelId:"website"
// createdAt:2021-02-04T11:01:30.369+00:00:2021-02-04T11:01:30.369+00:00

// EXAMPLES BASED ON SAVE TO A BOOK LIST

// RETREIVE all books
// router.get("/", function(req, res) {
//   Book.find({}, function(err, book_list) {
//     res.json(book_list);
//   });
// });

// RETRIEVE a specific book
// router.get("/:bookId", function(req, res) {
//   Book.findById(req.params.bookId, function(err, book) {
//     res.json(book);
//   });
// });

//CREATE
// router.post('/', function(req, res){
//   let book = new Book(req.body);
//   book.save();
//   res.status(201).send(book);
//   console.log("new book!");
// });

//UPDATE
// router.put("/:bookId", function(req, res) {
//   Book.findById(req.params.bookId, function(err, book) {
//     book.title = req.body.title;
//     book.author = req.body.author;
//     book.rating = req.body.title;
//     book.save();
//     res.json(book);
//   });
// });

//DELETE
// router.delete("/:bookId", function(req, res) {
//   Book.findById(req.params.bookId, function(err, book) {
//     book.remove(function(err) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(204).send("removed");
//       }
//     });
//   });
// });
module.exports = router;
