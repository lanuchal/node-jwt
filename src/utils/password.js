var bcrypt = require("bcrypt");
const saltRounds = 10;
// (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

const hash = (password) => bcrypt.hashSync(password, saltRounds);
const compare = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

module.exports = {
  hash,
  compare,
};
