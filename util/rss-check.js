const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const editJSONFile = require("edit-json-file");
const cron = require("node-cron");

var og = require("open-graph");

let Parser = require("rss-parser");

let parser = new Parser({});

//database

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

const url =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;

function CheckRSS() {
  //IMPORT LINKS FROM DATABASE

  // Example Data with correct Schema
  let sitesToCheck = [
    {
      url: "https://interconnected.org/home/feed",
      userID: "MQc2aPSY0763",
      lastChecked: "2021-01-31T13:14:44.639+00:00",
      lastBuildDate: "2021-04-04T00:00:00Z"
    },
    {
      url: "http://gndclouds.cc/feed/feed.xml",
      userID: "MQc2aPSY0763",
      lastChecked: "2021-01-31T13:14:44.639+00:00",
      lastBuildDate: "2021-04-04T00:00:00Z"
    },
    {
      url: "https://futureland.tv/gndclouds/gndclouds-cc.rss",
      userID: "MQc2aPSY0763",
      lastChecked: "2021-01-31T13:14:44.639+00:00",
      lastBuildDate: "Fri, 07 May 2021 13:28:01 +0000"
    }
  ];

  // CHECKING AND SAVING NEW ARTICLES
  for (let i = 0; i < sitesToCheck.length; i++) {
    const arr = []; // make new array for articles

    console.log("Checking " + sitesToCheck[i].url);

    // CHECK IF RSS HAS CHANGED
    (async () => {
      let feed = await parser.parseURL(sitesToCheck[i].url);

      if (sitesToCheck[i].lastBuildDate !== feed.lastBuildDate) {
        // Checking lastchanged date in DB with lastchanged date from feed
        console.log(
          "UPDATING: " +
            sitesToCheck[i].url +
            " has new posts or changes to old posts"
        );

        const arr = [];
        //CHECKING SITE ARTICLES
        feed.items.forEach(item => {
          // Checking articles in RSS Feed
          let linkLookUp = item.link;
          arr.push(linkLookUp); // push each articles to array
        });

        // var output = arr.map(setKey); // TODO: the USER ID needs to be mapped to each article later for saving
        // console.log("ARRAY: Of Articles " + arr);

        for (let j = 0; j < arr.length; j++) {
          MongoClient.connect(url, { useUnifiedTopology: true }, function(
            err,
            db
          ) {
            if (err) throw err;
            var dbo = db.db("tinyprofiles");
            // console.log(arr);
            dbo
              .collection("posts")
              .find({
                externalSourceUrl: arr[j]
              }) //TODO: Make this look for multiple iteams at once
              .each(function(err, doc) {
                //called once for each doc returned
                console.log("Checking Article " + arr[j]);
                if (doc == null) {
                  // if there is not doc found then pull meta data and save to DB
                  console.log("SAVING Article " + arr[j]);
                  var url = arr[j];

                  og(url, function(err, meta) {
                    console.log("Post " + j + " Title " + meta.title);
                    console.log("Post URL " + arr[j]);
                    console.log("Image URL " + meta.image.url);
                  });
                  //SAVE
                  
                   args = [];
                  
                  		args.push(interaction.member.user.id); // add user.id to args
                  		args.push(interaction.member.user.id); // add user.id to args
                  		args.push(interaction.member.user.id); // add user.id to args
                  		args.push(interaction.member.user.id); // add user.id to args

  member._id = nanoid(12);
        member.creatorId = creatorId;
        member.postFor = req.body[0].name;
        member.type = "post";
        member.source = "discord";
        member.content = req.body[0].value;
        member.discordChannelId = req.body[2];
        // console.log(member);
        member.save(); // Save to db
        res.status(201).send("Saved to TinyProfiles db");

                  

                  var data = JSON.stringify(args);
                  // console.info(data);
                  var config = {
                    method: "post",
                    url: "/api/post",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    data: data
                  };

                  // PUSH TO DB
                } else {
                  console.log("SKIPPING Article" + arr[j]);

                  //TODO: Update or Skip logic would be nice for existing articles
                }
              });
            db.close();
            console.log("DB Closed");
          });
        }
      } else {
        // If dates are the same then do nothing
        console.log("SKIPPING SOURCE: " + sitesToCheck[i].url);
      }
    })();

    //save array and get open daat

    arr.length = 0; // Clear Array
  }
}
module.exports = CheckRSS;
