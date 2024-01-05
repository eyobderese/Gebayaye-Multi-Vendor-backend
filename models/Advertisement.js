const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  // content: {
  //   type: String,
  //   required: true,
  //   minlength: 20,
  //   maxlength: 255,
  // },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  banner: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;
