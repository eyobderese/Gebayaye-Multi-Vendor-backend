const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getOrder,
  addOrder,
  deleteOrder,
} = require("../controllers/orderControllers");

// Route to get all O
router.get("/", getOrder);

// Route to get a product by ID
router.get("/:id");

// Route to create a new order
router.post("/", auth, addOrder);

// Route to delete a product by ID
router.delete("/", auth, deleteOrder);

module.exports = router;
