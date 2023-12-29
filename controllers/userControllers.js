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

const changeVendorStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    user.stutes = "Approved";
    if (req.body.isPremium) {
      user.isPremium = req.body.isPremium;
    }

    user = await user.save();

    return res.send(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

const getVendorPending = async (req, res) => {
  try {
    const pendingVendor = await User.find({ role: "vendorPendding" }).exec();
    return res.status(200).send(pendingVendor);
  } catch (error) {
    console.error("Error retrieving Users:", error);
    throw error;
  }
};

module.exports = {
  userRegister,
  getUser,
  changeVendorStatus,
  getVendorPending,
};
