// require("dotenv").config();
const db = require("./config/db");
console.log(process.env)
const {
  hash: hashPassword,
  compare: comparePassword,
} = require("./utils/password");

const { generate: generateToken, decode: verifyToken } = require("./utils/jwt");
const { getUserData } = require("./api/getdata");

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var jsonParser = bodyParser.json();
var port = process.env.PORT || 3301;


app.use(cors());

app.post("/data", jsonParser, function (req, res, next) {

  var respond;
  const tokenInput = req.headers.authorization.split(" ")[1];
  getUserData(tokenInput, function (err, data) {
    (err || !data) ?
      respond = { status: false, msg: "data not found", data: data }
      : respond = { status: true, msg: "token access", data: data };
    res.send(JSON.stringify([respond]));
  });

});

app.post("/signIn", jsonParser, function (req, res, next) {
  const email = req.body.email;
  const pass = req.body.pass;
  db.query(
    "SELECT * FROM `user` WHERE user_mail = ?",
    [email],
    function (err, results) {
      if (err || results.length <= 0) {
        res.send({
          status: "error",
          msg: "login fail",
          data: err ? err : "email not found",
        });
        return;
      }

      const checkPass = comparePassword(pass, results[0].user_pass);
      if (!checkPass) {
        res.send({
          status: "error",
          msg: "login fail",
          data: err ? err : "password invalid",
        });
        return;
      }

      var token = generateToken(results[0].user_id);

      res.send({
        status: "success",
        msg: "login success",
        token: token,
        data: results,
      });
    }
  );
});

app.post("/signUp", jsonParser, function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const tokenInput = req.headers.authorization.split(" ")[1];
  const pass = hashPassword(req.body.pass);
  try {
    verifyToken(tokenInput)

  } catch (error) {

  }
  db.query(
    "INSERT INTO `user` (`user_mail`, `user_pass`, `user_name`) VALUES (?, ?, ?);",
    [email, pass, name],
    function (err, results, fields) {
      if (err) {
        res.send({ status: "error", data: err });
        return;
      }
      res.send({ status: "success", data: results });
    }
  );
});

app.listen(port, function () {
  console.log("CORS-enabled web server listening on port " + port);
});
