const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Adjust the path based on your project structure

// Route to get all products
router.get("/", async (req, res) => {
  try {
    // Use async/await to fetch all products from the database
    const order = await Order.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    // Use async/await to fetch the product from the database
    const order = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("order not found");
    }

    res.send(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new product
router.post("/", async (req, res) => {
  try {
    // here from token i get the user and i will try to find order the product by userId after that the order has an arry of product so
    //   i will add the product from ther req.body to the product array in the order
    //   then from the quantity and price i will calculate the price of the order and
    //   i will add to the total-price

    // Use async/await to create a new product in the database
    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      category,
      imageurl,
    });

    const savedProduct = await newProduct.save();

    res.status(201).send(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update a product by ID
router.put("/:id", async (req, res) => {
  try {
    //    I guess order do not modify from  but we can remove so we will handle on the delete section
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
