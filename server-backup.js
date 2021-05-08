console.log("In server.js!");

// init project
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const editJSONFile = require("edit-json-file");
const cron = require("node-cron");
let Parser = require("rss-parser");

let parser = new Parser({});
const file = editJSONFile("/logs.json");

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;
// console.log("Connection String: "+mongoDB);

mongoose.connect(mongoDB, { useNewUrlParser: true, retryWrites: true });

//debugging
mongoose.connection.on("connected", function() {
  // console.log('Mongoose connected to '+process.env.DATABASE);
});

mongoose.connection.on("error", function(err) {
  // console.log('Mongoose connection error: '+err);
});

mongoose.connection.on("disconnected", function() {
  // console.log('Mongoose disconnected.');
});

//start express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

// Load routes
const apiRouter = require("./routes/api");
const indexRouter = require("./routes/index");

app.use("/", indexRouter);
app.use("/api/book", apiRouter);
app.use("/api/post", apiRouter);
app.use("/api/search", apiRouter);

const url =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// CRON JOBS
cron.schedule("* * * * *", () => {
  console.log("Running cron at ");

  //IMPORT LINKS FROM DATABASE

  // let sitesToCheck = [
  //   "http://gndclouds.cc/feed/feed.xml",
  //   "https://interconnected.org/home/feed"
  // ];

  // Example Data with correct Schema
  let sitesToCheck = [
    {
      url: "https://interconnected.org/home/feed",
      userID: "MQc2aPSY0763",
      lastChecked: "2021-01-31T13:14:44.639+00:00",
      lastBuildDate: "2021-04-04T00:00:00Z"
    }
    // {
    //   url: "http://gndclouds.cc/feed/feed.xml",
    //   userID: "MQc2aPSY0763",
    //   lastChecked: "2021-01-31T13:14:44.639+00:00",
    //   lastBuildDate: "2021-04-04T00:00:00Z"
    // },
    // {
    //   url: "https://futureland.tv/gndclouds/gndclouds-cc.rss",
    //   userID: "MQc2aPSY0763",
    //   lastChecked: "2021-01-31T13:14:44.639+00:00",
    //   lastBuildDate: "Fri, 07 May 2021 13:28:01 +0000"
    // }
  ];

  // Checking Links for change to Data Time

  for (let i = 0; i < sitesToCheck.length; i++) {
    const arr = []; // make new array for articles

    console.log("Checking " + sitesToCheck[i].url + "for updates");

    (async () => {
      let feed = await parser.parseURL(sitesToCheck[i].url); // EDIT: pass in i from array

      // Chech feed data

      // Check feed data and db date to determine if there has been a change in the RSS
      if (sitesToCheck[i].lastBuildDate !== feed.lastBuildDate) {
        // if dates are not the same then ...
        console.log(
          "UPDATING: " +
            sitesToCheck[i].url +
            " has new posts or changes to old posts"
        );

        const arr = [];

        feed.items.forEach(item => {
          // Preform a lookup on that feed and get the articles links
            let linkLookUp = item.link;


          // connext

          // then search
          MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("tinyprofiles");
            //Find the first document in the customers collection:
            // console.log("Connecting to DB for Search");
            // console.log("checking for link "+ item.link);


//             dbo
//               .collection("posts")
//               .find({ externalSourceUrl: item.link }, function(err, result) {
//                 // Search by discordCreatorId
//                 if (err) throw err;
//                 console.log("Results " + result);

//                 db.close();
//                 console.log("DB Closed");
//               });
//           });

          // Check to see if links have been saved before in the DB (IT MAY BE BETTER TBULK CHECK FOIR THE LINKS VS ONE AT A TIME?)


          // collection("posts").find({             //Look up links
          //     urk: {$regex: linkLookUp}
          // }).then(result => red.send(result));
          //   console.log(result)

          //           arr.push(item.link); // push each link into an array

          // If the link has been found then Skip
          //           if(link exists){
          //                       // SKIP

          //           }else{ // If the link is new then get the meta and save to DB
          //             // Set meta data
          //             // post to DB
          //           }
          //Get meta info form link
          // POST into to database + user
        });
      } else {
        // If dates are the same then do nothing
        console.log("SKIPPING: " + sitesToCheck[i].url + " has no changes");

        // LOG: Link has not be updatred
        // Update: Link lastChecked
      }

      // console.log(arr);
      //       for (let j = 0; j < arr.length; j++) {

      //       }
    })();

    arr.length = 0; // Clear Array
  }
});

// cron.schedule("* * * * *", () => {
//   // runs every minute

//   // create log
//   const log = [];
//   log.push("started at: " + new Date().toString());

//   // logic here

//   // save log
//   log.push("no email sent");
//   file.data.logs.unshift(log);
//   file.save();
// });
