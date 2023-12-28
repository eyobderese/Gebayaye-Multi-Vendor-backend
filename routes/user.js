const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/Upload");
const router = express.Router();
const { userRegister, getUser } = require("../controllers/userControllers");

router.post("/", upload.single("document"), userRegister); // file it the input name of the front end
//  in the front end form we have to put the atribute of enctype="mulipart/form-data"
router.get("/me", auth, getUser);

module.exports = router;
