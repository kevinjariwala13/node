const bcrypt = require("bcrypt");

// To hash the password using SHA256 Algorithm.

const hashPassword = function(password){
    return bcrypt.hashSync(password,10);
}

module.exports.hashPassword = hashPassword;