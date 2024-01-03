const Order = require("../models/Order"); // Adjust the path based on your project structure
const { Product } = require("../models/Product");

const getOrder = async (req, res) => {
  try {
    // Use async/await to fetch all products from the database
    const order = await Order.find();
    res.send(order);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const order = await Order.find({ user: userId });

    if (!order) {
      return res.status(404).send("order not found");
    }

    res.send(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
};
const addOrder = async (req, res) => {
  try {
    // here from token i get the user and i will try to find order the order by userId after that the order has an arry of order so
    //   i will add the order from ther req.body to the order array in the order
    //   then from the quantity and price i will calculate the price of the order and
    //   i will add to the total-price
    const userId = req.user._id;

    // before creating a Order we use req.body.senderAccount and check bank data-base if that account has enough money

    const order = await new Order({
      user: userId,
      products: req.body.productDetail, // from front end I will get an array of product from frontEnd but when i stored the data do I have to populate
      totalAmount: req.body.totalAmount,
      deliveryDate: req.body.date,
    });

    // here using products array i modify stock number----------------------============

    const savedOrder = await order.save();

    res.status(201).send(savedOrder);

    // let order = await Order.findOne({ user: userId });
    // if (!order) {
    //   order = new Order({ user: userId, products: [], totalAmount: 0 });
    // }
    // const productId = req.body.productId;
    // const quantity = parseInt(req.body.quantity);
    // const price = req.price
    // order.products.push({ product: productId, quantity });
    // order.totalAmount=req.body.totalAmount

    // const savedOrder = await order.save();
  } catch (error) {
    console.error("Error creating Order:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Route to update a product by ID

const deleteOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the order for the user
    const order = await Order.findOne({ user: userId });

    if (!order) {
      return res.status(404).send("Order not found for the user");
    }

    const productId = req.body.productId;

    // Find the index of the product in the order's products array
    const productIndex = order.products.findIndex(
      (product) => product.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).send("Product not found in the order");
    }

    // Remove the product from the products array
    let removedProduct = order.products.splice(productIndex, 1)[0];
    const product = await Product.findById(productId);

    // Update the totalAmount based on the removed product
    order.totalAmount -= removedProduct.quantity * product.price;

    // Save the updated order
    const savedOrder = await order.save();

    res.status(200).send(savedOrder);
  } catch (error) {
    console.error("Error deleting product from order:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getOrder,
  addOrder,
  deleteOrder,
  getUserOrder,
};
