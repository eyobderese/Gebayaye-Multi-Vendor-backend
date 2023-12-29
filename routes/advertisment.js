const express = require("express");
const route = express.Router();
const premiumVendor = require("../middleware/premiumVendor");
const Upload = require("../middleware/Upload");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getAdvert,
  createAdvert,
  changeAdvertStatus,
} = require("../controllers/advertisementControllers");

route.get("/", auth, getAdvert);

route.post("/", premiumVendor, Upload.single("banner"), auth, createAdvert);

route.put("/:id", admin, changeAdvertStatus);

module.exports = route;
