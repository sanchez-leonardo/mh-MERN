const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, default: Date.now },
  title: { type: Schema.Types.String, required: true },
  message: { type: Schema.Types.String, required: true }
});

const Message = mongoose.model("message", messageSchema, "messages");

module.exports = Message;