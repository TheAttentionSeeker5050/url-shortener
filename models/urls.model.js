
// User model. Our users will be able to use our application. User model store their information
const mongoose = require('mongoose')



const Schema = mongoose.Schema

const UrlSchema = new Schema({
    urlOwner: {
        type: String
    },
    url: {
        type: String
    },
    timeCreated: {
        type: String
    },
    dateCreated: {
        type: String
    }
})



module.exports = mongoose.model("urls", UrlSchema)