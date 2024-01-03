const { User, UserValidater } = require("../models/User");

const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    const validateResult = UserValidater(req.body);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error.details[0].message);
    }

    const {
      name,
      username,
      phone,
      email,
      password,
      accountNumber,
      role,
      isPremium,
      address,
      status,
    } = validateResult.value;

    const usernameInUserDatabse = await User.findOne({ username: username });
    if (usernameInUserDatabse) {
      return res.status(400).send("The username is alredy taken");
    }

    let user = new User({
      name,
      username,
      phone,
      email,
      accountNumber,
      password,
      role,
      isPremium,
      address,
      status, // this is optional do I have to chack wather the validate value have a address properte
    });

    if (role == "Vendor") {
      const { licence, profilePicture } = req.files;
      user.licence = licence[0].path;
      user.profilePicture = profilePicture[0].path;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const token = user.generetAuthToken();
    res.status(200).header("authToken", token).send({ name, username });
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
    const pendingVendor = await User.find({ status: "pendding" }).exec();
    return res.status(200).send(pendingVendor);
  } catch (error) {
    console.error("Error retrieving Users:", error);
    throw error;
  }
};

const getuserByUsername = async (req, res) => {
  // this is for shawing vendor status
  try {
    const userName = req.body.name;
    console.log(userName);
    const pendingVendor = await User.find({ username: userName }).exec();
    if (!pendingVendor) {
      return res
        .status(404)
        .send({ status: "user not register with this username" });
    }

    return res.status(200).send(pendingVendor);
  } catch (error) {
    console.error("Error retrieving Users:", error);
    throw error;
  }
};

const changePenddingVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const approvedVendor = await User.findByIdAndUpdate(
      vendorId,
      { role: "Vendor", status: "approved" },
      { new: true }
    ).exec();

    return res.status(200).send(approvedVendor);
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
  getuserByUsername,
  changePenddingVendor,
};
