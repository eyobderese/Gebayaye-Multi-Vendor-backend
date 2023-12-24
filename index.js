const express = require("express");
const mongoose = require("mongoose");
const app = express();
const product = require("./routes/Product");
const user = require("./routes/user");
const auth = require("./routes/auth");
mongoose
  .connect("mongodb://0.0.0.0:27017/gebeyaye")
  .then(() => {
    console.log("The server is conected...");
  })
  .catch((e) => {
    console.log("somting bad happen", e);
  });

app.use(express.json());
app.use("/api/products", product);
app.use("/api/user", user);
app.use("/api/auth", auth);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is Runnig on port number ${PORT}`);
});
