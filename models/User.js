const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
    minlength: 5,
    maxlength: 255,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["customer", "vendor", "admin", "vendorPendding"],
    required: true,
  },

  // customer Spesific field

  cart: [
    // cart: [{prduct:...., quantity:....}]
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  // customer Spesific field

  file: {
    type: String,
  },

  isPremium: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.generetAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role, isPremium: this.isPremium },
    "jobman2008"
  );
  return token;
};

const User = mongoose.model("user", UserSchema);

function UserValidater(product) {
  const schem = Joi.object({
    name: Joi.string().required().min(5).max(255),
    username: Joi.string().required().min(5).max(255),
    phone: Joi.string().min(10).max(24).required(),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(8).max(1024),
    accountNumber: Joi.string().required(),
    role: Joi.string().required(),
    isPremium: Joi.Boolean().require(),
    address: Joi.string(),
  });

  return schem.validate(product);
}

module.exports.User = User;
module.exports.UserValidater = UserValidater;
