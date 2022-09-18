
// User model. Our users will be able to use our application. User model store their information
const mongoose = require('../config/db.config')
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
        maxLength: 120
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