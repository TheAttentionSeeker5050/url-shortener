
const mongoose = require('mongoose')




// connect to our database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,   
  })
  .then("Database connected successfully")
  .catch(err => {
    console.error("Connection error on DB", err.message)
  })


var DB = mongoose.connection

module.exports = DB

