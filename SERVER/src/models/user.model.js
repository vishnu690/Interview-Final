"use strict";
var dbConn = require("../../config/db.config");
let m_id;

// Member Object creation
let user_reg = function (mreg) {
  this.uid = mreg.uid;
  this.name = mreg.name;
  this.address = mreg.address;
  this.phone = mreg.phone;
  this.email = mreg.email;
  this.password = mreg.password;
};

// Create a new Member
user_reg.create = function (newMember, result) {
  console.log(newMember);
  console.log(
    "________________--------- starts ------------------__________________________"
  );
  // query to check if email exists in the database
  const email = newMember.email;
  const checkEmailExistenceQuery = `SELECT * FROM userdetails WHERE email= '${email}'`;
  // execute the query
  dbConn.query(checkEmailExistenceQuery, function (error, results, fields) {
    console.log(results.length);
    // if the query returns a result, it means the email exists in the database
    if (results.length > 0) {
      result(null, "The email  " + email + " exists in the database.");
      console.log(`The email ${email} exists in the database.`);
    } else {
      //   console.log(`The email ${email} does not exist in the database.`);
      dbConn.query(
        "INSERT INTO userdetails SET  ? ",
        newMember,
        function (err, res) {
          if (err) {
            console.log("Error: ", err);
            result(err, null);
          } else {
            m_id = res.insertId;
            dbConn.query(
              "INSERT INTO `login` (`reg_id`,`username`,`password`) VALUES('" +
                m_id +
                "','" +
                newMember.email +
                "','" +
                newMember.password +
                "')",

              function (err, res) {
                if (err) {
                  console.log("Error: ", err);
                  result(err, null);
                } else {
                  console.log(" Member Insert Data");
                  console.log(res);
                  m_id = res.insertId;
                  result(null, { Qstatus: "success", m_id: m_id });
                }
              }
            );
          }
        }
      );
    }
  });
};

module.exports = user_reg;
