console.log("🔄 Restarting ...");

// init project
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const editJSONFile = require("edit-json-file");
const cron = require("node-cron");

//utilities

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
app.use("/api/post/rss", apiRouter);
app.use("/api/post", apiRouter);

app.use("/api/search", apiRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

//Helper Functions
function setKey(item, index) {
  var externalSourceUrl = "{ externalSourceUrl: " + item + "}";
  return externalSourceUrl;
}
// CRON JOBS

var async = require("async"),
  time = require("time"),
  CronJob = require("cron").CronJob,
  FeedParser = require("feedparser"),
  request = require("request");

let sitesToCheck = [];
//
// function GetRSSLinks(p1, p2) {
//   db.users.find({}, {mediaSources:1},function(err, res){
//         res.toArray(function(err, realRes){
//           console.log("response roo==>",realRes);
//         });
//     }

// )
// }


// let sitesToCheck = [
//   {
//     url: "https://interconnected.org/home/feed",
//     _id: "0000000000",
//     lastChecked: "2021-01-31T13:14:44.639+00:00",
//     lastBuildDate: "2021-04-04T00:00:00Z"
//   },
//   {
//     url: "http://gndclouds.cc/feed/feed.xml",
//     _id: "MQc2aPSY0763",
//     lastChecked: "2021-01-31T13:14:44.639+00:00",
//     lastBuildDate: "2021-04-04T00:00:00Z"
//   },
//   {
//     url: "https://weiweihsu.com/feed.xml",
//     _id: "MQc2aPSY0763",
//     lastChecked: "2021-01-31T13:14:44.639+00:00",
//     lastBuildDate: "2021-04-04T00:00:00Z"
//   },
//   {
//     url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
//     _id: "MQc2aPSY0763",
//     lastChecked: "2021-01-31T13:14:44.639+00:00",
//     lastBuildDate: "2021-04-04T00:00:00Z"
//   },
//   {
//     url: "https://www.youtube.com/user/johnnymangosteen",
//     _id: "MQc2aPSY0763",
//     lastChecked: "Fri, 07 May 2021 06:05:56 GMT",
//     lastBuildDate: "Fri, 07 May 2021 04:05:56 GMT"
//   }
// ];

const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var feedSchema = new Schema(
  {
    _id: String
  },
  { strict: false }
);

var Feed = mongoose.model("Feed", feedSchema);

var CheckRSS = new CronJob({
  cronTime: "0 0-59 * * * *",

  // https://stackoverflow.com/questions/24644335/import-rss-feed-to-mongodb

  onTick: function() {
    for (let i = 0; i < sitesToCheck.length; i++) {
      var req = request(sitesToCheck[i].url),
        feedparser = new FeedParser();
      //TODO: IF URL ERROR SKIP TO NEXT ARRAY ITEAM
      var bulk = Feed.collection.initializeUnorderedBulkOp();

      req.on("error", function(err) {
        throw err;
      });

      req.on("response", function(res) {
        var stream = this;

        if (res.statusCode != 200) {
          return this.emit("error", new Error("Bad status code"));
        } else {
          console.log("res OK");
        }

        stream.pipe(feedparser);
      });

      feedparser.on("error", function(err) {
        throw err;
      });

      feedparser.on("readable", function() {
        //TODO: Refactor to match post schema
        var stream = this,
          meta = this.meta,
          item;

        while ((item = stream.read())) {
          item._id = item.guid;
          delete item.guid;
          bulk
            .find({ _id: item._id })
            .upsert()
            .updateOne({ $set: item });
        }
      });

      feedparser.on("end", function() {
        console.log("at end");
        bulk.execute(function(err, response) {
          // Shouldn't be one as errors should be in the response
          // but just in case there was a problem connecting the op
          if (err) throw err;

          // Just dumping the response for demo purposes
          console.log(JSON.stringify(response, undefined, 4));
        });
      });
      console.log(i);
    }
  },
  start: true
});

mongoose.connection.on("open", function(err, db) {
  CheckRSS.start();
});





