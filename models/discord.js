// Data Model for Discord Posts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscordSchema = new Schema({
  // If incoming req has these verables they will be saved in thie strucutre int he database.
  // _id: "nanoid(12)",
  type: { type: String },
  content: { type: String },
  creatorId: { type: String },
  source: { type: String },
  buttonCount: { type: String },
  discordChannelId: { type: String },
  externalSourceUrl: { type: String },
  openGraphTitle: { type: String },
  openGraphDescription: { type: String },
  openGraphMedia: { type: String },
  createdAt: { type: Date },
  updateddAt: { type: Date }
});

// Export model
module.exports = mongoose.model("Discord", DiscordSchema);

