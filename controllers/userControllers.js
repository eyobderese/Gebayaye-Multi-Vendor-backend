const { User, UserValidater } = require("../models/User");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    const validateResult = UserValidater(req.body);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error.details[0].message);
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

    if (req.file) {
      user.file = req.file.path;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const token = user.generetAuthToken();
    res.header("x-auth-token", token).send({ name, username });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  const userId = req.user._id;
  const user = await User.find({ _id: userId });
  res.send(user);
};

module.exports = {
  userRegister,
  getUser,
};
