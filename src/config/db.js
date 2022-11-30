const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOST_TEST,
  user: process.env.USER_TEST,
  password: process.env.PASS_TEST,
  database: process.env.DB_TEST,
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("Database connected");
});

module.exports = db;
