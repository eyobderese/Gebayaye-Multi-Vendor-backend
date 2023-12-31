const express = require("express");
const router = express.Router();
const {
  getMessage,
  sendMessage,
} = require("../controllers/messageControllers");
// Send a message
router.post("/send", sendMessage);

// Get messages for a user
router.get("/inbox/:userId", getMessage);

module.exports = router;
