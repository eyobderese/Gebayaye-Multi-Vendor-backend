const express = require("express");
const router = express.Router();
const {
  modifyProduct,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
} = require("../controllers/productcontrollers");

// Route to get all products
router.get("/", getAllProduct);

// Route to get a product by ID
router.get("/:id", getProduct);

// Route to create a new product
router.post("/", createProduct);

// Route to update a product by ID
router.put("/:id", modifyProduct);

// Route to delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
