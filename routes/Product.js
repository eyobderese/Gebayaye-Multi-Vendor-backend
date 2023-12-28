const express = require("express");
const router = express.Router();
const upload = require("../middleware/Upload");
const {
  modifyProduct,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
} = require("../controllers/productcontrollers");
const { Product } = require("../models/Product");

// Route to get all products
router.get("/", getAllProduct);

// Route to get a product by ID
router.get("/:id", getProduct);

// Route to create a new product
router.post("/", upload.single("productImage"), createProduct);

// Route to update a product by ID
router.put("/:id", modifyProduct);

// Route to delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
