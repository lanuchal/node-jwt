var bcrypt = require("bcrypt");

const saltRounds = 10;

const hash = (password) => bcrypt.hashSync(password, saltRounds);
const compare = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

module.exports = {
  hash,
  compare,
};
