const express = require("express");
const { User, UserValidater } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const validateResult = UserValidater(req.body);
    if (validateResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const { name, username, phone, email, password, role } =
      validateResult.value;

    const usernameInUserDatabse = await User.findOne({ username: username });
    if (usernameInUserDatabse) {
      return res.status(400).send("The username is alredy taken");
    }

    let user = new User({
      name,
      username,
      phone,
      email,
      password,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const token = user.generetAuthToken();
    res.header("x-auth-token", token).send({ name, username });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
