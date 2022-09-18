// this method should be used to handle and hash the passwords of the users
var bcrypt = require('bcryptjs')

const getHashedPassword = (password) => {
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(20))
    return hash
}

module.exports = {getHashedPassword}