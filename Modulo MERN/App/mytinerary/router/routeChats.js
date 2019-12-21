//Base modules
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

//Model
const Chat = require("../models/schemaChat");
const Message = require("../models/schemaMessage");
const User = require("../models/schemaUser");

// GET
// /:itineraryId
//  Returns the chat of an specific itinerary
router.get("/:itineraryId", async (req, res) => {

	try {

		let itinerary = req.params.itineraryId

		let chat = await Chat.findOne({ itinerary })
			.populate({
				path: "messages", model: Message,
				populate: { path: "user", select: ["userName", "userId"], model: User }
			}
			)

		if (chat) {

			return res.status(200).json({ chat })

		} else {

			return res.status(404).json({ error: "No chat in this itinerary" })

		}

	} catch (error) {
		return res.status(500).json(error)
	}


})

//  PUT
//  /:itineraryId
//  Adds a message, creates a new chat if does not exist
router.put("/:itineraryId", async (req, res) => {

	try {

		let itinerary = req.params.itineraryId
		let message = { user: req.body.user, title: req.body.title, message: req.body.message }

		let chat = await Chat.findOne({ itinerary })

		if (chat) {

			let newMessage = new Message(message)

			await newMessage.save()

			chat.messages.push(newMessage._id)

			await chat.save()

		} else {

			let newMessage = new Message(message)

			await newMessage.save()

			let newChat = new Chat({ itinerary })
			newChat.messages.push(newMessage._id)

			await newChat.save()
		}

		return res.status(201).json({ success: "Message Added" })

	} catch (error) {
		return res.status(500).json(error)
	}
})

router.delete("/:itineraryId/:messageId", async (req, res) => {

	try {
		let itinerary = req.params.itineraryId
		let messageId = req.params.messageId

		let chat = await Chat.findOne({ itinerary })
		let message = await Message.findOne({ _id: messageId })

		if (chat && message) {

			let newMsgArr = chat.messages.filter(id => id !== messageId)
			chat.messages = newMsgArr

			await chat.save()

			await Message.deleteOne({ _id: messageId }, (error) => {
				return res.status(505).json(error)
			})

			return res.status(200).json({ success: "Message deleted" })

		} else {
			return res.status(404).json({ error: "Chat or message not found" })
		}

	} catch (error) {
		return res.status(500).json(error)
	}


})


module.exports = router;
