"user strict";

const mysql = require("mysql");

// Mysql Database Coneection
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "interview",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database connection established");
});
module.exports = dbConn;
