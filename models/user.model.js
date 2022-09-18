
// User model. Our users will be able to use our application. User model store their information
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

function hashPassword(value) {
    return bcrypt.hashSync(value, 10)
}


const Schema = mongoose.Schema

const UserSchema = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        maxLength: 120,
        minLength: 4
    },
    password: {
        type: String,
        maxLength: 120,
        set: hashPassword
    },
    firstName: {
        type: String,
        maxLength: 60
    },
    lastName: {
        type: String,
        maxLength: 60
    }
})



module.exports = mongoose.model("users", UserSchema)