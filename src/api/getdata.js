
const db = require("../config/db");
const { decode: verifyToken } = require("../utils/jwt");

const getUserData = (token, callback) => {
    const decode = verifyToken(token)
    db.query('SELECT * FROM `user`', function (err, result) {
        (err || !decode) ? callback(err, null) : callback(null, result);
    });
}

module.exports = {
    getUserData
};