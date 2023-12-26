const { Product, validateProduct } = require("../models/Product"); // Adjust the path based on your project structure

const getAllProduct = async (req, res) => {
  try {
    // Use async/await to fetch all products from the database
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Use async/await to fetch the product from the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    // Validate the product data using the model's validation function
    const validationResult = validateProduct(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    // Destructure validated data
    const { name, price, description, stock, category, imageurl } =
      validationResult.value;

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
};

const modifyProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate the product data using the model's validation function
    const validationResult = validateProduct(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    // Destructure validated data
    const { name, price, description, stock, category, imageurl } =
      validationResult.value;

    // Use async/await to update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, stock, category, image },
      { new: true } // Returns the updated product
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.send(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Use async/await to delete the product from the database
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }

    res.send(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  modifyProduct,
  deleteProduct,
};
