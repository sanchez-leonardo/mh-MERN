const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = require("./schemaMessage")

const chatSchema = new Schema({
  itinerary: { type: Schema.Types.ObjectId, required: true, unique: true },
  messages: { type: [Schema.Types.ObjectId], default: [], required: true }
});

const Chat = mongoose.model("chat", chatSchema, "chats");

module.exports = Chat;