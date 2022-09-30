
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
    timeCreated: {
        type: String
    },
    dateCreated: {
        type: String
    },
    expiryDate: {
        type: String
    }
})



module.exports = mongoose.model("urls", UrlSchema)