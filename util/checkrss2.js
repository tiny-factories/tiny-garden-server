// const express = require("express");
// const router = express.Router();
// const MongoClient = require("mongodb").MongoClient;
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const bodyParser = require("body-parser");
// const editJSONFile = require("edit-json-file");
// const cron = require("node-cron");
// const axios = require("axios");

// var og = require("open-graph");

// let Parser = require("rss-parser");

// let parser = new Parser({});

// //database

// // Establish a connection with the Mongo Database
// // Get the username, password, host, and databse from the .env file
// const mongoDB =
//   "mongodb+srv://" +
//   process.env.USERNAME +
//   ":" +
//   process.env.PASSWORD +
//   "@" +
//   process.env.HOST +
//   "/" +
//   process.env.DATABASE;
// // console.log("Connection String: "+mongoDB);

// mongoose.connect(mongoDB, { useNewUrlParser: true, retryWrites: true });

// //debugging
// mongoose.connection.on("connected", function() {
//   // console.log('Mongoose connected to '+process.env.DATABASE);
// });

// mongoose.connection.on("error", function(err) {
//   // console.log('Mongoose connection error: '+err);
// });

// mongoose.connection.on("disconnected", function() {
//   // console.log('Mongoose disconnected.');
// });


// function CheckRSS() {
//   //IMPORT LINKS FROM DATABASE

//   //   router.get("/posts", function(req,res){
//   //   Post.find({}, function (err, post_list){
//   //     res.json(post_list)
//   //   });
//   // });
//   //   router.get("/:postId", function(req, res) {
//   //   Member.findById(req.params._id, function(err, post) {
//   //     res.json(post);
//   //   });
//   // });

//   // Example Data with correct Schema
//   let sitesToCheck = [
//     // {
//     //   url: "https://interconnected.org/home/feed",
//     //   _id: "0000000000",
//     //   lastChecked: "2021-01-31T13:14:44.639+00:00",
//     //   lastBuildDate: "2021-04-04T00:00:00Z"
//     // }
//     // {
//     //   url: "http://gndclouds.cc/feed/feed.xml",
//     //   _id: "MQc2aPSY0763",
//     //   lastChecked: "2021-01-31T13:14:44.639+00:00",
//     //   lastBuildDate: "2021-04-04T00:00:00Z"
//     // },
//     {
//       url: "https://futureland.tv/gndclouds/gndclouds-cc.rss",
//       _id: "MQc2aPSY0763",
//       lastChecked: "Fri, 07 May 2021 06:05:56 GMT",
//       lastBuildDate: "Fri, 07 May 2021 04:05:56 GMT"
//     }
//   ];

//   // CHECKING AND SAVING NEW ARTICLES
//   for (let i = 0; i < sitesToCheck.length; i++) {
//     console.log("Sites to Check are: "+ sitesToCheck)
//     const arr = []; // make new array for articles

//     // console.log("Checking " + sitesToCheck[i].url);

//     // CHECK IF RSS HAS CHANGED
//     (async () => {
//       let feed = await parser.parseURL(sitesToCheck[i].url);

//       if (sitesToCheck[i].lastBuildDate !== feed.lastBuildDate) {
//         // Checking lastchanged date in DB with lastchanged date from feed
//         console.log("🔗 Source Changed: " + sitesToCheck[i].url);
//         // console.log(feed.lastBuildDate);

//         const arr = [];
//         //CHECKING SITE ARTICLES
//         feed.items.forEach(item => {
//           // Checking articles in RSS Feed
//           let linkLookUp = item;
//           arr.push(linkLookUp); // push each articles to array
//         });
//         // console.log("Array of links to articles to check: " + arr)

//         // var output = arr.map(setKey); // TODO: the USER ID needs to be mapped to each article later for saving
//         // console.log(arr[0]);

//         for (let j = 0; j < arr.length; j++) {
//           MongoClient.connect(url, { useUnifiedTopology: true }, function(
//             err,
//             db
//           ) {
//             if (err) throw err;
//             var dbo = db.db("tinyprofiles");
//             console.log("Checking Link " + arr[j].link);
//             var linkToSave = arr[j].link;
//             var existingRecordsFromDb = [];
//             dbo
//               .collection("rssimports")
//               .findOne({}, function(err, result) {
//     if (err) throw err;
//               var myJSON = JSON.stringify(result);

//     console.log(result);
//     db.close();
              
//               if(result.externalSourceUrl == linkToSave){
//                 // console.log("Link" + linkToSave +" matches "+ result.externalSourceUrl)
//               }else{
//                // console.log("Link " + linkToSave +" not found ")


//               }
//   });
            
//             // Save location 2 if checking aguenst array

//             // logic here?
//           });
//         }
//       } else {
//         // If dates are the same then do nothing
//         console.log("🔗 Source OLD: " + sitesToCheck[i].url);
//       }
//     })();

//     //save array and get open daat

//     arr.length = 0; // Clear Array
//   }
// }
// module.exports = CheckRSS2;

