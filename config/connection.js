// Requiring dotenv to hide database password
require("dotenv").config();

// Set up MySQL connection
const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.MySQL_Username,
    password: process.env.MySQL_Password,
    database: "burgers_test_db"
  });
}

// Making connection to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection use in the ORM file
module.exports = connection;
