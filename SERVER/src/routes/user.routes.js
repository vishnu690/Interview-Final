const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//create a new Member
router.post("/", userController.create);

module.exports = router;
