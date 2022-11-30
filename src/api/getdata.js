const db = require("../config/db");

const { decode: verifyToken } = require("../utils/jwt");

const getUser = (token_input) => {
  var msg = "";
  const token = token_input.split(" ")[1];
  const decoded = verifyToken(token, process.env.SERVER_KEY);
  db.query("SELECT * FROM `user`", function (err, results) {
    if (err || results.length <= 0) {
      msg = "false";
    }
    console.log(results);
    msg = results;
  });
  return msg;
};

module.exports = {
  getUser,
};
