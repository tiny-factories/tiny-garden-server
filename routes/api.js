// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Book = require("../models/book");
const Member = require("../models/post");

//CREATE Member Post
router.post("/", function(req, res) {
  let member = new Member(req.body);
  
  //Mapping incoming Post to Database Schema Post Info
  member.type = req.body[0].name;
  member.content = req.body[0].value;
  console.log(req);
  member.save(); // Save to db
  res.status(201).send("Saved to TinyProfiles db");
});

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
