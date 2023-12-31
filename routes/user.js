const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/Upload");
const admin = require("../middleware/admin");
const router = express.Router();
const {
  userRegister,
  getUser,
  changeVendorStatus,
  getVendorPending,
} = require("../controllers/userControllers");

router.post("/", upload.single("document"), userRegister); // file it the input name of the front end
//  in the front end form we have to put the atribute of enctype="mulipart/form-data"
router.get("/me", auth, getUser);
    { name: "license", maxCount: 1 },
router.put("/:id", admin, changeVendorStatus);

module.exports = router;
