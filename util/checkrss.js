// init project
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var async = require("async"),
  time = require("time"),
  CronJob = require("cron").CronJob,
  FeedParser = require("feedparser"),
  request = require("request");

// 

const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;

mongoose.connect(mongoDB);

var feedSchema = new Schema(
  {
    _id: String
  },
  { strict: false }
);

var Feed = mongoose.model("Feed", feedSchema);

var CheckRSS = new CronJob({
  cronTime: "0 0-59 * * * *",

  onTick: function() {
    var req = request("https://gndclouds.cc/feed/feed.xml"),
      feedparser = new FeedParser();

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
  },
  start: true
});

module.exports = CheckRSS;


mongoose.connection.on("open", function(err, db) {
  CheckRSS.start();
});
