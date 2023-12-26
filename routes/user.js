const express = require("express");
const router = express.Router();
const { userRegister, getUser } = require("../controllers/userControllers");

router.post("/", userRegister);
router.get("/:id", getUser);

module.exports = router;
