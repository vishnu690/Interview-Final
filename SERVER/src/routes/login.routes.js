const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

//Retrieve all Users 
router.get('/:email/:pswd', loginController.findInput);

module.exports = router