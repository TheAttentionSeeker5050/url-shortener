
// User model. Our users will be able to use our application. User model store their information
const mongoose = require('mongoose')



const Schema = mongoose.Schema

const UrlSchema = new Schema({
    urlOwner: {
        type: String
    },
    originalUrl: {
        type: String
    },
    shortUrl: {
        type: String
    },
    dateCreated: {
        type: Date
    },
    expiryDate: {
        type: Date
    }
})



module.exports = mongoose.model("urls", UrlSchema)