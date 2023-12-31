const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    const message = new Message({ sender, receiver, content });
    const savedMessage = await message.save();

    res.status(201).send(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getMessage = async (req, res) => {
  try {
    const userId = req.params.userId;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ timestamp: -1 })
      .populate("sender", "username") // we want to include sender's username
      .populate("receiver", "username"); // we want to include receiver's username

    res.status(200).send(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  sendMessage,
  getMessage,
};
