
const mongoose = require('mongoose')

// envirement variables
require("dotenv").config()

// please delete this later
const uri = "mongodb+srv://nickcastellano:c5!sLDa&KS3raBty@cluster0.7pylz6o.mongodb.net/?retryWrites=true&w=majority"

// connect to our database
mongoose
  .connect(process.env.MONGODB_URL)
  .then("Database connected successfully")
  .catch(err => {
    console.error("Connection error on DB", err.message)
  })


const DB = mongoose.connection

export {DB}

