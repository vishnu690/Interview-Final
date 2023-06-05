"use strict";
const user_reg = require("../models/user.model");

exports.create = function (req, res) {
  const new_stud = new user_reg(req.body);
  console.log("new_stud");
  console.log(new_stud);
  // handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    user_reg.create(new_stud, function (err, stud) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "User added successfully!",
        data: stud,
      });
    });
  }
};
