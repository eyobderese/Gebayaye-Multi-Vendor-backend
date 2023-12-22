const express = require("express");
const { default: mongoose } = require("mongoose");
const monoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/gebeyaye")
  .then(() => {
    console.log("The server is conected...");
  })
  .catch((e) => {
    console.log("somting bad happen", e);
  });

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is Runnig on port number ${PORT}`);
});
