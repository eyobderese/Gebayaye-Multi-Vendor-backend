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

router.post(
  "/",
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  userRegister
); // file it the input name of the front end
//  in the front end form we have to put the atribute of enctype="mulipart/form-data"
router.get("/me", auth, getUser);
router.get("/", admin, getVendorPending);
router.put("/:id", admin, changeVendorStatus);

module.exports = router;
