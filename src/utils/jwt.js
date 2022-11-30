var jwt = require("jsonwebtoken");
var randomToken = require("random-token");

const generate = (id) =>
  jwt.sign({ result: randomToken(30) + id }, process.env.SERVER_KEY, {
    expiresIn: 60,
  });

const decode = (token) => {
  try {
    return jwt.verify(token, process.env.SERVER_KEY);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generate,
  decode,
};
