// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee",
  password: "Michael2304@)",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to employee database");
});

module.exports = connection;
