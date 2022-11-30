require("dotenv").config();
const db = require("./config/db");

const {
  hash: hashPassword,
  compare: comparePassword,
} = require("./utils/password");

const { generate: generateToken, decode: verifyToken } = require("./utils/jwt");
const { getUser: getUserData } = require("./api/getdata");

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var jsonParser = bodyParser.json();

app.use(cors());

app.post("/data", jsonParser, function (req, res, next) {
  const token = req.headers.authorization;
  const getUserData2 = getUserData(token);
  // res.send(getUserData2);

  db.query("SELECT * FROM `user`", function (err, results) {
    if (err || results.length <= 0) {
      res.send({
        status: "error",
        msg: "data not found",
      });
      return;
    }
    res.send({
      status: "success",
      msg: "token access",
      code: decoded.result,
      data: results,
    });
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

      var token = generateToken(results[0].id);

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
  const pass = hashPassword(req.body.pass);
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

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 80");
});
