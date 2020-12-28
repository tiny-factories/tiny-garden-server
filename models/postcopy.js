// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberPostSchema = new Schema(
  {
    username: {type: String},
    channel: {type: String},
    body: {type: String},
    time: {type: Number}
  }
);

// Export model
module.exports = mongoose.model("memberPost", MemberPostSchema);



---
  // Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberPostSchema = new Schema({
  team: { id: { type: String }, domain: { type: String } },
  trigger_id: { type: String },
  response_url: { type: String },
  user: {
    id: { type: String },
    username: { type: String },
    name: { type: String },
    team_id: { type: String }
  },
  channel: { id: { type: String }, name: { type: String } },
  message_ts: { type: Number },
  message: {
    client_msg_id: { type: String },
    type: { type: String },
    text: { type: String },
    user: { type: String },
    ts: { type: Number },
    team: { type: String },
    blocks: [[Object]],
    thread_ts: { type: Number },
    eply_count: { type: Number },
    reply_users_count: { type: Number },
    latest_reply: { type: String },
    reply_users: [{ type: String },],
    subscribed: { type: String },
    last_read: { type: Number }
  }
});

// Export model
module.exports = mongoose.model("memberPost", MemberPostSchema);

// post ID , tim stamp, posted by , authur, Reactiuons

