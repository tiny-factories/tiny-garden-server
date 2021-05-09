console.log("🔄 Restarting ...");

// init project
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const editJSONFile = require("edit-json-file");
const cron = require("node-cron");




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

const CheckRSS = require("./util/rss-check");








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
cron.schedule("* * * * *", () => {
  console.log("CRON Checking RSS Starting");

// CheckRSS();
  console.log("CRON RSS Check Ended");
});
