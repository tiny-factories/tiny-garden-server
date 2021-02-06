// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var { nanoid } = require("nanoid");
// var ID = nanoid();

const MemberPostSchema = new Schema(
  {
    // If incoming req has these verables they will be saved in thie strucutre int he database.
    // _id: "nanoid(12)",
    type: { type: String },
    content: { type: String },
    creatorId: { type: String },
    source: { type: String },
  },
  { timestamps: true }
);

// Export model
module.exports = mongoose.model("posts", MemberPostSchema);

// // Data Model for Books
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const MemberPostSchema = new Schema({
//   // If incoming req has these verables they will be saved in thie strucutre int he database.
//     slackAuthorId: { type: String, required: true },
//     slackAuthorName: { type: String, required: true },
//     slackAuthorUsername: { type: String, required: true },

//     slackChannelName: { type: String, required: true },
//     slackChannelId: { type: String, required: true },

//     createdAt: { type: Date, required: true },
//     content: { type: String, required: true }
// });

// // Export model
// module.exports = mongoose.model("posts", MemberPostSchema);
