"user strict";
let dbConn = require("../../config/db.config");

// Member Object Create
let login = function (login) {
  this.reg_id = login.reg_id;
  this.email = login.email;
  this.password = login.password;
  this.type = login.type;
  this.status = login.status;
};

//create
login.create = function (newlogin, result) {
  dbConn.query("INSERT INTO login set?", newlogin, function (err, res) {
    if (err) {
      console.log("Error :", err);
      result(err, null);
    } else {
      console.log(res.l_id);
      result(null, res.l_id);
    }
  });
};

//findInput
login.findInput = function (email, pswd, result) {
    console.log(email);
    console.log(pswd);
    dbConn.query(
      "Select * from  login where username = ? and password = ?",
      [email, pswd],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          console.log(" login : ", res);
          result(null, res);
        }
      }
    );
  };
  
module.exports = login;
